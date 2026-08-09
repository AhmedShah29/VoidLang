export function parseExpression(tokens, counter) {
  let exp = {
    type: "B_EXP",
    left: null,
    operator: null,
    right: null
  }

  // left side process
  if (tokens[counter.current]) {
    if (tokens[counter.current].startsWith("ID_")) { exp.left = tokens[counter.current].slice(3); counter.current++ }
    else if (tokens[counter.current].startsWith("INT_")) { exp.left = Number(tokens[counter.current].slice(4)); counter.current++ }
    else if (tokens[counter.current].startsWith("STR_")) { exp.left = `"${tokens[counter.current].slice(4)}"`; counter.current++ }
    else { console.error("Expected a variable a string or a number");  process.exit(1) }
  }

  // operator checker
  if (tokens[counter.current] === "D_EQUALS") { exp.operator = "=="; counter.current++ }
  else if (tokens[counter.current] === "NOT_EQUALS") { exp.operator = "!="; counter.current++ }
  else if (tokens[counter.current] === "L_THAN") { exp.operator = "<"; counter.current++ }
  else if (tokens[counter.current] === "B_THAN") { exp.operator = ">"; counter.current++ }
  else { console.error("Expected a supported opration ==, !=, >, <");  process.exit(1)}

  // right side process
  if (tokens[counter.current]) {
    if (tokens[counter.current].startsWith("ID_")) { exp.right = tokens[counter.current].slice(3); counter.current++ }
    else if (tokens[counter.current].startsWith("INT_")) { exp.right = Number(tokens[counter.current].slice(4)); counter.current++ }
    else if (tokens[counter.current].startsWith("STR_")) { exp.right = `"${tokens[counter.current].slice(4)}"`; counter.current++ }
    else { console.error("Expected a variable a string or a number after opration");  process.exit(1) }
  }
  return exp
}