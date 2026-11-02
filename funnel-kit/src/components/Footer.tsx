import { brand } from '../brand';

export function Footer() {
  const { links, sns, operator, name } = brand.brand;
  const items = [
    links.company && { label: '運営会社', href: links.company },
    links.tokushoho && { label: '特定商取引法に基づく表記', href: links.tokushoho },
    links.privacy && { label: 'プライバシーポリシー', href: links.privacy },
    links.terms && { label: '利用規約', href: links.terms },
    links.contact && { label: 'お問い合わせ', href: links.contact },
  ].filter(Boolean) as { label: string; href: string }[];
  const snsItems = [
    sns?.line && { label: 'LINE', href: sns.line },
    sns?.instagram && { label: 'Instagram', href: sns.instagram },
    sns?.x && { label: 'X', href: sns.x },
    sns?.youtube && { label: 'YouTube', href: sns.youtube },
  ].filter(Boolean) as { label: string; href: string }[];
  return (
    <footer className="bg-navy px-6 pb-10 pt-8 text-center text-white">
      {snsItems.length > 0 && (
        <div className="mb-4 flex justify-center gap-4 text-[12px] font-bold">
          {snsItems.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener" className="rounded-full border border-white/40 px-3 py-1">
              {s.label}
            </a>
          ))}
        </div>
      )}
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-white/80">
        {items.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener" className="underline underline-offset-2">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[10px] text-white/60">
        © {new Date().getFullYear()} {operator}｜{name}
      </p>
    </footer>
  );
}
