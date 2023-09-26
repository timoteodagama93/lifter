import React from 'react';
import './checkbox.css';
function OffOnCheckBox() {
  return (
    <div className="relative flex justify-center items-center">
      <label>
        <input type="checkbox" />
      </label>
      <div className="icon"></div>
    </div>
  );
}

export default OffOnCheckBox;
