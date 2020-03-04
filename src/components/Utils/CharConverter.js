class CharConverter {
  constructor(stringToConvert) {
    this.text = stringToConvert;
    /*eslint-disable no-control-regex*/
    this.escapable = /[\\"\x00-\x1f\xff-\uffff]/g;
    // table of character substitutions
    this.metaChars = {
      "\b": "\b",
      "\t": "\t", //backspace
      "\n": "\n", // new line
      "\f": "\f",
      "\r": "\r"
    };
  }

  utf8ToAscii() {
    this.escapable.lastIndex = 0;
    return this.escapable.test(this.text)
      ? this.text.replace(this.escapable, this.convertUtf8.bind(this))
      : this.text;
  }

  convertUtf8(char) {
    var c = this.metaChars[char];
    return typeof c === "string"
      ? c
      : "\\u" + ("0000" + char.charCodeAt(0).toString(16)).slice(-4);
  }
}

export default CharConverter;
