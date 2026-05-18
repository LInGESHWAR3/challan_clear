import T from '../../utils/theme';

export default function Card({ children, style={}, onClick, hoverable=false }) {
  return (
    <div onClick={onClick}
      style={{ background:T.s2, border:`1px solid ${T.bd}`, borderRadius:12, padding:20,
        cursor:onClick?'pointer':'default', transition:hoverable?'all 0.2s':'none', ...style }}
      onMouseEnter={e=>{ if(hoverable){e.currentTarget.style.borderColor=T.amber;e.currentTarget.style.background=T.s3;}}}
      onMouseLeave={e=>{ if(hoverable){e.currentTarget.style.borderColor=T.bd;e.currentTarget.style.background=T.s2;}}}
    >{children}</div>
  );
}

export function Sep() {
  return <div style={{ height:1, background:T.bd, margin:'14px 0' }} />;
}

export function Lbl({ l, v }) {
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ fontSize:11, color:T.txt3, textTransform:'uppercase', letterSpacing:'.05em', marginBottom:2 }}>{l}</div>
      <div style={{ color:T.txt, fontSize:14, fontWeight:600 }}>{v||'—'}</div>
    </div>
  );
}
