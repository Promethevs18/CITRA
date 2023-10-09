import { useState, useEffect } from "react"
import './App.css';
import "./style.scss";
import "./media-query.css";
import Home from './Pages/Home';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Detail from "./Pages/Detail";
import Explore from "./Pages/Explore_Add_or_Edit";
import About from "./Pages/About";
import Header from './Components/Header';
import Auth from "./Pages/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Leisure from "./Pages/Leisure_Add_or_Edit";
import Store from "./Pages/Store_Add_or_Edit";
import News from "./Pages/News_Add_or_Edit";

function App() {
  const [active, setActive] = useState("Home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
      else {
        setUser(null);
      }
    })
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("Login");
      navigate("/auth");
    })
  }
  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout} />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path='/' element={<Home setActive={setActive} user={user} />} />
        {/* ETO NAMAN YUNG PARA MAG ROUTE YUNG EXPLORE AT LEISURE LOCATIONS SA TRUE DETAILS NYA */}
        <Route path='/detail/:classification/:category/:id' element={<Detail setActive={setActive} />} />
       
        {/* ETO YUNG PARA MAG UPDATE KA NG EXPLORE AT LEISURE LOCATIONS */}
        <Route path='/update/:classification/:category/:id' element={ user?.uid ? <Explore user={user} /> : <Navigate to="/*" setActive={setActive}/>} />
        {/* UPDATE NG NEWS FEED DATA */}
        <Route path='/update/News Feed/:id' element={ user?.uid ? <News user={user} /> : <Navigate to="/*" setActive={setActive}/>} />
        <Route path='/update/Store/:id' element={ user?.uid ? <Store user={user} /> : <Navigate to="/*" setActive={setActive}/>} />
       
        {/* ETO YUNG PARA MAG UPDATE KA NG LEISURE LOCATIONS */}
        <Route path='/update/Leisure/:category/:id' element={ user?.uid ? <Leisure user={user} /> : <Navigate to="/*" setActive={setActive}/>} />
        
        {/* Sa baba neto yung maglilist ng lahat ng explore at leisure, based sa category nila */}
        <Route path='/createExplore' element={user?.uid ? <Explore user={user} /> : <Navigate to="/*"/>} />
        <Route path='/createLeisure' element={user?.uid ? <Leisure user={user} /> : <Navigate to="/*"/>} />
        
        {/* Sa baba neto yung store router */}
        <Route path='/store' element={user?.uid ? <Store user={user} /> : <Navigate to="/*"/>} />
        {/* ETO YUNG PAG PININDOT ANG ISANG STORE PRODUCT, MAGROUTE SYA DUN SA MISMONG PRODUCT DETAILS PAGE */}
        <Route path='/detail/:classification/:id' element={<Detail setActive={setActive} />}/>

        {/* ETO YUNG PARA SA NEWS PANEL */}
        <Route path='/news' element={user?.uid ? <News user={user} /> : <Navigate to="/*"/>} />
        <Route path='/news/:id' element={user?.uid ? <Detail user={user} /> : <Navigate to="/*"/>} />

        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth setActive={setActive} setUser={user} />} />
      </Routes>
    </div>
  );
}

export default App;
