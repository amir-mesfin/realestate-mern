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
import Search from './page/Search';
import Footer from './component/Footer';
import Dashborder from './page/Dashborder';
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "./redux/user/userSlice";
import { useEffect } from "react";
import Contact from './page/Contact';
import Seller from './page/Seller';


function App() {

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser?._id) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser._id}`);
        const data = await res.json();
        if (data.success !== false) {
          dispatch(updateSuccess(data));
        }
      } catch (err) {
        console.error("Failed to refresh user data", err);
      }
    };

    fetchUserData();

    const interval = setInterval(fetchUserData, 10 * 60 * 1000);

    return () => clearInterval(interval); 
  }, [currentUser?._id, dispatch]);

  return (
    <BrowserRouter>
     <Header />
       <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<Search />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/listing/:listingId" element={<Listing />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route  element={<PrivateRoute />} >
                   <Route path="/profile" element={<Profile />} />
                   <Route path="/update-listing/:listingId" element={<UpdateListing />} />
                    <Route path="/seller" element={<Seller />} />
                    <Route path="/dash" element={<Dashborder />} /> 
                  
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
    <Footer />
    </BrowserRouter>
  )
}

export default App
