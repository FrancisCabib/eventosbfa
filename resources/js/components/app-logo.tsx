import AppLogoIcon from '@/components/app-logo-icon'

export default function AppLogo() {
    return (
        <div className="flex min-w-0 items-center">
            <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#c8323c] via-[#e85a85] to-[#f0a83a] text-[#f5ead0] shadow-md ring-2 ring-[#f0a83a]/35">
                <AppLogoIcon className="size-6" />
            </div>
            <div className="ml-2 grid min-w-0 flex-1 text-left leading-tight">
                <span className="truncate font-display text-sm font-bold tracking-tight text-sidebar-foreground">
                    Carmen Saa
                </span>
                <span className="truncate text-xs font-semibold text-[#c8323c] dark:text-[#f0a83a]">
                    Eventos
                </span>
            </div>
        </div>
    )
}
