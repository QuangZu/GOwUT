const fs = require('fs');
const path = 'app/main/dashboard/page.tsx';
const s = fs.readFileSync(path,'utf8');
const opens = (s.match(/<div(\s|>)/g) || []).length;
const closes = (s.match(/<\/div>/g) || []).length;
console.log('file:', path);
console.log('div opens:', opens, 'div closes:', closes);
// show a little context near the end
const lines = s.split(/\r?\n/);
const start = Math.max(0, lines.length-40);
console.log('--- tail ---');
console.log(lines.slice(start).join('\n'));
