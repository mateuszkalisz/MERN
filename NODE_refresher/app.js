///1st

// const fs = require('fs');
// const userName = 'Mateusz1';

// fs.writeFile('text.txt', userName, (err)=>{
//     if(err) console.log(err);
//     console.log('added file');
// })

// console.log(userName);


///2nd

// const http = require('http');

// const server = http.createServer((req,res)=>{
//     res.writeHead(200, {'Content-Type':'text/html'});

//     if(req.method === 'POST'){
//         res.end('GET A POST METHOD');
//     }
//     else{
//         res.end('<form method="post"><input type="text" name="username"/><button type="submit">Create user</button></form>');
//     }
// });

// server.listen(5000);

///3rd  

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res)=>{
    res.send('<form method="post"><input type="text" name="username"/><button type="submit">Create user</button></form>');
})

app.post('/', (req,res)=>{
    res.send(req.body.username);
})

app.listen(3000);