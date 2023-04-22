import React, { useEffect, useState } from 'react'

import { getAllCharacters } from '../../Services/api'

import './CharacterSelect.css'

import Card from '../UI/Card'

const CharacterSelect = () => {
    const [characters, setCharacters] = useState([])

    const fetchCharacters = async () => {
        let characterArr = await getAllCharacters()
        setCharacters(characterArr.data)
    }

    useEffect(() => {
        fetchCharacters()
    }, [])

  return (
    <div className="characterSelect">
        <p>CharacterSelect</p>
        <button onClick={() => {
            console.log(characters)
        }}>log</button>
        {characters.map((character) => {
            console.log(character)
            return <Card key={character.id} character={character} />
        })}
    </div>
  )
}

export default CharacterSelect
