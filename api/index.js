import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
    const path = req.url;

    if (path === '/app-ads.txt') {
        try {
            const filePath = join(process.cwd(), 'public', 'app-ads.txt');
            const content = readFileSync(filePath, 'utf8');

            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send(content);
        } catch (err) {
            return res.status(404).send('app-ads.txt not found');
        }
    }

    if (path === '/robots.txt') {
        try {
            const filePath = join(process.cwd(), 'public', 'robots.txt');
            const content = readFileSync(filePath, 'utf8');

            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send(content);
        } catch (err) {
            return res.status(404).send('robots.txt not found');
        }
    }

    const targets = ['/angular', '/preact', '/react', '/solid', '/svelte', '/vue'];
    const randomBase = targets[Math.floor(Math.random() * targets.length)];

    res.writeHead(302, {Location: `${randomBase}${path}`});
    res.end();
}