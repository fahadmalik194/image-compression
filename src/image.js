const fs = require('fs')
const chalk = require('chalk')
const resizeImg = require('resize-img');
const { compress } = require('compress-images/promise');

const resizeImage = async (inputPath, outputPath, width, height) => {
    if(!inputPath){
        console.log("--------------------------");
        console.log(chalk.red.inverse('Error: Image Input Path cannot be empty'));
        console.log("--------------------------");
    } else if(!outputPath){
        console.log("--------------------------");
        console.log(chalk.red.inverse('Error: Image Output Path cannot be empty'));
        console.log("--------------------------");
    } else if(!width || width <= 0){
        console.log("--------------------------");
        console.log(chalk.red.inverse('Error: Width value is not valid'));
        console.log("--------------------------");
    } else if(!height || height <= 0){
        console.log("--------------------------");
        console.log(chalk.red.inverse('Error: Height value is not valid'));
        console.log("--------------------------");
    } else {
        try {
            const imgPath = fs.readFileSync(Buffer.from(inputPath))
            const imgName = GetFilename(inputPath)
            const image = await resizeImg(imgPath, {
                width: width,
                height: height
            });
            try {
                fs.writeFileSync(outputPath + imgName + '-' + width +  'x' + height +'.jpg', image);
            } catch(e) {
                return console.log(chalk.red.inverse('Error: No such file or directory to save new image', e.path));
            }
            console.log("--------------------------");
            console.log(chalk.green.inverse('Success: Resized image in new dimensions'));
            console.log(chalk.white.inverse('New Image Path: ' + outputPath + imgName + '-' + width +  'x' + height +'.jpg'));
            console.log("--------------------------");
        } catch(e) {
            return console.log(chalk.red.inverse('Error: No such image in given path:', e.path));
        }
    }
}

const compressImage = (compressRate, inputPath, outputPath) => {
    if(!compressRate || compressRate <= 0 || compressRate >= 100){
        console.log("--------------------------");
        console.log(chalk.red.inverse('Error: Compress Rate Value is not valid'));
        console.log("--------------------------");
    } else if(!inputPath) {
        console.log("--------------------------");
        console.log(chalk.red.inverse('Error: Input Path is not valid'));
        console.log("--------------------------");
    } else if(!outputPath) {
        console.log("--------------------------");
        console.log(chalk.red.inverse('Error: Output Path is not valid'));
        console.log("--------------------------");
    } else {
        try{
            const processImages = async (onProgress) => {
                const result = await compress({
                    source: inputPath,
                    destination: outputPath,
                    onProgress,
                    enginesSetup: {
                        jpg: { engine: 'mozjpeg', command: ['-quality', compressRate]},
                        png: { engine: 'pngquant', command: ['--quality=20-'+compressRate, '-o']},
                    }
                });
                const { statistics, errors } = result;
                if(statistics[0].percent <85){
                    compressRate = compressRate+5
                    processImages()
                    console.log("Converting Image Again");
                }
                // statistics - all processed images list
                // errors - all errros happened list
            };
        
            processImages()
        } catch(e){
            return console.log(chalk.red.inverse('Error: Something went wrong, please check your given paths:', inputPath, outputPath));
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

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

module.exports = {
    resizeImage,
    compressImage
}