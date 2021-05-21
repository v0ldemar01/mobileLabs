import db from '../db/connection';

class AbstactRepository {
  execute = (
    sqlStatement: string,
    args: (string | number)[] = [],
  ): Promise<any> =>
    new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            sqlStatement,
            args,
            (...res) => {
              resolve(res);
            },
            (...err) => {
              reject(err);
              return false;
            },
          );
        },
        (err) => {
          reject(err);
        },
      );
    });
}

export default AbstactRepository;
