import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorias, Libros } from './entities';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterInterface } from './interfaces/interfaces';

@Injectable()
export class BooksService {
  private readonly logger = new Logger('BooksService');
  constructor(
    @InjectRepository(Libros)
    private readonly booksRepository: Repository<Libros>,
    @InjectRepository(Categorias)
    private readonly categoriesRepository: Repository<Categorias>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { categoria, ...rest } = createBookDto;
    this.logger.debug(categoria)
    try {
      const category = await this.categoriesRepository.findOne({
        where: { nombre: categoria },
      });
      if (!category) throw new NotFoundException('Category not found');
      const book: Libros = this.booksRepository.create({
        ...rest,
        categoria: category,
      });
      return await this.booksRepository.save(book);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(term: FilterInterface) {
    let books: Libros[] = await this.booksRepository.find();
    if (term.anno) {
      books = books.filter(
        (book) => book.fechaPublicacion.split('-')[0] == term.anno,
      );
      this.logger.debug(
        JSON.stringify(
          books.map((book) => book.fechaPublicacion.split('-')[0]),
        ),
      );
    } else if (term.autor) {
      books = books.filter((book) => book.autor == term.autor);
    } else if (term.categoria) {
      this.logger.debug(JSON.stringify(term.categoria));

      books = books.filter(
        (book) => book.categoria.nombre.trim() == term.categoria,
      );
    }
    if (!books) throw new NotFoundException('Books not found');
    books = books.sort((a, b) => a.titulo.localeCompare(b.titulo));
    return books.map(({ categoria, ...book }) => ({
      ...book,
      categoria: categoria.nombre,
    }));
  }

  async findOne(term: string) {
    const book: Libros = !isNaN(+term)
      ? await this.booksRepository.findOne({ where: { id: +term } })
      : await this.booksRepository.findOne({ where: { titulo: term } });
    this.logger.debug(JSON.stringify(book));
    if (!book) throw new NotFoundException('Book not found');
    return {
      ...book,
      categoria: book.categoria.nombre,
    };
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const { categoria, ...rest } = updateBookDto;
    const book = await this.booksRepository.preload({
      id,
      ...rest,
    });
    this.logger.debug(JSON.stringify(book));
    if (!book) throw new NotFoundException('Book not found');
    if (categoria) {
      const categoryToUpdate = await this.categoriesRepository.findOne({
        where: { nombre: categoria },
      });
      if (!categoryToUpdate) throw new NotFoundException('Category not found');
      book.categoria = categoryToUpdate;
    }
    const bookUpdated = await this.booksRepository.save(book);
    this.logger.debug(`Book updated ${JSON.stringify(bookUpdated)}`);
    return bookUpdated;
  }

  async remove(term: string) {
    this.logger.debug(term);
    const libro = await this.findOne(term);
    this.booksRepository.delete(libro.id);
    return;
  }

  async getAllCategories() {
    const categories = await this.categoriesRepository.find();
    return categories.sort((a,b) => a.nombre.localeCompare(b.nombre))
  }

  handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
