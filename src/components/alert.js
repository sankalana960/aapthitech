"use client"
import React, { useEffect, useState } from 'react';

export function Alert({ text1, text2 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>{text1}</strong> {text2}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => setVisible(false)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
