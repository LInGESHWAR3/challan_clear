import { useState } from 'react';
import T from '../../utils/theme';

export default function Inp({ label, value, onChange, placeholder, type='text', rows, required, options }) {
  const [focused, setFocused] = useState(false);
  const base = {
    background:T.s3, border:`1px solid ${focused?T.amber:T.bd}`,
    borderRadius:10, padding:'11px 13px', color:T.txt, fontSize:14,
    width:'100%', boxSizing:'border-box', outline:'none',
    transition:'border 0.2s', fontFamily:'inherit', resize:rows?'vertical':'none',
  };
  const labelStyle = {
    display:'block', color:T.txt2, fontSize:11, fontWeight:700,
    marginBottom:5, textTransform:'uppercase', letterSpacing:'.06em',
  };
  return (
    <div style={{ marginBottom:14 }}>
      {label && <label style={labelStyle}>{label}{required&&<span style={{color:T.red}}> *</span>}</label>}
      {options
        ? <select value={value} onChange={onChange} style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}>
            <option value="">Select...</option>
            {options.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        : rows
        ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} />
      }
    </div>
  );
}
