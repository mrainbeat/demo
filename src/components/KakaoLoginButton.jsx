import React from "react";

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    // 환경 변수 검증: 없으면 바로 에러 처리하여 실행 차단
    if (!apiBaseUrl) {
      console.error("VITE_API_BASE_URL 환경 변수가 설정되지 않았습니다.");
      alert("로그인 설정을 불러올 수 없습니다. 관리자에게 문의하세요.");
      return;
    }

    // 백엔드 카카오 OAuth2 엔드포인트로 이동
    window.location.href = `${apiBaseUrl}/oauth2/authorization/kakao`;
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="w-full flex items-center justify-center gap-3 bg-[#FEE500] text-[#191919] font-medium py-4 rounded-2xl active:scale-95 transition cursor-pointer"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.498.182.49.383.357.158-.105 2.511-1.7 3.527-2.392.525.077 1.063.118 1.600.118 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
      </svg>
      카카오로 시작하기
    </button>
  );
}
