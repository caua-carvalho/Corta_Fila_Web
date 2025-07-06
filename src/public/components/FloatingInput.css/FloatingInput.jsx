import React from 'react';
import './FloatingInput.css';

export default function FloatingInput({ label, name, value, onChange, type = 'text', placeholder }) {
  return (
    <div className="floating-input">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        autoComplete="off"
        className="fi-input"
      />
      <label htmlFor={name} className="fi-label">
        {label}
      </label>
    </div>
  );
}
