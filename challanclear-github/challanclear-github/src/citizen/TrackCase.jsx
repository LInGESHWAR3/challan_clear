import T from '../utils/theme';
import { Badge, Card, Sep } from '../components/ui';
import AIBox from '../components/ui/AIBox';
import { fmtDate } from '../utils/helpers';

export default function TrackCase({ challan, onBack }) {
  const tl = [
    { label:'Dispute Filed',        desc:challan.filedOn?`Filed on ${fmtDate(challan.filedOn)}`:'Not yet filed',        done:!!challan.filedOn },
    { label:'AI Analysis Complete', desc:challan.ai?`${challan.ai.conf}% · ${challan.ai.verdict?.replace(/_/g,' ')}`:'Pending', done:!!challan.ai },
    { label:'Under Officer Review', desc:challan.status==='resolved'?'Review completed':'Currently being reviewed',    done:challan.status==='resolved' },
    { label:'Verdict Delivered',    desc:challan.verdict?`Dispute ${challan.verdict.toUpperCase()}${challan.note?' — '+challan.note:''}`:'Pending', done:challan.status==='resolved' },
  ];
  return (
    <div>
      <button onClick={onBack} style={{ background:'none', border:'none', color:T.txt2, cursor:'pointer', fontSize:13, fontWeight:700, padding:'0 0 16px 0' }}>← Back to Challans</button>
      <div style={{ fontWeight:800, fontSize:22, color:T.txt, marginBottom:4 }}>Case Tracking</div>
      <div style={{ color:T.txt2, fontSize:14, marginBottom:24 }}>
        Case ID: <span style={{ fontFamily:'monospace', color:T.amber, fontWeight:700 }}>{challan.caseId||'Not assigned'}</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <Card>
          {[['Offense',challan.offense],['Location',challan.loc],['Fine',`₹${challan.fine}`],['Filed On',challan.filedOn?fmtDate(challan.filedOn):'—']].map(([l,v])=>(
            <div key={l} style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, color:T.txt3, textTransform:'uppercase', letterSpacing:'.05em', marginBottom:2 }}>{l}</div>
              <div style={{ color:T.txt, fontSize:14, fontWeight:600 }}>{v||'—'}</div>
            </div>
          ))}
        </Card>
        <Card style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
          <div style={{ fontSize:12, color:T.txt2, marginBottom:10, fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em' }}>Current Status</div>
          <Badge status={challan.status} verdict={challan.verdict} />
          {challan.status==='resolved'&&challan.note&&(
            <div style={{ marginTop:14, fontSize:13, color:T.txt2, fontStyle:'italic' }}>"{challan.note}"</div>
          )}
        </Card>
      </div>

      <Card style={{ marginBottom:16 }}>
        <div style={{ fontWeight:700, color:T.txt, marginBottom:20, fontSize:14 }}>Case Timeline</div>
        {tl.map((s,i)=>(
          <div key={i} style={{ display:'flex', gap:16, marginBottom:i<tl.length-1?20:0 }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background:s.done?T.amber:T.s3,
                border:`2px solid ${s.done?T.amber:T.bd}`, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:11, color:s.done?'#000':T.txt3, fontWeight:700, flexShrink:0 }}>
                {s.done?'✓':i+1}
              </div>
              {i<tl.length-1&&<div style={{ width:2, flex:1, background:s.done?T.amber+'55':T.bd, margin:'4px 0' }}/>}
            </div>
            <div style={{ flex:1, paddingBottom:i<tl.length-1?6:0 }}>
              <div style={{ fontWeight:700, color:s.done?T.txt:T.txt3, fontSize:14 }}>{s.label}</div>
              <div style={{ color:T.txt3, fontSize:13, marginTop:2 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </Card>

      {challan.ai && <Card style={{ marginBottom:14 }}><div style={{ fontWeight:700, color:T.txt, marginBottom:12, fontSize:14 }}>🤖 AI Analysis Results</div><AIBox ai={challan.ai} /></Card>}

      {challan.lat && (
        <Card>
          <div style={{ fontWeight:700, color:T.txt, marginBottom:8, fontSize:14 }}>📍 Submitted Location</div>
          <div style={{ color:T.txt2, fontSize:13, marginBottom:4 }}>{challan.geo}</div>
          <div style={{ color:T.txt3, fontSize:11, fontFamily:'monospace', marginBottom:8 }}>Lat: {challan.lat?.toFixed(6)} · Lng: {challan.lng?.toFixed(6)}</div>
          <a href={`https://maps.google.com/?q=${challan.lat},${challan.lng}`} target="_blank" rel="noreferrer"
            style={{ fontSize:13, color:T.blue, fontWeight:600 }}>🗺️ Open in Google Maps →</a>
        </Card>
      )}
    </div>
  );
}
