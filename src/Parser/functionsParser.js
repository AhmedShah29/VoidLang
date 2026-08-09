import { parseBlock } from "./blockParser.js";

export function parseFunction(tokens, counter) {
    let fnDec = {
      type: "FN",
      id: "",
      args: [],
      body: []
    } 

    counter.current++

    if (tokens[counter.current] && tokens[counter.current].startsWith("ID_")) {
      fnDec.id = tokens[counter.current].replace("ID_", "");
      counter.current++
    } else { 
      console.error("Functions must have names")
      process.exit(1)
    }

    if (tokens[counter.current] === "OP") { counter.current++ } else { console.error("Expected '(' sympol") }
    
    while (tokens[counter.current] && tokens[counter.current] !== "CP") { 
      if (tokens[counter.current] && tokens[counter.current].startsWith("ID_")) {
        fnDec.args.push(tokens[counter.current].replace("ID_", ""))
        counter.current++
      }  else {
        console.error("Expected a variable as a argemnt")
        process.exit(1)
      }

      if (tokens[counter.current] === "COMMA") {
        counter.current++
      } else if (tokens[counter.current] !== "CP") {
        console.error("Expected ',' or ')' sympol")
        process.exit(1)
      }
    } 

    if (tokens[counter.current] === "CP") { counter.current++ } else { console.error("Expected ')' sympol"); process.exit(1) }
    if (tokens[counter.current] === "OCB") { counter.current++ } else { console.error("Expected '{' sympol"); process.exit(1) }

    parseBlock(tokens, counter, fnDec.body)

    if (tokens[counter.current] === "CCB") { counter.current++ } else { console.error("Expected '}' sympol to close the function block"); process.exit(1) }

  return fnDec;
}