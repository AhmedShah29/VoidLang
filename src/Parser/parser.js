import { parseVariable } from "./variableParser.js"
import { parseFunction } from "./functionsParser.js"
import { parseWhile } from "./whileParser.js"
import { parseStatemnt } from "./stateParser.js"

export const parser = tokens => {
  let counter = { current: 0 }

  let ast = { type: "Program",body: [] }

  while (counter.current < tokens.length) {
    let token = tokens[counter.current]
    
    if (token.startsWith("ID_")) { parseStatemnt(tokens, counter) } else {
    
      switch (token) {
        case "VAR": ast.body.push(parseVariable(tokens, counter, "var")); break;
        case "VAL": ast.body.push(parseVariable(tokens, counter, "val")); break;
        case "FN": ast.body.push(parseFunction(tokens, counter)); break;
        case "WHILE": ast.body.push(parseWhile(tokens, counter)); break;
        default: counter.current++; break;
      }
    }
  }  
  return ast;
}