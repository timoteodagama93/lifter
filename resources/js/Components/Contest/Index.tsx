import React, { useEffect, useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import SectionBorder from '@/Components/SectionBorder';
import ContestInfo from './ContestInfo';
import ContestSchedule from './ContestSchedule';
import ContestWinners from './ContestWinners';

export default function NewContest({ contest = null }) {
  const [contestId, setContestId] = useState('');
  const page = useTypedPage();

  
  useEffect(() => {
    contest != null ? setContestId(contest.id) : '';
    console.log('CONTEST: ');
    console.log(contest);
  }, [contest]);

  return (
    <div>
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <div>
          <ContestInfo setContestId={setContestId} />

          <SectionBorder />
        </div>

        <div className="mt-10 sm:mt-0">
          <ContestSchedule contestId={contestId} />

          <SectionBorder />
        </div>

        <div className="mt-10 sm:mt-0">
          <ContestWinners contestId={contestId} />
        </div>
      </div>
    </div>
  );
}
