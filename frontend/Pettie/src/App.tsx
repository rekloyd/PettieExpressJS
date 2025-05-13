import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroComponent from './components/HeroComponent';

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <HeroComponent></HeroComponent>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;