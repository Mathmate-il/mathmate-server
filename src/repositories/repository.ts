import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Repository<
  Entity,
  WhereUniqueInput,
  WhereInput,
  OrderByWithRelationInput,
  CreateInput,
  UpdateInput,
> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly entity: string,
  ) {}

  async findOne(where: WhereUniqueInput): Promise<Entity | null> {
    return this.prisma[this.entity].findUnique({
      where,
    });
  }

  async findFirst(where: WhereInput): Promise<Entity | null> {
    return this.prisma[this.entity].findFirst({
      where,
    });
  }
  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: WhereUniqueInput;
    where?: WhereInput;
    orderBy?: OrderByWithRelationInput;
    include?: any;
  }): Promise<Entity[]> {
    return this.prisma[this.entity].findMany({
      skip: params.skip,
      take: params.take,
      cursor: params.cursor,
      where: params.where,
      orderBy: params.orderBy,
      include: params.include,
    });
  }

  async create(data: CreateInput): Promise<Entity> {
    return this.prisma[this.entity].create({
      data,
    });
  }

  async update(params: {
    where: WhereUniqueInput;
    data: UpdateInput;
  }): Promise<Entity> {
    return this.prisma[this.entity].update({
      where: params.where,
      data: params.data,
    });
  }

  async delete(where: WhereUniqueInput): Promise<Entity> {
    return this.prisma[this.entity].delete({
      where,
    });
  }
}
