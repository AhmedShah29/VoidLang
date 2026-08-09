#!/usr/bin/env bun

import { lexer } from "./lexer.js";
import { parser } from "./Parser/parser.js";
import { genrateCode } from "./codegen.js";
import { resolve, basename } from "path"

const fileName = Bun.argv[2]

// checks if ther is no file added or the file is not a .void file
if (!fileName) { console.error("No file given to compile"); process.exit(1) }
if (!fileName.endsWith(".void")) { console.error("Uknown file type"); process.exit(1) }

const fixedPath = resolve(process.cwd(), fileName)

const compile = async () => {
  try {
    const file = Bun.file(fixedPath)
    const code = await file.text()

    const tokens = lexer(code)
    const ast = parser(tokens)
    const genratedCode = genrateCode(ast)

    const cleanFileName = basename(fileName, ".void")

    await Bun.write(`./builds/${cleanFileName}.js`, genratedCode, { createPath: true })
    console.log(`Successfully compiled ${fileName}`)
    
  } catch (err) {
    console.error("Error has happend during compiling\n", err.message)
    process.exit(1)
  }
}
compile()