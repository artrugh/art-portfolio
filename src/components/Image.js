import React from 'react';

// hooks
import { useHandleCursor } from './../helpers/hooks';

import { projects } from './../data';

export default function Image({ leng, setPortfolio, img, scrollPosition }) {

    const [ index, images, handleCursor] = useHandleCursor(projects, leng, img, setPortfolio, scrollPosition);

    return (
        <figure id="img_displayer">
            < img
                style={{
                    cursor: handleCursor.cursor
                }}
                onClick={() => handleCursor.event()}
                alt={images[index].alt}
                className="main-image"
                src={require(`./../assets/photos/${images[index].img}.png`)}
            />
            <figcaption>{images[index].alt}</figcaption>
        </figure>
    )
}
