import React from 'react';
import { getConfig } from './config.ts';
import { SpecPanel } from './panels/SpecPanel.tsx';
import { PreviewPanel } from './panels/PreviewPanel.tsx';

const config = getConfig();

export default function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#f0f0f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      {/* Top bar */}
      <div style={{
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        background: '#f0f0f0',
        borderBottom: '1px solid #ddd',
        flexShrink: 0,
        gap: '8px',
      }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>
          SDD UI
        </span>
        <span style={{ fontSize: '13px', color: '#999' }}>—</span>
        <span style={{ fontSize: '13px', color: '#555' }}>{config.componentName}</span>
      </div>

      {/* Panels */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Left — Spec */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, borderRight: '1px solid #ddd' }}>
          <PanelHeader label="Spec" />
          <div style={{ flex: 1, overflow: 'auto', background: '#fafafa' }}>
            <SpecPanel config={config} />
          </div>
        </div>

        {/* Right — Preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <PanelHeader label="Preview" />
          <div style={{ flex: 1, overflow: 'auto', background: '#f5f5f5', padding: '24px' }}>
            <div style={{
              background: '#fff',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              minHeight: '200px',
            }}>
              <PreviewPanel config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelHeader({ label }: { label: string }) {
  return (
    <div style={{
      height: '34px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 14px',
      background: '#f0f0f0',
      borderBottom: '1px solid #ddd',
      flexShrink: 0,
    }}>
      <span style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: '#999',
      }}>
        {label}
      </span>
    </div>
  );
}
