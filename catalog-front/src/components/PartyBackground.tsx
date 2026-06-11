import { useEffect, useState } from 'react'
import { StarBurst } from './decorations/Ornaments'

const COLORS = ['#c8323c', '#f0a83a', '#3f9b8a', '#e85a85', '#5a3470']

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  duration: number
  drift: number
  color: string
  shape: 'square' | 'circle' | 'rect'
  size: number
}

interface DecoStar {
  id: number
  top: number
  left: number
  size: number
  rotate: number
  color: string
  delay: number
}

export default function PartyBackground() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [stars, setStars] = useState<DecoStar[]>([])

  useEffect(() => {
    const pieces: ConfettiPiece[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 18 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 220,
      color: COLORS[i % COLORS.length],
      shape: (['square', 'circle', 'rect'] as const)[i % 3],
      size: 8 + Math.random() * 8,
    }))
    setConfetti(pieces)

    const decoStars: DecoStar[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      top: Math.random() * 95,
      left: Math.random() * 95,
      size: 10 + Math.random() * 18,
      rotate: Math.random() * 360,
      color: COLORS[(i + 1) % COLORS.length],
      delay: Math.random() * 4,
    }))
    setStars(decoStars)
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Estrellas decorativas (estáticas pero parpadean) */}
      {stars.map((s) => (
        <StarBurst
          key={`s${s.id}`}
          className="star-twinkle absolute"
          size={s.size}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            color: s.color,
            opacity: 0.18,
            transform: `rotate(${s.rotate}deg)`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Confeti deslizando lentamente */}
      {confetti.map((p) => (
        <span
          key={`c${p.id}`}
          className="confetti-bg"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: `${p.size}px`,
            height: p.shape === 'rect' ? `${p.size * 1.6}px` : `${p.size}px`,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'rect' ? '2px' : '1px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.55,
            // @ts-expect-error custom CSS prop
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
