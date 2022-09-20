// Box is basically just a div
// div can be styled with inline style tag or a css file, while using box we can style it using Chakra's primitive

import {Box} from '@chakra-ui/layout'

const PlayerLayout = ({children}) => {
    return (
        // vw - view width, vh = view height -> responsive unit of measurement
        // This will prevent main page scrolling, instead each individual thing scrolls on its own 
        // you can use sx parameter to add custom css
        <Box width="100vw" height='100vh'>
            {/* avoid using % in playlist bar width, as it will look weird on ultrawide screens */}
            <Box position='absolute' top='0' left='0' width='250px'>
              sidebar
            </Box>
            <Box marginLeft='250px' marginBottom='100px'>
                {/* left margin so that it aligns right next to side bar */}
                {/* bottom margin so that it aligns right above the player bar */}
                {children}
            </Box>
            <Box position= 'absolute' left='0' bottom='0'>
                player
            </Box>

        </Box>
    )
}

export default PlayerLayout