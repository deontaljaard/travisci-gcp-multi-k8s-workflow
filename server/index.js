const keys = require('./keys');

// Express app setup
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PG setup
const { Pool } = require('pg');

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on("connect", (client) => {
    client
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
});

// Redis setup
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');

    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

app.post('/values', async (req, res) => {
    const idx = req.body.index;

    if(parseInt(idx) > 40) {
        return res.status(422).send('Index too high');
    }

    redisClient.hset('values', idx, 'Nothing yet!');
    redisPublisher.publish('insert', idx);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [idx]);

    res.send({ working: true });
});

app.listen(5000, err => {
    console.info('Listening...');
});