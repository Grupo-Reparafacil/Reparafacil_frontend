import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


const listaInicial = [
  {id:1, nome:"Carlos Silva", prof:"Elétrica", cat:"Elétrica", bairro:"Centro", local:"Centro, Teresina - PI • 8 anos", img:"https://i.pravatar.cc/150?img=11", nota:"4,8 (120)", whatsapp:"5586988881111"},
  {id:2, nome:"João Pereira", prof:"Encanamento", cat:"Encanamento", bairro:"Dirceu", local:"Dirceu, Teresina - PI • 12 anos", img:"https://i.pravatar.cc/150?img=15", nota:"4,9 (89)", whatsapp:"5586988882222"},
  {id:3, nome:"Maria Santos", prof:"Pintura", cat:"Pintura", bairro:"Fátima", local:"Fátima, Teresina - PI • 6 anos", img:"https://i.pravatar.cc/150?img=5", nota:"4,7 (55)", whatsapp:"5586988883333"},
  {id:4, nome:"Pedro Costa", prof:"Marcenaria", cat:"Marcenaria", bairro:"Mocambinho", local:"Mocambinho, Teresina - PI • 10 anos", img:"https://i.pravatar.cc/150?img=12", nota:"5,0 (210)", whatsapp:"5586988884444"},
]

export default function Busca(){
  const [profissionais, setProfissionais] = useState(listaInicial) // COMEÇA COM A LISTA DELA
  const [busca,setBusca] = useState('')
  const [cat,setCat] = useState('Todas')
  const [bairro,setBairro] = useState('Todos')
  const navigate = useNavigate()

  // INTEGRAÇÃO COM BACKEND 
  useEffect(()=>{
    async function buscarBackend(){
      try{
        const res = await fetch('http://localhost:3001/api/profissionais')
        const dados = await res.json()
        if(dados && dados.length > 0){
          setProfissionais(dados) // SE BACKEND TIVER DADOS, USA BACKEND
        }
      }catch{
        console.log("Backend desligado, mantendo lista local de Teresina")
      }
    }
    buscarBackend()
  }, [])

  const filtrados = profissionais.filter(p => {
    const nomeOk = p.nome.toLowerCase().includes(busca.toLowerCase()) || p.prof.toLowerCase().includes(busca.toLowerCase())
    const catOk = cat === 'Todas' || cat === 'Todas categorias' || p.cat === cat || p.cat.trim() === cat.trim()
    const bairroOk = bairro === 'Todos' || bairro === 'Localização' || p.bairro === bairro
    return nomeOk && catOk && bairroOk
  })

  return(
    <div style={{minHeight:'100vh', background:'#eef2ff'}}>
      <header style={{display:'flex', justifyContent:'space-between', padding:'12px 16px', background:'#fff', borderBottom:'1px solid #eee', position:'sticky', top:0}}>
        <strong style={{color:'#2563eb'}}>ReparaFácil</strong>
        <Link to="/meuperfil" style={{background:'#2563eb', color:'#fff', padding:'6px 14px', borderRadius:'20px', textDecoration:'none', fontSize:'13px', fontWeight:'700'}}>Meu perfil</Link>
      </header>

      <div style={{maxWidth:'700px', margin:'0 auto', padding:'16px'}}>
        <h3>{filtrados.length} profissionais encontrados</h3>
        
        
        <div style={{display:'flex', gap:'8px', margin:'12px 0'}}>
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{flex:1, padding:'10px', borderRadius:'10px', border:'1px solid #ddd'}}>
            <option>Todas</option>
            <option>Elétrica</option>
            <option>Encanamento</option>
            <option>Pintura</option>
            <option>Marcenaria</option>
          </select>
          <select value={bairro} onChange={e=>setBairro(e.target.value)} style={{flex:1, padding:'10px', borderRadius:'10px', border:'1px solid #ddd'}}>
            <option>Todos</option>
            <option>Centro</option>
            <option>Dirceu</option>
            <option>Fátima</option>
            <option>Mocambinho</option>
          </select>
        </div>

        <input style={{width:'100%', padding:'12px', borderRadius:'12px', border:'1px solid #ddd', boxSizing:'border-box'}} placeholder="Buscar por nome..." value={busca} onChange={e=>setBusca(e.target.value)} />

        {filtrados.map(p=>(
          <div key={p.id} style={{background:'#fff', borderRadius:'16px', padding:'14px', marginTop:'14px'}}>
            <div style={{display:'flex', gap:'12px'}}>
              <img src={p.img} style={{width:'64px', height:'64px', borderRadius:'12px'}} alt="" />
              <div>
                <strong>{p.nome}</strong><br/>
                <span style={{color:'#10b981', fontSize:'11px', fontWeight:'700'}}>Disponível</span><br/>
                <small>{p.prof}</small><br/>
                ⭐ {p.nota}<br/>
                📍 {p.local}
              </div>
            </div>
            <button onClick={()=>navigate(`/perfil/${p.id}`)} style={{width:'100%', marginTop:'10px', background:'#2563eb', color:'#fff', border:'none', padding:'10px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>Ver perfil</button>
            <button onClick={()=>navigate(`/contatar/${p.id}`)} style={{width:'100%', marginTop:'8px', background:'#fff', color:'#2563eb', border:'1px solid #dbeafe', padding:'10px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>Contatar</button>
          </div>
        ))}
      </div>
    </div>
  )
}