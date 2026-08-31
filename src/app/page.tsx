import LinkList from "@/components/LinkList";

// TODO: 나중에 실제 값으로 교체 (프로필/링크는 DB 또는 설정 파일에서 로드)
const profile = {
  name: "김태하",
  bio: "코드와 게임, 음악을 좋아합니다",
  avatarUrl: "", // 비어 있으면 이니셜 아바타로 대체
};

const links = [
  { title: "GitHub", url: "https://github.com/fowo414-maker", icon: "🐙" },
  { title: "이메일", url: "mailto:fowo414@gmail.com", icon: "✉️" },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/tayha-kim-6b09a9432/",
    icon: "💼",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-1 flex-col items-center overflow-hidden bg-[#0d0d0d]">
      {/* 천장 중앙에서 아래로 비추는 은은한 조명 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 빛줄기 (아래로 퍼지는 원뿔, 테두리를 아주 흐리게) */}
        <div
          className="absolute left-1/2 top-0 h-[88%] w-[620px] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(224,224,230,0.13) 32%, rgba(168,168,178,0.06) 62%, rgba(120,120,130,0) 100%)",
            clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
            filter: "blur(80px)",
          }}
        />
        {/* 공중에 번지는 빛 (은은한 앰비언트) */}
        <div
          className="absolute left-1/2 top-[2%] h-[520px] w-[600px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.16) 0%, rgba(198,198,205,0.07) 46%, rgba(140,140,150,0) 76%)",
            filter: "blur(90px)",
          }}
        />
        {/* 바닥에 닿은 원형 빛 웅덩이 (원근감으로 납작하게) */}
        <div
          className="absolute left-1/2 bottom-[10%] h-[240px] w-[680px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.30) 0%, rgba(210,210,218,0.15) 38%, rgba(150,150,160,0.05) 62%, rgba(120,120,130,0) 80%)",
            filter: "blur(36px)",
          }}
        />
        {/* 바닥 빛의 밝은 코어 */}
        <div
          className="absolute left-1/2 bottom-[15%] h-[110px] w-[420px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.22) 0%, rgba(230,230,235,0.10) 50%, rgba(140,140,150,0) 78%)",
            filter: "blur(24px)",
          }}
        />
      </div>

      {/* 내용 (조명이 비추도록 중앙 위쪽에서 아래로 내려서 배치) */}
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-8 pb-24 pt-32 sm:px-10 sm:pt-40">
        {/* 원형 프로필 사진 */}
        <div className="h-28 w-28 overflow-hidden rounded-full shadow-xl shadow-black/50 ring-1 ring-white/20">
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-500 text-4xl font-bold text-white">
              {profile.name.charAt(0)}
            </div>
          )}
        </div>

        {/* 이름 */}
        <h1 className="mt-5 text-xl font-bold text-zinc-50">{profile.name}</h1>

        {/* 한 줄 소개 */}
        <p className="mt-1 text-sm text-zinc-400">{profile.bio}</p>

        {/* 링크 카드 목록 (클릭 수는 클라이언트에서 불러와 갱신) */}
        <LinkList links={links} />
      </main>
    </div>
  );
}
