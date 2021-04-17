const http = require('http');


const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html');


const server = http.createServer(app);
const db = require('./db');


app.get('/',(req, res) => {
    // res.send("hello express")
    res.render('home'), {
        partials: {
            head: '/partials/head'
        }
    }
});

app.get('/breed', (req, res) => {
    console.log("request path is: "+ req.path);
    console.log(db);
    res.render('breed-list', {
        locals:{
            allDogs:db
        },
        partials: {
            head: "/partials/head"
        }
    })
});


app.get('/breed/:breed', (req, res) => {
    console.log("req params name ",req.params);
    var {breed} = req.params;
    console.log("The breed is: ",breed)
    var dog = db.find(thisBreed => thisBreed.breed === breed);
    if (dog) {
    console.log("The dog data is: ",dog);

    res.render('dogs', {
        locals: {
            dog,
            title:'single dog'
        },
        partials: {
            image: "/partials/image",
            head: "/partials/head"
        } 
    }) 
   

    } else {
res.status(404)
        .send("No dog with that name found")
        }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});