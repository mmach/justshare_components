// First, checks if it isn't implemented yet.

if (!String.prototype.format) {
  String.prototype.format = function() {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}
/*
if (!Object.prototype.logger) {
    Object.prototype.logger = function (dto) {
        return dto;
    };
}*/

//guid
global.guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

global.decodeBase64Image = function(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");

  return response;
};

global.stringToBytesFaster = function(str) {
  //http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
  var ch,
    st,
    re = [],
    j = 0;
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i);
    if (ch < 127) {
      re[j++] = ch & 0xff;
    } else {
      st = []; // clear stack
      do {
        st.push(ch & 0xff); // push byte to stack
        ch = ch >> 8; // shift value down by 1 byte
      } while (ch);
      // add stack contents to result
      // done because chars have "wrong" endianness
      st = st.reverse();
      for (var k = 0; k < st.length; ++k) re[j++] = st[k];
    }
  }
  // return an array of bytes
  return re;
};
