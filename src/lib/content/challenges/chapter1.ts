import { Challenge } from "../challenges";

export const chapter1: Challenge[] = [
  {
    id: "ch1-basic",
    chapter: 1,
    title: "Basic",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What function is used to display text on the screen in Python?", hint: "It starts with p", options: ["display()", "print()", "show()", "output()"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "Which of the following is a valid string?", hint: "Look for quotes", options: ["Hello", "\"Hello\"", "print(Hello)", "123"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What happens if you forget quotes around text in print()?", hint: "Python doesn't know it's text", options: ["It prints anyway", "Python crashes/SyntaxError", "It prints a space", "Nothing happens"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Can you use single quotes (' ') for strings?", hint: "Yes, Python is flexible", options: ["Yes", "No", "Only for numbers", "Only in Python 2"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the exact word Python uses to display output.", hint: "Five letters", correctAnswers: ["print"] },
      { id: "q6", type: "typed-answer", prompt: "What symbol is used for double quotes?", hint: "Just type the symbol", correctAnswers: ["\""] },
      { id: "q7", type: "typed-answer", prompt: "What symbol is used for single quotes?", hint: "Just type the symbol", correctAnswers: ["'"] },
      { id: "q8", type: "typed-answer", prompt: "What punctuation surrounds the text inside a print function?", hint: "They look like ()", correctAnswers: ["(", "()", "parentheses"] },
      {
        id: "q9", type: "coding", prompt: "Print the word: Apple", hint: "Use double quotes", 
        expectedOutput: "Apple\n", rules: ["Must use print()", "Must exactly match Apple"], 
        tests: [{ assertStdout: "Apple\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Print the number: 5", hint: "Numbers don't need quotes", 
        expectedOutput: "5\n", rules: ["Must use print()"], 
        tests: [{ assertStdout: "5\n" }]
      }
    ]
  },
  {
    id: "ch1-strings",
    chapter: 1,
    title: "Strings",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What operator is used to concatenate strings?", hint: "Like addition", options: ["*", "-", "+", "/"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What is the result of 'A' + 'B'?", hint: "No spaces are added automatically", options: ["A B", "AB", "B A", "Error"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What happens if you try to add a string and a number? ('A' + 2)", hint: "Python is strictly typed", options: ["A2", "2A", "Error", "A A"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "How do you add a space between words when concatenating?", hint: "Add a space string", options: ["' '", "space()", "++", "&"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What operator joins strings?", hint: "Math symbol", correctAnswers: ["+"] },
      { id: "q6", type: "typed-answer", prompt: "What is 'py' + 'thon'?", hint: "Combine them", correctAnswers: ["python"] },
      { id: "q7", type: "typed-answer", prompt: "Is a string wrapped in double quotes the same as single quotes?", hint: "Yes or No", correctAnswers: ["yes"] },
      { id: "q8", type: "typed-answer", prompt: "What is '1' + '1'?", hint: "String addition, not math", correctAnswers: ["11"] },
      {
        id: "q9", type: "coding", prompt: "Concatenate 'Super' and 'man' and print it.", hint: "print('Super' + 'man')", 
        expectedOutput: "Superman\n", rules: ["Must use +"], 
        tests: [{ assertStdout: "Superman\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Print 'Hello World' using string concatenation of 'Hello ' and 'World'.", hint: "Notice the space", 
        expectedOutput: "Hello World\n", rules: ["Must use +"], 
        tests: [{ assertStdout: "Hello World\n" }]
      }
    ]
  },
  {
    id: "ch1-variables",
    chapter: 1,
    title: "Variables",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What symbol assigns a value to a variable?", hint: "Assign, not compare", options: ["==", ":", "=", "->"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "Which is a valid variable name?", hint: "Cannot start with a number", options: ["1name", "my-name", "my_name", "my name"], correctIndex: 2 },
      { id: "q3", type: "multiple-choice", prompt: "If x = 5, what does print(x) output?", hint: "It prints the value", options: ["x", "5", "Error", "print(x)"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Can a variable change its value later?", hint: "They are variable", options: ["Yes", "No", "Only if it's a number", "Only if it's a string"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What sign is used for assignment?", hint: "One character", correctAnswers: ["="] },
      { id: "q6", type: "typed-answer", prompt: "If a = 'Dog', what is print(a)?", hint: "Case sensitive", correctAnswers: ["Dog"] },
      { id: "q7", type: "typed-answer", prompt: "Can variable names have spaces?", hint: "Yes or No", correctAnswers: ["no"] },
      { id: "q8", type: "typed-answer", prompt: "What character is standard for spaces in variable names?", hint: "Bottom line", correctAnswers: ["_", "underscore"] },
      {
        id: "q9", type: "coding", prompt: "Create a variable `age` and set it to 20. Then print it.", hint: "age = 20", 
        expectedOutput: "20\n", rules: ["Must create variable age"], 
        tests: [{ assertStdout: "20\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `x = 1`, then `x = 2`, then print `x`.", hint: "It prints the latest value", 
        expectedOutput: "2\n", rules: ["Reassign x"], 
        tests: [{ assertStdout: "2\n" }]
      }
    ]
  },
  {
    id: "ch1-numbers",
    chapter: 1,
    title: "Numbers & Operators",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is the symbol for multiplication?", hint: "Star", options: ["x", "*", ".", "^"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What is 10 / 2?", hint: "Division returns a float", options: ["5", "5.0", "Error", "10/2"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What does Python evaluate first: 2 + 3 * 2?", hint: "PEMDAS", options: ["10", "8", "7", "12"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What data type is a whole number?", hint: "Integer", options: ["String", "Float", "Integer", "Boolean"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "What symbol is used for subtraction?", hint: "Dash", correctAnswers: ["-"] },
      { id: "q6", type: "typed-answer", prompt: "What symbol is used for division?", hint: "Forward", correctAnswers: ["/"] },
      { id: "q7", type: "typed-answer", prompt: "What is 5 - 3?", hint: "Math", correctAnswers: ["2"] },
      { id: "q8", type: "typed-answer", prompt: "What is 4 * 4?", hint: "Math", correctAnswers: ["16"] },
      {
        id: "q9", type: "coding", prompt: "Print the result of 15 divided by 3.", hint: "Use /", 
        expectedOutput: "5.0\n", rules: ["Must use math operators"], 
        tests: [{ assertStdout: "5.0\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Print the result of 2 plus 2 multiplied by 4.", hint: "Should be 10", 
        expectedOutput: "10\n", rules: ["Order of operations"], 
        tests: [{ assertStdout: "10\n" }]
      }
    ]
  },
  {
    id: "ch1-input",
    chapter: 1,
    title: "input()",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What function pauses the program to ask the user for text?", hint: "It takes input", options: ["ask()", "prompt()", "input()", "get()"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What data type does input() always return?", hint: "Even if they type a number, it's text", options: ["Integer", "String", "Float", "Boolean"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "Where do you put the prompt text for the user?", hint: "Inside", options: ["Before input()", "Inside input('...')", "After input()", "You can't"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "How do you save the user's input?", hint: "Variables", options: ["x = input()", "input() = x", "save(input())", "store input()"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What is the function to get user input?", hint: "Include parentheses", correctAnswers: ["input()", "input"] },
      { id: "q6", type: "typed-answer", prompt: "Does input() return a String or Integer?", hint: "String", correctAnswers: ["string"] },
      { id: "q7", type: "typed-answer", prompt: "If user types 5, what is input() + input()?", hint: "'5' + '5'", correctAnswers: ["55"] },
      { id: "q8", type: "typed-answer", prompt: "What character goes inside input to prompt?", hint: "Quotes", correctAnswers: ["quotes", "\"", "'"] },
      {
        id: "q9", type: "coding", prompt: "Use input() to ask for the user's age, and print it.", hint: "age = input()", 
        expectedOutput: "25\n", rules: ["Use input()"], 
        tests: [{ input: "25", assertStdout: "25\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Ask for a name, then print 'Hi ' + name.", hint: "Concatenate", 
        expectedOutput: "Hi Planky\n", rules: ["Use input()"], 
        tests: [{ input: "Planky", assertStdout: "Hi Planky\n" }]
      }
    ]
  },
  {
    id: "ch1-booleans",
    chapter: 1,
    title: "Booleans",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What are the two Boolean values?", hint: "Binary", options: ["Yes and No", "True and False", "1 and 2", "On and Off"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "Which is correct capitalization in Python?", hint: "Title case", options: ["true", "TRUE", "True", "tRue"], correctIndex: 2 },
      { id: "q3", type: "multiple-choice", prompt: "What operator checks if two values are equal?", hint: "Double", options: ["=", "==", "===", "=>"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What is 5 > 3?", hint: "Math", options: ["True", "False", "Error", "2"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the boolean for true.", hint: "Capitalize", correctAnswers: ["True"] },
      { id: "q6", type: "typed-answer", prompt: "Type the boolean for false.", hint: "Capitalize", correctAnswers: ["False"] },
      { id: "q7", type: "typed-answer", prompt: "What does 10 == 10 evaluate to?", hint: "Boolean", correctAnswers: ["True"] },
      { id: "q8", type: "typed-answer", prompt: "What does 5 < 2 evaluate to?", hint: "Boolean", correctAnswers: ["False"] },
      {
        id: "q9", type: "coding", prompt: "Print the boolean value of 100 > 1.", hint: "Just print the expression", 
        expectedOutput: "True\n", rules: [""], 
        tests: [{ assertStdout: "True\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Assign `active = False` and print it.", hint: "Variables can hold booleans", 
        expectedOutput: "False\n", rules: [""], 
        tests: [{ assertStdout: "False\n" }]
      }
    ]
  },
  {
    id: "ch1-conditions",
    chapter: 1,
    title: "Conditions",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword starts a conditional statement?", hint: "if this...", options: ["when", "if", "check", "do"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What punctuation MUST follow an if condition?", hint: "Two dots", options: [";", ",", ".", ":"], correctIndex: 3 },
      { id: "q3", type: "multiple-choice", prompt: "How does Python know what code is inside the if block?", hint: "Space matters", options: ["Brackets {}", "Indentation (spaces)", "Parentheses ()", "End keyword"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What keyword is used for 'otherwise'?", hint: "else", options: ["otherwise", "then", "else", "except"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword that means 'else if'.", hint: "elif", correctAnswers: ["elif"] },
      { id: "q6", type: "typed-answer", prompt: "What symbol ends the if statement line?", hint: "colon", correctAnswers: [":"] },
      { id: "q7", type: "typed-answer", prompt: "How many spaces is standard for indentation?", hint: "Number", correctAnswers: ["4", "four"] },
      { id: "q8", type: "typed-answer", prompt: "If condition is False, does the if-block run?", hint: "yes or no", correctAnswers: ["no"] },
      {
        id: "q9", type: "coding", prompt: "Write an if statement: if 5 == 5, print 'Yes'.", hint: "Indent the print", 
        expectedOutput: "Yes\n", rules: ["Must use if"], 
        tests: [{ assertStdout: "Yes\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Write if 3 > 5 print 'A', else print 'B'.", hint: "It will print B", 
        expectedOutput: "B\n", rules: ["Must use else"], 
        tests: [{ assertStdout: "B\n" }]
      }
    ]
  },
  {
    id: "ch1-loops",
    chapter: 1,
    title: "Loops",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "Which keyword creates a loop that runs a specific number of times?", hint: "for every item...", options: ["while", "loop", "for", "repeat"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What function generates a sequence of numbers?", hint: "range", options: ["list()", "range()", "seq()", "numbers()"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What does range(3) generate?", hint: "Starts at 0", options: ["1, 2, 3", "0, 1, 2", "3, 3, 3", "0, 1, 2, 3"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Like if statements, for loops require...", hint: "Spacing", options: ["Indentation", "Brackets", "Semicolons", "End tags"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What is the keyword for loops?", hint: "f-o-r", correctAnswers: ["for"] },
      { id: "q6", type: "typed-answer", prompt: "What is the function to generate numbers?", hint: "r-a-n-g-e", correctAnswers: ["range", "range()"] },
      { id: "q7", type: "typed-answer", prompt: "What is the first number in range(5)?", hint: "zero", correctAnswers: ["0", "zero"] },
      { id: "q8", type: "typed-answer", prompt: "What is the keyword that loops while a condition is true?", hint: "while", correctAnswers: ["while"] },
      {
        id: "q9", type: "coding", prompt: "Write a for loop using range(3) that prints the loop variable 'i'.", hint: "for i in range(3):", 
        expectedOutput: "0\n1\n2\n", rules: ["Must use for"], 
        tests: [{ assertStdout: "0\n1\n2\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Use a while loop to print 1, then 2. Set x=1, while x<3, print x, x=x+1.", hint: "Don't cause an infinite loop!", 
        expectedOutput: "1\n2\n", rules: ["Must use while"], 
        tests: [{ assertStdout: "1\n2\n" }]
      }
    ]
  },
  {
    id: "ch1-lists",
    chapter: 1,
    title: "Lists",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What brackets are used to create a list?", hint: "Square", options: ["()", "{}", "[]", "<>"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "How are items separated in a list?", hint: "Comma", options: ["Spaces", "Commas", "Semicolons", "Dots"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What index is the FIRST item in a list?", hint: "Zero-indexed", options: ["1", "0", "-1", "A"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "How do you add an item to the end of a list?", hint: "append", options: [".add()", ".push()", ".insert()", ".append()"], correctIndex: 3 },
      { id: "q5", type: "typed-answer", prompt: "Type the brackets used for lists.", hint: "Just the symbols", correctAnswers: ["[]"] },
      { id: "q6", type: "typed-answer", prompt: "What index gets the second item?", hint: "Number", correctAnswers: ["1", "one"] },
      { id: "q7", type: "typed-answer", prompt: "What method adds to a list?", hint: "append", correctAnswers: ["append", "append()"] },
      { id: "q8", type: "typed-answer", prompt: "Can lists hold mixed data types (strings and numbers)?", hint: "yes or no", correctAnswers: ["yes"] },
      {
        id: "q9", type: "coding", prompt: "Create a list `a = [5, 10]` and print the second item.", hint: "Index 1", 
        expectedOutput: "10\n", rules: ["Must use list indexing"], 
        tests: [{ assertStdout: "10\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `x = [1]`. Append 2. Then print `x`.", hint: "x.append(2)", 
        expectedOutput: "[1, 2]\n", rules: ["Must use append"], 
        tests: [{ assertStdout: "[1, 2]\n" }]
      }
    ]
  },
  {
    id: "ch1-functions",
    chapter: 1,
    title: "Functions",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword defines a function?", hint: "define", options: ["function", "def", "fun", "create"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What keyword sends a value back from a function?", hint: "return", options: ["send", "output", "return", "give"], correctIndex: 2 },
      { id: "q3", type: "multiple-choice", prompt: "How do you call a function named `greet`?", hint: "Parentheses", options: ["greet", "call greet", "greet()", "run greet"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "Variables inside () in a function definition are called...", hint: "Parameters", options: ["Arguments/Parameters", "Values", "Lists", "Returns"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword to define a function.", hint: "Three letters", correctAnswers: ["def"] },
      { id: "q6", type: "typed-answer", prompt: "Type the keyword to pass back a value.", hint: "r-e-t-u-r-n", correctAnswers: ["return"] },
      { id: "q7", type: "typed-answer", prompt: "Do functions require a colon after their definition?", hint: "yes or no", correctAnswers: ["yes"] },
      { id: "q8", type: "typed-answer", prompt: "If `def add(a):` what is `a` called?", hint: "parameter", correctAnswers: ["parameter", "argument"] },
      {
        id: "q9", type: "coding", prompt: "Define `def say_hi(): print('Hi')`. Then call it.", hint: "Don't forget to call it!", 
        expectedOutput: "Hi\n", rules: ["Must use def"], 
        tests: [{ assertStdout: "Hi\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Define `def add(x, y): return x+y`. Print `add(2, 3)`.", hint: "It should print 5", 
        expectedOutput: "5\n", rules: ["Must use return"], 
        tests: [{ assertStdout: "5\n" }]
      }
    ]
  }
];
