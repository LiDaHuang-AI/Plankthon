import { Lesson } from "../lessons";

export const chapter1: Lesson[] = [
  {
    id: "ch1-basic",
    chapter: 1,
    title: "Basic",
    pages: [
      {
        title: "Displaying Output",
        title_th: "การแสดงผลลัพธ์",
        explanation: "Welcome to Python! The very first thing you need to learn is how to make the computer talk to you.\n\nWe do this using a built-in command called `print()`. Whenever you want Python to display something on the screen, you must use the exact word `print` followed by parentheses `()`.",
        explanation_th: "ยินดีต้อนรับสู่ Python! สิ่งแรกที่คุณต้องเรียนรู้คือวิธีทำให้คอมพิวเตอร์พูดกับคุณ\n\nเราทำสิ่งนี้โดยใช้คำสั่งที่มีอยู่แล้วชื่อว่า `print()` เมื่อใดก็ตามที่คุณต้องการให้ Python แสดงบางอย่างบนหน้าจอ คุณต้องใช้คำว่า `print` ตามด้วยวงเล็บ `()`",
        exampleCode: "print(5)",
        expectedOutput: "5\n",
        hint: "Numbers can be printed exactly as they are!",
        hint_th: "ตัวเลขสามารถพิมพ์ออกมาได้ตรงๆ เลย!"
      },
      {
        title: "Text and Quotes",
        title_th: "ข้อความและเครื่องหมายคำพูด",
        explanation: "In Python, text is known as a **String**. If you want to print text, you cannot just type it. You must wrap the text in quotes so Python knows it's a string of characters.\n\nYou can use either single quotes `'...'` or double quotes `\"...\"`. Both work perfectly, but you must be consistent!",
        explanation_th: "ใน Python ข้อความจะถูกเรียกว่า **String** ถ้าคุณต้องการพิมพ์ข้อความ คุณไม่สามารถพิมพ์มันลงไปตรงๆ ได้ คุณต้องห่อข้อความด้วยเครื่องหมายคำพูดเพื่อให้ Python รู้ว่ามันคือชุดของตัวอักษร\n\nคุณสามารถใช้เครื่องหมายคำพูดเดี่ยว `'...'` หรือเครื่องหมายคำพูดคู่ `\"...\"` ก็ได้ ทั้งสองอย่างทำงานได้ดีเหมือนกัน แต่คุณต้องใช้อย่างสม่ำเสมอ!",
        exampleCode: "print('Hello!')\nprint(\"Planky is cool\")",
        expectedOutput: "Hello!\nPlanky is cool\n",
        hint: "Without quotes, Python will look for a command named Hello and crash!",
        hint_th: "ถ้าไม่มีเครื่องหมายคำพูด Python จะมองหาคำสั่งที่ชื่อ Hello แล้วก็จะพัง!"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Let's put your new skills to the test.",
        explanation_th: "มาทดสอบทักษะใหม่ของคุณกันเถอะ",
        exercise: {
          prompt: "Write a command to print the word Apple.",
          prompt_th: "เขียนคำสั่งเพื่อพิมพ์คำว่า Apple",
          starter: "",
          check: "Apple\n"
        },
        hint: "Make sure you use print() and put quotes around Apple.",
        hint_th: "ต้องแน่ใจว่าคุณใช้ print() และใส่เครื่องหมายคำพูดรอบๆ Apple"
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
        title_th: "การต่อข้อความ (String Concatenation)",
        explanation: "You can glue multiple strings together into one long string. This is called **concatenation**.\n\nIn Python, you use the math addition symbol `+` to concatenate strings. It literally sticks the second string directly onto the end of the first string.",
        explanation_th: "คุณสามารถเชื่อมข้อความหลายๆ อันเข้าด้วยกันเป็นข้อความยาวๆ อันเดียวได้ สิ่งนี้เรียกว่า **concatenation**\n\nใน Python คุณใช้สัญลักษณ์บวก `+` ทางคณิตศาสตร์เพื่อต่อข้อความ มันจะนำข้อความที่สองไปติดไว้ที่ท้ายข้อความแรกตรงๆ เลย",
        exampleCode: "print('py' + 'thon')",
        expectedOutput: "python\n",
        hint: "Notice how they are pushed together.",
        hint_th: "สังเกตดูว่าพวกมันถูกดันเข้าหากันอย่างไร"
      },
      {
        title: "Spacing and Errors",
        title_th: "ช่องว่างและข้อผิดพลาด",
        explanation: "When you use `+`, Python does NOT add a space for you. If you want a space, you must include it inside the quotes of one of your strings (e.g., `'Hello ' + 'World'`).\n\nAlso, Python is strictly typed. You cannot use `+` to mix a String and a Number (like `'A' + 2`). This will cause a crash!",
        explanation_th: "เมื่อคุณใช้ `+` Python จะไม่เติมช่องว่างให้คุณ ถ้าคุณต้องการช่องว่าง คุณต้องใส่ไว้ในเครื่องหมายคำพูดของข้อความใดข้อความหนึ่งของคุณ (เช่น `'Hello ' + 'World'`)\n\nนอกจากนี้ Python ยังเข้มงวดเรื่องชนิดข้อมูล คุณไม่สามารถใช้ `+` เพื่อผสมข้อความกับตัวเลข (เช่น `'A' + 2`) ได้ สิ่งนี้จะทำให้โปรแกรมพัง!",
        exampleCode: "print('Good' + ' ' + 'Morning')",
        expectedOutput: "Good Morning\n",
        hint: "You can add strings containing just a space.",
        hint_th: "คุณสามารถบวกข้อความที่มีแค่ช่องว่างได้"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Time to glue some text together.",
        explanation_th: "ถึงเวลาเชื่อมข้อความเข้าด้วยกันแล้ว",
        exercise: {
          prompt: "Print the phrase 'Hello World' by concatenating 'Hello ' and 'World'.",
          prompt_th: "พิมพ์วลี 'Hello World' โดยการต่อข้อความ 'Hello ' และ 'World'",
          starter: "",
          check: "Hello World\n"
        },
        hint: "print('Hello ' + 'World')",
        hint_th: "print('Hello ' + 'World')"
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
        title_th: "การจัดเก็บข้อมูล",
        explanation: "A **Variable** is a named container that stores data. You assign data to a variable using a single equals sign `=`. \n\nThe variable name goes on the left, and the data goes on the right.",
        explanation_th: "**ตัวแปร (Variable)** คือกล่องที่มีชื่อสำหรับเก็บข้อมูล คุณสามารถกำหนดข้อมูลให้กับตัวแปรโดยใช้เครื่องหมายเท่ากับตัวเดียว `=` \n\nชื่อตัวแปรจะอยู่ทางซ้าย และข้อมูลจะอยู่ทางขวา",
        exampleCode: "x = 5\nname = 'Planky'\nprint(x)\nprint(name)",
        expectedOutput: "5\nPlanky\n",
        hint: "When printing a variable, don't use quotes!",
        hint_th: "เมื่อต้องการพิมพ์ตัวแปร อย่าใช้เครื่องหมายคำพูด!"
      },
      {
        title: "Naming Rules and Reassignment",
        title_th: "กฎการตั้งชื่อและการกำหนดค่าใหม่",
        explanation: "Variables can be reassigned at any time. If you say `x = 1` and then later `x = 2`, the old value is forgotten forever.\n\n**Naming Rules:**\n- Names cannot have spaces (use underscores `_` instead, like `my_name`).\n- Names cannot start with a number (so `1name` is invalid).",
        explanation_th: "ตัวแปรสามารถกำหนดค่าใหม่ได้ตลอดเวลา ถ้าคุณบอกว่า `x = 1` แล้วต่อมาบอกว่า `x = 2` ค่าเก่าจะถูกลืมไปตลอดกาล\n\n**กฎการตั้งชื่อ:**\n- ชื่อไม่สามารถมีช่องว่างได้ (ใช้ขีดล่าง `_` แทน เช่น `my_name`)\n- ชื่อไม่สามารถขึ้นต้นด้วยตัวเลขได้ (ดังนั้น `1name` จึงใช้ไม่ได้)",
        exampleCode: "age = 10\nage = 20\nprint(age)",
        expectedOutput: "20\n",
        hint: "It prints the most recent value.",
        hint_th: "มันจะพิมพ์ค่าที่ถูกกำหนดล่าสุด"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Let's create a variable.",
        explanation_th: "มาสร้างตัวแปรกันเถอะ",
        exercise: {
          prompt: "Create a variable `age` and set it to 20. Then print `age`.",
          prompt_th: "สร้างตัวแปร `age` และตั้งค่าให้เป็น 20 จากนั้นพิมพ์ `age`",
          starter: "",
          check: "20\n"
        },
        hint: "age = 20",
        hint_th: "age = 20"
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
        title_th: "คณิตศาสตร์ใน Python",
        explanation: "Python is a powerful calculator. You can use standard math symbols:\n- Addition: `+`\n- Subtraction: `-`\n- Multiplication: `*` (asterisk)\n- Division: `/` (forward slash)\n\nPython strictly follows the Order of Operations (PEMDAS).",
        explanation_th: "Python คือเครื่องคิดเลขที่ทรงพลัง คุณสามารถใช้สัญลักษณ์ทางคณิตศาสตร์มาตรฐานได้:\n- การบวก: `+`\n- การลบ: `-`\n- การคูณ: `*` (เครื่องหมายดอกจัน)\n- การหาร: `/` (เครื่องหมายทับ)\n\nPython ปฏิบัติตามลำดับการดำเนินการทางคณิตศาสตร์ (PEMDAS) อย่างเคร่งครัด",
        exampleCode: "print(2 + 3 * 2)",
        expectedOutput: "8\n",
        hint: "Multiplication happens before addition.",
        hint_th: "การคูณจะเกิดขึ้นก่อนการบวก"
      },
      {
        title: "Integers vs Floats",
        title_th: "จำนวนเต็ม (Integers) และ ทศนิยม (Floats)",
        explanation: "Python has two main types of numbers:\n- **Integers**: Whole numbers like `5` or `-10`.\n- **Floats**: Decimal numbers like `3.14`.\n\nAny time you perform division `/`, Python automatically converts the answer into a Float (e.g., `10 / 2` results in `5.0`).",
        explanation_th: "Python มีตัวเลขหลักๆ สองประเภท:\n- **Integers**: จำนวนเต็ม เช่น `5` หรือ `-10`\n- **Floats**: เลขทศนิยม เช่น `3.14`\n\nทุกครั้งที่คุณทำการหาร `/` Python จะแปลงคำตอบเป็นทศนิยมโดยอัตโนมัติ (เช่น `10 / 2` จะได้ผลลัพธ์เป็น `5.0`)",
        exampleCode: "print(10 / 2)",
        expectedOutput: "5.0\n",
        hint: "Notice the decimal point.",
        hint_th: "สังเกตจุดทศนิยม"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Calculate a result.",
        explanation_th: "คำนวณผลลัพธ์",
        exercise: {
          prompt: "Print the result of 15 divided by 3.",
          prompt_th: "พิมพ์ผลลัพธ์ของ 15 หารด้วย 3",
          starter: "",
          check: "5.0\n"
        },
        hint: "print(15 / 3)",
        hint_th: "print(15 / 3)"
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
        title_th: "รับข้อมูลจากผู้ใช้ (User Input)",
        explanation: "You can pause your program and wait for the user to type something by using the `input()` function. \n\nYou can put a string inside the parentheses to act as a prompt for the user.",
        explanation_th: "คุณสามารถหยุดโปรแกรมและรอให้ผู้ใช้พิมพ์บางอย่างได้โดยใช้ฟังก์ชัน `input()` \n\nคุณสามารถใส่ข้อความไว้ในวงเล็บเพื่อทำหน้าที่เป็นคำถามหรือคำแนะนำสำหรับผู้ใช้",
        exampleCode: "input('What is your name? ')",
        expectedOutput: "",
        hint: "The program waits until the user hits Enter.",
        hint_th: "โปรแกรมจะรอจนกว่าผู้ใช้จะกด Enter"
      },
      {
        title: "Storing Input",
        title_th: "จัดเก็บข้อมูลที่รับมา",
        explanation: "The `input()` function always returns the user's answer as a **String**, even if they type a number! You should store this answer in a variable so you can use it.\n\nExample: `name = input('Name: ')`",
        explanation_th: "ฟังก์ชัน `input()` จะส่งคืนคำตอบของผู้ใช้เป็น **ข้อความ (String)** เสมอ แม้ว่าพวกเขาจะพิมพ์ตัวเลขก็ตาม! คุณควรเก็บคำตอบนี้ไว้ในตัวแปรเพื่อที่คุณจะได้นำไปใช้ได้\n\nตัวอย่าง: `name = input('Name: ')`",
        exampleCode: "",
        expectedOutput: "",
        hint: "Remember: '5' + '5' is '55' because input is a string.",
        hint_th: "จำไว้: '5' + '5' คือ '55' เพราะสิ่งที่รับมาคือข้อความ"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Let's capture some input.",
        explanation_th: "มารับข้อมูลนำเข้ากันเถอะ",
        exercise: {
          prompt: "Use input() to ask for a name, then print 'Hi ' + name.",
          prompt_th: "ใช้ input() เพื่อถามชื่อ จากนั้นพิมพ์ 'Hi ' + name",
          starter: "name = input()",
          check: "Hi Planky\n"
        },
        hint: "Use string concatenation!",
        hint_th: "ใช้การต่อข้อความ!"
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
        title_th: "จริง (True) และ เท็จ (False)",
        explanation: "A **Boolean** is a data type that only has two possible values: True or False. These are like binary switches (1 or 0, On or Off).\n\nIn Python, you must capitalize them exactly: `True` and `False`.",
        explanation_th: "**บูลีน (Boolean)** เป็นชนิดข้อมูลที่มีค่าที่เป็นไปได้เพียงสองค่าเท่านั้น: จริง (True) หรือ เท็จ (False) มันเหมือนสวิตช์เปิดปิด (1 หรือ 0, เปิด หรือ ปิด)\n\nใน Python คุณต้องพิมพ์ตัวพิมพ์ใหญ่ให้เป๊ะ: `True` และ `False`",
        exampleCode: "x = True\nprint(x)",
        expectedOutput: "True\n",
        hint: "Notice there are no quotes around True.",
        hint_th: "สังเกตว่าไม่มีเครื่องหมายคำพูดรอบๆ True"
      },
      {
        title: "Comparisons",
        title_th: "การเปรียบเทียบ",
        explanation: "You can generate booleans by comparing values:\n- Greater/Less: `>`, `<`\n- Equal to: `==` (Notice the double equals! A single equals `=` is for assigning variables, `==` is for asking 'are they equal?').",
        explanation_th: "คุณสามารถสร้างค่าบูลีนได้โดยการเปรียบเทียบค่าต่างๆ:\n- มากกว่า/น้อยกว่า: `>`, `<`\n- เท่ากับ: `==` (สังเกตเครื่องหมายเท่ากับสองตัว! เครื่องหมายเท่ากับตัวเดียว `=` ใช้สำหรับกำหนดค่าให้ตัวแปร `==` ใช้สำหรับถามว่า 'พวกมันเท่ากันหรือไม่?')",
        exampleCode: "print(5 > 3)\nprint(10 == 5)",
        expectedOutput: "True\nFalse\n",
        hint: "Python evaluates the math and returns a Boolean.",
        hint_th: "Python จะประเมินทางคณิตศาสตร์และส่งคืนเป็นค่าบูลีน"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Print a boolean.",
        explanation_th: "พิมพ์ค่าบูลีน",
        exercise: {
          prompt: "Assign `active = False` and print it.",
          prompt_th: "กำหนดค่า `active = False` และพิมพ์มันออกมา",
          starter: "",
          check: "False\n"
        },
        hint: "Remember to capitalize False.",
        hint_th: "อย่าลืมใช้ตัวพิมพ์ใหญ่กับ False"
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
        title_th: "คำสั่ง if",
        explanation: "We use the `if` keyword to run code only when a condition is True. \n\nAt the end of the `if` statement line, you must put a colon `:`. Then, the code that belongs inside the if-block must be indented (usually by 4 spaces).",
        explanation_th: "เราใช้คำว่า `if` เพื่อรันโค้ดก็ต่อเมื่อเงื่อนไขเป็นจริงเท่านั้น \n\nที่ส่วนท้ายของบรรทัดคำสั่ง `if` คุณต้องใส่เครื่องหมายโคลอน `:` จากนั้น โค้ดที่อยู่ภายในบล็อก if จะต้องถูกเยื้อง (โดยปกติจะใช้ 4 ช่องว่าง)",
        exampleCode: "if 5 > 3:\n    print('Math works!')",
        expectedOutput: "Math works!\n",
        hint: "If the condition was False, the print would be skipped entirely.",
        hint_th: "ถ้าเงื่อนไขเป็นเท็จ การพิมพ์จะถูกข้ามไปทั้งหมด"
      },
      {
        title: "else and elif",
        title_th: "else และ elif",
        explanation: "You can provide alternative paths.\n- `else:` runs when the if-condition is False (otherwise).\n- `elif:` stands for 'else if', letting you check a new condition if the first one failed.",
        explanation_th: "คุณสามารถระบุทางเลือกอื่นๆ ได้\n- `else:` จะรันเมื่อเงื่อนไข if เป็นเท็จ (นอกเหนือจากนั้น)\n- `elif:` ย่อมาจาก 'else if' ให้คุณตรวจสอบเงื่อนไขใหม่ได้หากเงื่อนไขแรกไม่ผ่าน",
        exampleCode: "x = 10\nif x == 5:\n    print('A')\nelif x == 10:\n    print('B')\nelse:\n    print('C')",
        expectedOutput: "B\n",
        hint: "It checks them in order top-to-bottom.",
        hint_th: "มันจะตรวจสอบตามลำดับจากบนลงล่าง"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Write a basic condition.",
        explanation_th: "เขียนเงื่อนไขพื้นฐาน",
        exercise: {
          prompt: "Write an if statement: if 5 == 5, print 'Yes'.",
          prompt_th: "เขียนคำสั่ง if: ถ้า 5 == 5 ให้พิมพ์ 'Yes'",
          starter: "",
          check: "Yes\n"
        },
        hint: "Don't forget the colon and indentation.",
        hint_th: "อย่าลืมเครื่องหมายโคลอนและการเยื้อง"
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
        title_th: "ลูป for",
        explanation: "Loops let you repeat code. The `for` keyword creates a loop that runs a specific number of times.\n\nWe often pair it with `range(n)`, which generates a sequence of numbers starting at `0` up to (but not including) `n`.",
        explanation_th: "ลูป (Loop) ช่วยให้คุณทำซ้ำโค้ดได้ คำว่า `for` จะสร้างลูปที่รันตามจำนวนครั้งที่กำหนด\n\nเรามักจะใช้ร่วมกับ `range(n)` ซึ่งจะสร้างลำดับตัวเลขเริ่มจาก `0` จนถึง (แต่ไม่รวม) `n`",
        exampleCode: "for i in range(3):\n    print(i)",
        expectedOutput: "0\n1\n2\n",
        hint: "Like if statements, loops require a colon and indentation.",
        hint_th: "เช่นเดียวกับคำสั่ง if ลูปก็ต้องการเครื่องหมายโคลอนและการเยื้อง"
      },
      {
        title: "The while Loop",
        title_th: "ลูป while",
        explanation: "The `while` keyword creates a loop that continues running over and over as long as a condition remains True. If the condition never becomes False, you will create an infinite loop and crash your computer!",
        explanation_th: "คำว่า `while` จะสร้างลูปที่ยังคงทำงานซ้ำๆ ไปเรื่อยๆ ตราบใดที่เงื่อนไขยังคงเป็นจริง ถ้าเงื่อนไขไม่มีวันเป็นเท็จเลย คุณจะสร้างลูปที่ไม่สิ้นสุดและทำให้คอมพิวเตอร์ของคุณค้าง!",
        exampleCode: "x = 1\nwhile x < 3:\n    print(x)\n    x = x + 1",
        expectedOutput: "1\n2\n",
        hint: "We manually increase x so the loop eventually stops.",
        hint_th: "เราเพิ่มค่า x ด้วยตัวเองเพื่อให้ลูปหยุดลงในที่สุด"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Write a for loop.",
        explanation_th: "เขียนลูป for",
        exercise: {
          prompt: "Write a for loop using range(3) that prints the loop variable 'i'.",
          prompt_th: "เขียนลูป for โดยใช้ range(3) ที่พิมพ์ตัวแปรลูป 'i' ออกมา",
          starter: "",
          check: "0\n1\n2\n"
        },
        hint: "for i in range(3):",
        hint_th: "for i in range(3):"
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
        title_th: "การสร้างลิสต์ (Lists)",
        explanation: "A **List** lets you store multiple items in a single variable. Lists are defined using square brackets `[]`, and items are separated by commas `,`.\n\nLists can hold mixed data types, like numbers and strings together!",
        explanation_th: "**ลิสต์ (List)** ช่วยให้คุณเก็บข้อมูลหลายๆ รายการไว้ในตัวแปรเดียว ลิสต์ถูกกำหนดโดยใช้วงเล็บเหลี่ยม `[]` และแต่ละรายการจะถูกคั่นด้วยเครื่องหมายจุลภาค `,`\n\nลิสต์สามารถเก็บข้อมูลหลากหลายประเภทได้ เช่น ทั้งตัวเลขและข้อความรวมกัน!",
        exampleCode: "my_list = [5, 'Apple', True]\nprint(my_list)",
        expectedOutput: "[5, 'Apple', True]\n",
        hint: "Lists are extremely flexible in Python.",
        hint_th: "ลิสต์มีความยืดหยุ่นสูงมากใน Python"
      },
      {
        title: "Indexing and Appending",
        title_th: "การเข้าถึงข้อมูลและการเพิ่มข้อมูล",
        explanation: "Lists are Zero-indexed, meaning the first item is at index 0. You access items using square brackets: `my_list[0]`.\n\nYou can add new items to the end of a list using the `.append()` method.",
        explanation_th: "ลิสต์เริ่มต้นที่ดัชนีเป็นศูนย์ หมายความว่ารายการแรกจะอยู่ที่ดัชนี 0 คุณสามารถเข้าถึงรายการได้โดยใช้วงเล็บเหลี่ยม: `my_list[0]`\n\nคุณสามารถเพิ่มรายการใหม่ไปที่ท้ายลิสต์ได้โดยใช้วิธี `.append()`",
        exampleCode: "x = [10, 20]\nx.append(30)\nprint(x[1])",
        expectedOutput: "20\n",
        hint: "x[1] gets the second item.",
        hint_th: "x[1] จะเอาค่าที่สอง"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Access a list.",
        explanation_th: "เข้าถึงข้อมูลในลิสต์",
        exercise: {
          prompt: "Create a list `a = [5, 10]` and print the second item.",
          prompt_th: "สร้างลิสต์ `a = [5, 10]` และพิมพ์รายการที่สอง",
          starter: "",
          check: "10\n"
        },
        hint: "Use index 1.",
        hint_th: "ใช้ดัชนี 1"
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
        title_th: "การสร้างฟังก์ชัน (Functions)",
        explanation: "Functions are reusable blocks of code. You define them using the `def` keyword, followed by the name, parentheses, and a colon.\n\nThe variables inside the parentheses are called **Parameters**. When you call the function, the values you pass in are called **Arguments**.",
        explanation_th: "ฟังก์ชันคือบล็อกโค้ดที่สามารถนำกลับมาใช้ใหม่ได้ คุณสร้างฟังก์ชันโดยใช้คำว่า `def` ตามด้วยชื่อ วงเล็บ และโคลอน\n\nตัวแปรที่อยู่ภายในวงเล็บเรียกว่า **พารามิเตอร์ (Parameters)** เมื่อคุณเรียกใช้ฟังก์ชัน ค่าที่คุณส่งเข้าไปจะเรียกว่า **อาร์กิวเมนต์ (Arguments)**",
        exampleCode: "def greet(name):\n    print('Hi ' + name)\n\ngreet('Bob')",
        expectedOutput: "Hi Bob\n",
        hint: "'name' is the parameter, 'Bob' is the argument.",
        hint_th: "'name' คือพารามิเตอร์ 'Bob' คืออาร์กิวเมนต์"
      },
      {
        title: "The return Keyword",
        title_th: "คำสั่ง return",
        explanation: "Instead of just printing something, a function can hand data back to you using the `return` keyword. Once a function hits a return statement, it immediately stops and sends the value back.",
        explanation_th: "แทนที่จะแค่พิมพ์บางอย่าง ฟังก์ชันสามารถส่งข้อมูลกลับมาให้คุณได้โดยใช้คำว่า `return` เมื่อฟังก์ชันมาถึงคำสั่ง return มันจะหยุดทำงานทันทีและส่งค่ากลับคืนมา",
        exampleCode: "def add(x, y):\n    return x + y\n\nresult = add(2, 3)\nprint(result)",
        expectedOutput: "5\n",
        hint: "Returns are essential for calculations.",
        hint_th: "การ return เป็นสิ่งที่จำเป็นสำหรับการคำนวณ"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Write a function.",
        explanation_th: "เขียนฟังก์ชัน",
        exercise: {
          prompt: "Define `def say_hi(): print('Hi')`. Then call it.",
          prompt_th: "สร้างฟังก์ชัน `def say_hi(): print('Hi')` จากนั้นเรียกใช้ฟังก์ชัน",
          starter: "",
          check: "Hi\n"
        },
        hint: "Don't forget the parentheses when calling it!",
        hint_th: "อย่าลืมวงเล็บเมื่อเรียกใช้มัน!"
      }
    ]
  }
];
