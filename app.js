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

var session = driver.session({
    database: 'formula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session2 = driver.session({
    database: 'formula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session3 = driver.session({
    database: 'formula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session4 = driver.session({
    database: 'formula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session5 = driver.session({
    database: 'formula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session6 = driver.session({
    database: 'formula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session7 = driver.session({
    database: 'myformula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session8 = driver.session({
    database: 'myformula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session9 = driver.session({
    database: 'myformula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session10 = driver.session({
    database: 'myformula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session11 = driver.session({
    database: 'myformula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session12 = driver.session({
    database: 'myformula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session20 = driver.session({
    database: 'formula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session21 = driver.session({
    database: 'myformula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session22 = driver.session({
    database: 'formula1',
    defaultAccessMode: neo4j.session.WRITE
});
var session23 = driver.session({
    database: 'myformula1',
    defaultAccessMode: neo4j.session.WRITE
});

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/index2', function(req, res) {
    res.render('index2');
})

app.get('/index3', function(req, res) {
    res.render('index3');
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
            //  session2.close();
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
            // session4.close();
        })
        .catch(function(err) {
            console.log(err);
        });

    res.redirect('/pilots');

});

app.post('/teams/delete', function(req, res) {

    var name = req.body.name;
    session5
        .run('MATCH(n:Team {name: $nameParam}) DETACH DELETE n', { nameParam: name })
        .then(function(result) {

        })
        .catch(function(err) {
            console.log();
        });
    res.redirect('/teams');
});

app.post('/pilots/delete', function(req, res) {

    var name = req.body.name;
    session6
        .run('MATCH(n:Pilot {name: $nameParam}) DETACH DELETE n', { nameParam: name })
        .then(function(result) {

        })
        .catch(function(err) {
            console.log();
        });
    res.redirect('/pilots');
});


app.get('/myteams', function(req, res) {
    session7
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
            res.render('myteams', {
                teams: teamArr
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get('/mypilots', function(req, res) {
    session7
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
            res.render('mypilots', {
                pilots: pilotArr
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post('/myteams/add', function(req, res) {
    var name = req.body.name;
    var base = req.body.base;
    var championships = req.body.championships;
    var image = req.body.image;

    session8
        .run('CREATE(n:Team {name: $nameParam, base: $baseParam, championships: $championshipsParam, image:$imageParam}) RETURN n.name', { nameParam: name, baseParam: base, championshipsParam: championships, imageParam: image })
        .then(function(result) {
            res.setHeader('Acces-Control-Allow-Origin', '*');
            //  session2.close();
        })
        .catch(function(err) {
            console.log(err);
        });

    res.redirect('/myteams');

});

app.post('/mypilots/add', function(req, res) {
    var name = req.body.name;
    var number = req.body.number;
    var country = req.body.country;
    var image = req.body.image;

    session9
        .run('CREATE(n:Pilot {name: $nameParam, number: $numberParam, country: $countryParam, image: $imageParam}) RETURN n.name', { nameParam: name, numberParam: number, countryParam: country, imageParam: image })
        .then(function(result) {
            //res.setHeader('Acces-Control-Allow-Origin', '*');
        })
        .catch(function(err) {
            console.log(err);
        });

    res.redirect('/mypilots');

});

app.post('/mypilots/team/add', function(req, res) {
    var team = req.body.team;
    var pilot = req.body.pilot;

    session10
        .run('MATCH (a:Pilot {name:$pilotParam}), (b:Team {name:$teamParam}) MERGE(a)-[r:DRIVES_FOR]-(b) RETURN a,b', { pilotParam: pilot, teamParam: team })
        .then(function(result) {
            //res.setHeader('Acces-Control-Allow-Origin', '*');
            // session4.close();
        })
        .catch(function(err) {
            console.log(err);
        });

    res.redirect('/mypilots');

});

app.post('/myteams/delete', function(req, res) {

    var name = req.body.name;
    session11
        .run('MATCH(n:Team {name: $nameParam}) DETACH DELETE n', { nameParam: name })
        .then(function(result) {

        })
        .catch(function(err) {
            console.log();
        });
    res.redirect('/myteams');
});

app.post('/mypilots/delete', function(req, res) {

    var name = req.body.name;
    session12
        .run('MATCH(n:Pilot {name: $nameParam}) DETACH DELETE n', { nameParam: name })
        .then(function(result) {

        })
        .catch(function(err) {
            console.log();
        });
    res.redirect('/mypilots');
});


app.post('/db', function(req, res) {

    var name = req.body.name;
    session20
        .run(seaa)
        .then(function(result) {

        })
        .catch(function(err) {
            console.log();
        });
    res.redirect('/pilots');
});

app.post('/mydb', function(req, res) {

    var name = req.body.name;
    session21
        .run(seaa)
        .then(function(result) {

        })
        .catch(function(err) {
            console.log();
        });
    res.redirect('/mypilots');
});

app.post('/elim', function(req, res) {

    var name = req.body.name;
    session22
        .run('MATCH(n)DETACH DELETE n ')
        .then(function(result) {

        })
        .catch(function(err) {
            console.log();
        });
    res.redirect('/pilots');
});

app.post('/myelim', function(req, res) {

    var name = req.body.name;
    session23
        .run('MATCH(n)DETACH DELETE n ')
        .then(function(result) {

        })
        .catch(function(err) {
            console.log();
        });
    res.redirect('/mypilots');
});

app.listen(3000);
console.log('Server Started on Port 3000');

module.exports = app;


var seaa = ` CREATE (F1:Sport {name:'Formula One', teams:10, races:23})

CREATE (Mercedes:Team {name:'Mercedes', base:'Brackley, United Kingdom', championships:7, image:'https://www.formula1.com/content/fom-website/en/teams/Mercedes/_jcr_content/logo.img.jpg/1582638425211.jpg'})
CREATE (RedBull:Team {name:'Red Bull Racing Honda', base:'Milton Keynes, United Kingdom', championships:4, image:'https://www.formula1.com/content/fom-website/en/teams/Red-Bull-Racing/_jcr_content/logo.img.jpg/1610719164360.jpg'})
CREATE (McLaren:Team {name:'McLaren F1 Team', base:'Woking, United Kingdom', championships:8, image:'https://www.formula1.com/content/fom-website/en/teams/McLaren/_jcr_content/logo.img.jpg/1515152760829.jpg'})
CREATE (Ferrari:Team {name:'Scuderia Ferrari Mission', base:'Maranello, Italy', championships:16, image:'https://www.formula1.com/content/fom-website/en/teams/Ferrari/_jcr_content/logo.img.jpg/1521797474166.jpg'})
CREATE (Alpine:Team {name:'Alpine F1 Team', base:'Enstone, United Kingdom', championships:2, image:'https://www.formula1.com/content/fom-website/en/teams/Alpine/_jcr_content/logo.img.jpg/1611246834255.jpg'})
CREATE (AlphaTauri:Team {name:'Scuderia AlphaTauri Honda', base:'Scuderia AlphaTauri Honda', championships:0, image:'https://www.formula1.com/content/fom-website/en/teams/AlphaTauri/_jcr_content/logo.img.jpg/1582650557134.jpg'})
CREATE (AstonMartin:Team {name:'Aston Martin Cognizant F1 Team', base:'Silverstone, United Kingdom', championships:0, image:'https://www.formula1.com/content/fom-website/en/teams/Aston-Martin/_jcr_content/logo.img.png/1610642928926.png'})
CREATE (AlfaRomeoRacing:Team {name:'Alfa Romeo Racing ORLEN', base:'Hinwil, Switzerland', championships:0, image:'https://www.formula1.com/content/fom-website/en/teams/Alfa-Romeo-Racing/_jcr_content/logo.img.jpg/1582650603836.jpg'})
CREATE (Williams:Team {name:'Williams Racing', base:'Grove, United Kingdom', championships:9, image:'https://www.formula1.com/content/fom-website/en/teams/Williams/_jcr_content/logo.img.jpg/1590743731407.jpg'})
CREATE (Haas:Team {name:'Uralkali Haas F1 Team', base:'Kannapolis, United States', championships:0, image:'https://www.formula1.com/content/fom-website/en/teams/Haas-F1-Team/_jcr_content/logo.img.jpg/1615481143675.jpg'})

  CREATE
  (Mercedes)-[:COMPETES_IN {driver_titles:[9], constructor_titles:[7]}]->(F1),
  (RedBull)-[:COMPETES_IN {driver_titles:[4], constructor_titles:[4]}]->(F1),
  (McLaren)-[:COMPETES_IN {driver_titles:[12], constructor_titles:[8]}]->(F1),
  (Ferrari)-[:COMPETES_IN {driver_titles:[15], constructor_titles:[16]}]->(F1),
  (Alpine)-[:COMPETES_IN {driver_titles:[0], constructor_titles:[0]}]->(F1),
  (AlphaTauri)-[:COMPETES_IN {driver_titles:[0], constructor_titles:[0]}]->(F1),
  (AstonMartin)-[:COMPETES_IN {driver_titles:[0], constructor_titles:[0]}]->(F1),
  (AlfaRomeoRacing)-[:COMPETES_IN {driver_titles:[0], constructor_titles:[0]}]->(F1),
  (Williams)-[:COMPETES_IN {driver_titles:[7], constructor_titles:[9]}]->(F1),
  (Haas)-[:COMPETES_IN {driver_titles:[0], constructor_titles:[0]}]->(F1)

CREATE (Hamilton:Pilot {name:'Lewis Hamilton', number:44, country:'United Kingdom', image:'https://www.formula1.com/content/fom-website/en/drivers/lewis-hamilton/_jcr_content/image.img.1920.medium.jpg/1616676634721.jpg'}) 
CREATE (Bottas:Pilot {name:'Valtteri Bottas', number:77, country:'Finland', image:'https://www.formula1.com/content/fom-website/en/drivers/valtteri-bottas/_jcr_content/image.img.1920.medium.jpg/1616676580165.jpg'})
CREATE (Verstappen:Pilot {name:'Max Verstappen', number:33, country:'Netherlands', image:'https://www.formula1.com/content/fom-website/en/drivers/max-verstappen/_jcr_content/image.img.1920.medium.jpg/1616676511153.jpg'})
CREATE (Perez:Pilot {name:'Sergio Perez', number:11, country:'Mexico', image:'https://www.formula1.com/content/fom-website/en/drivers/sergio-perez/_jcr_content/image.img.1920.medium.jpg/1616669035981.jpg'})
CREATE (Ricciardo:Pilot {name:'Daniel Ricciardo', number:3, country:'Australia', image:'https://www.formula1.com/content/fom-website/en/drivers/daniel-ricciardo/_jcr_content/image.img.1920.medium.jpg/1616669038845.jpg'})
CREATE (Norris:Pilot {name:'Lando Norris', number:4, country:'United Kingdom', image:'https://www.formula1.com/content/fom-website/en/drivers/lando-norris/_jcr_content/image.img.1920.medium.jpg/1616675716914.jpg'})
CREATE (Leclerc:Pilot {name:'Charles Leclerc', number:16, country:'Monaco', image:'https://www.formula1.com/content/fom-website/en/drivers/charles-leclerc/_jcr_content/image.img.1920.medium.jpg/1616675563921.jpg'})
CREATE (Sainz:Pilot {name:'Carlos Sainz', number:55, country:'Spain', image:'https://www.formula1.com/content/fom-website/en/drivers/carlos-sainz/_jcr_content/image.img.1920.medium.jpg/1616669041261.jpg'})
CREATE (Alonso:Pilot {name:'Fernando Alonso', number:14, country:'Spain', image:'https://www.formula1.com/content/fom-website/en/drivers/fernando-alonso/_jcr_content/image.img.1920.medium.jpg/1616669053194.jpg'})
CREATE (Ocon:Pilot {name:'Esteban Ocon', number:31, country:'France', image:'https://www.formula1.com/content/fom-website/en/drivers/esteban-ocon/_jcr_content/image.img.1920.medium.jpg/1616675373015.jpg'})
CREATE (Gasly:Pilot {name:'Pierre Gasly', number:10, country:'France', image:'https://www.formula1.com/content/fom-website/en/drivers/pierre-gasly/_jcr_content/image.img.1920.medium.jpg/1616676765251.jpg'})
CREATE (Tsunoda:Pilot {name:'Yuki Tsunoda', number:22, country:'Japan', image:'https://www.formula1.com/content/fom-website/en/drivers/yuki-tsunoda/_jcr_content/image.img.1920.medium.jpg/1616676303576.jpg'})
CREATE (Vettel:Pilot {name:'Sebastian Vettel', number:5, country:'Germany', image:'https://www.formula1.com/content/fom-website/en/drivers/sebastian-vettel/_jcr_content/image.img.1920.medium.jpg/1616669052113.jpg'})
CREATE (Stroll:Pilot {name:'Lance Stroll', number:18, country:'Canada', image:'https://www.formula1.com/content/fom-website/en/drivers/lance-stroll/_jcr_content/image.img.1920.medium.jpg/1616669046322.jpg'})
CREATE (Räikkönen:Pilot {name:'Kimi Räikkönen', number:7, country:'Finland', image:'https://www.formula1.com/content/fom-website/en/drivers/kimi-raikkonen/_jcr_content/image.img.1920.medium.jpg/1616676450026.jpg'})
CREATE (Giovinazzi:Pilot {name:'Antonio Giovinazzi', number:99, country:'Italy', image:'https://www.formula1.com/content/fom-website/en/drivers/antonio-giovinazzi/_jcr_content/image.img.1920.medium.jpg/1616676717350.jpg'})
CREATE (Russell:Pilot {name:'George Russell', number:63, country:'United Kingdom', image:'https://www.formula1.com/content/fom-website/en/drivers/george-russell/_jcr_content/image.img.1920.medium.jpg/1616780487324.jpg'})
CREATE (Latifi:Pilot {name:'Nicholas Latifi', number:6, country:'Canada', image:'https://www.formula1.com/content/fom-website/en/drivers/nicholas-latifi/_jcr_content/image.img.1920.medium.jpg/1616675790178.jpg'})
CREATE (Schumacher:Pilot {name:'Mick Schumacher', number:47, country:'Germany', image:'https://www.formula1.com/content/fom-website/en/drivers/mick-schumacher/_jcr_content/image.img.1920.medium.jpg/1616676141459.jpg'})
CREATE (Mazepin:Pilot {name:'Nikita Mazepin', number:9, country:'Russia', image:'https://www.formula1.com/content/fom-website/en/drivers/nikita-mazepin/_jcr_content/image.img.1920.medium.jpg/1616669029614.jpg'})

CREATE
  (Hamilton)-[:DRIVES_FOR {since:[2013]}]->(Mercedes),
  (Bottas)-[:DRIVES_FOR {since:[2017]}]->(Mercedes),
  (Verstappen)-[:DRIVES_FOR {since:[2016]}]->(RedBull),
  (Perez)-[:DRIVES_FOR {since:[2021]}]->(RedBull),
  (Ricciardo)-[:DRIVES_FOR {since:[2021]}]->(McLaren),
  (Norris)-[:DRIVES_FOR {since:[2018]}]->(McLaren),
  (Leclerc)-[:DRIVES_FOR {since:[2019]}]->(Ferrari),
  (Sainz)-[:DRIVES_FOR {since:[2021]}]->(Ferrari),
  (Alonso)-[:DRIVES_FOR {since:[2021]}]->(Alpine),
  (Ocon)-[:DRIVES_FOR {since:[2021]}]->(Alpine),
  (Gasly)-[:DRIVES_FOR {since:[2020]}]->(AlphaTauri),
  (Tsunoda)-[:DRIVES_FOR {since:[2020]}]->(AlphaTauri),
  (Vettel)-[:DRIVES_FOR {since:[2021]}]->(AstonMartin),
  (Stroll)-[:DRIVES_FOR {since:[2021]}]->(AstonMartin),
  (Räikkönen)-[:DRIVES_FOR {since:[2019]}]->(AlfaRomeoRacing),
  (Giovinazzi)-[:DRIVES_FOR {since:[2019]}]->(AlfaRomeoRacing),
  (Russell)-[:DRIVES_FOR {since:[2018]}]->(Williams),
  (Latifi)-[:DRIVES_FOR {since:[2019]}]->(Williams),
  (Schumacher)-[:DRIVES_FOR {since:[2020]}]->(Haas),
  (Mazepin)-[:DRIVES_FOR {since:[2021]}]->(Haas)
;

`;