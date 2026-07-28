'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';

export default function ArchitecturePage() {
  return (
    <div className="space-y-6">
      <ArchitectureDiagram />
    </div>
  );
}
