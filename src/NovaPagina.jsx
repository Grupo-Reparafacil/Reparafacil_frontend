import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NovaPagina.css'

function NovaPagina(){
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: '', cpf: '', email: '', senha: '', perfil: 'Cliente'
  })

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    // por enquanto só navega
    navigate('/login')
  }

  return(
    <div className="page-container">
      <div className="form-card">
        <div className="logo-box">R</div>
        <h1 className="brand">Criar Conta</h1>
        <p className="subtitle">Cadastre-se no Repara Fácil</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome completo</label>
            <input name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>CPF</label>
            <input name="cpf" placeholder="000.000.000-00" value={form.cpf} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input name="senha" type="password" placeholder="********" value={form.senha} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Tipo de perfil</label>
            <select name="perfil" value={form.perfil} onChange={handleChange}>
              <option>Cliente</option>
              <option>Profissional</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">Criar conta</button>
        </form>

        <p className="footer-text">Já tem conta? <Link to="/login">Fazer login</Link></p>
      </div>
    </div>
  )
}

export default NovaPagina