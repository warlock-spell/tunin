import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'
import prsima from './prisma'

// Protected route handling
export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies.TUNIN_ACCESS_TOKEN

        if (token) {
            let user

            try {
                const {id} = jwt.verify(token, 'hello')
                user = await prisma.user.findUnique({
                    where: {id},
                })
                if (!user) {
                    throw new Error('Not real user')
                }
            } catch (error){
                res.status(401)
                res.json({error: 'Not Authorized'})
                return
            }
            return handler(req, res, user)
        }

        // incase of no token
        res.status(401)
        res.json({error: 'Not Authorized'})
    }
}