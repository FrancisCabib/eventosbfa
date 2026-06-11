interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export function StarBurst({ size = 24, ...props }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0L13.7 8.3L22 7L15.5 12L22 17L13.7 15.7L12 24L10.3 15.7L2 17L8.5 12L2 7L10.3 8.3L12 0Z" />
    </svg>
  )
}

export function Squiggle({ size = 80, ...props }: SvgProps) {
  return (
    <svg width={size} height={size / 5} viewBox="0 0 80 16" fill="none" {...props}>
      <path
        d="M2 8 Q 8 1, 14 8 T 26 8 T 38 8 T 50 8 T 62 8 T 78 8"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function DiamondDivider({ size = 200, ...props }: SvgProps) {
  return (
    <svg width={size} height={size / 8} viewBox="0 0 200 25" fill="currentColor" {...props}>
      <line x1="0" y1="12.5" x2="85" y2="12.5" stroke="currentColor" strokeWidth="1" />
      <path d="M100 4 L108 12.5 L100 21 L92 12.5 Z" />
      <line x1="115" y1="12.5" x2="200" y2="12.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function Sparkle({ size = 18, ...props }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor" {...props}>
      <path d="M9 0 L10.4 7.6 L18 9 L10.4 10.4 L9 18 L7.6 10.4 L0 9 L7.6 7.6 Z" />
    </svg>
  )
}

export function TicketIcon({ size = 24, ...props }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 9.5V7a2 2 0 012-2h16a2 2 0 012 2v2.5a2.5 2.5 0 100 5V17a2 2 0 01-2 2H4a2 2 0 01-2-2v-2.5a2.5 2.5 0 100-5z" />
      <path d="M13 5v14" strokeDasharray="2 2" />
    </svg>
  )
}
