// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html

var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1"
});

var db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {

var results = [];
var balances = [];

var balanceQuery = {
    TableName: "Balance",
    KeyConditionExpression: "currentBalance = :id",
    Limit: 1,
    // ScanIndexForward: false,    // true = ascending, false = descending
    ExpressionAttributeValues: {
        ":id" : 0 
    }
};

// const promise1 = new Promise(function(resolve, reject) {
    // console.log("p1");
async function getBalance() {
  return new Promise(function(resolve, reject) {
    var html = "";
db.query(balanceQuery, function(err, data) {
    if (err) {
        console.error("Unable to query balance. Error:", JSON.stringify(err, null, 2));
    } else {
        var i = 0; 
        console.log("bal query succeeded.");
        data.Items.forEach(function(item) {
            balances[i] = {
              "bankbalance": item.bankbalance
            };
            
            i++;
        });

            // console.log(results);
            
            
            balances.forEach(function(data){
                // console.log(data.amount);
                html += '<div align="center">'+data.bankbalance.toFixed(2)+'</div>';
            });
                
            console.log(html);
            // resolve(html);
            resolve(html);
    }
    
    
})
})
// console.log(html);



}
    
// });  
    
var query = {
    TableName: "StarlingBank",
    KeyConditionExpression: "id = :id",
    Limit: 100,
    ScanIndexForward: false,    // true = ascending, false = descending
    ExpressionAttributeValues: {
        ":id" : 0 
    }
};
        
// const promise2 = new Promise(function(resolve, reject) {
    // console.log("p2");
    async function getTransactions() {
        return new Promise(function(resolve, reject) {
            var html = "";
    db.query(query, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
                html += '<table width="100%" cellpadding="2" cellspacing="5" border="0">';
        var i = 0; 
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            results[i] = {
              "accountHolderUid": item.accountHolderUid,
              "amount": item.amount,
              "class": item.class,
              "counterParty": item.counterParty,
              "customerUid": item.customerUid,
              "forCustomer": item.forCustomer,
              "reference": item.reference,
              "sourceAmount": item.sourceAmount,
              "sourceCurrency": item.sourceCurrency,
              "timestamp": item.timestamp,
              "transactionUid": item.transactionUid,
              "type": item.type,
              "uid": item.uid,
              "webhookNotificationUid": item.webhookNotificationUid,
              "webhookType": item.webhookType,
              "notes": item.notes
            };
            
            i++;
        });

            // console.log(results);
            
            
            results.forEach(function(data){
                // console.log(data.amount);
                var y = data.timestamp.substr(0, 4);
                var m = data.timestamp.substr(5, 2);
                var d = data.timestamp.substr(8, 2);
                var t = data.timestamp.substr(11, 5);
                var time = d + '/' + m + '/' + y + ' ' + t;
                html += '<tr><td>'+time+'</td><td>'+data.counterParty+'<br>'+data.forCustomer+'</td><td>'+data.amount+'</td></tr>';
            });
            
                    html += '</table>';
                console.log(html);    
                resolve(html);
            
    }

        
    })
    
})};    
    


    
// Promise.all([promise1, promise2]).then(function(values) {
//   console.log(values);
// });
    
//     let showBalance = async function() { // Async function expression
//   getBalance() // returns a promise
//     .then(function(value) {
//       console.log("showBalance: "+value);
    
//   context.done(null, value);
//     });
// }

// function showBalance() {
//   let promises = [];
//   promises[0] = getBalance();
//   Promise.all(promises)
//     .then(function(values) {
//       console.log(values);
//       context.done(null, values[0]);
//     })
//     // .catch(function(err) {
//     //   console.log(err);
//     // });
// }
    
let b = await getBalance();
let t = await getTransactions();
context.done(null, b+t);
    
};
