import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'nexushive_cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (accepted) => {
    localStorage.setItem(COOKIE_KEY, accepted ? 'accepted' : 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50"
      style={{
        background: 'linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)',
        color: '#4b2067',
        boxShadow: '0 -2px 16px rgba(76, 0, 130, 0.08)',
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 gap-4">
        <div>
          <strong>Help us improve your experience</strong>
          <p className="text-sm mt-1">
            We use cookies and similar technologies to deliver, maintain, and improve our services, and for security purposes. We also use these technologies to understand how users interact with our services (including the effectiveness of our ad campaigns). Learn more in our <a href="#" className="underline text-purple-700">Cookie Policy</a>.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleConsent(false)}
            className="min-w-[140px] h-12 px-6 rounded-full border border-purple-400 bg-white text-purple-700 font-medium shadow-sm hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
          >
            Reject non-essential
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="min-w-[140px] h-12 px-6 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-md hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
          >
            Accept all
          </button>
        </div>
      </div>
      <div className="text-xs text-center pb-2">By messaging NexusHive, you agree to our <a href="#" className="underline text-purple-700">Terms</a> and have read our <a href="#" className="underline text-purple-700">Privacy Policy</a>.</div>
    </div>
  );
};

export default CookieConsent; 