import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import OrderDrawer from './components/OrderDrawer'
import OrderFab from './components/OrderFab'
import PartyBackground from './components/PartyBackground'
import ServicesGrid from './components/ServicesGrid'
import { type Service } from './components/ServiceCard'
import { DiamondDivider } from './components/decorations/Ornaments'
import { clearCart, loadCart, saveCart, type CartItem } from './lib/cart'

const API_URL = import.meta.env.VITE_API_URL as string
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as string

export default function App() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>(() => loadCart())
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    fetch(API_URL, { headers: { Accept: 'application/json' } })
      .then((r) => r.json())
      .then((data) => {
        const all: Service[] = (data.categories ?? []).flatMap(
          (cat: { services: Service[] }) => cat.services ?? []
        )
        setServices(all)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { saveCart(cart) }, [cart])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const cartIds = useMemo(() => new Set(cart.map((i) => i.id)), [cart])

  const handleToggle = (item: CartItem) => {
    setCart((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    )
  }

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const handleClear = () => {
    setCart([])
    clearCart()
  }

  return (
    <>
      <PartyBackground />

      <div className="relative">
        <Hero />

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-cherry/20 border-t-cherry" />
          </div>
        ) : (
          <ServicesGrid
            services={services}
            cartIds={cartIds}
            whatsappNumber={WA_NUMBER}
            onToggle={handleToggle}
          />
        )}

        <OrderFab count={cart.length} drawerOpen={drawerOpen} onOpen={() => setDrawerOpen(true)} />

        <OrderDrawer
          open={drawerOpen}
          cart={cart}
          whatsappNumber={WA_NUMBER}
          onClose={() => setDrawerOpen(false)}
          onRemove={handleRemove}
          onClear={handleClear}
        />

        {/* Footer estilo cartel */}
        <footer
          className="relative border-t-2 border-ink py-12 text-center"
          style={{ background: '#1d1a2f', color: '#f5ead0' }}
        >
          <div className="mx-auto max-w-2xl px-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-sun">
              ✦ Carmen Saa ✦
            </p>
            <h3
              className="font-display-italic mt-3 text-3xl"
              style={{ fontVariationSettings: '"wght" 500, "opsz" 144' }}
            >
              ¡Que la fiesta nunca termine!
            </h3>
            <div className="mt-5 flex justify-center">
              <DiamondDivider className="text-cream/40" size={180} />
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cream/50">
              © {new Date().getFullYear()} · Eventos Infantiles · Coquimbo
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
