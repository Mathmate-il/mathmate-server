import { UpdateErrorMessages } from '../../../helpers/Errors.enums';
import { NotUpdatable } from '../../../helpers/NotUpdatable';
import { IsOptional, IsDate } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @NotUpdatable({ message: UpdateErrorMessages.EmailNotUpdatable })
  @ApiProperty()
  email?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @NotUpdatable({ message: UpdateErrorMessages.IdNotUpdatable })
  @ApiProperty()
  id?: string;

  @IsOptional()
  @IsDate()
  @NotUpdatable({ message: UpdateErrorMessages.CreatedAtNotUpdatable })
  @ApiProperty()
  createdAt?: Date;

  @IsOptional()
  @ApiProperty()
  name?: string;
}
