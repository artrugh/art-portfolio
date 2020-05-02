import { useEffect, useState, useLayoutEffect, useRef } from "react";
import axios, { get } from 'axios';

// hook to add mousemove event
// documentation
//https://codedaily.io/tutorials/60/Create-a-useMousePosition-Hook-with-useEffect-and-useState-in-React
export const useMouseMove = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, [position]);
  return position;
};


// hook to add scroll event
// documentation
// https://github.com/n8tb1t/use-scroll-position
// https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// the type of window is an object
const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {

  if (!isBrowser) return { x: 0, y: 0 }

  // if there is an element in the DOM to target, target. If not target the body
  const target = element ? element.current : document.body
  // get the positions(x,y,height,width, etc) of the target element
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
  // return x: window.scrollX, y: window.scrollY 
  const position = useRef(getScrollPosition({ useWindow }))

  let throttleTimeout = null

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}

useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null,
}


// hook to get the window's width and height

const getWindowDimensions = () => {
  // get the width and the height from the window object
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  // set default state of the hook
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  // set event when the window is resize
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // return the hook with the data
  return windowDimensions;
}

// hook to manege Nav Bar
export const useNavBar = (colorRight, colorLeft) => {
  // get the width and height from the window using already setted hook
  const { width, height } = useWindowDimensions();
  // set the scroll Border Nav Hook
  const [scrollPorcent, setScrollPorcent] = useState("")

  // get the total height of the document
  const documentHeight = document.body.scrollHeight

  useScrollPosition(({ prevPos, currPos }) => {

    // get the scrollposition if < 50 windowlenght  ? position : bottom position
    let scroll = Math.abs(currPos.y) < height ? Math.abs(currPos.y) : Math.abs(currPos.y) + height;

    // set porcentages
    let left = Math.floor(scroll * 100 / documentHeight);
    let right = 100 - left;

    // set the border Image strings
    let linearGradient = left > 50 ?
      `linear-gradient(to right, ${colorRight} ${left}%, ${colorLeft} ${right}%)1` :
      `linear-gradient(to left, ${colorLeft} ${right}%, ${colorRight} ${left}%)1`

    // store on the hook
    setScrollPorcent([linearGradient, Math.abs(currPos.y)])

  })

  return [scrollPorcent, documentHeight, height]

}

// hoock to handle the Image Displayer
export const useHandleCursor = (projects, leng, img, setPortfolio, scrollPosition) => {

  // store all the image string names in an array
  const imagesList = (projects, leng) => {
    let images = []

    projects.map(proj =>
      proj[Object.keys(proj)].images &&
      proj[Object.keys(proj)].images
        .map(img => images.push(
          {
            img: img.img,
            alt: proj[Object.keys(proj)].title[leng]
          }))
    )
    return images
  }

  // store the images ina hook
  const [images, setImages] = useState(imagesList(projects, leng));

  // get the index from the imageList of the current image
  const initialIndex = img => images.reduce((acc, image, ind) => {
    if (image.img === img.img) { return acc + ind }
    return acc
  }, 0);


  // get the initial index from the img
  const [index, setIndex] = useState(initialIndex(img))

  const [handelCursor, setHandelCursor] = useState({})

  // mousemove hook
  const position = useMouseMove();

  useEffect(() => {
    handelCursorEvent()
  }, [index, position])

  // three cursor position (left-center-right)
  // return an object with the cursos icon and the event function
  const handelCursorEvent = () => {
    // set the window height
    const windowHeight = window.innerWidth;

    if (position.x < windowHeight / 3 - 100)
      setHandelCursor({
        cursor: "url('https://img.icons8.com/ios/30/ffffff/back--v1.png'), auto",
        event: () => index > 0 && setIndex(index - 1)
      });
    else if (position.x > (windowHeight / 3 * 2) + 100)
      setHandelCursor({
        cursor: "url('https://img.icons8.com/ios/30/ffffff/forward--v1.png'), auto",
        event: () => index < images.length - 1 && setIndex(index + 1)
      });
    else
      setHandelCursor({
        cursor: "url('https://img.icons8.com/ios/30/ffffff/delete-sign.png'), auto",
        event: () => {
          setPortfolio("gallery")
          window.scrollTo({ top: scrollPosition, behavior: 'auto' })
        }
      })
  }

  return [index, images, handelCursor]

}

export const useFetchData = url => {

  // hook where the projects and error are stored
  const [projects, setProjects] = useState();
  const [isError, setisError] = useState();

  const fetchData = async () => {

    try {
      const res = await get(url);
      // unsucced fetch
      if (!res) {
        // catch errors and display UI
        setisError(true)

      } else if (res.status === 200) {
        // store the data in the hook
        setProjects(res.data);
        console.log("projects stored");
      }

    } catch (err) {
      console.log(err);
      setisError(true)
    }

  }

  useEffect(function () {
    if (!projects) {
      fetchData()
    }
  }, [projects])

  return [isError, projects]
}