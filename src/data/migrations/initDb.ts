export default async (db) => {
  const sql = [
    `CREATE TABLE IF NOT EXISTS book_about ( 
      id UUID PRIMARY KEY,
      authors TEXT,
      desc TEXT,
      image TEXT,
      isbn13 TEXT NOT NULL UNIQUE,
      language TEXT,
      pages TEXT,
      price TEXT,
      publisher TEXT,
      rating TEXT,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,   
      year TEXT,
      url TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS books ( 
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      isbn13 TEXT NOT NULL UNIQUE,
      price TEXT NOT NULL,
      image TEXT,
      about UUID,
      FOREIGN KEY(about) REFERENCES book_about(id)
    )`,
    `CREATE TABLE IF NOT EXISTS pictures ( 
      id UUID PRIMARY KEY,
      largeImageURL TEXT NOT NULL,
      imageWidth INTEGER NOT NULL,
      imageHeight INTEGER NOT NULL,
      imageSize INTEGER NOT NULL
    )`,
  ];
  for (const sql_query of sql) {
    db.transaction((tx) => {
      tx.executeSql(
        sql_query,
        (...res) => {
          console.log('init', res);
        },
        (...err) => console.log('err', err),
      );
    });
  }
  console.log('complete db');
};
