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
      className="flex w-full items-center gap-3 rounded-3xl border border-white/15 bg-white/[0.06] px-6 py-4 font-medium text-zinc-100 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.1]"
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
