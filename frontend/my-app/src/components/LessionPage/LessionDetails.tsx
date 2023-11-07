import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Lession from '../../types/Lession';
import './LessionDetails.css';
import { environment } from '../../environment/environment';
import VideoPreview from '../VideoPlayer/VideoPlayerPreview';

const LessionDetails = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<Lession | null>(null);

  useEffect(() => {
    const lessonUrl = environment.apiUrl + "/lessons"
    fetch(`${lessonUrl}/${lessonId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Log the fetched data
        setLesson(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [lessonId]);
  
    

  return (
    <div className="lesson-details">
      {lesson ? (
        <>
          <img
            src={`/assets/${lesson.name.replace(/:/g, '')}.png`}
            alt={`${lesson.name.replace(/:/g, ' ')}.png image`}
          />
          <h2>{lesson.name}</h2>
          <p>{lesson.description}</p>
          <div className="sublessons-list">
        {lesson.sublessons.map((sublesson) => (
          <div key={sublesson.id} className="sublesson-item">
            <div className="video">
              <VideoPreview
                url={sublesson.url}
                thumbnailUrl="/assets/thumbnail.png"
              />
            </div>
            <div className="sublesson-content">
              <h3>{sublesson.title}</h3>
              <p>{sublesson.description}</p>
              <div className='duration-play'>
              <img
                    src="/assets/play-button.png"
                    alt="Play button"
                    className="play-button"
              />
              <span>{sublesson.duration}</span>
              </div>
            </div>
          </div>
          ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LessionDetails;
