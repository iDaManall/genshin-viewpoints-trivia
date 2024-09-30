import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import cards from '../cards.json';

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCardClick = () => {
    setShowAnswer(!showAnswer); // to switch the bool value of showAnswer
  }

  const handleNextClick = () => {
    // next card will be randomly selected from our list of dicts
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentCardIndex(randomIndex);
    setShowAnswer(false); // don't show answer right away when moving to next card
  }

  const currentCard = cards[currentCardIndex];
  const backgroundImage = currentCard.image;
  const content = showAnswer ? { viewpoint: currentCard.answer, description: '' } : { viewpoint: currentCard.question.split('\n')[0], description: currentCard.question.split('\n')[1] };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className= "header">
        <h2>Genshin Viewpoint Trivia</h2>
        <h4>How well do you know the Genshin viewpoint locations? Guess the Nation based on the description, viewpoint name, and image!</h4>
        <h5>Number of Cards: {cards.length}</h5>
      </div>

      <Card content = {content} onclick={handleCardClick} />
      <button onClick={handleNextClick}>Next</button>
    </div>
  )
}

export default App
