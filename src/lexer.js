export const lexer = data => {
  let tokens = []
  let i = 0

  while (i < data.length) {

    // skips spaces/newlines
    if (data[i] === " " || data[i] === "\n" || data[i] === "\r") { i++; continue }

    // complates the word
    if (/[a-zA-Z]/.test(data[i])) {
      let word = ""

      // words process
      while (i < data.length && /[a-zA-Z0-9]/.test(data[i])) { word += data[i]; i++ }

      switch (word) {
        case "var": tokens.push("VAR"); break;
        case "val": tokens.push("VAL"); break;
        case "fn": tokens.push("FN"); break;
        case "for": tokens.push("FOR"); break;
        case "while": tokens.push("WHILE"); break;
        default: tokens.push(`ID_${word}`); break;
      }

      continue
    }

    // intgers prosess
    if (/[0-9]/.test(data[i])) {
      let number = ""
    
      while (i < data.length && /[0-9]/.test(data[i])) {
        number += data[i]
        i++
      }
    
      tokens.push(`INT_${number}`)
      continue
    }

    // string process
    if (data[i] === '"') { 
      i++
      let string = ""

      while (i < data.length && data[i] !== '"') {
        string += data[i]
        i++
      }

      tokens.push(`STR_${string}`)
      i++
      continue
    }

    if (data[i] === "=") {
      if (data[i + 1] === "=") {
        tokens.push("D_EQUALS")
        i += 2 
      } else { 
        tokens.push("EQUALS")
        i++
      }
      continue
    }

    if (data[i] === "!") {
      if (data[i + 1] === "=") {
        tokens.push("NOT_EQUALS")
        i += 2
      } else {
        tokens.push("NOT")
        i++
      }
      continue
    }
  
    // sympols process
    switch (data[i]) {
      case "{": tokens.push("OCB"); i++; break;
      case "}": tokens.push("CCB"); i++; break;
      case "(": tokens.push("OP"); i++; break;
      case ")": tokens.push("CP"); i++; break;
      case "<": tokens.push("L_THAN"); i++; break;
      case ">": tokens.push("B_THAN"); i++; break;
      //case "=": tokens.push("EQUALS"); i++; break;
      case ";": tokens.push("SEMICOLAN"); i++; break;
      case ":": tokens.push("COLAN"); i++; break; 
      case ",": tokens.push("COMMA"); i++; break;
      default: console.error(`Uknown symbol: ${data[i]}`); process.exit(1)
    }
  }
  return tokens;
}
