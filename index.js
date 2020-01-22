exports.handler = async (event) => {
    console.log('event = ' + JSON.stringify(event)); // otherwise won't show
    
    if (event.httpMethod == "POST" && event.headers["User-Agent"] == "Starling-Bank-Web-Hook") {
        console.log("We have received a notification from Starling bank");
        
       let webhookSecret = process.env.webhookSecret; // this must be set in Environment variables

        // inspiration from
        // https://stackoverflow.com/questions/56664705/nodejs-base-64-encoding-of-the-sha-512-digest/59738487#59738487
    
        const crypto = require('crypto');
    
      let hash = crypto.createHash('sha512');
      hash.update(webhookSecret+event.body);
    
      const sigCheck = hash.digest('base64');
      const valid = sigCheck==event.headers['X-Hook-Signature'];
      
      if (valid) {
          console.log("Received valid request from Starling bank");
          
          let eb = JSON.parse(event.body);
          
          let webhookNotificationUid = eb.webhookNotificationUid;
          console.log(webhookNotificationUid);
          
          let timestamp = eb.timestamp;
          console.log(timestamp);
          
          let c = eb.content;
          console.log(c);
          
          let cclass = c.class;
          console.log(cclass);
          
          let transactionUid = c.transactionUid;
          console.log(transactionUid);
          
          let amount = c.amount;
          console.log(amount);
          
          let sourceCurrency = c.sourceCurrency;
          console.log(sourceCurrency);
          
          let sourceAmount = c.sourceAmount;
          console.log(sourceAmount);
          
          let counterParty = c.counterParty;
          console.log(counterParty);
          
          let reference = c.reference;
          console.log(reference);
          
          let type = c.type;
          console.log(type);
          
          let forCustomer = c.forCustomer;
          console.log(forCustomer);
          
          let accountHolderUid = eb.accountHolderUid;
          console.log(accountHolderUid);
          
          let webhookType = eb.webhookType;
          console.log(webhookType);
          
          let uid = eb.uid;
          console.log(uid);
          
          let customerUid = eb.customerUid;
          console.log(customerUid);
          
          // use values here and do what you want
          
          
              const response = {
                statusCode: 200,
                body: JSON.stringify('Thanks for the notification Starling!'),
            };
            return response;
      }
        
    }
    

    const response = {
        statusCode: 404,
        body: JSON.stringify('404 error self inflicted'),
    };
    return response;

};
