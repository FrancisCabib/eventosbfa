import { GraduationCap } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { useAdminOnboarding } from '@/hooks/use-admin-onboarding'

export const AdminOnboardingGuide = () => {
    const { runTourAgain, isOnboardingAvailable } = useAdminOnboarding()

    if (!isOnboardingAvailable) {
        return null
    }

    const handleStartGuide = () => {
        runTourAgain()
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
            return
        }

        event.preventDefault()
        handleStartGuide()
    }

    return (
        <Button
            type="button"
            size="sm"
            className="ml-auto gap-2 border-[#c8323c]/30 bg-gradient-to-r from-[#c8323c] to-[#e85a85] text-white shadow-sm hover:from-[#b02a33] hover:to-[#d14a72]"
            data-tour="onboarding-guide-button"
            aria-label="Iniciar recorrido completo de la sección Servicios"
            onClick={handleStartGuide}
            onKeyDown={handleKeyDown}
        >
            <GraduationCap className="size-4" aria-hidden="true" />
            Ver guía
        </Button>
    )
}
