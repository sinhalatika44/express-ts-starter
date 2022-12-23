import express, { Express } from 'express';
import compression from "compression";  // compresses requests
import routes from './routes/index';
import authRoute from './routes/auth.route';

const router: Express = express();

// Create Express server
const app = express();
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());
app.use(compression());

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