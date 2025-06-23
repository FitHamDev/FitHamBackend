import express, { Request, Response, NextFunction } from 'express';
import wedstrijdenService from '../service/wedstrijden.service';
import teamsService from '../service/teams.service';
import { parse } from 'date-fns';

const welkomRouter = express.Router();

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
welkomRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const huidiguur = req.query.huidiguur as string | undefined;
    let now = new Date();
    if (huidiguur) {
      const parsed = parse(huidiguur, 'd/M/yyyy H:mm', new Date());
      if (!isNaN(parsed.getTime())) now = parsed;
    }
    const week = undefined; // show all weeks
    const wedstrijden = await wedstrijdenService.getWedstrijden('', week);
    const teams = await teamsService.getTeams();
    const huidigTimestamp = Math.floor(now.getTime() / 1000);
    const result: { team: string; tegenstrever: string }[] = [];
    for (const wedstrijd of wedstrijden) {
      const wedstrijdmoment = wedstrijd.timestamp;
      const reeks = wedstrijd.reeks;
      // Zoek de korte naam van het team op basis van de reeks
      const teamObj = teams.find(t => t.reeks === reeks);
      let reeksvcm = teamObj ? teamObj.kort : 'VCM';
      let thuisvcm = wedstrijd.stamnummer_thuisclub === 'VB-1591';
      let uitvcm = wedstrijd.stamnummer_bezoekersclub === 'VB-1591';
      let tegenstrever = '';
      if (thuisvcm) tegenstrever = wedstrijd.bezoekersploeg;
      else if (uitvcm) tegenstrever = wedstrijd.thuisploeg;
      else continue;
      // Show from 1 hour before to 3 hours after
      const minRange = wedstrijdmoment - 60 * 60;
      const maxRange = wedstrijdmoment + 180 * 60;
      if (thuisvcm && huidigTimestamp > minRange && huidigTimestamp < maxRange) {
        result.push({ team: reeksvcm, tegenstrever });
      }
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

export { welkomRouter };
