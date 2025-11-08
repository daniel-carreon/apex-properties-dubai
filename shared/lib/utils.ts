import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price in AED with proper comma separation
 */
export function formatPriceAED(price: number): string {
  return `AED ${price.toLocaleString('en-AE')}`
}

/**
 * Format price in USD with proper comma separation
 */
export function formatPriceUSD(price: number): string {
  return `$${price.toLocaleString('en-US')}`
}

/**
 * Format number with K, M suffix
 */
export function formatNumberShort(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

/**
 * Convert square feet to square meters
 */
export function sqftToSqm(sqft: number): number {
  return Math.round(sqft * 0.092903)
}

/**
 * Convert square meters to square feet
 */
export function sqmToSqft(sqm: number): number {
  return Math.round(sqm / 0.092903)
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}
