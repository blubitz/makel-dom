// small utility for creating <script> tag version of this module
const fs = require('fs')

var filepath = process.argv[2]
var code = fs.readFileSync(filepath, {encoding: "utf-8"})
code = code.replaceAll("export ", "")
console.log('writing file');
const dist_dir = './dist'
if (!fs.existsSync(dist_dir)) fs.mkdirSync(dist_dir)
fs.writeFileSync("./dist/makel-dom.js", code)
console.log('complete')
