import React, { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { data, projects } from './../data';

const List = ({ setPortfolio, leng, setLeng, setList }) => {

    useEffect(() => {
        setList(true)
    }, [setList])
    return <ul className="list-container">
        {projects.map(item =>
            <a
                className="item"
                href={`#${Object.keys(item)}`}
                onClick={() => setPortfolio("gallery")}
                key={uuidv4()}
            >{Object.values(item)[0].title[leng]}</a>)}

        <div
            className="leng-list"
            onClick={() => {
                localStorage.setItem('art-web-leng', leng === 'espanol' ? 'english' : 'espanol');
                setLeng(leng === 'espanol' ? 'english' : 'espanol')
            }}
        >{leng === "espanol" ? "- english -" : "- español -"}</div>

        <div className="social-nets">
            {data.social_nets.map(item =>
                <a
                    href={item[Object.keys(item)][1]}
                    target="blank"
                    key={uuidv4()}
                    onClick={() => console.log(item[Object.keys(item)][1])
                    }
                >
                    <i className={item[Object.keys(item)][0]}></i></a>
            )}
        </div>
    </ul>
}

export default List;
