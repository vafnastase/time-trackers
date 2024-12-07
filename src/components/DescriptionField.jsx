import { useState } from 'react';

export const DescriptionField = ({ trackerId, onSaveDescription, defaultValue = "", ...props}) => {
  const [desc, setDesc] = useState(defaultValue);
  
  return (
    <input
      onChange={(e) => setDesc(e.target.value)}
      onBlur={() => onSaveDescription(trackerId, desc)}
      value={desc}
      {...props}
    />
  );
}