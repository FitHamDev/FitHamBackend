"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRouter = void 0;
const express_1 = __importDefault(require("express"));
const teams_service_1 = __importDefault(require("../service/teams.service"));
const teamRouter = express_1.default.Router();
exports.teamRouter = teamRouter;
/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMapping:
 *       type: object
 *       additionalProperties:
 *         type: string
 *     TeamsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             teams:
 *               $ref: '#/components/schemas/TeamMapping'
 *             teamsKort:
 *               $ref: '#/components/schemas/TeamMapping'
 */
/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams and their short names.
 *     responses:
 *       200:
 *         description: A list of teams and their short names.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamsResponse'
 */
teamRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield teams_service_1.default.getTeams();
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
}));
