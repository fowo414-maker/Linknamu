import LinkCard from "@/components/LinkCard";

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
    <div className="relative flex min-h-dvh flex-1 flex-col items-center overflow-hidden bg-[#080808]">
      {/* 천장 중앙에서 아래로 비추는 스포트라이트 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 상단 광원 (좁고 밝은 시작점) */}
        <div
          className="absolute left-1/2 top-[-6%] h-[240px] w-[260px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.14) 45%, rgba(255,255,255,0) 75%)",
            filter: "blur(44px)",
          }}
        />
        {/* 아래로 부드럽게 퍼지는 빛줄기 */}
        <div
          className="absolute left-1/2 top-0 h-[76%] w-[560px] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(228,228,234,0.08) 42%, rgba(160,160,170,0.03) 70%, rgba(120,120,130,0) 100%)",
            clipPath: "polygon(42% 0%, 58% 0%, 88% 100%, 12% 100%)",
            filter: "blur(64px)",
          }}
        />
        {/* 바닥에 번지는 타원형 빛 */}
        <div
          className="absolute bottom-[4%] left-1/2 h-[320px] w-[880px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(244,244,250,0.15) 0%, rgba(198,198,208,0.06) 42%, rgba(130,130,140,0.02) 66%, rgba(0,0,0,0) 84%)",
            filter: "blur(52px)",
          }}
        />
        {/* 가장자리를 어둡게 눌러주는 비네트 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 68% 58% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 68%, rgba(0,0,0,0.92) 100%)",
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

        {/* 링크 카드 목록 */}
        <ul className="mt-12 flex w-full flex-col gap-4 sm:gap-5">
          {links.map((link) => (
            <li key={link.title}>
              <LinkCard {...link} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
