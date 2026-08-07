export const lexer = data => {
  let tokens = []
  let i = 0

  while (i < data.length) {

    // skips spaces/newlines
    if (data[i] === " " || data[i] === "\n" || data[i] === "\r") { i++; continue }

    // complates da word
    if (/[a-zA-Z]/.test(data[i])) {
      let word = ""

      // words prosses
      while (i < data.length && /[a-zA-Z]/.test(data[i])) { word += data[i]; i++ }

      //if (word === "var") { tokens.push("VAR") } else { tokens.push(`ID_${word}`) }
      
      switch (word) {
        case "var": tokens.push("VAR"); break;
        case "val": tokens.push("VAL"); break;
        case "fn": tokens.push("FN"); break;
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
  
    // sympols process
    switch (data[i]) {
      case "{": tokens.push("OCB"); i++; break;
      case "}": tokens.push("CCB"); i++; break;
      case "(": tokens.push("OP"); i++; break;
      case ")": tokens.push("CP"); i++; break;
      case "=": tokens.push("EQUALS"); i++; break;
      case ";": tokens.push("COLAN"); i++; break;
      case ",": tokens.push("COMMA"); i++; break;
      default: console.error(`Uknown symbol: ${data[i]}`); process.exit(1)
    }
  }
  return tokens;
}
