var http = require('http');
var url = require('url');
var im = require('imagemagick');
var fs = require('fs');

http.createServer(function (req, res) {
	if (req.url.match("/IM")) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('Image Magick<br/>');

		var q = url.parse(req.url, true).query;
		console.log(q);
		console.log("Converting imagemagick " + q.src);

		im.convert([q.src, '-resize', q.size, 'output.jpg'],
		function(err, stdout){
			if (err) {
				res.write('<br/><h1>Failed to convert</h1>');
				res.end();
			} else {
				res.write('<img src="http://localhost:8080/img/output.jpg"></img>');
				res.end();
				console.log('>> Conversion done');
			}
		});

	} else if (req.url.match("/progressive")) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			data = fs.readFileSync("progressive-image.html");
			res.write(data);
			res.end();
			console.log("Page served for progressive image");

	} else if (req.url.match("/img/")) {
		var fname = req.url.slice(5)
		console.log("Reading file " + fname);

		fs.readFile(fname, function(err, data) {
			if (err) {
				res.writeHead(404, {'Content-Type': 'text/html' });
		 		res.end();
			} else {
				res.writeHead(200, {'Content-Type': 'image/gif' });
		 		res.end(data, 'binary');
		 	}
	 	});

	} else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write('Page not found "' + req.url + '"');
		res.end();
	}
}).listen(8080);
