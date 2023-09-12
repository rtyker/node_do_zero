// import { createServer } from 'node:http'


// const server = createServer((req, res)=>{

//     res.write('hello world');
//     return res.end();
// });

// server.listen(3001);

import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { title } from 'node:process';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.get('/', () => {
    return 'Hello World';
});

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration,
    });

    return reply.status(201).send();

});

server.get('/videos', async (request, reply) => {
    const search = request.query.search;
    console.log(search);
    const videos = await database.list(search);
    return videos;
});

server.put('/videos/:id', async (request, reply) => {
    const { title, description, duration } = request.body;

    const videoId = request.params.id;

    await database.update(
        videoId,
        {
            title,
            description,
            duration
        }
    );



    return reply.status(204).send();
});

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    await database.delete(videoId);
    return reply.status(204).send();
});

server.listen({
    port: process.env.PORT || 3001,
});