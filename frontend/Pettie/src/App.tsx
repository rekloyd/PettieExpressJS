import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Terminos from './components/Terminos';
import Contacto from './components/Contacto';
import Nosotros from './components/Nosotros';
import HeroComponent from './components/HeroComponent';
import Servicio from './components/Servicio';
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout';
import DashboardPorId from './components/DashboardPorId';

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HeroComponent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/nosotros' element={<Nosotros/>}/>
        <Route path='/servicios' element={<Servicio/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/pasarelaDePago' element={<Checkout/>}/>
        <Route path="/dashboard/:id" element={<DashboardPorId />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;