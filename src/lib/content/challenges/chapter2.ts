import { Challenge } from "../challenges";

export const chapter2: Challenge[] = [
  {
    id: "ch2-dictionary",
    chapter: 2,
    title: "Dictionaries",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "How do you create a dictionary?", hint: "Curly", options: ["()", "[]", "{}", "<>"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What are the two parts of a dictionary item?", hint: "Like a real dictionary", options: ["Index and Value", "Key and Value", "Name and Index", "Key and Key"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "If d = {'a': 1}, what is d['a']?", hint: "Lookup by key", options: ["'a'", "1", "Error", "d"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Can dictionary keys be numbers?", hint: "Yes", options: ["Yes", "No", "Only strings", "Only floats"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What symbol separates a key from its value?", hint: "colon", correctAnswers: [":"] },
      { id: "q6", type: "typed-answer", prompt: "Type the brackets used to lookup a value by key.", hint: "square", correctAnswers: ["[]"] },
      { id: "q7", type: "typed-answer", prompt: "Are dictionaries ordered or unordered internally?", hint: "unordered", correctAnswers: ["unordered"] },
      { id: "q8", type: "typed-answer", prompt: "Can two items have the exact same key?", hint: "no", correctAnswers: ["no"] },
      {
        id: "q9", type: "coding", prompt: "Create a dictionary `user` with key 'name' set to 'Bob'. Print it.", hint: "user = {'name': 'Bob'}", 
        expectedOutput: "{'name': 'Bob'}\n", rules: ["Must use dict"], 
        tests: [{ assertStdout: "{'name': 'Bob'}\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `d = {'x': 5}`. Change 'x' to 10 and print `d['x']`.", hint: "d['x'] = 10", 
        expectedOutput: "10\n", rules: ["Must update dict"], 
        tests: [{ assertStdout: "10\n" }]
      }
    ]
  },
  {
    id: "ch2-tuples-sets",
    chapter: 2,
    title: "Tuples & Sets",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What makes a tuple different from a list?", hint: "Immutable", options: ["It uses brackets", "It cannot be changed", "It only holds numbers", "It is slower"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "How do you define a tuple?", hint: "Parentheses", options: ["()", "[]", "{}", "<>"], correctIndex: 0 },
      { id: "q3", type: "multiple-choice", prompt: "What is a key feature of a Set?", hint: "Unique", options: ["Ordered items", "Duplicate items allowed", "All items are unique", "Indexed access"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "What brackets define a Set?", hint: "Curly", options: ["()", "[]", "{}", "<>"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "Can you append to a tuple?", hint: "no", correctAnswers: ["no"] },
      { id: "q6", type: "typed-answer", prompt: "If s = {1, 1, 2}, how many items are in it?", hint: "Unique", correctAnswers: ["2", "two"] },
      { id: "q7", type: "typed-answer", prompt: "Type the keyword to get the length of a set or tuple.", hint: "len", correctAnswers: ["len"] },
      { id: "q8", type: "typed-answer", prompt: "Is a set ordered?", hint: "no", correctAnswers: ["no"] },
      {
        id: "q9", type: "coding", prompt: "Create a tuple `t = (1, 2)` and print its first item.", hint: "t[0]", 
        expectedOutput: "1\n", rules: ["Must use tuple indexing"], 
        tests: [{ assertStdout: "1\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create a set `s = {1, 1, 2}` and print its length.", hint: "print(len(s))", 
        expectedOutput: "2\n", rules: ["Must use len()"], 
        tests: [{ assertStdout: "2\n" }]
      }
    ]
  },
  {
    id: "ch2-string-methods",
    chapter: 2,
    title: "String Methods",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "Which method converts a string to uppercase?", hint: "upper", options: [".high()", ".up()", ".upper()", ".caps()"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "Which method converts a string to lowercase?", hint: "lower", options: [".down()", ".lower()", ".low()", ".small()"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "How do you replace 'a' with 'b' in a string?", hint: "replace", options: [".swap('a','b')", ".replace('a','b')", ".change('a','b')", ".switch('a','b')"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What does '  hi  '.strip() do?", hint: "removes spaces", options: ["Removes all letters", "Removes spaces on ends", "Causes error", "Splits the word"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "Type the method for uppercase (include parentheses).", hint: "upper()", correctAnswers: ["upper()"] },
      { id: "q6", type: "typed-answer", prompt: "Type the method for lowercase (include parentheses).", hint: "lower()", correctAnswers: ["lower()"] },
      { id: "q7", type: "typed-answer", prompt: "What character separates the string from its method?", hint: "dot", correctAnswers: ["."] },
      { id: "q8", type: "typed-answer", prompt: "If 'a b'.split() is called, what does it return?", hint: "list", correctAnswers: ["list", "a list"] },
      {
        id: "q9", type: "coding", prompt: "Print the string 'planky' in uppercase.", hint: "Use .upper()", 
        expectedOutput: "PLANKY\n", rules: ["Must use .upper()"], 
        tests: [{ assertStdout: "PLANKY\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Print the result of replacing 'cat' with 'dog' in 'my cat'.", hint: "Use .replace()", 
        expectedOutput: "my dog\n", rules: ["Must use .replace()"], 
        tests: [{ assertStdout: "my dog\n" }]
      }
    ]
  },
  {
    id: "ch2-comprehensions",
    chapter: 2,
    title: "Comprehensions",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is a list comprehension?", hint: "Shorthand", options: ["A function", "A long loop", "A 1-line way to create a list", "A dictionary"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What does [x for x in range(2)] create?", hint: "0 and 1", options: ["[1, 2]", "[0, 1]", "[0, 1, 2]", "Error"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "Can you add an 'if' condition in a list comprehension?", hint: "Yes", options: ["Yes", "No", "Only at the start", "Only with dictionaries"], correctIndex: 0 },
      { id: "q4", type: "multiple-choice", prompt: "What brackets are used for list comprehensions?", hint: "List brackets", options: ["()", "[]", "{}", "<>"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "What keyword is required in the middle of a comprehension?", hint: "for", correctAnswers: ["for"] },
      { id: "q6", type: "typed-answer", prompt: "What does [1 for x in range(3)] create?", hint: "Three ones", correctAnswers: ["[1, 1, 1]"] },
      { id: "q7", type: "typed-answer", prompt: "Is a list comprehension faster or slower than a standard loop generally?", hint: "faster", correctAnswers: ["faster"] },
      { id: "q8", type: "typed-answer", prompt: "Can you make a dictionary comprehension?", hint: "yes or no", correctAnswers: ["yes"] },
      {
        id: "q9", type: "coding", prompt: "Create a list comprehension of [x*2] for x in range(3). Print it.", hint: "print([x*2 for x in range(3)])", 
        expectedOutput: "[0, 2, 4]\n", rules: ["Must use comprehension"], 
        tests: [{ assertStdout: "[0, 2, 4]\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create a list comprehension of [x] for x in range(4) if x > 1. Print it.", hint: "Filtering", 
        expectedOutput: "[2, 3]\n", rules: ["Must use comprehension with if"], 
        tests: [{ assertStdout: "[2, 3]\n" }]
      }
    ]
  },
  {
    id: "ch2-exceptions",
    chapter: 2,
    title: "Exceptions",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword starts an exception handling block?", hint: "try", options: ["catch", "try", "error", "except"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What keyword catches the error?", hint: "except", options: ["catch", "except", "throw", "handle"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What happens if code in the 'try' block works perfectly?", hint: "Except is skipped", options: ["except block runs", "except block is skipped", "program crashes", "it runs twice"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Can you have multiple except blocks?", hint: "Yes", options: ["Yes", "No", "Only two", "Only in functions"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword to manually trigger an error.", hint: "raise", correctAnswers: ["raise"] },
      { id: "q6", type: "typed-answer", prompt: "What block ALWAYS runs, whether an error happens or not?", hint: "finally", correctAnswers: ["finally"] },
      { id: "q7", type: "typed-answer", prompt: "What error occurs if you divide by zero?", hint: "ZeroDivisionError", correctAnswers: ["ZeroDivisionError"] },
      { id: "q8", type: "typed-answer", prompt: "Do except blocks require a colon?", hint: "yes or no", correctAnswers: ["yes"] },
      {
        id: "q9", type: "coding", prompt: "Write a try/except block. Try to print 1/0. Except: print 'Error'.", hint: "It should catch the zero division.", 
        expectedOutput: "Error\n", rules: ["Must use try and except"], 
        tests: [{ assertStdout: "Error\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Write try/except. Try to print 1. Except: print 2.", hint: "It shouldn't fail.", 
        expectedOutput: "1\n", rules: ["Must use try and except"], 
        tests: [{ assertStdout: "1\n" }]
      }
    ]
  },
  {
    id: "ch2-modules",
    chapter: 2,
    title: "Modules & Imports",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword loads a module?", hint: "import", options: ["load", "include", "import", "require"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "If you import math, how do you use its sqrt function?", hint: "dot notation", options: ["sqrt()", "math.sqrt()", "math(sqrt)", "import.sqrt()"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "How do you import ONLY the sqrt function from math?", hint: "from", options: ["from math import sqrt", "import sqrt from math", "load math.sqrt", "require math.sqrt"], correctIndex: 0 },
      { id: "q4", type: "multiple-choice", prompt: "Can you create your own modules?", hint: "Yes", options: ["Yes", "No", "Only with permission", "Only in C++"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword to load a library.", hint: "import", correctAnswers: ["import"] },
      { id: "q6", type: "typed-answer", prompt: "If you use 'import math as m', how do you call sqrt?", hint: "m.sqrt()", correctAnswers: ["m.sqrt()", "m.sqrt"] },
      { id: "q7", type: "typed-answer", prompt: "What is a python file (.py) essentially called?", hint: "module", correctAnswers: ["module"] },
      { id: "q8", type: "typed-answer", prompt: "Type the keyword to load a specific item from a module.", hint: "from", correctAnswers: ["from"] },
      {
        id: "q9", type: "coding", prompt: "Import the 'math' module and print math.ceil(1.2).", hint: "ceil rounds up", 
        expectedOutput: "2\n", rules: ["Must use import"], 
        tests: [{ assertStdout: "2\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "From 'math' import 'floor', and print floor(1.9).", hint: "from math import floor", 
        expectedOutput: "1\n", rules: ["Must use from import"], 
        tests: [{ assertStdout: "1\n" }]
      }
    ]
  },
  {
    id: "ch2-file-io",
    chapter: 2,
    title: "File I/O",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What function opens a file?", hint: "open", options: ["read()", "file()", "open()", "load()"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What mode opens a file for writing?", hint: "w", options: ["'r'", "'w'", "'a'", "'x'"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What should you always do after finishing with a file?", hint: "close it", options: ["delete it", "close() it", "save() it", "print it"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What mode is used for appending to a file?", hint: "a", options: ["'w'", "'r'", "'a'", "'app'"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "What method writes text to an open file object?", hint: "write", correctAnswers: ["write", "write()"] },
      { id: "q6", type: "typed-answer", prompt: "What method reads the entire file content?", hint: "read", correctAnswers: ["read", "read()"] },
      { id: "q7", type: "typed-answer", prompt: "What mode is used for reading?", hint: "r", correctAnswers: ["r", "'r'", "\"r\""] },
      { id: "q8", type: "typed-answer", prompt: "What keyword automatically closes a file block?", hint: "with", correctAnswers: ["with"] },
      {
        id: "q9", type: "coding", prompt: "Open 'test.txt' in 'w' mode, write 'hello', and close it. Then print 'Done'.", hint: "f = open(...)", 
        expectedOutput: "Done\n", rules: ["Must use open"], 
        tests: [{ assertStdout: "Done\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Use 'with open('log.txt', 'w') as f:' to write 'ok'. Then print 'Saved'.", hint: "Context manager", 
        expectedOutput: "Saved\n", rules: ["Must use with open"], 
        tests: [{ assertStdout: "Saved\n" }]
      }
    ]
  }
];
