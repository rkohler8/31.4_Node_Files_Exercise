const process = require('process');
const fs = require('fs');
const axios = require('axios');

// function outputHandler(text, out) {
//   if(out) {
//     fs.writeFile(out, text, 'utf8', function(err) {
//       if(err) {
//         console.error(`Couldn't write ${out}: ${err}`);
//         process.exit(1);
//       }
//     });
//   } else {
//       console.log(text);
//   }
// }

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if(err) {
      console.error(`Error reading ${path}:\n   ${err}`);
      process.exit(1);
    } else {
      outputHandler(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let res = await axios.get(url);
    outputHandler(res.data, out);
  } catch(err) {
      console.error(`Error reading ${url}:\n   ${err}`);
      process.exit(1);
  }
}

function outputHandler(text, out) {
  if(out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if(err) {
        console.error(`Couldn't write ${out}:\n   ${err}`);
        process.exit(1);
      }
    });
  } else {
      console.log(text);
  }
}

let out;
let path;

if(process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
    path = process.argv[2];
}

if(path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
    cat(path, out);
}