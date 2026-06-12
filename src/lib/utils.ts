import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Brand colours — single source of truth */
export const BRAND_ORANGE      = '#E8481C' as const
export const BRAND_ORANGE_HOVER= '#D03D14' as const
export const CB9_DARK          = '#171717' as const
export const CB9_DARKEST       = '#0d0d0d' as const

/**
 * Warm cream — light alternating section background.
 * Pairs with #171717 text and #E8481C accents.
 */
export const CB9_LIGHT         = '#F5F1EC' as const

/** Token objects for light vs dark section theming */
export const DARK_SECTION = {
  bg:          CB9_DARK,
  bgDeep:      CB9_DARKEST,
  text:        '#ffffff',
  textMuted:   'rgba(255,255,255,0.55)',
  textFaint:   'rgba(255,255,255,0.30)',
  border:      'rgba(255,255,255,0.08)',
  cardBg:      CB9_DARKEST,
} as const

export const LIGHT_SECTION = {
  bg:          CB9_LIGHT,
  bgDeep:      '#ede9e2',
  text:        '#171717',
  textMuted:   'rgba(23,23,23,0.58)',
  textFaint:   'rgba(23,23,23,0.32)',
  border:      'rgba(0,0,0,0.08)',
  cardBg:      '#ffffff',
} as const
