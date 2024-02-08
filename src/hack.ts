import fs from 'fs';

// Change static html port to 80 if running in docker. Checks for isDockerized are to be placed in this function invocations.
// Additional check could be applied here too, though
export const changeStaticHtmlPort = () => {
  const indexHtml = fs.readFileSync('./static/index.html', 'utf8');
  fs.writeFileSync('./static/index.html', indexHtml.replace(/const PORT = 3000;/g, 'const PORT = 80;'));
};
