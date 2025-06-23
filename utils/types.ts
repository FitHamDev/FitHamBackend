export interface Wedstrijd {
  type: 'competitie' | 'recreatief';
  datum: string;
  aanvangsuur: string;
  reeks: string;
  reeksnaam?: string; // Optional: readable name for the reeks
  thuisploeg: string;
  bezoekersploeg: string;
  uitslag: string;
  stamnummer_thuisclub: string;
  stamnummer_bezoekersclub: string;
  week: number;
  timestamp: number;
}

export interface Rangschikking {
  volgorde: string;
  ploegnaam: string;
  puntentotaal: string;
  isVCM: boolean;
}

export interface TeamMappingEntry {
  reeks: string;        
  naam: string;       
  kort: string;       
}