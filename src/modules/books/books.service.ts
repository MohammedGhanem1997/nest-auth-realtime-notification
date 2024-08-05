import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Books as Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {

  private booksRepository
  constructor(private dataSource: DataSource) {
    // get users table repository to interact with the database
    this.booksRepository = this.dataSource.getRepository(Book);
  }

  async create(createBookDto: CreateBookDto):Promise<Book>  {
    try {
      console.log(createBookDto);
       let book = await  this.booksRepository.save(createBookDto);
       console.log(book);
       
       return book

    } catch (error) {
      
      throw new Error(error.message)
    }
  }

   findAll(): Promise<Book[]> {
    return this.booksRepository.find({relations: {
      user: true,
  }})
  }

   findOne(id: number): Promise<Book> {
    console.log(id ,typeof id)
    
    return  this.booksRepository.findOne({where: {id}});
  }

  async update(id:number, data: object): Promise<Book | UpdateResult | undefined> {
    console.log(id);
    
    const book = await this.findOne(id).then(res =>res);
    if(book) return await this.booksRepository.update(id, data).then(res => res);
  return
  }

  async remove(id: number) {
    return await this.booksRepository.delete(id);
  }
}