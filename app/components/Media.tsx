import React from 'react'
import  Badge from "../utils/Badge";

export default function Media() {
    return (
        <div className="relative flex flex-col  items-center justify-evenly gap-12 py-24">
            <a
                href="/mobilewallpapers"
                className="group relative overflow-hidden rounded-lg p-2 transition-transform hover:scale-105"
            >
                <div className="absolute inset-0 group-hover:opacity-100"/>
                <p className="relative font-bold text-5xl md:text-9xl text-primary-foreground uppercase z-10 underline whitespace-nowrap">
                    Mobile Wallpapers
                </p>
            </a>

            <div className="relative overflow-hidden rounded-lg p-2 ">
                <div className="absolute inset-0 "/>
                <p className="relative font-bold text-5xl md:text-9xl text-gray-100 dark:text-gray-200 uppercase z-10 opacity-70 underline">
                    Banners
                </p>
                <Badge
                    variant="secondary"
                >
                    Coming Soon
                </Badge>
            </div>
        </div>
    )
}