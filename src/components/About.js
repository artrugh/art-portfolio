import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { data } from './../data';

const About = ({ leng }) =>
    <div className="about-container">
        {data[leng].about.map(item =>
            <p
                key={uuidv4()}
            >{item}</p>)}
    </div>

export default About;
