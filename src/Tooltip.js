import React from 'react';
import classNames from 'classnames';

import './Tooltip.scss';


const Tooltip = ({
    helpText,
    left,
    top,
    isVisible,
}) => {
    const tooltipClassNames = classNames(
        'helpme__tooltip',
        {
            'helpme__tooltip--visible': isVisible,
        }
    );
    return (
        <div
            className={tooltipClassNames}
            style={{left: `${left}px`, top: `${top}px`}}
        >
            {helpText}
        </div>
    );
};

export default Tooltip;
