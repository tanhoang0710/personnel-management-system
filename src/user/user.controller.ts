import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserIsUserGuard } from 'src/common/guards/userIsUser.guard';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwtAccessToken.guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  @UseGuards(UserIsUserGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.userService.updateProfile(updateProfileDto, id);
    if (result) return true;
    throw new BadRequestException();
  }

  @Put(':id/avatar')
  @UseGuards(UserIsUserGuard)
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './avatars',
        filename: function (req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const fileName = `${uniqueSuffix}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1_500_000, // 1.5 Mb
          }),
          new FileTypeValidator({
            fileType: /[\/.](gif|jpe?g|tiff?|png|webp|bmp)$/i,
          }),
        ],
      }),
    )
    avatar: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const url = await this.userService.updateAvatar(
      `http://localhost:3000/users/${id}/avatar/${avatar.filename}`,
      id,
    );
    if (!url) throw new InternalServerErrorException();
    return url;
  }

  @Get(':id/avatar/:avatarname')
  @ApiParam({
    name: 'avatarname',
  })
  @ApiParam({
    name: 'id',
  })
  findProfileImage(@Param('avatarname') avatarname: any, @Res() res: any) {
    return res.sendFile(path.join(process.cwd(), 'avatars/' + avatarname));
  }
}
