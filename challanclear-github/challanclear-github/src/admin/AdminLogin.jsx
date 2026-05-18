import { useState } from 'react';
import T from '../utils/theme';
import { Btn, Inp, Card } from '../components/ui';
import { ADMIN_PW } from '../utils/helpers';

export default function AdminLogin({ onSuccess, onBack }) {
  const [pw,  setPw]  = useState('');
  const [err, setErr] = useState('');
  const attempt = () => { if(pw===ADMIN_PW) onSuccess(); else setErr('Incorrect password. Please try again.'); };
  return (
    <div style={{ maxWidth:400, margin:'60px auto', padding:'0 24px' }}>
      <button onClick={onBack} style={{ background:'none', border:'none', color:T.txt2, cursor:'pointer', fontSize:13, fontWeight:700, padding:'0 0 16px 0' }}>← Home</button>
      <Card style={{ padding:32, textAlign:'center' }}>
        <div style={{ fontSize:44, marginBottom:14 }}>🔐</div>
        <div style={{ fontWeight:800, fontSize:22, color:T.txt, marginBottom:4 }}>Admin Access</div>
        <div style={{ color:T.txt2, fontSize:13, marginBottom:26 }}>
          Password: <span style={{ fontFamily:'monospace', color:T.amber, fontWeight:700 }}>admin@123</span>
        </div>
        <Inp label="Admin Password" value={pw} onChange={e=>{setPw(e.target.value);setErr('');}} type="password" placeholder="Enter admin password"/>
        {err && <div style={{ color:T.red, fontSize:13, marginBottom:12 }}>❌ {err}</div>}
        <Btn variant="primary" full onClick={attempt} disabled={!pw}>Access Admin Portal →</Btn>
      </Card>
    </div>
  );
}
