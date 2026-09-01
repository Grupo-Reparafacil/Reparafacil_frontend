import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Login com:', { email, senha })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo e Título */}
        <div className="header">
          <div className="logo-box">R</div>
          <h1>REPARAFÁCIL</h1>
          <p className="subtitle">Faça login para continuar</p>
        </div>

        {/* Campo de E-mail */}
        <div className="form-card">
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>E-mail</label>
              <div className="input-wrapper">
                {/* Mostrar o ícone somente se o campo de e-mail estiver vazio */}
                {!email && (
                <svg 
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="18" 
                  height="18" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                )}
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={email ? 'has-value' : ''}
                  required
                />
              </div>
            </div>
             
             {/* Campo de Senha */}
            <div className="input-group">
              <label>Senha</label>
              <div className="input-wrapper">
                {/* Mostrar o ícone somente se o campo de senha estiver vazio */}
                {!senha && (
                  <svg 
                    className="icon" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    width="18" 
                    height="18" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={senha ? 'has-value' : ''}
                  required
                />
                <button
                  type="button"
                  className={`icon-eye ${mostrarSenha ? 'active' : ''}`}
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? (
                    /* Ícone riscado para indicar que a senha está visível */
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line x1="2" y1="2" x2="22" y2="22"/>
                    </svg>
                  ) : (
                    /* Ícone de olho aberto para indicar que a senha está oculta */
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#">Esqueci minha senha</a>
            </div>

            <button type="submit" className="btn-primary">
              Entrar
            </button>
          </form>

          <div className="divider">
            <span>Novo no app?</span>
          </div>

          <button type="button" className="btn-secondary">
            Criar uma conta
          </button>
        </div>

        {/* Rodapé */}
        <div className="footer-terms">
          <p>
          Ao continuar, você concorda com nossos{' '}
            <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App