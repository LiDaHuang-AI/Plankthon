import { Challenge } from "../challenges";

export const chapter1: Challenge[] = [
  {
    id: "ch1-basic",
    chapter: 1,
    title: "Basic",
    questions: [
      { id: "q1", type: "multiple-choice", prompt: "What function is used to display text on the screen in Python?", prompt_th: "ฟังก์ชันใดที่ใช้แสดงข้อความบนหน้าจอใน Python?", hint: "It starts with p", hint_th: "ขึ้นต้นด้วย p", options: ["display()", "print()", "show()", "output()"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "Which of the following is a valid string?", prompt_th: "ข้อใดต่อไปนี้คือสตริง (String) ที่ถูกต้อง?", hint: "Look for quotes", hint_th: "มองหาเครื่องหมายคำพูด", options: ["Hello", "\"Hello\"", "print(Hello)", "123"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What happens if you forget quotes around text in print()?", prompt_th: "จะเกิดอะไรขึ้นถ้าคุณลืมใส่เครื่องหมายคำพูดรอบข้อความใน print()?", hint: "Python doesn't know it's text", hint_th: "Python ไม่รู้ว่ามันคือข้อความ", options: ["It prints anyway", "Python crashes/SyntaxError", "It prints a space", "Nothing happens"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Can you use single quotes (' ') for strings?", prompt_th: "คุณสามารถใช้เครื่องหมายคำพูดเดี่ยว (' ') สำหรับสตริงได้หรือไม่?", hint: "Yes, Python is flexible", hint_th: "ได้ Python มีความยืดหยุ่น", options: ["Yes", "No", "Only for numbers", "Only in Python 2"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the exact word Python uses to display output.", prompt_th: "พิมพ์คำที่ Python ใช้ในการแสดงผลลัพธ์", hint: "Five letters", hint_th: "มี 5 ตัวอักษร", correctAnswers: ["print"] },
      { id: "q6", type: "typed-answer", prompt: "What symbol is used for double quotes?", prompt_th: "สัญลักษณ์ใดที่ใช้สำหรับเครื่องหมายคำพูดคู่ (Double quotes)?", hint: "Just type the symbol", hint_th: "พิมพ์แค่สัญลักษณ์", correctAnswers: ["\""] },
      { id: "q7", type: "typed-answer", prompt: "What symbol is used for single quotes?", prompt_th: "สัญลักษณ์ใดที่ใช้สำหรับเครื่องหมายคำพูดเดี่ยว (Single quotes)?", hint: "Just type the symbol", hint_th: "พิมพ์แค่สัญลักษณ์", correctAnswers: ["'"] },
      { id: "q8", type: "typed-answer", prompt: "What punctuation surrounds the text inside a print function?", prompt_th: "เครื่องหมายวรรคตอนใดที่ล้อมรอบข้อความในฟังก์ชัน print?", hint: "They look like ()", hint_th: "หน้าตาเหมือน ()", correctAnswers: ["(", "()", "parentheses"] },
      {
        id: "q9", type: "coding", prompt: "Print the word: Apple", prompt_th: "พิมพ์คำว่า: Apple", hint: "Use double quotes", hint_th: "ใช้เครื่องหมายคำพูดคู่",
        expectedOutput: "Apple\n", rules: ["Must use print()", "Must exactly match Apple"], 
        tests: [{ assertStdout: "Apple\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Print the number: 5", prompt_th: "พิมพ์ตัวเลข: 5", hint: "Numbers don't need quotes", hint_th: "ตัวเลขไม่ต้องใช้เครื่องหมายคำพูด",
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
      { id: "q1", type: "multiple-choice", prompt: "What operator is used to concatenate strings?", prompt_th: "ตัวดำเนินการใดที่ใช้ในการต่อสตริง?", hint: "Like addition", hint_th: "เหมือนการบวก", options: ["*", "-", "+", "/"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What is the result of 'A' + 'B'?", prompt_th: "ผลลัพธ์ของ 'A' + 'B' คืออะไร?", hint: "No spaces are added automatically", hint_th: "ไม่มีการเพิ่มช่องว่างอัตโนมัติ", options: ["A B", "AB", "B A", "Error"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What happens if you try to add a string and a number? ('A' + 2)", prompt_th: "จะเกิดอะไรขึ้นถ้าคุณพยายามบวกสตริงและตัวเลข? ('A' + 2)", hint: "Python is strictly typed", hint_th: "Python เป็นภาษาที่มีชนิดข้อมูลเข้มงวด", options: ["A2", "2A", "Error", "A A"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "How do you add a space between words when concatenating?", prompt_th: "คุณจะเพิ่มช่องว่างระหว่างคำเมื่อต่อสตริงได้อย่างไร?", hint: "Add a space string", hint_th: "เพิ่มสตริงช่องว่าง", options: ["' '", "space()", "++", "&"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What operator joins strings?", prompt_th: "ตัวดำเนินการใดเชื่อมสตริง?", hint: "Math symbol", hint_th: "สัญลักษณ์ทางคณิตศาสตร์", correctAnswers: ["+"] },
      { id: "q6", type: "typed-answer", prompt: "What is 'py' + 'thon'?", prompt_th: "'py' + 'thon' ได้ผลลัพธ์เป็นอะไร?", hint: "Combine them", hint_th: "รวมมันเข้าด้วยกัน", correctAnswers: ["python"] },
      { id: "q7", type: "typed-answer", prompt: "Is a string wrapped in double quotes the same as single quotes?", prompt_th: "สตริงที่ห่อด้วยเครื่องหมายคำพูดคู่เหมือนกับเครื่องหมายคำพูดเดี่ยวหรือไม่?", hint: "Yes or No", hint_th: "Yes หรือ No", correctAnswers: ["yes"] },
      { id: "q8", type: "typed-answer", prompt: "What is '1' + '1'?", prompt_th: "'1' + '1' ได้ผลลัพธ์เป็นอะไร?", hint: "String addition, not math", hint_th: "การต่อสตริง ไม่ใช่คณิตศาสตร์", correctAnswers: ["11"] },
      {
        id: "q9", type: "coding", prompt: "Concatenate 'Super' and 'man' and print it.", prompt_th: "ต่อข้อความ 'Super' และ 'man' แล้วพิมพ์ออกมา", hint: "print('Super' + 'man')", hint_th: "print('Super' + 'man')",
        expectedOutput: "Superman\n", rules: ["Must use +"], 
        tests: [{ assertStdout: "Superman\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Print 'Hello World' using string concatenation of 'Hello ' and 'World'.", prompt_th: "พิมพ์ 'Hello World' โดยใช้การต่อสตริงของ 'Hello ' และ 'World'", hint: "Notice the space", hint_th: "สังเกตช่องว่าง",
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
      { id: "q1", type: "multiple-choice", prompt: "What symbol assigns a value to a variable?", prompt_th: "สัญลักษณ์ใดที่ใช้กำหนดค่าให้กับตัวแปร?", hint: "Assign, not compare", hint_th: "กำหนดค่า ไม่ใช่เปรียบเทียบ", options: ["==", ":", "=", "->"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "Which is a valid variable name?", prompt_th: "ข้อใดคือชื่อตัวแปรที่ถูกต้อง?", hint: "Cannot start with a number", hint_th: "ไม่สามารถขึ้นต้นด้วยตัวเลขได้", options: ["1name", "my-name", "my_name", "my name"], correctIndex: 2 },
      { id: "q3", type: "multiple-choice", prompt: "If x = 5, what does print(x) output?", prompt_th: "ถ้า x = 5 แล้ว print(x) จะแสดงผลอะไร?", hint: "It prints the value", hint_th: "มันพิมพ์ค่าของตัวแปร", options: ["x", "5", "Error", "print(x)"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Can a variable change its value later?", prompt_th: "ตัวแปรสามารถเปลี่ยนค่าในภายหลังได้หรือไม่?", hint: "They are variable", hint_th: "มันคือตัวที่เปลี่ยนแปลงได้", options: ["Yes", "No", "Only if it's a number", "Only if it's a string"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What sign is used for assignment?", prompt_th: "เครื่องหมายใดใช้สำหรับการกำหนดค่า?", hint: "One character", hint_th: "ตัวอักษรเดียว", correctAnswers: ["="] },
      { id: "q6", type: "typed-answer", prompt: "If a = 'Dog', what is print(a)?", prompt_th: "ถ้า a = 'Dog' แล้ว print(a) จะแสดงผลอะไร?", hint: "Case sensitive", hint_th: "ตัวพิมพ์เล็ก/ใหญ่มีผล", correctAnswers: ["Dog"] },
      { id: "q7", type: "typed-answer", prompt: "Can variable names have spaces?", prompt_th: "ชื่อตัวแปรสามารถมีช่องว่างได้หรือไม่?", hint: "Yes or No", hint_th: "Yes หรือ No", correctAnswers: ["no"] },
      { id: "q8", type: "typed-answer", prompt: "What character is standard for spaces in variable names?", prompt_th: "อักขระใดเป็นมาตรฐานแทนช่องว่างในชื่อตัวแปร?", hint: "Bottom line", hint_th: "เส้นด้านล่าง", correctAnswers: ["_", "underscore"] },
      {
        id: "q9", type: "coding", prompt: "Create a variable `age` and set it to 20. Then print it.", prompt_th: "สร้างตัวแปร `age` และกำหนดค่าให้เป็น 20 จากนั้นพิมพ์มันออกมา", hint: "age = 20", hint_th: "age = 20",
        expectedOutput: "20\n", rules: ["Must create variable age"], 
        tests: [{ assertStdout: "20\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `x = 1`, then `x = 2`, then print `x`.", prompt_th: "สร้าง `x = 1` จากนั้น `x = 2` จากนั้นพิมพ์ `x`", hint: "It prints the latest value", hint_th: "มันพิมพ์ค่าล่าสุด",
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
      { id: "q1", type: "multiple-choice", prompt: "What is the symbol for multiplication?", prompt_th: "สัญลักษณ์สำหรับการคูณคืออะไร?", hint: "Star", hint_th: "ดาว", options: ["x", "*", ".", "^"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What is 10 / 2?", prompt_th: "10 / 2 คืออะไร?", hint: "Division returns a float", hint_th: "การหารจะคืนค่าเป็นเลขทศนิยม (float)", options: ["5", "5.0", "Error", "10/2"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What does Python evaluate first: 2 + 3 * 2?", prompt_th: "Python จะประมวลผลส่วนใดก่อน: 2 + 3 * 2?", hint: "PEMDAS", hint_th: "ตามหลัก PEMDAS", options: ["10", "8", "7", "12"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What data type is a whole number?", prompt_th: "ข้อมูลประเภทใดที่เป็นจำนวนเต็ม?", hint: "Integer", hint_th: "Integer", options: ["String", "Float", "Integer", "Boolean"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "What symbol is used for subtraction?", prompt_th: "สัญลักษณ์ใดที่ใช้สำหรับการลบ?", hint: "Dash", hint_th: "ขีด", correctAnswers: ["-"] },
      { id: "q6", type: "typed-answer", prompt: "What symbol is used for division?", prompt_th: "สัญลักษณ์ใดที่ใช้สำหรับการหาร?", hint: "Forward", hint_th: "ขีดทับ (Slash)", correctAnswers: ["/"] },
      { id: "q7", type: "typed-answer", prompt: "What is 5 - 3?", prompt_th: "5 - 3 คืออะไร?", hint: "Math", hint_th: "คณิตศาสตร์", correctAnswers: ["2"] },
      { id: "q8", type: "typed-answer", prompt: "What is 4 * 4?", prompt_th: "4 * 4 คืออะไร?", hint: "Math", hint_th: "คณิตศาสตร์", correctAnswers: ["16"] },
      {
        id: "q9", type: "coding", prompt: "Print the result of 15 divided by 3.", prompt_th: "พิมพ์ผลลัพธ์ของ 15 หารด้วย 3", hint: "Use /", hint_th: "ใช้ /",
        expectedOutput: "5.0\n", rules: ["Must use math operators"], 
        tests: [{ assertStdout: "5.0\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Print the result of 2 plus 2 multiplied by 4.", prompt_th: "พิมพ์ผลลัพธ์ของ 2 บวก 2 คูณ 4", hint: "Should be 10", hint_th: "คำตอบควรจะเป็น 10",
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
      { id: "q1", type: "multiple-choice", prompt: "What function pauses the program to ask the user for text?", prompt_th: "ฟังก์ชันใดที่หยุดโปรแกรมชั่วคราวเพื่อขอข้อความจากผู้ใช้?", hint: "It takes input", hint_th: "มันรับข้อมูล (input)", options: ["ask()", "prompt()", "input()", "get()"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What data type does input() always return?", prompt_th: "ฟังก์ชัน input() จะคืนค่าชนิดข้อมูลใดเสมอ?", hint: "Even if they type a number, it's text", hint_th: "แม้จะพิมพ์ตัวเลข มันก็เป็นข้อความ", options: ["Integer", "String", "Float", "Boolean"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "Where do you put the prompt text for the user?", prompt_th: "คุณจะใส่ข้อความคำแนะนำสำหรับผู้ใช้ไว้ที่ไหน?", hint: "Inside", hint_th: "ข้างใน", options: ["Before input()", "Inside input('...')", "After input()", "You can't"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "How do you save the user's input?", prompt_th: "คุณจะบันทึกข้อมูลที่ผู้ใช้พิมพ์ได้อย่างไร?", hint: "Variables", hint_th: "ใช้ตัวแปร", options: ["x = input()", "input() = x", "save(input())", "store input()"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What is the function to get user input?", prompt_th: "ฟังก์ชันในการรับข้อมูลจากผู้ใช้คืออะไร?", hint: "Include parentheses", hint_th: "รวมวงเล็บด้วย", correctAnswers: ["input()", "input"] },
      { id: "q6", type: "typed-answer", prompt: "Does input() return a String or Integer?", prompt_th: "input() คืนค่าเป็น String หรือ Integer?", hint: "String", hint_th: "String", correctAnswers: ["string"] },
      { id: "q7", type: "typed-answer", prompt: "If user types 5, what is input() + input()?", prompt_th: "ถ้าผู้ใช้พิมพ์ 5, input() + input() คืออะไร?", hint: "'5' + '5'", hint_th: "'5' + '5'", correctAnswers: ["55"] },
      { id: "q8", type: "typed-answer", prompt: "What character goes inside input to prompt?", prompt_th: "อักขระใดที่ต้องใส่ใน input เพื่อแสดงข้อความ?", hint: "Quotes", hint_th: "เครื่องหมายคำพูด", correctAnswers: ["quotes", "\"", "'"] },
      {
        id: "q9", type: "coding", prompt: "Use input() to ask for the user's age, and print it.", prompt_th: "ใช้ input() ถามอายุผู้ใช้ แล้วพิมพ์มันออกมา", hint: "age = input()", hint_th: "age = input()",
        expectedOutput: "25\n", rules: ["Use input()"], 
        tests: [{ input: "25", assertStdout: "25\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Ask for a name, then print 'Hi ' + name.", prompt_th: "ถามชื่อผู้ใช้ จากนั้นพิมพ์ 'Hi ' + name", hint: "Concatenate", hint_th: "ต่อสตริง",
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
      { id: "q1", type: "multiple-choice", prompt: "What are the two Boolean values?", prompt_th: "ค่า Boolean สองค่าคืออะไร?", hint: "Binary", hint_th: "เลขฐานสอง (Binary)", options: ["Yes and No", "True and False", "1 and 2", "On and Off"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "Which is correct capitalization in Python?", prompt_th: "การใช้ตัวพิมพ์ใหญ่/เล็กที่ถูกต้องใน Python คือข้อใด?", hint: "Title case", hint_th: "ขึ้นต้นด้วยตัวใหญ่", options: ["true", "TRUE", "True", "tRue"], correctIndex: 2 },
      { id: "q3", type: "multiple-choice", prompt: "What operator checks if two values are equal?", prompt_th: "ตัวดำเนินการใดตรวจสอบว่าสองค่าเท่ากันหรือไม่?", hint: "Double", hint_th: "แบบคู่", options: ["=", "==", "===", "=>"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What is 5 > 3?", prompt_th: "5 > 3 คืออะไร?", hint: "Math", hint_th: "คณิตศาสตร์", options: ["True", "False", "Error", "2"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the boolean for true.", prompt_th: "พิมพ์ค่า boolean สำหรับจริง (true)", hint: "Capitalize", hint_th: "ขึ้นต้นตัวใหญ่", correctAnswers: ["True"] },
      { id: "q6", type: "typed-answer", prompt: "Type the boolean for false.", prompt_th: "พิมพ์ค่า boolean สำหรับเท็จ (false)", hint: "Capitalize", hint_th: "ขึ้นต้นตัวใหญ่", correctAnswers: ["False"] },
      { id: "q7", type: "typed-answer", prompt: "What does 10 == 10 evaluate to?", prompt_th: "10 == 10 จะได้ผลประเมินเป็นอะไร?", hint: "Boolean", hint_th: "Boolean", correctAnswers: ["True"] },
      { id: "q8", type: "typed-answer", prompt: "What does 5 < 2 evaluate to?", prompt_th: "5 < 2 จะได้ผลประเมินเป็นอะไร?", hint: "Boolean", hint_th: "Boolean", correctAnswers: ["False"] },
      {
        id: "q9", type: "coding", prompt: "Print the boolean value of 100 > 1.", prompt_th: "พิมพ์ค่า boolean ของ 100 > 1", hint: "Just print the expression", hint_th: "เพียงแค่พิมพ์นิพจน์ (expression)",
        expectedOutput: "True\n", rules: [""], 
        tests: [{ assertStdout: "True\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Assign `active = False` and print it.", prompt_th: "กำหนด `active = False` แล้วพิมพ์มันออกมา", hint: "Variables can hold booleans", hint_th: "ตัวแปรสามารถเก็บค่า booleans ได้",
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
      { id: "q1", type: "multiple-choice", prompt: "What keyword starts a conditional statement?", prompt_th: "คำสำคัญใดที่เริ่มต้นคำสั่งเงื่อนไข?", hint: "if this...", hint_th: "ถ้าเป็นเช่นนี้...", options: ["when", "if", "check", "do"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What punctuation MUST follow an if condition?", prompt_th: "เครื่องหมายวรรคตอนใดที่ต้องตามหลังเงื่อนไข if เสมอ?", hint: "Two dots", hint_th: "จุดสองจุด", options: [";", ",", ".", ":"], correctIndex: 3 },
      { id: "q3", type: "multiple-choice", prompt: "How does Python know what code is inside the if block?", prompt_th: "Python จะรู้ได้อย่างไรว่าโค้ดใดอยู่ภายในบล็อก if?", hint: "Space matters", hint_th: "ช่องว่างมีผล", options: ["Brackets {}", "Indentation (spaces)", "Parentheses ()", "End keyword"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "What keyword is used for 'otherwise'?", prompt_th: "คำสำคัญใดที่ใช้สำหรับ 'มิฉะนั้น' (otherwise)?", hint: "else", hint_th: "else", options: ["otherwise", "then", "else", "except"], correctIndex: 2 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword that means 'else if'.", prompt_th: "พิมพ์คำสำคัญที่มีความหมายว่า 'else if'", hint: "elif", hint_th: "elif", correctAnswers: ["elif"] },
      { id: "q6", type: "typed-answer", prompt: "What symbol ends the if statement line?", prompt_th: "สัญลักษณ์ใดที่ใช้ปิดท้ายบรรทัดคำสั่ง if?", hint: "colon", hint_th: "โคลอน (colon)", correctAnswers: [":"] },
      { id: "q7", type: "typed-answer", prompt: "How many spaces is standard for indentation?", prompt_th: "จำนวนช่องว่างมาตรฐานที่ใช้สำหรับการย่อหน้าคือเท่าใด?", hint: "Number", hint_th: "ตัวเลข", correctAnswers: ["4", "four"] },
      { id: "q8", type: "typed-answer", prompt: "If condition is False, does the if-block run?", prompt_th: "หากเงื่อนไขเป็นเท็จ (False) บล็อกโค้ดใต้ if จะทำงานหรือไม่?", hint: "yes or no", hint_th: "yes หรือ no", correctAnswers: ["no"] },
      {
        id: "q9", type: "coding", prompt: "Write an if statement: if 5 == 5, print 'Yes'.", prompt_th: "เขียนคำสั่ง if: ถ้า 5 == 5, พิมพ์ 'Yes'", hint: "Indent the print", hint_th: "ย่อหน้าส่วนของการพิมพ์",
        expectedOutput: "Yes\n", rules: ["Must use if"], 
        tests: [{ assertStdout: "Yes\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Write if 3 > 5 print 'A', else print 'B'.", prompt_th: "เขียนถ้า 3 > 5 พิมพ์ 'A', มิฉะนั้น พิมพ์ 'B'", hint: "It will print B", hint_th: "มันจะพิมพ์ B",
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
      { id: "q1", type: "multiple-choice", prompt: "Which keyword creates a loop that runs a specific number of times?", prompt_th: "คำสำคัญใดที่สร้างลูปที่ทำงานตามจำนวนครั้งที่กำหนด?", hint: "for every item...", hint_th: "สำหรับทุกรายการ...", options: ["while", "loop", "for", "repeat"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "What function generates a sequence of numbers?", prompt_th: "ฟังก์ชันใดที่สร้างลำดับตัวเลข?", hint: "range", hint_th: "range", options: ["list()", "range()", "seq()", "numbers()"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What does range(3) generate?", prompt_th: "range(3) จะสร้างลำดับอะไรออกมา?", hint: "Starts at 0", hint_th: "เริ่มที่ 0", options: ["1, 2, 3", "0, 1, 2", "3, 3, 3", "0, 1, 2, 3"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "Like if statements, for loops require...", prompt_th: "เช่นเดียวกับคำสั่ง if, ลูป for ต้องมีอะไรบ้าง?", hint: "Spacing", hint_th: "การเว้นวรรค", options: ["Indentation", "Brackets", "Semicolons", "End tags"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "What is the keyword for loops?", prompt_th: "คำสำคัญสำหรับลูปคืออะไร?", hint: "f-o-r", hint_th: "f-o-r", correctAnswers: ["for"] },
      { id: "q6", type: "typed-answer", prompt: "What is the function to generate numbers?", prompt_th: "ฟังก์ชันสำหรับสร้างชุดตัวเลขคืออะไร?", hint: "r-a-n-g-e", hint_th: "r-a-n-g-e", correctAnswers: ["range", "range()"] },
      { id: "q7", type: "typed-answer", prompt: "What is the first number in range(5)?", prompt_th: "ตัวเลขแรกใน range(5) คืออะไร?", hint: "zero", hint_th: "ศูนย์", correctAnswers: ["0", "zero"] },
      { id: "q8", type: "typed-answer", prompt: "What is the keyword that loops while a condition is true?", prompt_th: "คำสำคัญใดที่ทำลูปขณะที่เงื่อนไขเป็นจริง?", hint: "while", hint_th: "while", correctAnswers: ["while"] },
      {
        id: "q9", type: "coding", prompt: "Write a for loop using range(3) that prints the loop variable 'i'.", prompt_th: "เขียนลูป for โดยใช้ range(3) และพิมพ์ตัวแปรลูป 'i'", hint: "for i in range(3):", hint_th: "for i in range(3):",
        expectedOutput: "0\n1\n2\n", rules: ["Must use for"], 
        tests: [{ assertStdout: "0\n1\n2\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Use a while loop to print 1, then 2. Set x=1, while x<3, print x, x=x+1.", prompt_th: "ใช้ลูป while พิมพ์ 1 แล้วตามด้วย 2 โดยตั้ง x=1 ขณะที่ x<3 ให้พิมพ์ x และ x=x+1", hint: "Don't cause an infinite loop!", hint_th: "อย่าสร้างลูปที่ไม่มีวันจบ!",
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
      { id: "q1", type: "multiple-choice", prompt: "What brackets are used to create a list?", prompt_th: "ใช้วงเล็บแบบใดในการสร้างลิสต์ (list)?", hint: "Square", hint_th: "แบบสี่เหลี่ยม (Square)", options: ["()", "{}", "[]", "<>"], correctIndex: 2 },
      { id: "q2", type: "multiple-choice", prompt: "How are items separated in a list?", prompt_th: "แต่ละรายการในลิสต์ถูกคั่นด้วยอะไร?", hint: "Comma", hint_th: "จุลภาค (Comma)", options: ["Spaces", "Commas", "Semicolons", "Dots"], correctIndex: 1 },
      { id: "q3", type: "multiple-choice", prompt: "What index is the FIRST item in a list?", prompt_th: "ดัชนี (index) ของรายการแรกในลิสต์คือหมายเลขใด?", hint: "Zero-indexed", hint_th: "ดัชนีเริ่มต้นที่ศูนย์", options: ["1", "0", "-1", "A"], correctIndex: 1 },
      { id: "q4", type: "multiple-choice", prompt: "How do you add an item to the end of a list?", prompt_th: "จะเพิ่มข้อมูลใหม่ไว้ที่ท้ายสุดของลิสต์ได้อย่างไร?", hint: "append", hint_th: "append", options: [".add()", ".push()", ".insert()", ".append()"], correctIndex: 3 },
      { id: "q5", type: "typed-answer", prompt: "Type the brackets used for lists.", prompt_th: "พิมพ์วงเล็บที่ใช้สำหรับสร้างลิสต์", hint: "Just the symbols", hint_th: "เฉพาะสัญลักษณ์", correctAnswers: ["[]"] },
      { id: "q6", type: "typed-answer", prompt: "What index gets the second item?", prompt_th: "ดัชนี (index) ใดที่จะเข้าถึงรายการที่สอง?", hint: "Number", hint_th: "ตัวเลข", correctAnswers: ["1", "one"] },
      { id: "q7", type: "typed-answer", prompt: "What method adds to a list?", prompt_th: "เมธอด (method) ใดที่ใช้เพิ่มข้อมูลในลิสต์?", hint: "append", hint_th: "append", correctAnswers: ["append", "append()"] },
      { id: "q8", type: "typed-answer", prompt: "Can lists hold mixed data types (strings and numbers)?", prompt_th: "ลิสต์สามารถเก็บข้อมูลต่างชนิดรวมกัน (ข้อความและตัวเลข) ได้หรือไม่?", hint: "yes or no", hint_th: "yes หรือ no", correctAnswers: ["yes"] },
      {
        id: "q9", type: "coding", prompt: "Create a list `a = [5, 10]` and print the second item.", prompt_th: "สร้างลิสต์ `a = [5, 10]` และพิมพ์ข้อมูลรายการที่สอง", hint: "Index 1", hint_th: "ดัชนี 1",
        expectedOutput: "10\n", rules: ["Must use list indexing"], 
        tests: [{ assertStdout: "10\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Create `x = [1]`. Append 2. Then print `x`.", prompt_th: "สร้าง `x = [1]` ทำการ Append เพิ่ม 2 จากนั้นพิมพ์ `x`", hint: "x.append(2)", hint_th: "x.append(2)",
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
      { id: "q1", type: "multiple-choice", prompt: "What keyword defines a function?", prompt_th: "คำสำคัญใดที่ใช้ประกาศฟังก์ชัน?", hint: "define", hint_th: "define", options: ["function", "def", "fun", "create"], correctIndex: 1 },
      { id: "q2", type: "multiple-choice", prompt: "What keyword sends a value back from a function?", prompt_th: "คำสำคัญใดที่ใช้ส่งค่ากลับจากฟังก์ชัน?", hint: "return", hint_th: "return", options: ["send", "output", "return", "give"], correctIndex: 2 },
      { id: "q3", type: "multiple-choice", prompt: "How do you call a function named `greet`?", prompt_th: "คุณจะเรียกใช้งานฟังก์ชันชื่อ `greet` อย่างไร?", hint: "Parentheses", hint_th: "วงเล็บ", options: ["greet", "call greet", "greet()", "run greet"], correctIndex: 2 },
      { id: "q4", type: "multiple-choice", prompt: "Variables inside () in a function definition are called...", prompt_th: "ตัวแปรที่อยู่ภายใน () ในการประกาศฟังก์ชันเรียกว่าอะไร?", hint: "Parameters", hint_th: "พารามิเตอร์", options: ["Arguments/Parameters", "Values", "Lists", "Returns"], correctIndex: 0 },
      { id: "q5", type: "typed-answer", prompt: "Type the keyword to define a function.", prompt_th: "พิมพ์คำสำคัญเพื่อประกาศฟังก์ชัน", hint: "Three letters", hint_th: "มี 3 ตัวอักษร", correctAnswers: ["def"] },
      { id: "q6", type: "typed-answer", prompt: "Type the keyword to pass back a value.", prompt_th: "พิมพ์คำสำคัญสำหรับส่งคืนค่ากลับ", hint: "r-e-t-u-r-n", hint_th: "r-e-t-u-r-n", correctAnswers: ["return"] },
      { id: "q7", type: "typed-answer", prompt: "Do functions require a colon after their definition?", prompt_th: "ฟังก์ชันต้องการเครื่องหมายโคลอนต่อท้ายหลังจากการประกาศหรือไม่?", hint: "yes or no", hint_th: "yes หรือ no", correctAnswers: ["yes"] },
      { id: "q8", type: "typed-answer", prompt: "If `def add(a):` what is `a` called?", prompt_th: "จาก `def add(a):` ตัว `a` เรียกว่าอะไร?", hint: "parameter", hint_th: "พารามิเตอร์", correctAnswers: ["parameter", "argument"] },
      {
        id: "q9", type: "coding", prompt: "Define `def say_hi(): print('Hi')`. Then call it.", prompt_th: "ประกาศ `def say_hi(): print('Hi')` จากนั้นเรียกใช้งาน", hint: "Don't forget to call it!", hint_th: "อย่าลืมเรียกใช้งาน!",
        expectedOutput: "Hi\n", rules: ["Must use def"], 
        tests: [{ assertStdout: "Hi\n" }]
      },
      {
        id: "q10", type: "coding", prompt: "Define `def add(x, y): return x+y`. Print `add(2, 3)`.", prompt_th: "ประกาศ `def add(x, y): return x+y` และพิมพ์ค่า `add(2, 3)`", hint: "It should print 5", hint_th: "ควรจะแสดงค่า 5",
        expectedOutput: "5\n", rules: ["Must use return"], 
        tests: [{ assertStdout: "5\n" }]
      }
    ]
  }
];
