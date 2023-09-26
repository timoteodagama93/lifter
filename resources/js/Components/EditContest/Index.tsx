import React, { useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import SectionBorder from '@/Components/SectionBorder';
import ContestInfo from './ContestInfo';
import ContestSchedule from './ContestSchedule';
import ContestWinners from './ContestWinners';

interface Props{
  contest: Object
}
export default function EditContest({ contest }:Props) {
  const page = useTypedPage();

  return (
    <div>
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <div>
          <ContestInfo  contest={contest} />

          <SectionBorder />
        </div>

        <div className="mt-10 sm:mt-0">
          <ContestSchedule contest={contest} />

          <SectionBorder />
        </div>

        <div className="mt-10 sm:mt-0">
          <ContestWinners contest={contest} />
        </div>
      </div>
    </div>
  );
}
