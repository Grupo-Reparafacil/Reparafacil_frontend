import { useState } from 'react'
import './NovaPagina.css';

export default function NovaPagina(){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  // Novos campos para a tela de registro
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [tipoPerfil, setTipoPerfil] = useState('cliente') // 'cliente' ou 'profissional'

  const handleRegister = (e) => {
    e.preventDefault()
    console.log('Dados do novo registro:', { 
      nomeCompleto,
      email,
      senha,
      tipoPerfil
    })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo e Título */}
        <div className="header">
          <div className="logo-box">R</div>
          <h1>Criar Conta</h1>
          <p className="subtitle">Preencha seus dados para começar</p>
        </div>

        {/* Novo Formulário de Registro */}
          <form onSubmit={handleRegister}>
            {/* Campo de Nome Completo */}
            <div className="input-group">
              <label htmlFor="nome">Nome Completo</label>
              <div className="input-wrapper">
                {/* Mostrar o ícone somente se o campo de nome completo estiver vazio */}
                {!nomeCompleto && (
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
                <input
                type="text"
                id="nome"
                placeholder="Seu nome completo"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                className={nomeCompleto ? 'has-value' : ''}
                required
                />
              </div>
            </div>
          { /*Campo de Email*/}
            <div className="input-group">
              <label
              htmlFor="email">E-mail</label>
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
                  id="email"
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
              <label htmlFor="senha">Senha</label>
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
                  id="senha"
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

            {/*Seleçao de tipo de perfil */}
            <div className="input-group">
              <label>Tipo de perfil</label>
            <div className="profile-selector">
              <button type="button"
              className={`profile-card ${tipoPerfil === 'cliente' ? 'active' : ''}`}
              onClick={() => setTipoPerfil('cliente')}
              >
                <span
                className="profile-title">Cliente</span>
                <span
                className="profile-desc">Procuro serviços</span>
              </button>

            <button type="button" 
            className={`profile-card ${tipoPerfil === 'profissional' ? 'active' : ''}`}
              onClick={() => setTipoPerfil('profissional')}
              >
                <span className="profile-title">Profissional</span>
                <span className="profile-desc">Ofereço serviços</span>
            </button>
            </div>
            </div>

            <button type="submit"
            className="btn-primary"> Cadastrar
            </button>
          </form>
          <div className="divider">
            <span>Já tem uma conta?</span>
          </div>

          <button type="button" className="btn-secondary">
            Fazer login
          </button>

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