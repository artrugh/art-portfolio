import React, { useState, useEffect } from 'react'

const Welcome = props => {

    // check if a lenguage has already been stored
    const lenguage = localStorage.getItem('art-web-leng');
    // store the lenguage in hook
    const [leng, setLeng] = useState(lenguage);

    useEffect(() => {
        document.title = "arturo rugh";

    }, [])

    return (leng === null) ?
        <div className="welcome-container">
            <h1> Welcome!</h1>
            <h2>select the lenguage</h2>
            <div className="leng-bottons">
                <button
                    onClick={() => {
                        localStorage.setItem('art-web-leng', 'english')
                        setLeng('english')
                    }}
                >english</button>
                <button
                    onClick={() => {
                        localStorage.setItem('art-web-leng', 'espanol')
                        setLeng('espanol')
                    }}
                >español</button>
            </div>
        </div>
        : props.render(leng)
}

export default Welcome;
