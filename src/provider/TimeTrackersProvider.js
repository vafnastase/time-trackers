import { Fragment } from 'react';

export const TimeTrackersProvider = ({ children }) => {
  console.log('TimeTrackersProvider');
  return (
    <Fragment>
      {children}
    </Fragment>
  );
}