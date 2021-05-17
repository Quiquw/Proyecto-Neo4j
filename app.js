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

app.get('/', function(req,res){
    res.render('index');
})

app.get('/teams', function(req, res){
    session
        .run('MATCH(n:Team) RETURN n LIMIT 25')
        .then(function(result){
            var teamArr = [];
            result.records.forEach(function(record){
                teamArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    base: record._fields[0].properties.base,
                    championships: record._fields[0].properties.championships
                });
            });
           res.render('teams', {
               teams: teamArr
           });
        })
        .catch(function(err){
            console.log(err);
        });
});

app.get('/pilots', function(req, res){
    session
        .run('MATCH(n:Pilot) RETURN n LIMIT 25')
        .then(function(result){
            var pilotArr = [];
            result.records.forEach(function(record){
                pilotArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    number: record._fields[0].properties.number,
                    country: record._fields[0].properties.country

                });
            });
           res.render('pilots', {
               pilots: pilotArr
           });
        })
        .catch(function(err){
            console.log(err);
        });
});

app.post('/teams/add', function(req,res){
    var name = req.body.name;
    var base = req.body.base;
    var championships = req.body.championships;

    session
        .run('CREATE(n:Team {name:{nameParam}, {base:{baseParam}, {championships:{championshipsParam}}) RETURN n.name', {nameParam:name, baseParam:base, championshipsParam:championships})
        .then(function(result){
            res.redirect('/');
            session.close();
        })
        .catch(function(err){
            console.log(err);
        });

    
    res.redirect('/');

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