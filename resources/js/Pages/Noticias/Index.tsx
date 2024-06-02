import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import Noticias from './Noticias';
import Container from '@/Layouts/Container';

function Index() {
  return (
    <AppLayout title="Notícias">
      <Container>
        <Noticias />
      </Container>
    </AppLayout>
  );
}

export default Index;
