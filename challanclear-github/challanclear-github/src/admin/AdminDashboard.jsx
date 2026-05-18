import T from '../utils/theme';
import { Btn, Badge, Card } from '../components/ui';
import { fmtDate } from '../utils/helpers';
import { useState } from 'react';

const FILTERS = [
  { key: 'all',      label: 'Total Cases',   color: T.txt  },
  { key: 'pending',  label: 'Pending',        color: T.txt2 },
  { key: 'disputed', label: 'Under Review',   color: T.amber },
  { key: 'resolved', label: 'Resolved',       color: T.green },
];

export default function AdminDashboard({ challans, onCase, onAdd }) {
  const [filter, setFilter] = useState('all');

  const counts = {
    all:      challans.length,
    pending:  challans.filter((c) => c.status === 'pending').length,
    disputed: challans.filter((c) => c.status === 'disputed').length,
    resolved: challans.filter((c) => c.status === 'resolved').length,
  };

  const filtered =
    filter === 'all' ? challans : challans.filter((c) => c.status === filter);

  return (
    <div>
      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {FILTERS.map((f) => (
          <div
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              background:   filter === f.key ? T.amber + '22' : T.s2,
              border:       `1px solid ${filter === f.key ? T.amber : T.bd}`,
              borderRadius: 12,
              padding:      16,
              cursor:       'pointer',
              transition:   'all 0.2s',
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 900, color: f.color }}>
              {counts[f.key]}
            </div>
            <div style={{ fontSize: 11, color: T.txt2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 2 }}>
              {f.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ fontWeight: 700, color: T.txt, fontSize: 16 }}>
          {filtered.length} Case{filtered.length !== 1 ? 's' : ''}
          {filter !== 'all' && (
            <span style={{ color: T.txt3, fontWeight: 400, fontSize: 14 }}> — {filter}</span>
          )}
        </div>
        <Btn variant="primary" sm onClick={onAdd}>+ Add New Challan</Btn>
      </div>

      {/* ── Empty ── */}
      {filtered.length === 0 && (
        <Card style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📭</div>
          <div style={{ color: T.txt2 }}>No cases found for this filter.</div>
        </Card>
      )}

      {/* ── Case Rows ── */}
      {filtered.map((c) => (
        <div
          key={c.id}
          onClick={() => onCase(c)}
          style={{
            background:   T.s2,
            border:       `1px solid ${T.bd}`,
            borderRadius: 12,
            padding:      16,
            marginBottom: 10,
            cursor:       'pointer',
            transition:   'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.amber;
            e.currentTarget.style.background  = T.s3;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = T.bd;
            e.currentTarget.style.background  = T.s2;
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {/* Left info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 800, color: T.txt, fontSize: 14 }}>{c.offense}</div>
                <Badge status={c.status} verdict={c.verdict} />
                {c.ai && (
                  <span style={{ fontSize: 11, color: T.purple, background: T.purple + '22', padding: '2px 8px', borderRadius: 99, border: `1px solid ${T.purple}44` }}>
                    🤖 AI Analyzed
                  </span>
                )}
                {c.evName && (
                  <span style={{ fontSize: 11, color: T.blue, background: T.blue + '22', padding: '2px 8px', borderRadius: 99, border: `1px solid ${T.blue}44` }}>
                    📁 Evidence
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, color: T.txt2, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <span>🚗 {c.vehicle}</span>
                <span>📅 {fmtDate(c.date)}</span>
                <span>📍 {c.loc}</span>
                {c.caseId && (
                  <span style={{ fontFamily: 'monospace', color: T.txt3 }}>{c.caseId}</span>
                )}
              </div>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 18, color: T.txt }}>₹{c.fine}</div>
              <span style={{ color: T.txt3, fontSize: 18 }}>→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
