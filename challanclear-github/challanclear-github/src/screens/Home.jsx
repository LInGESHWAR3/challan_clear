import T from '../utils/theme';
import { Btn } from '../components/ui';

const STEPS = [
  { n:'01', icon:'🔍', title:'Look Up Challan',  desc:'Enter vehicle registration number' },
  { n:'02', icon:'📸', title:'Upload Evidence',   desc:'Photos, videos & GPS location' },
  { n:'03', icon:'🤖', title:'AI Analysis',       desc:'Real-time evidence verdict' },
  { n:'04', icon:'⚖️', title:'Get Decision',      desc:'Transparent officer verdict' },
];

export default function Home({ onCitizen, onAdmin }) {
  return (
    <div style={{ padding:'48px 24px', maxWidth:860, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:56 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:20,
          padding:'10px 20px', background:T.s2, borderRadius:99, border:`1px solid ${T.bd}` }}>
          <span style={{ fontSize:22 }}>🛡️</span>
          <span style={{ fontSize:22, fontWeight:900, color:T.txt, letterSpacing:'-.03em' }}>
            Challan<span style={{ color:T.amber }}>Clear</span>
          </span>
        </div>
        <h1 style={{ fontSize:'clamp(26px,5vw,46px)', fontWeight:900, color:T.txt,
          margin:'0 0 16px', letterSpacing:'-.03em', lineHeight:1.1 }}>
          AI-Powered Traffic Fine<br/>Dispute Resolution
        </h1>
        <p style={{ color:T.txt2, fontSize:16, maxWidth:500, margin:'0 auto 28px', lineHeight:1.65 }}>
          Upload photo/video evidence, capture GPS location, and get an instant AI verdict.
          Transparent, fast, and fair.
        </p>
        <div style={{ display:'inline-flex', gap:8, background:T.s2, padding:8,
          borderRadius:12, border:`1px solid ${T.bd}`, flexWrap:'wrap', justifyContent:'center' }}>
          <span style={{ fontSize:12, color:T.txt3, padding:'5px 6px' }}>Try:</span>
          {['MH12AB1234','KA01CD5678','DL08EF9012','TN22GH3456'].map(v=>(
            <span key={v} style={{ fontSize:11, color:T.amber, background:T.amber+'15',
              padding:'4px 10px', borderRadius:8, fontFamily:'monospace', fontWeight:700 }}>{v}</span>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, maxWidth:680, margin:'0 auto 52px' }}>
        {[
          { icon:'👤', title:'Citizen Portal', desc:'Look up challans, file disputes with evidence and GPS, track case status in real time.', v:'primary', label:'Enter as Citizen →', fn:onCitizen, accent:T.amber },
          { icon:'🏛️', title:'Admin Portal',   desc:'Review disputes, view AI analysis, deliver verdicts, and add new challans.',            v:'dark',    label:'Enter as Admin →',   fn:onAdmin,  accent:T.blue  },
        ].map(p=>(
          <div key={p.title} onClick={p.fn}
            style={{ background:T.s2, border:`2px solid ${T.bd}`, borderRadius:16, padding:32,
              cursor:'pointer', textAlign:'center', transition:'all 0.2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=p.accent; e.currentTarget.style.background=T.s3; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.bd;     e.currentTarget.style.background=T.s2; }}>
            <div style={{ fontSize:44, marginBottom:16 }}>{p.icon}</div>
            <div style={{ fontWeight:800, fontSize:20, color:T.txt, marginBottom:10 }}>{p.title}</div>
            <div style={{ color:T.txt2, fontSize:14, lineHeight:1.55, marginBottom:20 }}>{p.desc}</div>
            <Btn variant={p.v}>{p.label}</Btn>
          </div>
        ))}
      </div>

      <div style={{ borderTop:`1px solid ${T.bd}`, paddingTop:36 }}>
        <div style={{ textAlign:'center', color:T.txt3, fontSize:11, fontWeight:700,
          letterSpacing:'.1em', textTransform:'uppercase', marginBottom:24 }}>How It Works</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {STEPS.map(s=>(
            <div key={s.n} style={{ textAlign:'center' }}>
              <div style={{ fontSize:26, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:11, color:T.amber, fontWeight:700, marginBottom:4, letterSpacing:'.04em' }}>{s.n}</div>
              <div style={{ fontWeight:700, color:T.txt, fontSize:13, marginBottom:3 }}>{s.title}</div>
              <div style={{ color:T.txt3, fontSize:12 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
