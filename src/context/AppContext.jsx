import React, { createContext, useState, useEffect } from 'react';
export const AppContext = createContext();
export const EMOTIONS = [
  { id: 'calm', label: '안도감, 평온함', color: '#84E13F', desc: '하루: 약간 기분 좋음', emoji: '🌿' },
  { id: 'happy', label: '기쁨, 즐거움', color: '#FCD34D', desc: '하루: 아주 좋음', emoji: '😊' },
  { id: 'sad', label: '슬픔, 우울함', color: '#60A5FA', desc: '하루: 기운 없음', emoji: '💧' },
  { id: 'angry', label: '분노, 짜증', color: '#F87171', desc: '하루: 예민함', emoji: '🔥' },
  { id: 'tired', label: '지침, 피곤함', color: '#A78BFA', desc: '하루: 휴식이 필요함', emoji: '🌙' },
  { id: 'excited', label: '설렘, 기대됨', color: '#F472B6', desc: '하루: 두근거림', emoji: '✨' }
];
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => { const saved = localStorage.getItem('md_user'); return saved ? JSON.parse(saved) : null; });
  const [diaries, setDiaries] = useState(() => { const saved = localStorage.getItem('md_diaries'); return saved ? JSON.parse(saved) : []; });
  useEffect(() => { if (user) localStorage.setItem('md_user', JSON.stringify(user)); else localStorage.removeItem('md_user'); }, [user]);
  useEffect(() => { localStorage.setItem('md_diaries', JSON.stringify(diaries)); }, [diaries]);
  const login = (name) => setUser({ name, isLoggedIn: true });
  const logout = () => setUser(null);
  const addDiary = (diary) => { setDiaries([{ ...diary, id: Date.now().toString() }, ...diaries]); };
  const updateDiary = (id, newContent) => { setDiaries(diaries.map(d => d.id === id ? { ...d, content: newContent } : d)); };
  const deleteDiary = (id) => { setDiaries(diaries.filter(d => d.id !== id)); };
  return (<AppContext.Provider value={{ user, login, logout, diaries, addDiary, updateDiary, deleteDiary, EMOTIONS }}>{children}</AppContext.Provider>);
};