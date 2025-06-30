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
 *     summary: Get ranking for a team (reeks).
 *     parameters:
 *       - in: query
 *         name: reeks
 *         schema:
 *           type: string
 *         required: true
 *         description: Reeks code (required)
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
 *         description: Missing reeks parameter
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
    const ploegnaam = req.query.ploegnaam as string | undefined;
    const data = await rangschikkingService.getRangschikking(reeks, stamnummer, ploegnaam);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export { rangschikkingRouter };