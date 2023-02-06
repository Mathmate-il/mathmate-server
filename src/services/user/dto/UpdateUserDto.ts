import { UpdateErrorMessages } from '../../../helpers/Errors.enums';
import { IsOptional, IsDate, IsEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsEmpty({ message: UpdateErrorMessages.EmailNotUpdatable })
  @ApiProperty()
  email?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsEmpty({ message: UpdateErrorMessages.IdNotUpdatable })
  @ApiProperty()
  id?: string;

  @IsOptional()
  @IsDate()
  @IsEmpty({ message: UpdateErrorMessages.CreatedAtNotUpdatable })
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @ApiProperty()
  name?: string;
}
