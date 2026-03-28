/**
 * from ISO string to human read date
 */
export const formatRelativeDate = (isoString: string | undefined): string => {
  if (!isoString) return '—'

  const date = new Date(isoString)

  if (isNaN(date.getTime())) return 'Некорректная дата'

  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' })

  if (diffInSeconds < 60) {
    return 'только что'
  }

  if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
  }

  if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
  }

  if (diffInSeconds < 604800) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
  }

  return date.toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}
