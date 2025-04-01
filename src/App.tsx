import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginSuccess from './pages/LoginSuccess';
import Intro from './pages/intro';
import QueryProvider from './provider/query-provider';
import { GlobalStyle } from './styles/global-style';
import { Login } from './pages/login';
import Onboarding from './pages/onboarding';
import { Main } from './pages/main';
import ImageUpload from './pages/image-upload';
function App() {
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
      <Route path="/make-card" element={<ImageUpload/>}/>
    </Routes>
    </BrowserRouter>
  </QueryProvider>
  );
}

export default App;
