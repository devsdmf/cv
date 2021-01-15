const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const fs = require('fs');
const marked = require('marked');

const markdownFile = '../README.md';

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'html');

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, markdownFile), 'utf-8', (err, str) => {
        if (err) return res.send('An error occurred: ' + err);
        let body = marked.parse(str);

        res.render('template', { content: body });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
