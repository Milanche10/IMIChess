// SliderComponent.jsx
import React, { useEffect, useState } from 'react';
import './Lessions.css';
import { Carousel } from 'react-responsive-carousel';
import chessBoardImage from 'assets/chessboard.png';
import EmanuelLasker from "assets/EmanuelLasker.jpg";
import chessBoardGIF from "assets/lession.gif";
import MilanJovanovic from "assets/milan_cropped.jpg";
import chessBoardInfoGIF from "assets/info.gif";
import Lession from '../../types/Lession';
import { environment } from '../../environment/environment';
import { useNavigate } from 'react-router-dom';

const Lessions = () => {
  const [lessons, setLessons] = useState<Lession[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch lessons from the backend API
    const lessonUrl = environment.apiUrl + "/lessons"
    fetch(lessonUrl) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setLessons(data))
      .catch((error) => console.error('Error fetching lessons:', error));
  }, []);


  return (
    <div className="lesson-list">
      {lessons.map((lesson) => (
        <div key={lesson._id} className="lesson-item">
          <a onClick={()=>navigate(`/lessons/${lesson._id}`)}>
          <img
            src={`/assets/${lesson.name.replace(/:/g, '')}.png`}
            alt={`${lesson.name.replace(/:/g, ' ')}.png image`}
          />
          <div className="lesson-details">
            <h2>{lesson.name}</h2>
            <p>{lesson.shortDescription}</p>
            <p>Number of Sublessons: {lesson.numberOfSublessons}</p>
            <p>Complexity Level: {lesson.complexityLevel}</p>
            <img
              src={`/assets/${lesson.complexityLevel}.png`}
              alt={`${lesson.complexityLevel} icon`}
              className="chesspiece-icon"
            />
          </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Lessions;
