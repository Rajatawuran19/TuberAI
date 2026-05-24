import React from 'react';

export default function ActionCard({ title, description, icon }) {
  return (
    <div className="tonal-layer-1 p-4 rounded-lg flex items-start gap-4 mb-4">
      {icon && (
        <span className="material-symbols-outlined text-primary text-3xl">
          {icon}
        </span>
      )}
      <div>
        <h4 className="font-semibold text-lg text-on-surface">{title}</h4>
        <p className="text-on-surface-variant mt-1 text-sm">{description}</p>
      </div>
    </div>
  );
}
