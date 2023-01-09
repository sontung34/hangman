import './App.css';
import React, { useState, useEffect }from 'react';
import Header from './components/Header';
import Figures from './components/Figures';
import Word from './components/Word';
import WrongLetters from './components/WrongLetters';
import PopUp from './components/PopUp';
import Notification from './components/Notification';
import {germanAdjective} from './data';
import {showNotification as show} from './helpers/helpers';
import Hint from './components/Hint';
import Keyboard from './components/Keyboard';
import { alphabet } from './data.js'

let randomNumber = Math.floor(Math.random()*germanAdjective.length)
let selectedWord = germanAdjective[randomNumber].German
let translatedWord = germanAdjective[randomNumber].English

function App() {

  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [hint, setHint] = useState(false)
  // const [alphabet, setAlphabet] = useState(alphabet)

  useEffect(()=>{
    function handleKeydown(event){
      const {key, keyCode} = event;
      if (playable && keyCode >= 65 && keyCode <= 90){
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)){
          if(!correctLetters.includes(letter)){
            setCorrectLetters(currentLetter => [...currentLetter, letter]);
            
          }
          else{
            show(setShowNotification)
          }
        }
        else{
          if(!wrongLetters.includes(letter)){
            setWrongLetters(currentLetter => [...currentLetter, letter]);
          }
          else{
            show(setShowNotification)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown',handleKeydown)
  },[correctLetters,wrongLetters,playable])

  const playAgain = () =>{
    setPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])
    const randomNumber = Math.floor(Math.random()* germanAdjective.length)
    setHint(false)
    selectedWord = germanAdjective[randomNumber].German
    translatedWord = germanAdjective[randomNumber].English
  }
  const handleHint = () =>{
    setHint(!hint)
  }
  return (
    <>
      <Header/>
      <div className='game-container'>
        <Figures wrongLetters = {wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
      </div>
      <PopUp
        correctLetters={correctLetters} 
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification}/>
      <Hint 
        handleHint={handleHint}
        hint = {hint}
        translatedWord = {translatedWord}
      />
      {/* <Keyboard
        array = {alphabet}
        wrongLetters = {wrongLetters}
      /> */}
      
  </>
      
  );
}

export default App;
