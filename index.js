import React, {Component} from 'react';

import HelpmeButton from './src/HelpmeButton';
import HelpMeInstruction from './src/HelpMeInstruction';
import HelpmeList from './src/HelpmeList';
import Portal from './src/Portal';

import './index.scss';


export default class Helpme extends Component {
    static propTypes = {};

    state = {
        isListOpen: false,
        isTooltipVisible: false,
        instructionSet: [],
    };

    _handleOnClick = () => {
        this.setState({
            isListOpen: !this.state.isListOpen,
        })
    }

    _handleHelpInstructionSelection = ({instructions}) => {
        this.setState({
            instructionSet: instructions,
            isTooltipVisible: true,
        })
    }

    render() {
        const {instructionSets} = this.props;
        const {
            instructionSet,
            isListOpen,
            isTooltipVisible,
        } = this.state;

        return (
            <div className="helpme">
                <HelpmeButton title="I need help" onClick={this._handleOnClick} />

                <HelpmeList
                    title="Basic instructions"
                    isOpen={isListOpen}
                    instructionSets={instructionSets}
                    onInstructionSelect={this._handleHelpInstructionSelection}
                />

                <Portal>
                    <HelpMeInstruction instructions={instructionSet} isVisible={isTooltipVisible} />
                </Portal>
            </div>
        );
    };
};
