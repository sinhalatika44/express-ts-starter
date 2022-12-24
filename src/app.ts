import express, { Express } from 'express';
import compression from "compression";  // compresses requests
import dotenv from "dotenv";
import fs from "fs";
import routes from './routes/index';
import authRoute from './routes/auth.route';
import db from './db/db';

const dbName: string = 'db_free_hire' || process?.env?.DB_NAME;

const router: Express = express();

// Create Express server
const app = express();
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());
app.use(compression());

if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
} else {
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

db.connect(dbName).then((response: object) => {
    console.log('db connection success');
    console.log('connection string type', typeof response);
}).catch((e) => {
    console.log('error while connecting to db', e);
});

/** Routes */
app.use(routes);
app.use(authRoute);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

// Express configuration
app.set("port", process.env.PORT || 3000);

export default app;