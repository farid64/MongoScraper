'use stricct';

const mongoose = require('mongoose');

const appSchema = mongoose.Schema({

	headline: {
		type: String,
		min: 1,
		required: true
	},
	summary: {
		type: String,
		min: 1,
		requied: false
	},
	URL: {
		type: String,
		min: 1,
		requied: true
	},
	saved: {
		type : Boolean,
		default: false,
		required: true
	},
	notes: {
		type: Array,
		default: [],
		required: false
	}
});

module.exports = mongoose.model('appModel', appSchema);