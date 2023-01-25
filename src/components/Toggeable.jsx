import { useImperativeHandle, forwardRef, useState } from 'react';

const Toggeable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="border px-2 py-1 rounded" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button className="border px-2 py-1 rounded" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
});

export default Toggeable;
