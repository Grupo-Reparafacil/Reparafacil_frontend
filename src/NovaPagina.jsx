import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NovaPagina.css'

function NovaPagina(){
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [form, setForm] = useState({
    nome: '', cpf: '', email: '', senha: '', perfil: 'Cliente', cidade: 'Hugo Napoleão - PI'
  })

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault()
    setErro('')
    setCarregando(true)

    if(!form.nome || !form.email || !form.senha){
      setErro('Preencha nome, email e senha')
      setCarregando(false)
      return
    }

    try {
      const resposta = await fetch('http://localhost:3001/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome: form.nome, 
          email: form.email, 
          senha: form.senha, 
          cidade: form.cidade,
          cpf: form.cpf,
          perfil: form.perfil
        })
      })

      const dados = await resposta.json()

      if(!resposta.ok){
        throw new Error(dados.erro || 'Erro ao criar conta')
      }

      alert(`Conta de ${form.perfil} criada com sucesso! Faça login.`)
      navigate('/login')

    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  return(
    <div className="page-container">
      <div className="form-card">
        <div className="logo-box">R</div>
        <h1 className="brand">Criar Conta</h1>
        <p className="subtitle">Cadastre-se no Repara Fácil - Hugo Napoleão PI</p>

        {erro && <div style={{background:'#ffdddd', color:'#d00', padding:'10px', borderRadius:'8px', marginBottom:'15px', textAlign:'center'}}>{erro}</div>}

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
            <label>Cidade</label>
            <input name="cidade" placeholder="Hugo Napoleão - PI" value={form.cidade} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Tipo de perfil</label>
            <select name="perfil" value={form.perfil} onChange={handleChange}>
              <option>Cliente</option>
              <option>Profissional</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={carregando}>
            {carregando ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <p className="footer-text">Já tem conta? <Link to="/login">Fazer login</Link></p>
      </div>
    </div>
  )
}

export default NovaPagina