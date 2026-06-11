import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { type CartItem } from '../lib/cart'
import { DiamondDivider } from './decorations/Ornaments'
import ServiceCard, { type Service } from './ServiceCard'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Props {
  services: Service[]
  cartIds: Set<number>
  whatsappNumber: string
  onToggle: (item: CartItem) => void
}

export default function ServicesGrid({ services, cartIds, whatsappNumber, onToggle }: Props) {
  const grid = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.section-deco', {
      y: 18, opacity: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: grid.current, start: 'top 80%', once: true },
    })

    gsap.from('.service-card', {
      y: 60,
      opacity: 0,
      rotation: 'random(-2, 2)',
      duration: 0.7,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid.current,
        start: 'top 75%',
        once: true,
      },
    })
  }, { scope: grid })

  return (
    <section ref={grid} className="relative mx-auto w-full max-w-6xl px-4 pt-16 pb-32 sm:pt-24">
      <div className="section-deco mb-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-cherry-deep">
          Programa
        </p>
      </div>
      <h2
        className="section-deco font-display text-center text-5xl leading-none text-ink sm:text-6xl"
        style={{ fontVariationSettings: '"wght" 700, "opsz" 144, "SOFT" 100, "WONK" 0' }}
      >
        Las{' '}
        <span
          className="font-display-italic text-cherry"
          style={{ fontVariationSettings: '"wght" 600, "opsz" 144, "WONK" 1' }}
        >
          atracciones
        </span>
      </h2>
      <div className="section-deco mt-6 flex justify-center">
        <DiamondDivider className="text-ink/30" size={220} />
      </div>
      <p className="section-deco mx-auto mt-4 mb-14 max-w-md text-center text-sm leading-relaxed text-ink/55">
        Cada máquina es un protagonista. Combínalas a tu gusto y
        sorprende a tus invitados.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={i}
            inCart={cartIds.has(service.id)}
            whatsappNumber={whatsappNumber}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  )
}
