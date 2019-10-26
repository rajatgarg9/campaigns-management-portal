import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './actionButton.scss';

function ActionButton({ title, imagePath, isDisable, children, className }) {
  const [isChildVisible, setIsChildVisible] = useState(false);
  const componentRef = useRef(null);

  function handleoutsideClick(e) {
    if (componentRef.current && !componentRef.current.contains(e.target)) {
      setIsChildVisible(false);
    }
  }

  useEffect(() => {
    if (isChildVisible) {
      document.addEventListener('click', handleoutsideClick, true);
    }

    return () => {
      document.removeEventListener('click', handleoutsideClick, true);
    };
  }, [isChildVisible]);

  return (
    <div className={`actionBtnWrap ${className}`} ref={componentRef}>
      <button
        type="button"
        className={`actionBtnWrap__actionsBtn ${
          isDisable ? 'actionBtnWrap__actionsBtn--dsabl' : ''
        }`}
        onClick={e => {
          setIsChildVisible(!isChildVisible);
          e.stopPropagation();
        }}
      >
        <img
          src={imagePath}
          alt={title}
          className="actionBtnWrap__actionsBtnImg"
        />
        <span className="actionBtnWrap__actionsBtnTxt">{title}</span>
      </button>
      {isChildVisible && (
        <div onClick={e => e.stopPropagation()} role="presentation">
          {React.cloneElement(children, {
            callBack2: () => setIsChildVisible(false)
          })}
        </div>
      )}
    </div>
  );
}

export default ActionButton;

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  isDisable: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string
};

ActionButton.defaultProps = {
  isDisable: false,
  children: null,
  className: ''
};
