import React, { useState, useRef, useEffect } from 'react';
import { Upload, AlertCircle, CheckCircle, Loader, Play, RefreshCw } from 'lucide-react';
import { useVideoContext } from './VideoContext';

function UploadVideo() {
  const { videoFile, setVideoFile, outputVideoUrl, setOutputVideoUrl } = useVideoContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
 
  const fileInputRef = useRef(null);

  // const ffmpeg = createFFmpeg({ log: true });
  // // Function to extract geolocation data from video metadata
  // const extractLocationFromMetadata = async (file) => {
  //   // const ffmpeg = new FFmpeg({ log: true });
  //   await ffmpeg.load();
    
  //   const fileData = await file.arrayBuffer();
  //   await ffmpeg.FS('writeFile', file.name, new Uint8Array(fileData));
  
  //   // Run ffprobe to extract metadata, including GPS data
  //   const { stdout } = await ffmpeg.run('-i', file.name, '-hide_banner', '-print_format', 'json', '-show_entries', 'format_tags');
  
  //   // Check and parse the GPS data from the metadata
  //   const regex = /"location":\s*"([\d.-]+)\s+([\d.-]+)"/;
  //   const match = stdout.match(regex);
  
  //   if (match) {
  //     setLocation({
  //       latitude: parseFloat(match[1]),
  //       longitude: parseFloat(match[2]),
  //     });
  //   } else {
  //     setLocation(null);
  //     console.log('No GPS metadata found, using browser geolocation');
  //     getLocation();  // Fallback to browser geolocation
  //   }
  // };
  

  // Function to get user's location using the Geolocation API
  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         console.error('Error getting location', error);
  //         setError('Unable to retrieve location');
  //       }
  //     );
  //   } else {
  //     setError('Geolocation is not supported by this browser.');
  //   }
  // };

 


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelection(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => handleFileSelection(e.target.files[0]);

  const handleFileSelection = (file) => {
    if (file && file.type.startsWith('video/') && file.size <= 50 * 1024 * 1024) {
      setVideoFile(file);
      setError('');
      setOutputVideoUrl('');
      setProcessingStatus('');
    } else {
      setError(file ? 'File size exceeds 50MB limit' : 'Please select a valid video file');
      setVideoFile(null);
    }
  };

  // Function to extract metadata from the video file using FFmpeg.js
 
  const handleUpload = async () => {
    if (!videoFile) return setError('Please select a video file first');
    const formData = new FormData();
    formData.append('file', videoFile);
    setLoading(true);
    setProcessingStatus('uploading');
    setUploadProgress(0);

    try {
      

      const response = await fetch('http://127.0.0.1:8000/classify-video', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Failed to upload and process video');

      setProcessingStatus('processing');
      const blob = await response.blob();
      setOutputVideoUrl(URL.createObjectURL(blob));
      setProcessingStatus('complete');
    } catch (err) {
      setError(err.message);
      setProcessingStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = () => {
    switch (processingStatus) {
      case 'uploading':
        return (
          <div className="flex items-center gap-2 text-blue-500">
            <Upload className="animate-bounce" size={20} />
            <span>Uploading video...</span>
          </div>
        );
      case 'processing':
        return (
          <div className="flex items-center gap-2 text-yellow-500">
            <RefreshCw className="animate-spin" size={20} />
            <span>Processing video for fight detection...</span>
          </div>
        );
      case 'complete':
        return (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle size={20} />
            <span>Processing complete!</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Fight Detection Analysis</h2>
        <p className="text-gray-600 mb-6">Upload surveillance footage for AI-powered fight detection</p>

        <div
          className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${videoFile ? 'border-green-500 bg-green-50' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
            id="video-upload"
            ref={fileInputRef}
          />
          <label htmlFor="video-upload" className="cursor-pointer block text-center">
            {!videoFile ? (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 font-medium">
                  {dragActive ? 'Drop the video here' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 mt-2">MP4, AVI, MOV up to 50MB</p>
              </>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Play className="text-green-500" size={24} />
                <span className="text-green-700 font-medium">{videoFile.name}</span>
              </div>
            )}
          </label>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 text-red-500 p-3 rounded flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {processingStatus && (
          <div className="mt-4 space-y-2">
            {getStatusDisplay()}
            {processingStatus !== 'complete' && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}

        {outputVideoUrl && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Analysis Results:</h3>
            <div className="relative rounded-lg overflow-hidden">
              <video controls src={outputVideoUrl} className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!videoFile || loading}
          className={`mt-6 w-full p-3 rounded-lg font-medium transition-all duration-200
            flex items-center justify-center gap-2
            ${!videoFile || loading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'}`}
        >
          {loading ? <Loader className="animate-spin" size={20} /> : <Upload size={20} />}
          {loading ? 'Processing...' : 'Analyze Video'}
        </button>
      </div>
    </div>
  );
}

export default UploadVideo;
