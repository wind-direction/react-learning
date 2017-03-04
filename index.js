/**
 * File : index.js
 * Todo :
 * author: wind.direction.work@gmail.com
 * Created by wind on 17/2/28.
 */
var text = require('./hello');
require('./index.css');
var $div = document.createElement('div');
$div.innerHTML = text.name + ' ' + text.word;
document.body.appendChild($div);
