import { UpdateErrorMessages } from '../../../helpers/Errors.enums';
import { IsOptional, IsDate, IsEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmpty({ message: UpdateErrorMessages.EmailNotUpdatable })
  email?: string;

  @ApiProperty()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmpty({ message: UpdateErrorMessages.IdNotUpdatable })
  id?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @IsEmpty({ message: UpdateErrorMessages.CreatedAtNotUpdatable })
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  name?: string;
}
