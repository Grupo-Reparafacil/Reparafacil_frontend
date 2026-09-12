import { useParams, useNavigate } from 'react-router-dom'

export default function AvaliacaoEnviada(){
  const {id} = useParams()
  const navigate = useNavigate()

  return(
    <div style={{minHeight:'100vh', background:'#eef2ff', display:'flex', justifyContent:'center', alignItems:'center', padding:'20px'}}>
      <div style={{width:'100%', maxWidth:'400px', background:'#fff', borderRadius:'20px', padding:'30px', textAlign:'center', boxShadow:'0 8px 30px rgba(0,0,0,0.08)'}}>
        
        <div style={{width:'80px', height:'80px', background:'#dcfce7', borderRadius:'50%', display:'flex', justifyContent:'center', alignItems:'center', margin:'0 auto 16px', fontSize:'40px'}}>
          ✓
        </div>

        <h2 style={{color:'#111'}}>Avaliação enviada!</h2>
        <p style={{color:'#6b7280', fontSize:'14px', marginTop:'8px', lineHeight:'1.4'}}>
          Obrigado por avaliar! Sua opinião é muito importante para a comunidade ReparaFácil e ajuda outros clientes a escolherem os melhores profissionais.
        </p>

        <div style={{background:'#f8fafc', borderRadius:'12px', padding:'12px', margin:'20px 0', border:'1px solid #e2e8f0', textAlign:'left'}}>
          <p style={{fontSize:'12px', color:'#94a3b8'}}>O que acontece agora?</p>
          <p style={{fontSize:'13px', marginTop:'4px'}}>⭐ Sua avaliação aparecerá no perfil do profissional</p>
          <p style={{fontSize:'13px', marginTop:'4px'}}>💬 O profissional será notificado</p>
        </div>

        <button onClick={()=>navigate(`/perfil/${id}`)} style={{width:'100%', background:'#2563eb', color:'#fff', border:'none', padding:'12px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>
          Ver perfil do profissional
        </button>

        <button onClick={()=>navigate(`/busca`)} style={{width:'100%', background:'#fff', color:'#2563eb', border:'1px solid #dbeafe', padding:'12px', borderRadius:'10px', fontWeight:'700', cursor:'pointer', marginTop:'8px'}}>
          Voltar para busca
        </button>

      </div>
    </div>
  )
}