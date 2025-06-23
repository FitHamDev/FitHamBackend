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
exports.teamsListRouter = void 0;
const express_1 = __importDefault(require("express"));
const teams_service_1 = __importDefault(require("../service/teams.service"));
const teamsListRouter = express_1.default.Router();
exports.teamsListRouter = teamsListRouter;
/**
 * @swagger
 * /teamslist:
 *   get:
 *     summary: Get week and team links for UI display (like PHP teams method).
 *     responses:
 *       200:
 *         description: List of weeks and teams for navigation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     weeks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           week:
 *                             type: integer
 *                           url:
 *                             type: string
 *                     teams:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           code:
 *                             type: string
 *                           url:
 *                             type: string
 */
teamsListRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield teams_service_1.default.getTeams();
        const weeks = Array.from({ length: 9 }, (_, i) => ({
            week: i + 1,
            url: `/wedstrijden?week=${i + 1}`
        }));
        const teamsArr = teams.map(team => ({
            reeks: team.reeks,
            naam: team.naam,
            kort: team.kort,
            url: `/rangschikking?reeks=${team.reeks}`
        }));
        res.status(200).json({ success: true, data: { weeks, teams: teamsArr } });
    }
    catch (error) {
        next(error);
    }
}));
