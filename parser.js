const tokenArray = require('./lexer');

let state = '';

for(let i=0;i<tokenArray.length;i++) {
    const token = tokenArray[i];

    if(token == '출력') {
        if(tokenArray[i+1] == '->') {
            console.log(tokenArray[i+2]);
        }
    }
}