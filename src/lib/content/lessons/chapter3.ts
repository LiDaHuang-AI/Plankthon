import { Lesson } from "../lessons";

export const chapter3: Lesson[] = [
  {
    id: "ch3-classes",
    chapter: 3,
    title: "Classes", title_th: "คลาส (Classes)",
    pages: [
      {
        title: "Object-Oriented Programming",
        title_th: "การเขียนโปรแกรมเชิงวัตถุ",
        explanation: "A **Class** is like a blueprint for creating objects. You define a class using the `class` keyword.\n\nInside a class, you define functions (called **methods**). The very first parameter of ANY method in a class must be `self`. `self` refers to the specific object that was created from the blueprint.",
        explanation_th: "**คลาส (Class)** เปรียบเสมือนพิมพ์เขียวสำหรับการสร้างออบเจ็กต์ คุณสามารถกำหนดคลาสโดยใช้คำว่า `class`\n\nภายในคลาส คุณกำหนดฟังก์ชันต่างๆ (เรียกว่า **เมธอด** หรือ **methods**) พารามิเตอร์ตัวแรกของเมธอดใดๆ ในคลาสจะต้องเป็น `self` โดยที่ `self` จะหมายถึงออบเจ็กต์เฉพาะเจาะจงที่ถูกสร้างขึ้นจากพิมพ์เขียวนั้น",
        exampleCode: "class Dog:\n    def bark(self):\n        print('Woof')\n\nDog().bark()",
        expectedOutput: "Woof\n",
        hint: "Dog() creates the object, and .bark() calls its method.",
        hint_th: "Dog() สร้างออบเจ็กต์ และ .bark() เรียกใช้เมธอดของมัน"
      },
      {
        title: "The Constructor",
        title_th: "คอนสตรักเตอร์ (Constructor)",
        explanation: "When you create an object, you often want to set some initial values. You do this using a special initialization method called `__init__` (with double underscores).\n\nThis method runs automatically the moment the object is created.",
        explanation_th: "เมื่อคุณสร้างออบเจ็กต์ บ่อยครั้งที่คุณต้องการตั้งค่าเริ่มต้นบางอย่าง คุณทำสิ่งนี้ได้โดยใช้เมธอดเริ่มต้นพิเศษที่เรียกว่า `__init__` (มีขีดล่างสองอันหัวท้าย)\n\nเมธอดนี้จะทำงานโดยอัตโนมัติในวินาทีที่ออบเจ็กต์ถูกสร้างขึ้น",
        exampleCode: "class Box:\n    def __init__(self, size):\n        self.size = size\n\nb = Box(5)\nprint(b.size)",
        expectedOutput: "5\n",
        hint: "self.size saves the variable inside the object.",
        hint_th: "self.size จะบันทึกตัวแปรไว้ภายในออบเจ็กต์"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Create your own class.",
        explanation_th: "สร้างคลาสของคุณเอง",
        exercise: {
          prompt: "Create `class Box: def __init__(self, size): self.size = size`. Print `Box(5).size`.",
          prompt_th: "สร้าง `class Box: def __init__(self, size): self.size = size` จากนั้นพิมพ์ `Box(5).size`",
          starter: "",
          check: "5\n"
        },
        hint: "Make sure you indent the methods!",
        hint_th: "ต้องแน่ใจว่าคุณเยื้องเมธอดอย่างถูกต้อง!"
      }
    ]
  },
  {
    id: "ch3-inheritance",
    chapter: 3,
    title: "Inheritance", title_th: "การสืบทอด (Inheritance)",
    pages: [
      {
        title: "Reusing Code",
        title_th: "การนำโค้ดกลับมาใช้ใหม่",
        explanation: "**Inheritance** allows a new class (the child / subclass) to inherit all the methods and properties from an existing class (the parent / superclass).\n\nTo inherit, you pass the parent class name in parentheses when defining the child class: `class Child(Parent):`.",
        explanation_th: "**การสืบทอด (Inheritance)** ช่วยให้คลาสใหม่ (คลาสลูก / subclass) สามารถสืบทอดเมธอดและคุณสมบัติทั้งหมดจากคลาสที่มีอยู่แล้ว (คลาสแม่ / superclass)\n\nในการสืบทอด คุณต้องระบุชื่อคลาสแม่ในวงเล็บเมื่อกำหนดคลาสลูก: `class Child(Parent):`",
        exampleCode: "class A:\n    def p(self):\n        print('A')\n\nclass B(A):\n    pass\n\nB().p()",
        expectedOutput: "A\n",
        hint: "The 'pass' keyword lets you create an empty class without crashing.",
        hint_th: "คำว่า 'pass' ช่วยให้คุณสร้างคลาสว่างๆ ได้โดยไม่เกิดข้อผิดพลาด"
      },
      {
        title: "Overriding Methods",
        title_th: "การเขียนทับเมธอด (Overriding)",
        explanation: "If a child class defines a method with the EXACT SAME NAME as a method in the parent class, the child's method will **override** the parent's method.\n\nThis lets you reuse most of a class but customize specific parts.",
        explanation_th: "หากคลาสลูกกำหนดเมธอดด้วยชื่อที่เหมือนกันทุกประการกับเมธอดในคลาสแม่ เมธอดของคลาสลูกจะทำการ **เขียนทับ (override)** เมธอดของคลาสแม่\n\nสิ่งนี้ช่วยให้คุณสามารถนำโครงสร้างส่วนใหญ่ของคลาสกลับมาใช้ซ้ำ แต่ปรับแต่งเฉพาะบางส่วนที่ต้องการได้",
        exampleCode: "class Parent:\n    def say(self):\n        print('Hi')\n\nclass Child(Parent):\n    def say(self):\n        print('Bye')\n\nChild().say()",
        expectedOutput: "Bye\n",
        hint: "The child's method wins.",
        hint_th: "เมธอดของคลาสลูกจะชนะ"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Use inheritance to override a method.",
        explanation_th: "ใช้การสืบทอดเพื่อเขียนทับเมธอด",
        exercise: {
          prompt: "Create `class A:` that has `def p(self): print('A')`. Create `class B(A):` that overrides it to print 'B'. Call `B().p()`.",
          prompt_th: "สร้าง `class A:` ที่มี `def p(self): print('A')` สร้าง `class B(A):` ที่เขียนทับเมธอดนั้นเพื่อพิมพ์ 'B' เรียกใช้ `B().p()`",
          starter: "",
          check: "B\n"
        },
        hint: "Just define p(self) again inside class B.",
        hint_th: "เพียงแค่กำหนด p(self) ใหม่อีกครั้งภายในคลาส B"
      }
    ]
  },
  {
    id: "ch3-lambda",
    chapter: 3,
    title: "Lambda & Higher-order", title_th: "ฟังก์ชัน Lambda และ Higher-order",
    pages: [
      {
        title: "Anonymous Functions",
        title_th: "ฟังก์ชันนิรนาม (Anonymous Functions)",
        explanation: "Sometimes you need a tiny function for just one line of code. Instead of writing a full `def` block, you can use the `lambda` keyword to create an **anonymous function**.\n\nA lambda function does not need a `return` keyword—it automatically returns the result of the expression.",
        explanation_th: "บางครั้งคุณต้องการฟังก์ชันเล็กๆ สำหรับโค้ดเพียงบรรทัดเดียว แทนที่จะเขียนบล็อก `def` เต็มรูปแบบ คุณสามารถใช้คำว่า `lambda` เพื่อสร้าง **ฟังก์ชันนิรนาม (anonymous function)**\n\nฟังก์ชันแลมบ์ดาไม่จำเป็นต้องใช้คำว่า `return`—มันจะส่งคืนผลลัพธ์ของนิพจน์นั้นโดยอัตโนมัติ",
        exampleCode: "f = lambda x: x * 2\nprint(f(3))",
        expectedOutput: "6\n",
        hint: "lambda parameters : expression",
        hint_th: "lambda พารามิเตอร์ : นิพจน์"
      },
      {
        title: "Map and Filter",
        title_th: "Map และ Filter",
        explanation: "Lambdas are incredibly powerful when combined with higher-order functions like `map()` and `filter()`.\n\n`map(function, list)` applies the function to EVERY item in the list.\n`filter(function, list)` keeps only the items where the function returns True.",
        explanation_th: "แลมบ์ดามีพลังมหาศาลเมื่อใช้ร่วมกับ higher-order functions เช่น `map()` และ `filter()`\n\n`map(function, list)` นำฟังก์ชันไปใช้กับทุกรายการในลิสต์\n`filter(function, list)` เก็บเฉพาะรายการที่ฟังก์ชันส่งคืนค่าเป็น True",
        exampleCode: "nums = [1, 2, 3]\nresult = map(lambda x: x + 1, nums)\nprint(list(result))",
        expectedOutput: "[2, 3, 4]\n",
        hint: "You must wrap map() in list() to print it properly.",
        hint_th: "คุณต้องห่อ map() ด้วย list() เพื่อให้สามารถพิมพ์ออกมาได้อย่างถูกต้อง"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Use map and lambda.",
        explanation_th: "ใช้ map และ lambda",
        exercise: {
          prompt: "Use `map` with `lambda x: x+1` on the list `[1, 2]`. Print it as a list.",
          prompt_th: "ใช้ `map` กับ `lambda x: x+1` ในลิสต์ `[1, 2]` แล้วพิมพ์มันออกมาในรูปแบบลิสต์",
          starter: "",
          check: "[2, 3]\n"
        },
        hint: "print(list(map(...)))",
        hint_th: "print(list(map(...)))"
      }
    ]
  },
  {
    id: "ch3-recursion",
    chapter: 3,
    title: "Recursion", title_th: "การเรียกซ้ำ (Recursion)",
    pages: [
      {
        title: "Functions Calling Themselves",
        title_th: "ฟังก์ชันที่เรียกใช้ตัวเอง",
        explanation: "**Recursion** occurs when a function calls itself. \n\nWhile this sounds like an infinite loop, it is a legitimate and highly mathematical way to solve complex problems by breaking them down into smaller versions of the same problem.",
        explanation_th: "**การเรียกซ้ำ (Recursion)** เกิดขึ้นเมื่อฟังก์ชันเรียกตัวเอง \n\nแม้ว่าสิ่งนี้จะฟังดูเหมือนการทำงานแบบไม่สิ้นสุด (infinite loop) แต่มันก็เป็นวิธีที่ถูกต้องตามหลักคณิตศาสตร์ในการแก้ปัญหาที่ซับซ้อน โดยการแตกมันออกเป็นรุ่นย่อยๆ ของปัญหาเดิม",
        exampleCode: "def count(n):\n    if n > 0:\n        print(n)\n        count(n - 1)\n\ncount(2)",
        expectedOutput: "2\n1\n",
        hint: "It prints 2, then calls count(1), which prints 1.",
        hint_th: "มันจะพิมพ์ 2 จากนั้นเรียก count(1) ซึ่งจะพิมพ์ 1"
      },
      {
        title: "The Base Case",
        title_th: "กรณีพื้นฐาน (Base Case)",
        explanation: "Every recursive function MUST have a **base case**—a condition that stops the recursion. If you forget the base case, the function will call itself forever until Python crashes with a `RecursionError`.\n\nRecursion uses more memory than a standard `for` loop.",
        explanation_th: "ทุกฟังก์ชันที่เรียกซ้ำต้องมี **กรณีพื้นฐาน (base case)**—เงื่อนไขที่จะหยุดการเรียกซ้ำ หากคุณลืมใส่กรณีพื้นฐาน ฟังก์ชันจะเรียกตัวเองไปตลอดกาลจนกว่า Python จะพังและแจ้งว่า `RecursionError`\n\nการเรียกซ้ำจะใช้หน่วยความจำมากกว่าการใช้ลูป `for` มาตรฐาน",
        exampleCode: "def f(n):\n    if n == 0:\n        return 0\n    return n + f(n - 1)\n\nprint(f(2))",
        expectedOutput: "3\n",
        hint: "f(2) = 2 + f(1) = 2 + 1 + f(0) = 2 + 1 + 0 = 3",
        hint_th: "f(2) = 2 + f(1) = 2 + 1 + f(0) = 2 + 1 + 0 = 3"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Write a recursive function.",
        explanation_th: "เขียนฟังก์ชันแบบเรียกซ้ำ",
        exercise: {
          prompt: "Write a recursive function `def f(n): if n==0: return 0 else: return n + f(n-1)`. Print f(2).",
          prompt_th: "เขียนฟังก์ชันเรียกซ้ำ `def f(n): if n==0: return 0 else: return n + f(n-1)` แล้วพิมพ์ f(2)",
          starter: "",
          check: "3\n"
        },
        hint: "Don't forget the colon and indentation.",
        hint_th: "อย่าลืมเครื่องหมายโคลอนและการเยื้อง"
      }
    ]
  },
  {
    id: "ch3-algorithms",
    chapter: 3,
    title: "Algorithms", title_th: "อัลกอริทึม (Algorithms)",
    pages: [
      {
        title: "Searching",
        title_th: "การค้นหา (Searching)",
        explanation: "An **Algorithm** is simply a step-by-step procedure to solve a problem.\n\nA **Linear Search** checks every item one by one. A **Binary Search** is much faster, but only works on sorted lists. In Python, the `in` keyword uses a linear search under the hood to check if an item exists in a list.",
        explanation_th: "**อัลกอริทึม (Algorithm)** คือกระบวนการแก้ปัญหาแบบทีละขั้นตอน\n\nการค้นหาแบบ **Linear Search** จะตรวจสอบแต่ละรายการทีละอัน การค้นหาแบบ **Binary Search** นั้นเร็วกว่ามาก แต่ใช้ได้กับลิสต์ที่จัดเรียงแล้วเท่านั้น ใน Python คำว่า `in` จะใช้การค้นหาแบบ Linear Search เบื้องหลังเพื่อตรวจสอบว่ามีรายการอยู่ในลิสต์หรือไม่",
        exampleCode: "for i in [1, 2, 5]:\n    if i == 2:\n        print('Found')",
        expectedOutput: "Found\n",
        hint: "This is a basic linear search algorithm.",
        hint_th: "นี่คืออัลกอริทึมการค้นหาเชิงเส้นพื้นฐาน (linear search)"
      },
      {
        title: "Sorting",
        title_th: "การเรียงลำดับ (Sorting)",
        explanation: "Sorting algorithms rearrange data into order. Python has a highly optimized built-in method called `.sort()` that uses an advanced algorithm called Timsort to instantly sort lists.",
        explanation_th: "อัลกอริทึมการเรียงลำดับจะจัดเรียงข้อมูลใหม่ให้เป็นระเบียบ Python มีเมธอดที่มีประสิทธิภาพสูงเรียกว่า `.sort()` ซึ่งใช้อัลกอริทึมขั้นสูงที่เรียกว่า Timsort เพื่อเรียงลำดับลิสต์ในทันที",
        exampleCode: "arr = [3, 1, 2]\narr.sort()\nprint(arr)",
        expectedOutput: "[1, 2, 3]\n",
        hint: ".sort() modifies the list in place.",
        hint_th: ".sort() จะแก้ไขลิสต์โดยตรงทันที"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Sort a list.",
        explanation_th: "เรียงลำดับลิสต์",
        exercise: {
          prompt: "Create `arr = [3, 1, 2]`. Call `arr.sort()` and print `arr`.",
          prompt_th: "สร้าง `arr = [3, 1, 2]` เรียกใช้ `arr.sort()` แล้วพิมพ์ `arr`",
          starter: "",
          check: "[1, 2, 3]\n"
        },
        hint: "arr.sort() comes before print(arr)",
        hint_th: "arr.sort() ต้องมาก่อน print(arr)"
      }
    ]
  },
  {
    id: "ch3-applied",
    chapter: 3,
    title: "Applied Mini-Projects", title_th: "มินิโปรเจกต์ประยุกต์",
    pages: [
      {
        title: "Project Architecture",
        title_th: "สถาปัตยกรรมโปรเจกต์",
        explanation: "Congratulations on making it to the final lesson!\n\nWhen building large projects, writing one giant script is a bad idea. You should always structure your code using **Functions and Classes**.\n\nRemember the golden rule of programming: **DRY (Don't Repeat Yourself)**. If you write the exact same code twice, you should put it in a function!",
        explanation_th: "ขอแสดงความยินดีที่คุณมาถึงบทเรียนสุดท้าย!\n\nเมื่อสร้างโปรเจกต์ขนาดใหญ่ การเขียนสคริปต์ยาวๆ อันเดียวเป็นความคิดที่ไม่ดีนัก คุณควรจัดโครงสร้างโค้ดของคุณเสมอโดยใช้ **ฟังก์ชันและคลาส**\n\nจำกฎทองของการเขียนโปรแกรมไว้: **DRY (Don't Repeat Yourself - อย่าทำซ้ำ)** หากคุณเขียนโค้ดที่เหมือนกันเป๊ะสองครั้ง คุณควรใส่มันไว้ในฟังก์ชัน!",
        exampleCode: "def process(data):\n    # Do complex work here\n    print('Processing ' + data)\n\nprocess('Task')",
        expectedOutput: "",
        hint: "Reusability is key.",
        hint_th: "การนำกลับมาใช้ใหม่ได้คือกุญแจสำคัญ"
      },
      {
        title: "Commenting and Debugging",
        title_th: "การแสดงความคิดเห็นและการแก้ไขข้อบกพร่อง",
        explanation: "As projects grow, they become hard to read. Use the Hash symbol `#` to write **comments** that explain the code to humans.\n\nWhen your code inevitably breaks, you must practice **debugging** (the process of finding and fixing errors). Always read the error message first!",
        explanation_th: "เมื่อโปรเจกต์มีขนาดใหญ่ขึ้น พวกมันจะอ่านยากขึ้น ใช้สัญลักษณ์แฮช `#` เพื่อเขียน **คอมเมนต์ (comments)** ที่อธิบายโค้ดให้คนอ่านเข้าใจ\n\nเมื่อโค้ดของคุณพังอย่างหลีกเลี่ยงไม่ได้ คุณต้องฝึกฝน **การแก้ไขข้อบกพร่อง (debugging)** (กระบวนการค้นหาและแก้ไขข้อผิดพลาด) อ่านข้อความแจ้งข้อผิดพลาดเป็นอันดับแรกเสมอ!",
        exampleCode: "# This prints the final answer\nprint('Done')",
        expectedOutput: "Done\n",
        hint: "Comments are completely ignored by Python.",
        hint_th: "คอมเมนต์จะถูกละเว้นโดยสมบูรณ์จาก Python"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "The final step of your journey.",
        explanation_th: "ก้าวสุดท้ายในการเดินทางของคุณ",
        exercise: {
          prompt: "You've finished the course! Print 'I am a Python Master!' to complete.",
          prompt_th: "คุณเรียนจบหลักสูตรนี้แล้ว! พิมพ์ 'I am a Python Master!' เพื่อจบการทำงาน",
          starter: "",
          check: "I am a Python Master!\n"
        },
        hint: "print('I am a Python Master!')",
        hint_th: "print('I am a Python Master!')"
      }
    ]
  }
];
