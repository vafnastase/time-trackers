export const Tracker = (props) => {
  console.log(props.tracker);
  return (
    <div {...props}>
      {props.children}
    </div>
  );
}