import React from 'react';
import './VideoPlayerPreview.css';

interface VideoPreviewProps {
  url: string;
  thumbnailUrl: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ url, thumbnailUrl}) => {
  const handlePlayVideo = () => {
    window.open(url, '_blank');
  }

  return (
    <div className="video-preview" onClick={handlePlayVideo}>
      <img src={thumbnailUrl}/>
    </div>
  );
}

export default VideoPreview;
