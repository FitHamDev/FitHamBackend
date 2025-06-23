import {  TeamMappingEntry } from '../utils/types';



export const teams: TeamMappingEntry[] = [
  { reeks: "LHP1", naam: "Heren A", kort: "HA" },
  { reeks: "LHP3", naam: "Heren B", kort: "HB" },
  { reeks: "LHP3", naam: "Heren C", kort: "HC" },
  { reeks: "LDP1", naam: "Dames A", kort: "DA" },
  { reeks: "LDP1", naam: "Dames B", kort: "DB" }
];

export const reeksNamen: { [key: string]: string } = {
  LHP1: "Heren Promo 1",
  LHP2: "Heren Promo 2",
  LHP3: "Heren Promo 3",
  LDP1: "Dames Promo 1",
  LDP2: "Dames Promo 2",
  LDP3: "Dames Promo 3",
  LDP4: "Dames Promo 4",
  JU17: "Jongens U17",
  JU19: "Jongens U19",
  JU15: "Jongens U15",
  JU13: "Jongens U13",
  JU11: "Jongens U11",
  MU17: "Meisjes U17",
  MU19: "Meisjes U19",
  MU15: "Meisjes U15",
  MU13: "Meisjes U13",
  MU11: "Meisjes U11",
  BVL: "Beker van Limburg"
  
};

export const getTeams = async (): Promise<TeamMappingEntry[]> => {
  return teams;
};

export default { getTeams };