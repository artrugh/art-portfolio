import React from 'react'

const MenuIcon = ({ setActive, active, displayNav }) => {
    return (
        <div className="menu-icon"
            style={{
                height: displayNav ? "auto" : 0,
            }}
            onClick={() => setActive(!active)}
        >
            <svg
                id="icon-menu"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                style={{
                    height: displayNav ? "auto" : 0,
                }}
            >
                <g className="svg-menu-toggle">
                    <line id="XMLID_1_" className={active ? "diagonal" : "bar"} x1="2.8" y1="2.7" x2="97.2" y2="2.7" />
                    <line id="XMLID_2_" className={active ? "diagonal" : "bar"} x1="2.8" y1="49.9" x2="97.2" y2="49.9" />
                    <line id="XMLID_3_" className={active ? "diagonal" : "bar"} x1="2.8" y1="97" x2="97.2" y2="97" />
                </g>
            </svg>

        </div>
    )
}

export default MenuIcon;
