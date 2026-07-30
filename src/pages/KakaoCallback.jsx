import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  useEffect(() => {
    // URL 쿼리 스트링에서 token 추출 (쿼리키 이름이 accessToken 인지 token 인지 확인!)
    const token = searchParams.get("token") || searchParams.get("accessToken");

    if (token) {
      localStorage.setItem("accessToken", token);
      login(token); // AppContext의 user 상태를 즉시 만들어 줌
      navigate("/", { replace: true }); // 메인 페이지 이동
    } else {
      console.error("토큰이 존재하지 않습니다.");
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <p className="text-lg font-medium animate-pulse">
        로그인 처리 중입니다...
      </p>
    </div>
  );
}
