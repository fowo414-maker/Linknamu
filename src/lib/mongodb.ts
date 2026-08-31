import dns from "node:dns";

import { MongoClient } from "mongodb";

const rawUri = process.env.MONGODB_URL;

if (!rawUri) {
  throw new Error(".env.local에 MONGODB_URL 환경변수를 설정해 주세요.");
}

// 개발 환경에서는 HMR로 모듈이 다시 평가돼도 커넥션이 재사용되도록 전역에 캐싱한다.
const globalForMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

/**
 * 일부 로컬 환경은 Node가 참조하는 DNS 서버가 루프백(127.0.0.1)으로만 잡혀 있어
 * mongodb+srv:// 가 내부적으로 쓰는 SRV/TXT 조회(c-ares 기반)가 ECONNREFUSED로 실패한다.
 * 이 경우 SRV/TXT를 직접 조회해 일반 mongodb:// 문자열로 펼쳐두면,
 * 실제 소켓 연결은 OS 리졸버(dns.lookup)를 타므로 정상 동작한다.
 */
async function resolveUri(uri: string): Promise<string> {
  if (!uri.startsWith("mongodb+srv://")) return uri;

  // DNS 서버가 정상(루프백 아님)이면 드라이버가 알아서 SRV를 처리하도록 그대로 둔다.
  const resolver = new dns.promises.Resolver();
  if (!resolver.getServers().every((s) => /^(127\.|::1)/.test(s))) return uri;
  resolver.setServers(["1.1.1.1", "8.8.8.8"]);

  const url = new URL(uri);
  const host = url.hostname;

  const [srvRecords, txtRecords] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${host}`),
    resolver.resolveTxt(host).catch(() => [] as string[][]),
  ]);

  const seeds = srvRecords
    .map((r) => `${r.name}:${r.port}`)
    .sort()
    .join(",");

  const params = new URLSearchParams(url.search);
  params.set("tls", "true");
  for (const chunk of txtRecords.flat().join("&").split("&")) {
    const [key, value] = chunk.split("=");
    if (key && value && !params.has(key)) params.set(key, value);
  }

  const auth = url.username
    ? `${url.username}:${decodeURIComponent(url.password)}@`
    : "";
  return `mongodb://${auth}${seeds}/${url.pathname.replace(/^\//, "")}?${params}`;
}

function connect(): Promise<MongoClient> {
  const promise = resolveUri(rawUri!).then((uri) => new MongoClient(uri).connect());
  // 연결에 실패하면 캐시를 비워 다음 요청에서 다시 시도하도록 한다.
  promise.catch(() => {
    if (globalForMongo._mongoClientPromise === promise) {
      globalForMongo._mongoClientPromise = undefined;
    }
  });
  return promise;
}

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    return (globalForMongo._mongoClientPromise ??= connect());
  }
  return connect();
}

export type ClickDoc = {
  _id: string; // 링크 URL을 그대로 식별자로 사용
  count: number;
};

/** 링크별 클릭 수를 저장하는 컬렉션 */
export async function getClicksCollection() {
  const client = await getClientPromise();
  return client.db("linknamu").collection<ClickDoc>("clicks");
}
