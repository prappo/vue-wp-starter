

export function replace_strings(response) {

    const dir_name = response.plugin_file_name;
    let actions = [
        {
            path: dir_name + '/*.php',
            from: 'Base_Plugin',
            to: response.class_name
        },
        {
            path: dir_name + '/*.php',
            from: 'Plugin Name: Vue Starter Plugin',
            to: 'Plugin Name: ' + response.plugin_name
        }
    ];

    if(response.plugin_uri != ''){
        actions.push({
            path: dir_name + '/*.php',
            from: 'Plugin URI: https://example.com/',
            to: 'Plugin URI: ' + response.plugin_uri,
        });    
    }

    if(response.plugin_description != ''){
        actions.push({
            path: dir_name + '/*.php',
            from: 'Description: A WordPress Vue.js starter plugin',
            to: 'Description: ' + response.plugin_description,
        });    
    }

    if(response.plugin_version != ''){
        actions.push({
            path: dir_name + '/*.php',
            from: 'Version: 0.1',
            to: 'Version: ' + response.plugin_version,
        });    
    }
    
    if(response.plugin_author != ''){
        actions.push({
            path: dir_name + '/*.php',
            from: 'Author: Your Name',
            to: 'Author: ' + response.plugin_author,
        });    
    }
    
    if(response.plugin_author_uri != ''){
        actions.push({
            path: dir_name + '/*.php',
            from: 'Author URI: https://example.com/',
            to: 'Author URI: ' + response.plugin_author_uri,
        });    
    }
    
    if(response.textdomain != ''){
        actions.push({
            path: dir_name + '/*.php',
            from: 'Text Domain: baseplugin',
            to: 'Text Domain: ' + response.textdomain,
        });    
    }
    


    for (const a of actions) {

        replaceInFile(a.path, a.from, a.to);
    }

   finish(response);
}

function finish(response){
    const chalk = require('chalk');
    console.log(`

    
        Congrats !


    `);
console.log(
 '1. Now ' + chalk.rgb(15, 100, 204).inverse(' cd '+ response.plugin_file_name +' ') + '\n' +
 '2. Run ' + chalk.rgb(15, 100, 204).inverse(' composer install ') + '\n' +
 '3. Run ' + chalk.rgb(15, 100, 204).inverse(' npm install ') + '\n' +
 '4. Run ' + chalk.rgb(15, 100, 204).inverse(' npm run dev ') + '\n' +
 '5. Run ' + chalk.rgb(15, 100, 204).inverse(' npm run build ') + ' ( for production )' + '\n' 
  )
}

function replaceInFile(path, from, to) {
   
    const replace = require('replace-in-file');
    const options = {
        files: path,
        from: new RegExp(from, 'g'),
        to: to,
    };

    try {
        const results = replace.sync(options);

      }
      catch (error) {
        console.error('Error occurred:', error);
      }
}
