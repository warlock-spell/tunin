import { PrismaClient } from "@prisma/client"
// This way I just have one prisma client in my app, so I don't have to import @prisma/client  every time I wanna use it
// I can just import this file
export default new PrismaClient()