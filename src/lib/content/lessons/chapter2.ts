import { Lesson } from "../lessons";

export const chapter2: Lesson[] = [
  {
    id: "ch2-dictionary",
    chapter: 2,
    title: "Dictionaries", title_th: "พจนานุกรม (Dictionaries)",
    pages: [
      {
        title: "Key-Value Pairs",
        title_th: "คู่คีย์-ค่า (Key-Value Pairs)",
        explanation: "A **Dictionary** stores data in pairs, just like a real-world dictionary stores a word (the key) and its definition (the value).\n\nDictionaries are created using curly brackets `{}`. Inside, you separate the key and the value using a colon `:`. Keys must be unique!",
        explanation_th: "**พจนานุกรม (Dictionary)** เก็บข้อมูลเป็นคู่ๆ เหมือนกับพจนานุกรมในชีวิตจริงที่เก็บคำศัพท์ (คีย์) และคำจำกัดความ (ค่า)\n\nพจนานุกรมถูกสร้างขึ้นโดยใช้วงเล็บปีกกา `{}` ข้างในนั้นคุณแยกคีย์และค่าด้วยเครื่องหมายทวิภาค `:` คีย์ต้องไม่ซ้ำกัน!",
        exampleCode: "user = {'name': 'Planky', 'age': 2}\nprint(user)",
        expectedOutput: "{'name': 'Planky', 'age': 2}\n",
        hint: "Dictionaries are unordered collections.",
        hint_th: "พจนานุกรมเป็นชุดข้อมูลที่ไม่มีลำดับ"
      },
      {
        title: "Lookups and Updates",
        title_th: "การค้นหาและการอัปเดต",
        explanation: "To look up a value, you use square brackets `[]` and provide the key. For example, `user['name']`.\n\nYou can also use square brackets to update an existing value or add a brand new key-value pair!",
        explanation_th: "เพื่อค้นหาค่า คุณใช้วงเล็บเหลี่ยม `[]` และระบุคีย์ ตัวอย่างเช่น `user['name']`\n\nคุณยังสามารถใช้วงเล็บเหลี่ยมเพื่ออัปเดตค่าที่มีอยู่หรือเพิ่มคู่คีย์-ค่าใหม่ทั้งหมดได้!",
        exampleCode: "d = {'x': 5}\nd['x'] = 10\nprint(d['x'])",
        expectedOutput: "10\n",
        hint: "Keys can be strings or numbers.",
        hint_th: "คีย์สามารถเป็นข้อความหรือตัวเลขได้"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Create and update a dictionary.",
        explanation_th: "สร้างและอัปเดตพจนานุกรม",
        exercise: {
          prompt: "Create `d = {'x': 5}`. Change 'x' to 10 and print `d['x']`.",
          prompt_th: "สร้าง `d = {'x': 5}` เปลี่ยน 'x' เป็น 10 และพิมพ์ `d['x']`",
          starter: "d = {'x': 5}",
          check: "10\n"
        },
        hint: "Use d['x'] = 10",
        hint_th: "ใช้ d['x'] = 10"
      }
    ]
  },
  {
    id: "ch2-tuples-sets",
    chapter: 2,
    title: "Tuples & Sets", title_th: "ทูเพิลและเซต (Tuples & Sets)",
    pages: [
      {
        title: "Tuples: Unchangeable Lists",
        title_th: "Tuples: ลิสต์ที่เปลี่ยนแปลงไม่ได้",
        explanation: "A **Tuple** is exactly like a list, except it is **immutable** (it cannot be changed after creation). You cannot append to or edit a tuple.\n\nTuples use parentheses `()` instead of square brackets. You still access items using `[index]`.",
        explanation_th: "**Tuple** เหมือนกับลิสต์ทุกประการ ยกเว้นว่ามัน **เปลี่ยนแปลงไม่ได้ (immutable)** (ไม่สามารถแก้ไขได้หลังจากสร้าง) คุณไม่สามารถเพิ่มหรือแก้ไข Tuple ได้\n\nTuple ใช้วงเล็บ `()` แทนวงเล็บเหลี่ยม คุณยังคงเข้าถึงข้อมูลโดยใช้ `[index]`",
        exampleCode: "t = (1, 2, 3)\nprint(t[0])",
        expectedOutput: "1\n",
        hint: "Tuples are faster than lists.",
        hint_th: "Tuple ทำงานได้เร็วกว่าลิสต์"
      },
      {
        title: "Sets: Unique Items",
        title_th: "Sets: ข้อมูลที่ไม่ซ้ำกัน",
        explanation: "A **Set** is an unordered collection where **all items must be unique**. If you add a duplicate, it is ignored.\n\nSets use curly brackets `{}`, just like dictionaries, but they contain single values instead of key-value pairs. You can use the built-in `len()` function to count items in tuples, sets, and lists.",
        explanation_th: "**Set** คือชุดข้อมูลที่ไม่มีลำดับซึ่ง **ทุกรายการต้องไม่ซ้ำกัน** ถ้าคุณเพิ่มของที่ซ้ำซ้อน มันจะถูกละทิ้ง\n\nSet ใช้วงเล็บปีกกา `{}` เหมือนกับพจนานุกรม แต่มันเก็บค่าเดี่ยวๆ แทนที่จะเป็นคู่คีย์-ค่า คุณสามารถใช้ฟังก์ชัน `len()` ที่มีอยู่เพื่อแจงนับรายการใน tuples, sets และ lists ได้",
        exampleCode: "s = {1, 1, 2, 3}\nprint(len(s))",
        expectedOutput: "3\n",
        hint: "The duplicate '1' was removed!",
        hint_th: "เลข '1' ที่ซ้ำกันถูกลบออก!"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Create a Set.",
        explanation_th: "สร้าง Set",
        exercise: {
          prompt: "Create a set `s = {1, 1, 2}` and print its length.",
          prompt_th: "สร้าง set `s = {1, 1, 2}` และพิมพ์ความยาวของมัน",
          starter: "",
          check: "2\n"
        },
        hint: "print(len(s))",
        hint_th: "print(len(s))"
      }
    ]
  },
  {
    id: "ch2-string-methods",
    chapter: 2,
    title: "String Methods", title_th: "เมธอดของข้อความ (String Methods)",
    pages: [
      {
        title: "Changing Case",
        title_th: "การเปลี่ยนตัวพิมพ์",
        explanation: "Strings have built-in superpowers called **Methods**. A method is like a function that belongs specifically to an object. You call it using a dot `.`.\n\nFor example, `.upper()` converts a string to all uppercase, and `.lower()` converts it to all lowercase.",
        explanation_th: "สตริงมีพลังวิเศษที่เรียกว่า **เมธอด (Methods)** เมธอดเหมือนกับฟังก์ชันที่เป็นของออบเจ็กต์โดยเฉพาะ คุณเรียกใช้มันด้วยจุด `.`\n\nตัวอย่างเช่น `.upper()` จะเปลี่ยนสตริงเป็นตัวพิมพ์ใหญ่ทั้งหมด และ `.lower()` เปลี่ยนเป็นตัวพิมพ์เล็กทั้งหมด",
        exampleCode: "word = 'Planky'\nprint(word.upper())\nprint(word.lower())",
        expectedOutput: "PLANKY\nplanky\n",
        hint: "Notice the parentheses after the method name.",
        hint_th: "สังเกตวงเล็บหลังจากชื่อเมธอด"
      },
      {
        title: "Replace and Strip",
        title_th: "การแทนที่และการตัดข้อความ",
        explanation: "The `.replace('old', 'new')` method swaps out text.\n\nThe `.strip()` method is incredibly useful for removing accidental spaces at the beginning and end of a string. The `.split()` method breaks a string into a List of words.",
        explanation_th: "เมธอด `.replace('เก่า', 'ใหม่')` สลับสับเปลี่ยนข้อความ\n\nเมธอด `.strip()` มีประโยชน์อย่างยิ่งสำหรับการลบช่องว่างที่เกิดขึ้นโดยไม่ได้ตั้งใจที่จุดเริ่มต้นและจุดสิ้นสุดของสตริง เมธอด `.split()` แบ่งสตริงเป็นรายการคำ (List)",
        exampleCode: "text = ' I love cats '\nprint(text.strip())\nprint(text.replace('cats', 'dogs'))",
        expectedOutput: "I love cats\n I love dogs \n",
        hint: "Methods return a new string, they don't change the original.",
        hint_th: "เมธอดจะคืนค่าสตริงใหม่ ไม่ได้เปลี่ยนแปลงของเดิม"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Use a string method.",
        explanation_th: "ใช้เมธอดของสตริง",
        exercise: {
          prompt: "Print the result of replacing 'cat' with 'dog' in the string 'my cat'.",
          prompt_th: "พิมพ์ผลลัพธ์ของการแทนที่ 'cat' ด้วย 'dog' ในสตริง 'my cat'",
          starter: "",
          check: "my dog\n"
        },
        hint: "print('my cat'.replace(...))",
        hint_th: "print('my cat'.replace(...))"
      }
    ]
  },
  {
    id: "ch2-comprehensions",
    chapter: 2,
    title: "Comprehensions", title_th: "Comprehensions",
    pages: [
      {
        title: "List Comprehensions",
        title_th: "List Comprehensions",
        explanation: "A **List Comprehension** is a 1-line, super-fast way to create a list. It combines a `for` loop and a list creation into a single shorthand expression.\n\nSyntax: `[expression for item in iterable]`",
        explanation_th: "**List Comprehension** เป็นวิธีบรรทัดเดียวที่รวดเร็วมากในการสร้างลิสต์ มันรวมลูป `for` และการสร้างลิสต์เข้าเป็นนิพจน์ย่อแบบเดียว\n\nไวยากรณ์: `[นิพจน์ for ไอเท็ม in iterable]`",
        exampleCode: "nums = [x * 2 for x in range(3)]\nprint(nums)",
        expectedOutput: "[0, 2, 4]\n",
        hint: "This is much faster than writing a full loop with .append()",
        hint_th: "นี่เร็วกว่าการเขียนลูปเต็มรูปแบบด้วย .append()"
      },
      {
        title: "Filtering",
        title_th: "การกรอง (Filtering)",
        explanation: "You can add an `if` condition to the end of your comprehension to instantly filter the list as it is being created! Yes, you can also make Dictionary comprehensions using `{}`.",
        explanation_th: "คุณสามารถเพิ่มเงื่อนไข `if` ต่อท้ายการทำ comprehension เพื่อกรองลิสต์ได้ในทันทีที่มันถูกสร้าง! ใช่ คุณยังสามารถสร้าง Dictionary comprehensions โดยใช้ `{}` ได้ด้วย",
        exampleCode: "evens = [x for x in range(5) if x % 2 == 0]\nprint(evens)",
        expectedOutput: "[0, 2, 4]\n",
        hint: "x % 2 == 0 checks if a number is even.",
        hint_th: "x % 2 == 0 ตรวจสอบว่าตัวเลขเป็นเลขคู่หรือไม่"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Write a comprehension.",
        explanation_th: "เขียน comprehension",
        exercise: {
          prompt: "Create a list comprehension of [x] for x in range(4) if x > 1. Print the list.",
          prompt_th: "สร้าง list comprehension ของ [x] for x in range(4) if x > 1 พิมพ์ลิสต์นั้น",
          starter: "",
          check: "[2, 3]\n"
        },
        hint: "print([x for x in range(4) if x > 1])",
        hint_th: "print([x for x in range(4) if x > 1])"
      }
    ]
  },
  {
    id: "ch2-exceptions",
    chapter: 2,
    title: "Exceptions", title_th: "ข้อยกเว้น (Exceptions)",
    pages: [
      {
        title: "Catching Errors",
        title_th: "การดักจับข้อผิดพลาด",
        explanation: "When code crashes, it throws an **Exception** (like `ZeroDivisionError`). You can prevent your program from crashing by 'catching' these errors using a `try` / `except` block.\n\nIf the code inside `try` succeeds, the `except` block is entirely skipped.",
        explanation_th: "เมื่อโค้ดทำงานผิดพลาด มันจะโยน **ข้อยกเว้น (Exception)** (เช่น `ZeroDivisionError`) คุณสามารถป้องกันไม่ให้โปรแกรมพังได้โดย 'ดักจับ' ข้อผิดพลาดเหล่านี้โดยใช้บล็อก `try` / `except`\n\nถ้าโค้ดภายใน `try` ทำงานสำเร็จ บล็อก `except` จะถูกข้ามไปทั้งหมด",
        exampleCode: "try:\n    print(10 / 0)\nexcept:\n    print('Math error!')",
        expectedOutput: "Math error!\n",
        hint: "The program didn't crash!",
        hint_th: "โปรแกรมไม่พัง!"
      },
      {
        title: "Raise and Finally",
        title_th: "Raise และ Finally",
        explanation: "You can manually trigger an error using the `raise` keyword.\n\nYou can also add a `finally` block at the very end. The `finally` block ALWAYS runs, regardless of whether an error occurred or not (great for cleaning up!).",
        explanation_th: "คุณสามารถกระตุ้นข้อผิดพลาดได้ด้วยตนเองโดยใช้คำสั่ง `raise`\n\nคุณยังสามารถเพิ่มบล็อก `finally` ในตอนท้ายได้ บล็อก `finally` จะทำงานเสมอ ไม่ว่าจะมีข้อผิดพลาดเกิดขึ้นหรือไม่ (เหมาะสำหรับการทำความสะอาด!)",
        exampleCode: "try:\n    print(1)\nexcept:\n    print(2)\nfinally:\n    print('Done')",
        expectedOutput: "1\nDone\n",
        hint: "You can have multiple except blocks for different errors.",
        hint_th: "คุณสามารถมีบล็อก except หลายบล็อกสำหรับข้อผิดพลาดที่แตกต่างกันได้"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Handle an error safely.",
        explanation_th: "จัดการกับข้อผิดพลาดอย่างปลอดภัย",
        exercise: {
          prompt: "Write a try/except block. Try to print 1/0. Except: print 'Error'.",
          prompt_th: "เขียนบล็อก try/except ลองพิมพ์ 1/0 ยกเว้น: พิมพ์ 'Error'",
          starter: "",
          check: "Error\n"
        },
        hint: "Don't forget the colons and indentation.",
        hint_th: "อย่าลืมเครื่องหมายโคลอนและการเว้นวรรค"
      }
    ]
  },
  {
    id: "ch2-modules",
    chapter: 2,
    title: "Modules & Imports", title_th: "โมดูลและการนำเข้า",
    pages: [
      {
        title: "Importing Libraries",
        title_th: "การนำเข้าไลบรารี",
        explanation: "A **Module** is simply a Python file (`.py`) containing code someone else wrote. You can load these modules into your program using the `import` keyword.\n\nPython comes with many built-in modules, like `math`.",
        explanation_th: "**โมดูล (Module)** เป็นเพียงไฟล์ Python (`.py`) ที่มีโค้ดที่คนอื่นเขียนไว้ คุณสามารถโหลดโมดูลเหล่านี้เข้าสู่โปรแกรมของคุณได้โดยใช้คำสั่ง `import`\n\nPython มีโมดูลในตัวมากมาย เช่น `math`",
        exampleCode: "import math\nprint(math.ceil(1.2))",
        expectedOutput: "2\n",
        hint: "Use dot-notation to access functions inside a module.",
        hint_th: "ใช้สัญลักษณ์จุด (dot-notation) เพื่อเข้าถึงฟังก์ชันภายในโมดูล"
      },
      {
        title: "Specific Imports",
        title_th: "การนำเข้าเฉพาะส่วน",
        explanation: "If you don't want to type `math.` every time, you can import ONLY specific functions using the `from` keyword: `from math import sqrt`.\n\nYou can also rename modules as you import them: `import math as m`.",
        explanation_th: "ถ้าคุณไม่ต้องการพิมพ์ `math.` ทุกครั้ง คุณสามารถนำเข้าเฉพาะฟังก์ชันที่เจาะจงได้โดยใช้คำสั่ง `from`: `from math import sqrt`\n\nคุณยังสามารถเปลี่ยนชื่อโมดูลได้เมื่อคุณนำเข้ามัน: `import math as m`",
        exampleCode: "from math import floor\nprint(floor(1.9))",
        expectedOutput: "1\n",
        hint: "Now you don't need to type math.floor()!",
        hint_th: "ตอนนี้คุณไม่ต้องพิมพ์ math.floor() แล้ว!"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Use a math function.",
        explanation_th: "ใช้ฟังก์ชันทางคณิตศาสตร์",
        exercise: {
          prompt: "From 'math' import 'floor', and print floor(1.9).",
          prompt_th: "จาก 'math' ให้นำเข้า 'floor' และพิมพ์ floor(1.9)",
          starter: "",
          check: "1\n"
        },
        hint: "from math import floor",
        hint_th: "from math import floor"
      }
    ]
  },
  {
    id: "ch2-file-io",
    chapter: 2,
    title: "File I/O", title_th: "การจัดการไฟล์ (File I/O)",
    pages: [
      {
        title: "Opening and Writing",
        title_th: "การเปิดและการเขียน",
        explanation: "You can interact with files on your computer using the built-in `open()` function. You must specify a mode: `'r'` for reading, `'w'` for writing, and `'a'` for appending.\n\nAfter writing using the `.write()` method, you MUST call `.close()` to save your changes.",
        explanation_th: "คุณสามารถโต้ตอบกับไฟล์บนคอมพิวเตอร์ของคุณโดยใช้ฟังก์ชัน `open()` ที่มีอยู่ คุณต้องระบุโหมด: `'r'` สำหรับอ่าน, `'w'` สำหรับเขียน, และ `'a'` สำหรับต่อท้าย\n\nหลังจากเขียนโดยใช้เมธอด `.write()` คุณต้องเรียก `.close()` เสมอเพื่อบันทึกการเปลี่ยนแปลง",
        exampleCode: "f = open('test.txt', 'w')\nf.write('hello')\nf.close()\nprint('Done')",
        expectedOutput: "Done\n",
        hint: "Writing ('w') will overwrite the entire file.",
        hint_th: "การเขียน ('w') จะเขียนทับทั้งไฟล์"
      },
      {
        title: "The 'with' Keyword",
        title_th: "คำสั่ง 'with'",
        explanation: "Manually closing files is annoying. Instead, you can use a Context Manager via the `with` keyword. \n\nWhen the indented `with` block ends, Python automatically closes the file for you!",
        explanation_th: "การปิดไฟล์ด้วยตนเองนั้นน่ารำคาญ คุณสามารถใช้ Context Manager ผ่านคำสั่ง `with` แทนได้\n\nเมื่อบล็อกที่มีการเว้นวรรคด้วย `with` สิ้นสุดลง Python จะปิดไฟล์ให้คุณโดยอัตโนมัติ!",
        exampleCode: "with open('log.txt', 'w') as f:\n    f.write('ok')\nprint('Saved')",
        expectedOutput: "Saved\n",
        hint: "To read a file, use the .read() method.",
        hint_th: "เพื่ออ่านไฟล์ ให้ใช้เมธอด .read()"
      },
      {
        title: "Your Turn",
        title_th: "ตาคุณแล้ว",
        explanation: "Write to a file using 'with'.",
        explanation_th: "เขียนไปยังไฟล์โดยใช้ 'with'",
        exercise: {
          prompt: "Use `with open('log.txt', 'w') as f:` to write 'ok'. Then print 'Saved'.",
          prompt_th: "ใช้ `with open('log.txt', 'w') as f:` เพื่อเขียน 'ok' จากนั้นพิมพ์ 'Saved'",
          starter: "",
          check: "Saved\n"
        },
        hint: "Don't forget the colon after the with statement.",
        hint_th: "อย่าลืมเครื่องหมายโคลอนหลังคำสั่ง with"
      }
    ]
  }
];
