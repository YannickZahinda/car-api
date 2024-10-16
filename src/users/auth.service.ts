import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";// making sure we can use promise instead of call back for scrypt

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signup(email: string, password: string){
        // See if email is in use
        const users = await this.usersService.find(email);
        //we're checking if there's any user in the below array, if so, we throw an error
        if(users.length){
            throw new BadRequestException('email in use')
        }

        // Hash user's password
        //Generate a salt
        const salt = randomBytes(8).toString('hex')

        //Hash salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;//32 are for asking to get exactly 32 characters

        //join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex')// We say he so that we get decimal instead of buffer
        // Create new use and save
        const user = await this.usersService.create(email, result);

        //return user

        return user;
    }

    async signin(email: string, password: string) {
        //find user withing the db with similar email
        const [user] = await this.usersService.find(email);
        if(!user) {
            throw new NotFoundException('user not found')
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')){
            throw new BadRequestException('Bad password')
        }

        return user;
    }
}