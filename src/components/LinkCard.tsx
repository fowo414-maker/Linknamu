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
      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 font-medium text-zinc-100 shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-zinc-800 hover:shadow-xl hover:shadow-black/50"
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
