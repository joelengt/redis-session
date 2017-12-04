
var express = require('express')

var app = express()
var port = 8787

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
 
// var options = {
//      client: clientStore,
// 	host: 'localhost'
// 	port: '6379',
// 	pass: ''
// }

// to store the session directly on redis
app.use(session({
    store: new RedisStore(), // options
    secret: 'keyboard cat'
}));


app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})

// Redding user session data
app.get('/', function(req, res) {
	console.log('home', req.session)
	res.send('done')
})

// Setting user session data
app.get('/last', function(req, res) {
	req.session.user = { id: '1', name: 'joel' }
	res.send('done')
})

app.listen(port, () => {
	console.log(`Server started in ${port}`)
})
