import React, { useState,useEffect  } from 'react';
import { ChessPuzzle } from "@react-chess-tools/react-chess-puzzle";
import './Puzzle.css';
import SuccessDialog from '../Popup/SuccessDialog/SuccessDialog';
import { environment } from '../../environment/environment';
import {Chess} from 'chess.js';
import { Chessboard } from 'react-chessboard';

  
  const Puzzle = () => {
    const [puzzlesArray, setPuzzlesArray] = useState([]);

  // Make a GET request to fetch puzzle data
  
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [currentPuzzle, setCurrentPuzzle] = useState(puzzlesArray[currentPuzzleIndex]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  
    const handleNextPuzzle = () => {
      if (currentPuzzleIndex < puzzlesArray.length - 1) {
        setCurrentPuzzleIndex((prevIndex) => prevIndex + 1);
        setCurrentPuzzle(puzzlesArray[currentPuzzleIndex + 1]);
        setButtonPopup(false);
        setIsPuzzleSolved(false);
      }
    };
  
    const handlePuzzleFinish = () => {
      setIsPuzzleSolved(true);
    };
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
      const puzzleUrl = "http://localhost:8080/puzzles";
      fetch(puzzleUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setPuzzlesArray(data);
          setCurrentPuzzle(data[currentPuzzleIndex]); // Set current puzzle
          setIsLoading(false); // Data has been loaded
        })
        .catch((error) => {
          console.error('Error fetching puzzles:', error);
          setIsLoading(false); // Handle the error and set isLoading to false
        });
    }, [currentPuzzleIndex]);
  
  
    useEffect(() => {
      setCurrentPuzzle(puzzlesArray[currentPuzzleIndex]);
      setButtonPopup(false);
      setIsPuzzleSolved(false);
    }, [currentPuzzleIndex, setIsPuzzleSolved,puzzlesArray]);
    
  
    return (
      <div className='puzzleBox'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ChessPuzzle.Root key={currentPuzzleIndex} puzzle={currentPuzzle} onSolve={handlePuzzleFinish}>
          <div className="chessboard-container">
            <ChessPuzzle.Board onPieceDragEnd={handlePuzzleFinish} />
          </div>
          <button className='nextBtn' onClick={handleNextPuzzle}>
            <span className='nextText'>Next Puzzle</span>
          </button>
          {isPuzzleSolved && <SuccessDialog trigger={buttonPopup} setTrigger={setButtonPopup} />}
          <ChessPuzzle.Hint showOn={["in-progress", "not-started"]} />
          <ChessPuzzle.Reset showOn={["in-progress"]} />
        </ChessPuzzle.Root>
      )}
    </div>
    );
  };
  
  export default Puzzle;