import { parseWhile } from "./whileParser.js";
import { parseVariable } from "./variableParser.js";
import { parseFunction } from "./functionsParser.js";

export function parseBlock(tokens, counter, target) {
  while (counter.current < tokens.length && tokens[counter.current] !== "CCB") {
   
    switch (tokens[counter.current]) {
      case "VAR": target.push(parseVariable(tokens, counter, "var")); break;
      case "VAL": target.push(parseVariable(tokens, counter, "val")); break;
      case "FN": target.push(parseFunction(tokens, counter)); break;
      case "WHILE": target.push(parseWhile(tokens, counter)); break;
      default: counter.current++; break;
    }
  }
}