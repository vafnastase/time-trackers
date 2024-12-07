import { useTimeTrackers } from '../provider/TimeTrackersProvider';

export const AddTrackerButton = ({custom, children, ...props}) => {
  const { addTracker } = useTimeTrackers();
  return (
    <button
      onClick={() => addTracker(custom)}
      {...props}>
      {children}
    </button>
  );
}