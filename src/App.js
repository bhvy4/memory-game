import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [disable, setDisable] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards)
    setCardOne(null)
    setCardTwo(null)
    setTurns(0)
  }

  const handleChoice = (value) => {
    cardOne ? setCardTwo(value) : setCardOne(value)
  }

  //Match the cards
  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisable(true)
      if (cardOne.src === cardTwo.src) {
        setCards(
          prevCards => {
            return prevCards.map((card) => {
              if (card.src === cardOne.src) {
                return { ...card, matched: true }
              }
              else
                return card
            })
          }
        )
      }
      
      setTimeout(()=>resetTurn(), 1000) 
    }
  }, [cardOne, cardTwo])


  const resetTurn = () => {
    setDisable(false)
    setCardOne(null)
    setCardTwo(null)
    setTurns(prevTurn => prevTurn + 1)
  }

  //start the game automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Image Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === cardOne || card === cardTwo || card.matched}
            disable = {disable}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
