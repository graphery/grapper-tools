import fs   from 'fs';
import path from "node:path";

export default async function getName (fileLoc) {
  const fileName = path.basename(fileLoc, path.extname(fileLoc));
  try {
    const exp     = /export\s+(?:const|let|var)\s+title\s*=\s*(["'`])((?:\\.|(?!\1)[\s\S])*)\1\s*;?/
    const content = (await fs.promises.readFile(fileLoc)).toString();
    const result  = content.match(exp);
    return result ? result[2] : fileName;
  } catch (err) {
    console.error(err);
    return fileName;
  }
}