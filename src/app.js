const chalk = require('chalk')
const yargs = require('yargs')
const image = require('./image')

//customize app version using yargs
yargs.version('1.0.0')

//create Resize command
yargs.command({
    command: 'resize',
    describe: 'Add source path of your file and new height and width',
    builder : {
        width : {
            describe: 'New Width',
            required: true,
            type: 'number'
        },
        height : {
            describe: 'New Height',
            required: true,
            type: 'number'
        },
        inputPath : {
            describe: 'Image Src Path',
            required: true,
            type: 'string'
        },
        outputPath : {
            describe: 'Image Output Path',
            required: true,
            type: 'string'
        }
    },
    handler(argv){
        image.resizeImage(argv.inputPath, argv.outputPath, argv.width, argv.height)
    }
})

//create Compress command
yargs.command({
    command: 'compress',
    describe: 'Add compress rate, source path and output path of your file, to compress image',
    builder : {
        rate : {
            describe: 'Add Compress Rate (1-100)',
            required: true,
            type: 'number'
        },
        inputPath : {
            describe: 'Image Input Path',
            required: true,
            type: 'string'
        },
        outputPath : {
            describe: 'Image Output Path',
            required: true,
            type: 'string'
        } 
    },
    handler(argv){
        image.compressImage(argv.rate, argv.inputPath, argv.outputPath)
    }
})

yargs.parse()