import React, { createContext, useState, useContext } from 'react';

// Create the context
const VideoContext = createContext();

// Custom hook for accessing the context
export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};

// Provider component
export const VideoProvider = ({ children }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [outputVideoUrl, setOutputVideoUrl] = useState('');

  return (
    <VideoContext.Provider
      value={{
        videoFile,
        setVideoFile,
        outputVideoUrl,
        setOutputVideoUrl,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
