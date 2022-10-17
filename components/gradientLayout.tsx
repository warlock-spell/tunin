import { Box, Flex, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"

// Design Inspired from Spotify
// Making props based on Home and playlists page
// Home has round avatar, and playlist has square image

const GradientLayout = ({
    color,
    children,
    image,
    subTitle,
    title,
    description,
    roundImage
}) =>  {
    return (
        // Gradient changing at 0%, 15%, 40% and a quarter of almost black color
        <Box height="100%" overflow="auto" bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}>
            <Flex bg={`${color}.600`} padding="40px" align="end">
                <Box padding="20px">
                    <Image boxSize="160px" boxShadow="2xl" src={image} borderRadius={roundImage ? '100%' : '3px'} />
                </Box>
            </Flex>
        </Box>
    )
}

export default GradientLayout