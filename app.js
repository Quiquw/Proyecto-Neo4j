var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'SEAA'));
var session = driver.session();
var session2 = driver.session();
var session3 = driver.session();
var session4 = driver.session();

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/teams', function(req, res) {
    session
        .run('MATCH(n:Team) RETURN n LIMIT 25')
        .then(function(result) {
            var teamArr = [];
            result.records.forEach(function(record) {
                teamArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    base: record._fields[0].properties.base,
                    championships: record._fields[0].properties.championships,
                    image: record._fields[0].properties.image
                });
            });
            res.render('teams', {
                teams: teamArr
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get('/pilots', function(req, res) {
    session
        .run('MATCH(n:Pilot) RETURN n LIMIT 50')
        .then(function(result) {
            var pilotArr = [];
            result.records.forEach(function(record) {
                pilotArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    number: record._fields[0].properties.number,
                    country: record._fields[0].properties.country,
                    image: record._fields[0].properties.image
                });
            });
            res.render('pilots', {
                pilots: pilotArr
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post('/teams/add', function(req, res) {
    var name = req.body.name;
    var base = req.body.base;
    var championships = req.body.championships;
    var image = req.body.image;

    session2
        .run('CREATE(n:Team {name: $nameParam, base: $baseParam, championships: $championshipsParam, image:$imageParam}) RETURN n.name', { nameParam: name, baseParam: base, championshipsParam: championships, imageParam: image })
        .then(function(result) {
            res.setHeader('Acces-Control-Allow-Origin', '*');
            session2.close();
        })
        .catch(function(err) {
            console.log(err);
        });

    res.redirect('/teams');

});

app.post('/pilots/add', function(req, res) {
    var name = req.body.name;
    var number = req.body.number;
    var country = req.body.country;
    var image = req.body.image;

    session3
        .run('CREATE(n:Pilot {name: $nameParam, number: $numberParam, country: $countryParam, image: $imageParam}) RETURN n.name', { nameParam: name, numberParam: number, countryParam: country, imageParam: image })
        .then(function(result) {
            //res.setHeader('Acces-Control-Allow-Origin', '*');
        })
        .catch(function(err) {
            console.log(err);
        });

    res.redirect('/pilots');

});

app.post('/pilots/team/add', function(req, res) {
    var team = req.body.team;
    var pilot = req.body.pilot;

    session4
        .run('MATCH (a:Pilot {name:$pilotParam}), (b:Team {name:$teamParam}) MERGE(a)-[r:DRIVES_FOR]-(b) RETURN a,b', { pilotParam: pilot, teamParam: team })
        .then(function(result) {
            //res.setHeader('Acces-Control-Allow-Origin', '*');
            session4.close();
        })
        .catch(function(err) {
            console.log(err);
        });

    res.redirect('/pilots');

});

app.listen(3000);
console.log('Server Started on Port 3000');

module.exports = app;

/*                 

            var movieArr = [];

                movieArr.push({
                    id: record._fields[0].identity.low,
                    title: record._fields[0].title,
                    year: record._fields[0].year
                })

                */