import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import { artistsData } from './songsData'

// we will never have to connect to a database, prisma just handles that for us
const prisma = new PrismaClient()

const run = async () => {
    await Promise.all(artistsData.map(async (artist) => {
        // upsert means create or update
        return prisma.artist.upsert({
            where: {name: artist.name},
            update: {},
            create: {
                // prisma is one of the best ORM that allows nested inserts
                // in other ORM you have to create things seperately and then link them together, so you have to do like multiple database calls
                name: artist.name,
                songs: {
                    create: artist.songs.map((song) => ({
                        name: song.name,
                        duration: song.duration,
                        url: song.url,
                    }))
                }
            }
        })
    }))
}

run()
.catch(e => {
    // to make sure database doesn't keep running or log memory leaks if any
    console.error(e)
    process.exit(1)
})
.finally(async () => {
   await prisma.$disconnect()
})

// in any environment that reloads off of save, every time you save and files relaod, that's gonna make a new connection, which will eventually hit connection limit, then we will get an error in the terminal, we got to stop the app and start it again
// Generally this happens after every 30 - 40 saves, if this problem occurs just stop the server and start it again, it'll start a new pool and you should be good to go.



// add prisma in package.json, then run 'npx prisma db seed' in terminal, if the seed command is executed properly then run 'npx prisma studio' to visualize your database with seed data