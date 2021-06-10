const fs = require('fs')
const chalk = require('chalk')
const resizeImg = require('resize-img');

const resizeImage = async (path, width, height) => {
    if(!path){
        console.log(chalk.red.inverse('Error: Image Path cannot be empty'));
    }  else if(!width || width <= 0){
        console.log(chalk.red.inverse('Error: Width value is not valid'));
    } else if(!height || height <= 0){
        console.log(chalk.red.inverse('Error: Height value is not valid'));
    } else {
        try {
            const imgPath = fs.readFileSync(Buffer.from(path))
            const imgName = GetFilename(path)
            const image = await resizeImg(imgPath, {
                width: width,
                height: height
            });
            fs.writeFileSync('compressedImages/' + imgName + '-' + width +  'x' + height +'.jpg', image);
            console.log(chalk.green.inverse('Success: Resized image in new dimensions'));
            console.log(chalk.white.inverse('New Image Path: ' + __dirname +'/compressedImages/' + imgName + '-' + width +  'x' + height +'.jpg'));
        } catch(e) {
            return console.log(chalk.red.inverse('Error: No such image in given path:', e.path));
        }
    }
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