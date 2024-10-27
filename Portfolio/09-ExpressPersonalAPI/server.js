const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let names = [];
let tasks = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'html'));

app.get('/', (req, res) => {
    res.render('index', { names, tasks });
});

app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

app.get('/wazzup', (req, res) => {
    const name = req.query.name;
    if (name) {
        res.render('wazzup', { name });
    } else {
        res.redirect('/');
    }
});

app.post('/task', (req, res) => {
    const { task } = req.body;
    if (task) {
        tasks.push(task);
        res.redirect('/');
    }
});

app.get('/task/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    tasks = tasks.filter((_, index) => index !== id);
    res.redirect('/');
});

app.get('/task/up/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (id > 0) {
        [tasks[id - 1], tasks[id]] = [tasks[id], tasks[id - 1]];
    }
    res.redirect('/');
});

app.get('/task/down/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (id < tasks.length - 1) {
        [tasks[id + 1], tasks[id]] = [tasks[id], tasks[id + 1]];
    }
    res.redirect('/');
});

app.use((err, req, res, next) => {
    res.render('index', { error: err.message, names, tasks });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(PORT);
});
