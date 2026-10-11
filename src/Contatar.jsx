import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Contatar.css'

export default function Contatar(){
  const {id} = useParams()
  const navigate = useNavigate()
  const [p, setP] = useState(null)
  const [problema, setProblema] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')

  useEffect(()=>{
    fetch(`http://localhost:3001/api/profissional/perfil/${id}`)
      .then(r=>r.json())
      .then(d=>setP(d))
      .catch(()=>setP({id:1, nome:"Carlos Silva", prof:"Elétrica", local:"Centro, Teresina - PI", img:"https://i.pravatar.cc/150?img=11", whatsapp:"5586988881111"}))
  }, [id])

  if(!p) return <div style={{padding:'20px'}}>Carregando...</div>

  function falarWhatsApp(){
    const msg = `Olá ${p.nome}! Vim pelo ReparaFácil.\nProblema: ${problema}\nLocal: ${localizacao}\nQuando: ${data} às ${hora}`
    window.open(`https://wa.me/${p.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  async function solicitar(){
    if(!data || !hora){ alert('⚠️ Escolha o dia e a hora no calendário!'); return }
    await fetch('http://localhost:3001/api/agendamentos', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ clienteId:1, profissionalId:p.id, data, hora, servico:p.prof, problema, localizacao })
    })
    alert(`Agendado com ${p.nome} para ${data} às ${hora}!`)
    navigate('/busca')
  }

  return(
    <div className="contatar-container">
      <div className="contatar-card">
        <Link to="/busca" className="voltar">← Voltar para busca</Link>

        <div className="prof-header">
          <img src={p.img} alt={p.nome} />
          <div>
            <strong>{p.nome}</strong>
            <p className="profissao">{p.prof}</p>
            <p className="local">📍 {p.local}</p>
            <span className="badge">Disponível agora</span>
          </div>
        </div>

        <h3>O que você deseja?</h3>

        <div className="input-group">
          <label>Descreva o problema</label>
          <textarea value={problema} onChange={e=>setProblema(e.target.value)} placeholder="Ex: Minha tomada da cozinha..."></textarea>
        </div>

        <div className="input-group">
          <label>Localização</label>
          <input value={localizacao} onChange={e=>setLocalizacao(e.target.value)} placeholder="Ex: Rua 13 de Maio, Centro - Teresina" />
        </div>

        {/* AQUI ESTÁ O CALENDÁRIO QUE FALTAVA */}
        <h3 style={{marginTop:'20px'}}>Quando você quer o serviço?</h3>
        <div className="input-group" style={{display:'flex', gap:'10px'}}>
          <div style={{flex:1}}>
            <label>📅 Escolha o dia</label>
            <input type="date" value={data} onChange={e=>setData(e.target.value)} style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} />
          </div>
          <div style={{flex:1}}>
            <label>⏰ Escolha a hora</label>
            <input type="time" value={hora} onChange={e=>setHora(e.target.value)} style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}} />
          </div>
        </div>

        <button className="btn-whats" onClick={falarWhatsApp}>💬 Falar no WhatsApp</button>
        <button className="btn-enviar" onClick={solicitar}>Solicitar Serviço - Agendar {data && hora ? `${data} às ${hora}` : ''}</button>
      </div>
    </div>
  )
}