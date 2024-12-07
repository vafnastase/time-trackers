import { createContext, Fragment, useContext, useState } from 'react';
import NewTracker from '../models/Tracker.js';

export const TimeTrackersContext = createContext({
  trackers: [],
});

export const useTimeTrackers = () => useContext(TimeTrackersContext);

export const TimeTrackersProvider = ({ children }) => {
  const [trackers, setTrackers] = useState([]);
  
  const addTracker = () => {
    const tracker = NewTracker;
    setTrackers((prev) => {
      return [...prev, tracker];
    });
  }
  
  const context = {
    trackers,
    addTracker,
  };
  
  return (
    <TimeTrackersContext.Provider value={context}>
      {children}
    </TimeTrackersContext.Provider>
  );
}