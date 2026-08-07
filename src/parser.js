export const parser = tokens => {
  let current = 0

  let ast = { type: "Program",body: [] }

  while (current < tokens.length) {
    let token = tokens[current]

    switch (token) {
      case "VAR": ast.body.push(parseVar()); break;
      case "VAL": ast.body.push(parseVal()); break;
      case "FN": ast.body.push(parseFunction()); break;
      default: current++; break;
    } 
  }

  /* -------------------------- parsers Functions -------------------------- */

  // parse var keyword
  function parseVar() {
    let dec = {
      type: "VD",
      kind: "var",
      id: "",
      value: null
    }
  
    current++
  
    // sets da var name as a id 
    if (tokens[current] && tokens[current].startsWith("ID_")) { dec.id = tokens[current].replace("ID_", ''); current++ }
    // checks da opration
    if (tokens[current] === "EQUALS") { current++ } else { console.error("Expected = Symbol") }
    // truns da strings of intgers into numbers using Number() method
    if (tokens[current] && tokens[current].startsWith("INT_")) { dec.value = Number(tokens[current].replace("INT_", "")); current++ }
  
    return dec
  }

  // parse val keyword
  function parseVal() {
    let dec = {
      type: "VD",
      kind: "val",
      id: "",
      value: null
    }
    
    current++
    // same as parseVar function
    if (tokens[current] && tokens[current].startsWith("ID_")) { dec.id = tokens[current].replace("ID_", ""); current++ }
    if (tokens[current] === "EQUALS") { current++ } else { console.error("Expected = Symbol") }
    if (tokens[current] && tokens[current].startsWith("INT_")) { dec.value = Number(tokens[current].replace("INT_", "")); current++ }
  
    return dec
  }

  // parse function keyword
  function parseFunction() {
    let fnDec = {
      type: "FN",
      id: "",
      args: [],
      body: []
    } 

    current++

    if (tokens[current] && tokens[current].startsWith("ID_")) {
      fnDec.id = tokens[current].replace("ID_", "");
      current++
    } else { 
      console.error("Functions must have names")
    }

    if (tokens[current] === "OP") { current++ } else { console.error("Expected '(' sympol") }
    
    while (tokens[current] && tokens[current] !== "CP") { 
      if (tokens[current] && tokens[current].startsWith("ID_")) {
        fnDec.args.push(tokens[current].replace("ID_", ""))
        current++
      }  else {
        console.error("Expected a variable as a argemnt")
        process.exit(1)
      }

      if (tokens[current] === "COMMA") {
        current++
      } else if (tokens[current] !== "CP") {
        console.error("Expected ',' or ')' sympol")
        process.exit(1)
      }
    } 

    if (tokens[current] === "CP") { current++ } else { console.error("Expected ')' sympol") }
    if (tokens[current] === "OCB") { current++ } else { console.error("Expected '{' sympol") }

    while (current < tokens.length && tokens[current] !== "CCB") {
      let token = tokens[current]

      switch (token) {
        case "VAR": fnDec.body.push(parseVar()); break;
        case "VAL": fnDec.body.push(parseVal()); break;
        case "FN": fnDec.body.push(parseFunction()); break;
        default: current++; break;
      }
    }

    if (tokens[current] === "CCB") { current++ } else { console.error("Expected '}' sympol to close the function block") }

    return fnDec;
  }

  // nest parse funtion


  

  return ast;
}


