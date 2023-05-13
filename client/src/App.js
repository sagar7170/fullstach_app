import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from './Components/About';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Logout from './Components/Logout';
import Contect from './Components/Contect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Registration/>}/>
        <Route path= "/about" element={<About/>}/> 
        <Route path = "/logout" element = {<Logout/>}/>
        <Route path = "/contect" element = {<Contect/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
