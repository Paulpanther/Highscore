const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const scores = {};

io.on('connection', (socket) => {
  socket.emit('games', Object.entries(scores).map(([game, scores]) => ({
    game,
    scores: scores.sort((a, b) => a.score - b.score).slice(0, 10)
  })));
});

app.post('/score', (req, res) => {
  if (!scores[req.query.game])
    scores[req.query.game] = [];
  scores[req.query.game].push({player: req.query.player, score: req.query.score});
  io.sockets.emit('new_score', {game: req.query.game, score: req.query.score, player: req.query.player});
  return res.json({});
})

app.get('/score', (req, res) => {
  if (!scores[req.query.game])
    return res.json([]);
  return res.json(scores[req.query.game].sort(a.score - b.score).slice(0, 10));
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../website/dist/index.html'));
});
app.use(express.static(path.join(__dirname, '/../website/dist')));

http.listen(3000, () => {
  console.log('listening on *:3000');
});
