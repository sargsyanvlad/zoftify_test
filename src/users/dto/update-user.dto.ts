
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @IsOptional()
  hash?: string | null;
}
