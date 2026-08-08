# Roadmap & To-Add List

This document tracks planned features, enhancements, and upcoming updates for the **Void** programming language and compiler.

## Planned Features

* [ ] **Function Calls**: Support calling/invoking defined functions with arguments.
  * [ ] Add function call tokenization and parsing (`ID_name(args)`).
  * [ ] Implement AST node representation for function calls (`CALL`).
  * [ ] Generate equivalent JavaScript function invocation in `codegen.js`.
  * [ ] Handle passing variable references and literal values as arguments.


* [ ] **Binary Expressions & Math**: Add support for arithmetic operations (`+`, `-`, `*`, `/`).
  * [ ] Update the Lexer to recognize arithmetic symbols (`+`, `-`, `*`, `/`).
  * [ ] Expand `parseExpression()` to handle operator precedence and grouping parentheses.
  * [ ] Update the AST structure to evaluate mathematical expressions in assignments and conditions.
  * [ ] Generate valid JavaScript math expressions during code generation.


* [ ] **Conditional Statements**: Implement `if`, `else if`, and `else` blocks.
  * [ ] Add keywords (`if`, `else`) to the Lexer.
  * [ ] Build `parseIf()` logic to handle conditional checks and block bodies.
  * [ ] Support chained `else if` and fallback `else` blocks in the AST.
  * [ ] Implement code generation (`ifGen`) to output valid JavaScript conditional structures.


* [ ] **Loops**: Add support for `while` and `for` loop constructs.
  * [x] **While** loop
    * [x] Lexer support for `while` keyword and comparison operators (`==`, `!=`, `<`, `>`).
    * [x] Parser support (`parseWhile`) with expression evaluation for conditions.
    * [x] Code generation (`whileGen`) to output JavaScript `while` loops with proper indentation.

  * [ ] **for** loop
    * [ ] Add `for` keyword and iteration syntax tokens to the Lexer.
    * [ ] Implement `parseFor()` logic for range-based or condition-based loops.
    * [ ] Generate corresponding JavaScript loop structures (`for` or equivalent desugared constructs).




* [ ] **Boolean Types**: Introduce `true` and `false` literals along with logical operators (`&&`, `||`, `!`).
  * [ ] Tokenize boolean keywords (`true`, `false`) and logical operators (`&&`, `||`, `!`).
  * [ ] Update the parser to handle boolean literals and logical expressions.
  * [ ] Ensure correct code generation for boolean assignments and expression evaluations.


* [ ] **Return Statements**: Allow functions to return values using a `return` keyword.
  * [ ] Add `return` keyword to the Lexer.
  * [ ] Implement `parseReturn()` to capture return values (variables, numbers, strings, or expressions).
  * [ ] Update `functionGen` in `codegen.js` to output proper `return` statements inside function bodies.


* [ ] **Source Location Tracking**: Enhance compiler error messages to display exact line and column numbers during syntax errors.
  * [ ] Track line numbers and column offsets during the Lexer phase.
  * [ ] Attach position metadata (`line`, `column`) to generated tokens.
  * [ ] Update `console.error` and `process.exit(1)` across parsers and code generators to output precise file locations when syntax or validation errors occur.