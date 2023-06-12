import fs, { readFileSync } from 'fs';

const files = fs.readdirSync(__dirname);

export function combinePhones() {
  const phones = [];

  for (const file of files) {
    if (file === 'combined.ts') {
      continue;
    }

    const fileToWrite = readFileSync(`${__dirname}/${file}`, 'utf-8');

    const result = JSON.parse(fileToWrite);

    phones.push(result);
  }

  return phones;
}
