import mysql from 'mysql2/promise';
import config from 'config';

interface DB_CONFIG {
    DB_NAME: string;
    HOST: string;
    PASSWORD: string;
    USER: string;
};

const dbHandle: any = {};
const DATABASE: DB_CONFIG = config.get('DATABASE');
console.log(DATABASE?.DB_NAME);
const DB_NAME: string = 'YOUR_DB_NAME';

const connect = async(dbName: string) => {
    try {
        const connection = await mysql.createConnection({
            host: DATABASE?.HOST || 'localhost',
            user: DATABASE?.USER || 'root',
            password: DATABASE?.PASSWORD || 'root',
            database: dbName || DATABASE?.DB_NAME || DB_NAME
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