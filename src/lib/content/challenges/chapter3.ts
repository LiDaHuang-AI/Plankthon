import { Challenge } from "../challenges";

export const chapter3: Challenge[] = [
  {
    id: "ch3-classes",
    chapter: 3,
    title: "Classes",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword defines a class?", hint: "class", options: ["object", "define", "class", "blueprint"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What is the special constructor method named in Python?", hint: "init", options: ["__start__", "__init__", "constructor", "build()"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What is the first parameter of every class method?", hint: "Refers to the object", options: ["this", "obj", "self", "me"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "How do you create an instance of `class Car:`?", hint: "Call it like a function", options: ["new Car()", "Car()", "create Car", "make Car"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword to create a class.", hint: "class", correctAnswers: ["class"] },
      { id: "q6", type: "typed-answer", prompt: "Type the name of the initialization method.", hint: "Underscores included", correctAnswers: ["__init__"] },
      { id: "q7", type: "typed-answer", prompt: "What variable refers to the instance itself?", hint: "self", correctAnswers: ["self"] },
      { id: "q8", type: "typed-answer", prompt: "Can a class have multiple methods?", hint: "yes or no", correctAnswers: ["yes"] },
      {
        id: "q9", type: "coding", prompt: "Create `class Dog:`. Define a method `bark(self)` that prints 'Woof'. Call `Dog().bark()`.", hint: "def bark(self):", 
        expectedOutput: "Woof\n", rules: ["Must define class Dog"], 
        tests: [{ assertStdout: "Woof\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `class Box: def __init__(self, size): self.size = size`. Print `Box(5).size`.", hint: "Constructor", 
        expectedOutput: "5\n", rules: ["Must use __init__"], 
        tests: [{ assertStdout: "5\n" }]
      }
    ]
  },
  {
    id: "ch3-inheritance",
    chapter: 3,
    title: "Inheritance",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "How does `Child` inherit from `Parent`?", hint: "Pass in parentheses", options: ["class Child extends Parent:", "class Child(Parent):", "class Child: Parent", "class Child inherits Parent:"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What does inheritance allow?", hint: "Reuse", options: ["Reusing code from another class", "Making code slower", "Hiding variables", "Deleting a class"], correctIndex: 0 },
      { id: "q3", type: "multiple-choice", prompt: "If a child has a method with the same name as the parent, what happens?", hint: "Override", options: ["It crashes", "The parent method runs", "The child method overrides it", "Both run"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "Can a class inherit from multiple classes?", hint: "Yes in Python", options: ["Yes", "No", "Only built-in classes", "Only in Java"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "If `class A:` exists, type the definition for `class B` inheriting `A`.", hint: "class B(A):", correctAnswers: ["class B(A):"] },
      { id: "q6", type: "typed-answer", prompt: "What is the term for a class that inherits?", hint: "subclass", correctAnswers: ["subclass", "child", "child class"] },
      { id: "q7", type: "typed-answer", prompt: "What is the term for the class being inherited from?", hint: "superclass", correctAnswers: ["superclass", "parent", "parent class", "base class"] },
      { id: "q8", type: "typed-answer", prompt: "What keyword can you put inside an empty class so Python doesn't crash?", hint: "pass", correctAnswers: ["pass"] },
      {
        id: "q9", type: "coding", prompt: "Create `class A: def p(self): print('A')`. Create `class B(A): pass`. Call `B().p()`.", hint: "Inheritance in action", 
        expectedOutput: "A\n", rules: ["Must define class B(A)"], 
        tests: [{ assertStdout: "A\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `A` that prints 'A'. Create `B(A)` that overrides it to print 'B'. Call `B()`. ", hint: "Method override", 
        expectedOutput: "B\n", rules: ["Must override method"], 
        tests: [{ assertStdout: "B\n" }]
      }
    ]
  },
  {
    id: "ch3-lambda",
    chapter: 3,
    title: "Lambda & Higher-order",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword defines an anonymous function?", hint: "lambda", options: ["anon", "def", "lambda", "inline"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "Which is a valid lambda function?", hint: "No return keyword needed", options: ["lambda x: x+1", "lambda x {x+1}", "def lambda(x)", "lambda = x+1"], correctIndex: 0 },
      { id: "q3", type: "multiple-choice", prompt: "What function applies a function to every item in a list?", hint: "map", options: ["filter()", "map()", "apply()", "reduce()"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What function keeps only items that return True?", hint: "filter", options: ["keep()", "select()", "map()", "filter()"], correctIndex: 3 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword for anonymous functions.", hint: "lambda", correctAnswers: ["lambda"] },
      { id: "q6", type: "typed-answer", prompt: "What punctuation follows the parameters in a lambda?", hint: "colon", correctAnswers: [":"] },
      { id: "q7", type: "typed-answer", prompt: "Type the built-in function to transform a list.", hint: "map", correctAnswers: ["map", "map()"] },
      { id: "q8", type: "typed-answer", prompt: "Type the built-in function to remove items from a list.", hint: "filter", correctAnswers: ["filter", "filter()"] },
      {
        id: "q9", type: "coding", prompt: "Assign `f = lambda x: x*2`. Print `f(3)`.", hint: "It should print 6", 
        expectedOutput: "6\n", rules: ["Must use lambda"], 
        tests: [{ assertStdout: "6\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Use `map` with `lambda x: x+1` on `[1, 2]`. Print it as a list.", hint: "print(list(...))", 
        expectedOutput: "[2, 3]\n", rules: ["Must use map"], 
        tests: [{ assertStdout: "[2, 3]\n" }]
      }
    ]
  },
  {
    id: "ch3-recursion",
    chapter: 3,
    title: "Recursion",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is recursion?", hint: "Self", options: ["A loop inside a loop", "A function calling itself", "A broken function", "A way to define classes"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What must every recursive function have to stop?", hint: "Base", options: ["A base case", "A return True", "A while loop", "A timeout"], correctIndex: 0 },
      { id: "q3", type: "multiple-choice", prompt: "What happens if there is no base case?", hint: "Infinite", options: ["It works normally", "It returns None", "Infinite loop / RecursionError", "It runs once"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "Is recursion always faster than a normal loop?", hint: "No, often slower", options: ["Yes", "No", "Only for math", "Only in Python"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "What is the condition that stops recursion called?", hint: "base case", correctAnswers: ["base case"] },
      { id: "q6", type: "typed-answer", prompt: "What error do you get if recursion never stops?", hint: "RecursionError", correctAnswers: ["RecursionError"] },
      { id: "q7", type: "typed-answer", prompt: "Can a recursive function have multiple base cases?", hint: "yes", correctAnswers: ["yes"] },
      { id: "q8", type: "typed-answer", prompt: "Does recursion use more or less memory than a loop?", hint: "more", correctAnswers: ["more"] },
      {
        id: "q9", type: "coding", prompt: "Write recursive `def f(n): if n==0: return 0 else: return n + f(n-1)`. Print f(2).", hint: "It should print 3", 
        expectedOutput: "3\n", rules: ["Must use recursion"], 
        tests: [{ assertStdout: "3\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Write recursive `def count(n): if n>0: print(n); count(n-1)`. Call count(2).", hint: "Output: 2 then 1", 
        expectedOutput: "2\n1\n", rules: ["Must use recursion"], 
        tests: [{ assertStdout: "2\n1\n" }]
      }
    ]
  },
  {
    id: "ch3-algorithms",
    chapter: 3,
    title: "Algorithms",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is an algorithm?", hint: "Steps", options: ["A math equation", "A step-by-step procedure to solve a problem", "A type of python loop", "A syntax error"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What algorithm checks every item one by one?", hint: "Linear", options: ["Binary Search", "Linear Search", "Bubble Sort", "Quick Sort"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "Which is generally faster for searching a sorted list?", hint: "Binary", options: ["Linear Search", "Binary Search", "Random Search", "They are equal"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "In Python, `5 in [1,2,5]` uses what search under the hood?", hint: "Checks one by one", options: ["Binary Search", "Linear Search", "Hash Search", "No search"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword that checks if an item is in a list.", hint: "in", correctAnswers: ["in"] },
      { id: "q6", type: "typed-answer", prompt: "What is the term for rearranging a list into order?", hint: "sorting", correctAnswers: ["sorting", "sort"] },
      { id: "q7", type: "typed-answer", prompt: "What built-in method sorts a list?", hint: "sort", correctAnswers: ["sort", "sort()"] },
      { id: "q8", type: "typed-answer", prompt: "Are algorithms specific to Python only?", hint: "no", correctAnswers: ["no"] },
      {
        id: "q9", type: "coding", prompt: "Write a linear search: `for i in [1, 2]: if i == 2: print('Found')`", hint: "Basic search loop", 
        expectedOutput: "Found\n", rules: ["Must use for loop"], 
        tests: [{ assertStdout: "Found\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `arr = [3, 1, 2]`. Call `arr.sort()` and print `arr`.", hint: "Sorting algorithm", 
        expectedOutput: "[1, 2, 3]\n", rules: ["Must use sort()"], 
        tests: [{ assertStdout: "[1, 2, 3]\n" }]
      }
    ]
  },
  {
    id: "ch3-applied",
    chapter: 3,
    title: "Applied Mini-Projects",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is the best way to structure a large project?", hint: "Functions and Classes", options: ["One giant script", "Using Functions and Classes", "Never using variables", "Only using while loops"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "Why do we write comments in projects?", hint: "Explanation", options: ["To make code run faster", "To explain code to humans", "To hide errors", "Python requires them"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "When debugging a project, what should you do first?", hint: "Read", options: ["Delete all code", "Read the error message", "Restart computer", "Guess randomly"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What does DRY stand for in programming?", hint: "Don't Repeat", options: ["Don't Run Yet", "Do Repeat Yourself", "Don't Repeat Yourself", "Data Running Yearly"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "What character starts a comment in Python?", hint: "Hash", correctAnswers: ["#"] },
      { id: "q6", type: "typed-answer", prompt: "What is the process of finding and fixing errors called?", hint: "debugging", correctAnswers: ["debugging"] },
      { id: "q7", type: "typed-answer", prompt: "Type the built-in function to ask for user input.", hint: "input()", correctAnswers: ["input", "input()"] },
      { id: "q8", type: "typed-answer", prompt: "Type the built-in function to display output.", hint: "print()", correctAnswers: ["print", "print()"] },
      {
        id: "q9", type: "coding", prompt: "Create a mini-program: Ask for `name = input()`. Print `Welcome ` + name.", hint: "Use input and print", 
        expectedOutput: "Welcome Hero\n", rules: [""], 
        tests: [{ input: "Hero", assertStdout: "Welcome Hero\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "You've finished! Print 'I am a Python Master!' to complete.", hint: "Victory!", 
        expectedOutput: "I am a Python Master!\n", rules: ["Must print the exact string"], 
        tests: [{ assertStdout: "I am a Python Master!\n" }]
      }
    ]
  }
];
