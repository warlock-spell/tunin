// Importing image components that are optimized by nextjs
import NextImage from 'next/image'

// Importing list elements, as side bar has mainly items displayed in list format
// Divider is to divide various section in sidebar, inspiration from spotify itself
// LinkBox and LinkOverlay gives us a click target (large click area around a small word)
import {
    Box,
    List,
    ListItem,
    ListIcon,
    Divider,
    Center,
    LinkBox,
    LinkOverlay
} from '@chakra-ui/layout'

// Importing react icons -> https://react-icons.github.io/react-icons/
// Again all imports are according to an inspiration from spotify playlist side bar
import {
    MdHome,
    MdSearch,
    MdLibraryMusic,
    MdPlaylistAdd,
    MdFavorite
} from 'react-icons/md'

const Sidebar = () => {
    return (
        // since sidebar is already in a layout which has a specified width,
        // therefore stretching it 100% over the alloted layout
        // height of sidebar starts from top, and ends just above playbar, therefore using 'calc' to calculate
        <Box width='100%' height='calc(100vh - 100px)' bg='black' paddingX='5px' color='gray'>
            {/* inner boxes for content, same as nested divs */}
            <Box paddingY='20px' height="100%">
                <Box width='250px' marginBottom='20px' paddingX='50px'>
                    {/* values are required inside curly braces for image to be optimized */}
                    <NextImage src='/LogoTransparent.svg' height={160} width={120}/>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar