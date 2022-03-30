import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { actionSeyByKey, IUser, selectUserField } from './store'

export default function App() {
  const name = useSelector(selectUserField('name'))
  const surname = useSelector(selectUserField('surname'))
  const country = useSelector(selectUserField('country'))
  const city = useSelector(selectUserField('city'))
  const hobbies = useSelector(selectUserField('hobbies'))

  const dispatch = useDispatch()

  const handleChange = (field: keyof IUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(actionSeyByKey(field, value))
  }

  return (
    <div className="App">
      <h1>Redux-toolkit example</h1>

      <label>
        name
        <input value={name} onChange={handleChange('name')} />
      </label>
      <label>
        surname
        <input value={surname} onChange={handleChange('surname')} />
      </label>

      <label>
        country
        <input value={country} onChange={handleChange('country')} />
      </label>

      <label>
        city
        <input value={city} onChange={handleChange('city')} />
      </label>

      <label>
        hobbies
        <input value={hobbies} onChange={handleChange('hobbies')} />
      </label>
    </div>
  )
}
