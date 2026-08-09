export function parseVariable(tokens, counter, kind) {
  let dec = {
    type: "VD",
    kind: kind,
    id: "",
    value: null
  }

  counter.current++
  
  // sets da variable name as a id 
  if (tokens[counter.current] && tokens[counter.current].startsWith("ID_")) { dec.id = tokens[counter.current].slice(3); counter.current++ }
  
  // checks the opration
  if (tokens[counter.current] === "EQUALS") { counter.current++ } else { console.error("Expected '=' Symbol"); process.exit(1); }

  // value check
  if (tokens[counter.current]) {
    if (tokens[counter.current].startsWith("INT_")) { dec.value = Number(`${tokens[counter.current].slice(4)}`); counter.current++ }
      else if (tokens[counter.current].startsWith("STR_")) { dec.value = `"${tokens[counter.current].slice(4)}"`; counter.current++ }
  }
  return dec
}