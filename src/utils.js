/**
 * Receives a node selector and returns a x/y position relative to the page for the tooltip.
 * @param {string} htmlNode
 *
 * @returns {number, number} left, top
 */
export const calculateTooltipPosition = ({htmlNode, position}) => {
    const nodeRect = htmlNode.getClientRects()[0];
    console.log('TCL: calculateTooltipPosition -> nodeRect', nodeRect);
    const tooltipRect = document.querySelector('.helpme__tooltip').getClientRects()[0];
    console.log('TCL: calculateTooltipPosition -> tooltipRect', tooltipRect);

    // TODO: check that the tooltip is not overflowing our window.
    // const windowBounds = window && {maxHeight: window.outerHeight, maxWidth: window.outerWidth}

    let _left = nodeRect.x;
    let _top = nodeRect.y;

    if (position === 'top') {
        _left = (_left + nodeRect.width / 2) - tooltipRect.width / 2;
        _top = _top - tooltipRect.height - 10;
    } else if (position === 'right') {
        _left = _left + nodeRect.width + 10;
        _top = (_top + nodeRect.height / 2) - tooltipRect.height / 2;
    } else if (position === 'bot') {
        _left = (_left + nodeRect.width / 2) - tooltipRect.width / 2;
        _top = _top + nodeRect.height + 10;
    } else if (position === 'left') {
        _left = _left - tooltipRect.width - 10;
        _top = (_top + nodeRect.height / 2) - tooltipRect.height / 2;
    }

    return (
        {
            left: _left,
            top: _top,
        }
    )
}
