import T from '../../utils/theme';
import { Sep } from './Card';

export default function AIBox({ ai }) {
  if (!ai) return null;
  const col = ai.verdict==='SUPPORTS_DISPUTE'?T.green : ai.verdict==='REFUTES_DISPUTE'?T.red : T.amber;
  const rcol = ai.rec==='APPROVE_DISPUTE'?T.green : ai.rec==='REJECT_DISPUTE'?T.red : T.amber;
  const icon = ai.verdict==='SUPPORTS_DISPUTE'?'🟢' : ai.verdict==='REFUTES_DISPUTE'?'🔴':'🟡';
  return (
    <div style={{ background:T.s3, border:`1px solid ${col}44`, borderRadius:12, padding:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12, flexWrap:'wrap' }}>
        <span style={{ fontSize:20 }}>{icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:800, color:col, fontSize:14 }}>{ai.verdict?.replace(/_/g,' ')}</div>
          <div style={{ fontSize:12, color:T.txt2 }}>Confidence: {ai.conf}%</div>
          <div style={{ height:5, background:T.bd, borderRadius:99, overflow:'hidden', marginTop:5, width:120 }}>
            <div style={{ width:`${ai.conf}%`, height:'100%', background:col, borderRadius:99 }} />
          </div>
        </div>
        <span style={{ background:rcol+'22', color:rcol, padding:'5px 12px', borderRadius:99,
          fontSize:11, fontWeight:700, border:`1px solid ${rcol}44`, whiteSpace:'nowrap' }}>
          {ai.rec?.replace(/_/g,' ')}
        </span>
      </div>
      {ai.desc && <div style={{ fontSize:13, color:T.txt2, marginBottom:10, fontStyle:'italic' }}>"{ai.desc}"</div>}
      {(ai.obs||[]).map((o,i)=>(
        <div key={i} style={{ fontSize:13, color:T.txt, padding:'3px 0', display:'flex', gap:8 }}>
          <span style={{ color:col, flexShrink:0 }}>•</span>{o}
        </div>
      ))}
      <Sep />
      <div style={{ fontSize:13, color:T.txt2 }}>
        <strong style={{ color:T.txt }}>Officer Note: </strong>{ai.summary}
      </div>
    </div>
  );
}
