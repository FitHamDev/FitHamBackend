import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { wedstrijdRouter } from './controller/wedstrijd.routes';
import { rangschikkingRouter } from './controller/rangschikking.routes';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ["'self'", 'https://api.ucll.be'],
        },
    })
);

app.use(cors());
app.use(bodyParser.json());


app.get('/status', (req, res) => {
    res.json({ message: 'FitHam API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fit Ham API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/wedstrijden', wedstrijdRouter);
app.use('/rangschikking', rangschikkingRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'FitHamError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port, () => {
    console.log(`FitHam's API is running.`);
});
