import {createConnection} from 'typeorm';
import {Book} from './entities/Book';
import {BookAbout} from './entities/BookAbout';

export const connect = async () => {
  const createdConnection = await createConnection({
    type: 'expo',
    database: 'books_pictures.db',
    driver: require('expo-sqlite'),
    entities: [Book, BookAbout],

    // migrations: [CreateTodosTable1608217149351],
    // migrationsRun: true,

    synchronize: false,
  });

  return createdConnection;
};
