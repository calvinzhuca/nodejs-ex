var express = require('express');
var app = express();
bodyParser = require('body-parser'),
app.use(bodyParser.json());


app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";



app.get('/', function(req, res) {
	var result = [
	  { status : "strange"}
	];
  res.json(result);
});

app.get('/hello', function(req, res) {
	var result = [
	  { status : "hello 2"}
	];
  res.json(result);
});

app.post('/process', function(req, res) {
  if(!req.body.hasOwnProperty('creditCardNumber') || !req.body.hasOwnProperty('verificationCode')) {
    res.statusCode = 400;
    return res.send('Error 400: need to have valid creditCardNumber and verificationCode.');
  }

  var transcation = {
    creditCardNumber : req.body.creditCardNumber,
    verificationCode : req.body.verificationCode,
    expMonth : req.body.expMonth,
    expYear : req.body.expYear,
    billingAddress : req.body.billingAddress,
    verificationCode : req.body.verificationCode
  };
	console.log("expYear: " + transcation.expYear);
	console.log("expMonth: " + transcation.expMonth);

	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	console.log("year: " + year);
	console.log("month: " + month);

	var stat = 'SUCCESS';

	if (transcation.expYear < year || ((transcation.expYear == year) && (transcation.expMonth <= month)) )
		stat = 'FAILURE'


	var randomInt = (Math.random() * 9000000 + 1000000) | 0;
	var result = [
	  { status : stat,
	  name : req.body.customerName,
	  orderNumber : req.body.orderNumber,
	  transactionDate : date,
	  transactionNumber : randomInt}
	];

	  res.json(result);
});



app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
