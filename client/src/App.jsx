import { useState } from 'react'
import Login from './components/Login/Login'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './components/Register/Register'
import Home from './components/Home/Home';
import Share from './components/Board/Share';
function App() {
 

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/share/:taskId' element={<Share/>}/>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
