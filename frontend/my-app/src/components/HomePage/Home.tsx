import React from 'react';
import './Home.css';
import Difficulty from "../Popup/DifficultyAI/Difficulty";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Home() {
  const [buttonPopup,setButtonPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="HomePage">
      <div className='PlayBox'>
        <div className='imageBox'>
          <img src="/assets/chessboard.png" alt="startingChessBoard" />
        </div>
        <div className='textBox'>
          <h1>Play Online Chess and Train Your Experties on the #1 Site!</h1> <br></br>
          <div className="counter-container">
            <p>Todays games played:</p>
            <div id='counterToday' className="counter"></div>
            <p>Current games:</p>
            <div id='counterCurrent' className="counter"></div>
          </div>
          <div className="button-container">
          <button className="OnlineButton" onClick={() => {navigate("/online")}}>
            <span>
              <img src="/assets/chess-game.png" style={{ width: 40, height: 40 }} alt="playbuttonimage"/>
              Play Online
            </span>
            <i></i>
          </button>

          <button className="AIButton" onClick={() => {setButtonPopup(true); /*navigate('/computer')*/}}>
            <span>
              <img src="/assets/chatbot.png" style={{ width: 40, height: 40 }} alt="aibuttonimage" />
              Play VS AI
            </span>
            <i></i>
          </button>

          <button className="PuzzleButton" onClick={() => {navigate('/puzzle')}}>
            <span>
              <img src="/assets/puzzle.png" style={{ width: 40, height: 40 }} alt="puzzlebuttonimage" />
              Puzzles
            </span>
            <i></i>
          </button>
          </div>
        </div>
      </div>


      <div className='LessionBox'>
        <div className='textBox'>
          <div className="button-container">
            <h1>Learn to play online with our lessions</h1><br></br>
            <button className="LessionButton" onClick={() => {navigate("/lessons")}}>
              <span>
                <img src="/assets/lesson.png" style={{ width: 40, height: 40 }} alt="lessionbuttonimage" />
                Lessons
              </span>
              <i></i>
            </button>

          </div>
          <div className='quote-container'>
            <div className='image-qoute-box'>
              <img src="/assets/EmanuelLasker.jpg" alt="startingChessBoard" />
            </div>
            <div className='quote-box'>
              <p className='qoute'>When you see a good move, <span className='quoteHighlighted'>look for a better one</span></p>
              <p className='qoute-giver'>Emanuel Lasker</p>
            </div>
          </div>
        </div>
        <div className='imageBox'>
          <img src="/assets/lession.gif" alt="startingChessBoard" />
        </div>
      </div>

      <div className='InfoBox'>
        <div className='imageBox'>
          <img src="/assets/info.gif" alt="startingChessBoard" />
        </div>
        <div className='textBox'>
          <div className="button-container">
            <h1>Learn something about us</h1><br></br>
            <button className="InfoButton" onClick={() => {navigate("/about")}}>
              <span>
                <img src="/assets/info.png" style={{ width: 40, height: 40 }} alt="infobuttonimage" />
                Info
              </span>
              <i></i>
            </button>

          </div>
          <div className='quote-container'>
            <div className='image-qoute-box'>
              <img src="/assets/milan_cropped.jpg" alt="startingChessBoard" />
            </div>
            <div className='quote-box'>
              <p className='qoute'><span className='quoteHighlighted'>Sometimes is better to act then to think. </span>If you want to find out something more about us just click the button above</p>
              <p className='qoute-giver'>Milan Jovanovic</p>
            </div>
          </div>
        </div>
      </div>
      <Difficulty trigger={buttonPopup} setTrigger={setButtonPopup}></Difficulty>
    </div>
  );
}

export default Home;
