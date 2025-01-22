import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterInterface } from './interfaces/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Books') // Categoría de la API en Swagger
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  
  @Post()
  @ApiOperation({ summary: 'Crear un libro', description: 'Permite crear un nuevo libro.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar libros', description: 'Obtiene una lista de libros filtrados.' })
  @ApiQuery({ name: 'title', required: false, description: 'Filtrar por título del libro' })
  @ApiQuery({ name: 'author', required: false, description: 'Filtrar por autor del libro' })
  findAll(@Query() filterInterface: FilterInterface) {
    return this.booksService.findAll(filterInterface);
  }

  @Get(':term')
  @ApiOperation({
    summary: 'Obtener un libro',
    description: 'Busca un libro por término (ID o nombre).',
  })
  @ApiParam({ name: 'term', description: 'El ID o nombre del libro' })
  findOne(@Param('term') term: string) {
    return this.booksService.findOne(term);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un libro',
    description: 'Permite actualizar los datos de un libro.',
  })
  @ApiParam({ name: 'id', description: 'El ID del libro a actualizar' })
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':term')
  @ApiOperation({
    summary: 'Eliminar un libro',
    description: 'Permite eliminar un libro por término (ID o nombre).',
  })
  @ApiParam({ name: 'term', description: 'El ID o nombre del libro a eliminar' })
  remove(@Param('term') term: string) {
    return this.booksService.remove(term);
  }
  @Get('get/categories')
  getAllCategories(){
    return this.booksService.getAllCategories()
  }
}
