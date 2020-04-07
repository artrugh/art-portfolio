import React from 'react';
import { v4 as uuidv4 } from "uuid";

const Video = ({ title, input }) => {
    return (
        <main>
            <iframe
                key={uuidv4()}
                title={title}
                className="video"
                src={input.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
        </main>
    )
}
export default Video;
