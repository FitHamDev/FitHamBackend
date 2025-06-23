import { VolleyAdminRepository } from '../repository/volleyadmin.repository';
import { Rangschikking } from '../utils/types';
import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

const volleyAdminRepo = new VolleyAdminRepository();

const getRangschikking = async (ploeg: string, stamnummer: string = 'L-0759'): Promise<Rangschikking[]> => {
  let data: any;
  
  data = await volleyAdminRepo.getRangschikking(ploeg, stamnummer);
  
  if (!data?.rangschikking?.rij && !data?.ploegen?.ploeg) return [];
  // Support both possible XML structures
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