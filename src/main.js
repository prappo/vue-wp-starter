import { rename_plugin_file } from './downloader';
import { replace_strings } from './replace';
const prompts = require('prompts');

function isEmpty(value) {
  return (!value || value == undefined || value == "" || value.length == 0);
}

function capital_letter(str) {
  try{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
  
    return str.join(" ");
  }catch(err){
    return console.log('End')
  }
  
}

let questions = [
  {
    type: 'text',
    name: 'plugin_file_name',
    message: 'Plugin file & folder name : ',
    validate: (plugin_file_name) => {
      if (/\s/.test(plugin_file_name)) {
        return 'You can not use any space in plugin name . Example : plugin-name';
      }

      if (isEmpty(plugin_file_name)) {
        return 'Plugin file / folder name required';
      }

      return true;
    }
  },
  {
    type: 'text',
    name: 'plugin_name',
    message: 'Plugin Name : ',
    validate: plugin_name => isEmpty(plugin_name) ? 'Plugin name required' : true
  },
  {
    type: 'text',
    name: 'plugin_uri',
    message: 'Plugin URI : ',
  },
  {
    type: 'text',
    name: 'plugin_description',
    message: 'Description : ',
  },
  {
    type: 'text',
    name: 'plugin_version',
    message: 'Version : '
  },
  {
    type: 'text',
    name: 'plugin_author',
    message: 'Author : '
  },
  {
    type: 'text',
    name: 'plugin_author_uri',
    message: 'Author URI : ',
  },
  {
    type: 'text',
    name: 'textdomain',
    message: 'Textdomain : ',
    validate: textdomain => isEmpty(textdomain) ? 'Textdomain required ' : true
  }
];



export function main() {

  

    /** Ask for plugin name */

    (async () => {
      const response = await prompts(questions);
      try{
        // console.log(response);
        
        let class_name = (((response.plugin_file_name).split('-')).map(function (x) { return capital_letter(x) })).join('_');
        // console.log(class_name)
        response['class_name'] = class_name;
        rename_plugin_file(response);
       
      }catch(err){
        replace_strings();
        return console.log('\nEnd :(')
      }
      
    })();





}