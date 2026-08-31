import { NextResponse } from "next/server";

import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

/** 모든 링크의 현재 클릭 수를 { [url]: count } 형태로 반환 */
export async function GET() {
  try {
    const collection = await getClicksCollection();
    const docs = await collection.find().toArray();

    const counts: Record<string, number> = {};
    for (const doc of docs) {
      counts[doc._id] = doc.count ?? 0;
    }

    return NextResponse.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json(
      { error: "클릭 수를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}

/** 특정 링크의 클릭 수를 1 증가시키고 갱신된 값을 반환 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: unknown };
    const url = body.url;

    if (typeof url !== "string" || url.length === 0) {
      return NextResponse.json({ error: "url이 필요합니다." }, { status: 400 });
    }

    const collection = await getClicksCollection();
    const updated = await collection.findOneAndUpdate(
      { _id: url },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );

    return NextResponse.json({ count: updated?.count ?? 0 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json(
      { error: "클릭 수 저장에 실패했습니다." },
      { status: 500 },
    );
  }
}
