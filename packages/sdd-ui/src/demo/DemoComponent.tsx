import React, { useState } from 'react';

const requests = [
  { id: 1, partner: 'Acme Corp', type: 'API Access', status: 'pending', date: '2025-03-10' },
  { id: 2, partner: 'Globex Inc', type: 'Data Export', status: 'approved', date: '2025-03-09' },
  { id: 3, partner: 'Initech', type: 'Webhook', status: 'rejected', date: '2025-03-08' },
  { id: 4, partner: 'Umbrella', type: 'OAuth App', status: 'pending', date: '2025-03-07' },
];

const statusColor: Record<string, string> = {
  pending: '#f59e0b',
  approved: '#10b981',
  rejected: '#ef4444',
};

export default function PartnerRequests() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '32px', background: '#f9fafb', minHeight: '100%' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
          Partner Requests
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
          {requests.length} requests total · {requests.filter(r => r.status === 'pending').length} pending
        </p>

        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {requests.map((r, i) => (
            <div
              key={r.id}
              onClick={() => setSelected(selected === r.id ? null : r.id)}
              style={{
                padding: '16px 20px',
                borderBottom: i < requests.length - 1 ? '1px solid #f3f4f6' : 'none',
                cursor: 'pointer',
                background: selected === r.id ? '#f0f7ff' : '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: '#e0e7ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700, color: '#4f46e5', flexShrink: 0,
              }}>
                {r.partner[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#111' }}>{r.partner}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{r.type} · {r.date}</div>
              </div>
              <span style={{
                fontSize: '11px', fontWeight: 600, padding: '2px 10px', borderRadius: '99px',
                background: statusColor[r.status] + '20',
                color: statusColor[r.status],
                textTransform: 'capitalize',
              }}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
