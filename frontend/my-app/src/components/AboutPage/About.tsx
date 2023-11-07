import React from "react";
import './About.css';




function About() {
  return (
    <div className="about">
      <div id="container">
        <div className="imgbox">
          <img className="center-fit" src="/assets/chessbanner.jpg" alt="ChessBanner"/>
        </div>
          <div className="centered">About us</div>
      </div>
    <div className="container-0">
        <img src="/assets/chess-image.jpg" alt="chessImage" className="image-0"/>
        <p className="text-0">
        I am Milan Jovanovic, a native of Jagodina, born in 2001. My journey in the world of technology and innovation began during my time as a student at Prirodno matematicki fakultet u Kragujevcu. <br/> 
        As a dedicated student, I've always been driven by a passion for problem-solving and a deep fascination with the world of chess.<br/> 
        The inception of my project, IMIChess, came from a simple yet profound idea. I envisioned a platform that would not only bring chess enthusiasts together but also serve as an educational hub. <br/> 
        The journey was not without challenges, but ambition and perseverance became my guiding stars.<br/> 
        IMIChess is more than just a project; it's a culmination of my academic journey, representing the final endeavor of my university career. <br/> 
        It combines multiplayer chess, brain-teasing puzzles, challenging battles against the AI Stockfish bot, and a comprehensive chess tutorial.<br/> 
        ChessHub is where chess lovers can learn, compete, and embrace the timeless game of chess.<br/> 
        Join me on this exciting journey as we explore the fascinating world of chess, learn its intricacies, and make every move count.
        </p>
    </div>
    <div className="container-1">
        <img src="/assets/chess-image2.jpg" alt="chessImage2" className="image-1"/>
        <p className="text-1">
        The game of chess, with its intricate strategy and timeless appeal, has a rich and storied history that dates back centuries. <br/> 
        Chess is believed to have originated in northern India during the Gupta Empire in the 6th century.<br/> 
        It was initially known as "chaturanga," which means "four divisions of the military" – infantry, cavalry, elephants, and chariotry. <br/> 
        As chaturanga spread to Persia, it underwent significant transformations and adaptations. <br/> 
        The name "shatranj" emerged, and the game became popular among the Persian nobility. <br/> 
        The rules evolved further, with the introduction of the "ferz" (queen) and "wazir" (vizier) pieces, precursor to the modern queen and king.<br/> 
        In the 7th century, the Islamic conquests carried the game to the Islamic world and into Europe through Spain. <br/> 
        Chess gained popularity in medieval Europe and underwent further rule changes.<br/> 
        The most significant of these changes was the transformation of the "vizier" into the "queen," making the queen the most powerful piece on the board.<br/> 
        Over the centuries, chess continued to evolve, and the modern rules and pieces took shape in the 15th century in Europe. <br/> 
        The standard 64-square chessboard, the movement of the pawns, castling, and en passant capture were among the final refinements.<br/> 
        The ancient game of chaturanga has evolved into a timeless classic, leaving an indelible mark on the history of human entertainment and strategic thinking.
        </p>
    </div>
    </div>
  );
}

export default About;
