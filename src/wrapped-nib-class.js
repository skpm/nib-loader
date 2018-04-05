import path from 'path';

export default function nibClass(nibName) {
  return `module.exports = require('${
    path.resolve(__dirname, 'nib-class.js')
  }').bind(this, '${nibName}');`;
}
