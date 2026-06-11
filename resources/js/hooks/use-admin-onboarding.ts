import { router, usePage } from '@inertiajs/react'
import { useCallback, useEffect, useRef } from 'react'
import {
    consumePendingServicesTour,
    detectAdminPage,
    hasSeenCompleteServicesTour,
    requestCompleteServicesTour,
    startCompleteServicesTour,
} from '@/lib/admin-onboarding'

const TOUR_START_DELAY_MS = 650
const SERVICES_URL = '/admin/services'

export const useAdminOnboarding = () => {
    const { url } = usePage()
    const driverRef = useRef<ReturnType<typeof startCompleteServicesTour> | null>(null)
    const currentPage = detectAdminPage(url)

    const launchServicesTour = useCallback((markSeenOnComplete = false) => {
        driverRef.current?.destroy()

        window.setTimeout(() => {
            driverRef.current = startCompleteServicesTour({ markSeen: markSeenOnComplete })
        }, TOUR_START_DELAY_MS)
    }, [])

    const runCompleteTour = useCallback(
        (markSeenOnComplete = false) => {
            if (currentPage !== 'services') {
                requestCompleteServicesTour(markSeenOnComplete)
                router.visit(SERVICES_URL)
                return
            }

            launchServicesTour(markSeenOnComplete)
        },
        [currentPage, launchServicesTour],
    )

    const runTourAgain = useCallback(() => {
        runCompleteTour(false)
    }, [runCompleteTour])

    useEffect(() => {
        if (currentPage !== 'services') {
            if (!hasSeenCompleteServicesTour()) {
                requestCompleteServicesTour(true)
                router.visit(SERVICES_URL)
            }

            return
        }

        const { pending, markSeenOnComplete } = consumePendingServicesTour()

        if (pending) {
            launchServicesTour(markSeenOnComplete)
            return
        }

        if (!hasSeenCompleteServicesTour()) {
            launchServicesTour(true)
        }
    }, [currentPage, launchServicesTour])

    useEffect(() => {
        return () => {
            driverRef.current?.destroy()
        }
    }, [])

    return {
        currentPage,
        runTourAgain,
        isOnboardingAvailable: currentPage !== null,
    }
}
