import { VolleyAdminRepository } from '../repository/volleyadmin.repository';
import { Wedstrijd } from '../utils/types';
import { parse, getWeek } from 'date-fns';
import { reeksNamen } from './teams.service';

const volleyAdminRepo = new VolleyAdminRepository();

function findReeksNaam(reeks: string): string | undefined {
  if (reeksNamen[reeks]) return reeksNamen[reeks];
  // Partial match: return the first mapping where the key is a substring of the reeks
  const found = Object.entries(reeksNamen).find(([key]) => reeks.includes(key));
  return found ? found[1] : undefined;
}

const getWedstrijden = async (ploeg: string, week?: number, limit?: number, stamnummer: string = 'L-0759'): Promise<Wedstrijd[]> => {
  const data = await volleyAdminRepo.getWedstrijden(ploeg, stamnummer);
  if (!data?.kalender?.wedstrijd) return [];
  let wedstrijden: Wedstrijd[] = data.kalender.wedstrijd
    .map((item: any) => {
      const datum = item.datum?.[0] || '';
      const aanvangsuur = item.aanvangsuur?.[0] || '';
      // Try to parse timestamp from datum and aanvangsuur if not present
      let timestamp = 0;
      if (datum && aanvangsuur) {
        // Try d/M/Y H:i
        const parsed = parse(`${datum} ${aanvangsuur}`, 'd/M/yyyy H:mm', new Date());
        if (!isNaN(parsed.getTime())) {
          timestamp = Math.floor(parsed.getTime() / 1000);
        }
      }
      // Calculate week if not present
      let weekNr = 0;
      if (datum) {
        const parsed = parse(datum, 'd/M/yyyy', new Date());
        if (!isNaN(parsed.getTime())) {
          weekNr = getWeek(parsed, { weekStartsOn: 1 });
        }
      }
      const reeks = item.reeks?.[0] || '';
      return {
        type: 'competitie',
        datum,
        aanvangsuur,
        reeks,
        reeksnaam: findReeksNaam(reeks),
        thuisploeg: item.thuisploeg?.[0] || '',
        bezoekersploeg: item.bezoekersploeg?.[0] || '',
        uitslag: item.uitslag?.[0] || '',
        stamnummer_thuisclub: item.stamnummer_thuisclub?.[0] || '',
        stamnummer_bezoekersclub: item.stamnummer_bezoekersclub?.[0] || '',
        week: item.week ? parseInt(item.week[0]) : weekNr,
        timestamp: item.timestamp ? parseInt(item.timestamp[0]) : timestamp
      };
    });
  // Filter op stamnummer indien opgegeven
  if (stamnummer) {
    wedstrijden = wedstrijden.filter(
      w => w.stamnummer_thuisclub === stamnummer || w.stamnummer_bezoekersclub === stamnummer
    );
  }
  if (week) wedstrijden = wedstrijden.filter((w: Wedstrijd) => w.week === week);
  if (limit) wedstrijden = wedstrijden.slice(0, limit);
  return wedstrijden;
};

export default { getWedstrijden };