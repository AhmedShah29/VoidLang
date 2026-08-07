// node = ast in parse.js
export const genrateCode = node => {
  let output = ""

  for (let i = 0; i < node.body.length; i++){
    switch (node.body[i].type) {
      case "VD": output += variableGen(node.body[i]) + '\n'; break;
      case "FN": output += functionGen(node.body[i]) + '\n'; break;
    }
  }
  return output
}

/* -------------------------- Genration Functions -------------------------- */

// Variables genration
const variableGen = node => {
  const keyword = node.kind === "var" ? "let" : "const"
  return `${keyword} ${node.id} = ${node.value};`
}

// function genration
const functionGen = node => {
  const args = node.args ? node.args.join(", ") : ""

  const fnBody = genrateCode({ body: node.body })
    .split('\n')
    .filter(ln => ln.trim() !== '')
    .map(ln => `  ${ln}`)
    .join("\n")

  return `function ${node.id}(${args}) {\n${fnBody}\n}`
}