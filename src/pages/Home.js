import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import style from './modules/styles/styles';
import withRoot from './modules/styles/withRoot';

const art = [
    "https://images.unsplash.com/photo-1591561582301-7ce6588cc286?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3348&q=80",
    "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    "https://images.unsplash.com/photo-1564085352725-08da0272627d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1634925353703-451b16b6d1a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    "https://images.unsplash.com/photo-1524000508744-05641f763ecd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2796&q=80",
    "https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80",
    "https://images.unsplash.com/photo-1627497824796-d801a4efdd07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1900&q=80",
    "https://images.unsplash.com/photo-1667089981570-ca23d32deff0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    "https://images.unsplash.com/photo-1516410290616-fb59b7994a51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80",
    "https://images.unsplash.com/photo-1645356133268-d25760d7c6e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    "https://images.unsplash.com/photo-1525814230241-7f78c608c54c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
    "https://images.unsplash.com/photo-1574096079513-d8259312b785?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80"
];

function Home() {
    const css = style();
    //Gallery overlay 
    const galleryRef = React.useRef();
    const imageRef = React.useRef();

    //Mouse position to pan
    const [mouseData, setMouseData] = React.useState({
        x: 1040,
        y: 850,
        xPan: 0,
        yPan: 0,
        imgPanX: 0,
        imgPanY: 0
    })
    //Effect to calculate panning variables - causes warning that dependencies change on every render 
    React.useEffect(() => {
        const galleryOffsetWidth = galleryRef.current.offsetWidth;
        const galleryOffsetHeight = galleryRef.current.offsetHeight;

        const image = imageRef.current;
        const container = image.parentNode;
        const containerRect = container.getBoundingClientRect();
        
        const xDecimal = mouseData.x / window.innerWidth;
        const yDecimal = mouseData.y / window.innerHeight;

        const xMax = galleryOffsetWidth - window.innerWidth;
        const yMax = galleryOffsetHeight - window.innerHeight;
        const imgXMax = image.offsetWidth - containerRect.width;
        const imgYMax = image.offsetHeight - containerRect.height;

        setMouseData(prev => {
            return {...prev, 
                xPan: xMax * xDecimal * -1, 
                yPan: yMax * yDecimal * -1,
                imgPanX: imgXMax * xDecimal * -1, 
                imgPanY: imgYMax * yDecimal * -1
            }
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
                    Nacho Bunny
                </Typography>
                {/* <Typography variant='h4' color='whitesmoke'>
                    {`x: ${mouseData.x} y: ${mouseData.y}`}
                </Typography> */}
            </Box>
            <Box component='div' ref={galleryRef} onMouseMove={handleMouse} sx={{...css.gallary, transform: `translate(${mouseData.xPan}px, ${mouseData.yPan}px)`}}>
                <Box component={Paper} sx={{...css.tile, ...css.tile1}}>
                    <Box component="img" src={art[0]} ref={imageRef} sx={{position: 'absolute', width: '150%', height: '150%', left: '-15%', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile2}}>
                    <Box component="img" src={art[1]} sx={{position: 'absolute', width: '150%', height: '150%', left: '-15%', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile3}}>
                    <Box component="img" src={art[2]} sx={{position: 'absolute', width: '150%', height: '150%', left: '-15%', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile4}}>
                    <Box component="img" src={art[3]} sx={{position: 'absolute', width: '200%', height: '200%', left: '-15%', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile5}}>
                    <Box component="img" src={art[4]} sx={{position: 'absolute', width: '150%', height: '150%', left: '-15%', top: '', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile6}}>
                    <Box component="img" src={art[5]} sx={{position: 'absolute', width: '150%', height: '150%', left: '-15%', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile7}}>
                    <Box component="img" src={art[6]} sx={{position: 'absolute', width: '150%', height: '150%', left: '', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile8}}>
                    <Box component="img" src={art[7]} sx={{position: 'absolute', width: '150%', height: '150%', left: '-15%', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile9}}>
                    <Box component="img" src={art[8]} sx={{position: 'absolute', width: '150%', height: '250%', left: '', top: '', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile10}}>
                    <Box component="img" src={art[9]} sx={{position: 'absolute', width: '200%', height: '200%', left: '', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile11}}>
                    <Box component="img" src={art[10]} sx={{position: 'absolute', width: '150%', height: '150%', left: '-15%', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile12}}>
                    <Box component="img" src={art[11]} sx={{position: 'absolute', width: '150%', height: '150%', left: '-15%', top: '-15%', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
                <Box component={Paper} sx={{...css.tile, ...css.tile13}}>
                    <Box component="img" src={art[12]} sx={{position: 'absolute', width: '150%', height: '250%', left: '', top: '', transform: `translate(${mouseData.imgPanX}px, ${mouseData.imgPanY}px)`}}/>
                </Box>
            </Box>
        </>
    );
}

export default withRoot(Home);