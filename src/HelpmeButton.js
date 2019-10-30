import React from 'react';

import './HelpmeButton.scss';


const HelpmeButton = ({
    title,
    onClick,
}) => (
    <button className="helpme__button" onClick={onClick}>
        {title}
    </button>
);

export default HelpmeButton;
