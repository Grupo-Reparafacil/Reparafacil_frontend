import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Busca from './Busca'
import Contatar from './Contatar'
import Perfil from './Perfil'
import Avaliar from './Avaliar'
import AvaliacaoEnviada from './AvaliacaoEnviada'
import Login from './login'
import NovaPagina from './NovaPagina'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-conta" element={<NovaPagina />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/meuperfil" element={<Perfil />} />
        <Route path="/contatar/:id" element={<Contatar />} />
        <Route path="/avaliar/:id" element={<Avaliar />} />
        <Route path="/avaliacao-enviada/:id" element={<AvaliacaoEnviada />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App