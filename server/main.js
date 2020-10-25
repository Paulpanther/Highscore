const db = require('diskdb');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

db.connect('./', ['scores'])

let scores = db.scores.find();
if (scores && scores.length)
  scores = scores[0].scores;
else
  scores = {};

// scores["foo"] = [{player: "Paul", score: 42}];

io.on('connection', (socket) => {
  socket.emit('games', Object.entries(scores).map(([game, scores]) => ({
    game,
    scores: scores.slice(0, 10)
  })));
});

app.post('/score', (req, res) => {
  if (!req.query.player || !req.query.game || isNaN(Number(req.query.score)))
    return res.status(400).send();
  if (!scores[req.query.game])
    scores[req.query.game] = [];
  const currentHighscore = scores[req.query.game].find(score => score.player === req.query.player);
  if (currentHighscore && currentHighscore.score >= req.query.score) return res.json({ msg: 'Old score was higher' });
  const index = scores[req.query.game].indexOf(currentHighscore);
  if (index > -1) scores[req.query.game].splice(index, 1);

  const newEntity = { player: req.query.player, score: Number(req.query.score) };
  scores[req.query.game].push(newEntity);
  scores[req.query.game] = scores[req.query.game].sort((a, b) => b.score - a.score);
  if (scores[req.query.game].indexOf(newEntity) < 10) {
    io.sockets.emit('new_score', { game: req.query.game, scores: scores[req.query.game].slice(0, 10) });
  }

  db.scores.update({ id: 1 }, { id: 1, scores: scores }, { upsert: true })

  return res.json({ position: scores[req.query.game].indexOf(newEntity) + 1 });
});

app.get('/score', (req, res) => {
  if (!scores[req.query.game])
    return res.json([]);
  return res.json(scores[req.query.game].slice(0, 10));
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../website/dist/index.html'));
});
app.use(express.static(path.join(__dirname, '/../website/dist')));

http.listen(3000, '0.0.0.0', () => {
  console.log('listening on *:3000');
});
