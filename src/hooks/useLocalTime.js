import { useEffect, useState } from 'react'

function format(timeZone) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
    }).format(new Date())
  } catch {
    return ''
  }
}

/** "HH:MM" in the given IANA time zone, refreshed periodically. */
export default function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => format(timeZone))

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 15000)
    return () => clearInterval(id)
  }, [timeZone])

  return time
}
