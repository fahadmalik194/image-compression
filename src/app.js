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
        path : {
            describe: 'Image Path',
            required: true,
            type: 'string'
        },
        width : {
            describe: 'New Width',
            required: true,
            type: 'number'
        },
        height : {
            describe: 'New Height',
            required: true,
            type: 'number'
        } 
    },
    handler(argv){
        image.resizeImage(argv.path, argv.width, argv.height)
    }
})

yargs.parse()