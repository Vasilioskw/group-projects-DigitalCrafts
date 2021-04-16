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
        }
    })
});

 


app.get('/breeds/:dog', (req, res) => {
    console.log(req.params.name);
    var {name} = req.params;
    var breed = db.find(thisBreed => thisBreed.dog === breed);
    if (friend) {
    console.log(dog);

    res.render('dogs', {
        locals: {
            dog:dog,
            title:'dog'
        }
    }) 
    let htmlData =``;
    htmlData += `<h1>${friend.name}</h1>`;
    htmlData += `<h1>${friend.skill}</h1>`;
    htmlData += `<h1>${friend.handle}</h1>`;
  
    res.send(htmlData);

    } else {
res.status(404)
        .send("No friend with that name found")
        }
});




server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});