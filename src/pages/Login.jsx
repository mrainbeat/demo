import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 space-y-8 bg-black">
      {/* 타이틀 및 설명 영역 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          마음 상태
        </h1>
        <p className="text-[#8E8E93] text-sm">
          나만의 감정을 안전하게 기록하세요
        </p>
      </div>

      {/* 카카오 로그인 버튼 영역 */}
      <div className="w-full max-w-sm pt-4">
        <KakaoLoginButton />
      </div>
    </div>
  );
}
