import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NovaPagina.css'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function handleLogin(e){
    e.preventDefault()
    alert(`Login: ${email}`)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <div className="logo-box">R</div>
          <h1>Bem-vindo de volta</h1>
          <p className="subtitle">Entre na sua conta Repara Fácil</p>
        </div>

        <form onSubmit={handleLogin}>
          <div>
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Senha</label>
            <input type="password" placeholder="••••••••" value={senha} onChange={e=>setSenha(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary">Entrar</button>
        </form>

        <p style={{textAlign:'center', marginTop:'16px', fontSize:'14px'}}>
          Não tem conta? <Link to="/">Criar conta</Link>
        </p>
      </div>
    </div>
  )
}
export default Login

