import { useLocale } from 'next-intl'

const useLocalizeField = () => {
  const locale = useLocale()

  return (en: string, ka: string | null | undefined): string => (locale === 'ka' ? (ka ?? en) : en)
}

export default useLocalizeField
