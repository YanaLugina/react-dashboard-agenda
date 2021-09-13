import { addMinutes } from 'date-fns'

function chunkFrom(i, dateLocale, chunksTime) {
  return addMinutes(new Date(dateLocale), chunksTime * i)
}

export default chunkFrom
