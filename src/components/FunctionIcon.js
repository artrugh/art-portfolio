import React from 'react'

export default function FunctionIcon({ displayNav }) {

    // this function take care of the function icon in the functionUI
    // in these case props are not been passing, so it returns undefined
    const displayFunc = () => {
        if (displayNav || displayNav === undefined) {
            return true
        } else {
            return false
        }
    }

    return (
        <svg id="function-icon"
            style={{
                height: displayFunc() ? "55px" : 0,
                opacity: displayFunc() ? 1 : 0
            }}>
            <g id="icon">
                <path id="XMLID_64_" className="st0" d="M28.8,0.7c0,0-9.6,0.3-11.3,9s-5.9,33.8-5.9,33.8s-0.1,8.5-11.4,10.9" />
                <line id="XMLID_65_" className="st0" x1="6.2" y1="27.4" x2="21.6" y2="27.4" />
                <text id="XMLID_63_" transform="matrix(1 0 0 1 25.0484 37.054)" className="st1 st2">( )</text>
            </g>
        </svg>
    )
}
