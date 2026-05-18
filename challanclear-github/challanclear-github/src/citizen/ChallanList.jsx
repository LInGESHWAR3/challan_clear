import T from '../utils/theme';
import { Btn, Badge, Card } from '../components/ui';
import { fmtDate } from '../utils/helpers';

export default function ChallanList({ challans, vehicle, onDispute, onTrack, onReset }) {
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
        <div>
          <div style={{ fontWeight:800, fontSize:20, color:T.txt }}>
            Challans for <span style={{ color:T.amber, fontFamily:'monospace' }}>{vehicle.toUpperCase()}</span>
          </div>
          <div style={{ color:T.txt2, fontSize:13, marginTop:2 }}>{challans.length} record{challans.length!==1?'s':''} found</div>
        </div>
        <Btn variant="ghost" sm onClick={onReset}>Search Again</Btn>
      </div>

      {challans.length===0 && (
        <Card style={{ textAlign:'center', padding:48 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
          <div style={{ fontWeight:700, fontSize:18, color:T.txt, marginBottom:6 }}>No Challans Found</div>
          <div style={{ color:T.txt2, fontSize:14 }}>No traffic violations found for this vehicle number.</div>
        </Card>
      )}

      {challans.map(c=>(
        <Card key={c.id} style={{ marginBottom:12 }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                <div style={{ fontWeight:800, color:T.txt, fontSize:15 }}>{c.offense}</div>
                <Badge status={c.status} verdict={c.verdict} />
              </div>
              <div style={{ fontSize:13, color:T.txt2, display:'flex', flexWrap:'wrap', gap:14 }}>
                <span>📅 {fmtDate(c.date)} at {c.time}</span>
                <span>📍 {c.loc}</span>
              </div>
              {c.caseId && <div style={{ fontSize:12, color:T.txt3, marginTop:4, fontFamily:'monospace' }}>Case: {c.caseId}</div>}
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontWeight:900, fontSize:22, color:c.status==='resolved'&&c.verdict==='approved'?T.green:T.txt }}>₹{c.fine}</div>
              <div style={{ marginTop:8 }}>
                {c.status==='pending'  && <Btn variant="primary" sm onClick={()=>onDispute(c)}>File Dispute</Btn>}
                {(c.status==='disputed'||c.status==='resolved') && <Btn variant="ghost" sm onClick={()=>onTrack(c)}>Track Case</Btn>}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
