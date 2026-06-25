import { Challenge } from "../challenges";

export const chapter3: Challenge[] = [
  {
    id: "ch3-classes",
    chapter: 3,
    title: "Classes", title_th: "คลาส (Classes)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword defines a class?", prompt_th: "คำสำคัญใดใช้สำหรับประกาศคลาส?", hint: "class", hint_th: "class", options: ["object", "define", "class", "blueprint"], options_th: ["object", "define", "class", "blueprint"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What is the special constructor method named in Python?", prompt_th: "เมธอดคอนสตรักเตอร์พิเศษใน Python มีชื่อว่าอะไร?", hint: "init", hint_th: "init", options: ["__start__", "__init__", "constructor", "build()"], options_th: ["__start__", "__init__", "constructor", "build()"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What is the first parameter of every class method?", prompt_th: "พารามิเตอร์แรกของทุกเมธอดในคลาสคืออะไร?", hint: "Refers to the object", hint_th: "อ้างอิงถึงออบเจ็กต์", options: ["this", "obj", "self", "me"], options_th: ["this", "obj", "self", "me"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "How do you create an instance of `class Car:`?", prompt_th: "คุณจะสร้างอินสแตนซ์ของ `class Car:` ได้อย่างไร?", hint: "Call it like a function", hint_th: "เรียกใช้มันเหมือนเป็นฟังก์ชัน", options: ["new Car()", "Car()", "create Car", "make Car"], options_th: ["new Car()", "Car()", "create Car", "make Car"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword to create a class.", prompt_th: "พิมพ์คำสำคัญที่ใช้สร้างคลาส", hint: "class", hint_th: "class", correctAnswers: ["class"] },
      { id: "q6", type: "typed-answer", prompt: "Type the name of the initialization method.", prompt_th: "พิมพ์ชื่อของเมธอดเริ่มต้น (initialization method)", hint: "Underscores included", hint_th: "ต้องรวมขีดล่างด้วย", correctAnswers: ["__init__"] },
      { id: "q7", type: "typed-answer", prompt: "What variable refers to the instance itself?", prompt_th: "ตัวแปรใดที่ใช้อ้างอิงถึงตัวอินสแตนซ์เอง?", hint: "self", hint_th: "self", correctAnswers: ["self"] },
      { id: "q8", type: "typed-answer", prompt: "Can a class have multiple methods?", prompt_th: "คลาสสามารถมีหลายเมธอดได้หรือไม่?", hint: "yes or no", hint_th: "yes หรือ no", correctAnswers: ["yes"] },
      {
        id: "q9", type: "coding", prompt: "Create `class Dog:`. Define a method `bark(self)` that prints 'Woof'. Call `Dog().bark()`.", prompt_th: "สร้าง `class Dog:` ประกาศเมธอด `bark(self)` ที่พิมพ์คำว่า 'Woof' จากนั้นเรียกใช้ `Dog().bark()`", hint: "def bark(self):", hint_th: "def bark(self):",
        expectedOutput: "Woof\n", rules: ["Must define class Dog"], rules_th: ["ต้องสร้าง class Dog"],
        tests: [{ assertStdout: "Woof\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `class Box: def __init__(self, size): self.size = size`. Print `Box(5).size`.", prompt_th: "สร้าง `class Box: def __init__(self, size): self.size = size` พิมพ์ค่า `Box(5).size`", hint: "Constructor", hint_th: "คอนสตรักเตอร์",
        expectedOutput: "5\n", rules: ["Must use __init__"], rules_th: ["ต้องใช้ __init__"],
        tests: [{ assertStdout: "5\n" }]
      }
    ]
  },
  {
    id: "ch3-inheritance",
    chapter: 3,
    title: "Inheritance", title_th: "การสืบทอด (Inheritance)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "How does `Child` inherit from `Parent`?", prompt_th: "คลาส `Child` สืบทอดจาก `Parent` ได้อย่างไร?", hint: "Pass in parentheses", hint_th: "ใส่ไว้ในวงเล็บ", options: ["class Child extends Parent:", "class Child(Parent):", "class Child: Parent", "class Child inherits Parent:"], options_th: ["class Child extends Parent:", "class Child(Parent):", "class Child: Parent", "class Child inherits Parent:"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What does inheritance allow?", prompt_th: "การสืบทอดอนุญาตให้ทำอะไรได้?", hint: "Reuse", hint_th: "นำกลับมาใช้ใหม่", options: ["Reusing code from another class", "Making code slower", "Hiding variables", "Deleting a class"], options_th: ["นำโค้ดจากคลาสอื่นมาใช้ใหม่", "ทำให้โค้ดทำงานช้าลง", "ซ่อนตัวแปร", "ลบคลาส"], correctIndex: 0 },
      { id: "q3", type: "multiple-choice", prompt: "If a child has a method with the same name as the parent, what happens?", prompt_th: "ถ้าคลาสลูกมีชื่อเมธอดซ้ำกับคลาสแม่ จะเกิดอะไรขึ้น?", hint: "Override", hint_th: "เขียนทับ", options: ["It crashes", "The parent method runs", "The child method overrides it", "Both run"], options_th: ["ระบบพัง", "เมธอดของคลาสแม่ทำงาน", "เมธอดของคลาสลูกจะเขียนทับ", "ทำงานทั้งคู่"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "Can a class inherit from multiple classes?", prompt_th: "คลาสสามารถสืบทอดจากหลายคลาสพร้อมกันได้หรือไม่?", hint: "Yes in Python", hint_th: "ทำได้ใน Python", options: ["Yes", "No", "Only built-in classes", "Only in Java"], options_th: ["ได้", "ไม่ได้", "ได้เฉพาะคลาสที่มีอยู่แล้วในระบบ", "ได้เฉพาะใน Java"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "If `class A:` exists, type the definition for `class B` inheriting `A`.", prompt_th: "ถ้ามี `class A:` อยู่แล้ว พิมพ์รูปแบบการประกาศ `class B` ที่สืบทอดจาก `A`", hint: "class B(A):", hint_th: "class B(A):", correctAnswers: ["class B(A):"] },
      { id: "q6", type: "typed-answer", prompt: "What is the term for a class that inherits?", prompt_th: "เราเรียกคลาสที่ทำการสืบทอดว่าอะไร?", hint: "subclass", hint_th: "subclass", correctAnswers: ["subclass", "child", "child class"] },
      { id: "q7", type: "typed-answer", prompt: "What is the term for the class being inherited from?", prompt_th: "เราเรียกคลาสที่ถูกสืบทอดไปว่าอะไร?", hint: "superclass", hint_th: "superclass", correctAnswers: ["superclass", "parent", "parent class", "base class"] },
      { id: "q8", type: "typed-answer", prompt: "What keyword can you put inside an empty class so Python doesn't crash?", prompt_th: "คำสำคัญใดที่คุณสามารถใส่ไว้ในคลาสที่ว่างเปล่าเพื่อไม่ให้ Python พัง?", hint: "pass", hint_th: "pass", correctAnswers: ["pass"] },
      {
        id: "q9", type: "coding", prompt: "Create `class A: def p(self): print('A')`. Create `class B(A): pass`. Call `B().p()`.", prompt_th: "สร้าง `class A: def p(self): print('A')` สร้าง `class B(A): pass` จากนั้นเรียกใช้ `B().p()`", hint: "Inheritance in action", hint_th: "ทดสอบการสืบทอด",
        expectedOutput: "A\n", rules: ["Must define class B(A)"], rules_th: ["ต้องสร้าง class B(A)"],
        tests: [{ assertStdout: "A\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `A` that prints 'A'. Create `B(A)` that overrides it to print 'B'. Call `B()`. ", prompt_th: "สร้าง `A` ที่พิมพ์ 'A' สร้าง `B(A)` ที่เขียนทับการพิมพ์ให้เป็น 'B' เรียกใช้ `B()`", hint: "Method override", hint_th: "การเขียนทับเมธอด",
        expectedOutput: "B\n", rules: ["Must override method"], rules_th: ["ต้องมีการเขียนทับเมธอด"],
        tests: [{ assertStdout: "B\n" }]
      }
    ]
  },
  {
    id: "ch3-lambda",
    chapter: 3,
    title: "Lambda & Higher-order", title_th: "ฟังก์ชัน Lambda และ Higher-order",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword defines an anonymous function?", prompt_th: "คำสำคัญใดใช้สำหรับสร้างฟังก์ชันนิรนาม (anonymous function)?", hint: "lambda", hint_th: "lambda", options: ["anon", "def", "lambda", "inline"], options_th: ["anon", "def", "lambda", "inline"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "Which is a valid lambda function?", prompt_th: "ข้อใดคือฟังก์ชัน lambda ที่ถูกต้อง?", hint: "No return keyword needed", hint_th: "ไม่จำเป็นต้องมีคำว่า return", options: ["lambda x: x+1", "lambda x {x+1}", "def lambda(x)", "lambda = x+1"], options_th: ["lambda x: x+1", "lambda x {x+1}", "def lambda(x)", "lambda = x+1"], correctIndex: 0 },
      { id: "q3", type: "multiple-choice", prompt: "What function applies a function to every item in a list?", prompt_th: "ฟังก์ชันใดที่นำฟังก์ชันอื่นไปประยุกต์ใช้กับทุกรายการในลิสต์?", hint: "map", hint_th: "map", options: ["filter()", "map()", "apply()", "reduce()"], options_th: ["filter()", "map()", "apply()", "reduce()"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What function keeps only items that return True?", prompt_th: "ฟังก์ชันใดที่เก็บไว้เฉพาะรายการที่ส่งคืนค่ากลับมาเป็น True?", hint: "filter", hint_th: "filter", options: ["keep()", "select()", "map()", "filter()"], options_th: ["keep()", "select()", "map()", "filter()"], correctIndex: 3 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword for anonymous functions.", prompt_th: "พิมพ์คำสำคัญสำหรับฟังก์ชันนิรนาม", hint: "lambda", hint_th: "lambda", correctAnswers: ["lambda"] },
      { id: "q6", type: "typed-answer", prompt: "What punctuation follows the parameters in a lambda?", prompt_th: "เครื่องหมายใดตามหลังพารามิเตอร์ใน lambda?", hint: "colon", hint_th: "โคลอน (colon)", correctAnswers: [":"] },
      { id: "q7", type: "typed-answer", prompt: "Type the built-in function to transform a list.", prompt_th: "พิมพ์ฟังก์ชันมาตรฐานเพื่อใช้ในการแปลงข้อมูลลิสต์ (transform a list)", hint: "map", hint_th: "map", correctAnswers: ["map", "map()"] },
      { id: "q8", type: "typed-answer", prompt: "Type the built-in function to remove items from a list.", prompt_th: "พิมพ์ฟังก์ชันมาตรฐานเพื่อใช้ลบข้อมูลออกจากลิสต์ (ลบตามเงื่อนไข)", hint: "filter", hint_th: "filter", correctAnswers: ["filter", "filter()"] },
      {
        id: "q9", type: "coding", prompt: "Assign `f = lambda x: x*2`. Print `f(3)`.", prompt_th: "กำหนดค่า `f = lambda x: x*2` พิมพ์ `f(3)`", hint: "It should print 6", hint_th: "มันควรจะพิมพ์ 6",
        expectedOutput: "6\n", rules: ["Must use lambda"], rules_th: ["ต้องใช้ lambda"],
        tests: [{ assertStdout: "6\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Use `map` with `lambda x: x+1` on `[1, 2]`. Print it as a list.", prompt_th: "ใช้ `map` ร่วมกับ `lambda x: x+1` สำหรับลิสต์ `[1, 2]` แล้วพิมพ์ออกมาในรูปแบบลิสต์", hint: "print(list(...))", hint_th: "print(list(...))",
        expectedOutput: "[2, 3]\n", rules: ["Must use map"], rules_th: ["ต้องใช้ map"],
        tests: [{ assertStdout: "[2, 3]\n" }]
      }
    ]
  },
  {
    id: "ch3-recursion",
    chapter: 3,
    title: "Recursion", title_th: "การเรียกซ้ำ (Recursion)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is recursion?", prompt_th: "Recursion คืออะไร?", hint: "Self", hint_th: "ตัวเอง", options: ["A loop inside a loop", "A function calling itself", "A broken function", "A way to define classes"], options_th: ["ลูปซ้อนลูป", "ฟังก์ชันที่เรียกใช้งานตัวเอง", "ฟังก์ชันที่พัง", "วิธีการสร้างคลาสแบบหนึ่ง"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What must every recursive function have to stop?", prompt_th: "สิ่งใดที่ทุกฟังก์ชันแบบเรียกซ้ำจำเป็นต้องมีเพื่อให้หยุดทำงาน?", hint: "Base", hint_th: "ฐาน (Base)", options: ["A base case", "A return True", "A while loop", "A timeout"], options_th: ["กรณีพื้นฐาน (base case)", "ต้องมี return True", "ต้องมี while loop", "ต้องมีการตั้ง timeout"], correctIndex: 0 },
      { id: "q3", type: "multiple-choice", prompt: "What happens if there is no base case?", prompt_th: "จะเกิดอะไรขึ้นถ้าไม่มีกรณีพื้นฐาน (base case)?", hint: "Infinite", hint_th: "ไม่มีที่สิ้นสุด", options: ["It works normally", "It returns None", "Infinite loop / RecursionError", "It runs once"], options_th: ["ทำงานได้ปกติ", "ส่งคืนค่า None", "เกิดลูปอนันต์ / RecursionError", "ทำงานเพียงครั้งเดียว"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "Is recursion always faster than a normal loop?", prompt_th: "การทำงานแบบเรียกซ้ำมักจะเร็วกว่าลูปปกติเสมอใช่หรือไม่?", hint: "No, often slower", hint_th: "ไม่ ส่วนใหญ่มักจะช้ากว่า", options: ["Yes", "No", "Only for math", "Only in Python"], options_th: ["ใช่", "ไม่ใช่", "ใช่ เฉพาะสำหรับคณิตศาสตร์", "ใช่ เฉพาะใน Python"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "What is the condition that stops recursion called?", prompt_th: "เงื่อนไขที่ใช้หยุดการเรียกซ้ำเรียกว่าอะไร?", hint: "base case", hint_th: "base case", correctAnswers: ["base case"] },
      { id: "q6", type: "typed-answer", prompt: "What error do you get if recursion never stops?", prompt_th: "คุณจะเจอข้อผิดพลาดอะไรถ้าการเรียกซ้ำไม่มีวันสิ้นสุด?", hint: "RecursionError", hint_th: "RecursionError", correctAnswers: ["RecursionError"] },
      { id: "q7", type: "typed-answer", prompt: "Can a recursive function have multiple base cases?", prompt_th: "ฟังก์ชันที่เรียกซ้ำสามารถมีกรณีพื้นฐาน (base case) ได้หลายอันหรือไม่?", hint: "yes", hint_th: "yes", correctAnswers: ["yes"] },
      { id: "q8", type: "typed-answer", prompt: "Does recursion use more or less memory than a loop?", prompt_th: "การทำงานแบบเรียกซ้ำใช้หน่วยความจำมากกว่าหรือน้อยกว่าการใช้ลูป?", hint: "more", hint_th: "more", correctAnswers: ["more"] },
      {
        id: "q9", type: "coding", prompt: "Write recursive `def f(n): if n==0: return 0 else: return n + f(n-1)`. Print f(2).", prompt_th: "เขียนฟังก์ชันเรียกซ้ำ `def f(n): if n==0: return 0 else: return n + f(n-1)` แล้วพิมพ์ f(2)", hint: "It should print 3", hint_th: "มันควรจะพิมพ์ 3",
        expectedOutput: "3\n", rules: ["Must use recursion"], rules_th: ["ต้องใช้การเรียกซ้ำ"],
        tests: [{ assertStdout: "3\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Write recursive `def count(n): if n>0: print(n); count(n-1)`. Call count(2).", prompt_th: "เขียนการเรียกซ้ำ `def count(n): if n>0: print(n); count(n-1)` จากนั้นเรียกใช้ count(2)", hint: "Output: 2 then 1", hint_th: "ผลลัพธ์: 2 จากนั้น 1",
        expectedOutput: "2\n1\n", rules: ["Must use recursion"], rules_th: ["ต้องใช้การเรียกซ้ำ"],
        tests: [{ assertStdout: "2\n1\n" }]
      }
    ]
  },
  {
    id: "ch3-algorithms",
    chapter: 3,
    title: "Algorithms", title_th: "อัลกอริทึม (Algorithms)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is an algorithm?", prompt_th: "อัลกอริทึมคืออะไร?", hint: "Steps", hint_th: "ขั้นตอน", options: ["A math equation", "A step-by-step procedure to solve a problem", "A type of python loop", "A syntax error"], options_th: ["สมการคณิตศาสตร์", "ขั้นตอนแบบทีละขั้นตอนในการแก้ปัญหา", "ชนิดหนึ่งของลูปใน python", "ข้อผิดพลาดทางไวยากรณ์ (syntax error)"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What algorithm checks every item one by one?", prompt_th: "อัลกอริทึมใดที่ตรวจสอบแต่ละรายการทีละอัน?", hint: "Linear", hint_th: "แบบเส้นตรง (Linear)", options: ["Binary Search", "Linear Search", "Bubble Sort", "Quick Sort"], options_th: ["Binary Search", "Linear Search", "Bubble Sort", "Quick Sort"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "Which is generally faster for searching a sorted list?", prompt_th: "โดยทั่วไปแบบใดจะเร็วกว่าในการค้นหาลิสต์ที่ถูกจัดเรียงลำดับแล้ว?", hint: "Binary", hint_th: "แบบทวิภาค (Binary)", options: ["Linear Search", "Binary Search", "Random Search", "They are equal"], options_th: ["Linear Search", "Binary Search", "Random Search", "ทั้งคู่มีความเร็วเท่ากัน"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "In Python, `5 in [1,2,5]` uses what search under the hood?", prompt_th: "ใน Python โค้ดที่ว่า `5 in [1,2,5]` ใช้วิธีการค้นหาใดอยู่เบื้องหลัง?", hint: "Checks one by one", hint_th: "ตรวจสอบทีละอัน", options: ["Binary Search", "Linear Search", "Hash Search", "No search"], options_th: ["Binary Search", "Linear Search", "Hash Search", "No search"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword that checks if an item is in a list.", prompt_th: "พิมพ์คำสำคัญที่ใช้ตรวจสอบว่ามีข้อมูลนั้นอยู่ในลิสต์หรือไม่", hint: "in", hint_th: "in", correctAnswers: ["in"] },
      { id: "q6", type: "typed-answer", prompt: "What is the term for rearranging a list into order?", prompt_th: "คำศัพท์ที่ใช้เรียกการจัดเรียงลิสต์ใหม่ให้เป็นระเบียบคืออะไร?", hint: "sorting", hint_th: "sorting", correctAnswers: ["sorting", "sort"] },
      { id: "q7", type: "typed-answer", prompt: "What built-in method sorts a list?", prompt_th: "เมธอดใดในระบบที่ใช้สำหรับเรียงลำดับในลิสต์?", hint: "sort", hint_th: "sort", correctAnswers: ["sort", "sort()"] },
      { id: "q8", type: "typed-answer", prompt: "Are algorithms specific to Python only?", prompt_th: "อัลกอริทึมมีเฉพาะเจาะจงใช้แต่ใน Python เท่านั้นใช่หรือไม่?", hint: "no", hint_th: "no", correctAnswers: ["no"] },
      {
        id: "q9", type: "coding", prompt: "Write a linear search: `for i in [1, 2]: if i == 2: print('Found')`", prompt_th: "เขียนการค้นหาเชิงเส้น (linear search): `for i in [1, 2]: if i == 2: print('Found')`", hint: "Basic search loop", hint_th: "ลูปการค้นหาแบบพื้นฐาน",
        expectedOutput: "Found\n", rules: ["Must use for loop"], rules_th: ["ต้องใช้ for loop"],
        tests: [{ assertStdout: "Found\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `arr = [3, 1, 2]`. Call `arr.sort()` and print `arr`.", prompt_th: "สร้าง `arr = [3, 1, 2]` เรียก `arr.sort()` และพิมพ์ `arr` ออกมา", hint: "Sorting algorithm", hint_th: "อัลกอริทึมการเรียงลำดับ",
        expectedOutput: "[1, 2, 3]\n", rules: ["Must use sort()"], rules_th: ["ต้องใช้ sort()"],
        tests: [{ assertStdout: "[1, 2, 3]\n" }]
      }
    ]
  },
  {
    id: "ch3-applied",
    chapter: 3,
    title: "Applied Mini-Projects", title_th: "มินิโปรเจกต์ประยุกต์",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is the best way to structure a large project?", prompt_th: "วิธีที่ดีที่สุดในการจัดโครงสร้างโปรเจกต์ขนาดใหญ่คืออะไร?", hint: "Functions and Classes", hint_th: "ใช้ฟังก์ชันและคลาส", options: ["One giant script", "Using Functions and Classes", "Never using variables", "Only using while loops"], options_th: ["เขียนเป็นสคริปต์ขนาดใหญ่ไฟล์เดียว", "ใช้ฟังก์ชันและคลาสต่างๆ", "ไม่ใช้ตัวแปรเลย", "ใช้แต่ while loop เท่านั้น"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "Why do we write comments in projects?", prompt_th: "ทำไมเราถึงเขียนคอมเมนต์ในโปรเจกต์?", hint: "Explanation", hint_th: "เพื่ออธิบาย", options: ["To make code run faster", "To explain code to humans", "To hide errors", "Python requires them"], options_th: ["เพื่อให้โค้ดรันได้เร็วขึ้น", "เพื่ออธิบายโค้ดให้คนทั่วไปเข้าใจ", "เพื่อซ่อนข้อผิดพลาด", "Python บังคับให้เขียน"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "When debugging a project, what should you do first?", prompt_th: "เมื่อทำการแก้ไขข้อบกพร่อง (debugging) คุณควรทำอะไรเป็นอันดับแรก?", hint: "Read", hint_th: "อ่าน", options: ["Delete all code", "Read the error message", "Restart computer", "Guess randomly"], options_th: ["ลบโค้ดทั้งหมดทิ้ง", "อ่านข้อความแจ้งข้อผิดพลาด (error message)", "รีสตาร์ตคอมพิวเตอร์", "สุ่มเดาเอา"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What does DRY stand for in programming?", prompt_th: "คำว่า DRY ในการเขียนโปรแกรมย่อมาจากอะไร?", hint: "Don't Repeat", hint_th: "Don't Repeat", options: ["Don't Run Yet", "Do Repeat Yourself", "Don't Repeat Yourself", "Data Running Yearly"], options_th: ["Don't Run Yet", "Do Repeat Yourself", "Don't Repeat Yourself", "Data Running Yearly"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "What character starts a comment in Python?", prompt_th: "ตัวอักษรใดที่ใช้เริ่มต้นคอมเมนต์ใน Python?", hint: "Hash", hint_th: "สัญลักษณ์ Hash", correctAnswers: ["#"] },
      { id: "q6", type: "typed-answer", prompt: "What is the process of finding and fixing errors called?", prompt_th: "กระบวนการค้นหาและแก้ไขข้อผิดพลาดมีชื่อเรียกว่าอะไร?", hint: "debugging", hint_th: "debugging", correctAnswers: ["debugging"] },
      { id: "q7", type: "typed-answer", prompt: "Type the built-in function to ask for user input.", prompt_th: "พิมพ์ฟังก์ชันในระบบที่ใช้สำหรับรับข้อมูล (input) จากผู้ใช้", hint: "input()", hint_th: "input()", correctAnswers: ["input", "input()"] },
      { id: "q8", type: "typed-answer", prompt: "Type the built-in function to display output.", prompt_th: "พิมพ์ฟังก์ชันในระบบที่ใช้สำหรับแสดงผลลัพธ์", hint: "print()", hint_th: "print()", correctAnswers: ["print", "print()"] },
      {
        id: "q9", type: "coding", prompt: "Create a mini-program: Ask for `name = input()`. Print `Welcome ` + name.", prompt_th: "สร้างโปรแกรมขนาดเล็ก: สอบถามข้อมูลด้วย `name = input()` จากนั้นให้พิมพ์ `Welcome ` + name", hint: "Use input and print", hint_th: "ใช้ input และ print",
        expectedOutput: "Welcome Hero\n", rules: [""], rules_th: [""],
        tests: [{ input: "Hero", assertStdout: "Welcome Hero\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "You've finished! Print 'I am a Python Master!' to complete.", prompt_th: "คุณทำเสร็จแล้ว! พิมพ์ข้อความว่า 'I am a Python Master!' เพื่อจบการเรียน", hint: "Victory!", hint_th: "ชัยชนะ!",
        expectedOutput: "I am a Python Master!\n", rules: ["Must print the exact string"], rules_th: ["ต้องพิมพ์สตริงให้ตรงเผง"],
        tests: [{ assertStdout: "I am a Python Master!\n" }]
      }
    ]
  }
];
