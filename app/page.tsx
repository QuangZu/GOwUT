'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main dashboard after component mounts
    router.push('/main/dashboard');
  }, [router]);

  // Simple loading indicator while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-foreground font-bold text-xl">GW</span>
        </div>
        <p className="text-foreground text-lg">Redirecting...</p>
      </div>
    </div>
  );
}