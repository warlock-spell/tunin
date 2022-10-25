// a new route created /playlist/id

import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"

const Playlist = ({playlist}) => {
    return <div>{playlist.name}</div>
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