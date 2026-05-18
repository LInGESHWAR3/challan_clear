import { useState } from 'react';
import T from '../utils/theme';
import AdminLogin     from '../admin/AdminLogin';
import AdminDashboard from '../admin/AdminDashboard';
import AdminCase      from '../admin/AdminCase';
import AddChallan     from '../admin/AddChallan';

export default function AdminPortal({ challans, onUpdate, onAdd, onBack }) {
  const [view,  setView]  = useState('login');
  const [selId, setSelId] = useState(null);
  const curChallan = selId ? challans.find(c => c.id === selId) : null;

  if (view==='login') return <AdminLogin onSuccess={()=>setView('dash')} onBack={onBack} />;

  return (
    <div style={{ padding:'20px 24px', maxWidth:880, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24, flexWrap:'wrap' }}>
        <NB onClick={onBack}>← Home</NB>
        <Dv />
        <span style={{ fontSize:14 }}>🏛️</span>
        <span style={{ fontWeight:800, color:T.txt, fontSize:16 }}>Admin Portal</span>
        {(view==='case'||view==='add') && <><Dv /><NB onClick={()=>setView('dash')}>← Dashboard</NB></>}
      </div>

      {view==='dash' &&
        <AdminDashboard challans={challans}
          onCase={c=>{ setSelId(c.id); setView('case'); }}
          onAdd={()=>setView('add')} />}
      {view==='case' && curChallan &&
        <AdminCase challan={curChallan}
          onVerdict={(id,v,n)=>{ onUpdate(id,{status:'resolved',verdict:v,note:n}); setView('dash'); }}
          onBack={()=>setView('dash')} />}
      {view==='add' &&
        <AddChallan onAdd={c=>{ onAdd(c); setView('dash'); }} onBack={()=>setView('dash')} />}
    </div>
  );
}

function NB({ onClick, children }) {
  return <button onClick={onClick} style={{ background:'none', border:'none', color:T.txt2, cursor:'pointer', fontSize:13, fontWeight:700, padding:0 }}>{children}</button>;
}
function Dv() { return <div style={{ width:1, height:14, background:T.bd }} />; }
