import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { BookMarked, Users2, Star, Eye, Lock, Share2, Sparkles, MessageCircle, Send, UserCircle, FolderOpen, Users, Award, Link2 } from 'lucide-react';

const demoPosts = [
  {
    id: 1,
    user: { name: 'John Smith', avatar: '', role: 'Student' },
    time: '2 hours ago',
    content: 'Does anyone have tips for presenting a portfolio project to a potential employer?',
    replies: [
      { id: 1, user: { name: 'Emily Brown', avatar: '', role: 'Student' }, time: '1 hour ago', content: 'Practice your pitch and focus on the impact of your work!' },
      { id: 2, user: { name: 'Dr. Sarah Johnson', avatar: '', role: 'Mentor' }, time: '45 min ago', content: 'Showcase your problem-solving process and results.' }
    ]
  },
  {
    id: 2,
    user: { name: 'Emily Brown', avatar: '', role: 'Student' },
    time: '1 day ago',
    content: 'I just published my web dev project in my eCollab portfolio! Feedback welcome.',
    replies: [
      { id: 1, user: { name: 'John Smith', avatar: '', role: 'Student' }, time: '22 hours ago', content: 'Looks great! I like your UI.' }
    ]
  }
];

const quickLinks = [
  { icon: FolderOpen, label: 'My Portfolio', href: '#' },
  { icon: Users, label: 'Shared with Me', href: '#' },
  { icon: Award, label: 'Mentor Connect', href: '#' },
  { icon: Link2, label: 'Resource Hub', href: '#' }
];

export default function Ecollab() {
  const [posts, setPosts] = useState(demoPosts);
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState('');

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: Date.now(),
          user: { name: 'You', avatar: '', role: 'Student' },
          time: 'Just now',
          content: newPost,
          replies: []
        },
        ...posts
      ]);
      setNewPost('');
    }
  };

  const handleReply = (postId) => {
    if (newReply.trim()) {
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, replies: [...post.replies, { id: Date.now(), user: { name: 'You', avatar: '', role: 'Student' }, time: 'Just now', content: newReply }] }
          : post
      ));
      setNewReply('');
      setReplyingTo(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col items-center justify-start p-6 overflow-auto">
        {/* Intro/Info Card */}
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookMarked className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">eCollab</h1>
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              <span className="font-semibold text-blue-700 dark:text-blue-400">What's an eCollab?</span><br />
              eCollab is a dynamic digital space designed to help users showcase meaningful work, reflect on learning, and share achievements in a professional setting. It goes beyond file storage — it enables storytelling, collaboration, and branding.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Highlight their best work and share it beyond the classroom or organization</li>
              <li>Reflect on the creativity, effort, and learning behind their projects</li>
              <li>Present a comprehensive view of their academic or professional growth</li>
              <li>Share curated content with peers, mentors, employers, or admissions teams</li>
            </ul>
            <p>
              <span className="font-semibold text-blue-700 dark:text-blue-400">eCollab puts users in control</span> — visibility settings can be set to private or public and adjusted at any time.
            </p>
          </div>
        </div>
        {/* Main Content: Two-column layout */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
          {/* Discussion Board */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Discussion Board</h2>
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  placeholder="Share an idea, question, or achievement..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                />
                <button
                  onClick={handlePost}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Send size={18} /> Post
                </button>
              </div>
              <div className="space-y-6">
                {posts.map(post => (
                  <div key={post.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-1">
                      {post.user.avatar ? (
                        <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <UserCircle className="w-8 h-8 text-blue-400 dark:text-blue-300" />
                      )}
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-100">{post.user.name} <span className="text-xs text-gray-400 dark:text-gray-300">({post.user.role})</span></div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">{post.time}</div>
                      </div>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 mb-2 ml-11">{post.content}</div>
                    <div className="ml-11 space-y-2">
                      {post.replies.map(reply => (
                        <div key={reply.id} className="flex items-center gap-2">
                          {reply.user.avatar ? (
                            <img src={reply.user.avatar} alt={reply.user.name} className="w-7 h-7 rounded-full object-cover" />
                          ) : (
                            <UserCircle className="w-7 h-7 text-purple-400 dark:text-purple-300" />
                          )}
                          <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-1 shadow text-sm">
                            <span className="font-medium text-gray-800 dark:text-gray-100">{reply.user.name}</span> <span className="text-xs text-gray-400 dark:text-gray-300">{reply.time}</span><br />
                            <span className="text-gray-700 dark:text-gray-300">{reply.content}</span>
                          </div>
                        </div>
                      ))}
                      {replyingTo === post.id ? (
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            value={newReply}
                            onChange={e => setNewReply(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 px-3 py-1 border rounded-lg text-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                          />
                          <button
                            onClick={() => handleReply(post.id)}
                            className="bg-purple-600 dark:bg-purple-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-purple-700 dark:hover:bg-purple-800 text-sm"
                          >
                            <Send size={16} /> Reply
                          </button>
                          <button
                            onClick={() => { setReplyingTo(null); setNewReply(''); }}
                            className="text-xs text-gray-400 dark:text-gray-300 hover:text-red-500"
                          >Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setReplyingTo(post.id); setNewReply(''); }}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2"
                        >Reply</button>
                      )}
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className="text-gray-400 dark:text-gray-500 text-center py-8">No posts yet. Start the discussion!</div>
                )}
              </div>
            </div>
          </div>
          {/* Sidebar: Quick Links & Highlights */}
          <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2"><Users2 className="w-5 h-5 text-blue-500 dark:text-blue-400" /> Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="flex items-center gap-2 text-blue-700 dark:text-blue-400 hover:underline">
                      <link.icon className="w-5 h-5" /> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" /> Recent Highlights</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Emily Brown shared a new project: <span className="font-semibold text-blue-700 dark:text-blue-400">Web Dev Portfolio</span></li>
                <li>John Smith received feedback from Dr. Sarah Johnson</li>
                <li>Mentor Connect: 2 new messages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 