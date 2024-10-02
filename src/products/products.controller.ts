import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async createProduct(@Body() createDto: CreateProductDto) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, createDto),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' }, paginationDto);
    //clients.send si necesito esperar una respuesta uso el send
    //emit solo envia y ya, no espera nada
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id: id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_product' }, { id: id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async patchProduct(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
