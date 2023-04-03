import React, { useState, useEffect } from 'react'
import qs from 'querystring'

import api from '../Services/api'

const DataTest = () => {
  const initialNameState = ""

  const [name, setName] = useState(initialNameState)
  const [int, setInt] = useState(0)

  useEffect(() => {
    refreshNameTable()
  }, [])

  const handleInputChange = (e) => {
    setName(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault()
    api.post('api', qs.stringify(name))
        .then(res => {
            refreshNameTable()
        })
  }

  const refreshNameTable = () => {
    api.get('api')
        .then(res=>res.data)
        .then(data=>setName(data))
  }

  return (
    <div className='dataTestDiv'>
        <h2>{name}</h2>
        <form onSubmit={submitForm}>
            <div>
                <label htmlFor='name'>Change Character Name: </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button>Submit</button>
        </form>
        <p>Your INT is: {int}</p>
        <button onClick={() => {setInt(int + 1)}}>Add +1 INT</button>
    </div>
  )
}

export default DataTest