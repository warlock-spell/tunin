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

const Player = () => {
    return (
    <Box>
        <Box>
            {/* <ReactHowler /> */}
        </Box>
        <Center color='gray.600'>
            <ButtonGroup>
                <IconButton 
                outline='none' 
                variant='link' 
                aria-label='shuffle' 
                fontSize='24px'
                icon={<MdShuffle/>}
                />
                <IconButton 
                outline='none' 
                variant='link' 
                aria-label='skip' 
                fontSize='24px'
                icon={<MdSkipPrevious/>}
                />
                <IconButton 
                outline='none' 
                variant='link' 
                aria-label='play' 
                fontSize='40px'
                color='white'
                icon={<MdOutlinePlayCircleFilled/>}
                />
                <IconButton 
                outline='none' 
                variant='link' 
                aria-label='pause' 
                fontSize='40px'
                color='white'
                icon={<MdOutlinePauseCircleFilled/>}
                />
                <IconButton 
                outline='none' 
                variant='link' 
                aria-label='next' 
                fontSize='24px'
                icon={<MdSkipNext/>}
                />
                <IconButton 
                outline='none' 
                variant='link' 
                aria-label='repeat' 
                fontSize='24px'
                icon={<MdOutlineRepeat/>}
                />
            </ButtonGroup>
        </Center>
        <Box color='gray.600'>
            <Flex justify='center' align='center'>
                <Box width='10%' textAlign='left'>
                    <Text fontSize='xs'>start</Text>
                </Box>
                <Box width='80%'>
                    <RangeSlider
                    aria-label={['min', 'max']}
                    step={0.1}
                    min={0}
                    max={321}
                    id="player-range"
                    >
                        <RangeSliderTrack bg="gray.800" >
                            <RangeSliderFilledTrack bg='gray.600'/>
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0}/>
                    </RangeSlider>
                </Box>
                <Box width='10%' textAlign='right'>
                    <Text fontSize='xs'>end</Text>
                </Box>
            </Flex>
        </Box>
    </Box>
    )
}

export default Player