import { Tracker } from './Tracker';
import { useTimeTrackers } from '../provider/TimeTrackersProvider';

export const TrackersList = (props) => {
  const { trackers } = useTimeTrackers();
  
  return (
    <div {...props}>
      {trackers.map((tracker) => (
        <Tracker key={tracker.id} tracker={tracker} />
      ))}
    </div>
  );
}