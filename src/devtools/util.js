import { parseString } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors';

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

  getWebServiceName: async (rawRequestXML) => {
    return new Promise((resolve, reject) => {
      const parseConfig = { 
        tagNameProcessors: [stripPrefix] 
      };
      parseString(rawRequestXML, parseConfig, (err, result) => {
        if(err) {
          reject(err);
        } else {
          const SOAPBody = result.Envelope.Body[0];
          const webServiceName = Object.getOwnPropertyNames(SOAPBody)[0];
          resolve(webServiceName);
        }
      });
    });
  }

};