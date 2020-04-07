import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";


const ImgDisplayer = ({ input, leng, video }) => {

    const [counter, setCounter] = useState(0);
    const alt = input.title["espanol"].toLowerCase().split(' ')[0]
  
    return (
        <div className="image"
            id={alt}  >
            <h1>{input.title[leng]} </h1>
            <h2>{input.type[leng]}</h2>
            <h2>{input.date}</h2>
            {input.links && <h2>{input.links}</h2>}
            {input.images &&
                <div
                    className="img-container">
                    <div className="img-gallery">
                        {input.images.map((img, ind) =>
                            counter === ind &&
                            img.img.map(img => <img
                                alt={alt}
                                className="main-image"
                                key={uuidv4()}
                                src={require(`./../assets/photos/${img}.png`)} />)
                        )}
                        <div
                            key={uuidv4()}
                            className="img-selector">
                            {input.images.map((img, index) =>
                                index !== counter &&
                                img.img.map(img =>
                                    <img
                                        alt={alt}
                                        className="mini-img"
                                        key={uuidv4()}
                                        src={require(`./../assets/photos/${img}.png`)}
                                        onClick={() => setCounter(index)}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    {input.description && <div className="proj-description">
                        {input.description[leng].map(p =>
                            <p
                                key={uuidv4()}
                                className={p.charAt(0) === `"` ? "cite" : "sentence"}>{p}</p>
                        )}
                    </div>
                    }
                </div>}
            {input.video && video}
        </div>
    )
}

export default ImgDisplayer;
