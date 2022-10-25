// a new route created /playlist/id

import GradientLayout from "../../components/gradientLayout"
import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"
import SongTable from '../../components/songsTable'

const getBGColor = id => {
    const colors = [
        'red',
        'green',
        'blue',
        'yellow',
        'teal',
        'purple',
        'orange',
        'gray'

    ]

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

// const getBGImage = id => {
//     const img = [
//         '/avatar1.jpg',
//         '/avatar2.jpg',
//         '/avatar3.jpg',
//         '/avatar4.jpg',
//         '/avatar5.jpg',
        

//     ]

//     return img[id - 1] || img[Math.floor(Math.random() * img.length)]
// }

const Playlist = ({playlist}) => {
    const color = getBGColor(playlist.id)
    // const img = getBGImage(playlist.id)
    return (
        <GradientLayout 
        color={color} 
        roundImage={false} 
        title={playlist.name} 
        subTitle='playlist'
        description={`${playlist.songs.length} songs`}
        // image={img}
        image = {`https://picsum.photos/400?random=${playlist.id}`}
        >
            <SongTable songs={playlist.songs} />
        </GradientLayout>
    )
}

export const getServerSideProps = async ({query, req}) => {

    let user

    try {
        user =  validateToken(req.cookies.TUNIN_ACCESS_TOKEN)
    } catch(e) {
        return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
     }
    }

    
    const [playlist] = await prisma.playlist.findMany({
        where: {
            // query.this_file_name
            // + sign to convert string to number
            id: +query.id,
            userId: user.id, 
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        }
                    }
                }
            }
        }
    })

    return {
        // props: { playlist },
        props: { playlist: JSON.parse(JSON.stringify(playlist)) },
    }
}

export default Playlist