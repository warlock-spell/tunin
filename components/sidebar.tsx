// Importing image components that are optimized by nextjs
import NextImage from 'next/image'
// if someone clicks on a regular anchor tag, it's gonna go to the server, make a request 
// and therfore it will not perform client side rendering
// we want client side rendering after the initial server render
import NextLink from 'next/link'
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


// creating menu so that we can map over one component
// Its important to make your code reusable as much as possible
// this technique is easier to debug, test and extend functionalities
const navMenu = [
    {
        name: 'Home',
        icon: MdHome,
        route: '/'
    },
    {
        name: 'Search',
        icon: MdSearch,
        route: '/search'
    },
    {
        name: 'Your Library',
        icon: MdLibraryMusic,
        route: '/library'
    }
]

const musicMenu = [
    {
        name: 'Create Playlist',
        icon: MdPlaylistAdd,
        route: '/',
    },
    {
        name: 'Favorites',
        icon: MdFavorite,
        route: '/favorites',
    }
]

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
                <Box marginBottom='20px'>
                    <List spacing={2}>
                        {navMenu.map(menu => (
                            // implicit return
                            <ListItem paddingX='20px' fontSize='16px' key={menu.name}>
                                <LinkBox>
                                    <NextLink href={menu.route} passHref>
                                        <LinkOverlay>
                                            <ListIcon as={menu.icon} color='white' marginRight='20px' />
                                            {/* display name of menu in navBar*/}
                                            {menu.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box marginTop='20px' >
                    <List spacing={2}>
                        {/* iterate over the music menu  */}
                        {musicMenu.map(menu => (
                            <ListItem paddingX='20px' fontSize='16px' key={menu.name}>
                                <LinkBox>
                                    <NextLink href={menu.route} passHref>
                                        <LinkOverlay>
                                            <ListIcon as={menu.icon} color='white' marginRight='20px' />
                                            {/* display name of menu in musicMenu*/}
                                            {menu.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box marginTop='20px' marginBottom='10px'>
                    <List>
                        <ListItem fontSize='10px' textAlign='center'>
                            Made by Daksh Gaur
                        </ListItem>
                    </List>
                </Box>
                <Divider color='gray.800' />
                {/* only this section can scroll in nav bar, therefore it needs height to decide when it is overflowing  */}
                <Box height='50%' overflowY='auto' paddingY='20px'>
                    {/* demo iteration to see how things scroll  */}
                    {new Array(50).fill(1).map(() => <h1>Testing</h1>)}
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar