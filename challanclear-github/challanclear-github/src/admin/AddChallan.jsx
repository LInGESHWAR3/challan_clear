import { useState } from 'react';
import T from '../utils/theme';
import { Btn, Inp, Card } from '../components/ui';
import { OFFENSES, today, genId } from '../utils/helpers';

export default function AddChallan({ onAdd, onBack }) {
  const [form, setForm] = useState({
    vehicle: '',
    offense: '',
    date:    today(),
    time:    '12:00 PM',
    loc:     '',
    fine:    '',
    note:    '',
  });

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const isValid =
    form.vehicle.trim() &&
    form.offense &&
    form.date &&
    form.loc.trim() &&
    parseInt(form.fine) > 0;

  const handleAdd = () => {
    const challan = {
      id:        genId(),
      vehicle:   form.vehicle.trim().toUpperCase().replace(/\s/g, ''),
      offense:   form.offense,
      date:      form.date,
      time:      form.time || '12:00 PM',
      loc:       form.loc.trim(),
      fine:      parseInt(form.fine),
      status:    'pending',
      verdict:   null,
      caseId:    null,
      filedOn:   null,
      evB64:     null,
      evMime:    null,
      evName:    null,
      lat:       null,
      lng:       null,
      geo:       null,
      statement: '',
      ai:        null,
      note:      form.note.trim(),
    };
    onAdd(challan);
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: T.txt2, cursor: 'pointer', fontSize: 13, fontWeight: 700, padding: '0 0 16px 0' }}
      >
        ← Back to Dashboard
      </button>

      <div style={{ fontWeight: 800, fontSize: 22, color: T.txt, marginBottom: 4 }}>Add New Challan</div>
      <div style={{ color: T.txt2, fontSize: 14, marginBottom: 24 }}>
        Create a new traffic violation record in the system
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Left column */}
        <Card>
          <div style={{ fontWeight: 700, color: T.txt2, marginBottom: 14, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Vehicle & Violation
          </div>
          <Inp
            label="Vehicle Registration"
            value={form.vehicle}
            onChange={set('vehicle')}
            placeholder="e.g. MH12AB1234"
            required
          />
          <Inp
            label="Offense Type"
            value={form.offense}
            onChange={set('offense')}
            options={OFFENSES}
            required
          />
          <Inp
            label="Fine Amount (₹)"
            value={form.fine}
            onChange={set('fine')}
            placeholder="e.g. 1000"
            type="number"
            required
          />
        </Card>

        {/* Right column */}
        <Card>
          <div style={{ fontWeight: 700, color: T.txt2, marginBottom: 14, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Date, Time & Location
          </div>
          <Inp
            label="Date"
            value={form.date}
            onChange={set('date')}
            type="date"
            required
          />
          <Inp
            label="Time"
            value={form.time}
            onChange={set('time')}
            placeholder="e.g. 10:30 AM"
          />
          <Inp
            label="Location"
            value={form.loc}
            onChange={set('loc')}
            placeholder="e.g. MG Road, Bangalore"
            required
          />
          <Inp
            label="Officer Notes (optional)"
            value={form.note}
            onChange={set('note')}
            placeholder="Additional details about the violation..."
          />
        </Card>
      </div>

      {/* Preview strip */}
      {isValid && (
        <div style={{ background: T.s3, border: `1px solid ${T.amber}44`, borderRadius: 10, padding: '12px 16px', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ fontWeight: 700, color: T.txt, fontSize: 14 }}>{form.offense}</div>
            <div style={{ color: T.txt2, fontSize: 12 }}>
              🚗 {form.vehicle.toUpperCase()} · 📅 {form.date} · 📍 {form.loc}
            </div>
          </div>
          <div style={{ fontWeight: 900, fontSize: 20, color: T.amber }}>₹{form.fine}</div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
        <Btn variant="ghost" onClick={onBack}>Cancel</Btn>
        <Btn variant="primary" onClick={handleAdd} disabled={!isValid}>
          Add Challan to System →
        </Btn>
      </div>
    </div>
  );
}
