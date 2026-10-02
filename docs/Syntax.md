# Void Language — Syntax Reference

> Note: this docment is still in beta syntax might change

| Principle | Meaning |
|-----------|---------|
| **Explicit over Implicit** | No implicit returns, no implicit narrowing, no hidden allocations |
| **Systems-Level Control** | Direct memory control, tree-shakable output |
| **Clean Syntax** | No semicolons, no mandatory parentheses in control flow |
| **Performance by Default** | Deep tree-shaking, no unused code in final executable |

---

## General Rules

| Rule | Details |
|------|---------|
| **Semicolons** | Not required — auto-inserted |
| **Parentheses** | Not required in `if`, `for`, `while`, `loop`, `stopif` |
| **Comments** | `#` for single-line comments only |
| **Namespaces** | None — flat, direct calls: `add()` |
| **Strings** | `"..."` creates `str` |
| **Characters** | `'a'` creates `c8` |
| **String Interpolation** | `$"Hello, {name}!"` |
| **Function Order** | Functions can be called before their declaration |
| **Variable Order** | Variables must be declared before use |

---

## String Interpolation

```
mut name = "Ahmed"
mut age = 25

put($"Hello, {name} welcome!")
put($"Your age is {age}")
put($"Next year: {age + 1}")

# Regular string (no interpolation)
put("Hello, {name}")   # prints literally: Hello, {name}
```

**Rules:**
- `$"..."` prefix activates interpolation
- `{expression}` evaluates any expression inside
- Result type is always `str`

### Escape Sequences

| Sequence | Meaning |
|----------|---------|
| `\0` | Null character |
| `\n` | Newline |
| `\t` | Tab |
| `\r` | Carriage return |
| `\\` | Backslash |
| `\'` | Single quote |
| `\"` | Double quote |

---

## Keywords

| Keyword | Usage |
|---------|-------|
| `fn` | Function declaration |
| `mut` | Mutable variable |
| `const` | Constant |
| `ret` | Return value (ONLY way to return) |
| `if` / `elif` / `else` | Conditional |
| `match` / `default` | Pattern matching |
| `true` / `false` | Boolean literals |
| `for` / `in` | Range loop |
| `while` / `loop` / `stopif` | Loops |
| `struct` / `enum` / `type` | Type definitions |
| `use` | Import |
| `pub` | Public visibility |
| `extern` | External C function |
| `@C` | Raw C code block |
| `error` / `panic` | Error creation (built-in) |
| `async` / `await` | Async functions |
| `join` / `race` / `select` | Async combinators |
| `inline` | Force inlining |

---

## Types

### Primitive Types

| Category | Types |
|----------|-------|
| **Signed Integers** | `i8`, `i16`, `i32`, `i64` |
| **Unsigned Integers** | `u8`, `u16`, `u32`, `u64` |
| **Floats** | `f32`, `f64` |
| **Booleans** | `bool` |
| **Characters** | `c8`, `c16`, `c32` |
| **Strings** | `str` |
| **Objects** | `obj` (dynamic key-value) |
| **References** | `&T` |
| **Nullable** | `T?` (type that can fail) |

### Collection Types

| Type | Memory | Management |
|------|--------|------------|
| `arr<T, N>` | Heap | Manual via `std.mem` |
| `vec<T>` | Heap | Auto-managed (RC) |

### User-Defined Types

| Type | Syntax |
|------|--------|
| `struct` | `struct Name { field: Type }` |
| `enum` | `enum Name: underlying_type { Variants }` |
| `type` alias | `type Alias = ExistingType` |

### Typing Rules

| Rule | Details |
|------|---------|
| **No numeric suffixes** | No `42u` or `3.14f` — type inferred from context |
| **Implicit widening** | `i8` → `i64` is automatic |
| **No implicit narrowing** | `i64` → `i8` requires explicit `as` cast |
| **Compile-time overflow check** | `mut x: u8 = 1000` → compile error |

---

## Variables

```
mut x: i32 = 10           # mutable, typed
mut y = 20                # mutable, type-inferred
const PI: f64 = 3.14      # immutable constant
mut data: obj = { key: "value" }  # object literal
mut name: str = "Ahmed"   # string
mut ch: c8 = 'A'          # character
```

---

## Functions

```
fn add(a: i32, b: i32) -> i32 {
    ret a + b
}

fn greet(name: str) {
    put($"Hello, {name}!")
}

inline fn fast_add(a: i32, b: i32) -> i32 {
    ret a + b
}
```

### Pass by Reference — `&` at Call Site

The `&` appears **only at the call site**, never in the function declaration.

```
fn update_count(o: obj) {
    o.count = 10
}

mut data = { count: 0 }

update_count(data)     # pass by VALUE — copy
update_count(&data)    # pass by REFERENCE — original modified
```

Applies to **all types**:

| Type | Without `&` | With `&` |
|------|------------|----------|
| `i32`, `bool` | Copy the value | Modify original |
| `struct` | Full copy | Modify original + no copy |
| `obj` | Deep copy | Modify original |
| `str`, `vec<T>` | Copy (with RC) | Modify original |

**Rules:**
- `ret` is the ONLY way to return a value
- Last expression is NOT auto-returned
- `&` never appears in function declarations
- Functions can be called before their declaration

---

## Visibility (`pub`)

```
# Private by default
fn helper() { }

# Public
pub fn api_function() { }

# Batch public declaration
pub {
    fn1,
    fn2,
    fn3
}

# Public types
pub struct User { name: str }
pub enum Color: u8 { Red, Green }
```

**Rules:**
- Everything is **private** to its file by default
- `pub` makes items accessible from other files
- `pub` functions with C-compatible types are exportable to C

---

## Error Handling (`T?`)

```
fn read_file(path: str) -> str? {
    if !fs.exists(path) {
        ret error("file not found")
    }
    ret fs.read(path)
}

mut data = read_file("config.toml")

if data.ok {
    put(data)          # data behaves as str directly — NO .val
} else {
    put(data.err)      # error message
}
```

**Rules:**
- `T?` marks a type as nullable (can fail)
- `.ok` checks success — inside the branch, the variable **is** the value
- `.err` holds the error message (`str`)
- No `.val` / `.value` needed
- Using `T?` without checking `.ok` → compile error

### `error()` and `panic()`

| Function | Behavior |
|----------|----------|
| `error("msg")` | Returns recoverable error from `T?` function |
| `panic("msg")` | Prints message and stops program immediately |

```
# error() — recoverable
fn divide(a: f64, b: f64) -> f64? {
    if b == 0 {
        ret error("division by zero")
    }
    ret a / b
}

# panic() — fatal
fn get(arr: vec<i32>, idx: i32) -> i32 {
    if idx < 0 || idx >= arr.len() {
        panic("index out of bounds")
    }
    ret arr[idx]
}
```

---

## Control Flow

### If / Elif / Else

```
# Short form — single expression
if x > 10 : put("big")

# Full form
if x > 10 {
    put("big")
} elif x > 5 {
    put("medium")
} else {
    put("small")
}
```

### Match (Expression-based)

```
mut result = match x {
    1 || 2 || 3 : "small"
    4 : "medium"
    default : "large"
}

# With ranges
mut status = match user.age {
    0..17 : "minor"
    18..65 : "adult"
    default : "senior"
}
```

**Rules:**
- Uses `:` for cases
- Multi-case with `||`
- `match` is an expression — returns a value
- Ranges supported with `..`

### Loops

```
# Range loop
for i in 1..10 {
    put(i)
}

# C-style — no parens
for mut i = 0; i < 10; i += 1 {
    put(i)
}

# While
while x < 10 {
    x += 1
}

# Loop with stopif — like do..while
loop {
    # code runs at least once
} stopif x >= 10
```

---

## Definitions

```
# Struct — lives on Stack
struct User {
    name: str,
    age: u8
}

# Struct methods
fn User.greet(self) {
    put($"Hello, {self.name}!")
}

fn User.birthday(self) {
    self.age += 1
}

# Usage
mut user = User { name: "Ahmed", age: 25 }
user.greet()
user.birthday()

# Enum with underlying type
enum Color: u8 {
    Red,
    Green,
    Blue
}

# Type alias
type ID = u64
```

**Method Rules:**
- Syntax: `fn TypeName.method_name(self)`
- `self` is passed by reference implicitly
- Called via dot notation: `user.greet()`

---

## Objects

```
# obj — dynamic key-value, pass by VALUE by default
mut user = {
    name: "Ahmed",
    age: 25
}

put(user.name)
user.age = 26

# Pass by reference
fn update(u: obj) {
    u.age = 30
}
update(&user)
```

---

## Arrays and Vectors

```
# Array literal
mut arr = [1, 2, 3]
mut typed_arr: arr<i32, 3> = [1, 2, 3]

# Vector literal
mut v: vec<i32> = [1, 2, 3]

# Index access (starts from 0)
put(arr[0])    # 1
put(v[2])      # 3

# Vector operations
v.push(4)
mut last = v.pop()
put(v.len())
```

---

## Operators

| Category | Operators |
|----------|-----------|
| **Arithmetic** | `+`, `-`, `*`, `/`, `%` |
| **Comparison** | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| **Bitwise shift** | `<<`, `>>` |
| **Logical** | `&&`, `\|\|`, `!` |
| **Bitwise** | `&`, `\|` |
| **Assignment** | `=` |
| **Compound Assignment** | `+=`, `-=`, `*=`, `/=`, `%=` |
| **Reference** | `&` (call site only) |
| **Return arrow** | `->` |
| **Interpolation** | `$"..."` |
| **Nullable** | `T?` |
| **Delimiters** | `(`, `)`, `{`, `}`, `[`, `]`, `,`, `:`, `.` |

---

## Async System

```
# Signature shows the VALUE type, not State
async fn fetch(url: str) -> str {
    ret await http.get(url)
}

# Without await → State struct handle
mut task = fetch("https://example.com")

if task.state == processing {
    put("still working...")
}

# await → unwraps to value
mut data = await task    # data is str
```

### State struct fields

| Field | Meaning |
|-------|---------|
| `state` | `pending` \| `processing` \| `success` \| `fail` |
| `error` | Failure reason (`str`) |

### join / race

```
# join = wait for ALL (Promise.all)
mut results = join [t1, t2, t3]

# race = wait for FIRST (Promise.race)
mut fastest = race [t1, t2]
```

### select

```
select {
    case data = await fetch("https://server1.com") :
        put($"Server 1: {data}")
    case timeout(5000) :
        put("Timeout!")
}
```

---

## Imports

```
# Standard library
use std.io
use std.fs
use std.mem

# Local files
use src.utils
use src.math

# Specific items
use src.utils : { helper, format_name }
```

Calls are flat and direct: `helper()` — no namespace prefixes.

---

## C Interoperability

### `extern` — Call C from Void

```
extern fn printf(fmt: str, ...) -> i32
extern fn malloc(size: u64) -> *u8
```

### `@C` — Raw C code

```
@C {
    int x = 10;
    printf("hello from C\n");
}
```

### `pub` — Export to C

```
pub fn add(a: i32, b: i32) -> i32 {
    ret a + b
}
# Generated C: int32_t add(int32_t a, int32_t b)
```

---

## Complete Example

```
use std.io
use std.fs

struct User {
    name: str,
    age: u8
}

fn User.greet(self) {
    put($"Hello, {self.name}!")
}

enum Status: u8 {
    Active,
    Inactive,
    Banned
}

async fn fetch_user(id: u64) -> User {
    ret await http.get($"/api/users/{id}")
}

fn read_config(path: str) -> str? {
    if !fs.exists(path) {
        ret error("config not found")
    }
    ret fs.read(path)
}

async fn main() {
    mut user = User {
        name: "Ahmed",
        age: 25
    }
    user.greet()

    mut config = read_config("app.toml")
    if config.ok {
        put(config)
    } else {
        put($"Error: {config.err}")
    }

    mut status = match user.age {
        0..17 : "minor"
        18..65 : "adult"
        default : "senior"
    }
    put($"Status: {status}")

    mut t1 = fetch_user(1)
    mut t2 = fetch_user(2)
    mut results = join [t1, t2]
    put($"Loaded {results.len()} users")
}
```

---