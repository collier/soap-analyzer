import { parseString } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors';
import cheerio from 'cheerio';

var self = module.exports = {

  isSOAPRequest: (request) => {
    const { headers } = request.request;
    const contentType = headers.find((header) => {
      return header.name === 'Content-Type';
    });
    if(contentType) {
      //If the content type header contains 'text/xml'
      if(contentType.value.indexOf('text/xml') > -1) {
        return true;
      }
    }
    return false;
  },

  getWebServiceName: async (xml) => {
    return new Promise((resolve, reject) => {
      const parseConfig = {
        tagNameProcessors: [stripPrefix]
      };
      parseString(xml, parseConfig, (err, result) => {
        if(err) {
          reject(err);
        } else {
          const SOAPBody = result.Envelope.Body[0];
          const webServiceName = Object.getOwnPropertyNames(SOAPBody)[0];
          resolve(webServiceName);
        }
      });
    });
  },

  removeXmlns: (xml) => {
    const $ = cheerio.load(xml, { xmlMode: true });
    $('*').each((i, elem) => {
      Object.keys(elem.attribs).forEach(key => {
        if(key.startsWith('xmlns')) {
          delete elem.attribs[key];
        }
      });
    });
    return $.xml();
  },

  getSoapBodyContents: (xml) => {
    const $ = cheerio.load(xml, { xmlMode: true });
    return cheerio.xml($('SOAP\\:Body > :first-child'));
  }

};
