import React, { useState, useEffect } from 'react';

import MenuIcon from './MenuIcon';
import FunctionIcon from './FunctionIcon';

// hooks
import { useNavBar, useMouseMove } from './../helpers/hooks'

const Nav = ({ 

    portfolioController,
    setPortfolio,
    leng,
    setLeng,
    setScrollPosition }) => {

    // set the style of the menu-icon -horizontals or diagonals
    const [displayNav, setDisplayNav] = useState(true);

    const [[linearGradient, scroll], documentHeight, height] = useNavBar("#721e25", "#969696");

    const position = useMouseMove();    

    // display the nav when the web is scrolled and hide it after 5 second and 
    useEffect(function check() {

        (position.y > 100
            && scroll > 400) ? setDisplayNav(false)
            : setDisplayNav(true);

        if (portfolioController === "gallery") {
            setScrollPosition(scroll)
        }

        // this is an event setted on the scroll
        // window.addEventListener('scroll', () => {
        //     setDisplayNav(true);
        //     setTimeout(() => {
        //         if (
        //             // window.pageYOffset > 107
        //             // && !active
        //             // && window.pageYOffset < (documentHeight - height - 200)
        //             ) setDisplayNav(false)
        //     }, 10000)
        // });

    }, [position, setScrollPosition]);

    return (
        <>
            <div className="nav-container"
                style={{
                    display: portfolioController !== "img" ? "flex" : "none",
                    opacity: displayNav ? 1 : 0,
                    zIndex: displayNav ? 2 : 1,
                    borderImage: linearGradient
                }}>
                <h1
                    id="logo"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >Arturo Rugh</h1>
                <div className="nav-buttons">
                    <div
                        className="leng"
                        onClick={() => {
                            localStorage.setItem('art-web-leng', leng === 'espanol' ? 'english' : 'espanol');
                            setLeng(leng === 'espanol' ? 'english' : 'espanol')
                        }} >{leng === "espanol" ? "english" : "español"}</div>

                    <div
                        className="function-button"
                        style={{
                            height: displayNav ? "auto" : 0
                        }}
                        onClick={() => setPortfolio("functionUI")}>
                        <FunctionIcon
                            displayNav={displayNav}
                        />
                    </div>
                    <MenuIcon
                        displayNav={displayNav}

                        setPortfolio={setPortfolio}
                        portfolioController={portfolioController}
                    />
                </div>
            </div>
            <svg
            
                onClick={() => window.scrollTo({ top: scroll + height, behavior: 'smooth' })}
                style={{
                    display: (
                        portfolioController === "gallery"  && 
                        documentHeight - height - 100 > scroll) ? "block" : "none"
                }}
                className="arrow right"
                viewBox="0 0 100 100">
                <polyline className="arrow-scroll" points="50.5,6.3 7,49.5 50.5,93 " />
            </svg>

        </>
    )
}

export default Nav;