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
exports.welkomRouter = void 0;
const express_1 = __importDefault(require("express"));
const wedstrijden_service_1 = __importDefault(require("../service/wedstrijden.service"));
const teams_service_1 = __importDefault(require("../service/teams.service"));
const date_fns_1 = require("date-fns");
const welkomRouter = express_1.default.Router();
exports.welkomRouter = welkomRouter;
/**
 * @swagger
 * /welkom:
 *   get:
 *     summary: Get the welcome message for the current hour (matches at home for VCM teams).
 *     parameters:
 *       - in: query
 *         name: huidiguur
 *         schema:
 *           type: string
 *         description: Current date and hour in 'd/M/yyyy H:mm' format (optional, defaults to now)
 *     responses:
 *       200:
 *         description: Welcome message data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       team:
 *                         type: string
 *                       tegenstrever:
 *                         type: string
 */
welkomRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const huidiguur = req.query.huidiguur;
        let now = new Date();
        if (huidiguur) {
            const parsed = (0, date_fns_1.parse)(huidiguur, 'd/M/yyyy H:mm', new Date());
            if (!isNaN(parsed.getTime()))
                now = parsed;
        }
        const week = undefined; // show all weeks
        const wedstrijden = yield wedstrijden_service_1.default.getWedstrijden('', week);
        const teams = yield teams_service_1.default.getTeams();
        const huidigTimestamp = Math.floor(now.getTime() / 1000);
        const result = [];
        for (const wedstrijd of wedstrijden) {
            const wedstrijdmoment = wedstrijd.timestamp;
            const reeks = wedstrijd.reeks;
            // Zoek de korte naam van het team op basis van de reeks
            const teamObj = teams.find(t => t.reeks === reeks);
            let reeksvcm = teamObj ? teamObj.kort : 'VCM';
            let thuisvcm = wedstrijd.stamnummer_thuisclub === 'VB-1591';
            let uitvcm = wedstrijd.stamnummer_bezoekersclub === 'VB-1591';
            let tegenstrever = '';
            if (thuisvcm)
                tegenstrever = wedstrijd.bezoekersploeg;
            else if (uitvcm)
                tegenstrever = wedstrijd.thuisploeg;
            else
                continue;
            // Show from 1 hour before to 3 hours after
            const minRange = wedstrijdmoment - 60 * 60;
            const maxRange = wedstrijdmoment + 180 * 60;
            if (thuisvcm && huidigTimestamp > minRange && huidigTimestamp < maxRange) {
                result.push({ team: reeksvcm, tegenstrever });
            }
        }
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
}));
