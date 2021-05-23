//CSS
import './App.css'
//
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header.js'
import Home from './Components/Home.js'
import Footer from './Components/Footer.js'
import Login from './Components/Login/Login.js'
import {UserStorage} from './UserContext.js';
import User from './Components/User/User.js'
import ProtectedRoute from './Components/Helper/ProtectedRoute.js'
import Photo from './Components/Photo/Photo.js'
import UserProfile from './Components/User/UserProfile';
import NotFound from './Components/NotFound';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
            <main className="AppBody">
              <Routes>
                <Route paht="/" element={<Home />} />
                <Route path="login/*" element={<Login />} />
                <ProtectedRoute path="conta/*" element={<User />} />
                <Route path="foto/:id" element={<Photo />} />
                <Route path="perfil/:user" element={<UserProfile />} />
                <Route path="*" element={<NotFound/>} />
              </Routes>
            </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div> 
  );
}

export default App;
