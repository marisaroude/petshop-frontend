// import { formatLocalDate, parseLocalDate } from '@/app/utils/date/date'
import React, { useState } from 'react'

function DatesFieldServices({ label, dates, setDates }) {
  const [newDate, setNewDate] = useState('')

  const handleAdd = () => {
    if (newDate && !dates.includes(newDate)) {
      setDates([...dates, newDate])
      setNewDate('')
    }
  }

  const handleRemove = dateToRemove => {
    setDates(dates.filter(date => date !== dateToRemove))
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-black font-semibold">{label}</label>

      <div className="flex gap-2">
        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          className="p-2 rounded-md bg-white"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newDate}
          className="bg-blue-500 text-gray-50 px-4 py-2 rounded-md disabled:bg-gray-400">
          Agregar
        </button>
      </div>

      <ul className="bg-gray-100 p-2 rounded-md">
        {dates.map((date, index) => (
          <li key={index} className="flex justify-between items-center p-1">
            {/* <span>{formatLocalDate(parseLocalDate(date))}</span> */}
            {/* <span>{parseLocalDate(date)}</span> */}
            <span>{date}</span>
            <button
              type="button"
              onClick={() => handleRemove(date)}
              className="bg-red-500 text-gray-50 px-2 py-1 rounded-md">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DatesFieldServices
