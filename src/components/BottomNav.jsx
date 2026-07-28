import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Book } from 'lucide-react';
export default function BottomNav() {
  const location = useLocation(); const isActive = (path) => location.pathname === path;
  return (<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-24 bg-black/80 backdrop-blur-xl border-t border-[#2C2C2E] px-6 z-50"><div className="flex justify-between items-center h-full pb-6 px-4"><Link to="/" className={`flex flex-col items-center gap-1 transition ${isActive('/') ? 'opacity-100' : 'opacity-40'}`}><Heart className={`w-7 h-7 ${isActive('/') ? 'text-brandBlue fill-brandBlue' : 'text-white'}`} /><span className={`text-[10px] font-medium ${isActive('/') ? 'text-brandBlue' : 'text-white'}`}>오늘</span></Link><Link to="/archive" className={`flex flex-col items-center gap-1 transition ${isActive('/archive') ? 'opacity-100' : 'opacity-40'}`}><Book className={`w-7 h-7 ${isActive('/archive') ? 'text-brandBlue fill-brandBlue' : 'text-white'}`} /><span className={`text-[10px] font-medium ${isActive('/archive') ? 'text-brandBlue' : 'text-white'}`}>아카이브</span></Link></div></div>);
}