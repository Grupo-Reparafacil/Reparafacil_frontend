import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NovaPagina from './NovaPagina'
import Login from './login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NovaPagina />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
