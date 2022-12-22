import express, { Express } from 'express';
import routes from './routes/index';

const router: Express = express();

// Create Express server
const app = express();
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** Routes */
router.use('/', routes);

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