import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function MeuPerfil(){
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({nome:'', cidade:'', email:''})
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    async function carregar(){
      try{
        const local = JSON.parse(localStorage.getItem('cliente') || 'null')
        const token = localStorage.getItem('token')
        if(!local ||!token){
          navigate('/login')
          return
        }

        // TENTA BUSCAR ATUALIZADO DO BACKEND
        const res = await fetch(`http://localhost:3001/api/cliente/${local.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if(res.ok){
          const dadosBackend = await res.json()
          setCliente(dadosBackend)
          setForm({nome: dadosBackend.nome, cidade: dadosBackend.cidade, email: dadosBackend.email})
          localStorage.setItem('cliente', JSON.stringify(dadosBackend))
          console.log("✅ Perfil veio do BACKEND")
        }else{
          setCliente(local)
          setForm({nome: local.nome, cidade: local.cidade, email: local.email})
          console.log("⚠️ Backend respondeu erro, usando localStorage")
        }
      }catch{
        const local = JSON.parse(localStorage.getItem('cliente') || 'null')
        if(local){
          setCliente(local)
          setForm({nome: local.nome, cidade: local.cidade, email: local.email})
          console.log("⚠️ Backend desligado, usando localStorage")
        }else{
          navigate('/login')
        }
      }
    }
    carregar()
  }, [navigate])

  async function salvar(){
    setMsg('Salvando...')
    try{
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:3001/api/cliente/${cliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.erro)

      setCliente(data.cliente)
      localStorage.setItem('cliente', JSON.stringify(data.cliente))
      setMsg('✅ Perfil atualizado!')
      setEditando(false)
      setTimeout(()=>setMsg(''), 2000)
    }catch(e){
      setMsg('❌ Erro: ' + e.message)
    }
  }

  if(!cliente) return <p style={{textAlign:'center', marginTop:'50px'}}>Carregando perfil...</p>

  return(
    <div style={{minHeight:'100vh', background:'#eef2ff', display:'flex', justifyContent:'center', padding:'20px'}}>
      <div style={{width:'100%', maxWidth:'500px', background:'#fff', borderRadius:'20px', padding:'20px'}}>
        <Link to="/busca" style={{textDecoration:'none', background:'#f3f4f6', padding:'6px 12px', borderRadius:'20px', fontSize:'13px', fontWeight:'700'}}>← Voltar</Link>

        <div style={{textAlign:'center', marginTop:'20px'}}>
          <div style={{width:'80px', height:'80px', background:'#2563eb', color:'#fff', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', fontWeight:'800', margin:'0 auto'}}>{cliente.nome[0].toUpperCase()}</div>
          <h2>{cliente.nome}</h2>
          <p style={{color:'#6b7280', fontSize:'13px'}}>{cliente.email}</p>
        </div>

        {msg && <p style={{textAlign:'center', marginTop:'10px', fontSize:'13px', fontWeight:'700'}}>{msg}</p>}

        {!editando? (
          <>
            <div style={{marginTop:'20px', background:'#f8fafc', borderRadius:'12px', padding:'14px', border:'1px solid #e2e8f0'}}>
              <p><strong>Nome:</strong> {cliente.nome}</p>
              <p style={{marginTop:'6px'}}><strong>Email:</strong> {cliente.email}</p>
              <p style={{marginTop:'6px'}}><strong>Cidade:</strong> {cliente.cidade}</p>
              <p style={{marginTop:'6px'}}><strong>ID:</strong> {cliente.id}</p>
            </div>
            <button onClick={()=>setEditando(true)} style={{width:'100%', marginTop:'16px', background:'#2563eb', color:'#fff', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'700'}}>Editar perfil</button>
          </>
        ) : (
          <>
            <div style={{marginTop:'20px', display:'flex', flexDirection:'column', gap:'10px'}}>
              <input value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} placeholder="Nome" style={{padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}} />
              <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" style={{padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}} />
              <input value={form.cidade} onChange={e=>setForm({...form, cidade:e.target.value})} placeholder="Cidade" style={{padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}} />
            </div>
            <button onClick={salvar} style={{width:'100%', marginTop:'12px', background:'#16a34a', color:'#fff', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'700'}}>Salvar no backend</button>
            <button onClick={()=>setEditando(false)} style={{width:'100%', marginTop:'8px', background:'#fff', color:'#111', border:'1px solid #ddd', padding:'12px', borderRadius:'10px', fontWeight:'700'}}>Cancelar</button>
          </>
        )}

        <button onClick={()=>{localStorage.clear(); navigate('/login')}} style={{width:'100%', marginTop:'12px', background:'#fee2e2', color:'#ef4444', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'700'}}>Sair</button>
      </div>
    </div>
  )
}