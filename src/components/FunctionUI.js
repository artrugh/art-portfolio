import React, { useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid';

//data
import { data } from './../data'

//components
import FunctionIcon from './FunctionIcon';
import Cross from './Cross'

const FunctionUI = ({ leng, setPortfolio }) => {

    // after 7 seconds hide the functionUI
    useEffect(() => {
        setTimeout(() => {
            setPortfolio("gallery")
        }, 20000)
    }, [setPortfolio])

    return (
        <div
            className="function-container"
            onClick={() => setPortfolio("gallery")}
            // style={{
            //     display: !display && "none"
            // }}
             >
            <div className="func-description">
                {data[leng].function.description.map(item =>
                    // when there is an icon diplays icon, otherwise, p
                    item !== "icon" ? <p key={uuidv4()} >{item}</p> :
                        <FunctionIcon key={uuidv4()} />)}
            </div>
            <div className="function">{data[leng].function.function}</div>
            <Cross />
        </div>
    )
}

export default FunctionUI;
