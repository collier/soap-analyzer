$(document).ready(function() {

  $('.make-call').click(function() {
    $.ajax({
      url: 'http://example.com', 
      type: 'POST',
      dataType: 'xml',
      contentType: 'text/xml',
      processData: false,
      data: [
        '<soapenv:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">',
          '<soapenv:Body>',
            '<CompleteGiveKudos>',
              '<VendorNumber></VendorNumber>',
              '<MessageText></MessageText>',
            '</CompleteGiveKudos>',
          '</soapenv:Body>',
        '</soapenv:Envelope>'
      ].join(''),
      success: function(data) { console.log(data) }
    });
  });
  
});
