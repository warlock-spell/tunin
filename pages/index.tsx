import { Box, Text, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  const { user } = useMe()

  return (
    <GradientLayout
      roundImage
      color="gray"
      subTitle="profile"
      // title={`${user?.firstName} ${user?.lastName}`}
      title = 'Daksh Gaur'
      // description={`${user?.playlistsCount} public playlists`}
      description='YOUR HOME PAGE'
      image="/main.jpg"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="/avatar2.jpg"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

/* getStaticProps is another function that's also ran at a non-client time except it's ran at build time
whereas getServerSideProps is ran at runtime on the server
so getServerSideProps is gonna execute every single time you request this homepage
getStaticProps is only gonna execute when you do a static build of your site
Therefore dynamic pages generally uses getServerSideProps
*/ 
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})


  return {
    props: { artists: JSON.parse(JSON.stringify(artists)) },
  }
}

export default Home