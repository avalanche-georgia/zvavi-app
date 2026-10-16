import { useLocale } from 'next-intl'

const useLocalizeField = () => {
  const locale = useLocale()

  // A blank Georgian field ('' from the admin forms) falls back to English too
  return (en: string, ka: string | null | undefined): string => (locale === 'ka' && ka) || en
}

export default useLocalizeField
