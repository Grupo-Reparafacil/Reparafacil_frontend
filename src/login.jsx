import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './NovaPagina.css'

export default function Login(){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  function handleLogin(e){
    e.preventDefault()
    if(email && senha){
      navigate('/busca')
    } else {
      alert('Digite email e senha')
    }
  }

  return(
    <div className="page-container">
      <div className="form-card">
        <div className="logo-box">R</div>
        <h1 className="brand">ReparaFácil</h1>
        <p className="subtitle">Entre na sua conta</p>
        <form onSubmit={handleLogin}>
          <div className="input-group"><label>E-mail</label><input placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="input-group"><label>Senha</label><input type="password" placeholder="****" value={senha} onChange={e=>setSenha(e.target.value)} /></div>
          <button type="submit" className="btn-primary">Entrar</button>
        </form>
        <p className="footer-text">Não tem conta? <Link to="/criar-conta">Criar conta</Link></p>
      </div>
    </div>
  )
}