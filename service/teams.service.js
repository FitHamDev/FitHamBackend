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
exports.getTeams = exports.reeksNamen = exports.teams = void 0;
exports.teams = [
    { reeks: "LHP1", naam: "Heren A", kort: "HA" },
    { reeks: "LHP3", naam: "Heren B", kort: "HB" },
    { reeks: "LHP3", naam: "Heren C", kort: "HC" },
    { reeks: "LDP1", naam: "Dames A", kort: "DA" },
    { reeks: "LDP1", naam: "Dames B", kort: "DB" }
];
exports.reeksNamen = {
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
const getTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    return exports.teams;
});
exports.getTeams = getTeams;
exports.default = { getTeams: exports.getTeams };
