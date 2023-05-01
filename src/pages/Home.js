import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import style from './modules/styles/styles';
import withRoot from './modules/styles/withRoot';

function Home() {
    const css = style();
    //Gallery overlay 
    const galleryRef = React.useRef();
    //Mouse position to pan
    const [mouseData, setMouseData] = React.useState({
        x: 1040,
        y: 850,
        xDecimal: null,
        yDecimal: null,
        xMax: null,
        yMax: null,
        xPan: 0,
        yPan: 0
    })
    //Effect to calculate panning variables - causes warning that dependencies change on every render 
    React.useEffect(() => {
        const galleryOffsetWidth = galleryRef.current.offsetWidth;
        const galleryOffsetHeight = galleryRef.current.offsetHeight

        setMouseData(prev => {
            return {...prev, xDecimal: prev.x / window.innerWidth, yDecimal: prev.y / window.innerHeight}
        });
        setMouseData(prev => {
            return {...prev, xMax: galleryOffsetWidth - window.innerWidth, yMax: galleryOffsetHeight - window.innerHeight}
        });
        setMouseData(prev => {
            return {...prev, xPan: prev.xMax * prev.xDecimal * -1, yPan: prev.yMax * prev.yDecimal * -1}
        })
    }, [galleryRef, mouseData.x, mouseData.y])
    //
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
                <Box component={Paper} sx={{...css.tile, ...css.tile1}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile2}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile3}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile4}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile5}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile6}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile7}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile8}}/>
                <Box component={Paper} sx={{...css.tile, ...css.tile9}}/>
            </Box>
        </>
    );
}

export default withRoot(Home);