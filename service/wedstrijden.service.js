"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const volleyadmin_repository_1 = require("../repository/volleyadmin.repository");
const date_fns_1 = require("date-fns");
const teams_service_1 = require("./teams.service");
const volleyAdminRepo = new volleyadmin_repository_1.VolleyAdminRepository();
function findReeksNaam(reeks) {
    if (teams_service_1.reeksNamen[reeks])
        return teams_service_1.reeksNamen[reeks];
    // Partial match: return the first mapping where the key is a substring of the reeks
    const found = Object.entries(teams_service_1.reeksNamen).find(([key]) => reeks.includes(key));
    return found ? found[1] : undefined;
}
const getWedstrijden = (ploeg, week, limit, stamnummer = 'L-0759') => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield volleyAdminRepo.getWedstrijden(ploeg, stamnummer);
    if (!((_a = data === null || data === void 0 ? void 0 : data.kalender) === null || _a === void 0 ? void 0 : _a.wedstrijd))
        return [];
    let wedstrijden = data.kalender.wedstrijd
        .map((item) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const datum = ((_a = item.datum) === null || _a === void 0 ? void 0 : _a[0]) || '';
        const aanvangsuur = ((_b = item.aanvangsuur) === null || _b === void 0 ? void 0 : _b[0]) || '';
        // Try to parse timestamp from datum and aanvangsuur if not present
        let timestamp = 0;
        if (datum && aanvangsuur) {
            // Try d/M/Y H:i
            const parsed = (0, date_fns_1.parse)(`${datum} ${aanvangsuur}`, 'd/M/yyyy H:mm', new Date());
            if (!isNaN(parsed.getTime())) {
                timestamp = Math.floor(parsed.getTime() / 1000);
            }
        }
        // Calculate week if not present
        let weekNr = 0;
        if (datum) {
            const parsed = (0, date_fns_1.parse)(datum, 'd/M/yyyy', new Date());
            if (!isNaN(parsed.getTime())) {
                weekNr = (0, date_fns_1.getWeek)(parsed, { weekStartsOn: 1 });
            }
        }
        const reeks = ((_c = item.reeks) === null || _c === void 0 ? void 0 : _c[0]) || '';
        return {
            type: 'competitie',
            datum,
            aanvangsuur,
            reeks,
            reeksnaam: findReeksNaam(reeks),
            thuisploeg: ((_d = item.thuisploeg) === null || _d === void 0 ? void 0 : _d[0]) || '',
            bezoekersploeg: ((_e = item.bezoekersploeg) === null || _e === void 0 ? void 0 : _e[0]) || '',
            uitslag: ((_f = item.uitslag) === null || _f === void 0 ? void 0 : _f[0]) || '',
            stamnummer_thuisclub: ((_g = item.stamnummer_thuisclub) === null || _g === void 0 ? void 0 : _g[0]) || '',
            stamnummer_bezoekersclub: ((_h = item.stamnummer_bezoekersclub) === null || _h === void 0 ? void 0 : _h[0]) || '',
            week: item.week ? parseInt(item.week[0]) : weekNr,
            timestamp: item.timestamp ? parseInt(item.timestamp[0]) : timestamp
        };
    });
    // Filter op stamnummer indien opgegeven
    if (stamnummer) {
        wedstrijden = wedstrijden.filter(w => w.stamnummer_thuisclub === stamnummer || w.stamnummer_bezoekersclub === stamnummer);
    }
    if (week)
        wedstrijden = wedstrijden.filter((w) => w.week === week);
    if (limit)
        wedstrijden = wedstrijden.slice(0, limit);
    return wedstrijden;
});
exports.default = { getWedstrijden };
