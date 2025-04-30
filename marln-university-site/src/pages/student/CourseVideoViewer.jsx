import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

function CourseVideoViewer() {
  const location = useLocation();
  const navigate = useNavigate();
  // Video URL can be passed via state or query param
  const videoUrl = location.state?.videoUrl || '';
  const title = location.state?.title || 'Video Viewer';

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col z-50">
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-red-400 p-2 rounded-full"
          aria-label="Close Video"
        >
          <X size={28} />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center bg-black">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            className="w-full max-w-4xl h-[70vh] bg-black rounded shadow"
            style={{ outline: 'none' }}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex items-center justify-center h-full text-white">Video not found.</div>
        )}
      </div>
    </div>
  );
}

export default CourseVideoViewer; 