const cheerio = require("cheerio");
const request = require("request");
const appModel = require("../models/appModel");

exports.fetch = function(req, res){
	
	request("https://www.washingtonpost.com/",
		function(error, response, html) {
			const $ = cheerio.load(html);

			const results = [];

			$("div.headline").each( function(i, element) {

				const title = $(element).children("a").text();
				const link = $(element).children("a").attr("href");
				const summary = $(element).siblings("div.blurb").text();

				console.log("this is : " + summary);

				newArticle = new appModel();
				newArticle.headline = title;
				newArticle.URL = link;
				newArticle.summary = summary;
				newArticle.saved = false;

				newArticle.save()
					.catch( function(err) {
						console.log("this is : " + err);
					});

				results.push({
					headline : title,
					URL : link,
					summary: summary,
					saved: false
				})
			});

		res.json(results);		
	});
};

exports.getHeadlines = function(req, res){

	const saved = req.params.saved

	appModel.find({saved: saved}, function(err, docsFound){
		if(err){
			return err;
		};

		res.json(docsFound);
	})
};

exports.saveUnsavePage = function(req, res){

	var query = { _id: req.body.id };
	var saved = { saved: req.body.saved };
	console.log(query);
	
	appModel.findOneAndUpdate(query, saved, function(err, docAffected){
			if(err){
				console.log(err);
			};
		// console.log(docAffected);	
		res.json(docAffected);
	});
};

exports.saveNotes = function(req, res){

	var query = { _id: req.body.id};
	var note = req.body.note;

	appModel.findOneAndUpdate(query, { $push: {"notes": note}}, function(err, docAffected){
			if(err){
				console.log(err);
			};
		console.log(docAffected);

		res.json(docAffected);
	})
};

exports.getNotes = function(req, res){
	const id = req.params.article_id;
	console.log(id);

	appModel.find({_id: id}, 'notes', function(err, docsFound){
		if(err){
			return err;
		};
		console.log(docsFound);
		res.json(docsFound);
	})
};

exports.deleteNotes = function(req, res){
	const query = {_id : req.params.article_id};
	const text = req.body.text;

	console.log("\n" + text);
	console.log("\n this is delete \n");

	appModel.findOneAndUpdate(query, { $pull: {"notes": text}}, function(err, docAffected){
			if(err){
				console.log("delete is: " + err);
			};
		console.log(docAffected);

		res.json(docAffected);
	})

}

exports.index = function(req, res){
	appModel.find({}, function(err, docsFound){

		if (err){
			return res.json(err);
		}

		res.json(docsFound);
	})
};

