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

    // password encryption
    const salt = bcrypt.genSaltSync()
    const user = await prisma.user.upsert({
        where: {email: 'user@test.com'},
        update: {},
        create: {
            email: 'user@test.com',
            // password is 'password' 
            password: bcrypt.hashSync('password', salt),
        },

    })

    const songs = await prisma.song.findMany({})
    // instead of Promise.all() you can actually do prisma.some.entity.createMany and create all the palylist at once versus doing Promise.all() and creating them one at a time
    // but if you do that, it will create issues while using nested create
    // so we are using Promise.all() so that we are creating one at a time and they all can do nested create

    await Promise.all(new Array(10).fill(1).map(async (_, i) => {
        // you can use upsert only if you can query something unique, so that you can have the 'where' argument
        return prisma.playlist.create({
            data: {
                name: `Playlist #$(i+1)`, 
                user: {
                    // so that prisma connects user with userid, so avoid using userId: user.id
                    // you can also use an awesome feature by prisma using connectOrCreate
                    connect: {id: user.id},
                },
                songs: {
                    connect: songs.map((song) => ({
                        id : song.id,
                    })),
                },
            },
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

// Does prisma code get shipped to the client? That all actually depends on where you write the code, because Next.js does optimization on imports. 
// For this project we will not write any prisma code on client, although we will be writing prisma code in a component that is on the client, but the way Next.js behaves is that it actually strips all that out for the client build
// So although it does look like that it's been written on the client, it actually will be stripped out before it gets built