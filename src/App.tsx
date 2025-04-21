import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginSuccess from './pages/LoginSuccess';
import Intro from './pages/intro';
import QueryProvider from './provider/query-provider';
import { GlobalStyle } from './styles/global-style';
import { Login } from './pages/login';
import Onboarding from './pages/onboarding';
import { Main } from './pages/main';
import ImageUpload from './pages/image-upload';
import { useStore } from './store/store';
import { useEffect } from 'react';
import { tokenStorage } from './utils/tokenStorage';
import { authApi } from './api/auth';
import Album from './pages/album';
function App() {
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken) return;
  
    const fetchUser = async () => {
      try {
        const res = await authApi.getMe();
        setUser(res.data); // ✅ 유저 상태 저장
      } catch (error: any) {
        console.warn('유저 인증 실패:', error);
        if (error?.response?.status === 401) {
          // 401 Unauthorized일 때만 토큰 제거
          tokenStorage.clearTokens();
          setUser(null);
        }
      }
    };
    fetchUser();
  }, []);
  
  return (
  <QueryProvider>
    <GlobalStyle/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login/success" element={<LoginSuccess />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/onboarding" element={<Onboarding/>}/>
      <Route path="/main" element={<Main/>}/>
          <Route path="/make-card" element={<ImageUpload />} />
      <Route path="/album" element={<Album />} />
    </Routes>
    </BrowserRouter>
  </QueryProvider>
  );
}

export default App;
