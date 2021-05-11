var express = require('express');
var path = require('path');
var logger = require('morgan');
var neo4j = require('neo4j-driver');

var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'SEAA'));
var session = driver.session();

app.get('/', function (req, res) {
    session
        .run('MATCH(n) RETURN n LIMIT 25')
        .then(function (result) {
            result.records.forEach(function (record) {
                // console.log(record._fields[0].properties);
            });
            res.render("index")
        })
        .catch(function (err) {
            console.log(err);
        });
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