import React from 'react';

export function Card({ children, className = '' }) {
  return <div className={`bg-white dark:bg-gray-800 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 flex-1 overflow-auto ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-4 border-t ${className}`}>{children}</div>;
}
