import React from 'react';
import { v4 as uuidv4 } from "uuid";

const Video = ({ title, input }) => {

    const videos = input.video.map(video => <main key={uuidv4()}>

        {/* <video controls style={{ width: "100%", outline: "none" }}>
            <source src={video} type="video/mp4" />
        </video> */}

        <iframe
            key={uuidv4()}
            title={title[0]}
            className="video"
            src={video}
            frameBorder="0"

            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
        </iframe>
    </main>)

    return videos
}
export default Video;
