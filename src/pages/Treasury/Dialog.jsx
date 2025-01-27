import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="relative">
          {children}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);