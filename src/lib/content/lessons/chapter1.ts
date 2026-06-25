import { Lesson } from "../lessons";

export const chapter1: Lesson[] = [
  {
    id: "ch1-basic",
    chapter: 1,
    title: "Basic",
    pages: [
      {
        title: "Displaying Output",
        explanation: "Welcome to Python! The very first thing you need to learn is how to make the computer talk to you.\n\nWe do this using a built-in command called `print()`. Whenever you want Python to display something on the screen, you must use the exact word `print` followed by parentheses `()`.",
        exampleCode: "print(5)",
        expectedOutput: "5\n",
        hint: "Numbers can be printed exactly as they are!"
      },
      {
        title: "Text and Quotes",
        explanation: "In Python, text is known as a **String**. If you want to print text, you cannot just type it. You must wrap the text in quotes so Python knows it's a string of characters.\n\nYou can use either single quotes `'...'` or double quotes `\"...\"`. Both work perfectly, but you must be consistent!",
        exampleCode: "print('Hello!')\nprint(\"Planky is cool\")",
        expectedOutput: "Hello!\nPlanky is cool\n",
        hint: "Without quotes, Python will look for a command named Hello and crash!"
      },
      {
        title: "Your Turn",
        explanation: "Let's put your new skills to the test.",
        exercise: {
          prompt: "Write a command to print the word Apple.",
          starter: "",
          check: "Apple\n"
        },
        hint: "Make sure you use print() and put quotes around Apple."
      }
    ]
  },
  {
    id: "ch1-strings",
    chapter: 1,
    title: "Strings",
    pages: [
      {
        title: "String Concatenation",
        explanation: "You can glue multiple strings together into one long string. This is called **concatenation**.\n\nIn Python, you use the math addition symbol `+` to concatenate strings. It literally sticks the second string directly onto the end of the first string.",
        exampleCode: "print('py' + 'thon')",
        expectedOutput: "python\n",
        hint: "Notice how they are pushed together."
      },
      {
        title: "Spacing and Errors",
        explanation: "When you use `+`, Python does NOT add a space for you. If you want a space, you must include it inside the quotes of one of your strings (e.g., `'Hello ' + 'World'`).\n\nAlso, Python is strictly typed. You cannot use `+` to mix a String and a Number (like `'A' + 2`). This will cause a crash!",
        exampleCode: "print('Good' + ' ' + 'Morning')",
        expectedOutput: "Good Morning\n",
        hint: "You can add strings containing just a space."
      },
      {
        title: "Your Turn",
        explanation: "Time to glue some text together.",
        exercise: {
          prompt: "Print the phrase 'Hello World' by concatenating 'Hello ' and 'World'.",
          starter: "",
          check: "Hello World\n"
        },
        hint: "print('Hello ' + 'World')"
      }
    ]
  },
  {
    id: "ch1-variables",
    chapter: 1,
    title: "Variables",
    pages: [
      {
        title: "Storing Data",
        explanation: "A **Variable** is a named container that stores data. You assign data to a variable using a single equals sign `=`. \n\nThe variable name goes on the left, and the data goes on the right.",
        exampleCode: "x = 5\nname = 'Planky'\nprint(x)\nprint(name)",
        expectedOutput: "5\nPlanky\n",
        hint: "When printing a variable, don't use quotes!"
      },
      {
        title: "Naming Rules and Reassignment",
        explanation: "Variables can be reassigned at any time. If you say `x = 1` and then later `x = 2`, the old value is forgotten forever.\n\n**Naming Rules:**\n- Names cannot have spaces (use underscores `_` instead, like `my_name`).\n- Names cannot start with a number (so `1name` is invalid).",
        exampleCode: "age = 10\nage = 20\nprint(age)",
        expectedOutput: "20\n",
        hint: "It prints the most recent value."
      },
      {
        title: "Your Turn",
        explanation: "Let's create a variable.",
        exercise: {
          prompt: "Create a variable `age` and set it to 20. Then print `age`.",
          starter: "",
          check: "20\n"
        },
        hint: "age = 20"
      }
    ]
  },
  {
    id: "ch1-numbers",
    chapter: 1,
    title: "Numbers & Operators",
    pages: [
      {
        title: "Math in Python",
        explanation: "Python is a powerful calculator. You can use standard math symbols:\n- Addition: `+`\n- Subtraction: `-`\n- Multiplication: `*` (asterisk)\n- Division: `/` (forward slash)\n\nPython strictly follows the Order of Operations (PEMDAS).",
        exampleCode: "print(2 + 3 * 2)",
        expectedOutput: "8\n",
        hint: "Multiplication happens before addition."
      },
      {
        title: "Integers vs Floats",
        explanation: "Python has two main types of numbers:\n- **Integers**: Whole numbers like `5` or `-10`.\n- **Floats**: Decimal numbers like `3.14`.\n\nAny time you perform division `/`, Python automatically converts the answer into a Float (e.g., `10 / 2` results in `5.0`).",
        exampleCode: "print(10 / 2)",
        expectedOutput: "5.0\n",
        hint: "Notice the decimal point."
      },
      {
        title: "Your Turn",
        explanation: "Calculate a result.",
        exercise: {
          prompt: "Print the result of 15 divided by 3.",
          starter: "",
          check: "5.0\n"
        },
        hint: "print(15 / 3)"
      }
    ]
  },
  {
    id: "ch1-input",
    chapter: 1,
    title: "input()",
    pages: [
      {
        title: "Getting User Input",
        explanation: "You can pause your program and wait for the user to type something by using the `input()` function. \n\nYou can put a string inside the parentheses to act as a prompt for the user.",
        exampleCode: "input('What is your name? ')",
        expectedOutput: "",
        hint: "The program waits until the user hits Enter."
      },
      {
        title: "Storing Input",
        explanation: "The `input()` function always returns the user's answer as a **String**, even if they type a number! You should store this answer in a variable so you can use it.\n\nExample: `name = input('Name: ')`",
        exampleCode: "",
        expectedOutput: "",
        hint: "Remember: '5' + '5' is '55' because input is a string."
      },
      {
        title: "Your Turn",
        explanation: "Let's capture some input.",
        exercise: {
          prompt: "Use input() to ask for a name, then print 'Hi ' + name.",
          starter: "name = input()",
          check: "Hi Planky\n"
        },
        hint: "Use string concatenation!"
      }
    ]
  },
  {
    id: "ch1-booleans",
    chapter: 1,
    title: "Booleans",
    pages: [
      {
        title: "True and False",
        explanation: "A **Boolean** is a data type that only has two possible values: True or False. These are like binary switches (1 or 0, On or Off).\n\nIn Python, you must capitalize them exactly: `True` and `False`.",
        exampleCode: "x = True\nprint(x)",
        expectedOutput: "True\n",
        hint: "Notice there are no quotes around True."
      },
      {
        title: "Comparisons",
        explanation: "You can generate booleans by comparing values:\n- Greater/Less: `>`, `<`\n- Equal to: `==` (Notice the double equals! A single equals `=` is for assigning variables, `==` is for asking 'are they equal?').",
        exampleCode: "print(5 > 3)\nprint(10 == 5)",
        expectedOutput: "True\nFalse\n",
        hint: "Python evaluates the math and returns a Boolean."
      },
      {
        title: "Your Turn",
        explanation: "Print a boolean.",
        exercise: {
          prompt: "Assign `active = False` and print it.",
          starter: "",
          check: "False\n"
        },
        hint: "Remember to capitalize False."
      }
    ]
  },
  {
    id: "ch1-conditions",
    chapter: 1,
    title: "Conditions",
    pages: [
      {
        title: "The if Statement",
        explanation: "We use the `if` keyword to run code only when a condition is True. \n\nAt the end of the `if` statement line, you must put a colon `:`. Then, the code that belongs inside the if-block must be indented (usually by 4 spaces).",
        exampleCode: "if 5 > 3:\n    print('Math works!')",
        expectedOutput: "Math works!\n",
        hint: "If the condition was False, the print would be skipped entirely."
      },
      {
        title: "else and elif",
        explanation: "You can provide alternative paths.\n- `else:` runs when the if-condition is False (otherwise).\n- `elif:` stands for 'else if', letting you check a new condition if the first one failed.",
        exampleCode: "x = 10\nif x == 5:\n    print('A')\nelif x == 10:\n    print('B')\nelse:\n    print('C')",
        expectedOutput: "B\n",
        hint: "It checks them in order top-to-bottom."
      },
      {
        title: "Your Turn",
        explanation: "Write a basic condition.",
        exercise: {
          prompt: "Write an if statement: if 5 == 5, print 'Yes'.",
          starter: "",
          check: "Yes\n"
        },
        hint: "Don't forget the colon and indentation."
      }
    ]
  },
  {
    id: "ch1-loops",
    chapter: 1,
    title: "Loops",
    pages: [
      {
        title: "The for Loop",
        explanation: "Loops let you repeat code. The `for` keyword creates a loop that runs a specific number of times.\n\nWe often pair it with `range(n)`, which generates a sequence of numbers starting at `0` up to (but not including) `n`.",
        exampleCode: "for i in range(3):\n    print(i)",
        expectedOutput: "0\n1\n2\n",
        hint: "Like if statements, loops require a colon and indentation."
      },
      {
        title: "The while Loop",
        explanation: "The `while` keyword creates a loop that continues running over and over as long as a condition remains True. If the condition never becomes False, you will create an infinite loop and crash your computer!",
        exampleCode: "x = 1\nwhile x < 3:\n    print(x)\n    x = x + 1",
        expectedOutput: "1\n2\n",
        hint: "We manually increase x so the loop eventually stops."
      },
      {
        title: "Your Turn",
        explanation: "Write a for loop.",
        exercise: {
          prompt: "Write a for loop using range(3) that prints the loop variable 'i'.",
          starter: "",
          check: "0\n1\n2\n"
        },
        hint: "for i in range(3):"
      }
    ]
  },
  {
    id: "ch1-lists",
    chapter: 1,
    title: "Lists",
    pages: [
      {
        title: "Creating Lists",
        explanation: "A **List** lets you store multiple items in a single variable. Lists are defined using square brackets `[]`, and items are separated by commas `,`.\n\nLists can hold mixed data types, like numbers and strings together!",
        exampleCode: "my_list = [5, 'Apple', True]\nprint(my_list)",
        expectedOutput: "[5, 'Apple', True]\n",
        hint: "Lists are extremely flexible in Python."
      },
      {
        title: "Indexing and Appending",
        explanation: "Lists are Zero-indexed, meaning the first item is at index 0. You access items using square brackets: `my_list[0]`.\n\nYou can add new items to the end of a list using the `.append()` method.",
        exampleCode: "x = [10, 20]\nx.append(30)\nprint(x[1])",
        expectedOutput: "20\n",
        hint: "x[1] gets the second item."
      },
      {
        title: "Your Turn",
        explanation: "Access a list.",
        exercise: {
          prompt: "Create a list `a = [5, 10]` and print the second item.",
          starter: "",
          check: "10\n"
        },
        hint: "Use index 1."
      }
    ]
  },
  {
    id: "ch1-functions",
    chapter: 1,
    title: "Functions",
    pages: [
      {
        title: "Defining Functions",
        explanation: "Functions are reusable blocks of code. You define them using the `def` keyword, followed by the name, parentheses, and a colon.\n\nThe variables inside the parentheses are called **Parameters**. When you call the function, the values you pass in are called **Arguments**.",
        exampleCode: "def greet(name):\n    print('Hi ' + name)\n\ngreet('Bob')",
        expectedOutput: "Hi Bob\n",
        hint: "'name' is the parameter, 'Bob' is the argument."
      },
      {
        title: "The return Keyword",
        explanation: "Instead of just printing something, a function can hand data back to you using the `return` keyword. Once a function hits a return statement, it immediately stops and sends the value back.",
        exampleCode: "def add(x, y):\n    return x + y\n\nresult = add(2, 3)\nprint(result)",
        expectedOutput: "5\n",
        hint: "Returns are essential for calculations."
      },
      {
        title: "Your Turn",
        explanation: "Write a function.",
        exercise: {
          prompt: "Define `def say_hi(): print('Hi')`. Then call it.",
          starter: "",
          check: "Hi\n"
        },
        hint: "Don't forget the parentheses when calling it!"
      }
    ]
  }
];
