import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import Left from './components/Left/Left';
import Middle from './components/Middle/Middle';
import Right from './components/Right/Right';
import Bottom from './components/Global/BottomBar';

const App = () => {
    const [right, setRight] = useState(true);
    const [leftWidth, setLeftWidth] = useState('20%');
    const [rightWidth, setRightWidth] = useState('20%');
    const [liked, setLiked]=useState(false);
    const [play, pause]=useState(true);

    const toggleRight = () => {
        setRight(!right);
    };

    const toggleLiked=()=>{
        setLiked(!liked)
    }

    const togglgePlay=()=>{
        pause(!play)
    }

    const toggleLeft = () => {
        setLeftWidth((prevWidth) =>
            prevWidth === "5%" ? "20%" : "5%"
        );
    };

    const toggleMax=()=>{
        setLeftWidth((prevWidth)=>
            prevWidth === "40%" ? "20%" : "40%"
        )
    }

    const handleLeftResize = (event) => {
        const newLeftWidth = `${event.clientX}px`;
        if(newLeftWidth === "295px"){
            toggleLeft()
        }
        else{
            setLeftWidth(newLeftWidth);
        }
    };
    
    const handleRightResize = (event) => {
        const newRightWidth = `${window.innerWidth - event.clientX}px`;
        setRightWidth(newRightWidth);
    };

    const CustomDivider=({resize})=>{
        return(
            <Divider
                sx={{ cursor: 'col-resize', width: '8px', backgroundColor: 'black',}}
                onMouseDown={() => {
                    document.addEventListener('mousemove', resize);
                    document.addEventListener('mouseup', () => {
                        document.removeEventListener('mousemove', resize);
                    });
                }}
            />
        )
    }

    return (
        <Box display="flex" flexDirection="column" bgcolor="black">
            <Box display="flex" height="88%">
                <Box display="flex" minWidth="6.3%" maxWidth="40%" style={{ width: leftWidth }}>
                    <Left toggleLeftWidth={toggleLeft} toggleMaxWidth={toggleMax}  />
                </Box>
                <CustomDivider resize={handleLeftResize} />
                <Box display="flex" flex="1">
                    <Middle play={play} togglePlay={togglgePlay}/>
                </Box>
                {right ? (
                    <Box display="flex" minWidth="20%" maxWidth="30%" style={{ width: rightWidth }}>
                        <CustomDivider resize={handleRightResize} />
                        <Right toggleRightWidth={toggleRight} liked={liked} toggleLiked={toggleLiked} />
                    </Box>
                ) : (
                    <Box marginLeft="8px"></Box>
                )}
            </Box>
            <Box display="flex" height="12%">
                <Bottom right={right} toggleRight={toggleRight} liked={liked} toggleLiked={toggleLiked} play={play} togglePlay={togglgePlay} />
            </Box>
        </Box>
    );
};

export default App;









