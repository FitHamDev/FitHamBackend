import express, { Request, Response, NextFunction } from 'express';
import teamsService from '../service/teams.service';

const teamRouter = express.Router();

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
teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await teamsService.getTeams();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export { teamRouter };