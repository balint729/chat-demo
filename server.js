const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/eventstream', (req, res, next) => {
	res.set({
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
	app.on('message', data => {
		res.write(`event: message\n`);
		res.write(`data: ${JSON.stringify(data)}\n\n`);
	});
});

app.post('/message', (req, res, next) => {
    console.log(req.body);
	const message = req.body.message;
	// ...
	// Some code here to handle the message, 
	// by saving it in a database for instance
	// ...
	app.emit('message', {
		title: 'New message!',
		message,
		timestamp: new Date()
	});
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on PORT ${8080}`);

});