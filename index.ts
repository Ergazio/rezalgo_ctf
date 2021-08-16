import fastify from 'fastify';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = fastify({ logger: true });

server.get('/', (_req, res) => {
  res.send('Coucou');
});

server.listen('3000', '127.0.0.1', (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening at ${address}`);
});

interface MyQueryString {
  challenge_name?: string;
  language?: string;
}

server.get<{ Querystring: MyQueryString }>('/api/challenges', async (req, res) => {
  const { challenge_name, language } = req.query;
  const challenges = await prisma.challenge.findMany({
    where: { challenge_name: { contains: challenge_name }, language: { contains: language } },
  });
  res.send({ challenges });
});

interface MyBody {
  challenge_name: string;
  language: string;
  code: string;
  time: number;
  memory: number;
}

server.post<{ Body: MyBody }>('/api/challenges', async (req, res) => {
  const { challenge_name, language, code, memory, time } = req.body;
  await prisma.challenge.create({
    data: { challenge_name, code, language, memory, time },
  });
  res.send('Challenge created');
});

server.get('/api/challenges/names', async (_req, res) => {
  const challengesNames = await prisma.challenge.findMany({ distinct: 'challenge_name', select: { challenge_name: true } });
  res.send({ challengesNames: challengesNames.map(({ challenge_name }) => challenge_name) });
});
