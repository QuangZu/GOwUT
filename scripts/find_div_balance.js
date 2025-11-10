const fs=require('fs');
const path='app/main/dashboard/page.tsx';
const s=fs.readFileSync(path,'utf8');
const lines=s.split(/\r?\n/);
let depth=0;
for(let i=0;i<lines.length;i++){
  const line=lines[i];
  // Count opening <div occurrences not preceded by </
  const opens=(line.match(/<div(\s|>)/g)||[]).length;
  const closes=(line.match(/<\/div>/g)||[]).length;
  depth += opens - closes;
  if(depth<0){
    console.log('Negative depth at line', i+1);
    console.log(lines.slice(Math.max(0,i-5), i+5).join('\n'));
    process.exit(0);
  }
}
console.log('Final depth:', depth);
for(let i=0;i<lines.length;i++){
  // print lines where depth is small? not necessary
}
console.log('--- file tail ---');
console.log(lines.slice(-40).join('\n'));
