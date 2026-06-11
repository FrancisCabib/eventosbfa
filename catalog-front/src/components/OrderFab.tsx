import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP)

interface Props {
  count: number
  drawerOpen: boolean
  onOpen: () => void
}

export default function OrderFab({ count, drawerOpen, onOpen }: Props) {
  const fab = useRef<HTMLButtonElement>(null)
  const badge = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (count > 0 && !drawerOpen) {
      gsap.to(fab.current, {
        scale: 1, opacity: 1, y: 0,
        duration: 0.55, ease: 'back.out(1.8)',
      })
    } else {
      gsap.to(fab.current, {
        scale: 0.7, opacity: 0, y: 30,
        duration: 0.25, ease: 'power2.in',
      })
    }
  }, { dependencies: [count, drawerOpen] })

  useGSAP(() => {
    if (count === 0) return
    gsap.fromTo(badge.current,
      { scale: 1.6, rotation: -10 },
      { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.5)' }
    )
  }, { dependencies: [count] })

  return (
    <button
      ref={fab}
      onClick={onOpen}
      aria-label={`Ver pedido (${count} ${count === 1 ? 'servicio' : 'servicios'})`}
      className="fixed right-5 z-40 flex h-14 items-center gap-3 px-5 text-cream transition-transform hover:scale-105 active:scale-95"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        background: '#c8323c',
        border: '1.8px solid #1d1a2f',
        borderRadius: '6px',
        boxShadow: '4px 4px 0 0 #1d1a2f',
        opacity: 0,
        transform: 'scale(0.7) translateY(30px)',
        willChange: 'transform, opacity',
      }}
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9.5V7a2 2 0 012-2h16a2 2 0 012 2v2.5a2.5 2.5 0 100 5V17a2 2 0 01-2 2H4a2 2 0 01-2-2v-2.5a2.5 2.5 0 100-5z" />
        <path d="M13 5v14" strokeDasharray="2 2" />
      </svg>
      <span
        className="font-display-italic text-base"
        style={{ fontVariationSettings: '"wght" 600' }}
      >
        Tu pedido
      </span>

      <span
        ref={badge}
        className="flex h-7 min-w-7 items-center justify-center rounded-full px-2 font-display text-xs"
        style={{
          background: '#f0a83a',
          color: '#1d1a2f',
          border: '1.5px solid #1d1a2f',
          fontVariationSettings: '"wght" 800',
        }}
      >
        {count}
      </span>
    </button>
  )
}
