import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NovaPagina.css'

function NovaPagina() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('cliente')

  // Máscara de CPF
  function mascaraCpf(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const cpfLimpo = cpf.replace(/\D/g, '')
    if (cpfLimpo.length !== 11) {
      alert('CPF inválido! Digite 11 números.')
      return
    }
    alert(`Conta criada!\nNome: ${nome}\nCPF: ${cpf}\nTipo: ${tipo}`)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <div className="logo-box">R</div>
          <h1>Criar Conta</h1>
          <p className="subtitle">Cadastre-se no Repara Fácil</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome completo</label>
            <input type="text" placeholder="Seu nome" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>

          <div>
            <label>CPF</label>
            <input type="text" placeholder="000.000.000-00" value={cpf} onChange={e => setCpf(mascaraCpf(e.target.value))} required />
          </div>

          <div>
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div>
            <label>Senha</label>
            <input type="password" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>

          <div>
            <label>Tipo de perfil</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="cliente">Cliente</option>
              <option value="prestador">Prestador</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">Criar conta</button>
        </form>

        <p style={{textAlign:'center', marginTop:'16px', fontSize:'14px'}}>
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </div>
  )
}

export default NovaPagina