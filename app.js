"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const helmet_1 = __importDefault(require("helmet"));
const wedstrijd_routes_1 = require("./controller/wedstrijd.routes");
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
app.use((0, helmet_1.default)());
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        connectSrc: ["'self'", 'https://api.ucll.be'],
    },
}));
app.use((0, cors_1.default)({ origin: ['http://localhost:8080'] }));
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOpts);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/wedstrijden', wedstrijd_routes_1.wedstrijdRouter);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    }
    else if (err.name === 'TeamTrackrsError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    }
    else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});
app.listen(port, () => {
    console.log(`FitHam's API is running on port ${port}.`);
});
