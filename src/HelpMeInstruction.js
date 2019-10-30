/**
 * Get Helpme container node
 * Get set of instructions
 * Create a Tooltip component with text and position from this component state
 * Iterate over each instruction.
 * * Use update the text state with the instruction one
 * * Use the selector of the instruction to get the position of that element and possibly the box size
 * * Update the position of the tooltip to the ones we just got
 * * set an even listener for the whole document: on instruction.eventType should flash the tooltip, remove the event listener and create an event listener for the next instruction
 * * Check that there is another instruction > show CONGRATZ message if not
 * * Do something when it ends!
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { calculateTooltipPosition } from './utils';
import Tooltip from './Tooltip';


export default class HelpMeInstruction extends Component {
    static propTypes = {
        instructions: PropTypes.arrayOf(PropTypes.shape({
            helpText: PropTypes.string,
            nodeSelector: PropTypes.string,
            eventType: PropTypes.oneOf(['click', 'hover']),
            tooltipPosition: PropTypes.oneOf(['top', 'right', 'bot', 'left']),
        })),
    };

    static defaultProps = {
        instructions: [],
    };

    state = {
        helpText: '',
        positionLeft: 0,
        positionTop: 0,
        currentInstructionIndex: 0,
        shouldShowTooltip: false,
        showMessageOnCompletition: false,
    };

    _updateTooltip = ({targetNode, instructions}) => {
        const {currentInstructionIndex} = this.state;

        const currentInstruction = instructions[currentInstructionIndex];

        // If we set the text after calculating the position, the width will be wrong and the text won't be centered.
        this.setState({
            helpText: currentInstruction.helpText,
        }, () => {
            const tooltipPosition = calculateTooltipPosition({
                htmlNode: targetNode,
                position: currentInstruction.tooltipPosition,
            });

            this.setState({
                positionLeft: tooltipPosition.left,
                positionTop: tooltipPosition.top,
            });
        })

    }

    _generateEventListener = ({newInstructions} = {}) => {
        const {instructions} = this.props;
        const {currentInstructionIndex} = this.state;

        const _instructions = instructions && instructions.length ? instructions : newInstructions;

        const currentInstruction = _instructions[currentInstructionIndex];

        if (currentInstruction) {
            const targetNode = document.querySelector(currentInstruction.nodeSelector);

            if (targetNode) {
                this._updateTooltip({targetNode, instructions: _instructions});

                this.currentInstructionListener = targetNode.addEventListener(
                    currentInstruction.eventType,
                    this._clickInstruction,
                );
            }
        }
    }

    _clickInstruction = () => {
        const {instructions} = this.props;
        const {currentInstructionIndex} = this.state;

        const currentInstruction = instructions[currentInstructionIndex];

        if (currentInstruction) {
            const targetNode = document.querySelector(currentInstruction.nodeSelector);

            targetNode.removeEventListener(
                currentInstruction.eventType,
                this._clickInstruction,
            );

            this.setState({
                currentInstructionIndex: currentInstructionIndex + 1,
            }, () => {
                this._generateEventListener();
            });
        }
    }

    // Should not use did updated, enters loop
    componentWillReceiveProps({instructions}) {
        // TODO: Remove old listeners before creating a new one.
        this._generateEventListener({newInstructions: instructions});
    }

    render() {
        const {isVisible} = this.props;
        const {
            helpText,
            positionLeft,
            positionTop,
            currentInstructionIndex,
            shouldShowTooltip,
            showMessageOnCompletition,
        } = this.state;

        return (
            <Tooltip
                helpText={helpText}
                left={positionLeft}
                top={positionTop}
                isVisible={isVisible}
            />
        );
    };
};
