import { useParams, useNavigate, Link } from 'react-router-dom'
import './Contatar.css'

const lista = [
  {id:1, nome:"Carlos Silva", prof:"Elétrica", local:"Centro, Teresina - PI", img:"https://i.pravatar.cc/150?img=11"},
  {id:2, nome:"João Pereira", prof:"Encanamento", local:"Dirceu, Teresina - PI", img:"https://i.pravatar.cc/150?img=15"},
  {id:3, nome:"Maria Santos", prof:"Pintura", local:"Fátima, Teresina - PI", img:"https://i.pravatar.cc/150?img=26"},
]

export default function Contatar(){
  const {id} = useParams()
  const navigate = useNavigate()
  const p = lista.find(x=> x.id == id) || lista[0]

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
          <textarea placeholder="Ex: Minha tomada da cozinha não está funcionando..."></textarea>
        </div>

        <div className="input-group">
          <label>Localização</label>
          <input placeholder="Ex: Rua 13 de Maio" />
        </div>

        <button className="btn-whats" onClick={()=>window.open('https://wa.me/5586999999999','_blank')}>💬 Falar no WhatsApp</button>
        <button className="btn-enviar" onClick={()=>{alert('Solicitação enviada!'); navigate('/busca')}}>Solicitar Serviço</button>
      </div>
    </div>
  )
}