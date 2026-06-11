import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import {
  buildGroupMessage,
  formatClp,
  openWhatsApp,
  type CartItem,
  type OrderFormData,
} from '../lib/cart'
import { Sparkle, StarBurst } from './decorations/Ornaments'

gsap.registerPlugin(useGSAP)

const EMOJIS: Record<string, string> = {
  'Máquina de Algodón de Azúcar': '🍭',
  'Máquina de Palomitas': '🍿',
  'Máquina de Granizado': '🧊',
  'Máquina de Helados Soft': '🍦',
  'Máquina de Hot Dogs': '🌭',
  'Máquina de Papas Fritas': '🍟',
}

interface Props {
  open: boolean
  cart: CartItem[]
  whatsappNumber: string
  onClose: () => void
  onRemove: (id: number) => void
  onClear: () => void
}

export default function OrderDrawer({ open, cart, whatsappNumber, onClose, onRemove, onClear }: Props) {
  const backdrop = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const sendBtn = useRef<HTMLButtonElement>(null)
  const burstRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<OrderFormData>({ name: '', date: '', location: '', notes: '' })

  useGSAP(() => {
    if (open) {
      gsap.to(backdrop.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' })
      gsap.to(panel.current, { x: 0, duration: 0.5, ease: 'expo.out' })
      gsap.from('.drawer-item', {
        x: 30, opacity: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out', delay: 0.2,
      })
    } else {
      gsap.to(backdrop.current, { opacity: 0, duration: 0.25, pointerEvents: 'none' })
      gsap.to(panel.current, { x: '100%', duration: 0.4, ease: 'power3.in' })
    }
  }, { dependencies: [open] })

  useGSAP(() => {
    if (!open || cart.length === 0) return
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(sendBtn.current, {
      boxShadow: '6px 6px 0 0 #1d1a2f, 0 0 0 18px rgba(37, 211, 102, 0)',
      duration: 1.5, ease: 'power2.out',
    }).set(sendBtn.current, { boxShadow: '4px 4px 0 0 #1d1a2f, 0 0 0 0 rgba(37, 211, 102, 0.55)' })
    return () => { tl.kill() }
  }, { dependencies: [open, cart.length] })

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  const subtotal = cart
    .filter((i) => i.price !== null)
    .reduce((acc, i) => acc + (i.price ?? 0), 0)
  const missingPrice = cart.filter((i) => i.price === null).length

  const handleSend = () => {
    if (cart.length === 0) return

    // Mini-burst celebratorio antes de abrir WhatsApp
    if (burstRef.current) {
      const colors = ['#c8323c', '#f0a83a', '#3f9b8a', '#e85a85', '#5a3470']
      const pieces = 24
      for (let i = 0; i < pieces; i++) {
        const piece = document.createElement('span')
        piece.style.position = 'absolute'
        piece.style.width = '8px'
        piece.style.height = '12px'
        piece.style.background = colors[i % colors.length]
        piece.style.left = '50%'
        piece.style.top = '50%'
        piece.style.borderRadius = '1px'
        piece.style.pointerEvents = 'none'
        burstRef.current.appendChild(piece)

        gsap.to(piece, {
          x: (Math.random() - 0.5) * 320,
          y: (Math.random() - 0.5) * 320 - 60,
          rotation: Math.random() * 720,
          opacity: 0,
          duration: 1 + Math.random() * 0.6,
          ease: 'power2.out',
          onComplete: () => piece.remove(),
        })
      }
    }

    setTimeout(() => {
      openWhatsApp(whatsappNumber, buildGroupMessage(cart, form))
    }, 250)
  }

  return (
    <>
      <div
        ref={backdrop}
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(29, 26, 47, 0.55)', backdropFilter: 'blur(4px)', opacity: 0, pointerEvents: 'none' }}
      />

      <aside
        ref={panel}
        className="fixed right-0 top-0 z-50 flex h-dvh w-full flex-col overflow-hidden sm:max-w-md"
        style={{
          background: '#fbf3df',
          borderLeft: '2px solid #1d1a2f',
          transform: 'translateX(100%)',
          willChange: 'transform',
        }}
      >
        {/* Capas decorativas */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(135deg, rgba(200,50,60,0) 0, rgba(200,50,60,0) 28px, rgba(200,50,60,0.06) 28px, rgba(200,50,60,0.06) 56px)',
            }}
          />
        </div>

        <Sparkle className="pointer-events-none absolute right-6 top-20 text-sun" size={18} />
        <StarBurst className="pointer-events-none absolute left-6 bottom-1/3 text-cherry/30" size={22} />

        {/* Burst container para confetti */}
        <div ref={burstRef} className="pointer-events-none absolute inset-0 overflow-visible z-30" />

        {/* Header */}
        <div
          className="relative flex items-center justify-between border-b-2 border-ink px-5 py-4"
          style={{ background: '#1d1a2f', color: '#f5ead0' }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-sun">
              ★ Tu Pedido ★
            </p>
            <h2
              className="font-display-italic text-2xl leading-none mt-1"
              style={{ fontVariationSettings: '"wght" 600, "opsz" 144' }}
            >
              {cart.length === 0 ? 'Aún vacío' : `${cart.length} ${cart.length === 1 ? 'función' : 'funciones'}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-cream/30 text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-y-auto px-5 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="mb-4 text-6xl">🎪</span>
              <p
                className="font-display text-2xl text-ink"
                style={{ fontVariationSettings: '"wght" 600, "opsz" 48' }}
              >
                La función no ha empezado
              </p>
              <p className="mt-2 max-w-xs text-sm text-ink/55">
                Cierra y selecciona las máquinas que quieres para tu evento.
              </p>
            </div>
          ) : (
            <>
              {/* Lista */}
              <ul className="mb-5 space-y-2">
                {cart.map((item, idx) => (
                  <li
                    key={item.id}
                    className="drawer-item flex items-center gap-3 border-[1.5px] border-ink/80 bg-cream-soft p-3"
                    style={{ boxShadow: '2px 2px 0 0 rgba(29,26,47,0.7)', borderRadius: '3px' }}
                  >
                    <span
                      className="font-display text-xs text-ink/40"
                      style={{ fontVariationSettings: '"wght" 700' }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-2xl">{EMOJIS[item.title] ?? '🎉'}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold leading-tight text-ink">
                        {item.title.replace('Máquina de ', '')}
                      </p>
                      {item.price !== null ? (
                        <p
                          className="font-display text-sm text-cherry"
                          style={{ fontVariationSettings: '"wght" 700' }}
                        >
                          {formatClp(item.price)}
                        </p>
                      ) : (
                        <p className="font-display-italic text-xs text-ink/40">por cotizar</p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      aria-label={`Quitar ${item.title}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-cherry/10 hover:text-cherry"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Subtotal */}
              {subtotal > 0 && (
                <div
                  className="mb-5 border-[1.5px] border-ink p-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(240, 168, 58, 0.18), rgba(240, 168, 58, 0.04))',
                    borderRadius: '3px',
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink/60">
                      Subtotal estimado
                    </span>
                    <span
                      className="font-display text-2xl text-ink"
                      style={{ fontVariationSettings: '"wght" 800, "opsz" 48' }}
                    >
                      {formatClp(subtotal)}
                    </span>
                  </div>
                  {missingPrice > 0 && (
                    <p className="mt-1 text-xs text-ink/55">
                      {missingPrice} {missingPrice === 1 ? 'ítem' : 'ítems'} sin precio (los acuerdas con Carmen)
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={onClear}
                className="mb-7 text-[10px] font-bold uppercase tracking-[0.24em] text-ink/45 hover:text-cherry hover:underline"
              >
                Vaciar lista
              </button>

              {/* Formulario */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-ink/20" />
                  <p
                    className="font-display-italic text-sm text-ink/70"
                    style={{ fontVariationSettings: '"wght" 500' }}
                  >
                    tus datos
                  </p>
                  <span className="h-px flex-1 bg-ink/20" />
                </div>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre"
                  className="w-full border-[1.5px] border-ink/70 bg-cream px-4 py-3 text-sm text-ink placeholder-ink/35 outline-none transition-colors focus:border-cherry focus:bg-cream-soft"
                  style={{ borderRadius: '3px' }}
                />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border-[1.5px] border-ink/70 bg-cream px-4 py-3 text-sm text-ink/70 outline-none transition-colors focus:border-cherry focus:bg-cream-soft"
                  style={{ borderRadius: '3px' }}
                />
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Lugar / comuna del evento"
                  className="w-full border-[1.5px] border-ink/70 bg-cream px-4 py-3 text-sm text-ink placeholder-ink/35 outline-none transition-colors focus:border-cherry focus:bg-cream-soft"
                  style={{ borderRadius: '3px' }}
                />
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder="Detalles adicionales (horario, invitados, etc.)"
                  className="w-full resize-none border-[1.5px] border-ink/70 bg-cream px-4 py-3 text-sm text-ink placeholder-ink/35 outline-none transition-colors focus:border-cherry focus:bg-cream-soft"
                  style={{ borderRadius: '3px' }}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="relative border-t-2 border-ink p-4" style={{ background: '#fbf3df' }}>
            <button
              ref={sendBtn}
              onClick={handleSend}
              className="flex w-full items-center justify-center gap-3 px-4 py-3.5 font-display-italic text-base text-cream transition-transform hover:translate-y-[-2px] active:translate-y-0"
              style={{
                background: '#25D366',
                color: '#0d3a1f',
                border: '1.8px solid #1d1a2f',
                borderRadius: '4px',
                boxShadow: '4px 4px 0 0 #1d1a2f',
                fontVariationSettings: '"wght" 700, "opsz" 48',
                letterSpacing: '0.01em',
              }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar por WhatsApp
            </button>
            <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-ink/45">
              ★ Carmen responde en horario de oficina ★
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
