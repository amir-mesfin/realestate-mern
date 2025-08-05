import { useState } from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './page/Home';
import Signin from './page/Signin';
import Signup from './page/Signup';
import About from './page/About';
import Profile from './page/Profile';
import Header from './component/Header';
import PrivateRoute from './component/PrivateRoute';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
     <Header />
       <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route  element={<PrivateRoute />} >
                   <Route path="/profile" element={<Profile />} />
              </Route>
       </Routes>
    </BrowserRouter>
  )
}

export default App
