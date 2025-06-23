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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolleyAdminRepository = void 0;
const axios_1 = __importDefault(require("axios"));
const xml2js_1 = require("xml2js");
class VolleyAdminRepository {
    constructor() {
        this.baseUrl = 'https://www.volleyadmin2.be/services';
    }
    getWedstrijden(ploeg, stamnummer) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.baseUrl}/wedstrijden_xml.php?stamnummer=${stamnummer}&reeks=${ploeg}`, { timeout: 10000 });
            console.log('VolleyAdmin XML wedstrijden response:', response.data);
            return (0, xml2js_1.parseStringPromise)(response.data);
        });
    }
    getRangschikking(ploeg, stamnummer) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.baseUrl}/rangschikking_xml.php?stamnummer=${stamnummer}&reeks=${ploeg}`, { timeout: 10000 });
            return (0, xml2js_1.parseStringPromise)(response.data);
        });
    }
}
exports.VolleyAdminRepository = VolleyAdminRepository;
