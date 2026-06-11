import { Link } from '@inertiajs/react'
import AppLogo from '@/components/app-logo'
import { home } from '@/routes'
import type { AuthLayoutProps } from '@/types'

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#f5ead0] via-background to-[#f0a83a]/20 p-6 md:p-10 dark:from-[#1d1a2f] dark:via-background dark:to-[#5a3470]/30">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex items-center justify-center font-medium"
                            aria-label="Ir al inicio de Carmen Saa Eventos"
                        >
                            <AppLogo />
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
