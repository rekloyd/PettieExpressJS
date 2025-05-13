import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Terminos from './components/Terminos';
import Contacto from './components/Contacto';
import Nosotros from './components/Nosotros';
import BestPettier from './components/BestPettier';


function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <HeroComponent></HeroComponent>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/nosotros' element={<Nosotros/>}/>
        <Route path='/test' element={<BestPettier/>}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;