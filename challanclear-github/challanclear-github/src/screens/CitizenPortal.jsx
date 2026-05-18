import { useState } from 'react';
import T from '../utils/theme';
import VehicleLookup from '../citizen/VehicleLookup';
import ChallanList   from '../citizen/ChallanList';
import DisputeWizard from '../citizen/DisputeWizard';
import TrackCase     from '../citizen/TrackCase';

export default function CitizenPortal({ challans, onUpdate, onBack }) {
  const [view,    setView]    = useState('lookup');
  const [vehicle, setVehicle] = useState('');
  const [found,   setFound]   = useState([]);
  const [selId,   setSelId]   = useState(null);

  const curChallan = selId ? challans.find(c => c.id === selId) : null;

  const lookup = () => {
    const v = vehicle.trim().toUpperCase().replace(/\s/g,'');
    if (!v) return;
    setFound(challans.filter(c => c.vehicle.replace(/\s/g,'').toUpperCase() === v));
    setView('list');
  };

  return (
    <div style={{ padding:'20px 24px', maxWidth:820, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24, flexWrap:'wrap' }}>
        <NB onClick={onBack}>← Home</NB>
        <Dv />
        <span style={{ fontSize:14 }}>👤</span>
        <span style={{ fontWeight:800, color:T.txt, fontSize:16 }}>Citizen Portal</span>
        {view !== 'lookup' && <><Dv /><NB onClick={()=>{ if(view==='list'){setView('lookup');}else{setView('list');} }}>← Back</NB></>}
      </div>

      {view==='lookup'  && <VehicleLookup vehicle={vehicle} setVehicle={setVehicle} onSearch={lookup} />}
      {view==='list'    && <ChallanList challans={found} vehicle={vehicle}
          onDispute={c=>{ setSelId(c.id); setView('dispute'); }}
          onTrack  ={c=>{ setSelId(c.id); setView('track');   }}
          onReset  ={()=>{ setVehicle(''); setView('lookup'); }} />}
      {view==='dispute' && curChallan &&
        <DisputeWizard challan={curChallan}
          onSubmit={u=>{ onUpdate(selId,u); setView('track'); }}
          onBack={()=>setView('list')} />}
      {view==='track' && curChallan &&
        <TrackCase challan={curChallan} onBack={()=>setView('list')} />}
    </div>
  );
}

function NB({ onClick, children }) {
  return <button onClick={onClick} style={{ background:'none', border:'none', color:T.txt2, cursor:'pointer', fontSize:13, fontWeight:700, padding:0 }}>{children}</button>;
}
function Dv() { return <div style={{ width:1, height:14, background:T.bd }} />; }
