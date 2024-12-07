import { createContext, useContext, useEffect, useState } from 'react';
import NewTracker from '../models/Tracker.js';
import { v4 as uuidv4 } from 'uuid';

export const TimeTrackersContext = createContext({
  trackers: [],
  addTracker: () => {},
  onDone: () => {},
  onCancel: () => {},
  onPause: () => {},
  onStart: () => {},
  formatElapsedTime: () => {},
  onSaveDescription: () => {}
});

export const useTimeTrackers = () => useContext(TimeTrackersContext);

export const TimeTrackersProvider = ({ localStorageKey = "gnhub-trackers", children }) => {
  const [trackers, setTrackers] = useState([]);
  
  useEffect(() =>
  {
    const savedTrackers = JSON.parse(localStorage.getItem(localStorageKey));
    if (savedTrackers?.length > 0) {
      const timers = savedTrackers.map(t => {
        if (t.isRunning) {
          t.elapsedTime = Math.floor((new Date() - new Date(t.startDate)) / 1000);
        }
        
        return t;
      });
      
      setTrackers(timers);
    }
  }, []);
  
  const addTracker = (custom = null) => {
    const tracker = {...NewTracker, id: uuidv4(), custom};
    
    setTrackers((prevTrackers) => {
      return [...prevTrackers, tracker];
    });
  }
  
  const onDone = (id) => {
    setTrackers((prevTrackers) => {
      return prevTrackers.map(tracker => {
        if (tracker.id === id) {
          return {...tracker, isDone: true, endDate: new Date()};
        }
        return tracker;
      });
    });
  }
  
  const onPause = (id) => {
    setTrackers((prevTrackers) => {
      return prevTrackers.map(tracker => {
        if (tracker.id === id) {
          return {...tracker, isRunning: false, endDate: new Date()};
        }
        return tracker;
      });
    });
  }
  
  const onCancel = (id) => {
    setTrackers((prevTrackers) => {
      return prevTrackers.filter(tracker => tracker.id !== id);
    });
  }
  
  const onStart = (id) => {
    setTrackers((prevTrackers) => {
      return prevTrackers.map(tracker => {
        if (tracker.id === id) {
          return {...tracker, isRunning: true, startDate: new Date()};
        }
        return tracker;
      });
    });
  }
  
  useEffect(() => {
    const intervalIds = {};
    
    trackers.forEach((tracker) => {
      if (!tracker.isRunning) {
        clearInterval(intervalIds[tracker.id]);
        return;
      }
      
      intervalIds[tracker.id] = setInterval(() => {
        setTrackers((prevTrackers) =>
          prevTrackers.map((t) =>
            t.id === tracker.id ? { ...t, elapsedTime: t.elapsedTime + 1 } : t,
          ),
        );
      }, 1000);
    });
    
    const trackersToSave = trackers.filter((t) => !t.isDone);
    localStorage.setItem(localStorageKey, JSON.stringify(trackersToSave));
    
    return () => {
      Object.values(intervalIds).forEach((id) => clearInterval(id));
    };
  }, [trackers]);
  
  const formatElapsedTime = (elapsedTime) => {
    const seconds = elapsedTime % 60;
    const minutes = Math.floor(elapsedTime / 60) % 60;
    const hours = Math.floor(elapsedTime / 3600);
    
    return `${hours}:${minutes}:${seconds}`;
  }
  
  const onSaveDescription = (id, description) => {
    setTrackers((prevTrackers) => {
      return prevTrackers.map(tracker => {
        if (tracker.id === id) {
          return {...tracker, description};
        }
        return tracker;
      });
    });
  }
  
  const context = {
    trackers,
    addTracker,
    onDone,
    onCancel,
    onPause,
    onStart,
    formatElapsedTime,
    onSaveDescription
  };
  
  return (
    <TimeTrackersContext.Provider value={context}>
      {children}
    </TimeTrackersContext.Provider>
  );
}