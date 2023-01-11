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

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (value) => {
    cardOne ? setCardTwo(value) : setCardOne(value)
  }

  useEffect(() => {
    if (cardOne && cardTwo) {
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
      else {
        console.log("cards are not matching");
      }
      setTimeout(()=>resetTurn(), 1000) 
    }
  }, [cardOne, cardTwo])

  console.log(cards)

  const resetTurn = () => {
    setCardOne(null)
    setCardTwo(null)
    setTurns(prevTurn => prevTurn + 1)
  }
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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
