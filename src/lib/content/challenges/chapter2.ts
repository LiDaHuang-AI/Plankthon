import { Challenge } from "../challenges";

export const chapter2: Challenge[] = [
  {
    id: "ch2-dictionary",
    chapter: 2,
    title: "Dictionaries", title_th: "พจนานุกรม (Dictionaries)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "How do you create a dictionary?", prompt_th: "คุณสร้างพจนานุกรม (dictionary) ได้อย่างไร?", hint: "Curly", hint_th: "วงเล็บปีกกา", options: ["()", "[]", "{}", "<>"], options_th: ["()", "[]", "{}", "<>"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What are the two parts of a dictionary item?", prompt_th: "ส่วนประกอบสองส่วนของข้อมูลในพจนานุกรมคืออะไร?", hint: "Like a real dictionary", hint_th: "เหมือนพจนานุกรมของจริง", options: ["Index and Value", "Key and Value", "Name and Index", "Key and Key"], options_th: ["Index (ดัชนี) และ Value (ค่า)", "Key (คีย์) และ Value (ค่า)", "Name (ชื่อ) และ Index (ดัชนี)", "Key (คีย์) และ Key (คีย์)"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "If d = {'a': 1}, what is d['a']?", prompt_th: "ถ้า d = {'a': 1} แล้ว d['a'] จะเป็นเท่าไร?", hint: "Lookup by key", hint_th: "ค้นหาด้วยคีย์", options: ["'a'", "1", "Error", "d"], options_th: ["'a'", "1", "ข้อผิดพลาด", "d"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Can dictionary keys be numbers?", prompt_th: "คีย์ของพจนานุกรมเป็นตัวเลขได้หรือไม่?", hint: "Yes", hint_th: "ได้", options: ["Yes", "No", "Only strings", "Only floats"], options_th: ["ได้", "ไม่ได้", "เฉพาะข้อความเท่านั้น", "เฉพาะทศนิยมเท่านั้น"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What symbol separates a key from its value?", prompt_th: "สัญลักษณ์ใดที่ใช้แยกคีย์ออกจากค่าของมัน?", hint: "colon", hint_th: "โคลอน", correctAnswers: [":"] },
      { id: "q6", type: "typed-answer", prompt: "Type the brackets used to lookup a value by key.", prompt_th: "พิมพ์วงเล็บที่ใช้เพื่อค้นหาค่าด้วยคีย์", hint: "square", hint_th: "วงเล็บเหลี่ยม", correctAnswers: ["[]"] },
      { id: "q7", type: "typed-answer", prompt: "Are dictionaries ordered or unordered internally?", prompt_th: "โครงสร้างภายในของพจนานุกรมเป็นแบบมีลำดับหรือไม่มีลำดับ?", hint: "unordered", hint_th: "ไม่มีลำดับ (unordered)", correctAnswers: ["unordered"] },
      { id: "q8", type: "typed-answer", prompt: "Can two items have the exact same key?", prompt_th: "ข้อมูลสองรายการสามารถมีคีย์ที่เหมือนกันทุกประการได้หรือไม่?", hint: "no", hint_th: "no", correctAnswers: ["no"] },
      {
        id: "q9", type: "coding", prompt: "Create a dictionary `user` with key 'name' set to 'Bob'. Print it.", prompt_th: "สร้างพจนานุกรม `user` ให้มีคีย์ 'name' และมีค่าเป็น 'Bob' จากนั้นพิมพ์ออกมา", hint: "user = {'name': 'Bob'}", hint_th: "user = {'name': 'Bob'}",
        expectedOutput: "{'name': 'Bob'}\n", rules: ["Must use dict"], rules_th: ["ต้องใช้พจนานุกรม"],
        tests: [{ assertStdout: "{'name': 'Bob'}\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `d = {'x': 5}`. Change 'x' to 10 and print `d['x']`.", prompt_th: "สร้าง `d = {'x': 5}` เปลี่ยน 'x' เป็น 10 และพิมพ์ `d['x']`", hint: "d['x'] = 10", hint_th: "d['x'] = 10",
        expectedOutput: "10\n", rules: ["Must update dict"], rules_th: ["ต้องมีการอัปเดตพจนานุกรม"],
        tests: [{ assertStdout: "10\n" }]
      }
    ]
  },
  {
    id: "ch2-tuples-sets",
    chapter: 2,
    title: "Tuples & Sets", title_th: "ทูเพิลและเซต (Tuples & Sets)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What makes a tuple different from a list?", prompt_th: "อะไรที่ทำให้ tuple แตกต่างจาก list?", hint: "Immutable", hint_th: "เปลี่ยนค่าไม่ได้ (Immutable)", options: ["It uses brackets", "It cannot be changed", "It only holds numbers", "It is slower"], options_th: ["มันใช้วงเล็บเหลี่ยม", "มันไม่สามารถเปลี่ยนแปลงได้", "มันเก็บได้เฉพาะตัวเลข", "มันทำงานช้ากว่า"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "How do you define a tuple?", prompt_th: "คุณประกาศ tuple อย่างไร?", hint: "Parentheses", hint_th: "วงเล็บ", options: ["()", "[]", "{}", "<>"], options_th: ["()", "[]", "{}", "<>"], correctIndex: 0 },
      { id: "q3", type: "multiple-choice", prompt: "What is a key feature of a Set?", prompt_th: "คุณสมบัติสำคัญของ Set คืออะไร?", hint: "Unique", hint_th: "ไม่ซ้ำใคร (Unique)", options: ["Ordered items", "Duplicate items allowed", "All items are unique", "Indexed access"], options_th: ["เรียงตามลำดับ", "อนุญาตให้ข้อมูลซ้ำได้", "ข้อมูลทุกตัวต้องไม่ซ้ำกัน", "สามารถเข้าถึงด้วยดัชนีได้"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "What brackets define a Set?", prompt_th: "วงเล็บใดที่ใช้ประกาศ Set?", hint: "Curly", hint_th: "วงเล็บปีกกา", options: ["()", "[]", "{}", "<>"], options_th: ["()", "[]", "{}", "<>"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "Can you append to a tuple?", prompt_th: "คุณสามารถใช้ append กับ tuple ได้หรือไม่?", hint: "no", hint_th: "no", correctAnswers: ["no"] },
      { id: "q6", type: "typed-answer", prompt: "If s = {1, 1, 2}, how many items are in it?", prompt_th: "ถ้า s = {1, 1, 2} มันมีข้อมูลอยู่ข้างในกี่ตัว?", hint: "Unique", hint_th: "ต้องไม่ซ้ำกัน", correctAnswers: ["2", "two"] },
      { id: "q7", type: "typed-answer", prompt: "Type the keyword to get the length of a set or tuple.", prompt_th: "พิมพ์คำสั่งเพื่อหาความยาวของ set หรือ tuple", hint: "len", hint_th: "len", correctAnswers: ["len"] },
      { id: "q8", type: "typed-answer", prompt: "Is a set ordered?", prompt_th: "set มีการเรียงลำดับหรือไม่?", hint: "no", hint_th: "no", correctAnswers: ["no"] },
      {
        id: "q9", type: "coding", prompt: "Create a tuple `t = (1, 2)` and print its first item.", prompt_th: "สร้าง tuple `t = (1, 2)` และพิมพ์ข้อมูลตัวแรกออกมา", hint: "t[0]", hint_th: "t[0]",
        expectedOutput: "1\n", rules: ["Must use tuple indexing"], rules_th: ["ต้องใช้การเข้าถึงดัชนีของ tuple"],
        tests: [{ assertStdout: "1\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create a set `s = {1, 1, 2}` and print its length.", prompt_th: "สร้าง set `s = {1, 1, 2}` และพิมพ์ความยาวของมัน", hint: "print(len(s))", hint_th: "print(len(s))",
        expectedOutput: "2\n", rules: ["Must use len()"], rules_th: ["ต้องใช้ len()"],
        tests: [{ assertStdout: "2\n" }]
      }
    ]
  },
  {
    id: "ch2-string-methods",
    chapter: 2,
    title: "String Methods", title_th: "เมธอดของข้อความ (String Methods)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "Which method converts a string to uppercase?", prompt_th: "เมธอดใดที่ใช้แปลงข้อความให้เป็นตัวพิมพ์ใหญ่?", hint: "upper", hint_th: "upper", options: [".high()", ".up()", ".upper()", ".caps()"], options_th: [".high()", ".up()", ".upper()", ".caps()"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "Which method converts a string to lowercase?", prompt_th: "เมธอดใดที่ใช้แปลงข้อความให้เป็นตัวพิมพ์เล็ก?", hint: "lower", hint_th: "lower", options: [".down()", ".lower()", ".low()", ".small()"], options_th: [".down()", ".lower()", ".low()", ".small()"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "How do you replace 'a' with 'b' in a string?", prompt_th: "คุณจะแทนที่ 'a' ด้วย 'b' ในข้อความได้อย่างไร?", hint: "replace", hint_th: "replace", options: [".swap('a','b')", ".replace('a','b')", ".change('a','b')", ".switch('a','b')"], options_th: [".swap('a','b')", ".replace('a','b')", ".change('a','b')", ".switch('a','b')"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What does '  hi  '.strip() do?", prompt_th: "'  hi  '.strip() ทำหน้าที่อะไร?", hint: "removes spaces", hint_th: "ลบช่องว่าง", options: ["Removes all letters", "Removes spaces on ends", "Causes error", "Splits the word"], options_th: ["ลบตัวอักษรทั้งหมด", "ลบช่องว่างที่อยู่หัวท้าย", "ทำให้เกิดข้อผิดพลาด", "แยกคำออกจากกัน"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "Type the method for uppercase (include parentheses).", prompt_th: "พิมพ์เมธอดสำหรับทำเป็นตัวพิมพ์ใหญ่ (ใส่วงเล็บด้วย)", hint: "upper()", hint_th: "upper()", correctAnswers: ["upper()"] },
      { id: "q6", type: "typed-answer", prompt: "Type the method for lowercase (include parentheses).", prompt_th: "พิมพ์เมธอดสำหรับทำเป็นตัวพิมพ์เล็ก (ใส่วงเล็บด้วย)", hint: "lower()", hint_th: "lower()", correctAnswers: ["lower()"] },
      { id: "q7", type: "typed-answer", prompt: "What character separates the string from its method?", prompt_th: "อักขระใดคั่นระหว่างสตริงและเมธอดของมัน?", hint: "dot", hint_th: "จุด (dot)", correctAnswers: ["."] },
      { id: "q8", type: "typed-answer", prompt: "If 'a b'.split() is called, what does it return?", prompt_th: "ถ้าเรียกใช้ 'a b'.split() มันจะคืนค่าอะไรกลับมา?", hint: "list", hint_th: "list", correctAnswers: ["list", "a list"] },
      {
        id: "q9", type: "coding", prompt: "Print the string 'planky' in uppercase.", prompt_th: "พิมพ์ข้อความ 'planky' เป็นตัวพิมพ์ใหญ่", hint: "Use .upper()", hint_th: "ใช้ .upper()",
        expectedOutput: "PLANKY\n", rules: ["Must use .upper()"], rules_th: ["ต้องใช้ .upper()"],
        tests: [{ assertStdout: "PLANKY\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Print the result of replacing 'cat' with 'dog' in 'my cat'.", prompt_th: "พิมพ์ผลลัพธ์จากการแทนที่ 'cat' ด้วย 'dog' ในคำว่า 'my cat'", hint: "Use .replace()", hint_th: "ใช้ .replace()",
        expectedOutput: "my dog\n", rules: ["Must use .replace()"], rules_th: ["ต้องใช้ .replace()"],
        tests: [{ assertStdout: "my dog\n" }]
      }
    ]
  },
  {
    id: "ch2-comprehensions",
    chapter: 2,
    title: "Comprehensions", title_th: "Comprehensions",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What is a list comprehension?", prompt_th: "list comprehension คืออะไร?", hint: "Shorthand", hint_th: "รูปแบบย่อ", options: ["A function", "A long loop", "A 1-line way to create a list", "A dictionary"], options_th: ["ฟังก์ชันหนึ่ง", "ลูปที่ยาวมาก", "วิธีการบรรทัดเดียวสำหรับสร้างลิสต์", "พจนานุกรมแบบหนึ่ง"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What does [x for x in range(2)] create?", prompt_th: "[x for x in range(2)] สร้างข้อมูลรูปแบบใด?", hint: "0 and 1", hint_th: "0 และ 1", options: ["[1, 2]", "[0, 1]", "[0, 1, 2]", "Error"], options_th: ["[1, 2]", "[0, 1]", "[0, 1, 2]", "ข้อผิดพลาด"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "Can you add an 'if' condition in a list comprehension?", prompt_th: "คุณสามารถใส่เงื่อนไข 'if' ใน list comprehension ได้หรือไม่?", hint: "Yes", hint_th: "ได้", options: ["Yes", "No", "Only at the start", "Only with dictionaries"], options_th: ["ได้", "ไม่ได้", "ได้เฉพาะตรงส่วนแรกเท่านั้น", "ได้เฉพาะกับพจนานุกรม (dictionaries)"], correctIndex: 0 },
      { id: "q4", type: "multiple-choice", prompt: "What brackets are used for list comprehensions?", prompt_th: "วงเล็บแบบใดที่ใช้สำหรับสร้าง list comprehensions?", hint: "List brackets", hint_th: "วงเล็บแบบลิสต์", options: ["()", "[]", "{}", "<>"], options_th: ["()", "[]", "{}", "<>"], correctIndex: 1 },
      { id: "q5", type: "typed-answer", prompt: "What keyword is required in the middle of a comprehension?", prompt_th: "คำสำคัญใดที่จำเป็นต้องมีอยู่ตรงกลางของ comprehension?", hint: "for", hint_th: "for", correctAnswers: ["for"] },
      { id: "q6", type: "typed-answer", prompt: "What does [1 for x in range(3)] create?", prompt_th: "[1 for x in range(3)] จะสร้างอะไรออกมา?", hint: "Three ones", hint_th: "เลข 1 สามตัว", correctAnswers: ["[1, 1, 1]"] },
      { id: "q7", type: "typed-answer", prompt: "Is a list comprehension faster or slower than a standard loop generally?", prompt_th: "โดยทั่วไปแล้ว list comprehension ทำงานเร็วกว่าหรือช้ากว่าลูป (loop) ธรรมดา?", hint: "faster", hint_th: "เร็วกกว่า (faster)", correctAnswers: ["faster"] },
      { id: "q8", type: "typed-answer", prompt: "Can you make a dictionary comprehension?", prompt_th: "คุณสามารถสร้าง dictionary comprehension ได้หรือไม่?", hint: "yes or no", hint_th: "yes หรือ no", correctAnswers: ["yes"] },
      {
        id: "q9", type: "coding", prompt: "Create a list comprehension of [x*2] for x in range(3). Print it.", prompt_th: "สร้าง list comprehension แบบ [x*2] โดยใช้ for x in range(3) จากนั้นพิมพ์มันออกมา", hint: "print([x*2 for x in range(3)])", hint_th: "print([x*2 for x in range(3)])",
        expectedOutput: "[0, 2, 4]\n", rules: ["Must use comprehension"], rules_th: ["ต้องใช้ comprehension"],
        tests: [{ assertStdout: "[0, 2, 4]\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create a list comprehension of [x] for x in range(4) if x > 1. Print it.", prompt_th: "สร้าง list comprehension แบบ [x] for x in range(4) if x > 1 พิมพ์ออกมา", hint: "Filtering", hint_th: "การกรอง (Filtering)",
        expectedOutput: "[2, 3]\n", rules: ["Must use comprehension with if"], rules_th: ["ต้องใช้ comprehension ที่มี if"],
        tests: [{ assertStdout: "[2, 3]\n" }]
      }
    ]
  },
  {
    id: "ch2-exceptions",
    chapter: 2,
    title: "Exceptions", title_th: "ข้อยกเว้น (Exceptions)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword starts an exception handling block?", prompt_th: "คำสำคัญใดที่ใช้เริ่มต้นบล็อกสำหรับจัดการข้อผิดพลาด?", hint: "try", hint_th: "try", options: ["catch", "try", "error", "except"], options_th: ["catch", "try", "error", "except"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What keyword catches the error?", prompt_th: "คำสำคัญใดที่ใช้ดักจับข้อผิดพลาด (catch error)?", hint: "except", hint_th: "except", options: ["catch", "except", "throw", "handle"], options_th: ["catch", "except", "throw", "handle"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What happens if code in the 'try' block works perfectly?", prompt_th: "จะเกิดอะไรขึ้นถ้าโค้ดในบล็อก 'try' ทำงานได้ปกติโดยไม่มีปัญหา?", hint: "Except is skipped", hint_th: "จะข้ามบล็อก Except ไป", options: ["except block runs", "except block is skipped", "program crashes", "it runs twice"], options_th: ["บล็อก except จะทำงาน", "บล็อก except จะถูกข้ามไป", "โปรแกรมล่ม", "มันจะทำงานสองรอบ"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Can you have multiple except blocks?", prompt_th: "คุณสามารถมีบล็อก except หลายอันได้หรือไม่?", hint: "Yes", hint_th: "ได้", options: ["Yes", "No", "Only two", "Only in functions"], options_th: ["ได้", "ไม่ได้", "ได้แค่ 2 อันเท่านั้น", "เฉพาะในฟังก์ชันเท่านั้น"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword to manually trigger an error.", prompt_th: "พิมพ์คำสำคัญเพื่อจำลองให้เกิดข้อผิดพลาดขึ้นด้วยตัวเอง", hint: "raise", hint_th: "raise", correctAnswers: ["raise"] },
      { id: "q6", type: "typed-answer", prompt: "What block ALWAYS runs, whether an error happens or not?", prompt_th: "บล็อกโค้ดส่วนใดที่จะทำงานเสมอ ไม่ว่าจะเกิดข้อผิดพลาดขึ้นหรือไม่ก็ตาม?", hint: "finally", hint_th: "finally", correctAnswers: ["finally"] },
      { id: "q7", type: "typed-answer", prompt: "What error occurs if you divide by zero?", prompt_th: "ข้อผิดพลาดใดจะเกิดขึ้นถ้าคุณหารตัวเลขด้วยศูนย์?", hint: "ZeroDivisionError", hint_th: "ZeroDivisionError", correctAnswers: ["ZeroDivisionError"] },
      { id: "q8", type: "typed-answer", prompt: "Do except blocks require a colon?", prompt_th: "บล็อก except จำเป็นต้องมีเครื่องหมายโคลอน (colon) ไหม?", hint: "yes or no", hint_th: "yes หรือ no", correctAnswers: ["yes"] },
      {
        id: "q9", type: "coding", prompt: "Write a try/except block. Try to print 1/0. Except: print 'Error'.", prompt_th: "เขียนบล็อก try/except โดยให้ try เข้าพิมพ์ 1/0 ถ้ามีข้อผิดพลาดให้ไปที่ Except: พิมพ์ 'Error'", hint: "It should catch the zero division.", hint_th: "มันจะดักจับการหารด้วยศูนย์",
        expectedOutput: "Error\n", rules: ["Must use try and except"], rules_th: ["ต้องใช้ try และ except"],
        tests: [{ assertStdout: "Error\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Write try/except. Try to print 1. Except: print 2.", prompt_th: "เขียนบล็อก try/except ลองสั่งให้พิมพ์ 1 ตรง Except ให้พิมพ์ 2", hint: "It shouldn't fail.", hint_th: "มันไม่น่าจะล้มเหลว",
        expectedOutput: "1\n", rules: ["Must use try and except"], rules_th: ["ต้องใช้ try และ except"],
        tests: [{ assertStdout: "1\n" }]
      }
    ]
  },
  {
    id: "ch2-modules",
    chapter: 2,
    title: "Modules & Imports", title_th: "โมดูลและการนำเข้า",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What keyword loads a module?", prompt_th: "คำสำคัญใดที่ใช้สำหรับโหลดโมดูล?", hint: "import", hint_th: "import", options: ["load", "include", "import", "require"], options_th: ["load", "include", "import", "require"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "If you import math, how do you use its sqrt function?", prompt_th: "ถ้าคุณ import math เข้ามาแล้ว คุณจะเรียกใช้ฟังก์ชัน sqrt อย่างไร?", hint: "dot notation", hint_th: "สัญลักษณ์จุด (dot notation)", options: ["sqrt()", "math.sqrt()", "math(sqrt)", "import.sqrt()"], options_th: ["sqrt()", "math.sqrt()", "math(sqrt)", "import.sqrt()"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "How do you import ONLY the sqrt function from math?", prompt_th: "คุณจะเลือก import เฉพาะฟังก์ชัน sqrt จาก math ได้อย่างไร?", hint: "from", hint_th: "from", options: ["from math import sqrt", "import sqrt from math", "load math.sqrt", "require math.sqrt"], options_th: ["from math import sqrt", "import sqrt from math", "load math.sqrt", "require math.sqrt"], correctIndex: 0 },
      { id: "q4", type: "multiple-choice", prompt: "Can you create your own modules?", prompt_th: "คุณสามารถสร้างโมดูลขึ้นมาใช้เองได้หรือไม่?", hint: "Yes", hint_th: "ได้", options: ["Yes", "No", "Only with permission", "Only in C++"], options_th: ["ได้", "ไม่ได้", "ได้ถ้าได้รับอนุญาต", "ได้แค่ใน C++"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword to load a library.", prompt_th: "พิมพ์คำสำคัญเพื่อโหลด library", hint: "import", hint_th: "import", correctAnswers: ["import"] },
      { id: "q6", type: "typed-answer", prompt: "If you use 'import math as m', how do you call sqrt?", prompt_th: "ถ้าคุณใช้ 'import math as m' แล้ว คุณจะเรียกใช้ฟังก์ชัน sqrt อย่างไร?", hint: "m.sqrt()", hint_th: "m.sqrt()", correctAnswers: ["m.sqrt()", "m.sqrt"] },
      { id: "q7", type: "typed-answer", prompt: "What is a python file (.py) essentially called?", prompt_th: "ไฟล์ของ python (.py) มีชื่อเรียกโดยทั่วไปว่าอะไร?", hint: "module", hint_th: "module", correctAnswers: ["module"] },
      { id: "q8", type: "typed-answer", prompt: "Type the keyword to load a specific item from a module.", prompt_th: "พิมพ์คำสำคัญที่ใช้เพื่อโหลดไอเท็มเฉพาะเจาะจงจากในโมดูล", hint: "from", hint_th: "from", correctAnswers: ["from"] },
      {
        id: "q9", type: "coding", prompt: "Import the 'math' module and print math.ceil(1.2).", prompt_th: "Import โมดูล 'math' และให้พิมพ์ค่าของ math.ceil(1.2)", hint: "ceil rounds up", hint_th: "ceil คือการปัดเศษขึ้น",
        expectedOutput: "2\n", rules: ["Must use import"], rules_th: ["ต้องใช้คำสั่ง import"],
        tests: [{ assertStdout: "2\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "From 'math' import 'floor', and print floor(1.9).", prompt_th: "จากโมดูล 'math' ให้ import ฟังก์ชัน 'floor' เข้ามา แล้วให้พิมพ์ค่า floor(1.9)", hint: "from math import floor", hint_th: "from math import floor",
        expectedOutput: "1\n", rules: ["Must use from import"], rules_th: ["ต้องใช้คำสั่ง from เพื่อ import"],
        tests: [{ assertStdout: "1\n" }]
      }
    ]
  },
  {
    id: "ch2-file-io",
    chapter: 2,
    title: "File I/O", title_th: "การจัดการไฟล์ (File I/O)",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What function opens a file?", prompt_th: "ฟังก์ชันใดที่ใช้เปิดไฟล์?", hint: "open", hint_th: "open", options: ["read()", "file()", "open()", "load()"], options_th: ["read()", "file()", "open()", "load()"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What mode opens a file for writing?", prompt_th: "โหมดใดที่จะเปิดไฟล์สำหรับการเขียนข้อความทับลงไป?", hint: "w", hint_th: "w", options: ["'r'", "'w'", "'a'", "'x'"], options_th: ["'r'", "'w'", "'a'", "'x'"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What should you always do after finishing with a file?", prompt_th: "สิ่งใดที่คุณควรทำเสมอหลังจากใช้งานไฟล์เสร็จสิ้นแล้ว?", hint: "close it", hint_th: "ปิดมัน (close)", options: ["delete it", "close() it", "save() it", "print it"], options_th: ["ลบไฟล์", "สั่ง close() ปิดไฟล์", "สั่ง save() บันทึกไฟล์", "พิมพ์มันออกมา"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What mode is used for appending to a file?", prompt_th: "โหมดใดที่ใช้สำหรับการเขียนเพิ่มท้ายไฟล์ (append)?", hint: "a", hint_th: "a", options: ["'w'", "'r'", "'a'", "'app'"], options_th: ["'w'", "'r'", "'a'", "'app'"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "What method writes text to an open file object?", prompt_th: "เมธอดใดที่ใช้เขียนข้อความไปยังออบเจ็กต์ไฟล์ที่เปิดอยู่?", hint: "write", hint_th: "write", correctAnswers: ["write", "write()"] },
      { id: "q6", type: "typed-answer", prompt: "What method reads the entire file content?", prompt_th: "เมธอดใดใช้สำหรับอ่านเนื้อหาในไฟล์ทั้งหมด?", hint: "read", hint_th: "read", correctAnswers: ["read", "read()"] },
      { id: "q7", type: "typed-answer", prompt: "What mode is used for reading?", prompt_th: "โหมดใดที่ใช้สำหรับการอ่านอย่างเดียว?", hint: "r", hint_th: "r", correctAnswers: ["r", "'r'", "\"r\""] },
      { id: "q8", type: "typed-answer", prompt: "What keyword automatically closes a file block?", prompt_th: "คำสำคัญใดที่จะปิดบล็อกไฟล์ให้โดยอัตโนมัติเมื่อทำเสร็จ?", hint: "with", hint_th: "with", correctAnswers: ["with"] },
      {
        id: "q9", type: "coding", prompt: "Open 'test.txt' in 'w' mode, write 'hello', and close it. Then print 'Done'.", prompt_th: "เปิดไฟล์ 'test.txt' ด้วยโหมด 'w', เขียนคำว่า 'hello' ลงไป แล้วก็ปิดไฟล์ จากนั้นพิมพ์ข้อความ 'Done'", hint: "f = open(...)", hint_th: "f = open(...)",
        expectedOutput: "Done\n", rules: ["Must use open"], rules_th: ["ต้องใช้คำสั่ง open"],
        tests: [{ assertStdout: "Done\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Use 'with open('log.txt', 'w') as f:' to write 'ok'. Then print 'Saved'.", prompt_th: "ใช้คำสั่ง 'with open('log.txt', 'w') as f:' เพื่อเขียนคำว่า 'ok' จากนั้นพิมพ์คำว่า 'Saved'", hint: "Context manager", hint_th: "Context manager",
        expectedOutput: "Saved\n", rules: ["Must use with open"], rules_th: ["ต้องใช้คำสั่ง with open"],
        tests: [{ assertStdout: "Saved\n" }]
      }
    ]
  }
];
