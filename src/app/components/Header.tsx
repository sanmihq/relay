import { appConfig } from '@/config/appConfig'
import React from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header>
        <div className='flex items-center justify-between p-4 max-w-5xl mx-auto'>
            <span className='font-bold text-xl'>{appConfig.name}</span>
            <ThemeToggle/>
        </div>
    </header>
  )
}
