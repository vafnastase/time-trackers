import { TimeTrackersProvider } from '../../src/provider/TimeTrackersProvider.jsx';

export const Root = ({ children }) => {
  return (
    <TimeTrackersProvider>
      {children}
    </TimeTrackersProvider>
  );
}