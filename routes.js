module.exports = function(app){

	const application = require('./routing/application');
	const saved = require('./routing/saved');
	const api = require('./routing/api');

	app.use('/', application);
	app.use('/saved', saved);
	app.use('/api', api);
}