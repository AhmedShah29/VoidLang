import { parseExpression } from "./expParser.js";
import { parseBlock } from "./blockParser.js";

export function parseWhile(tokens, counter) {
  let whileDec = {
    type: "WD",
    con: "",
    body: []
  }

  counter.current++

  if (tokens[counter.current] === "OP") { counter.current++ } else { console.error("Expected '(' sympol"); process.exit(1) }

  whileDec.con = parseExpression(tokens, counter)
  
  if (tokens[counter.current] === "CP") { counter.current++ } else { console.error("Expected ')' sympol"); process.exit(1) }
  if (tokens[counter.current] === "OCB") { counter.current++ } else { console.error("Expected '{' sympol"); process.exit(1) }
  
  parseBlock(tokens, counter, whileDec.body)
  
  if (tokens[counter.current] === "CCB") { counter.current++ } else { console.error("Expected '}' to close the while block"); process.exit(1) }
  return whileDec;
}