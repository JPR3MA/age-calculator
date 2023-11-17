import './App.css'
import { useState, FormEvent } from 'react'

type Elapsed = {
  days: undefined | number ,
  months: undefined | number ,
  years: undefined | number
}

function App() {
  const [elapsed, setElapsed] = useState<Elapsed>({
    days: undefined,
    months: undefined,
    years: undefined
  })


  return (
    <>
      <div>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          const formData = new FormData(e.target) // for some reason ts does not like this e.target or the (e: FormEvent<HTMLFormElement>)
          const { day, month, year } = Object.fromEntries(formData)
          const inputDate = new Date(`${year}-${month}-${day}`).getTime()
          const currentDate = new Date().getTime()
          const timeDiff = currentDate - inputDate
          
          console.log(timeDiff)
          console.log(currentDate)
          console.log(inputDate)

          const elapsedYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25))
          const elapsedMonths = Math.floor((timeDiff / (1000 * 60 * 60 * 24 * 365.25) - elapsedYears) * 12)
          const elapsedDays = Math.floor(((timeDiff / (1000 * 60 * 60 * 24 * 365.25) - elapsedYears ) * 12 - elapsedMonths) * (365.25 / 12))
          setElapsed({
            days: elapsedDays,
            months: elapsedMonths,
            years: elapsedYears
          })
        }}>
          <label htmlFor='day'>Day</label>
          <input placeholder='DD' id='day' name='day'></input>
          <label htmlFor='month'>Month</label>
          <input placeholder='MM' id='month' name='month'></input>
          <label htmlFor='year'>Year</label>
          <input placeholder='YYYY' id='year' name='year'></input>
          <button type='submit'>Calculate!</button>
        </form>
      </div>
      <div>
        <h3>{elapsed.years} Years</h3>
        <h3>{elapsed.months} Months</h3>
        <h3>{elapsed.days} Days</h3>
      </div>
    </>
  )
}

export default App
