import express, { Request, Response, NextFunction } from 'express';
import rangschikkingService from '../service/rangschikking.service';

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
const rangschikkingRouter = express.Router();

rangschikkingRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reeks = req.query.reeks as string;
    if (!reeks) {
      return res.status(400).json({ success: false, error: 'Reeks parameter is vereist' });
    }
    const stamnummer = req.query.stamnummer as string | undefined;
    const data = await rangschikkingService.getRangschikking(reeks, stamnummer);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export { rangschikkingRouter };