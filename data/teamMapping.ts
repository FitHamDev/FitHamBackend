// Team mapping based on the original PHP implementation
export const teams: Record<string, string> = {
    "VDP2-B": "Dames A",
    "VDP4-B": "Dames B",
    "VJU19N2R1": "U19J",
    "VJU15N2R1-A": "U15J",
    "VJU11-3-3-N1R1": "U11J",
    "VMU17N1R1-A": "U17MB",
    "VMU17N2R1-A": "U17MA",
    "VMU17N2R1-C": "U17MC",
    "VMU15N2R1-A": "U15M",
    "VMU13N2R1-A": "U13MA",
    "VMU13N2R1-B": "U13MB",
    "VMU11-2-2-N1R1": "U11M",
    "VXU11-2-2-N3R1-B": "U11X",
    "VJU19N2R2": "U19J",
    "VJU15N2R2-C": "U15J",
    "VJU11-3-3-N1R2": "U11J",
    "VMU17N2R2-B": "U17MA",
    "VMU17N2R2-E": "U17MC",
    "VMU15N2R2-F": "U15M",
    "VMU13N2R2-C": "U13MA",
    "VMU13N2R2-F": "U13MB",
    "VMU11-2-2-N1R2": "U11MA",
    "VMU11-2-2-N2R2-B": "U11MB",
    "XU11-2-2-N3R2-C": "U11X",
    "vrodis": "Vrodis",
    "gwwb": "GWWB",
    "dovros": "DoVro's",
    "meulstee": "Meulstee",
    "VBJU11": "U11J (Beker)"
};

export const teamsKort: Record<string, string> = {
    "VDP2-B": "Promo 2",
    "VDP4-B": "Promo 4",
    "VJU19N2R1": "U19J",
    "VJU15N2R1-A": "U15J",
    "VJU11-3-3-N1R1": "U11J",
    "VMU17N1R1-A": "U17M",
    "VMU17N2R1-A": "U17M",
    "VMU17N2R1-C": "U17M",
    "VMU15N2R1-A": "U15M",
    "VMU13N2R1-A": "U13M",
    "VMU13N2R1-B": "U13M",
    "VMU11-2-2-N1R1": "U11M",
    "VXU11-2-2-N3R1-B": "U11X",
    "VJU19N2R2": "U19J",
    "VJU15N2R2-C": "U15J",
    "VJU11-3-3-N1R2": "U11J",
    "VMU17N2R2-B": "U17M",
    "VMU17N2R2-E": "U17M",
    "VMU15N2R2-F": "U15M",
    "VMU13N2R2-C": "U13M",
    "VMU13N2R2-F": "U13M",
    "VMU11-2-2-N1R2": "U11M",
    "VMU11-2-2-N2R2-B": "U11M",
    "XU11-2-2-N3R2-C": "U11X",
    "vrodis": "Vrodis",
    "gwwb": "GWWB",
    "dovros": "DoVro's",
    "meulstee": "Meulstee",
    "VBJU11": "U11J (Beker)"
};

export function getTeamDisplayName(reeks: string, useShort: boolean = false): string {
    const mapping = useShort ? teamsKort : teams;
    return mapping[reeks] || reeks;
}
