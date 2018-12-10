class Token {
    constructor(type, value, line) {
        this.type = type;
        this.content = value;
        this.line = line;
    }

    get Type() {
        return this.type;
    }

    get Value() {
        return this.value;
    }

    get Line() {
        return this.line;
    }
}

module.exports = Token;