import { useTimeTrackers } from '../provider/TimeTrackersProvider';

export const AddTrackerButton = (props) => {
  const { addTracker } = useTimeTrackers();
  
  return (
    <button
      onClick={addTracker}
      {...props}>
      {props.children}
    </button>
  );
}