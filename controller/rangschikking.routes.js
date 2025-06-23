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
exports.rangschikkingRouter = void 0;
const express_1 = __importDefault(require("express"));
const rangschikking_service_1 = __importDefault(require("../service/rangschikking.service"));
/**
 * @swagger
 * components:
 *   schemas:
 *     Rangschikking:
 *       type: object
 *       properties:
 *         volgorde:
 *           type: string
 *         ploegnaam:
 *           type: string
 *         puntentotaal:
 *           type: string
 *         isVCM:
 *           type: boolean
 *     RangschikkingResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Rangschikking'
 */
/**
 * @swagger
 * /rangschikking:
 *   get:
 *     summary: Get ranking for a team (ploeg).
 *     parameters:
 *       - in: query
 *         name: ploeg
 *         schema:
 *           type: string
 *         required: true
 *         description: Team code
 *       - in: query
 *         name: stamnummer
 *         schema:
 *           type: string
 *         description: Club stamnummer (optioneel, default = L-0759)
 *     responses:
 *       200:
 *         description: Ranking data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RangschikkingResponse'
 *       400:
 *         description: Missing ploeg parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
const rangschikkingRouter = express_1.default.Router();
exports.rangschikkingRouter = rangschikkingRouter;
rangschikkingRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reeks = req.query.reeks;
        if (!reeks) {
            return res.status(400).json({ success: false, error: 'Reeks parameter is vereist' });
        }
        const stamnummer = req.query.stamnummer;
        const data = yield rangschikking_service_1.default.getRangschikking(reeks, stamnummer);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        next(error);
    }
}));
