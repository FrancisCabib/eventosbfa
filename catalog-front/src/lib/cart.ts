export interface CartItem {
  id: number
  title: string
  subtitle: string | null
  price: number | null
}

const STORAGE_KEY = 'carmen_saa_order_draft'

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (i): i is CartItem =>
        typeof i?.id === 'number' && typeof i?.title === 'string'
    )
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* ignore */
  }
}

export function clearCart(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function formatClp(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`
}

export function buildIndividualMessage(item: CartItem): string {
  const lines = [
    'Hola Carmen! Me interesa este servicio para mi evento:',
    '',
    `Servicio: ${item.title}`,
  ]
  if (item.subtitle) lines.push(`Detalle: ${item.subtitle}`)
  if (item.price !== null) lines.push(`Precio referencia: ${formatClp(item.price)}`)
  lines.push('', 'Quedo atento/a a más información. Gracias!')
  return lines.join('\n')
}

export interface OrderFormData {
  name: string
  date: string
  location: string
  notes: string
}

export function buildGroupMessage(items: CartItem[], form: OrderFormData): string {
  const lines = ['Hola Carmen! Quisiera cotizar las siguientes máquinas para mi evento:', '']

  items.forEach((item, i) => {
    const price = item.price !== null ? ` — ${formatClp(item.price)}` : ''
    lines.push(`${i + 1}. ${item.title}${price}`)
  })

  lines.push('')

  if (form.name.trim()) lines.push(`Nombre: ${form.name.trim()}`)
  if (form.date) lines.push(`Fecha del evento: ${form.date}`)
  if (form.location.trim()) lines.push(`Lugar: ${form.location.trim()}`)
  if (form.notes.trim()) lines.push(`Detalles: ${form.notes.trim()}`)

  const withPrice = items.filter((i) => i.price !== null)
  if (withPrice.length > 0) {
    const subtotal = withPrice.reduce((acc, i) => acc + (i.price ?? 0), 0)
    lines.push('', `Subtotal estimado: ${formatClp(subtotal)}`)
    if (withPrice.length < items.length) {
      const missing = items.length - withPrice.length
      lines.push(`(${missing} ítem${missing === 1 ? '' : 's'} sin precio en catálogo)`)
    }
  }

  lines.push('', '¡Quedo atento/a! 😊')

  return lines.join('\n')
}

export function openWhatsApp(number: string, message: string): void {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
