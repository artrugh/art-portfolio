import React, { useState, useEffect } from 'react';

import MenuIcon from './MenuIcon';
import FunctionIcon from './FunctionIcon';


const Nav = ({ active, setActive, setDisplay, leng, setLeng }) => {

    // set the style of the menu-icon -horizontals or diagonals
    const [displayNav, setDisplayNav] = useState(true);

    // display the nav when the web is scrolled and hide it after 5 second and 
    useEffect(() => {

        window.addEventListener('scroll', () => {
            // get the total of the window height
            let windowHeight = document.body.getBoundingClientRect().height - window.innerHeight - 200
            setDisplayNav(true);
            setTimeout(() => {
                if (window.pageYOffset > 107
                    && !active
                    && window.pageYOffset < windowHeight) setDisplayNav(false)
            }, 10000)

        });
    }, [displayNav, active]);

    return (
        <div className="nav-container"
            style={{
                opacity: displayNav ? 1 : 0,
                zIndex: displayNav ? 2 : 1,
            }}>
            <h1>Arturo Rugh</h1>
            <div className="nav-buttons">
                <div
                className = "leng"
                onClick={() => {
                    localStorage.setItem('art-web-leng', leng === 'espanol' ? 'english' : 'espanol');
                    setLeng(leng === 'espanol' ? 'english' : 'espanol')
                }}
                >{leng === "espanol" ? "english" : "español"}</div>

                <div
                    className="function-button"
                    style={{
                        height: displayNav ? "auto" : 0
                    }}
                    onClick={() => {
                        setDisplay(true)
                        setActive(false)
                    }}>
                    <FunctionIcon
                        displayNav={displayNav}
                    />
                </div>
                <MenuIcon
                    displayNav={displayNav}
                    active={active}
                    setActive={setActive}
                />
            </div>
        </div>
    )
}

export default Nav;