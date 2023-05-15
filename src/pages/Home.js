import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import style from './modules/styles/styles';
import withRoot from './modules/styles/withRoot';

const art = [
    "https://images.unsplash.com/photo-1591561582301-7ce6588cc286?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3348&q=80",
];

function Home() {
    const css = style();
    //Gallery overlay 
    const galleryRef = React.useRef();
    const imageRefs = React.useRef([]);

    //Mouse position to pan
    const [mouseData, setMouseData] = React.useState({
        x: 1040,
        y: 850,
        xDecimal: null,
        yDecimal: null,
        xMax: null,
        yMax: null,
        xPan: 0,
        yPan: 0,
        imgPanX: 0,
        imgPanY: 0
    })
    //Effect to calculate panning variables - causes warning that dependencies change on every render 
    React.useEffect(() => {
        const galleryOffsetWidth = galleryRef.current.offsetWidth;
        const galleryOffsetHeight = galleryRef.current.offsetHeight;

        const image = imageRefs.current[0];
        const container = image.parentNode;
        const containerRect = container.getBoundingClientRect();
        
        setMouseData(prev => {
            return {...prev, xDecimal: prev.x / window.innerWidth, yDecimal: prev.y / window.innerHeight}
        });
        const imgDecX = mouseData.x / containerRect.width;
        const imgDecY = mouseData.y / containerRect.height;
        setMouseData(prev => {
            return {...prev, xMax: galleryOffsetWidth - window.innerWidth, yMax: galleryOffsetHeight - window.innerHeight}
        });
        const imgXMax = image.offsetWidth - containerRect.width;
        const imgYMax = image.offsetHeight - containerRect.height;
        setMouseData(prev => {
            return {...prev, xPan: prev.xMax * prev.xDecimal * -1, yPan: prev.yMax * prev.yDecimal * -1}
        });
        setMouseData(prev => {
            return {...prev, imgPanX: imgXMax * imgDecX * -1, imgPanY: imgYMax * imgDecY * -1}
        });

    }, [galleryRef, mouseData.x, mouseData.y])
    //Tracks mouse
    const handleMouse = (event) => {
        setMouseData(prev => {
            return {...prev, x: event.pageX, y: event.pageY}
        });
    }
    return (
        <>
            <Box sx={{...css.title, flexDirection: 'column'}}>
                <Typography variant='h1' color='whitesmoke'>
                    gallery
                </Typography>
                <Typography variant='h4' color='whitesmoke'>
                    {`x: ${mouseData.x} y: ${mouseData.y}`}
                </Typography>
            </Box>
            <Box component='div' ref={galleryRef} onMouseMove={handleMouse} sx={{...css.gallary, transform: `translate(${mouseData.xPan}px, ${mouseData.yPan}px)`}}>
                <Box component={Paper} sx={{...css.tile, ...css.tile1, overflow: 'hidden', position: 'relative'}}>
                    <Box component="img" src={art[0]} ref={(ref) => (imageRefs.current[0] = ref)} sx={{position: 'absolute', width: '200%', height: '200%', left: '-50%', top: '-50%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile2}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile3}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile4}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile5}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile6}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile7}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile8}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile9}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile10}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile11}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile12}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile13}}/>
            </Box>
        </>
    );
}

export default withRoot(Home);