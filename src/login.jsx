import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './NovaPagina.css'

export default function Login(){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    setErro('')
    setCarregando(true)

    if(!email || !senha){
      setErro('Digite email e senha')
      setCarregando(false)
      return
    }

    try {
      const resposta = await fetch('https://reparafacil-backend.onrender.com/api/clientes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      })

      const dados = await resposta.json()

      if(!resposta.ok){
        throw new Error(dados.erro || 'Erro no login')
      }

      // LOGIN REAL - Hugo Napoleão
      console.log("Login OK:", dados)
      localStorage.setItem('token', dados.token)
      localStorage.setItem('cliente', JSON.stringify(dados.cliente))
      
      navigate('/busca')

    } catch (err) {
      console.log("Erro login:", err.message)
      setErro(err.message || 'Credenciais inválidas')
    } finally {
      setCarregando(false)
    }
  }

  return(
    <div className="page-container">
      <div className="form-card">
        <div className="logo-box">R</div>
        <h1 className="brand">ReparaFácil</h1>
        <p className="subtitle">Hugo Napoleão - PI | Entre na sua conta</p>
        
        {erro && <div style={{background:'#ffdddd', color:'#d00', padding:'10px', borderRadius:'8px', marginBottom:'15px', textAlign:'center'}}>{erro}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>E-mail</label>
            <input placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="****" value={senha} onChange={e=>setSenha(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <p style={{textAlign:'center', fontSize:'13px', marginTop:'10px', color:'#666'}}>
          Teste: admin@reparafacil.com / 123456
        </p>

        <p className="footer-text">Não tem conta? <Link to="/criar-conta">Criar conta</Link></p>
      </div>
    </div>
  )
}
