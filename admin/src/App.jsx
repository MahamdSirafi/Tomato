import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Edit from './pages/Edit/Edit'


import { useState } from 'react'
const App = () => {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />}></Route>
            <Route path="list/edit/:id" element={<Edit></Edit>}></Route>
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>

    </>
  );
}

export default App
