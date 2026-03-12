import React, { useState } from 'react';
import type { SddUiConfig } from '../config.ts';

interface Props {
  config: SddUiConfig;
}

function basename(p: string) {
  return p.split('/').pop() ?? p;
}

export function SpecPanel({ config }: Props) {
  const { screenshotPaths } = config;
  const [activeIdx, setActiveIdx] = useState(0);

  if (screenshotPaths.length === 0) {
    return (
      <div style={{ padding: '24px', color: '#444', fontSize: '13px', fontStyle: 'italic' }}>
        No screenshots configured.
      </div>
    );
  }

  const activePath = screenshotPaths[activeIdx] ?? screenshotPaths[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tab bar — only when multiple screenshots */}
      {screenshotPaths.length > 1 && (
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0',
          background: '#f0f0f0',
          flexShrink: 0,
          overflowX: 'auto',
        }}>
          {screenshotPaths.map((p, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  padding: '0 14px',
                  height: '32px',
                  fontSize: '12px',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#111' : '#999',
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? '2px solid #3b82f6' : '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.1s',
                  fontFamily: 'inherit',
                }}
              >
                {basename(p)}
              </button>
            );
          })}
        </div>
      )}

      {/* Screenshot */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: '#f5f5f5',
      }}>
        <img
          key={activePath}
          src={`/@fs${activePath}`}
          alt={basename(activePath)}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '6px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            border: '1px solid #e5e5e5',
          }}
        />
      </div>
    </div>
  );
}
