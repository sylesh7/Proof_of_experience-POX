'use client';

import Script from 'next/script';

export function GoogleOAuthScript() {
  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
    />
  );
} 