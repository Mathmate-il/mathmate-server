import { UpdateErrorMessages } from './../../helpers/Errors.enums';
import { NotUpdatable } from '../../helpers/NotUpdatable';
import { IsOptional, IsDate } from '@nestjs/class-validator';

export class UpdateUserDto {
  @IsOptional()
  @NotUpdatable({ message: UpdateErrorMessages.EmailNotUpdatable })
  email?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @NotUpdatable({ message: UpdateErrorMessages.IdNotUpdatable })
  id?: string;

  @IsOptional()
  @IsDate()
  @NotUpdatable({ message: UpdateErrorMessages.CreatedAtNotUpdatable })
  createdAt?: Date;

  @IsOptional()
  name?: string;
}
