import { NotUpdatable } from '../../helpers/NotUpdatable';
import { IsOptional, IsDate } from '@nestjs/class-validator';

export class UpdateUserDto {
  @IsOptional()
  @NotUpdatable({ message: 'The email field is not updatable' })
  email?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @NotUpdatable({ message: 'The id field is not updatable' })
  id?: string;

  @IsOptional()
  @IsDate()
  @NotUpdatable({ message: 'The createdAt field is not updatable' })
  createdAt?: Date;

  @IsOptional()
  name?: string;
}
