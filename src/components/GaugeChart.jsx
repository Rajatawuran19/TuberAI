import React from 'react';

export default function GaugeChart({ percentage, category }) {
  // Determine color based on category
  let colorClass = "text-primary";
  if (category === 'Medium') colorClass = "text-tertiary";
  if (category === 'High') colorClass = "text-error";

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-xl">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-surface-variant stroke-current"
            strokeWidth="3"
            strokeDasharray="100, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
          />
          <path
            className={`${colorClass} stroke-current`}
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>
      <h3 className={`mt-4 text-xl font-semibold ${colorClass}`}>{category} Risk</h3>
    </div>
  );
}
