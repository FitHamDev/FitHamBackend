import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export class VolleyAdminRepository {
  private readonly baseUrl = 'https://www.volleyadmin2.be/services';

  async getWedstrijden(ploeg: string, stamnummer: string): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/wedstrijden_xml.php?stamnummer=${stamnummer}&reeks=${ploeg}`,
      { timeout: 10000 }
    );
    console.log('VolleyAdmin XML wedstrijden response:', response.data);
    return parseStringPromise(response.data as string);
  }

  async getRangschikking(stamnummer: string, reeks: string): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/rangschikking_xml.php?stamnummer=${stamnummer}&reeks=${reeks}`,
      { timeout: 10000 }
    );
    console.log('VolleyAdmin XML rangschikking response:', response.data);
    return parseStringPromise(response.data as string);
  }
}