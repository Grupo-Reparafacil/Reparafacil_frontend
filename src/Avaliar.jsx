import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

const profissionais = {
  1:{nome:"Carlos Silva", prof:"elétrico", img:"https://i.pravatar.cc/150?img=11"},
  2:{nome:"João Pereira", prof:"encanador", img:"https://i.pravatar.cc/150?img=15"},
}

export default function Avaliar(){
  const {id} = useParams()
  const navigate = useNavigate()
  const [nota, setNota] = useState(0)
  const [comentario, setComentario] = useState('')
  const [hover, setHover] = useState(0)
  const [carregando, setCarregando] = useState(false)
  const prof = profissionais[id] || profissionais[1]

  async function enviar(){
    if(nota===0){ alert("Selecione as estrelas"); return; }
    setCarregando(true)

    try {
      const cliente = JSON.parse(localStorage.getItem('cliente') || '{}')

      // LIGA COM BACKEND - Hugo Napoleão
      const resposta = await fetch('http://localhost:3001/api/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profissionalId: Number(id),
          nota,
          comentario,
          nome: cliente.nome || "Cliente Hugo Napoleão",
          clienteId: cliente.id || 1
        })
      })

      const dados = await resposta.json()

      if(!resposta.ok){
        throw new Error(dados.erro || 'Erro ao enviar avaliação')
      }

      console.log("Avaliação salva no backend:", dados)

      // Mantém também no localStorage como backup
      const avaliacoesLocal = JSON.parse(localStorage.getItem(`avaliacoes_${id}`) || "[]")
      avaliacoesLocal.push({nota, comentario, nome: cliente.nome || "Você", data:new Date().toLocaleDateString()})
      localStorage.setItem(`avaliacoes_${id}`, JSON.stringify(avaliacoesLocal))

      navigate(`/avaliacao-enviada/${id}`)

    } catch (err) {
      alert(err.message)
    } finally {
      setCarregando(false)
    }
  }

  return(
    <div style={{minHeight:'100vh', background:'#eef2ff', display:'flex', justifyContent:'center', padding:'20px'}}>
      <div style={{width:'100%', maxWidth:'500px', background:'#fff', borderRadius:'20px', padding:'20px'}}>
        <Link to={`/perfil/${id}`} style={{textDecoration:'none', background:'#f3f4f6', padding:'6px 12px', borderRadius:'20px', fontSize:'13px', fontWeight:'700', color:'#111'}}>← Voltar</Link>
        <div style={{textAlign:'center', marginTop:'16px'}}>
          <img src={prof.img} alt="" style={{width:'70px', height:'70px', borderRadius:'50%'}} />
          <h3 style={{marginTop:'8px'}}>{prof.nome}</h3>
          <p style={{color:'#6b7280', fontSize:'13px'}}>{prof.prof}</p>
          <p style={{marginTop:'12px', fontWeight:'700'}}>Como foi o serviço?</p>
        </div>
        <div style={{textAlign:'center', margin:'20px 0'}}>
          <div style={{display:'flex', justifyContent:'center', gap:'6px', fontSize:'36px', cursor:'pointer'}}>
            {[1,2,3,4,5].map(s=>(
              <span key={s} onClick={()=>setNota(s)} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)} style={{color:(hover||nota)>=s?'#f59e0b':'#e5e7eb'}}>★</span>
            ))}
          </div>
          <p style={{fontSize:'13px', color:'#6b7280', marginTop:'8px'}}>Toque para avaliar</p>
        </div>
        <label style={{fontWeight:'700', fontSize:'14px'}}>Deixe um comentário</label>
        <textarea value={comentario} onChange={e=>setComentario(e.target.value)} placeholder="Conte como foi a experiência..." style={{width:'100%', minHeight:'100px', marginTop:'8px', padding:'12px', borderRadius:'12px', border:'1px solid #ddd', boxSizing:'border-box'}} />
        <button onClick={enviar} disabled={carregando} style={{width:'100%', marginTop:'16px', background: carregando? '#9ca3af' : '#2563eb', color:'#fff', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>
          {carregando? 'Enviando...' : 'Avaliar'}
        </button>
      </div>
    </div>
  )
}