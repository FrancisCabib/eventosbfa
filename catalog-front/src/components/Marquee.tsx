interface Props {
  items: string[]
  bg?: string
  fg?: string
}

export default function Marquee({ items, bg = '#1d1a2f', fg = '#f5ead0' }: Props) {
  // Duplicamos los items para loop continuo
  const doubled = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden border-y-2 py-3"
      style={{ background: bg, color: fg, borderColor: bg }}
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {doubled.map((text, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className="font-display-italic text-2xl tracking-tight"
              style={{ fontVariationSettings: '"wght" 600' }}
            >
              {text}
            </span>
            <span className="text-2xl opacity-80">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
