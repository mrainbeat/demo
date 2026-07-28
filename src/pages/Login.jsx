import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
export default function Login() {
  const [name, setName] = useState(''); const { login } = useContext(AppContext);
  const handleSubmit = (e) => { e.preventDefault(); if (name.trim()) login(name.trim()); };
  return (<div className="flex flex-col items-center justify-center h-screen px-6 space-y-8 bg-black"><div className="text-center space-y-2"><h1 className="text-3xl font-bold text-white tracking-tight">마음 상태</h1><p className="text-[#8E8E93] text-sm">나만의 감정을 안전하게 기록하세요</p></div><form onSubmit={handleSubmit} className="w-full space-y-4"><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요 (예: 김민준)" className="w-full bg-[#1C1C1E] text-white px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-brandBlue placeholder-[#555555]" /><button type="submit" className="w-full bg-brandBlue text-white font-bold py-4 rounded-2xl active:scale-95 transition">시작하기</button></form></div>);
}