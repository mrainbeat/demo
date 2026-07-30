import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // 1. 포트 번호 변경 (예: 5173 -> 3000 또는 8080)
    port: 3000,

    // 2. 외부 접속 허용 또는 특정 호스트 지정
    // host: true 지정 시 localhost 대신 IP 주소(127.0.0.1 또는 내 IP)로도 접속 가능
    host: "localhost",

    // 3. 실행 시 브라우저 자동으로 띄울지 여부 (선택 사항)
    open: true,
  },
});
