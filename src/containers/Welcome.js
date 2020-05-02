import React, { useState, useEffect } from 'react';
// hooks
import { useFetchData } from './../helpers/hooks';

const Welcome = props => {

    // check if a lenguage has already been stored
    const lenguage = localStorage.getItem('art-web-leng');
    // store the lenguage in hook
    const [leng, setLeng] = useState(lenguage);

    const [isError, projects] = useFetchData("http://localhost:4000/projects")

    useEffect(function () {
        document.title = "arturo rugh";
    }, [])

    if (leng === null || !projects) return <div className="welcome-container">
        {isError && <h1> Sorry, error! refresh please</h1>}
        {leng === null &&
            <>
                <h1> Arturo Rugh</h1>
                <h2>-  welcome -</h2>
                <h2>select the language</h2>
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
            </>
        }
        {(!isError && leng) && <>
            <div className="spinner-container"></div>
            <h1> Arturo Rugh</h1>
        </>}
    </div>
    else return props.render({ leng, projects })
}

export default Welcome;
