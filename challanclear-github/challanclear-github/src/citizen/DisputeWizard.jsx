import { useState, useRef } from 'react';
import T from '../utils/theme';
import { Btn, Inp, Card, Sep, Lbl } from '../components/ui';
import AIBox from '../components/ui/AIBox';
import { analyzeEvidence, reverseGeocode } from '../utils/api';
import { fmtDate, genCase, today } from '../utils/helpers';

const STEPS = ['Confirm Details','Upload Evidence','Capture Location','Your Statement','AI Analysis'];

export default function DisputeWizard({ challan, onSubmit, onBack }) {
  const [step,      setStep]      = useState(1);
  const [ev,        setEv]        = useState(null);
  const [loc,       setLoc]       = useState({ lat:null, lng:null, geo:null });
  const [locating,  setLocating]  = useState(false);
  const [statement, setStatement] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiRes,     setAiRes]     = useState(null);
  const fileRef = useRef(null);

  const handleFile = e => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target.result;
      setEv({ b64:dataUrl.split(',')[1], mime:f.type, name:f.name,
        preview:f.type.startsWith('image/')?dataUrl:null,
        isVid:f.type.startsWith('video/'), size:f.size });
    };
    reader.readAsDataURL(f);
  };

  const captureLoc = () => {
    setLocating(true);
    if (!navigator.geolocation) { alert('Geolocation not supported'); setLocating(false); return; }
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude:lat, longitude:lng } = pos.coords;
        const geo = await reverseGeocode(lat, lng);
        setLoc({ lat, lng, geo }); setLocating(false);
      },
      () => {
        const lat = 18.52+(Math.random()-.5)*.1, lng = 73.86+(Math.random()-.5)*.1;
        setLoc({ lat, lng, geo:`Simulated: ${lat.toFixed(5)}N, ${lng.toFixed(5)}E (Demo mode)` });
        setLocating(false);
      },
      { timeout:8000 }
    );
  };

  const runAI = async () => {
    if (!ev?.b64 || !ev?.mime?.startsWith('image/')) {
      setAiRes({ desc:'Non-image evidence submitted.', verdict:'INCONCLUSIVE', conf:0,
        obs:['AI requires image files.','Video will be reviewed manually.'],
        rec:'NEEDS_REVIEW', summary:'Manual review required for non-image evidence.' });
      return;
    }
    setAnalyzing(true);
    const result = await analyzeEvidence(ev.b64, ev.mime, challan, statement);
    setAiRes(result); setAnalyzing(false);
  };

  const goNext = async () => {
    if (step===4 && !aiRes) await runAI();
    if (step < 5) setStep(s => s+1);
  };

  const canNext = () => {
    if (step===2) return !!ev;
    if (step===3) return !locating;
    if (step===4) return statement.trim().length > 10;
    if (step===5) return !analyzing && !!aiRes;
    return true;
  };

  const submit = () => onSubmit({
    status:'disputed', caseId:genCase(), filedOn:today(),
    evB64:ev?.b64||null, evMime:ev?.mime||null, evName:ev?.name||null,
    lat:loc.lat, lng:loc.lng, geo:loc.geo, statement, ai:aiRes,
  });

  return (
    <div>
      <button onClick={onBack} style={{ background:'none', border:'none', color:T.txt2,
        cursor:'pointer', fontSize:13, fontWeight:700, padding:'0 0 16px 0' }}>← Back to Challans</button>

      <div style={{ marginBottom:24 }}>
        <div style={{ display:'flex', gap:4, marginBottom:10 }}>
          {STEPS.map((_,i)=><div key={i} style={{ flex:1, height:3, borderRadius:99,
            background:i<step?T.amber:T.bd, transition:'background 0.3s' }}/>)}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontWeight:800, fontSize:18, color:T.txt }}>{STEPS[step-1]}</div>
          <div style={{ color:T.txt2, fontSize:13, fontWeight:600 }}>Step {step} / {STEPS.length}</div>
        </div>
      </div>

      <div style={{ background:T.s3, border:`1px solid ${T.amber}44`, borderRadius:10,
        padding:'12px 16px', marginBottom:18,
        display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
        <div>
          <div style={{ fontWeight:700, color:T.txt, fontSize:14 }}>{challan.offense}</div>
          <div style={{ color:T.txt2, fontSize:12 }}>📅 {fmtDate(challan.date)} · 📍 {challan.loc} · ID: {challan.id}</div>
        </div>
        <div style={{ fontWeight:900, fontSize:20, color:T.amber }}>₹{challan.fine}</div>
      </div>

      <Card>
        {step===1 && (
          <div>
            <div style={{ fontWeight:700, color:T.txt, marginBottom:16 }}>Confirm challan details before proceeding:</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              <Lbl l="Challan ID"  v={challan.id}/>
              <Lbl l="Vehicle"     v={challan.vehicle}/>
              <Lbl l="Offense"     v={challan.offense}/>
              <Lbl l="Fine"        v={`₹${challan.fine}`}/>
              <Lbl l="Date & Time" v={`${fmtDate(challan.date)} at ${challan.time}`}/>
              <Lbl l="Location"    v={challan.loc}/>
            </div>
            <Sep/>
            <div style={{ background:T.amber+'11', border:`1px solid ${T.amber}33`,
              borderRadius:8, padding:12, fontSize:13, color:T.txt2 }}>
              ⚠️ You are filing a formal dispute. Have evidence ready and enable GPS for location capture.
            </div>
          </div>
        )}

        {step===2 && (
          <div>
            <div style={{ fontWeight:700, color:T.txt, marginBottom:4 }}>Upload Evidence</div>
            <div style={{ color:T.txt2, fontSize:13, marginBottom:18 }}>
              Upload photos or videos supporting your dispute (dashcam, speed readings, road signs, etc.)
            </div>
            {!ev ? (
              <div onClick={()=>fileRef.current?.click()}
                style={{ border:`2px dashed ${T.bd2}`, borderRadius:12, padding:44,
                  textAlign:'center', cursor:'pointer', transition:'border-color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=T.amber}
                onMouseLeave={e=>e.currentTarget.style.borderColor=T.bd2}>
                <div style={{ fontSize:36, marginBottom:10 }}>📁</div>
                <div style={{ fontWeight:700, color:T.txt, marginBottom:4 }}>Click to upload evidence</div>
                <div style={{ color:T.txt2, fontSize:13 }}>Images (JPG, PNG) · Videos (MP4, MOV)</div>
                <div style={{ color:T.amber, fontSize:12, marginTop:6, fontWeight:600 }}>AI will analyze image evidence</div>
                <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display:'none' }} onChange={handleFile}/>
              </div>
            ) : (
              <div>
                <div style={{ background:T.s3, borderRadius:12, padding:16, marginBottom:12 }}>
                  {ev.preview && <img src={ev.preview} alt="Evidence" style={{ width:'100%', maxHeight:260, objectFit:'contain', borderRadius:8, marginBottom:12, display:'block', background:'#000' }}/>}
                  {ev.isVid && <div style={{ textAlign:'center', padding:24, background:T.bd, borderRadius:8, marginBottom:12 }}>
                    <div style={{ fontSize:32, marginBottom:6 }}>🎥</div>
                    <div style={{ color:T.txt, fontWeight:700 }}>Video Evidence Attached</div>
                    <div style={{ color:T.txt2, fontSize:12, marginTop:4 }}>Video will be reviewed manually by an officer.</div>
                  </div>}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <div style={{ fontWeight:700, color:T.txt, fontSize:14 }}>{ev.name}</div>
                      <div style={{ color:T.txt2, fontSize:12 }}>{(ev.size/1024).toFixed(1)} KB · {ev.mime}</div>
                    </div>
                    <Btn variant="ghost" sm onClick={()=>setEv(null)}>Remove</Btn>
                  </div>
                </div>
                <Btn variant="ghost" sm full onClick={()=>fileRef.current?.click()}>Change File</Btn>
                <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display:'none' }} onChange={handleFile}/>
              </div>
            )}
          </div>
        )}

        {step===3 && (
          <div>
            <div style={{ fontWeight:700, color:T.txt, marginBottom:4 }}>Capture Your GPS Location</div>
            <div style={{ color:T.txt2, fontSize:13, marginBottom:20 }}>
              Your real-time GPS coordinates will be recorded as additional evidence.
            </div>
            {!loc.lat ? (
              <div style={{ textAlign:'center', padding:'32px 0' }}>
                <div style={{ fontSize:40, marginBottom:14 }}>📍</div>
                <Btn variant="primary" onClick={captureLoc} loading={locating}>
                  {locating?'Getting Location...':'📍 Capture My Location'}
                </Btn>
                <div style={{ color:T.txt3, fontSize:12, marginTop:12 }}>Allow browser location access when prompted</div>
              </div>
            ) : (
              <div style={{ background:T.s3, border:`1px solid ${T.green}44`, borderRadius:12, padding:18 }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                  <span style={{ fontSize:22 }}>✅</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:T.green, marginBottom:4 }}>Location Captured</div>
                    <div style={{ color:T.txt, fontSize:13, marginBottom:6 }}>{loc.geo}</div>
                    <div style={{ color:T.txt3, fontSize:11, fontFamily:'monospace' }}>Lat: {loc.lat?.toFixed(6)} · Lng: {loc.lng?.toFixed(6)}</div>
                  </div>
                </div>
                <div style={{ marginTop:12 }}>
                  <Btn variant="ghost" sm onClick={()=>setLoc({lat:null,lng:null,geo:null})}>Recapture</Btn>
                </div>
              </div>
            )}
          </div>
        )}

        {step===4 && (
          <div>
            <div style={{ fontWeight:700, color:T.txt, marginBottom:4 }}>Your Statement</div>
            <div style={{ color:T.txt2, fontSize:13, marginBottom:16 }}>
              Explain in detail why you are disputing this challan. Be specific and factual.
            </div>
            <Inp label="Statement" value={statement}
              onChange={e=>setStatement(e.target.value)}
              placeholder="E.g. I was driving within the speed limit. The speed camera at this location was recently reported as malfunctioning. I have dashcam footage showing my speedometer reading at the time..."
              rows={6} required/>
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <span style={{ color:statement.length<10?T.red:T.txt3, fontSize:12 }}>
                {statement.length} chars {statement.length<10?'(min 10)':''}
              </span>
            </div>
          </div>
        )}

        {step===5 && (
          <div>
            <div style={{ fontWeight:700, color:T.txt, marginBottom:4 }}>AI Evidence Analysis</div>
            <div style={{ color:T.txt2, fontSize:13, marginBottom:16 }}>Our AI has analyzed your submitted evidence.</div>
            {analyzing && (
              <div style={{ textAlign:'center', padding:44 }}>
                <div style={{ width:40, height:40, border:`3px solid ${T.amber}33`, borderTopColor:T.amber,
                  borderRadius:'50%', animation:'ccspin 0.8s linear infinite', margin:'0 auto 16px' }}/>
                <div style={{ color:T.txt2 }}>Analyzing evidence with Claude AI...</div>
              </div>
            )}
            {aiRes && !analyzing && (
              <div>
                <AIBox ai={aiRes}/>
                <Sep/>
                <div style={{ fontSize:13, color:T.txt2 }}>
                  <div style={{ fontWeight:700, color:T.txt, marginBottom:8 }}>Case Summary</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                    <div>📁 Evidence: {ev?.name||'None'}</div>
                    <div>📍 Location: {loc.lat?'Captured':'Not captured'}</div>
                    <div>📝 Statement: {statement.length} chars</div>
                    <div>🤖 AI Confidence: {aiRes.conf}%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      <div style={{ display:'flex', justifyContent:'space-between', marginTop:18, gap:12 }}>
        {step>1 ? <Btn variant="ghost" onClick={()=>setStep(s=>s-1)}>← Previous</Btn> : <div/>}
        {step<5
          ? <Btn variant="primary" onClick={goNext} disabled={!canNext()} loading={step===4&&analyzing}>
              {step===4?'Analyze with AI →':'Next →'}
            </Btn>
          : <Btn variant="green" onClick={submit} disabled={!aiRes}>✅ Submit Dispute</Btn>
        }
      </div>
    </div>
  );
}
