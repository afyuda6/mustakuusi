import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
    const path = req.url;

    const serveFile = (fileName, contentType = 'text/plain') => {
        try {
            const filePath = join(process.cwd(), 'public', fileName);
            const content = readFileSync(filePath, 'utf8');
            res.setHeader('Content-Type', contentType);
            res.status(200).send(content);
        } catch (err) {
            res.status(404).send(`${fileName} not found`);
        }
    };

    if (path === '/app-ads.txt') return serveFile('app-ads.txt', 'text/plain');
    if (path === '/robots.txt') return serveFile('robots.txt', 'text/plain');

    if (path === '/data/characters.json')
        return serveFile('data/characters.json', 'application/json');

    if (path === '/data/games.json')
        return serveFile('data/games.json', 'application/json');

    const targets = ['/r', '/g', '/b', '/c', '/m', '/y'];
    const randomBase = targets[Math.floor(Math.random() * targets.length)];

    res.writeHead(302, {Location: `${randomBase}${path}`});
    res.end();
}