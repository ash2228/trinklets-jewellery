'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { AnimatePresence, motion } from 'motion/react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-xl bg-neutral-900 border border-neutral-800 text-neutral-100"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-amber-400" />}
              {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-400" />}
              {toast.type === 'info' && <Info className="h-5 w-5 text-blue-400" />}
            </div>
            
            <div className="flex-1 text-sm font-sans tracking-wide">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="mt-0.5 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
