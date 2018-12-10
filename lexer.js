const myCode = require('./code');

const Token = require('./token');

const needCut = [' ', '\t', '\n', ';'];

let state = 'none';
let line = 1;
let token = '';
let str = '';
let tokenArray = [];

for(let i=0;i<myCode.length;i++) {
    const c = myCode[i];
    switch(state) {
    case 'none':
        switch(c) {
        case '\n': 
            line++; //줄바꿈
        case ' ': 
        case '\t':
        case '\r':
            break; //공백

        case '\"': 
            state = 'string'; //문자열
            break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            state = 'number'; //숫자
            break;

        case '+':
            if(check(i+1) === '+') {
                tokenArray.push(new Token('OP', '++', line)); //증가 연산자
                i++;
            }
            else if(check(i+1) === '=') {
                tokenArray.push(new Token('OP', '+=', line)); //증가후 대입
                i++;
            }
            else if(check(i+1) === '>') {
                tokenArray.push(new Token('OP', '+>', line)); //그냥 만들었는데 용도는 나중에 생각할거임
                i++;
            }
            else {
                tokenArray.push(new Token('OP', '+', line)); //더하기
            }
            break;

        case '-':
            if(check(i+1) === '-') {
                tokenArray.push(new Token('OP', '--', line)); //감소 연산자
                i++;
            }
            else if(check(i+1) === '=') {
                tokenArray.push(new Token('OP', '-=', line)); //감소후 대입
                i++;
            }
            else if(check(i+1) === '>') {
                tokenArray.push(new Token('OP', '->', line)); //함수 인자 받기
                i++;
            }
            else {
                tokenArray.push(new Token('OP', '-', line)); //빼기
            }
            break;

        case '*':
            if(check(i+1) === '*') {
                tokenArray.push(new Token('OP', '**', line)); //거듭제곱
                i++;
            }
            else if(check(i+1) === '=') {
                tokenArray.push(new Token('OP', '*=', line)); //곱한후 대입
                i++;
            }
            else {
                tokenArray.push(new Token('OP', '*', line)); //곱하기
            }
            break;

        case '/':
            if(check(i+1) === '/') {
                state = 'com1'; //한줄주석
            }
            else if(check(i+1) === '*') {
                state = 'com2'; //여러줄주석
            }
            else if(check(i+1) === '%') {
                tokenArray.push(new Token('OP', '/%', line)); //몫 구하기
                i++;
            }
            else if(check(i+1) === '=') {
                tokenArray.push(new Token('OP', '/=', line)); //나눈후 대입
                i++;
            }
            else {
                tokenArray.push(new Token('OP', '/', line)); //나누기
            }
            break;

        case '%':
            if(check(i+1) === '=') {
                tokenArray.push(new Token('OP', '%=', line)); //나머지 구한후 대입
                i++;
            }
            else {
                tokenArray.push(new Token('OP', '%', line)); //나머지 구하기
            }
            break;
        

        }
    }
}

function check(pos) {
    return myCode[pos];
}

module.exports = tokenArray;