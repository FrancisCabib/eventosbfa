import type { SVGAttributes } from 'react'

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M6 10C6 8.343 7.343 7 9 7H31C32.657 7 34 8.343 34 10V30C34 31.657 32.657 33 31 33H9C7.343 33 6 31.657 6 30V10Z"
                fill="white"
                fillOpacity="0.95"
            />
            <circle cx="6" cy="14" r="2.5" fill="currentColor" className="text-[#f5ead0]" />
            <circle cx="6" cy="20" r="2.5" fill="currentColor" className="text-[#f5ead0]" />
            <circle cx="6" cy="26" r="2.5" fill="currentColor" className="text-[#f5ead0]" />
            <circle cx="34" cy="14" r="2.5" fill="currentColor" className="text-[#f5ead0]" />
            <circle cx="34" cy="20" r="2.5" fill="currentColor" className="text-[#f5ead0]" />
            <circle cx="34" cy="26" r="2.5" fill="currentColor" className="text-[#f5ead0]" />
            <rect x="10" y="11" width="20" height="3" rx="1.5" fill="#c8323c" />
            <rect x="10" y="17" width="14" height="2.5" rx="1.25" fill="#f0a83a" />
            <rect x="10" y="22" width="18" height="2.5" rx="1.25" fill="#3f9b8a" />
            <path
                d="M20 27L17.5 31.5H22.5L20 27Z"
                fill="#e85a85"
            />
            <circle cx="28" cy="24" r="3" fill="#f0a83a" />
            <path
                d="M28 21.5V26.5M26.5 24H29.5"
                stroke="#c8323c"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
        </svg>
    )
}
