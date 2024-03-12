'use client';

import { getTimeDifferenceInMinutes } from '@/utils/utils';
import { TimeIcon } from 'clada-storybook';
import React, { useState, useEffect } from 'react';

export const TimeDiff = ({
  postId,
  text,
}: {
  postId: string;
  text?: string;
}) => {
  const [timeDiff, setTimeDiff] = useState('');

  useEffect(() => {
    const updateTimeDiff = () => {
      const minutes = getTimeDifferenceInMinutes(postId);
      let formattedTimeDiff = '';

      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (years > 0) {
        formattedTimeDiff = `${years} ${years === 1 ? 'Jahr' : 'Jahren'}`;
      } else if (months > 0) {
        formattedTimeDiff = `${months} ${months === 1 ? 'Monat' : 'Monaten'}`;
      } else if (days > 0) {
        formattedTimeDiff = `${days} ${days === 1 ? 'Tag' : 'Tagen'}`;
      } else if (hours > 0) {
        formattedTimeDiff = `${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
      } else if (minutes > 0) {
        formattedTimeDiff = `${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
      } else {
        formattedTimeDiff = 'Gerade jetzt';
      }

      setTimeDiff(formattedTimeDiff);
    };

    updateTimeDiff();

    const intervalId = setInterval(updateTimeDiff, 60000);

    return () => clearInterval(intervalId);
  }, [postId]);

  return (
    <div>
      {timeDiff && (
        <div className='flex'>
          <TimeIcon color='base'></TimeIcon>
          <span className='pl-xxs pr-xxs text-base-400 mb-font-label-s'>
            {(text ? text : 'vor ') + timeDiff}
          </span>
        </div>
      )}
    </div>
  );
};