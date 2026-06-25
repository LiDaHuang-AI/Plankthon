import { Lesson } from "../lessons";

export const chapter3: Lesson[] = [
  {
    id: "ch3-classes",
    chapter: 3,
    title: "Classes",
    pages: [
      {
        title: "Object-Oriented Programming",
        explanation: "A **Class** is like a blueprint for creating objects. You define a class using the `class` keyword.\n\nInside a class, you define functions (called **methods**). The very first parameter of ANY method in a class must be `self`. `self` refers to the specific object that was created from the blueprint.",
        exampleCode: "class Dog:\n    def bark(self):\n        print('Woof')\n\nDog().bark()",
        expectedOutput: "Woof\n",
        hint: "Dog() creates the object, and .bark() calls its method."
      },
      {
        title: "The Constructor",
        explanation: "When you create an object, you often want to set some initial values. You do this using a special initialization method called `__init__` (with double underscores).\n\nThis method runs automatically the moment the object is created.",
        exampleCode: "class Box:\n    def __init__(self, size):\n        self.size = size\n\nb = Box(5)\nprint(b.size)",
        expectedOutput: "5\n",
        hint: "self.size saves the variable inside the object."
      },
      {
        title: "Your Turn",
        explanation: "Create your own class.",
        exercise: {
          prompt: "Create `class Box: def __init__(self, size): self.size = size`. Print `Box(5).size`.",
          starter: "",
          check: "5\n"
        },
        hint: "Make sure you indent the methods!"
      }
    ]
  },
  {
    id: "ch3-inheritance",
    chapter: 3,
    title: "Inheritance",
    pages: [
      {
        title: "Reusing Code",
        explanation: "**Inheritance** allows a new class (the child / subclass) to inherit all the methods and properties from an existing class (the parent / superclass).\n\nTo inherit, you pass the parent class name in parentheses when defining the child class: `class Child(Parent):`.",
        exampleCode: "class A:\n    def p(self):\n        print('A')\n\nclass B(A):\n    pass\n\nB().p()",
        expectedOutput: "A\n",
        hint: "The 'pass' keyword lets you create an empty class without crashing."
      },
      {
        title: "Overriding Methods",
        explanation: "If a child class defines a method with the EXACT SAME NAME as a method in the parent class, the child's method will **override** the parent's method.\n\nThis lets you reuse most of a class but customize specific parts.",
        exampleCode: "class Parent:\n    def say(self):\n        print('Hi')\n\nclass Child(Parent):\n    def say(self):\n        print('Bye')\n\nChild().say()",
        expectedOutput: "Bye\n",
        hint: "The child's method wins."
      },
      {
        title: "Your Turn",
        explanation: "Use inheritance to override a method.",
        exercise: {
          prompt: "Create `class A:` that has `def p(self): print('A')`. Create `class B(A):` that overrides it to print 'B'. Call `B().p()`.",
          starter: "",
          check: "B\n"
        },
        hint: "Just define p(self) again inside class B."
      }
    ]
  },
  {
    id: "ch3-lambda",
    chapter: 3,
    title: "Lambda & Higher-order",
    pages: [
      {
        title: "Anonymous Functions",
        explanation: "Sometimes you need a tiny function for just one line of code. Instead of writing a full `def` block, you can use the `lambda` keyword to create an **anonymous function**.\n\nA lambda function does not need a `return` keyword—it automatically returns the result of the expression.",
        exampleCode: "f = lambda x: x * 2\nprint(f(3))",
        expectedOutput: "6\n",
        hint: "lambda parameters : expression"
      },
      {
        title: "Map and Filter",
        explanation: "Lambdas are incredibly powerful when combined with higher-order functions like `map()` and `filter()`.\n\n`map(function, list)` applies the function to EVERY item in the list.\n`filter(function, list)` keeps only the items where the function returns True.",
        exampleCode: "nums = [1, 2, 3]\nresult = map(lambda x: x + 1, nums)\nprint(list(result))",
        expectedOutput: "[2, 3, 4]\n",
        hint: "You must wrap map() in list() to print it properly."
      },
      {
        title: "Your Turn",
        explanation: "Use map and lambda.",
        exercise: {
          prompt: "Use `map` with `lambda x: x+1` on the list `[1, 2]`. Print it as a list.",
          starter: "",
          check: "[2, 3]\n"
        },
        hint: "print(list(map(...)))"
      }
    ]
  },
  {
    id: "ch3-recursion",
    chapter: 3,
    title: "Recursion",
    pages: [
      {
        title: "Functions Calling Themselves",
        explanation: "**Recursion** occurs when a function calls itself. \n\nWhile this sounds like an infinite loop, it is a legitimate and highly mathematical way to solve complex problems by breaking them down into smaller versions of the same problem.",
        exampleCode: "def count(n):\n    if n > 0:\n        print(n)\n        count(n - 1)\n\ncount(2)",
        expectedOutput: "2\n1\n",
        hint: "It prints 2, then calls count(1), which prints 1."
      },
      {
        title: "The Base Case",
        explanation: "Every recursive function MUST have a **base case**—a condition that stops the recursion. If you forget the base case, the function will call itself forever until Python crashes with a `RecursionError`.\n\nRecursion uses more memory than a standard `for` loop.",
        exampleCode: "def f(n):\n    if n == 0:\n        return 0\n    return n + f(n - 1)\n\nprint(f(2))",
        expectedOutput: "3\n",
        hint: "f(2) = 2 + f(1) = 2 + 1 + f(0) = 2 + 1 + 0 = 3"
      },
      {
        title: "Your Turn",
        explanation: "Write a recursive function.",
        exercise: {
          prompt: "Write a recursive function `def f(n): if n==0: return 0 else: return n + f(n-1)`. Print f(2).",
          starter: "",
          check: "3\n"
        },
        hint: "Don't forget the colon and indentation."
      }
    ]
  },
  {
    id: "ch3-algorithms",
    chapter: 3,
    title: "Algorithms",
    pages: [
      {
        title: "Searching",
        explanation: "An **Algorithm** is simply a step-by-step procedure to solve a problem.\n\nA **Linear Search** checks every item one by one. A **Binary Search** is much faster, but only works on sorted lists. In Python, the `in` keyword uses a linear search under the hood to check if an item exists in a list.",
        exampleCode: "for i in [1, 2, 5]:\n    if i == 2:\n        print('Found')",
        expectedOutput: "Found\n",
        hint: "This is a basic linear search algorithm."
      },
      {
        title: "Sorting",
        explanation: "Sorting algorithms rearrange data into order. Python has a highly optimized built-in method called `.sort()` that uses an advanced algorithm called Timsort to instantly sort lists.",
        exampleCode: "arr = [3, 1, 2]\narr.sort()\nprint(arr)",
        expectedOutput: "[1, 2, 3]\n",
        hint: ".sort() modifies the list in place."
      },
      {
        title: "Your Turn",
        explanation: "Sort a list.",
        exercise: {
          prompt: "Create `arr = [3, 1, 2]`. Call `arr.sort()` and print `arr`.",
          starter: "",
          check: "[1, 2, 3]\n"
        },
        hint: "arr.sort() comes before print(arr)"
      }
    ]
  },
  {
    id: "ch3-applied",
    chapter: 3,
    title: "Applied Mini-Projects",
    pages: [
      {
        title: "Project Architecture",
        explanation: "Congratulations on making it to the final lesson!\n\nWhen building large projects, writing one giant script is a bad idea. You should always structure your code using **Functions and Classes**.\n\nRemember the golden rule of programming: **DRY (Don't Repeat Yourself)**. If you write the exact same code twice, you should put it in a function!",
        exampleCode: "def process(data):\n    # Do complex work here\n    pass",
        expectedOutput: "",
        hint: "Reusability is key."
      },
      {
        title: "Commenting and Debugging",
        explanation: "As projects grow, they become hard to read. Use the Hash symbol `#` to write **comments** that explain the code to humans.\n\nWhen your code inevitably breaks, you must practice **debugging** (the process of finding and fixing errors). Always read the error message first!",
        exampleCode: "# This prints the final answer\nprint('Done')",
        expectedOutput: "Done\n",
        hint: "Comments are completely ignored by Python."
      },
      {
        title: "Your Turn",
        explanation: "The final step of your journey.",
        exercise: {
          prompt: "You've finished the course! Print 'I am a Python Master!' to complete.",
          starter: "",
          check: "I am a Python Master!\n"
        },
        hint: "print('I am a Python Master!')"
      }
    ]
  }
];
