import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Sparkle, StarBurst } from './decorations/Ornaments'
import Marquee from './Marquee'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.h-est', { y: -10, opacity: 0, duration: 0.5 })
      .from('.h-pre', { y: 14, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.h-line-a', {
        y: 90, opacity: 0, rotation: -3, duration: 0.85,
        ease: 'expo.out',
      }, '-=0.25')
      .from('.h-amp', {
        scale: 0, rotation: -180, opacity: 0, duration: 0.7,
        ease: 'back.out(2)',
      }, '-=0.55')
      .from('.h-line-b', {
        y: 90, opacity: 0, rotation: 2, duration: 0.85,
        ease: 'expo.out',
      }, '-=0.65')
      .from('.h-cap', { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.h-tag', { y: 12, opacity: 0, duration: 0.45 }, '-=0.3')

    // Estrellas que aparecen alrededor del título
    gsap.from('.h-deco', {
      scale: 0, rotation: 'random(-180,180)', opacity: 0,
      duration: 0.7, stagger: 0.08, ease: 'back.out(2)', delay: 0.6,
    })

    // Rotación lenta de las estrellas decorativas
    gsap.to('.h-deco', {
      rotation: '+=360',
      duration: 24, repeat: -1, ease: 'none',
    })
  }, { scope: container })

  return (
    <header ref={container} className="relative">
      {/* Encabezado pequeño tipo cartel */}
      <div className="border-b-2 border-ink/20 bg-cream-soft/40 px-4 py-3 text-center">
        <div className="h-est mx-auto flex max-w-4xl items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-cherry-deep">
          <span>★</span>
          <span>EST.&nbsp;Carmen Saa &nbsp;·&nbsp; Eventos Infantiles &nbsp;·&nbsp; Coquimbo</span>
          <span>★</span>
        </div>
      </div>

      {/* Hero principal */}
      <div className="relative px-4 pt-14 pb-10 sm:pt-20 sm:pb-14">
        {/* Estrellas y chispas alrededor */}
        <StarBurst className="h-deco absolute left-[8%] top-[18%] hidden text-cherry sm:block" size={40} />
        <Sparkle className="h-deco absolute right-[10%] top-[12%] text-sun" size={28} />
        <StarBurst className="h-deco absolute right-[18%] bottom-[15%] hidden text-mint sm:block" size={32} />
        <Sparkle className="h-deco absolute left-[16%] bottom-[20%] text-pink" size={22} />
        <StarBurst className="h-deco absolute right-[6%] top-[55%] text-plum" size={24} />
        <Sparkle className="h-deco absolute left-[6%] top-[50%] hidden text-cherry sm:block" size={18} />

        <div className="relative mx-auto max-w-5xl text-center">
          <p
            className="h-pre mb-6 text-xs font-bold uppercase tracking-[0.5em] text-mint-deep"
          >
            ── Catálogo · 2026 ──
          </p>

          {/* Título principal — composición de cartel */}
          <h1 className="font-display flex flex-col items-center leading-[0.85]">
            <span
              className="h-line-a block text-7xl text-ink sm:text-8xl md:text-[9rem]"
              style={{ fontVariationSettings: '"wght" 700, "opsz" 144, "SOFT" 100, "WONK" 0' }}
            >
              Carmen
            </span>

            <span className="my-1 flex items-center gap-4 sm:my-2 sm:gap-6">
              <span className="h-px w-8 bg-cherry sm:w-16" />
              <span
                className="h-amp font-display-italic text-5xl text-cherry sm:text-6xl md:text-7xl"
                style={{ fontVariationSettings: '"wght" 500, "opsz" 144, "SOFT" 100, "WONK" 1' }}
              >
                &amp;
              </span>
              <span className="h-px w-8 bg-cherry sm:w-16" />
            </span>

            <span
              className="h-line-b font-display-italic block text-7xl text-cherry-deep sm:text-8xl md:text-[9rem]"
              style={{ fontVariationSettings: '"wght" 600, "opsz" 144, "SOFT" 100, "WONK" 1' }}
            >
              Saa
            </span>
          </h1>

          <p className="h-cap mt-8 text-[11px] font-semibold uppercase tracking-[0.45em] text-ink/60">
            ✦ &nbsp; Arriendo de Máquinas para Fiestas Infantiles &nbsp; ✦
          </p>

          <p className="h-tag mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            Selecciona las máquinas que te encantan, agrégalas a tu pedido y
            cotiza al instante con Carmen por WhatsApp.
          </p>
        </div>
      </div>

      {/* Marquee inferior - "ticker" de feria */}
      <Marquee
        items={[
          'Algodón de Azúcar',
          'Palomitas',
          'Granizado',
          'Helado Soft',
          'Hot Dogs',
          'Papas Fritas',
        ]}
        bg="#1d1a2f"
        fg="#f5ead0"
      />
    </header>
  )
}
