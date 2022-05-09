/* Переменные */
const arrKeySpecial = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'] // архив со спец символами
const ArrSearchEn = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']; // вспомогательный массив с кодами клавиш нужен и для подстветки и для передачи данных по клику мыши
const lettersEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '⏶', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '⏴', '⏷', '⏵']
const lettersRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '⏶', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '⏴', '⏷', '⏵']
const ArrPosSymbol = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 59]
const arrLang = ["RU", "EN"]; // языки для переключалки
const arrKeyButton = [29, 57]; // клавиши вызывающие действия при совем нажатии 
const arrKeyShift = ["42", "55", "29"]; // клавиши вызывающие действия при совем нажатии 
let isLangEn = true; // проверяем язык раскладки
let indexKeyPress = "" // Вспомогательная переменная для корректного снятия покраски клавиш
let startPos = ""; // вспомогательная переменная для хранения позиции курсора 
isLangEn = localStorage.getItem("lastlang"); // получаем последнее значение языка страницы

/* Добавляем div обертки */
let container = document.createElement("div");  
container.classList.add("container");
document.body.prepend(container);

/* Добавляем заголовок */
let hOne = document.createElement("h1");
hOne.textContent = "Виртуальная клавиатура"
container.append(hOne);

/* Добавляем текстовое поле ввода */
let textarea = document.createElement("textarea");
textarea.classList.add("keyInput");
textarea.setAttribute("autofocus", "");
textarea.setAttribute("name","virtualKey");
container.append(textarea);

/* Добавляем контейнер меню смены языка */
let lang = document.createElement("div");
let langRu = document.createElement("div");
let langEn = document.createElement("div");  
langRu.classList.add("lang__ru");
langEn.classList.add("lang__en", "lang_active");
lang.classList.add("lang");
langRu.textContent = arrLang[0]
langEn.textContent = arrLang[1]
container.append(lang);
lang.appendChild(langRu);
lang.appendChild(langEn);

/* Добавляем контейнер с инфорй о раскладке клавиатуры*/
let langSw = document.createElement("div");
langSw.classList.add("langSw");
langSw.textContent = "Alt + Shift";
lang.before(langSw);

/* Функция отрисовки клавиатуры */
function drawingKeys() {    
    /* Добавляем контейнер под клавиатуру */
    let keyboard = document.createElement("div");  
    keyboard.classList.add("keyboard");
    langSw.before(keyboard);
    /* Наполняем элементами контейнер под клавиатуру */
    let indexKey = 0; // вспомогательная переменная для присвоения data-атрибута
    let ArrKeyboard = []; //вспомогательный массив для формирования названия клавиш, в него добавляются массивы с названиями клавиш    
    if (isLangEn) { // формирование ru или en массива названия клавиш
        ArrKeyboard = ArrKeyboard.concat(lettersEn);        
    } else {
        ArrKeyboard = ArrKeyboard.concat(lettersRu); 
    }    
        for (let key of ArrKeyboard) {                
                let drawing = document.createElement("div");
                drawing.classList.add("keyboard__key");                
                drawing.textContent = key;                
                drawing.setAttribute("data-keyCode", `${indexKey}`)
                keyboard.append(drawing);
                indexKey++;
        }
    spSymbol() //рисуем спецСимолы    
}

/* Функция добавления спец символов в верхний ряд*/
function spSymbol() {
    const ArrDivKeyboard = [...document.querySelectorAll(".keyboard__key")] //получаем элементы для добавления к ним класса "спецСимволов"
    ArrDivKeyboard.splice(13) // тут ограничиваем массив первыми 13-тью
    let index = 0 // необходим для перебора массива со СпецСимволами
    let indexKey = 65 // добавляем "data-keyCode" к спец. символам после всех обычных, с 64го
    for (let key of ArrDivKeyboard) { // перебираем элементы
        let specialСharacters = document.createElement("div"); //создаем div, навешиваем класс и присваеваем СпецСимвол из массива
        specialСharacters.classList.add("specialСharacters");
        specialСharacters.textContent = arrKeySpecial[index];
        specialСharacters.setAttribute("data-keyCode", `${indexKey}`)
        key.appendChild(specialСharacters);
        index++;
        indexKey++;
    }        
}

/* Функция получения текущего языка при клике на плашку переключения*/
function getLanguage() {
    const langChange = document.querySelector(".lang")
    langChange.addEventListener("click", function(event) {
        if (event.target.classList[0] === "lang__ru") { //смотрим клик
            isLangEn = true;
            languageChange()
        } else {
            isLangEn = false;
            languageChange()
        }
    });
}

/* Функция отрисовки смены языка */
function languageChange() {
    
    if (isLangEn) { //смотрим флаг языка        
        isLangEn = false; //перекидываем флаг "языка"
        localStorage.setItem('lastlang', `${isLangEn}`);
        langEn.classList.remove("lang_active"); //перекидываем класс "activ"
        langRu.classList.add("lang_active");        
        const keyboardRemove = document.querySelector(".keyboard"); // удаляем текущее состояние клавиатуры
        if (keyboardRemove === null) {
            return drawingKeys();
        }
        keyboardRemove.remove(); // все еще удаляем
        drawingKeys(); // запускаем отрисовку заного        
    } else {        
        isLangEn = true;
        localStorage.setItem('lastlang', `${isLangEn}`);
        langEn.classList.add("lang_active");
        langRu.classList.remove("lang_active");        
        const keyboardRemove = document.querySelector(".keyboard");
        if (keyboardRemove === null) {
            return drawingKeys();
        }
        keyboardRemove.remove();
        drawingKeys();        
    }  
}

getLanguage() // вешает обработчик нажатий на плашку переключения языка
tytPreGetBool() // преобразуем в буллево значение то что получили из ЛокальногоХранилища
languageChange() // рисумем текущую раскладку клавиатуры в зависимости от значения языка сохранненного в ЛокальномХранилище
pressKeykeyboard() // вешает обработчик нажатий на клавиши с клавиатуры, передает номер клавиши в функцию которая отрисовывает нажатия
clickMaus() // вешает обработчик нажатий на клавиши мышкой и передает номер клавиши в функцию которая отрисовывает нажатия

/* Функция нажатия клавиши */
function draKeyDw(pressKey, event) {       
    if (Number(pressKey) === arrKeyButton[0]) { // отрабока нажатий на капс                 
        document.querySelector(`.keyboard__key[data-keyCode = "${pressKey}"]`).classList.toggle("keyboard__key_press");
        if (document.querySelector(`.keyboard__key[data-keyCode = "${pressKey}"]`).classList.contains("keyboard__key_press")) {            
            pressKey = "CapsLock_Sp";
            KyeShiftUp(pressKey)
        } else {
            pressKey = "CapsLock_Sp";
            KyeShiftDw(pressKey)
        }                    
    } else {
        if (Number(pressKey) >= 65) {
            pressKey = (pressKey - 65) // костыль для спец символов, я могу по другому но время поджимает
            document.querySelector(`.keyboard__key[data-keyCode = "${pressKey}"]`).classList.add("keyboard__key_press");
        }
        document.querySelector(`.keyboard__key[data-keyCode = "${pressKey}"]`).classList.add("keyboard__key_press");        
        switchingLang(event)        
    }        
}

/* Функция отжатия клавиши */
function draKeyUp(pressKey) {    
    if (Number(pressKey) !== Number(arrKeyButton[0])) {        
        if (Number(pressKey) >= 65) {
            pressKey = (pressKey - 65) // костыль для спец символов, я могу по другому но время поджимает
            document.querySelector(`.keyboard__key[data-keyCode = "${pressKey}"]`).classList.remove("keyboard__key_press");
        }  // отрабока отжатий на капс  и все остальные клавиши
        document.querySelector(`.keyboard__key[data-keyCode = "${pressKey}"]`).classList.remove("keyboard__key_press");
    }
}

/* Функция обработчик нажатой клавиши */
function pressKeykeyboard() {    
    let pressKey = "";
    document.addEventListener('keydown', function(event) {        
        pressKey = ArrSearchEn.indexOf(event.code)        
        draKeyDw(pressKey, event)        
        KyeShiftUp(event.key)        
    });
    document.addEventListener('keyup', function(event) {        
        pressKey = ArrSearchEn.indexOf(event.code)        
        draKeyUp(pressKey)
        KyeShiftDw(event.key) 
    }); 
}

/* Функция переключения языка по клавишам */
function switchingLang(event) {    
    if ( event.altKey && event.shiftKey ) {       
        languageChange()
    }    
}

/* Функция покраски кнопки при клике на нее мышкой */
function clickMaus() {    
    document.addEventListener('mousedown', function(event) {
        if (event.target.dataset.keycode === undefined) { // проверка на валидность передаваймого значения
            return 
        }        
        indexKeyPress = event.target.dataset.keycode; // присваеваем data атрибут ажатой клавиши        
        draKeyDw(event.target.dataset.keycode, event)
        KyeShiftUp(event.target.dataset.keycode)        
        textareaText(event.target.dataset.keycode)
    });    
    document.addEventListener('mouseup', function(event) {       
        if (event.target.dataset.keycode === undefined) { // проверка на валидность передаваймого значения            
            if (indexKeyPress === "") {                
            return
            } else {
                draKeyUp(indexKeyPress)
                return 
            }            
        }        
        draKeyUp(indexKeyPress) // передаем дата артибут ранее нажатой клавиши для корректного завершения отрисовки в любом случае а не только когда клик был над тойжей клавишей
        KyeShiftDw(indexKeyPress)
        textarea.focus()        
    });
}
/* Функция передачи текста при клике на букву мышкой в текстовое поле */
function textareaText(data) {    
    startPos = textarea.selectionStart; // получаем позицию курсора   
    let textString = textarea.value; // получаем текущее содержание текстерии
    let arrText = []; // вспомогательный массив для преобразования строки
    let currentKeyClick = document.querySelector(`.keyboard__key[data-keyCode = "${data}"]`).textContent;  // получаем символ клавиши нажатой  
    if (currentKeyClick.length === 2) { // костылик для спец символов...эххх
        currentKeyClick = currentKeyClick[0];
    }   
    if (data === "41") {        
        currentKeyClick = "\n";
    }
    if (data === "13") {
        let cursorPos = textarea.selectionEnd - 1        
        arrText = [...textString];        
        arrText.splice(cursorPos, 1)
        textString = arrText.join('');
        textarea.value = textString;        
        if (arrText[cursorPos]) {
            textarea.selectionEnd = cursorPos;
        } else {
            textarea.selectionEnd //= textarea.selectionEnd
        }        
        return       
    }
    if (data === "28") {
        arrText = [...textString];        
        let cursorPos = textarea.selectionStart
        if (cursorPos === undefined) {
            return
        } else {            
            arrText.splice(cursorPos, 1)            
            textString = arrText.join('');
            textarea.value = textString;        
            textarea.selectionEnd = cursorPos;
        return       
        }
    }
    if (currentKeyClick.length === 1) {       
        arrText = [...textString]; // преобразуем текущее содержимое текстового поля в массив
        arrText.splice(startPos, 0, currentKeyClick); // добавляем элемент кликнутый мышкой        
        textString = arrText.join(''); // опять все в строку        
        startPos = textarea.selectionStart + 1; //корректируем позицию курсора, что бы вставлял где указали и не в конце
        textarea.value = textString; // возвращаем строку в тектовое поле 
        textarea.selectionEnd = startPos; // возвращаем позицию курсора        
    }    
}

/* Функция перерисовки значений на клавишах при нажатой клавише Shift */
function KyeShiftUp(data) {    
    if (data === arrKeyShift[0] || data === arrKeyShift[1] || data === "Shift" || data === "CapsLock_Sp") {
        if (isLangEn) {        
            for (let elementKey of ArrPosSymbol) {
                let KeyKey = document.querySelector(`.keyboard__key[data-keyCode = "${elementKey}"]`)
                KeyKey.textContent = (lettersEn[elementKey]).toUpperCase()
            }
        } else {
            for (let elementKey of ArrPosSymbol) {
                let KeyKey = document.querySelector(`.keyboard__key[data-keyCode = "${elementKey}"]`)
                KeyKey.textContent = (lettersRu[elementKey]).toUpperCase()
            }
        }
        let arrCopyPosSymbo = ArrPosSymbol.slice() // копируем массив, мутации это плохо =)
        arrCopyPosSymbo.splice(12) //ограничиваем перебор первой полосой клавиатуры со спецсимволами
        for (let elementKey of arrCopyPosSymbo) {
            let KeyKey = document.querySelector(`.keyboard__key[data-keyCode = "${elementKey}"]`)
            KeyKey.textContent = (arrKeySpecial[elementKey])
        }
    }        
}

