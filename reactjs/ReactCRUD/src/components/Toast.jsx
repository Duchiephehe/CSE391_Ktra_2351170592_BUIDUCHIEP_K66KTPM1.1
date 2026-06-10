import React, { useEffect, useState } from 'react';

function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 350);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
  };

  const colors = {
    success: { bg: '#22c55e', light: '#dcfce7', text: '#166534' },
    error:   { bg: '#ef4444', light: '#fee2e2', text: '#991b1b' },
    warning: { bg: '#f59e0b', light: '#fef3c7', text: '#92400e' },
  };

  const c = colors[type] || colors.success;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#fff',
        border: `1.5px solid ${c.bg}`,
        borderLeft: `5px solid ${c.bg}`,
        borderRadius: '10px',
        padding: '14px 20px',
        minWidth: '280px',
        maxWidth: '360px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s ease',
      }}
      role="alert"
    >
      <span
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: c.light,
          color: c.text,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '16px',
          flexShrink: 0,
        }}
      >
        {icons[type]}
      </span>

      <span style={{ fontSize: '14px', color: '#1e293b', fontWeight: 500, flex: 1 }}>
        {message}
      </span>

      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 350);
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#94a3b8',
          fontSize: '18px',
          lineHeight: 1,
          padding: '0 2px',
          flexShrink: 0,
        }}
        aria-label="Đóng thông báo"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
