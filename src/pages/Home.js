import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import style from './modules/styles/styles';
import withRoot from './modules/styles/withRoot';


function Home() {
    const css = style();
    const gallery = document.getElementById("gallery");
    const [mouseData, setMouseData] = React.useState({
        x: null,
        y: null,
        xPan: null,
        yPan: null
    })
    React.useEffect(() => {
        const xDecimal = mouseData.x / window.innerWidth;
        const yDecimal = mouseData.y / window.innerHeight;

        const xMax = gallery.offsetWidth - window.innerWidth;
        const yMax = gallery.offsetHeight - window.innerHeight;

        setMouseData(prev => {
            return {...prev, xPan: xMax * xDecimal * -1, yPan: yMax * yDecimal * -1}
        });
    }, [mouseData, gallery]);

    const handleMouse = (event) => {
        setMouseData(prev => {
            return {...prev, x: event.pageX, y: event.pageY}
        });
    }
    return (
        <>
            <Box sx={{...css.title}}>
                <Typography variant='h1' color='whitesmoke'>
                    gallery
                </Typography>
            </Box>
            <Box id="gallery" onMouseMove={handleMouse} sx={{...css.gallary, transform: `translate(${mouseData.xPan}px, ${mouseData.yPan}px)`}}>
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