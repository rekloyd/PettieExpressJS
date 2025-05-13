import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Terminos from './components/Terminos';
import Contacto from './components/Contacto';

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path='/contacto' element={<Contacto/>}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;