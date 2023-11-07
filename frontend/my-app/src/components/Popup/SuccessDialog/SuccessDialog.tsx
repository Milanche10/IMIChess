import React from 'react';
import './SuccessDialog.css';

const SuccessDialog = (props : any) => {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
          <div className='win-text'>You Win</div>
        {props.children}
      </div>
    </div>
  ): (<div></div>);
};

export default SuccessDialog;
