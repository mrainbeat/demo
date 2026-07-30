import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const EMOTIONS = [
  {
    id: "calm",
    label: "안도감, 평온함",
    color: "#84E13F",
    desc: "하루: 약간 기분 좋음",
    emoji: "🌿",
  },
  {
    id: "happy",
    label: "기쁨, 즐거움",
    color: "#FCD34D",
    desc: "하루: 아주 좋음",
    emoji: "😊",
  },
  {
    id: "sad",
    label: "슬픔, 우울함",
    color: "#60A5FA",
    desc: "하루: 기운 없음",
    emoji: "💧",
  },
  {
    id: "angry",
    label: "분노, 짜증",
    color: "#F87171",
    desc: "하루: 예민함",
    emoji: "🔥",
  },
  {
    id: "tired",
    label: "지침, 피곤함",
    color: "#A78BFA",
    desc: "하루: 휴식이 필요함",
    emoji: "🌙",
  },
  {
    id: "excited",
    label: "설렘, 기대됨",
    color: "#F472B6",
    desc: "하루: 두근거림",
    emoji: "✨",
  },
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 1. URL 주소창에서 token 파라미터 확인
    const tokenMatch = window.location.href.match(/[?&]token=([^&#]*)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (token) {
      // 주소창에서 ?token=... 깔끔하게 제거
      window.history.replaceState({}, document.title, window.location.pathname);

      localStorage.setItem("accessToken", token);
      const newUser = { token: token, isLoggedIn: true };
      localStorage.setItem("md_user", JSON.stringify(newUser));
      return newUser;
    }

    // 2. 주소창에 토큰이 없으면 저장된 로그인 정보 확인
    const saved = localStorage.getItem("md_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [diaries, setDiaries] = useState(() => {
    const saved = localStorage.getItem("md_diaries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem("md_user", JSON.stringify(user));
    else localStorage.removeItem("md_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("md_diaries", JSON.stringify(diaries));
  }, [diaries]);

  // 카카오 로그인 시 토큰 및 유저 정보만 세팅
  const login = (userData) => {
    setUser({ ...userData, isLoggedIn: true });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("md_user");
  };

  const addDiary = (diary) => {
    setDiaries([{ ...diary, id: Date.now().toString() }, ...diaries]);
  };

  const updateDiary = (id, newContent) => {
    setDiaries(
      diaries.map((d) => (d.id === id ? { ...d, content: newContent } : d)),
    );
  };

  const deleteDiary = (id) => {
    setDiaries(diaries.filter((d) => d.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        diaries,
        addDiary,
        updateDiary,
        deleteDiary,
        EMOTIONS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
