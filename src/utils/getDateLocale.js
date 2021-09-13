import { formatISO, startOfDay } from 'date-fns'

const getDateLocale = (date, locale) => {
  return formatISO(startOfDay(new Date(date)), {
    locale: locale
  })
}

export default getDateLocale
