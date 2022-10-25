// a new route created /playlist/id

import GradientLayout from "../../components/gradientLayout"
import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"

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

const Playlist = ({playlist}) => {
    const color = getBGColor(playlist.id)
    return (
        <GradientLayout color={color}>
            <div>Content here</div>
        </GradientLayout>
    )
}

export const getServerSideProps = async ({query, req}) => {

    const {id} = validateToken(req.cookies.TUNIN_ACCESS_TOKEN)
    const [playlist] = await prisma.playlist.findMany({
        where: {
            // query.this_file_name
            // + sign to convert string to number
            id: +query.id,
            userId: id, 
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
        props: { playlist: JSON.parse(JSON.stringify(playlist)) },
    }
}

export default Playlist