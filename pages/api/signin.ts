// Here we are not creating any user, we're just checking to see if the user exists,
// and then issuing the same token as a cookie
/* Strategy: We expect an email and a password to be sent up to the API, we're gonna check that email to see, if there is a user in the database by that email
If such an user exists, then we,re gonnal compare the hash passwords and see if they are same
If they are, then this is a valid user, generate them a token, set it in the cookie, go on with our day 
If anything doesn't matches, then they are not signed in*/

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password} = req.body
    // In our schema user has an unique email id
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    // user.password is hash password
    if (user && bcrypt.compareSync(password, user.password)) {
        // create a jwt. set a cookie, and then send that cookie back
        // keep everything consistent with signup.ts
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                time: Date.now()
            },
            'hello',
            {
                expiresIn: '8h'
            }
        )

        res.setHeader('Set-Cookie', cookie.serialize('TUNIN_ACCESS_TOKEN', token, {
            httpOnly: true, 
            maxAge: 8*60*60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            })
        )

        res.json(user)
    } else{
        res.status(401)
        res.json({error: 'Email or Password is wrong'})
    }
}

// Use these credentials from schema to sign in 
// Email: user@test.com, password: password
// Email: d@g.com, password: abcabc
// Run: http POST :3000/api/signin email=user@test.com password=password
// Run: http POST :3000/api/signin email=d@g.com password=abcabc