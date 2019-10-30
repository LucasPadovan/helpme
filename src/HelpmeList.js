import React from 'react';
import classNames from 'classnames';

import './HelpmeList.scss';

const HelpmeListItem = ({instructionSet, onInstructionSelect}) => {
    const {title, instructions} = instructionSet;

    return (
        <button className="helpme__list__item" onClick={onInstructionSelect.bind(null, {instructions})}>{title}</button>
    )
}

const _buildInstructionsLinks = ({instructionSets, onInstructionSelect}) => {
    let response = (
        <div>
            There are no help files yet!
        </div>
    )

    if (instructionSets && instructionSets.length) {
        response = instructionSets.map((instructionSet) => (
            <HelpmeListItem
                key={instructionSet.title}
                instructionSet={instructionSet}
                onInstructionSelect={onInstructionSelect}
            />
        ));
    }

    return response;
}


const HelpmeList = ({
    title,
    instructionSets,
    isOpen,
    onInstructionSelect,
}) => {
    const listClassName = classNames(
        'helpme__list',
        {
            'helpme__list--open': isOpen,
        }
    );


    return (
        <div className={listClassName}>
            <div className="helpme__list__title">{title}</div>

            <div className="helpme__list__instructions">
                {_buildInstructionsLinks({instructionSets, onInstructionSelect})}
            </div>
        </div>
    )
};

export default HelpmeList;
