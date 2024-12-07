export const Tracker = ({tracker}, props) => {
  console.log(tracker);
  return (
    <div {...props}>
      {props.children}
    </div>
  );
}