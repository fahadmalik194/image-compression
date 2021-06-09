const fs = require('fs')
const chalk = require('chalk')
const resizeImg = require('resize-img');

const resizeImage = async (path, height, width) => {
    const imgPath = fs.readFileSync(Buffer.from(path))
    const imgName = GetFilename(path)
    const image = await resizeImg(imgPath, {
        width: width,
        height: height
    });
    fs.writeFileSync('compressedImages/' + imgName + '-' + width +  'x' + height +'.jpg', image);
    console.log(chalk.green.inverse('Success'));
}

function GetFilename(path)
{
   if (path)
   {
      var m = path.toString().match(/.*\/(.+?)\./);
      if (m && m.length > 1)
      {
         return m[1];
      }
   }
   return "";
}

module.exports = {
    resizeImage
}