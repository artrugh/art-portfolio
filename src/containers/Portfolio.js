import React, { useState } from 'react'

// components
import FunctionUI from '../components/FunctionUI';
import Nav from './../components/Nav';
import About from './../components/About';
import List from './../components/List';
import Gallery from './../components/Gallery';


const Portfolio = ({ data }) => {

    // set the lenguage from the props
    const [leng, setLeng] = useState(data);
    // display the functionUI
    const [display, setDisplay] = useState(false);
    // change the menu icon
    const [active, setActive] = useState(false);


    if (display) {
        return (
            <FunctionUI
                leng={leng}
                setDisplay={setDisplay}
                display={display}
                setActive={setActive}
            />
        )
    } else {
        return <>
            <Nav
                leng={leng}
                active={active}
                setActive={setActive}
                setDisplay={setDisplay}
                setLeng={setLeng}
            />
            {active ? <List
                setLeng={setLeng}
                leng={leng}
                setActive={setActive}
            /> : <>
                    <About leng={leng} />
                    <Gallery leng={leng} />
                    <p className='name'>© Arturo Rugh</p>
                </>
            }
        </>
    }
}

export default Portfolio;