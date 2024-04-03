import { user } from "@prisma/client"

export type TokenUserDto = {
    user: user,
    access_token: string

}