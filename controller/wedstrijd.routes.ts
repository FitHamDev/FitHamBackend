import express, { Request, Response, NextFunction } from 'express';
import wedstrijdenService from '../service/wedstrijden.service';

const wedstrijdRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Wedstrijd:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *         datum:
 *           type: string
 *         aanvangsuur:
 *           type: string
 *         reeks:
 *           type: string
 *         thuisploeg:
 *           type: string
 *         bezoekersploeg:
 *           type: string
 *         uitslag:
 *           type: string
 *         stamnummer_thuisclub:
 *           type: string
 *         stamnummer_bezoekersclub:
 *           type: string
 *         week:
 *           type: number
 *         timestamp:
 *           type: number
 *     WedstrijdenResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Wedstrijd'
 */

/**
 * @swagger
 * /wedstrijden:
 *   get:
 *     summary: Get wedstrijden (matches) optionally filtered by ploeg, week, and limit.
 *     parameters:
 *       - in: query
 *         name: ploeg
 *         schema:
 *           type: string
 *         description: Team code
 *       - in: query
 *         name: week
 *         schema:
 *           type: integer
 *         description: Week number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of results
 *       - in: query
 *         name: stamnummer
 *         schema:
 *           type: string
 *         description: Club stamnummer (optioneel, default = L-0759)
 *     responses:
 *       200:
 *         description: List of wedstrijden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WedstrijdenResponse'
 */
wedstrijdRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ploeg = req.query.ploeg as string || '';
    const week = req.query.week ? parseInt(req.query.week as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const stamnummer = req.query.stamnummer as string | undefined;
    const data = await wedstrijdenService.getWedstrijden(ploeg, week, limit, stamnummer);
    const response: any = { success: true, data };
    if (data && data.length > 0) {
      response.reeksNamen = require('../service/teams.service').reeksNamen;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export { wedstrijdRouter };