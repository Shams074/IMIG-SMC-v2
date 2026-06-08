import { ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

// ---- Section Wrapper ----
export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={clsx('py-16 md:py-20 px-6', className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

// ---- Section Header ----
export function SectionHeader({
  label,
  title,
  subtitle,
  center = false,
}: {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={clsx('mb-10', center && 'text-center')}>
      {label && (
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-500 mb-2">{label}</p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue-900 leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className={clsx('text-blue-600/70 text-base leading-relaxed', center ? 'max-w-xl mx-auto' : 'max-w-2xl')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ---- Button ----
export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
}: {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  className?: string
  onClick?: () => void
}) {
  const base = 'inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200'
  const variants = {
    primary:   'bg-blue-500 text-white hover:bg-blue-700 shadow-sm hover:shadow-md hover:-translate-y-0.5',
    secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    outline:   'border-2 border-blue-500 text-blue-600 hover:bg-blue-50',
    ghost:     'text-blue-600 hover:bg-blue-50',
  }

  if (href) {
    return (
      <Link href={href} className={clsx(base, variants[variant], className)}>
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} className={clsx(base, variants[variant], className)}>
      {children}
    </button>
  )
}

// ---- Tag / Badge ----
export function Tag({
  children,
  color = 'blue',
}: {
  children: ReactNode
  color?: 'blue' | 'teal' | 'amber' | 'red'
}) {
  const colors = {
    blue:  'bg-blue-100 text-blue-800',
    teal:  'bg-teal-100 text-teal-800',
    amber: 'bg-amber-100 text-amber-800',
    red:   'bg-red-100 text-red-800',
  }
  return (
    <span className={clsx('text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full', colors[color])}>
      {children}
    </span>
  )
}

// ---- Card ----
export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border border-blue-100 p-6',
        hover && 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/60 hover:border-blue-200',
        className
      )}
    >
      {children}
    </div>
  )
}
