import React from 'react';

import { v4 as uuidv4 } from "uuid";
import { projects } from './../data';

import ImgDisplayer from './ImgDisplayer';
import Video from './Video';


const Gallery = ({ leng, displayNav, setDisplay, setImg, setPortfolio }) =>
    <div id="gallery">
        <h1 className="projects">
            {leng === 'english' ? "Projects" : "Proyectos"}
        </h1>
        {projects.map(proj =>
            <ImgDisplayer
                setDisplay={setDisplay}
                setPortfolio={setPortfolio}
                setImg={setImg}
                key={uuidv4()}
                input={Object.values(proj)[0]}
                displayNav={displayNav}
                leng={leng}
                video={
                    <Video
                        key={uuidv4()}
                        title={Object.keys(proj)}
                        input={Object.values(proj)[0]}
                    />
                }
            />
        )}
    </div>

export default Gallery;