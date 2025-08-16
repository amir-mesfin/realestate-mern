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
import CreateListing from './page/CreateListing';
import UpdateListing from './page/UpdateListing';
import Listing from './page/Listing';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
     <Header />
       <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/listing/:listingId" element={<Listing />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route  element={<PrivateRoute />} >
                   <Route path="/profile" element={<Profile />} />
                   <Route path="/create-listing" element={<CreateListing />} />
                   <Route path="/update-listing/:listingId" element={<UpdateListing />} />
              
              </Route>
              {/* <Route
                 path="/profile"
                 element={
                    <ProtectedRouteP msg="Please sign in to view your profile" redirect="/profile">
                               <Profile />
                    </ProtectedRouteP>
                       }
        /> */}
       </Routes>
    </BrowserRouter>
  )
}

export default App
