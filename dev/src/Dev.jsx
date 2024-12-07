import { useTimeTrackers } from '../../src/provider/TimeTrackersProvider.jsx';
import { Tracker } from '../../src/components/Tracker.jsx';
import { TrackersList } from '../../src/components/TrackersList.jsx';
import { AddTrackerButton } from '../../src/components/AddTrackerButton.jsx';
import { DescriptionField } from '../../src/components/DescriptionField.jsx';

export const Dev = () => {
  const {
    trackers,
    onPause,
    onCancel,
    onDone,
    onStart,
    formatElapsedTime,
    onSaveDescription
  } = useTimeTrackers();
  
  return (
    <div>
      <h1>Dev</h1>
      <p>Dev content</p>
      
      <AddTrackerButton custom={{myJob: "Developer", jiraTicket: "VI-82"}}>
        Add tracker
      </AddTrackerButton>
      
      <TrackersList>
        {trackers.filter(tracker => !tracker.isDone).map(tracker => (
          <Tracker key={tracker.id}>
            <button onClick={() => onStart(tracker.id)}>Start</button>
            <button onClick={() => onPause(tracker.id)}>Pause</button>
            <button onClick={() => onCancel(tracker.id)}>Cancel</button>
            <button onClick={() => onDone(tracker.id)}>Done</button>
            <DescriptionField
              trackerId={tracker.id}
              defaultValue={tracker.description}
              onSaveDescription={onSaveDescription} />
            <p>{formatElapsedTime(tracker.elapsedTime)}</p>
          </Tracker>
        ))}
      </TrackersList>
    </div>
  );
}