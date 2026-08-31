type LinkCardProps = {
  title: string;
  url: string;
  icon?: string;
};

export default function LinkCard({ title, url, icon }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center gap-3 rounded-3xl border border-white/20 bg-white/10 px-6 py-4 font-medium text-zinc-100 shadow-[0_8px_32px_rgba(0,0,0,0.37),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.14]"
    >
      {icon && (
        <span className="text-xl" aria-hidden>
          {icon}
        </span>
      )}
      <span className="flex-1 text-center">{title}</span>
      {icon && <span className="w-5" aria-hidden />}
    </a>
  );
}
