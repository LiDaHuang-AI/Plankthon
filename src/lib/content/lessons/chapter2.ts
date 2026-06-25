import { Lesson } from "../lessons";

export const chapter2: Lesson[] = [
  {
    id: "ch2-dictionary",
    chapter: 2,
    title: "Dictionaries",
    pages: [
      {
        title: "Key-Value Pairs",
        explanation: "A **Dictionary** stores data in pairs, just like a real-world dictionary stores a word (the key) and its definition (the value).\n\nDictionaries are created using curly brackets `{}`. Inside, you separate the key and the value using a colon `:`. Keys must be unique!",
        exampleCode: "user = {'name': 'Planky', 'age': 2}\nprint(user)",
        expectedOutput: "{'name': 'Planky', 'age': 2}\n",
        hint: "Dictionaries are unordered collections."
      },
      {
        title: "Lookups and Updates",
        explanation: "To look up a value, you use square brackets `[]` and provide the key. For example, `user['name']`.\n\nYou can also use square brackets to update an existing value or add a brand new key-value pair!",
        exampleCode: "d = {'x': 5}\nd['x'] = 10\nprint(d['x'])",
        expectedOutput: "10\n",
        hint: "Keys can be strings or numbers."
      },
      {
        title: "Your Turn",
        explanation: "Create and update a dictionary.",
        exercise: {
          prompt: "Create `d = {'x': 5}`. Change 'x' to 10 and print `d['x']`.",
          starter: "d = {'x': 5}",
          check: "10\n"
        },
        hint: "Use d['x'] = 10"
      }
    ]
  },
  {
    id: "ch2-tuples-sets",
    chapter: 2,
    title: "Tuples & Sets",
    pages: [
      {
        title: "Tuples: Unchangeable Lists",
        explanation: "A **Tuple** is exactly like a list, except it is **immutable** (it cannot be changed after creation). You cannot append to or edit a tuple.\n\nTuples use parentheses `()` instead of square brackets. You still access items using `[index]`.",
        exampleCode: "t = (1, 2, 3)\nprint(t[0])",
        expectedOutput: "1\n",
        hint: "Tuples are faster than lists."
      },
      {
        title: "Sets: Unique Items",
        explanation: "A **Set** is an unordered collection where **all items must be unique**. If you add a duplicate, it is ignored.\n\nSets use curly brackets `{}`, just like dictionaries, but they contain single values instead of key-value pairs. You can use the built-in `len()` function to count items in tuples, sets, and lists.",
        exampleCode: "s = {1, 1, 2, 3}\nprint(len(s))",
        expectedOutput: "3\n",
        hint: "The duplicate '1' was removed!"
      },
      {
        title: "Your Turn",
        explanation: "Create a Set.",
        exercise: {
          prompt: "Create a set `s = {1, 1, 2}` and print its length.",
          starter: "",
          check: "2\n"
        },
        hint: "print(len(s))"
      }
    ]
  },
  {
    id: "ch2-string-methods",
    chapter: 2,
    title: "String Methods",
    pages: [
      {
        title: "Changing Case",
        explanation: "Strings have built-in superpowers called **Methods**. A method is like a function that belongs specifically to an object. You call it using a dot `.`.\n\nFor example, `.upper()` converts a string to all uppercase, and `.lower()` converts it to all lowercase.",
        exampleCode: "word = 'Planky'\nprint(word.upper())\nprint(word.lower())",
        expectedOutput: "PLANKY\nplanky\n",
        hint: "Notice the parentheses after the method name."
      },
      {
        title: "Replace and Strip",
        explanation: "The `.replace('old', 'new')` method swaps out text.\n\nThe `.strip()` method is incredibly useful for removing accidental spaces at the beginning and end of a string. The `.split()` method breaks a string into a List of words.",
        exampleCode: "text = ' I love cats '\nprint(text.strip())\nprint(text.replace('cats', 'dogs'))",
        expectedOutput: "I love cats\n I love dogs \n",
        hint: "Methods return a new string, they don't change the original."
      },
      {
        title: "Your Turn",
        explanation: "Use a string method.",
        exercise: {
          prompt: "Print the result of replacing 'cat' with 'dog' in the string 'my cat'.",
          starter: "",
          check: "my dog\n"
        },
        hint: "print('my cat'.replace(...))"
      }
    ]
  },
  {
    id: "ch2-comprehensions",
    chapter: 2,
    title: "Comprehensions",
    pages: [
      {
        title: "List Comprehensions",
        explanation: "A **List Comprehension** is a 1-line, super-fast way to create a list. It combines a `for` loop and a list creation into a single shorthand expression.\n\nSyntax: `[expression for item in iterable]`",
        exampleCode: "nums = [x * 2 for x in range(3)]\nprint(nums)",
        expectedOutput: "[0, 2, 4]\n",
        hint: "This is much faster than writing a full loop with .append()"
      },
      {
        title: "Filtering",
        explanation: "You can add an `if` condition to the end of your comprehension to instantly filter the list as it is being created! Yes, you can also make Dictionary comprehensions using `{}`.",
        exampleCode: "evens = [x for x in range(5) if x % 2 == 0]\nprint(evens)",
        expectedOutput: "[0, 2, 4]\n",
        hint: "x % 2 == 0 checks if a number is even."
      },
      {
        title: "Your Turn",
        explanation: "Write a comprehension.",
        exercise: {
          prompt: "Create a list comprehension of [x] for x in range(4) if x > 1. Print the list.",
          starter: "",
          check: "[2, 3]\n"
        },
        hint: "print([x for x in range(4) if x > 1])"
      }
    ]
  },
  {
    id: "ch2-exceptions",
    chapter: 2,
    title: "Exceptions",
    pages: [
      {
        title: "Catching Errors",
        explanation: "When code crashes, it throws an **Exception** (like `ZeroDivisionError`). You can prevent your program from crashing by 'catching' these errors using a `try` / `except` block.\n\nIf the code inside `try` succeeds, the `except` block is entirely skipped.",
        exampleCode: "try:\n    print(10 / 0)\nexcept:\n    print('Math error!')",
        expectedOutput: "Math error!\n",
        hint: "The program didn't crash!"
      },
      {
        title: "Raise and Finally",
        explanation: "You can manually trigger an error using the `raise` keyword.\n\nYou can also add a `finally` block at the very end. The `finally` block ALWAYS runs, regardless of whether an error occurred or not (great for cleaning up!).",
        exampleCode: "try:\n    print(1)\nexcept:\n    print(2)\nfinally:\n    print('Done')",
        expectedOutput: "1\nDone\n",
        hint: "You can have multiple except blocks for different errors."
      },
      {
        title: "Your Turn",
        explanation: "Handle an error safely.",
        exercise: {
          prompt: "Write a try/except block. Try to print 1/0. Except: print 'Error'.",
          starter: "",
          check: "Error\n"
        },
        hint: "Don't forget the colons and indentation."
      }
    ]
  },
  {
    id: "ch2-modules",
    chapter: 2,
    title: "Modules & Imports",
    pages: [
      {
        title: "Importing Libraries",
        explanation: "A **Module** is simply a Python file (`.py`) containing code someone else wrote. You can load these modules into your program using the `import` keyword.\n\nPython comes with many built-in modules, like `math`.",
        exampleCode: "import math\nprint(math.ceil(1.2))",
        expectedOutput: "2\n",
        hint: "Use dot-notation to access functions inside a module."
      },
      {
        title: "Specific Imports",
        explanation: "If you don't want to type `math.` every time, you can import ONLY specific functions using the `from` keyword: `from math import sqrt`.\n\nYou can also rename modules as you import them: `import math as m`.",
        exampleCode: "from math import floor\nprint(floor(1.9))",
        expectedOutput: "1\n",
        hint: "Now you don't need to type math.floor()!"
      },
      {
        title: "Your Turn",
        explanation: "Use a math function.",
        exercise: {
          prompt: "From 'math' import 'floor', and print floor(1.9).",
          starter: "",
          check: "1\n"
        },
        hint: "from math import floor"
      }
    ]
  },
  {
    id: "ch2-file-io",
    chapter: 2,
    title: "File I/O",
    pages: [
      {
        title: "Opening and Writing",
        explanation: "You can interact with files on your computer using the built-in `open()` function. You must specify a mode: `'r'` for reading, `'w'` for writing, and `'a'` for appending.\n\nAfter writing using the `.write()` method, you MUST call `.close()` to save your changes.",
        exampleCode: "f = open('test.txt', 'w')\nf.write('hello')\nf.close()\nprint('Done')",
        expectedOutput: "Done\n",
        hint: "Writing ('w') will overwrite the entire file."
      },
      {
        title: "The 'with' Keyword",
        explanation: "Manually closing files is annoying. Instead, you can use a Context Manager via the `with` keyword. \n\nWhen the indented `with` block ends, Python automatically closes the file for you!",
        exampleCode: "with open('log.txt', 'w') as f:\n    f.write('ok')\nprint('Saved')",
        expectedOutput: "Saved\n",
        hint: "To read a file, use the .read() method."
      },
      {
        title: "Your Turn",
        explanation: "Write to a file using 'with'.",
        exercise: {
          prompt: "Use `with open('log.txt', 'w') as f:` to write 'ok'. Then print 'Saved'.",
          starter: "",
          check: "Saved\n"
        },
        hint: "Don't forget the colon after the with statement."
      }
    ]
  }
];
