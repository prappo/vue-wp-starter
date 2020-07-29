import { main } from './main';
import { replace_strings } from './replace';

const chalk = require('chalk');
const request = require('request'),
    fs = require('fs'),
    unzipper = require('unzipper'),
    _cliProgress = require('cli-progress');

const download_file = (url, filename, callback) => {

    const progressBar = new _cliProgress.SingleBar({
        format: '{bar} {percentage}% | ETA: {eta}s'
    }, _cliProgress.Presets.shades_classic);

    const file = fs.createWriteStream(filename);
    let receivedBytes = 0


    request.get(url)
        .on('response', (response) => {
            if (response.statusCode !== 200) {
                return callback('Response status was ' + response.statusCode);
            }

            const totalBytes = response.headers['content-length'];
            progressBar.start(totalBytes, 0);
        })
        .on('data', (chunk) => {
            receivedBytes += chunk.length;
            progressBar.update(receivedBytes);
        })
        .pipe(file)
        .on('error', (err) => {
            fs.unlink(filename);
            progressBar.stop();
            return callback(err.message);
        });

    file.on('finish', () => {
        progressBar.stop();
        file.close(callback);
    });

    file.on('error', (err) => {
        fs.unlink(filename);
        progressBar.stop();
        return callback(err.message);
    });
}

export function download(pluginData) {


    console.log(chalk.blue('Downloading starter file from github ...'));

    const fileUrl = `https://github.com/tareq1988/vue-wp-starter/archive/master.zip`;

    download_file(fileUrl, 'master.zip', () => {
        console.log(chalk.green('Download complete '));
        console.log('\n')
        fs.createReadStream('master.zip')
            .pipe(unzipper.Extract({ path: '' }));
    
        main();

    });
}

export function rename_plugin_file(response) {
    fs.rename('vue-wp-starter-master', response.plugin_file_name, (err) => {
       
        fs.unlink('master.zip', (err) => {
            if(err) throw console.error('Ops');

            fs.rename(response.plugin_file_name + '/plugin.php', response.plugin_file_name + '/' + response.plugin_file_name + '.php' , (err) => {
                replace_strings(response);

            })

        });
    });
}