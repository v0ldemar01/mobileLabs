import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('books_pictures.db');

export default db;
