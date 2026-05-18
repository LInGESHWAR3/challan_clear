import { useState } from 'react';
import T from '../../utils/theme';

const VARIANTS = {
  primary:{ bg:T.amber,  text:'#000' },
  green:  { bg:T.green,  text:'#fff' },
  red:    { bg:T.red,    text:'#fff' },
  blue:   { bg:T.blue,   text:'#fff' },
  ghost:  { bg:'transparent', text:T.txt2 },
  dark:   { bg:T.s3,     text:T.txt2 },
};

export default function Btn({ children, onClick, variant='primary', disabled=false, loading=false, full=false, sm=false }) {
  const [hov, setHov] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:  disabled ? T.s3 : hov && variant !== 'ghost' ? v.bg + 'cc' : v.bg,
        color:       disabled ? T.txt3 : v.text,
        border:      variant === 'ghost' ? `1px solid ${T.bd2}` : 'none',
        padding:     sm ? '8px 14px' : '11px 22px',
        borderRadius:10, fontWeight:700, fontSize:sm?13:14,
        letterSpacing:'-0.01em', lineHeight:1,
        cursor:      disabled || loading ? 'not-allowed' : 'pointer',
        width:       full ? '100%' : 'auto',
        display:     'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
        transition:  'all 0.15s', opacity: loading ? 0.75 : 1,
      }}
    >
      {loading && (
        <span style={{ width:13, height:13, border:'2px solid rgba(255,255,255,.3)',
          borderTopColor:'rgba(255,255,255,.9)', borderRadius:'50%',
          display:'inline-block', animation:'ccspin 0.7s linear infinite' }} />
      )}
      {children}
    </button>
  );
}
