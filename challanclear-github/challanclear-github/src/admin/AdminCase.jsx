import { useState } from 'react';
import T from '../utils/theme';
import { Btn, Inp, Card, Badge, Sep, Lbl } from '../components/ui';
import AIBox from '../components/ui/AIBox';
import { fmtDate } from '../utils/helpers';

export default function AdminCase({ challan, onVerdict, onBack }) {
  const [note,   setNote]   = useState(challan.note || '');
  const [busy,   setBusy]   = useState(false);

  const decide = (verdict) => {
    if (verdict === 'rejected' && !note.trim()) {
      alert('Please add an officer note explaining the rejection reason.');
      return;
    }
    setBusy(true);
    setTimeout(() => {
      onVerdict(challan.id, verdict, note);
      setBusy(false);
    }, 500);
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: T.txt2, cursor: 'pointer', fontSize: 13, fontWeight: 700, padding: '0 0 16px 0' }}
      >
        ← Back to Dashboard
      </button>

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: T.txt }}>{challan.offense}</div>
        <Badge status={challan.status} verdict={challan.verdict} />
      </div>

      {/* Top grid: challan info + evidence/location */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* Challan details */}
        <Card>
          <div style={{ fontWeight: 700, color: T.txt2, marginBottom: 14, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Challan Details
          </div>
          <Lbl l="ID"           v={challan.id} />
          <Lbl l="Vehicle"      v={challan.vehicle} />
          <Lbl l="Date & Time"  v={`${fmtDate(challan.date)} at ${challan.time}`} />
          <Lbl l="Location"     v={challan.loc} />
          <Lbl l="Fine Amount"  v={`₹${challan.fine}`} />
          {challan.caseId  && <Lbl l="Case ID"      v={challan.caseId} />}
          {challan.filedOn && <Lbl l="Dispute Filed" v={fmtDate(challan.filedOn)} />}
        </Card>

        {/* Evidence + GPS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Image evidence */}
          {challan.evB64 && challan.evMime?.startsWith('image/') && (
            <Card>
              <div style={{ fontWeight: 700, color: T.txt, marginBottom: 10, fontSize: 13 }}>
                📷 Submitted Evidence
              </div>
              <img
                src={`data:${challan.evMime};base64,${challan.evB64}`}
                alt="Evidence"
                style={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 8, background: '#000' }}
              />
              <div style={{ fontSize: 11, color: T.txt3, marginTop: 6 }}>{challan.evName}</div>
            </Card>
          )}

          {/* Video evidence */}
          {challan.evName && !challan.evMime?.startsWith('image/') && (
            <Card>
              <div style={{ fontWeight: 700, color: T.txt, marginBottom: 8, fontSize: 13 }}>🎥 Video Evidence</div>
              <div style={{ fontSize: 13, color: T.txt2 }}>{challan.evName}</div>
              <div style={{ fontSize: 12, color: T.txt3, marginTop: 4 }}>Review video offline from case file</div>
            </Card>
          )}

          {/* GPS location */}
          {challan.lat && (
            <Card>
              <div style={{ fontWeight: 700, color: T.txt, marginBottom: 8, fontSize: 13 }}>📍 Citizen GPS Location</div>
              <div style={{ fontSize: 13, color: T.txt2, marginBottom: 4 }}>{challan.geo}</div>
              <div style={{ fontSize: 11, color: T.txt3, fontFamily: 'monospace', marginBottom: 8 }}>
                Lat: {challan.lat?.toFixed(5)} · Lng: {challan.lng?.toFixed(5)}
              </div>
              <a
                href={`https://maps.google.com/?q=${challan.lat},${challan.lng}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 12, color: T.blue, fontWeight: 600 }}
              >
                🗺️ Open in Google Maps →
              </a>
            </Card>
          )}
        </div>
      </div>

      {/* Citizen statement */}
      {challan.statement && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: T.txt, marginBottom: 8, fontSize: 13 }}>💬 Citizen's Statement</div>
          <div style={{ color: T.txt2, fontSize: 14, lineHeight: 1.65, fontStyle: 'italic' }}>
            "{challan.statement}"
          </div>
        </Card>
      )}

      {/* AI analysis */}
      {challan.ai && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: T.txt, marginBottom: 12, fontSize: 13 }}>🤖 AI Analysis Report</div>
          <AIBox ai={challan.ai} />
        </Card>
      )}

      {/* Verdict panel */}
      {challan.status !== 'resolved' ? (
        <Card style={{ border: `1px solid ${T.amber}44` }}>
          <div style={{ fontWeight: 700, color: T.txt, marginBottom: 12, fontSize: 15 }}>⚖️ Deliver Verdict</div>
          <Inp
            label="Officer Notes (required for rejection)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Explain your decision. E.g. Evidence verified with local traffic control — temporary parking was permitted on this date."
            rows={3}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Btn variant="green" full onClick={() => decide('approved')} loading={busy}>
              ✓ Approve Dispute
            </Btn>
            <Btn variant="red" full onClick={() => decide('rejected')} loading={busy}>
              ✗ Reject Dispute
            </Btn>
          </div>
        </Card>
      ) : (
        <Card style={{ border: `1px solid ${challan.verdict === 'approved' ? T.green : T.red}44`, textAlign: 'center', padding: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>
            {challan.verdict === 'approved' ? '✅' : '❌'}
          </div>
          <div style={{ fontWeight: 800, fontSize: 20, color: challan.verdict === 'approved' ? T.green : T.red }}>
            Dispute {challan.verdict?.toUpperCase()}
          </div>
          {challan.note && (
            <div style={{ color: T.txt2, fontSize: 14, marginTop: 10, fontStyle: 'italic' }}>
              "{challan.note}"
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
