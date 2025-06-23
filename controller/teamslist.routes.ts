import express, { Request, Response, NextFunction } from 'express';
import teamsService from '../service/teams.service';

const teamsListRouter = express.Router();

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
teamsListRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await teamsService.getTeams();
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
  } catch (error) {
    next(error);
  }
});

export { teamsListRouter };
