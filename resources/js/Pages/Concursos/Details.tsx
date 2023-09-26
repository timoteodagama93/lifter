import ContestDetails from '@/Components/Contest/ContestDetails';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';

export default function Details({ contest }) {
  return (
    <AppLayout title="Detalhes concurso">
      <ContestDetails concurso={contest} />
    </AppLayout>
  );
}
