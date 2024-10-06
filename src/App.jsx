import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import cards from '../cards.json';

const App = () => {
  // state variables
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardOrder, setCardOrder] = useState([]);
  // for guessing 
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // point and streak system
  const [points, setPoints] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    // Initialize card order with a shuffled order of indices
    const initialOrder = cards.map((_, index) => index);
    setCardOrder(shuffleArray(initialOrder));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = () => {
    // setShowAnswer(!showAnswer); // to switch the bool value of showAnswer
    setShowAnswer((prevShowAnswer) => !prevShowAnswer);
    setHasSubmitted(true); // user can't guess if they flipped the card 
  };

  const handleNextClick = () => {
    // next card will be randomly selected from our list of dicts
    // const randomIndex = Math.floor(Math.random() * cards.length);
    // setCurrentCardIndex(randomIndex);
    // setShowAnswer(false); // don't show answer right away when moving to next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardOrder.length);
    setShowAnswer(false);
    setUserGuess('');
    setFeedback('');
    setHasSubmitted(false);
  };

  const handleBackClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cardOrder.length) % cardOrder.length);
    setShowAnswer(false);
    setUserGuess('');
    setFeedback('');
    setHasSubmitted(false);
  };

  const handleShuffleClick = () => {
    const newOrder = shuffleArray([...cardOrder]);
    setCardOrder(newOrder);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setUserGuess('');
    setFeedback('');
    setHasSubmitted(false);
  };

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmitGuess = () => {
    const currentCard = cards[cardOrder[currentCardIndex]];
    if (userGuess.toLowerCase() === currentCard.answer.toLowerCase()) {
      setFeedback('correct');
      setPoints((prevPoints) => prevPoints + 1);
      setCurrentStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }
        return newStreak;
      });
      setHasSubmitted(true); // Disable further submissions for this card
    } else {
      setFeedback('incorrect');
      setCurrentStreak(0);
    }
  };

  if (cardOrder.length === 0) {
    return <div>Loading...</div>;
  }

  const currentCard = cards[cardOrder[currentCardIndex]];
  if (!currentCard) {
    return <div>Loading...</div>;
  }

  const backgroundImage = currentCard.image;
  const content = showAnswer ? { viewpoint: currentCard.answer, description: '' } : { viewpoint: currentCard.question.split('\n')[0], description: currentCard.question.split('\n')[1] };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className= "header">
        <h2>Genshin Viewpoint Trivia</h2>
        <h4>How well do you know the Genshin viewpoint locations? Guess the Nation based on the description, viewpoint name, and image!</h4>
        <h5>Number of Cards: {cards.length}</h5>
        <h5>Points: {points}</h5>
        <h5>Current Streak: {currentStreak}</h5>
        <h5>Longest Streak: {longestStreak}</h5>
      </div>

      <Card content = {content} onclick={handleCardClick} />

      <div className="input-container">
        <input
          type="text"
          value={userGuess}
          onChange={handleInputChange}
          placeholder="Enter your guess"
          className={feedback}
        />
        <button onClick={handleSubmitGuess} disabled={hasSubmitted}>Submit</button>
      </div>
      {/* {feedback && <div className="feedback">{feedback}</div>} */}

      <div className="button-container">
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleNextClick}>Next</button>
        <button onClick={handleShuffleClick}>Shuffle</button>
      </div>
    </div>
  );
};

export default App;
