import mysql  from 'promise-mysql';
import keys from '../keys';

const pool = mysql.createPool(keys.database);

//Me salia como error el método con npm i promise-mysql@3.3.1 se me soluciono
pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection)
        console.log('DB is connected')
    })
export default pool;