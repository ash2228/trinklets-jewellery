'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-brand-cream">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gold-50 text-gold-600">
            <svg className="h-6 w-6 animate-spin text-gold-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.25em] text-neutral-900">TRINKLETS</span>
            <span className="text-[9px] uppercase tracking-[0.5em] text-gold-600 mt-1 pl-1">JEWELLERY</span>
          </div>
        </div>

        <p className="text-sm text-neutral-600">Loading, please wait...</p>
      </div>
    </div>
  );
}
