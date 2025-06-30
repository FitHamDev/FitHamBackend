import { VolleyAdminRepository } from '../repository/volleyadmin.repository';
import { Rangschikking } from '../utils/types';
import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

const volleyAdminRepo = new VolleyAdminRepository();

let allMatches: any[] = [];
try {
  allMatches = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/allMatches.json'), 'utf-8'));
} catch (error) {
  console.warn('Could not load allMatches.json, partial matching will not work:', error);
}

function resolveFullReeksnr(partialReeksnr: string, ploegnaam: string): string | null {
  const match = allMatches.find(match => {
    return (
      match.reeks && match.reeks.startsWith(partialReeksnr) &&
      (match.thuisploeg === ploegnaam || match.bezoekersploeg === ploegnaam)
    );
  });
  if (match) {
    return match.reeks;
  }
  const fallback = allMatches.find(match => match.reeks && match.reeks.startsWith(partialReeksnr));
  return fallback ? fallback.reeks : null;
}

const getRangschikking = async (
  reeksnr: string,
  stamnummer: string = 'L-0759',
  ploegnaam?: string
): Promise<Rangschikking[]> => {
  if (reeksnr.toLowerCase().includes('bvl')) return [];

  let fullReeksnr = reeksnr;
  if (reeksnr.length < 6 && ploegnaam) {
    const resolved = resolveFullReeksnr(reeksnr, ploegnaam);
    if (resolved) {
      console.log(`[Rangschikking] Resolved partial reeksnr '${reeksnr}' + ploegnaam '${ploegnaam}' to '${resolved}'`);
      fullReeksnr = resolved;
    } else {
      console.warn(`[Rangschikking] Could not resolve partial reeksnr '${reeksnr}' for ploegnaam '${ploegnaam}'`);
    }
  }

  let data: any;
  console.log(`[Rangschikking] Fetching for stamnummer: ${stamnummer}, reeksnr: ${fullReeksnr}`);
  data = await volleyAdminRepo.getRangschikking(stamnummer, fullReeksnr);
  console.log('[Rangschikking] Raw data:', JSON.stringify(data, null, 2));

  if (!data?.rangschikking?.rij && !data?.ploegen?.ploeg) return [];
  const rows = data.rangschikking?.rij || data.ploegen?.ploeg || [];
  return rows.map((item: any) => {
    const ploegnaam = item.ploegnaam?.[0] || item.naam?.[0] || '';
    return {
      volgorde: item.volgorde?.[0] || item.plaats?.[0] || '',
      ploegnaam,
      puntentotaal: item.puntentotaal?.[0] || item.punten?.[0] || ''
    };
  });
};

export default { getRangschikking };