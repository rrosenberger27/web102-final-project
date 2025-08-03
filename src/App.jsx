import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Gallery from './pages/Gallery'
import ViewPost from './pages/ViewPost'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/view/:id" element={<ViewPost />} />
    </Routes>
    </>
  )
}

export default App
