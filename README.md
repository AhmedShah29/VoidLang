![License](https://img.shields.io/badge/License-Apache_2.0-black?style=for-the-badge&labelColor=000000&color=white)
![Void Compiler](https://img.shields.io/badge/Void-Compiler-black?style=for-the-badge&labelColor=000000&color=white)
![Bun](https://img.shields.io/badge/Runtime-Bun-black?style=for-the-badge&logo=bun&logoColor=white)

# Void Programming Language Compiler

An educational compiler and transpiler for **Void** (a custom programming language) written in JavaScript using the **Bun** runtime.

## Project Purpose

This project was built from scratch to deeply understand how compilers work behind the scenes — from lexical analysis (Lexer) and abstract syntax tree construction (AST Parsing) to code generation (Transpiling to JavaScript).

## Features

- **Custom Lexer**: Tokenizes source text into meaningful code symbols.
- **AST Parser**: Builds a structured Abstract Syntax Tree with strict error checking.
- > **Code Generator (Transpiler)**: Converts Void AST into clean JavaScript code. (Coming)

## Getting Started

### Requirements

- [Bun](https://bun.sh/) runtime installed.

### Running a File

```bash
bun src/main.js examples/app.void