import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Busca from './Busca'
import Contatar from './Contatar'
import Perfil from './Perfil'
import Avaliar from './Avaliar'
import AvaliacaoEnviada from './AvaliacaoEnviada'
import Login from './login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/busca" />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/meuperfil" element={<Perfil />} />
        <Route path="/contatar/:id" element={<Contatar />} />
        <Route path="/avaliar/:id" element={<Avaliar />} />
        <Route path="/avaliacao-enviada/:id" element={<AvaliacaoEnviada />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App