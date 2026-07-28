import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import Home from './pages/Home';
import Write from './pages/Write';
import Archive from './pages/Archive';
import Login from './pages/Login';
import BottomNav from './components/BottomNav';
function App() { const { user } = useContext(AppContext); return (<div className="max-w-md mx-auto min-h-screen bg-darkBg relative overflow-hidden">{!user ? <Login /> : <><Routes><Route path="/" element={<Home />} /><Route path="/write" element={<Write />} /><Route path="/archive" element={<Archive />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes><BottomNav /></>}</div>); }
export default App;