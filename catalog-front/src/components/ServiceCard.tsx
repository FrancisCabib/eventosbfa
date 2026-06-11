import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { buildIndividualMessage, openWhatsApp, type CartItem } from '../lib/cart'

gsap.registerPlugin(useGSAP)

export interface Service {
  id: number
  title: string
  subtitle: string | null
  short_description: string
  long_description: string | null
  price: number | null
  image_path: string | null
}

const EMOJIS: Record<string, string> = {
  'Máquina de Algodón de Azúcar': '🍭',
  'Máquina de Palomitas': '🍿',
  'Máquina de Granizado': '🧊',
  'Máquina de Helados Soft': '🍦',
  'Máquina de Hot Dogs': '🌭',
  'Máquina de Papas Fritas': '🍟',
}

// Paleta del cartel — cada card recibe un acento de feria
const ACCENTS = [
  { c: '#c8323c', n: 'Cherry' },   // cherry red
  { c: '#f0a83a', n: 'Sun' },      // sun yellow
  { c: '#3f9b8a', n: 'Mint' },     // vintage mint
  { c: '#e85a85', n: 'Pink' },     // hot pink
  { c: '#5a3470', n: 'Plum' },     // plum
  { c: '#d68a1c', n: 'Amber' },    // amber
]

interface Props {
  service: Service
  index: number
  inCart: boolean
  whatsappNumber: string
  onToggle: (item: CartItem) => void
}

export default function ServiceCard({ service, index, inCart, whatsappNumber, onToggle }: Props) {
  const card = useRef<HTMLDivElement>(null)
  const stamp = useRef<HTMLDivElement>(null)
  const accent = ACCENTS[index % ACCENTS.length]
  const emoji = EMOJIS[service.title] ?? '🎉'

  // Stamp animado al agregar/quitar
  useGSAP(() => {
    if (inCart && stamp.current) {
      gsap.fromTo(stamp.current,
        { scale: 2.5, rotation: -25, opacity: 0 },
        { scale: 1, rotation: -15, opacity: 1, duration: 0.55, ease: 'back.out(1.6)' }
      )
    } else if (stamp.current) {
      gsap.to(stamp.current, { opacity: 0, scale: 0.5, duration: 0.25, ease: 'power2.in' })
    }
  }, { dependencies: [inCart] })

  const handleMouseEnter = () => {
    gsap.to(card.current, { y: -6, rotation: index % 2 === 0 ? -0.5 : 0.5, duration: 0.3, ease: 'power2.out' })
  }
  const handleMouseLeave = () => {
    gsap.to(card.current, { y: 0, rotation: 0, duration: 0.3, ease: 'power2.out' })
  }

  const handleAddToCart = () => {
    onToggle({
      id: service.id,
      title: service.title,
      subtitle: service.subtitle,
      price: service.price,
    })
  }

  const handleIndividualWhatsApp = () => {
    const item: CartItem = {
      id: service.id,
      title: service.title,
      subtitle: service.subtitle,
      price: service.price,
    }
    openWhatsApp(whatsappNumber, buildIndividualMessage(item))
  }

  return (
    <div
      ref={card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="service-card relative overflow-hidden bg-cream-soft transition-shadow"
      style={{
        boxShadow: inCart
          ? `4px 6px 0 0 ${accent.c}, 0 12px 32px rgba(29, 26, 47, 0.12)`
          : '3px 4px 0 0 #1d1a2f, 0 6px 18px rgba(29, 26, 47, 0.07)',
        border: '1.5px solid #1d1a2f',
        borderRadius: '4px',
      }}
    >
      {/* Banda de color tipo cinta superior */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: accent.c, color: '#f5ead0' }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.28em]">
          ★ Servicio Nº {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-display-italic text-xs" style={{ fontVariationSettings: '"wght" 600' }}>
          {accent.n}
        </span>
      </div>

      {/* Stamp diagonal cuando está en el carrito */}
      {inCart && (
        <div
          ref={stamp}
          className="pointer-events-none absolute right-3 top-12 z-10 flex items-center gap-1.5 rounded-sm border-[2.5px] border-current px-3 py-1 font-display-italic uppercase tracking-wider opacity-0"
          style={{
            color: '#1d6c5d',
            background: 'rgba(63, 155, 138, 0.08)',
            fontVariationSettings: '"wght" 700',
            fontSize: '11px',
            letterSpacing: '0.12em',
          }}
        >
          <span>✓</span>
          <span>Agregado</span>
        </div>
      )}

      {/* Cuerpo del ticket */}
      <div className="px-5 pt-5 pb-4">
        <span className="block text-5xl leading-none mb-3">{emoji}</span>

        <h3
          className="font-display text-2xl leading-[1.05] text-ink"
          style={{ fontVariationSettings: '"wght" 700, "opsz" 48, "SOFT" 80' }}
        >
          {service.title.replace('Máquina de ', '')}
        </h3>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ink/40">
          Máquina
        </p>

        {service.subtitle && (
          <p
            className="font-display-italic mt-2 text-sm"
            style={{ color: accent.c, fontVariationSettings: '"wght" 500' }}
          >
            {service.subtitle}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          {service.short_description}
        </p>
      </div>

      {/* Línea perforada divisoria */}
      <div className="relative">
        <div
          className="mx-4 border-t-[1.5px] border-dashed"
          style={{ borderColor: 'rgba(29, 26, 47, 0.3)' }}
        />
        {/* Notches a los lados */}
        <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream"
          style={{ boxShadow: 'inset 0 0 0 1.5px #1d1a2f' }} />
        <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream"
          style={{ boxShadow: 'inset 0 0 0 1.5px #1d1a2f' }} />
      </div>

      {/* Pie del ticket */}
      <div className="flex items-end gap-2 px-5 pt-4 pb-5">
        <div className="flex-1">
          {service.price !== null ? (
            <>
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-ink/45">
                Desde
              </p>
              <p
                className="font-display text-2xl leading-none text-ink"
                style={{ fontVariationSettings: '"wght" 800, "opsz" 48' }}
              >
                ${service.price.toLocaleString('es-CL')}
              </p>
            </>
          ) : (
            <>
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-ink/45">
                Precio
              </p>
              <p
                className="font-display-italic text-lg leading-none text-ink/70"
                style={{ fontVariationSettings: '"wght" 500' }}
              >
                Por cotizar
              </p>
            </>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="flex h-11 items-center gap-1.5 rounded-sm px-4 text-xs font-bold uppercase tracking-wider transition-transform active:scale-95"
          style={{
            background: inCart ? '#1d1a2f' : accent.c,
            color: '#f5ead0',
            border: '1.5px solid #1d1a2f',
            boxShadow: '2px 2px 0 0 #1d1a2f',
            letterSpacing: '0.14em',
          }}
        >
          {inCart ? (
            <>
              <span>✕</span>
              <span>Quitar</span>
            </>
          ) : (
            <>
              <span>+</span>
              <span>Agregar</span>
            </>
          )}
        </button>

        <button
          onClick={handleIndividualWhatsApp}
          title="Cotizar solo esta máquina por WhatsApp"
          aria-label="Cotizar individual por WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-sm transition-transform active:scale-95"
          style={{
            background: '#25D366',
            color: '#f5ead0',
            border: '1.5px solid #1d1a2f',
            boxShadow: '2px 2px 0 0 #1d1a2f',
          }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>

      {/* Footer micro tipo "código de ticket" */}
      <div
        className="border-t-[1.5px] border-dashed px-5 py-2 text-center text-[9px] font-bold tracking-[0.4em] text-ink/30"
        style={{ borderColor: 'rgba(29, 26, 47, 0.2)' }}
      >
        Nº {String(service.id).padStart(4, '0')} · CARMEN&nbsp;SAA
      </div>
    </div>
  )
}
