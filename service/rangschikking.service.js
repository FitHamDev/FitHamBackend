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
const volleyAdminRepo = new volleyadmin_repository_1.VolleyAdminRepository();
const getRangschikking = (ploeg, stamnummer = 'L-0759') => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let data;
    data = yield volleyAdminRepo.getRangschikking(ploeg, stamnummer);
    if (!((_a = data === null || data === void 0 ? void 0 : data.rangschikking) === null || _a === void 0 ? void 0 : _a.rij) && !((_b = data === null || data === void 0 ? void 0 : data.ploegen) === null || _b === void 0 ? void 0 : _b.ploeg))
        return [];
    // Support both possible XML structures
    const rows = ((_c = data.rangschikking) === null || _c === void 0 ? void 0 : _c.rij) || ((_d = data.ploegen) === null || _d === void 0 ? void 0 : _d.ploeg) || [];
    return rows.map((item) => {
        var _a, _b, _c, _d, _e, _f;
        const ploegnaam = ((_a = item.ploegnaam) === null || _a === void 0 ? void 0 : _a[0]) || ((_b = item.naam) === null || _b === void 0 ? void 0 : _b[0]) || '';
        return {
            volgorde: ((_c = item.volgorde) === null || _c === void 0 ? void 0 : _c[0]) || ((_d = item.plaats) === null || _d === void 0 ? void 0 : _d[0]) || '',
            ploegnaam,
            puntentotaal: ((_e = item.puntentotaal) === null || _e === void 0 ? void 0 : _e[0]) || ((_f = item.punten) === null || _f === void 0 ? void 0 : _f[0]) || ''
        };
    });
});
exports.default = { getRangschikking };
