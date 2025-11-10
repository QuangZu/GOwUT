const fs=require('fs');
const lines=fs.readFileSync('app/main/dashboard/page.tsx','utf8').split(/\r?\n/);
let depth=0;
for(let i=0;i<lines.length;i++){
  const line=lines[i];
  const opens=(line.match(/<div(\s|>)/g)||[]).length;
  const closes=(line.match(/<\/div>/g)||[]).length;
  if(opens||closes) console.log((i+1)+': opens='+opens+' closes='+closes+' depth(before)='+depth+' -> depth(after)='+(depth+opens-closes)+' | '+line.trim());
  depth+=opens-closes;
}
console.log('final depth',depth);
