const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer')
const fs = require("fs");
const upload = multer({dest: 'public/images'})
const {repository} = require('./repository');
const app = express();
const cors = require('cors')
const logger = require('morgan');

app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/movies', upload.single('file'), (req, res) => {
  const {name, actor, year} = req.body
  const type = req.file.mimetype.replace('image/', '');
  const pk = repository.insertMovie(name, actor, year, type);
  const input = fs.createReadStream(req.file.path, {flags: 'r'});
  const output = fs.createWriteStream(`public/images/${pk}.${type}`, {flags: 'w'});
  input.pipe(output);
  fs.unlink(req.file.path, () => console.log('removed'));
  res.status(200).send('ok');
});

app.use('/movies', express.static(`${__dirname}/public/images`));
app.put('/movies/:id', (req, res) => {
  repository.updateMovie(req.params.id, req.body);
});

app.delete('/movies/:id', (req, res) => {
  repository.deleteMovie(req.params.id);
});

app.get('/movies/:id', (req, res) => {
  const movie = repository.getMovie(req.params.id);
  res.send({data: movie});
});

app.get('/movies', (req, res) => {
  const movies = Object.values(repository.getAll()).map(e => ({
    pk: e.pk, path: `${e.pk}.${e.path}`
  }));
  return res.send({data: movies});
});


app.listen(80, () => console.log('app is listening to port 3000'))

module.exports = app;


