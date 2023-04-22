import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PartySelect from './Components/Pages/PartySelect'
import CharacterSelect from './Components/Pages/CharacterSelect'
import CharacterInfo from './Components/Pages/CharacterInfo'

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Character Sheet Application</h1>
      </div>
      <Routes>
        <Route exact path="/" element={<CharacterSelect />}></Route>
        <Route path="/PartySelect" element={<PartySelect />}></Route>
        <Route path="/CharacterInfo" element={<CharacterInfo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
