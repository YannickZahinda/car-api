import { Controller, Post, Get, Param, Query, Body, Delete, Patch, NotFoundException, Session, UseGuards} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGard } from './gards/auth.gard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(
      private usersService: UsersService,
      private authService: AuthService
    ){}

    // @Get('/colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any){
    //   session.color = color;
    // }

    // @Get('/colors')
    // getColor(@Session() session: any) {
    //   return session.color;
    // }

    // @Get('/whoamI')
    // whoAmI(@Session() session: any){
    //   return this.usersService.findOne(session.userId)
      
    // }
    
    @Get('/whoamI')
    @UseGuards(AuthGard)
    whoAmI(@CurrentUser() user: User){
      return user;
      
    }

    @Post('/signout')
    signOut(@Session() session: any){
      session.userId = null
    }


    @Post('/signup')
    async createUser(@Body() body: createUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user;
    }

    @Post('/signin')
    async siginin(@Body() body: createUserDto, @Session() session: any) {
      const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id
        return user;
    }
   
    @Get('/:id')
    async findUser(@Param('id') id: string){
      
        const user = await this.usersService.findOne(parseInt(id))
        if(!user){
          throw new NotFoundException('user not found')
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string){
        return this.usersService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
      return this.usersService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
      return this.usersService.update(parseInt(id), body)
    }
}
