
// ===== GLOBAL VARIABLES =====
let todos = [];
let todoIdCounter = 1;

// ===== UTILITY FUNCTIONS =====
function showResult(elementId, content, isError = false) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = content;
        element.style.display = 'block';
        element.style.background = isError ? 
            'linear-gradient(135deg, #e74c3c, #c0392b)' : 
            'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        // Auto-hide after 5 seconds for non-error messages
        if (!isError) {
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    }
}

function addFadeInAnimation(element) {
    element.classList.add('fade-in');
    setTimeout(() => {
        element.classList.remove('fade-in');
    }, 600);
}

// ===== VARIABLE SCOPING DEMONSTRATION =====
function demonstrateVariableScoping() {
    let results = [];
    
    // var example - function scoped
    function varExample() {
        if (true) {
            var x = 1;
        }
        return x; // x is accessible here
    }
    
    // let example - block scoped
    function letExample() {
        if (true) {
            let y = 2;
        }
        try {
            return y; // This will throw an error
        } catch (error) {
            return "ReferenceError: y is not defined (block scoped)";
        }
    }
    
    // const example
    function constExample() {
        const z = { name: "John" };
        z.name = "Jane"; // This is allowed
        try {
            z = {}; // This would throw an error
        } catch (error) {
            return `Object content changed to: ${z.name}, but reassignment not allowed`;
        }
    }
    
    results.push(`<strong>Variable Scoping Examples:</strong>`);
    results.push(`var (function scoped): ${varExample()}`);
    results.push(`let (block scoped): ${letExample()}`);
    results.push(`const (object mutation): ${constExample()}`);
    
    // Hoisting example
    results.push(`<br><strong>Hoisting Example:</strong>`);
    results.push(`var hoisted: ${typeof hoistedVar} (undefined)`);
    results.push(`let in TDZ: ReferenceError before declaration`);
    
    var hoistedVar = "I'm hoisted!";
    
    showResult('scoping-result', results.join('<br>'));
}

// ===== DATA TYPES DEMONSTRATION =====
function demonstrateDataTypes() {
    const examples = {
        number: 42,
        string: "Hello, World!",
        boolean: true,
        undefined: undefined,
        null: null,
        symbol: Symbol('unique'),
        bigint: 123n,
        object: { name: "John", age: 30 },
        array: [1, 2, 3, 4, 5],
        function: function() { return "I'm a function!"; }
    };
    
    let results = [`<strong>JavaScript Data Types:</strong>`];
    
    for (let [type, value] of Object.entries(examples)) {
        let typeOf = typeof value;
        let display = type === 'function' ? value() : 
                     type === 'object' && Array.isArray(value) ? `[${value.join(', ')}]` :
                     type === 'object' && value !== null ? JSON.stringify(value) :
                     type === 'symbol' ? value.toString() :
                     String(value);
                     
        results.push(`${type}: ${display} (typeof: ${typeOf})`);
        
        // Special checks
        if (type === 'array') {
            results.push(`  → Array.isArray(): ${Array.isArray(value)}`);
        }
        if (type === 'null') {
            results.push(`  → Note: typeof null is "object" (JS quirk)`);
        }
    }
    
    showResult('datatypes-result', results.join('<br>'));
}

// ===== OPERATORS DEMONSTRATION =====
function demonstrateOperators() {
    const a = 15, b = 4;
    let results = [`<strong>Operator Results (a=${a}, b=${b}):</strong>`];
    
    // Arithmetic operators
    results.push(`<u>Arithmetic:</u>`);
    results.push(`${a} + ${b} = ${a + b}`);
    results.push(`${a} - ${b} = ${a - b}`);
    results.push(`${a} × ${b} = ${a * b}`);
    results.push(`${a} ÷ ${b} = ${(a / b).toFixed(2)}`);
    results.push(`${a} % ${b} = ${a % b} (modulus)`);
    results.push(`${a} ** ${b} = ${a ** b} (exponentiation)`);
    
    // Comparison operators
    results.push(`<br><u>Comparison:</u>`);
    results.push(`${a} > ${b} = ${a > b}`);
    results.push(`${a} < ${b} = ${a < b}`);
    results.push(`${a} >= ${b} = ${a >= b}`);
    results.push(`${a} == "15" = ${"15" == a} (loose equality)`);
    results.push(`${a} === "15" = ${"15" === a} (strict equality)`);
    
    // Logical operators
    results.push(`<br><u>Logical:</u>`);
    results.push(`true && false = ${true && false}`);
    results.push(`true || false = ${true || false}`);
    results.push(`!true = ${!true}`);
    
    // ES2020 features
    results.push(`<br><u>Modern Operators (ES2020):</u>`);
    results.push(`null ?? "default" = ${null ?? "default"} (nullish coalescing)`);
    results.push(`undefined ?? "default" = ${undefined ?? "default"}`);
    
    showResult('operators-result', results.join('<br>'));
}

// ===== GRADE CHECKING FUNCTION =====
function checkGrade() {
    const scoreInput = document.getElementById('score-input');
    const score = parseInt(scoreInput.value);
    
    if (isNaN(score) || score < 0 || score > 100) {
        showResult('grade-result', 'Please enter a valid score between 0 and 100', true);
        return;
    }
    
    let grade, emoji, message;
    
    // Using multiple conditional approaches
    if (score >= 97) {
        grade = "A+"; emoji = "🌟"; message = "Outstanding!";
    } else if (score >= 93) {
        grade = "A"; emoji = "🎉"; message = "Excellent!";
    } else if (score >= 90) {
        grade = "A-"; emoji = "😊"; message = "Great job!";
    } else if (score >= 87) {
        grade = "B+"; emoji = "👍"; message = "Very good!";
    } else if (score >= 83) {
        grade = "B"; emoji = "😄"; message = "Good work!";
    } else if (score >= 80) {
        grade = "B-"; emoji = "🙂"; message = "Keep it up!";
    } else if (score >= 77) {
        grade = "C+"; emoji = "📚"; message = "Room for improvement";
    } else if (score >= 73) {
        grade = "C"; emoji = "📖"; message = "Needs more study";
    } else if (score >= 70) {
        grade = "C-"; emoji = "📝"; message = "Below average";
    } else if (score >= 60) {
        grade = "D"; emoji = "😰"; message = "Needs significant improvement";
    } else {
        grade = "F"; emoji = "💪"; message = "Don't give up - practice more!";
    }
    
    // Ternary operator example
    const status = score >= 60 ? "PASS" : "FAIL";
    
    const result = `
        <strong>${emoji} Grade: ${grade}</strong><br>
        Score: ${score}/100<br>
        Status: ${status}<br>
        ${message}
    `;
    
    showResult('grade-result', result);
    scoreInput.value = ''; // Clear input
}

// ===== LOOPS DEMONSTRATION =====
function demonstrateLoops() {
    let results = [];
    
    // For loop
    results.push('<strong>1. For Loop (0 to 4):</strong>');
    for (let i = 0; i < 5; i++) {
        results.push(`Iteration ${i}: ${i * i} squared`);
    }
    
    // While loop
    results.push('<br><strong>2. While Loop (countdown from 5):</strong>');
    let count = 5;
    while (count > 0) {
        results.push(`Count: ${count}`);
        count--;
    }
    
    // Do-while loop
    results.push('<br><strong>3. Do-While Loop (runs at least once):</strong>');
    let x = 0;
    do {
        results.push(`x = ${x}`);
        x++;
    } while (x < 3);
    
    // For...in loop (objects)
    results.push('<br><strong>4. For...in Loop (object properties):</strong>');
    const person = { name: "Alice", age: 28, city: "Boston" };
    for (let key in person) {
        results.push(`${key}: ${person[key]}`);
    }
    
    // For...of loop (arrays)
    results.push('<br><strong>5. For...of Loop (array values):</strong>');
    const colors = ["red", "green", "blue", "yellow"];
    for (let color of colors) {
        results.push(`Color: ${color}`);
    }
    
    // Array.forEach
    results.push('<br><strong>6. Array.forEach Method:</strong>');
    const numbers = [1, 2, 3, 4, 5];
    const forEachResults = [];
    numbers.forEach((num, index) => {
        forEachResults.push(`Index ${index}: ${num} × 2 = ${num * 2}`);
    });
    results.push(...forEachResults);
    
    showResult('loops-result', results.join('<br>'));
}

// ===== FUNCTION DEMONSTRATION =====
function greetUser() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim() || "Anonymous";
    
    // Different function types demonstration
    
    // 1. Regular function declaration
    function createGreeting(name) {
        return `Hello, ${name}! 👋`;
    }
    
    // 2. Function expression
    const addExcitement = function(message) {
        return message + " Welcome to our JavaScript revision!";
    };
    
    // 3. Arrow function
    const addEmoji = (text) => `${text} 🎉✨`;
    
    // 4. Higher-order function
    const processGreeting = (name, ...processors) => {
        let result = name;
        processors.forEach(processor => {
            result = processor(result);
        });
        return result;
    };
    
    // 5. IIFE (Immediately Invoked Function Expression)
    const timeStamp = (function() {
        return new Date().toLocaleTimeString();
    })();
    
    // Using all functions together
    const greeting = createGreeting(name);
    const excited = addExcitement(greeting);
    const final = addEmoji(excited);
    
    const result = `
        <strong>Function Demonstration:</strong><br>
        ${final}<br>
        <small>Generated at: ${timeStamp}</small><br><br>
        <strong>Function Types Used:</strong><br>
        1. Declaration: createGreeting()<br>
        2. Expression: addExcitement()<br>
        3. Arrow: addEmoji()<br>
        4. Higher-order: processGreeting()<br>
        5. IIFE: timeStamp generation
    `;
    
    showResult('function-result', result);
    nameInput.value = ''; // Clear input
}

// ===== ARRAY PROCESSING =====
function processArray() {
    const arrayInput = document.getElementById('array-input');
    const input = arrayInput.value.trim();
    
    if (!input) {
        showResult('array-result', 'Please enter some numbers separated by commas', true);
        return;
    }
    
    // Parse input into numbers array
    const numbers = input.split(',')
        .map(num => num.trim())
        .filter(num => num !== '')
        .map(num => parseFloat(num))
        .filter(num => !isNaN(num));
    
    if (numbers.length === 0) {
        showResult('array-result', 'Please enter valid numbers separated by commas', true);
        return;
    }
    
    // Array operations
    const doubled = numbers.map(x => x * 2);
    const evens = numbers.filter(x => x % 2 === 0);
    const odds = numbers.filter(x => x % 2 !== 0);
    const sum = numbers.reduce((total, num) => total + num, 0);
    const average = sum / numbers.length;
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    const sorted = [...numbers].sort((a, b) => a - b);
    const reversed = [...numbers].reverse();
    
    // Advanced operations
    const squared = numbers.map(x => x ** 2);
    const greaterThanAvg = numbers.filter(x => x > average);
    const firstGreaterThan10 = numbers.find(x => x > 10);
    const hasNegative = numbers.some(x => x < 0);
    const allPositive = numbers.every(x => x > 0);
    
    const results = [
        `<strong>Original Array:</strong> [${numbers.join(', ')}]`,
        `<strong>Basic Operations:</strong>`,
        `Doubled: [${doubled.join(', ')}]`,
        `Even numbers: [${evens.join(', ')}]`,
        `Odd numbers: [${odds.join(', ')}]`,
        `<strong>Statistics:</strong>`,
        `Sum: ${sum}`,
        `Average: ${average.toFixed(2)}`,
        `Maximum: ${max}`,
        `Minimum: ${min}`,
        `<strong>Transformations:</strong>`,
        `Sorted: [${sorted.join(', ')}]`,
        `Reversed: [${reversed.join(', ')}]`,
        `Squared: [${squared.join(', ')}]`,
        `<strong>Conditions:</strong>`,
        `Numbers > average (${average.toFixed(1)}): [${greaterThanAvg.join(', ')}]`,
        `First number > 10: ${firstGreaterThan10 || 'None'}`,
        `Has negative: ${hasNegative}`,
        `All positive: ${allPositive}`
    ];
    
    showResult('array-result', results.join('<br>'));
    arrayInput.value = ''; // Clear input
}

// ===== OBJECTS DEMONSTRATION =====
function demonstrateObjects() {
    // Creating objects with different methods
    const person1 = new Object();
    person1.name = "John";
    person1.age = 30;
    
    const person2 = {
        name: "Alice",
        age: 25,
        hobbies: ["reading", "coding", "traveling"],
        address: {
            city: "New York",
            country: "USA"
        },
        // ES6 method shorthand
        greet() {
            return `Hello, I'm ${this.name}`;
        },
        // Arrow function (doesn't bind 'this')
        getInfo: () => "This is an arrow function"
    };
    
    // ES6+ features
    const name = "Bob", age = 35;
    const person3 = {
        name, // Property shorthand
        age,
        city: "Boston",
        // Computed property names
        [`hobby_${1}`]: "swimming",
        [`hobby_${2}`]: "cycling"
    };
    
    // Object methods
    const keys = Object.keys(person2);
    const values = Object.values(person2);
    const entries = Object.entries(person2);
    
    // Destructuring
    const { name: personName, age: personAge, address: { city } } = person2;
    
    // Object spread (ES2018)
    const updatedPerson = { ...person2, age: 26, email: "alice@email.com" };
    
    // Object.assign
    const merged = Object.assign({}, person1, { city: "Chicago" });
    
    const results = [
        `<strong>Object Creation Methods:</strong>`,
        `new Object(): ${JSON.stringify(person1)}`,
        `Object literal: ${person2.name}, ${person2.age}`,
        `ES6 shorthand: ${JSON.stringify(person3)}`,
        `<br><strong>Object Methods:</strong>`,
        `Keys: [${keys.join(', ')}]`,
        `Method call: ${person2.greet()}`,
        `<br><strong>Object Analysis:</strong>`,
        `Properties count: ${Object.keys(person2).length}`,
        `Has property 'name': ${'name' in person2}`,
        `<br><strong>Destructuring:</strong>`,
        `Extracted - Name: ${personName}, Age: ${personAge}, City: ${city}`,
        `<br><strong>Object Spread:</strong>`,
        `Updated age to: ${updatedPerson.age}`,
        `Added email: ${updatedPerson.email}`,
        `<br><strong>Nested Access:</strong>`,
        `Address: ${person2.address.city}, ${person2.address.country}`,
        `First hobby: ${person2.hobbies[0]}`
    ];
    
    showResult('objects-result', results.join('<br>'));
}

// ===== DOM MANIPULATION FUNCTIONS =====
let demoState = {
    textChanged: false,
    colorChanged: false,
    sizeChanged: false,
    classAdded: false
};

function changeText() {
    const element = document.getElementById('demo-text');
    if (!demoState.textChanged) {
        element.textContent = 'Text has been changed using JavaScript! 🎉';
        demoState.textChanged = true;
    } else {
        element.textContent = 'Text changed again! DOM manipulation is powerful! ⚡';
    }
    addFadeInAnimation(element);
}

function changeColor() {
    const element = document.getElementById('demo-text');
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    element.style.color = randomColor;
    element.style.fontWeight = 'bold';
    demoState.colorChanged = true;
    addFadeInAnimation(element);
}

function changeSize() {
    const element = document.getElementById('demo-text');
    const sizes = ['18px', '24px', '28px', '32px'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    element.style.fontSize = randomSize;
    demoState.sizeChanged = true;
    addFadeInAnimation(element);
}

function addClass() {
    const element = document.getElementById('demo-text');
    element.classList.toggle('bounce');
    const hasClass = element.classList.contains('bounce');
    element.textContent = hasClass ? 'I am bouncing! 🎈' : 'Bounce animation removed! 📍';
    demoState.classAdded = hasClass;
}

function resetDemo() {
    const element = document.getElementById('demo-text');
    element.textContent = 'Click the buttons below to see DOM manipulation!';
    element.style.color = '';
    element.style.fontSize = '';
    element.style.fontWeight = '';
    element.classList.remove('bounce');
    
    // Reset state
    Object.keys(demoState).forEach(key => {
        demoState[key] = false;
    });
    
    addFadeInAnimation(element);
}

// ===== ERROR HANDLING DEMONSTRATION =====
function demonstrateErrorHandling() {
    const input1 = document.getElementById('error-input1');
    const input2 = document.getElementById('error-input2');
    
    const num1 = parseFloat(input1.value);
    const num2 = parseFloat(input2.value);
    
    let results = [`<strong>Error Handling Demo:</strong>`];
    
    try {
        // Custom function that throws errors
        function safeDivide(a, b) {
            if (isNaN(a) || isNaN(b)) {
                throw new TypeError('Both inputs must be valid numbers');
            }
            if (b === 0) {
                throw new Error('Division by zero is not allowed');
            }
            if (Math.abs(a) > 1000000) {
                throw new RangeError('Number is too large for this demo');
            }
            return a / b;
        }
        
        const result = safeDivide(num1, num2);
        results.push(`✅ Success: ${num1} ÷ ${num2} = ${result.toFixed(4)}`);
        results.push(`No errors occurred - operation completed successfully!`);
        
    } catch (error) {
        results.push(`❌ Error caught: ${error.name}`);
        results.push(`Message: ${error.message}`);
        
        // Handle different error types
        if (error instanceof TypeError) {
            results.push(`This is a Type Error - check your input types`);
        } else if (error instanceof RangeError) {
            results.push(`This is a Range Error - number out of acceptable range`);
        } else {
            results.push(`This is a general Error - ${error.constructor.name}`);
        }
        
    } finally {
        results.push(`<br><em>Finally block: This always executes regardless of errors</em>`);
        results.push(`Timestamp: ${new Date().toLocaleTimeString()}`);
    }
    
    showResult('error-result', results.join('<br>'));
    
    // Clear inputs
    input1.value = '';
    input2.value = '';
}

// ===== CALCULATOR FUNCTIONS =====
function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    
    if (isNaN(num1) || isNaN(num2)) {
        showCalculatorResult('Please enter valid numbers', true);
        return;
    }
    
    let result;
    let symbol;
    
    try {
        switch (operation) {
            case 'add':
                result = num1 + num2;
                symbol = '+';
                break;
            case 'subtract':
                result = num1 - num2;
                symbol = '-';
                break;
            case 'multiply':
                result = num1 * num2;
                symbol = '×';
                break;
            case 'divide':
                if (num2 === 0) {
                    throw new Error('Cannot divide by zero');
                }
                result = num1 / num2;
                symbol = '÷';
                break;
            case 'power':
                result = Math.pow(num1, num2);
                symbol = '^';
                break;
            case 'modulus':
                if (num2 === 0) {
                    throw new Error('Cannot find modulus with zero');
                }
                result = num1 % num2;
                symbol = '%';
                break;
            default:
                throw new Error('Invalid operation');
        }
        
        // Format result
        const formattedResult = typeof result === 'number' ? 
            (result % 1 === 0 ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '')) : 
            result;
        
        showCalculatorResult(`${num1} ${symbol} ${num2} = ${formattedResult}`);
        
    } catch (error) {
        showCalculatorResult(`Error: ${error.message}`, true);
    }
}

function showCalculatorResult(message, isError = false) {
    const element = document.getElementById('calculator-result');
    element.textContent = message;
    element.style.background = isError ? 
        'linear-gradient(135deg, #e74c3c, #c0392b)' : 
        'linear-gradient(135deg, #2ecc71, #27ae60)';
    addFadeInAnimation(element);
}

// ===== TODO LIST FUNCTIONS =====
function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (!text) {
        alert('Please enter a task!');
        return;
    }
    
    if (text.length > 100) {
        alert('Task is too long! Please keep it under 100 characters.');
        return;
    }
    
    const todo = {
        id: todoIdCounter++,
        text: text,
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
    updateTodoStats();
    
    // Add success feedback
    const successMsg = document.createElement('div');
    successMsg.textContent = '✅ Task added successfully!';
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<li style="text-align: center; color: #7f8c8d; font-style: italic; padding: 20px;">No tasks yet. Add one above! 📝</li>';
        return;
    }
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <div class="todo-actions">
                <button class="todo-btn complete-btn" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? '↶ Undo' : '✓ Done'}
                </button>
                <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">
                    🗑️ Delete
                </button>
            </div>
        `;
        todoList.appendChild(li);
        addFadeInAnimation(li);
    });
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        updateTodoStats();
    }
}

function deleteTodo(id) {
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex > -1) {
        const todo = todos[todoIndex];
        if (confirm(`Are you sure you want to delete "${todo.text}"?`)) {
            todos.splice(todoIndex, 1);
            renderTodos();
            updateTodoStats();
        }
    }
}

function clearAllTodos() {
    if (todos.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    
    if (confirm(`Are you sure you want to delete all ${todos.length} tasks?`)) {
        todos = [];
        renderTodos();
        updateTodoStats();
    }
}

function updateTodoStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    
    document.getElementById('total-tasks').textContent = `Total: ${total}`;
    document.getElementById('completed-tasks').textContent = `Completed: ${completed}`;
    document.getElementById('pending-tasks').textContent = `Pending: ${pending}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== FORM VALIDATION =====
function validateForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    let isValid = true;
    const errors = {};
    
    // Username validation
    if (username.length < 3) {
        errors.username = 'Username must be at least 3 characters long';
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Password validation
    if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
        isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        isValid = false;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
    }
    
    // Display errors
    ['username', 'email', 'password', 'confirm-password'].forEach(field => {
        const errorElement = document.getElementById(`${field === 'user-email' ? 'email' : field.replace('-', '-')}-error`);
        const inputElement = document.getElementById(field);
        
        if (errors[field === 'user-email' ? 'email' : field.replace('-', '')]) {
            errorElement.textContent = errors[field === 'user-email' ? 'email' : field.replace('-', '')];
            inputElement.style.borderColor = '#e74c3c';
        } else {
            errorElement.textContent = '';
            inputElement.style.borderColor = isValid ? '#2ecc71' : '#ddd';
        }
    });
    
    // Show result
    if (isValid) {
        showResult('validation-result', '✅ Form validation successful! All fields are valid. 🎉');
        // Reset form
        document.querySelector('.validation-form').reset();
        // Reset border colors
        ['username', 'user-email', 'password', 'confirm-password'].forEach(field => {
            document.getElementById(field).style.borderColor = '#ddd';
        });
    } else {
        showResult('validation-result', '❌ Please fix the errors above before submitting.', true);
    }
}

// ===== COLOR PICKER FUNCTIONS =====
function updateColor() {
    const colorInput = document.getElementById('color-input');
    const opacitySlider = document.getElementById('opacity-slider');
    const colorDisplay = document.getElementById('color-display');
    const colorText = document.getElementById('color-text');
    
    const hexColor = colorInput.value;
    const opacity = opacitySlider.value / 100;
    
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    
    // Update display
    colorDisplay.style.backgroundColor = rgbaColor;
    
    // Update text color for better contrast
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    colorText.style.color = brightness > 128 ? '#000' : '#fff';
    
    // Update color information
    document.getElementById('hex-value').textContent = hexColor.toUpperCase();
    document.getElementById('rgb-value').textContent = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('opacity-value').textContent = `${Math.round(opacity * 100)}%`;
}

// ===== PROMISES AND ASYNC/AWAIT DEMONSTRATIONS =====
function demonstratePromises() {
    showResult('promise-result', '⏳ Loading... Demonstrating Promises');
    
    // Simulate API call with Promise
    function fetchUserData() {
        return new Promise((resolve, reject) => {
            const delay = Math.random() * 2000 + 1000; // 1-3 seconds
            setTimeout(() => {
                const success = Math.random() > 0.2; // 80% success rate
                if (success) {
                    resolve({
                        id: Math.floor(Math.random() * 1000),
                        name: ['Alice', 'Bob', 'Charlie', 'Diana'][Math.floor(Math.random() * 4)],
                        email: 'user@example.com',
                        timestamp: new Date().toISOString()
                    });
                } else {
                    reject(new Error('Network error: Failed to fetch user data'));
                }
            }, delay);
        });
    }
    
    fetchUserData()
        .then(userData => {
            const result = `
                <strong>✅ Promise Resolved!</strong><br>
                User ID: ${userData.id}<br>
                Name: ${userData.name}<br>
                Email: ${userData.email}<br>
                Fetched at: ${new Date(userData.timestamp).toLocaleTimeString()}<br>
                <em>This data was fetched using Promise.then()</em>
            `;
            showResult('promise-result', result);
        })
        .catch(error => {
            const result = `
                <strong>❌ Promise Rejected!</strong><br>
                Error: ${error.message}<br>
                <em>This error was caught using Promise.catch()</em>
            `;
            showResult('promise-result', result, true);
        })
        .finally(() => {
            console.log('Promise demonstration completed');
        });
}

async function demonstrateAsyncAwait() {
    showResult('promise-result', '⏳ Loading... Demonstrating Async/Await');
    
    // Simulate multiple API calls
    async function fetchDataWithAsyncAwait() {
        try {
            // Multiple async operations
            const userPromise = new Promise(resolve => {
                setTimeout(() => resolve({ name: 'John Doe', id: 123 }), 1000);
            });
            
            const postsPromise = new Promise(resolve => {
                setTimeout(() => resolve([
                    { id: 1, title: 'First Post' },
                    { id: 2, title: 'Second Post' }
                ]), 1500);
            });
            
            const commentsPromise = new Promise(resolve => {
                setTimeout(() => resolve({ count: 42 }), 800);
            });
            
            // Wait for all promises (parallel execution)
            const [user, posts, comments] = await Promise.all([
                userPromise,
                postsPromise,
                commentsPromise
            ]);
            
            return { user, posts, comments };
            
        } catch (error) {
            throw new Error(`Async operation failed: ${error.message}`);
        }
    }
    
    try {
        const data = await fetchDataWithAsyncAwait();
        const result = `
            <strong>✅ Async/Await Success!</strong><br>
            User: ${data.user.name} (ID: ${data.user.id})<br>
            Posts: ${data.posts.length} posts found<br>
            Comments: ${data.comments.count} total comments<br>
            <strong>Posts:</strong><br>
            ${data.posts.map(post => `• ${post.title}`).join('<br>')}<br>
            <em>This data was fetched using async/await with Promise.all()</em>
        `;
        showResult('promise-result', result);
    } catch (error) {
        const result = `
            <strong>❌ Async/Await Error!</strong><br>
            Error: ${error.message}<br>
            <em>This error was caught using try/catch with async/await</em>
        `;
        showResult('promise-result', result, true);
    }
}

// ===== JSON DEMONSTRATION =====
function validateJSON() {
    const jsonInput = document.getElementById('json-input');
    const jsonString = jsonInput.value.trim();
    
    if (!jsonString) {
        showResult('json-result', 'Please enter some JSON to validate', true);
        return;
    }
    
    try {
        const parsed = JSON.parse(jsonString);
        const type = Array.isArray(parsed) ? 'Array' : typeof parsed;
        const keys = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed) : [];
        
        const result = `
            <strong>✅ Valid JSON!</strong><br>
            Type: ${type}<br>
            ${keys.length > 0 ? `Properties: ${keys.join(', ')}<br>` : ''}
            Parsed successfully: ${JSON.stringify(parsed).length} characters<br>
            <em>JSON.parse() executed without errors</em>
        `;
        showResult('json-result', result);
    } catch (error) {
        const result = `
            <strong>❌ Invalid JSON!</strong><br>
            Error: ${error.message}<br>
            <em>Check your syntax - common issues:</em><br>
            • Missing quotes around strings<br>
            • Trailing commas<br>
            • Single quotes instead of double quotes
        `;
        showResult('json-result', result, true);
    }
}

function formatJSON() {
    const jsonInput = document.getElementById('json-input');
    const jsonString = jsonInput.value.trim();
    
    if (!jsonString) {
        showResult('json-result', 'Please enter some JSON to format', true);
        return;
    }
    
    try {
        const parsed = JSON.parse(jsonString);
        const formatted = JSON.stringify(parsed, null, 2);
        jsonInput.value = formatted;
        
        showResult('json-result', '✅ JSON formatted successfully! Check the input area above.');
    } catch (error) {
        showResult('json-result', `❌ Cannot format invalid JSON: ${error.message}`, true);
    }
}

// ===== LOCAL STORAGE FUNCTIONS =====
function saveToStorage() {
    const keyInput = document.getElementById('storage-key');
    const valueInput = document.getElementById('storage-value');
    
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();
    
    if (!key || !value) {
        showResult('storage-result', 'Please enter both key and value', true);
        return;
    }
    
    try {
        // Try to parse as JSON, otherwise save as string
        let dataToStore = value;
        try {
            dataToStore = JSON.parse(value);
        } catch (e) {
            // Not JSON, keep as string
        }
        
        localStorage.setItem(key, typeof dataToStore === 'object' ? JSON.stringify(dataToStore) : dataToStore);
        
        showResult('storage-result', `✅ Saved "${key}" to localStorage successfully!`);
        keyInput.value = '';
        valueInput.value = '';
    } catch (error) {
        showResult('storage-result', `❌ Storage error: ${error.message}`, true);
    }
}

function loadFromStorage() {
    const keyInput = document.getElementById('storage-key');
    const key = keyInput.value.trim();
    
    if (!key) {
        showResult('storage-result', 'Please enter a key to load', true);
        return;
    }
    
    const value = localStorage.getItem(key);
    
    if (value === null) {
        showResult('storage-result', `❌ Key "${key}" not found in localStorage`, true);
    } else {
        let displayValue = value;
        try {
            const parsed = JSON.parse(value);
            displayValue = JSON.stringify(parsed, null, 2);
        } catch (e) {
            // Not JSON, display as string
        }
        
        const result = `
            <strong>✅ Found in localStorage:</strong><br>
            Key: ${key}<br>
            Value: <pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin: 10px 0;">${displayValue}</pre>
        `;
        showResult('storage-result', result);
    }
}

function clearStorage() {
    const confirmed = confirm('This will clear ALL localStorage data. Are you sure?');
    if (confirmed) {
        localStorage.clear();
        showResult('storage-result', '✅ All localStorage data cleared!');
    }
}

// ===== FORM SUBMISSION HANDLER =====
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    const result = `
        <strong>✅ Form Submitted Successfully!</strong><br>
        Name: ${data.name}<br>
        Email: ${data.email}<br>
        Country: ${data.country}<br>
        Message: ${data.message}<br>
        <em>Form data captured using FormData API</em>
    `;
    
    showResult('form-result', result);
    event.target.reset(); // Clear form
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize todo stats
    updateTodoStats();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to add todo
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const todoInput = document.getElementById('todo-input');
            if (document.activeElement === todoInput) {
                addTodo();
            }
        }
        
        // Enter key for calculator
        if (e.key === 'Enter' && ['num1', 'num2'].includes(document.activeElement?.id)) {
            calculate();
        }
    });
    
    // Initialize color picker
    updateColor();
    
    console.log('🚀 JavaScript Revision Guide loaded successfully!');
    console.log('💡 Tip: Open Developer Tools to see console messages and experiment with the code!');
});

// ===== BONUS: UTILITY FUNCTIONS FOR STUDENTS TO EXPLORE =====

// Debounce function (useful for search inputs)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function (useful for scroll events)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Random number generator with range
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Simple template engine
function template(str, data) {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || '');
}

console.log('🎓 Bonus utility functions loaded: debounce, throttle, randomBetween, formatNumber, template');
console.log('💻 Try them in the console: randomBetween(1, 100), formatNumber(1234567), etc.');