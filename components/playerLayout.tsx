// Box is basically just a div
// div can be styled with inline style tag or a css file, while using box we can style it using Chakra's primitive

import {Box} from '@chakra-ui/layout'

const PlayerLayout = ({children}) => {
    return (
        <Box>
            Layout
            {children}
        </Box>
    )
}

export default PlayerLayout