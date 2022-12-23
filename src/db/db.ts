import mysql from 'mysql2/promise';

const dbHandle: any = {};
const DB_NAME: string = 'YOUR_DB_NAME';

const connect = async(dbName: string) => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: dbName || DB_NAME
        });
        dbHandle[dbName] = connection;
        return connection;
    } catch(e: any) {
        console.log('error while creating connection', e);
        return {};
    }
}

const query = async(conn: any, sql: string, values: string []) => {
    try {
        const [rows] = await conn.query(sql, values);
        return rows;
    } catch(e) {
        console.log('error while running mysql query', e);
        console.log('query', sql);
        return [];
    }
};

export default {
    connect,
    query
};