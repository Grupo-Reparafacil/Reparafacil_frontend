import { Link, useParams, useNavigate } from 'react-router-dom'
import './Perfil.css'

const profissionais = {
  1:{
    nome:"Carlos Silva", prof:"Elétrica", local:"Centro, Teresina - PI", exp:"8 anos",
    desc:"Especialista em instalações elétricas residenciais e prediais.",
    img:"https://i.pravatar.cc/150?img=11",
    orcamentos:[
      {servico:"Instalação de chuveiro", preco:"R$ 80 - R$ 150"},
      {servico:"Troca de fiação (por cômodo)", preco:"R$ 120 - R$ 250"},
      {servico:"Instalação de tomada/interruptor", preco:"R$ 40 - R$ 70"},
    ]
  },
  2:{
    nome:"João Pereira", prof:"Encanamento", local:"Dirceu, Teresina - PI", exp:"12 anos",
    desc:"Desentupimentos e vazamentos.",
    img:"https://i.pravatar.cc/150?img=15",
    orcamentos:[
      {servico:"Desentupimento simples", preco:"R$ 90 - R$ 180"},
      {servico:"Caça vazamento", preco:"R$ 150 - R$ 300"},
    ]
  },
  3:{
    nome:"Maria Santos", prof:"Pintura", local:"Fátima, Teresina - PI", exp:"6 anos",
    desc:"Pintura residencial premium.",
    img:"https://i.pravatar.cc/150?img=5",
    orcamentos:[
      {servico:"Pintura por m²", preco:"R$ 25 - R$ 45"},
      {servico:"Parede 3x3m completa", preco:"R$ 300 - R$ 500"},
    ]
  },
  4:{
    nome:"Pedro Costa", prof:"Marcenaria", local:"Mocambinho, Teresina - PI", exp:"10 anos",
    desc:"Móveis planejados.",
    img:"https://i.pravatar.cc/150?img=12",
    orcamentos:[
      {servico:"Prateleira sob medida", preco:"R$ 120 - R$ 250"},
      {servico:"Conserto de porta/gaveta", preco:"R$ 50 - R$ 120"},
    ]
  },
}
export default function Perfil(){
  const {id} = useParams()
  const navigate = useNavigate()
  const prof = profissionais[id] || {nome:"Meu Perfil", prof:"Cliente", local:"Teresina - PI", exp:"", desc:"Seu perfil de cliente", img:"https://i.pravatar.cc/150?img=11", orcamentos:[]}

  return(
    <div className="perfil-container">
      <div className="perfil-card">
        <Link to="/busca" className="voltar-link">← Voltar</Link>

        <div className="perfil-top">
          <img src={prof.img} alt="" />
          <h2>{prof.nome}</h2>
          <p style={{color:'#2563eb', fontWeight:'700'}}>{prof.prof} {prof.exp && `• ${prof.exp}`}</p>
          <p>📍 {prof.local}</p>
          <p style={{fontSize:'13px', color:'#555', marginTop:'8px'}}>{prof.desc}</p>
          <div style={{marginTop:'10px', fontSize:'13px'}}>⭐ 4,8 (120 avaliações)</div>
        </div>

        {id && <>
          <h3 style={{marginBottom:'8px'}}>Serviços</h3>
          <div style={{display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'16px'}}>
            <span className="tag">Instalação</span>
            <span className="tag">Manutenção</span>
            <span className="tag">Reparo</span>
          </div>

          <h3 style={{marginBottom:'8px'}}>Orçamento Estimado</h3>
          <div style={{background:'#f8fafc', borderRadius:'12px', padding:'12px', marginBottom:'20px', border:'1px solid #e2e8f0'}}>
            {prof.orcamentos.map((o,i)=>(
              <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom: i < prof.orcamentos.length-1? '1px solid #e2e8f0' : 'none', fontSize:'13px'}}>
                <span>{o.servico}</span>
                <strong style={{color:'#2563eb'}}>{o.preco}</strong>
              </div>
            ))}
            <p style={{fontSize:'11px', color:'#94a3b8', marginTop:'8px'}}> * Valores podem variar conforme avaliação no local</p>
          </div>

          <h3 style={{marginBottom:'8px'}}>Avaliações dos clientes</h3>
          <div className="avaliacao"><strong>Ana M. - ⭐⭐⭐⭐⭐</strong><p>"Serviço impecável, resolveu em 30min!"</p></div>
          <div className="avaliacao"><strong>Roberto L. - ⭐⭐⭐⭐⭐</strong><p>"Muito profissional, preço justo."</p></div>
          <div className="avaliacao"><strong>Julia S. - ⭐⭐⭐⭐</strong><p>"Bom serviço, recomendo."</p></div>

          <button onClick={()=>navigate(`/contatar/${id}`)} style={{width:'100%', marginTop:'16px', background:'#2563eb', color:'#fff', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>Solicitar Orçamento</button>
         <button onClick={()=>navigate(`/avaliar/${id}`)} style={{width:'100%', marginTop:'8px', background:'#fff', color:'#2563eb', border:'1px solid #2563eb', padding:'12px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>
         ⭐ Avaliar serviço
</button>
        </>}
      </div>
    </div>
  )}