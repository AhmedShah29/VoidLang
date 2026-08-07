import { lexer } from "./lexer.js";
import { parser } from "./parser.js";
import { genrateCode } from "./codegen.js";

const fileName = Bun.argv[2]

// checks if ther is no file added or the file is not a .void file
if (!fileName) { console.error("No file given to compile"); process.exit(1) }
if (!fileName.endsWith(".void")) { console.error("Uknown file type"); process.exit(1) }

const compile = async () => {
  try {
    const file = Bun.file(fileName)
    const code = await file.text()

    const tokens = lexer(code)
    const ast = parser(tokens)
    const genratedCode = genrateCode(ast)

    Bun.write(`./builds/${fileName.replace(".void", ".js")}`, genratedCode, { createPath: true })
    console.log(`Successfully compiled ${fileName}`)
    
  } catch (err) {
    console.error("Error has happend during compiling", err)
    process.exit(1)
  }
}
compile()