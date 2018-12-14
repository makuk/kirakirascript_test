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
            str = c;
            state = 'string1'; //문자열
            break;

        case '\'':
            str = c;
            state = 'string2';
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
            str = c;
            state = 'number'; //숫자
            break;

        case '+':
            if(checkNext(i, '+')) {
                tokPush('OP', '++', line); //증가 연산자
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '+=', line); //증가후 대입
                i++;
            }
            else if(checkNext(i, '>')) {
                tokPush('OP', '+>', line); //함수 인자 추가
                i++;
            }
            else {
                tokPush('OP', '+', line); //더하기
            }
            break;

        case '-':
            if(checkNext(i, '-')) {
                tokPush('OP', '--', line); //감소 연산자
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '-=', line); //감소후 대입
                i++;
            }
            else if(checkNext(i, '>')) {
                tokPush('OP', '->', line); //함수 인자 받기
                i++;
            }
            else {
                tokPush('OP', '-', line); //빼기
            }
            break;

        case '*':
            if(checkNext(i, '*')) {
                tokPush('OP', '**', line); //거듭제곱
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '*=', line); //곱한후 대입
                i++;
            }
            else {
                tokPush('OP', '*', line); //곱하기
            }
            break;

        case '/':
            if(checkNext(i, '/')) {
                state = 'com1'; //한줄주석
            }
            else if(checkNext(i, '*')) {
                state = 'com2'; //여러줄주석
            }
            else if(checkNext(i, '%')) {
                tokPush('OP', '/%', line); //몫 구하기
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '/=', line); //나눈후 대입
                i++;
            }
            else {
                tokPush('OP', '/', line); //나누기
            }
            break;

        case '%':
            if(checkNext(i, '=')) {
                tokPush('OP', '%=', line); //나머지 구한후 대입
                i++;
            }
            else {
                tokPush('OP', '%', line); //나머지 구하기
            }
            break;
        
        case '=':
            if(checkNext(i, '=')) {
                tokPush('OP', '==', line); //비교
                i++;
            }
            else {
                tokPush('OP', '=', line); //대입
            }
            break;
        
        case '<':
            if(checkNext(i, '<')) {
                tokPush('OP', '<<', line); //비트쉬프트
                i++;
            }
            else if(checkNext(i, '-')) {
                tokPush('OP', '<-', line); //함수 인자
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '<=', line); //작거나 같음
                i++;
            }
            else {
                tokPush('OP', '<', line); //작음
            }
            break;
        
        case '>':
            if(checkNext(i, '>')) {
                tokPush('OP', '>>', line); //비트쉬프트
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '>=', line); //크거나 같음
                i++;
            }
            else {
                tokPush('OP', '>', line); //큼
            }
            break;
        
        case '!':
            if(checkNext(i, '=')) {
                tokPush('OP', '!=', line); //같지 않음
                i++;
            }
            else {
                tokPush('OP', '!', line); //부정
            }
            break;

        case '?':
            tokPush('OP', '?', line);
            break;
        
        case ':':
            tokPush('OP', ':', line);
            break;
        
        case '&':
            if(checkNext(i, '&')) {
                tokPush('OP', '&&', line);
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '&=', line);
                i++;
            }
            else {
                tokPush('OP', '&', line);
            }
            break;

        case '|':
            if(checkNext(i, '|')) {
                tokPush('OP', '||', line);
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '|=', line);
                i++;
            }
            else {
                tokPush('OP', '|', line);
            }
            break;

        case '^':
            if(checkNext(i, '^')) {
                tokPush('OP', '^^', line);
                i++;
            }
            else if(checkNext(i, '=')) {
                tokPush('OP', '^=', line);
                i++;
            }
            else {
                tokPush('OP', '^', line);
            }
            break;

        case '@':
            tokPush('OP', '@', line);
            break;
        
        case '#':
            tokPush('OP', '#', line);
            break;
        
        case '$':
            tokPush('OP', '$', line);
            break;

        case '~':
            tokPush('OP', '~', line);
            break;

        case ':':
            tokPush('OP', ':', line);
            break;
        
        case ';':
            tokPush('OP', ';', line);
            break;

        case ',':
            tokPush('OP', ',', line);
            break;

        case '.':
            tokPush('OP', ',', line);
            break;

        case '(':
            tokPush('BRK', '(', line);
            break;
        
        case ')':
            tokPush('BRK', ')', line);
            break;

        case '{':
            tokPush('BRK', '{', line);
            break;

        case '}':
            tokPush('BRK', '}', line);
            break;

        case '[':
            tokPush('BRK', '[', line);
            break;

        case ']':
            tokPush('BRK', ']', line);
            break;

        default:
            state = 'identifier';
        }
        break;
    
    case 'number':
        if(needCut.includes(c)) {
            tokPush('number', str, line);
            str = '';
            i--;
            state = 'none';
        }
        else {
            str += c;
        }
        break;

    case 'string1':
        break;

    case 'com1':
        if(c === '\n') {
            line++;
            state = 'none';
        }

    case 'com2':

    case 'identifier':

    }
}

function checkNext(pos, c) {
    return myCode[pos+1] === c;
}

function tokPush(type, value, line) {
    tokenArray.push((type, value, line));
}

module.exports = tokenArray;