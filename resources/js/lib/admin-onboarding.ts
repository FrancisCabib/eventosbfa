import { driver, type DriveStep, type Driver } from 'driver.js'

export type AdminOnboardingPage = 'dashboard' | 'services' | 'categories'

export type ServicesOnboardingHandlers = {
    openCreateModal: () => void
    closeServiceModal: () => void
}

const STORAGE_PREFIX = 'carmen_admin_onboarding_v1'
const COMPLETE_TOUR_SEEN_KEY = `${STORAGE_PREFIX}_services_complete_seen`
export const PENDING_SERVICES_TOUR_KEY = `${STORAGE_PREFIX}_pending_services_tour`
const FORM_OPEN_DELAY_MS = 500
const SERVICES_PATH = '/admin/services'

let registeredServicesHandlers: ServicesOnboardingHandlers | null = null

export const registerServicesOnboardingHandlers = (
    handlers: ServicesOnboardingHandlers | null,
): void => {
    registeredServicesHandlers = handlers
}

export const requestCompleteServicesTour = (markSeenOnComplete = false): void => {
    if (typeof window === 'undefined') {
        return
    }

    window.sessionStorage.setItem(
        PENDING_SERVICES_TOUR_KEY,
        markSeenOnComplete ? 'first' : 'repeat',
    )
}

export const consumePendingServicesTour = (): {
    pending: boolean
    markSeenOnComplete: boolean
} => {
    if (typeof window === 'undefined') {
        return { pending: false, markSeenOnComplete: false }
    }

    const value = window.sessionStorage.getItem(PENDING_SERVICES_TOUR_KEY)
    window.sessionStorage.removeItem(PENDING_SERVICES_TOUR_KEY)

    if (value === 'first') {
        return { pending: true, markSeenOnComplete: true }
    }

    if (value === 'repeat') {
        return { pending: true, markSeenOnComplete: false }
    }

    return { pending: false, markSeenOnComplete: false }
}

export const hasSeenCompleteServicesTour = (): boolean => {
    if (typeof window === 'undefined') {
        return true
    }

    return window.localStorage.getItem(COMPLETE_TOUR_SEEN_KEY) === 'true'
}

export const markCompleteServicesTourSeen = (): void => {
    if (typeof window === 'undefined') {
        return
    }

    window.localStorage.setItem(COMPLETE_TOUR_SEEN_KEY, 'true')
}

export const resetAllOnboarding = (): void => {
    if (typeof window === 'undefined') {
        return
    }

    window.localStorage.removeItem(COMPLETE_TOUR_SEEN_KEY)
    window.sessionStorage.removeItem(PENDING_SERVICES_TOUR_KEY)
}

const driverConfig = {
    showProgress: true,
    animate: true,
    smoothScroll: true,
    allowClose: true,
    overlayOpacity: 0.72,
    stagePadding: 10,
    stageRadius: 8,
    disableActiveInteraction: true,
    popoverClass: 'carmen-admin-onboarding-popover',
    nextBtnText: 'Siguiente →',
    prevBtnText: '← Anterior',
    doneBtnText: '¡Listo, a practicar!',
    progressText: 'Paso {{current}} de {{total}}',
}

const elementExists = (selector: string): boolean => {
    if (typeof document === 'undefined') {
        return false
    }

    return document.querySelector(selector) !== null
}

const withElementFallback = (
    selector: string,
    step: DriveStep,
    fallback: DriveStep,
): DriveStep => (elementExists(selector) ? step : fallback)

const servicesWelcomeStep: DriveStep = {
    element: '[data-tour="services-page-header"]',
    popover: {
        title: 'Recorrido completo — Servicios',
        description:
            'Esta guía te enseña a usar toda la sección de Servicios: ver tus máquinas, editarlas, ocultarlas del catálogo, agregar nuevas y completar el formulario campo por campo.',
        side: 'bottom',
        align: 'start',
    },
}

const servicesTableOverviewStep: DriveStep = {
    element: '[data-tour="services-table"]',
    popover: {
        title: 'Tu listado de máquinas',
        description:
            'Cada fila es una máquina que ven tus clientes en la web. Aquí ves categoría, precio, orden de aparición y si está activa o inactiva.',
        side: 'top',
        align: 'start',
    },
}

const servicesEditStep: DriveStep = {
    element: '[data-tour="services-edit-button"]',
    disableActiveInteraction: false,
    popover: {
        title: 'Paso 3 — Editar una máquina',
        description:
            '1) Pulsa el lápiz de la fila.\n2) Cambia nombre, descripción o precio.\n3) Pulsa "Guardar".\n\nPuedes abrir el formulario ahora para practicar.',
        side: 'left',
        align: 'center',
    },
}

const servicesEditFallbackStep: DriveStep = {
    element: '[data-tour="services-table"]',
    popover: {
        title: 'Paso 3 — Editar una máquina',
        description:
            'Cuando tengas filas en la lista, pulsa el lápiz para editar. Si está vacía, más adelante aprenderás a crear una con "Nuevo servicio".',
        side: 'top',
        align: 'start',
    },
}

const servicesToggleStep: DriveStep = {
    element: '[data-tour="services-toggle-button"]',
    disableActiveInteraction: false,
    popover: {
        title: 'Paso 4 — Ocultar sin borrar',
        description:
            'Pulsa "Activo" para pasar a "Inactivo". La máquina desaparece del catálogo web pero sigue guardada aquí. Vuelve a pulsar para reactivarla.',
        side: 'bottom',
        align: 'center',
    },
}

const servicesToggleFallbackStep: DriveStep = {
    element: '[data-tour="services-table"]',
    popover: {
        title: 'Paso 4 — Ocultar sin borrar',
        description:
            'La columna "Estado" permite activar o inactivar cada máquina sin eliminarla del sistema.',
        side: 'top',
        align: 'start',
    },
}

const servicesDeleteStep: DriveStep = {
    element: '[data-tour="services-delete-button"]',
    popover: {
        title: 'Paso 6 — Eliminar (último recurso)',
        description:
            'El ícono rojo borra la máquina para siempre. Si solo quieres ocultarla un tiempo, usa "Inactivo" (paso 4).',
        side: 'left',
        align: 'center',
    },
}

const servicesDeleteFallbackStep: DriveStep = {
    element: '[data-tour="services-table"]',
    popover: {
        title: 'Paso 6 — Eliminar (último recurso)',
        description:
            'El ícono rojo en cada fila elimina la máquina permanentemente. Úsalo solo si ya no la ofrecerás nunca más.',
        side: 'top',
        align: 'start',
    },
}

const servicesFinishStep: DriveStep = {
    element: '[data-tour="onboarding-guide-button"]',
    popover: {
        title: 'Recorrido completado',
        description:
            'Ya conoces Servicios de punta a punta. Pulsa "Ver guía" cuando quieras repetir este recorrido completo.',
        side: 'bottom',
        align: 'end',
    },
}

const servicesCreateFallbackStep: DriveStep = {
    element: '[data-tour="services-create-button"]',
    disableActiveInteraction: false,
    popover: {
        title: 'Paso 5 — Agregar máquina',
        description:
            'Pulsa "Nuevo servicio" para abrir el formulario. Completa al menos Nombre y Descripción corta, luego Crear.',
        side: 'left',
        align: 'start',
    },
}

const getServicesFormSteps = (): DriveStep[] => [
    {
        element: '[data-tour="service-form-dialog"]',
        popover: {
            title: 'Formulario — visión general',
            description:
                'Vamos campo por campo. Los que tienen * son obligatorios. Puedes escribir mientras avanzas.',
            side: 'left',
            align: 'start',
        },
    },
    {
        element: '[data-tour="service-form-title"]',
        disableActiveInteraction: false,
        popover: {
            title: 'Nombre *',
            description:
                'Nombre de la máquina tal como la verán tus clientes.\n\nEjemplo: Máquina de Algodón de Azúcar.',
            side: 'bottom',
            align: 'start',
        },
    },
    {
        element: '[data-tour="service-form-subtitle"]',
        disableActiveInteraction: false,
        popover: {
            title: 'Subtítulo (opcional)',
            description:
                'Frase corta debajo del nombre.\n\nEjemplo: El clásico favorito de los niños.',
            side: 'bottom',
            align: 'start',
        },
    },
    {
        element: '[data-tour="service-form-short-description"]',
        disableActiveInteraction: false,
        popover: {
            title: 'Descripción corta *',
            description:
                'Resumen para el catálogo web. Una o dos frases sobre qué ofrece la máquina. Campo obligatorio.',
            side: 'bottom',
            align: 'start',
        },
    },
    {
        element: '[data-tour="service-form-long-description"]',
        disableActiveInteraction: false,
        popover: {
            title: 'Descripción larga (opcional)',
            description:
                'Más detalle: capacidad, qué incluye el arriendo, duración, etc.',
            side: 'bottom',
            align: 'start',
        },
    },
    {
        element: '[data-tour="service-form-price"]',
        disableActiveInteraction: false,
        popover: {
            title: 'Precio CLP (opcional)',
            description:
                'Solo números en pesos chilenos. Si lo dejas vacío, en el catálogo dirá "por cotizar".',
            side: 'top',
            align: 'start',
        },
    },
    {
        element: '[data-tour="service-form-sort-order"]',
        disableActiveInteraction: false,
        popover: {
            title: 'Orden',
            description:
                'Número para ordenar en el catálogo. Menor número = aparece más arriba. 0 está bien.',
            side: 'top',
            align: 'start',
        },
    },
    {
        element: '[data-tour="service-form-category"]',
        disableActiveInteraction: false,
        popover: {
            title: 'Categoría (opcional)',
            description:
                'Agrupa la máquina, por ejemplo en "Máquinas para Eventos".',
            side: 'top',
            align: 'start',
        },
    },
    {
        element: '[data-tour="service-form-submit"]',
        disableActiveInteraction: false,
        popover: {
            title: 'Guardar — pulsa Crear',
            description:
                'Con Nombre y Descripción corta listos, pulsa "Crear". Puedes hacer una de prueba y borrarla después.',
            side: 'top',
            align: 'end',
        },
        onDeselected: () => {
            registeredServicesHandlers?.closeServiceModal()
        },
    },
]

const getServicesTailSteps = (): DriveStep[] => [
    withElementFallback(
        '[data-tour="services-delete-button"]',
        servicesDeleteStep,
        servicesDeleteFallbackStep,
    ),
    servicesFinishStep,
]

const buildCreateServiceStep = (): DriveStep => ({
    element: '[data-tour="services-create-button"]',
    disableActiveInteraction: false,
    popover: {
        title: 'Paso 5 — Abre el formulario',
        description:
            'Pulsa "Nuevo servicio" ahora. La guía continuará dentro del formulario explicando cada campo.',
        side: 'left',
        align: 'start',
        disableButtons: ['next'],
    },
    onHighlighted: (element, _step, { driver: driverObj }) => {
        if (!element || !registeredServicesHandlers) {
            return
        }

        const handleClick = () => {
            registeredServicesHandlers?.openCreateModal()

            window.setTimeout(() => {
                driverObj.setSteps([
                    ...getServicesFormSteps(),
                    ...getServicesTailSteps(),
                ])
                driverObj.drive(0)
            }, FORM_OPEN_DELAY_MS)
        }

        element.addEventListener('click', handleClick, { once: true })
    },
})

export const getCompleteServicesTourSteps = (): DriveStep[] => {
    const baseSteps: DriveStep[] = [
        servicesWelcomeStep,
        servicesTableOverviewStep,
        withElementFallback(
            '[data-tour="services-edit-button"]',
            servicesEditStep,
            servicesEditFallbackStep,
        ),
        withElementFallback(
            '[data-tour="services-toggle-button"]',
            servicesToggleStep,
            servicesToggleFallbackStep,
        ),
    ]

    if (registeredServicesHandlers) {
        return [...baseSteps, buildCreateServiceStep()]
    }

    return [
        ...baseSteps,
        servicesCreateFallbackStep,
        ...getServicesTailSteps(),
    ]
}

export const detectAdminPage = (pathname: string): AdminOnboardingPage | null => {
    if (pathname === '/dashboard' || pathname === '/') {
        return 'dashboard'
    }

    if (pathname.startsWith(SERVICES_PATH)) {
        return 'services'
    }

    if (pathname.startsWith('/admin/categories')) {
        return 'categories'
    }

    return null
}

export const isOnServicesPage = (pathname: string): boolean =>
    pathname.startsWith(SERVICES_PATH)

export const startCompleteServicesTour = (
    options: { markSeen?: boolean } = {},
): Driver | null => {
    if (typeof document === 'undefined') {
        return null
    }

    if (!isOnServicesPage(window.location.pathname)) {
        return null
    }

    const { markSeen = false } = options

    const driverObj = driver({
        ...driverConfig,
        steps: getCompleteServicesTourSteps(),
        onDestroyed: () => {
            if (markSeen) {
                markCompleteServicesTourSeen()
            }
        },
    })

    driverObj.drive()

    return driverObj
}
