import days from "../../constants/days"

export const getTime = (time: number | string, noClockTime?: boolean) => {
  const newDate = new Date(time)
  const weekDay = days[newDate.getDay()]
  const year = newDate.getFullYear()
  const longMonth = newDate.toLocaleString('en-us', { month: 'long' })
  const shortMonth = newDate.toLocaleString('en-us', { month: 'short' })
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ampm;
  if(noClockTime) {
    return `${shortMonth} ${newDate.getDay() + 1}, ${year}`
  }
  return `${weekDay} ${newDate.getMonth() + 1}, ${year} ${strTime}`
}