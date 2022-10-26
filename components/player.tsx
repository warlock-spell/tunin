import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react'

// Howler js is the number one standards audio interface library for javascript
// IT has nothing to do with UI, it just gives us the mechanism of loading or playing a sound
import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
  MdPauseCircleFilled,
} from 'react-icons/md'

import { useStoreActions } from 'easy-peasy'
import GradientLayout from './gradientLayout'
import { formatTime } from '../lib/formatters'

const Player = ({songs, activeSong}) => {

    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(
        songs.findIndex((s) => s.id === activeSong.id)
    )
    const [seek, setSeek] = useState(0.0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [duration, setDuration] = useState(0.0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    // reference to ReactHowler
    const soundRef = useRef(null)
    const repeatRef = useRef(repeat)
    const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

    useEffect(() => {
        let timerId
        // if playing and user is not dragging thumb pointer on seek bar
        if (playing && !isSeeking) {
        const f = () => {
            // synchronizing ui with howler
            setSeek(soundRef.current.seek())
            timerId = requestAnimationFrame(f)
        }

        timerId = requestAnimationFrame(f)
        // cleaning up
        return () => cancelAnimationFrame(timerId)
        }

        cancelAnimationFrame(timerId)
    }, [playing, isSeeking])

    useEffect(() => {
        setActiveSong(songs[index])
    }, [index, setActiveSong, songs])

    useEffect(() => {
        repeatRef.current = repeat
    }, [repeat])

    const setPlayState = (value) => {
        setPlaying(value)
    }

    const onShuffle = () => {
        setShuffle((state) => !state)
    }

    const onRepeat = () => {
        setRepeat((state) => !state)
    }

    const prevSong = () => {
        setIndex((state) => {
        // if index > 0 then subtract one else loop back to the end of the playlist
        return state ? state - 1 : songs.length - 1
        })
    }

    const nextSong = () => {
        // Expecting to shuffle when clicked on next button if shuffle is ON
        // Next song will act same as normal on Repeat ON
        setIndex((state) => {
        if (shuffle) {
            const next = Math.floor(Math.random() * songs.length)

            if (next === state) {
            return nextSong()
            }
            return next
        } else {
            return state === songs.length - 1 ? 0 : state + 1
        }

        
        })
    }

    const onEnd = () => {
        // Accounting for repeat song functionalities
        if (repeatRef.current) {
        // Restarting song on UI
        setSeek(0)
        // restarting song on Howler
        soundRef.current.seek(0)
        } else {
        nextSong()
        }
    }

    const onSeek = (e) => {
        // range component of Chakra returns array
        // range component of HTML5 returns one value
        // updating UI
        setSeek(parseFloat(e[0]))
        // updating howler
        soundRef.current.seek(e[0])
    }

    const onLoad = () => {
        const songDuration = soundRef.current.duration()
        setDuration(songDuration)
    }

    return (
    <Box>
        <Box>
            <ReactHowler 
            playing={playing} 
            src={activeSong?.url} 
            ref={soundRef} 
            onLoad={onLoad}
            onEnd={onEnd}
            />
        </Box>
        <Center color='gray.600'>
            <ButtonGroup>
                <IconButton
                outline="none"
                variant="link"
                aria-label="shuffle"
                fontSize="24px"
                color={shuffle ? 'white' : 'gray.600'}
                onClick={onShuffle}
                icon={<MdShuffle />}
                />
                <IconButton 
                outline='none' 
                variant='link' 
                aria-label='skip' 
                fontSize='24px'
                icon={<MdSkipPrevious/>}
                onClick={prevSong}
                />
                {playing ? (
                    <IconButton 
                    outline='none' 
                    variant='link' 
                    aria-label='pause' 
                    fontSize='40px'
                    color='white'
                    icon={<MdOutlinePauseCircleFilled/>}
                    onClick={()=> setPlayState(false)}
                />
                    
                ) : <IconButton 
                    outline='none' 
                    variant='link' 
                    aria-label='play' 
                    fontSize='40px'
                    color='white'
                    icon={<MdOutlinePlayCircleFilled/>}
                    onClick={()=> setPlayState(true)}
                    />
                }
                
                
                <IconButton 
                outline='none' 
                variant='link' 
                aria-label='next' 
                fontSize='24px'
                icon={<MdSkipNext/>}
                onClick={nextSong}
                />
                <IconButton
                outline="none"
                variant="link"
                aria-label="repeat"
                fontSize="24px"
                color={repeat ? 'white' : 'gray.600'}
                onClick={onRepeat}
                icon={<MdOutlineRepeat />}
                />
            </ButtonGroup>
        </Center>
        <Box color='gray.600'>
            <Flex justify='center' align='center'>
                <Box width='10%' textAlign='left'>
                    <Text fontSize='xs'>{formatTime(seek)}</Text>
                </Box>
                <Box width='80%'>
                    <RangeSlider
                    aria-label={['min', 'max']}
                    step={0.1}
                    min={0}
                    id="player-range"
                    max={duration ? duration.toFixed(2) : 0}
                    onChange={onSeek}
                    // it expects array 
                    value={[seek]}
                    onChangeStart={() => setIsSeeking(true)}
                    onChangeEnd={() => setIsSeeking(false)}
                    >
                        <RangeSliderTrack bg="gray.800" >
                            <RangeSliderFilledTrack bg='gray.600'/>
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0}/>
                    </RangeSlider>
                </Box>
                <Box width='10%' textAlign='right'>
                    <Text fontSize='xs'>{formatTime(duration)}</Text>
                </Box>
            </Flex>
        </Box>
    </Box>
    )
}

export default Player