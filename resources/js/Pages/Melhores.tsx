import AppLayout from '@/Layouts/AppLayout';
import React from 'react';

function Melhores() {
  return (
    <AppLayout
      title="Top 100 Angola"
      
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <div>Top 100 Talentos</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Melhores;
