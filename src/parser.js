export const parser = tokens => {
  let current = 0

  let ast = { type: "Program",body: [] }

  while (current < tokens.length) {
    let token = tokens[current]

    switch (token) {
      case "VAR": ast.body.push(parseVariable("var")); break;
      case "VAL": ast.body.push(parseVariable("val")); break;
      case "FN": ast.body.push(parseFunction()); break;
      default: current++; break;
    } 
  }

  /* -------------------------- parsers Functions -------------------------- */

  // Variable parse function
  function parseVariable(kind) {
    let dec = {
      type: "VD",
      kind: kind,
      id: "",
      value: null
    }
  
    current++
    
    // sets da variable name as a id 
    if (tokens[current] && tokens[current].startsWith("ID_")) { dec.id = tokens[current].slice(3); current++ }
    
    // checks the opration
    if (tokens[current] === "EQUALS") { current++ } else { console.error("Expected '=' Symbol"); process.exit(1); }

    // value check
    if (tokens[current]) {
      if (tokens[current].startsWith("INT_")) { dec.value = Number(`${tokens[current].slice(4)}`); current++ }
        else if (tokens[current].startsWith("STR_")) { dec.value = `"${tokens[current].slice(4)}"`; current++ }
    }
    
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

    if (tokens[current] === "CP") { current++ } else { console.error("Expected ')' sympol"); process.exit(1) }
    if (tokens[current] === "OCB") { current++ } else { console.error("Expected '{' sympol"); process.exit(1) }

    while (current < tokens.length && tokens[current] !== "CCB") {
      let token = tokens[current]

      switch (token) {
        case "VAR": fnDec.body.push(parseVariable("var")); break;
        case "VAL": fnDec.body.push(parseVariable("val")); break;
        case "FN": fnDec.body.push(parseFunction()); break;
        default: current++; break;
      }
    }

    if (tokens[current] === "CCB") { current++ } else { console.error("Expected '}' sympol to close the function block"); process.exit(1) }

    return fnDec;
  }

  // while parser
  function parseWhile() {
    let whileDec = {
      type: "WD",
      con: "",
      body: []
    }

    current++

    if (tokens[current] === "OP") { current++ } else { console.error("Expected '(' sympol"); process.exit(1) }

    whileDec.con = parseExpression()
    
    if (tokens[current] === "CP") { current++ } else { console.error("Expected ')' sympol"); process.exit(1) }
    if (tokens[current] === "OCB") { current++ } else { console.error("Expected '{' sympol"); process.exit(1) }
    

    while (current < tokens.length && tokens[current] !== "CCB") {
     
      switch (tokens[current]) {
        case "VAR": whileDec.body.push(parseVariable("var")); break;
        case "VAL": whileDec.body.push(parseVariable("val")); break;
        case "FN": whileDec.body.push(parseFunction()); break;
        case "WHILE": whileDec.body.push(parseWhile()); break
        default: current++; break;
      }
    }
    if (tokens[current] === "CCB") { current++ } else { console.error("Expected '}' to close the while block")}
    return whileDec;
  }

  // parse expression
  function parseExpression() {
    let exp = {
      type: "B_EXP",
      left: null,
      operator: null,
      right: null
    }

    // left side process
    if (tokens[current]) {
      if (tokens[current].startsWith("ID_")) { exp.left = tokens[current].slice(3); current++ }
      else if (tokens[current].startsWith("INT_")) { exp.left = Number(tokens[current].slice(4)); current++ }
      else if (tokens[current].startsWith("STR_")) { exp.left = `"${tokens[current].slice(4)}"`; current++ }
      else { console.error("Expected a variable a string or a number");  process.exit(1) }
    }

    // operator checker
    if (tokens[current] === "D_EQUALS") { exp.operator = "=="; current++ }
    else if (tokens[current] === "NOT_EQUALS") { exp.operator = "!="; current++ }
    else if (tokens[current] === "L_THAN") { exp.operator = "<"; current++ }
    else if (tokens[current] === "B_THAN") { exp.operator = ">"; current++ }
    else { console.error("Expected a supported opration ==, !=, >, <");  process.exit(1)}

    // right side process
    if (tokens[current]) {
      if (tokens[current].startsWith("ID_")) { exp.right = tokens[current].slice(3); current++ }
      else if (tokens[current].startsWith("INT_")) { exp.right = Number(tokens[current].slice(4)); current++ }
      else if (tokens[current].startsWith("STR_")) { exp.right = `"${tokens[current].slice(4)}"`; current++ }
      else { console.error("Expected a variable a string or a number after opration");  process.exit(1) }
    }
    return exp
  }
  return ast;
}