import React, { useState, useEffect } from 'react'

// components
import FunctionUI from '../components/FunctionUI';
import Nav from './../components/Nav';
import About from './../components/About';
import List from './../components/List';
import Gallery from './../components/Gallery';
import Image from './../components/Image';


const Portfolio = ({ data }) => {

    // set the lenguage from the props
    const [leng, setLeng] = useState(data);
    // change the menu icon
    const [portfolioController, setPortfolio] = useState("gallery");
    // set the image
    const [img, setImg] = useState("");

    // scroll position
    const [scrollPosition, setScrollPosition] = useState(0)

    const [list, setList] = useState(false);

    useEffect(function check() {
        // if the was displayed set it off otherwise chech if it rendering the gallery
        list ? setList(false) : (portfolioController !== "gallery") ?
            // if the gallery is not been rendering // scroll to top
            window.scrollTo({ top: 0, behavior: 'auto' }) :
            // otherwise scroll to the scrollPosition which was already store it in the nav
            window.scrollTo({ top: scrollPosition, behavior: 'auto' })

    }, [portfolioController, scrollPosition])

    return <>

        <Nav
            leng={leng}
            portfolioController={portfolioController}
            setPortfolio={setPortfolio}

            setLeng={setLeng}

            setScrollPosition={setScrollPosition}
        />
        {(portfolioController === "functionUI") &&
            <FunctionUI
                leng={leng}
                setPortfolio={setPortfolio}
            />}
        {portfolioController === "list" &&
            <List
                setList={setList}
                setLeng={setLeng}
                leng={leng}
                setPortfolio={setPortfolio}
            />}
        {portfolioController === "gallery" && <>
            <About leng={leng} />
            <Gallery
                setPortfolio={setPortfolio}

                setImg={setImg}
                leng={leng} />
            <p className='name'>© Arturo Rugh</p>
        </>}
        {portfolioController === "img" &&
            <Image
            leng={leng}
                scrollPosition={scrollPosition}
                img={img}
                setPortfolio={setPortfolio}
            />
        }
    </>
}


export default Portfolio;