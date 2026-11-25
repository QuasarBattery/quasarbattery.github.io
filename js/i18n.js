/* Russian translation layer (not part of upstream).

   The pages and scripts stay in English, exactly as upstream ships them, so
   upstream updates merge without conflicts. This script swaps the visible
   English text for Russian at runtime: static markup as it is parsed, and
   text set later by the other scripts through a MutationObserver. Any string
   missing from the dictionary simply stays in English.

   Keys are the English text with whitespace collapsed. A key containing
   <1>…</1> markers translates a whole paragraph that has inline elements
   (links, bold): the number is the position of the child element, which is
   kept as is and only gets new text.

   The same mechanism renames the site to QuasarBattery in both languages
   (the EN table below holds only the brand strings). */
(function () {
  "use strict";

  var STORAGE_KEY = "obi-lang";
  var lang = "ru";
  try {
    if (localStorage.getItem(STORAGE_KEY) === "en") lang = "en";
  } catch (e) {
    /* storage unavailable: keep the default */
  }

  function addLanguageSwitch() {
    var themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.textContent = lang === "ru" ? "EN" : "RU";
    btn.title = lang === "ru" ? "English version" : "Русская версия";
    btn.setAttribute("aria-label", btn.title);
    btn.addEventListener("click", function () {
      try {
        localStorage.setItem(STORAGE_KEY, lang === "ru" ? "en" : "ru");
      } catch (e) {
        return;
      }
      location.reload();
    });
    themeToggle.parentNode.insertBefore(btn, themeToggle);
  }

  document.addEventListener("DOMContentLoaded", addLanguageSwitch);

  /* The "Get started" page (setup.html) is not published on this site (see
     pages-fork.yml). Hide the menu and hero links to it right away; links
     inside running text are turned into plain text at the end of this file. */
  var hideSetup = document.createElement("style");
  hideSetup.textContent =
    '.nav-links a[href$="setup.html"], .hero-actions a[href$="setup.html"] { display: none; }';
  document.head.appendChild(hideSetup);

  /* English mode: only the brand changes. */
  var EN = {
    "Open Battery <1>Information</1>": "Quasar<1>Battery</1>",
    "Open Battery Information": "QuasarBattery",
    "OBI-1 · Open Battery Information": "OBI-1 · QuasarBattery",
    "Download — Open Battery Information": "Download — QuasarBattery",
    "Get started · Open Battery Information": "Get started · QuasarBattery",
    "Flash firmware · Open Battery Information": "Flash firmware · QuasarBattery",
    "<1>Open Battery Information</1> — an open-source web port of the <2>open-battery-information</2> project.":
      "<1>QuasarBattery</1> — an open-source web port of the <2>open-battery-information</2> project, based on Open Battery Information.",
    "Open Battery Information lets you talk to the BMS inside locked or dead power-tool batteries.":
      "QuasarBattery lets you talk to the BMS inside locked or dead power-tool batteries.",
    "Why Open Battery Information?": "Why QuasarBattery?",
  };

  var RU = {
    "Open Battery <1>Information</1>": "Quasar<1>Battery</1>",
    "Open Battery Information": "QuasarBattery",
    "OBI-1 · Open Battery Information": "OBI-1 · QuasarBattery",
    /* ---- navigation, footer, shared ---- */
    "Home": "Главная",
    "Get started": "Начало работы",
    "Flash firmware": "Залить прошивку",
    "Download": "Скачать",
    "Open navigation menu": "Открыть меню навигации",
    "Close navigation menu": "Закрыть меню навигации",
    "View source on GitHub": "Исходный код на GitHub",
    "Switch to light mode": "Включить светлую тему",
    "Switch to dark mode": "Включить тёмную тему",
    "<1>Open Battery Information</1> — an open-source web port of the <2>open-battery-information</2> project.":
      "<1>QuasarBattery</1> — веб-версия проекта <2>open-battery-information</2> с открытым исходным кодом, основана на Open Battery Information.",
    "Released under the GPL-3.0 license.": "Распространяется по лицензии GPL-3.0.",
    "Latest release:": "Последний релиз:",
    "checking…": "проверка…",
    "All releases": "Все релизы",
    "Source code": "Исходный код",
    "Download — Open Battery Information": "Скачать — QuasarBattery",
    "Get started · Open Battery Information": "Начало работы · QuasarBattery",
    "Flash firmware · Open Battery Information": "Прошивка · QuasarBattery",

    /* ---- index.html ---- */
    "Diagnose and repair your battery packs from the browser":
      "Диагностика и ремонт аккумуляторов прямо в браузере",
    "Open Battery Information lets you talk to the BMS inside locked or dead power-tool batteries.":
      "QuasarBattery позволяет связаться с BMS заблокированных или переставших работать аккумуляторов электроинструмента.",
    "Diagnose a battery": "Диагностика аккумулятора",
    "Why Open Battery Information?": "Зачем нужен QuasarBattery?",
    "Manufacturers often lock the BMS when a fault is detected. When that protection triggers falsely or the fault is repairable, the pack can be saved instead of thrown away.":
      "При обнаружении неисправности BMS блокирует аккумулятор — так задумано производителем. Если защита сработала ложно или неисправность устранима, аккумулятор можно восстановить, а не выбрасывать.",
    "Unlock dead batteries": "Разблокировка аккумуляторов",
    "Read status, charge cycles, and error codes from battery packs whose BMS has locked them out.":
      "Чтение состояния, числа циклов заряда и кодов ошибок из аккумуляторов, заблокированных собственной BMS.",
    "Web Serial, no drivers": "Web Serial, без драйверов",
    "Talks to your Arduino over the Web Serial API. No drivers, no cables beyond USB, no installs.":
      "Связь с диагностическим устройством через Web Serial API. Никаких драйверов, никаких кабелей кроме USB, никакой установки.",
    "Private by design": "Приватность по умолчанию",
    "Everything runs locally in your browser tab. No accounts, no telemetry, no data leaves your machine.":
      "Всё работает локально во вкладке браузера. Без учётных записей, без телеметрии, данные не покидают ваш компьютер.",
    "How it works": "Как это работает",
    "Build a small interface, then read your pack in three steps.":
      "Соберите простой интерфейс и считайте аккумулятор за три шага.",
    "Set up the hardware": "Подготовьте оборудование",
    "Build the Arduino OBI interface and wire it to your battery, following the <1>wiring guide</1>.":
      "Соберите интерфейс Arduino OBI и подключите его к аккумулятору по <1>схеме подключения</1>.",
    "Connect the board": "Подключите диагностическое устройство",
    "Open OBI-1, pick your Arduino, and press Connect. The board resets and identifies itself automatically.":
      "Откройте OBI-1, выберите диагностическое устройство и нажмите «Подключить». Оно перезагрузится и определится автоматически.",
    "Read the battery": "Считайте данные аккумулятора",
    "Insert a battery, press Read battery, and see cell voltages, temperatures, charge cycles, and status at a glance.":
      "Вставьте аккумулятор, нажмите «Считать данные» — и увидите напряжения ячеек, температуры, число циклов заряда и состояние.",

    /* ---- obi.html + js/obi.js ---- */
    "Diagnose your LXT battery pack in three steps.": "Диагностика аккумулятора LXT за три шага.",
    "Connect": "Подключить",
    "Disconnect": "Отключить",
    "Connected": "Подключено",
    "Not connected": "Не подключено",
    "Read battery": "Считать данные",
    "Results": "Результаты",
    "Battery module": "Модуль аккумулятора",
    "Interface": "Интерфейс",
    "Reset board on connect": "Рестарт считывателя при подключении",
    "Connect the Arduino": "Подключите диагностическое устройство",
    "Plug the Arduino into USB (the OBI firmware must already be flashed), then click Connect.":
      "Подключите диагностическое устройство к USB (прошивка OBI уже должна быть залита) и нажмите «Подключить».",
    "Web Serial not supported": "Web Serial не поддерживается",
    "This browser can't access the serial port, so the browser version of OBI-1 can't connect to the Arduino. Use the <1>desktop app</1> instead — it has native serial access and needs no browser setup.":
      "Этот браузер не имеет доступа к последовательному порту, поэтому браузерная версия OBI-1 не может подключиться к Arduino. Используйте <1>настольное приложение</1> — у него собственный доступ к порту, и настройка браузера не нужна.",
    "Insert the battery": "Вставьте аккумулятор",
    "Place a battery in the holder so it makes contact with the interface pins.":
      "Установите аккумулятор в держатель так, чтобы он касался контактов интерфейса.",
    "Reads the model, cell voltages, temperatures, charge count and status in one go.":
      "Считывает модель, напряжения ячеек, температуры, циклы заряда и состояние за один раз.",
    "No results yet.": "Результатов пока нет.",
    "Read again": "Считать ещё раз",
    "Debug log": "Журнал отладки",
    "Reading…": "Чтение…",
    "Talking to the battery — this takes a few seconds…":
      "Обмен с аккумулятором — это займёт несколько секунд…",
    "Battery read successfully": "Аккумулятор успешно считан",
    "Battery read successfully. Open the Results step or press Read again to refresh.":
      "Аккумулятор успешно считан. Откройте шаг «Результаты» или нажмите «Считать ещё раз», чтобы обновить данные.",
    "Battery read — details below. Select rows and use Copy, or Read again to refresh.":
      "Аккумулятор считан — подробности ниже. Выделите строки и нажмите «Копировать» или «Считать ещё раз», чтобы обновить данные.",
    "Could not read the battery. Check it is seated correctly and connected, then try again.":
      "Не удалось считать аккумулятор. Проверьте, что он правильно установлен и подключён, и повторите попытку.",

    /* ---- js/interfaces/arduino_obi.js ---- */
    "Serial port": "Последовательный порт",
    "No port connected": "Порт не подключён",
    "serial device": "последовательное устройство",
    "Unsupported Browser": "Браузер не поддерживается",
    "Web Serial is not available in this browser. Use Chrome, Edge, Opera or Firefox 151+ on desktop over HTTPS (or localhost).":
      "Web Serial недоступен в этом браузере.\n\nИспользуйте Chrome, Edge, Opera или Firefox 151+ на компьютере по HTTPS (или на localhost).",
    "Connection Error": "Ошибка соединения",
    "Could not open the serial port:": "Не удалось открыть последовательный порт:",
    "Serial port is not open. Please connect to the Arduino first.":
      "Последовательный порт не открыт. Сначала подключите диагностическое устройство.",

    /* ---- js/modules/lxt.js ---- */
    "Function test": "Проверка функций",
    "LED test ON": "Включить тест светодиодов",
    "LED test OFF": "Выключить тест светодиодов",
    "Reset battery": "Сброс аккумулятора",
    "Clear errors": "Сбросить ошибки",
    "Reset battery message": "Сбросить сообщение аккумулятора",
    "Parameter": "Параметр",
    "Value": "Значение",
    "Copy": "Копировать",
    "Clear": "Очистить",
    "Model": "Модель",
    "Charge count*": "Циклы заряда*",
    "State": "Состояние",
    "Status code": "Код состояния",
    "Pack Voltage": "Общее напряжение",
    "Cell Voltage Difference": "Разбаланс ячеек",
    "Manufacturing date": "Дата производства",
    "Battery message": "Сообщение аккумулятора",
    "Capacity": "Ёмкость",
    "Battery type": "Код типа аккумулятора",
    "LOCKED": "ЗАБЛОКИРОВАН",
    "UNLOCKED": "НЕ ЗАБЛОКИРОВАН",
    "Error": "Ошибка",
    "No interface selected. Please select and connect an interface from the sidebar.":
      "Интерфейс не выбран. Выберите и подключите интерфейс.",
    "Limited": "Ограниченная поддержка",
    "This model only supports diagnostics": "Для этой модели доступна только диагностика (сброс ошибок не поддерживается)",
    "Could not communicate with the battery:": "Нет связи с аккумулятором:",
    "Data Error": "Ошибка данных",
    "Received an unexpected response while reading battery info:":
      "Получен неожиданный ответ при чтении сведений об аккумуляторе:",
    "Unsupported Battery": "Аккумулятор не поддерживается",
    "Lost communication while reading battery data:": "Потеряна связь при чтении данных аккумулятора:",
    "Received an unexpected response while reading battery data:":
      "Получен неожиданный ответ при чтении данных аккумулятора:",
    "LED test on — check the battery LEDs": "Тест светодиодов включён — проверьте индикаторы аккумулятора",
    "Lost communication while turning LEDs on:": "Потеряна связь при включении светодиодов:",
    "LED test off": "Тест светодиодов выключен",
    "Lost communication while turning LEDs off:": "Потеряна связь при выключении светодиодов:",
    "Battery errors cleared": "Команда сброса ошибок отправлена — считайте данные заново",
    "Lost communication while resetting errors:": "Потеряна связь при сбросе ошибок:",
    "Not Implemented": "Не реализовано",
    "This feature is currently under development.": "Эта функция находится в разработке.",
    "No Selection": "Ничего не выбрано",
    "No rows selected to copy!": "Нет выделенных строк для копирования!",
    "Rows copied to clipboard": "Строки скопированы в буфер обмена",
    "Could not access the clipboard.": "Нет доступа к буферу обмена.",

    /* ---- setup.html ---- */
    "Build the interface, wire it to a battery, and flash the firmware — then read your pack with OBI-1. Everything runs in your browser.":
      "Соберите интерфейс, подключите его к аккумулятору и залейте прошивку — затем считайте аккумулятор с помощью OBI-1. Всё работает в браузере.",
    "Jump to the wiring": "Перейти к схеме подключения",
    "Flash the firmware": "Залейте прошивку",
    "Read this before you start": "Прочтите перед началом",
    "This tool reads and, on supported packs, modifies battery BMS data. Batteries store a lot of energy — always follow the <1>wiring guide</1> below and work safely. Incorrect wiring or use can damage the battery or the Arduino.":
      "Этот инструмент читает, а на поддерживаемых аккумуляторах и изменяет данные BMS. Аккумуляторы запасают много энергии — всегда следуйте <1>схеме подключения</1> ниже и соблюдайте технику безопасности. Неправильное подключение или использование может повредить аккумулятор или Arduino.",
    "Use this software at your own risk. It is provided as open source (GPL-3.0) with no warranty. It is an independent project.":
      "Используйте это ПО на свой страх и риск. Оно распространяется как открытое (GPL-3.0) без каких-либо гарантий. Это независимый проект.",
    "What you need": "Что понадобится",
    "A handful of parts, no soldering required for a first test.":
      "Несколько деталей; для первой проверки паять не нужно.",
    "Chrome, Edge, Opera or Firefox on desktop": "Chrome, Edge, Opera или Firefox на компьютере",
    "Web Serial works in these browsers on desktop (Firefox 151+). Safari isn't supported.":
      "Web Serial работает в этих браузерах на компьютере (Firefox 151+). Safari не поддерживается.",
    "An Arduino Uno or ESP32-C3 with a USB cable": "Arduino Uno или ESP32-C3 с USB-кабелем",
    "A genuine or compatible Uno with the optiboot bootloader, or an ESP32-C3 SuperMini. The uploader flashes either automatically.":
      "Оригинальная или совместимая Uno с загрузчиком optiboot либо ESP32-C3 SuperMini. Страница прошивки автоматически прошьёт любую из них.",
    "A few jumper wires and resistors": "Несколько проводов-перемычек и резисторов",
    "The Arduino OBI interface is just a one-wire link with two pull-up resistors — see the schematic below.":
      "Интерфейс Arduino OBI — это просто однопроводная линия с двумя подтягивающими резисторами, см. схему ниже.",
    "A supported battery": "Поддерживаемый аккумулятор",
    "Currently the LXT 18 V packs (BL18xx / BL14xx) via the Arduino OBI interface.":
      "Сейчас это аккумуляторы LXT 18 В (BL18xx / BL14xx) через интерфейс Arduino OBI.",
    "The wiring": "Схема подключения",
    "The Arduino OBI interface bridges your board's serial port to the battery's one-wire data line.":
      "Интерфейс Arduino OBI связывает последовательный порт платы с однопроводной линией данных аккумулятора.",
    "Arduino OBI interface wiring diagram": "Схема подключения интерфейса Arduino OBI",
    "Click to enlarge": "Нажмите, чтобы увеличить",
    "Enlarged wiring diagram": "Увеличенная схема подключения",
    "The Arduino OBI interface, from the <1>upstream open-battery-information project</1>.":
      "Интерфейс Arduino OBI из <1>исходного проекта open-battery-information</1>.",
    "Signal": "Сигнал",
    "Pin": "Вывод",
    "Notes": "Примечания",
    "Data (one-wire)": "Данные (1-Wire)",
    "Pulled up to 5 V through the schematic's resistor.": "Подтянут к 5 В через резистор по схеме.",
    "Drives the battery's enable line when a command runs.":
      "Управляет линией Enable аккумулятора во время выполнения команды.",
    "Power": "Питание",
    "5 V / GND": "5 В / GND",
    "3.3 V / GND": "3,3 В / GND",
    "The interface is powered from the Uno's 5 V rail.": "Интерфейс питается от линии 5 В платы Uno.",
    "Pulled up to 3.3 V — never 5 V.": "Подтянут к 3,3 В — ни в коем случае не к 5 В.",
    "Drives the battery's enable line.": "Управляет линией Enable аккумулятора.",
    "The interface is powered from the ESP's 3.3 V rail.": "Интерфейс питается от линии 3,3 В платы ESP.",
    "On the battery side, connect the interface's <1>data</1> and <2>enable</2> wires to the corresponding pads of your pack's communication connector (typically labelled D1 and D2) and a common <3>GND</3>. Exact pad positions vary between packs — check the upstream documentation for your model.":
      "Со стороны аккумулятора подключите провода <1>данных</1> и <2>Enable</2> интерфейса к соответствующим контактам разъёма связи аккумулятора (обычно обозначены D1 и D2), а также общий <3>GND</3>. Точное расположение контактов зависит от модели — сверьтесь с документацией исходного проекта.",
    "Read this before you wire anything": "Прочтите, прежде чем что-либо подключать",
    "On an ESP32-C3 the pull-up resistors must be connected to the <1>3.3 V</1> pin — connecting them to 5 V will fry the GPIOs and destroy the module.":
      "На ESP32-C3 подтягивающие резисторы нужно подключать к выводу <1>3,3 В</1> — подключение к 5 В сожжёт GPIO и выведет модуль из строя.",
    "Batteries store a lot of energy. Work with one hand in your pocket, never short the terminals, and double-check every connection before powering anything up. Incorrect wiring can damage the battery or your board.":
      "Аккумуляторы запасают много энергии. Работайте аккуратно, никогда не замыкайте клеммы и перепроверяйте каждое соединение перед подачей питания. Неправильное подключение может повредить аккумулятор или плату.",
    "Use this software at your own risk. It is provided as open source (GPL-3.0) with no warranty.":
      "Используйте это ПО на свой страх и риск. Оно распространяется как открытое (GPL-3.0) без каких-либо гарантий.",
    "Next steps": "Дальнейшие шаги",
    "Once the interface is built and wired, you're minutes away from a diagnosis.":
      "Когда интерфейс собран и подключён, до диагностики остаются считаные минуты.",
    "Plug your board into USB and flash the Open Battery Information firmware straight from the browser — no Arduino IDE needed.":
      "Подключите плату к USB и залейте прошивку OBI прямо из браузера — Arduino IDE не нужна.",
    "Open the uploader →": "Открыть страницу прошивки →",
    "Open OBI-1, pick your board, and press Connect. It resets and identifies itself automatically.":
      "Откройте OBI-1, выберите свою плату Arduino или ESP32 и нажмите «Подключить». Она перезагрузится и определится автоматически.",
    "Open OBI-1 →": "Открыть OBI-1 →",

    /* ---- download.html ---- */
    "Get the desktop app for your <1>platform</1>": "Настольное приложение для вашей <1>платформы</1>",
    "The same OBI-1 experience as the browser version, wrapped in a self-contained app for Windows, macOS and Linux. No browser needed — serial access is built in. Nothing leaves your machine.":
      "Тот же OBI-1, что и в браузере, в виде самостоятельного приложения для Windows, macOS и Linux. Браузер не нужен — доступ к последовательному порту встроен. Данные не покидают ваш компьютер.",
    "Download now": "Скачать",
    "Try it in the browser": "Попробовать в браузере",
    "Checking for the latest release…": "Проверка последнего релиза…",
    "Latest release ready to download.": "Последний релиз готов к скачиванию.",
    "Downloads are published to GitHub Releases.": "Файлы публикуются в GitHub Releases.",
    "Pick your platform": "Выберите платформу",
    "Installers are built automatically from this repository for every release.":
      "Установщики собираются автоматически из этого репозитория для каждого релиза.",
    "NSIS installer for Windows 10 and 11. Works with the same Arduino and USB drivers as the web version.":
      "Установщик NSIS для Windows 10 и 11. Работает с той же Arduino и теми же USB-драйверами, что и веб-версия.",
    "Download for Windows": "Скачать для Windows",
    "64-bit ·": "64-бит ·",
    "Apple-silicon and Intel builds packaged as a DMG. Right-click → Open the first time to bypass Gatekeeper.":
      "Сборки для Apple Silicon и Intel в виде DMG. При первом запуске: правый клик → «Открыть», чтобы обойти Gatekeeper.",
    "Download for macOS": "Скачать для macOS",
    "AppImage for any distro plus a .deb for Debian/Ubuntu. Serial access is native, so no browser setup needed.":
      "AppImage для любого дистрибутива и .deb для Debian/Ubuntu. Доступ к порту собственный, настройка браузера не нужна.",
    "Download for Linux": "Скачать для Linux",
    "Why the desktop app?": "Зачем настольное приложение?",
    "Same hardware, same tool — with fewer steps to get going.":
      "То же оборудование, тот же инструмент — и меньше шагов до начала работы.",
    "No browser needed": "Браузер не нужен",
    "Serial access is built straight into the app, so there's nothing to install or configure first. Just run it and connect.":
      "Доступ к последовательному порту встроен в приложение, поэтому ничего не нужно устанавливать и настраивать заранее. Просто запустите и подключайтесь.",
    "Offline and private": "Офлайн и приватно",
    "The app bundles the OBI-1 page itself. It works without internet, and your battery data never leaves your machine.":
      "Страница OBI-1 встроена в приложение. Оно работает без интернета, а данные аккумулятора не покидают ваш компьютер.",
    "Always up to date": "Всегда актуально",
    "Downloads come from GitHub Releases. Every new tag builds fresh installers in CI, so you always grab the latest firmware.":
      "Файлы скачиваются из GitHub Releases. Каждый новый тег собирает свежие установщики в CI, так что вы всегда получаете последнюю версию.",
    "System requirements": "Системные требования",
    "An Arduino Uno with a USB cable": "Arduino Uno с USB-кабелем",
    "The desktop app talks to the board over a native serial connection, so the same genuine-or-compatible Uno with the optiboot bootloader is required.":
      "Настольное приложение общается с платой через собственное последовательное соединение, поэтому нужна та же оригинальная или совместимая Uno с загрузчиком optiboot.",
    "Currently the LXT 18 V packs (BL18xx / BL14xx) via the Arduino OBI interface, matching the web version.":
      "Сейчас это аккумуляторы LXT 18 В (BL18xx / BL14xx) через интерфейс Arduino OBI — как и в веб-версии.",
    "Open source": "Открытый исходный код",
    "Everything is GPL-3.0 licensed. Build it yourself from source any time — instructions are in the README.":
      "Всё распространяется по лицензии GPL-3.0. Вы можете в любой момент собрать приложение из исходников — инструкции есть в README.",
    "Note about macOS Gatekeeper": "О macOS Gatekeeper",
    'The macOS build is not notarized with Apple, so the first launch shows a "cannot verify developer" warning. Right-click the app and choose <1>Open</1>, then confirm. If you prefer, build it yourself from source with your own signing identity.':
      "Сборка для macOS не нотаризована в Apple, поэтому при первом запуске появится предупреждение «не удаётся проверить разработчика». Щёлкните приложение правой кнопкой, выберите <1>«Открыть»</1> и подтвердите. При желании соберите приложение из исходников со своей подписью.",
    "Frequently asked questions": "Частые вопросы",
    "About the desktop build.": "О настольной версии.",
    "Is the desktop app different from the browser version?":
      "Отличается ли настольное приложение от браузерной версии?",
    "Functionally it's the same code, packaged with Electron. The only real difference is that serial access is native — no browser or secure HTTPS page required — and the page ships bundled with the app.":
      "Функционально это тот же код, упакованный с помощью Electron. Единственное реальное отличие — собственный доступ к последовательному порту (не нужен ни браузер, ни защищённая HTTPS-страница), а сама страница поставляется внутри приложения.",
    "Why is there no installer for my architecture?": "Почему нет установщика для моей архитектуры?",
    "Installers are built in CI for the main targets: Windows x64, macOS (Intel and Apple Silicon) and Linux x64. If you need something else, open an issue or build from source — it takes one command.":
      "Установщики собираются в CI для основных платформ: Windows x64, macOS (Intel и Apple Silicon) и Linux x64. Если нужно что-то другое, создайте issue или соберите из исходников — это одна команда.",
    "Do I still need to flash the Arduino firmware?": "Нужно ли всё равно прошивать Arduino?",
    'Yes. The desktop app bundles the same <1>firmware uploader</1> as the web version — open the "Flash firmware" page inside the app, plug in the Uno and flash. The newest firmware ships with each release.':
      "Да. В настольное приложение встроена та же <1>страница прошивки</1>, что и в веб-версии: откройте страницу «Залить прошивку» в приложении, подключите Uno и прошейте. С каждым релизом поставляется самая свежая прошивка.",
    "How are the installers built?": "Как собираются установщики?",
    "Every tagged release triggers a GitHub Actions workflow that packages the app on Windows, macOS and Linux runners and attaches the installers to the release. Build logs are public.":
      "Каждый релиз с тегом запускает workflow GitHub Actions, который собирает приложение на Windows, macOS и Linux и прикрепляет установщики к релизу. Журналы сборки открыты.",

    /* ---- firmware/uploader.html + uploader.js ---- */
    "One click to put the Open Battery Information firmware on your Arduino — no IDE needed.":
      "Один клик — и прошивка OBI на вашей Arduino. IDE не нужна.",
    "Plug in": "Подключение",
    "Flash": "Прошивка",
    "Done": "Готово",
    "Your board": "Ваша плата",
    "ATmega328P · optiboot @ 115200/57600 baud": "ATmega328P · optiboot, 115200/57600 бод",
    "SuperMini · esptool @ 115200 baud": "SuperMini · esptool, 115200 бод",
    "Ready. Plug in your Arduino and press the button.": "Готово к работе. Подключите диагностическое устройство и нажмите кнопку.",
    "Continue to OBI-1 →": "Перейти к OBI-1 →",
    "Advanced": "Дополнительно",
    "Firmware image": "Образ прошивки",
    "Bundled firmware": "Встроенная прошивка",
    "Custom .hex file": "Свой .hex-файл",
    "Uses firmware/uno.hex from this site, built automatically from the ArduinoOBI source.":
      "Используется firmware/uno.hex с этого сайта, собранный автоматически из исходников ArduinoOBI.",
    "Uses firmware/uno.hex from this site, built automatically from the ArduinoOBI source. The same image works for the Uno and for the ATmega328P Nano — the uploader tries the current 115200 baud bootloader first, then the old 57600 baud one.":
      "Используется firmware/uno.hex с этого сайта, собранный автоматически из исходников ArduinoOBI. Один и тот же образ подходит для Uno и для Nano на ATmega328P — программа прошивки сначала пробует современный загрузчик на 115200 бод, затем старый на 57600 бод.",
    "Uses firmware/esp32.bin (merged bootloader + partitions + app) built from the ArduinoOBI source for the ESP32-C3.":
      "Используется firmware/esp32.bin (объединённые загрузчик + разделы + приложение), собранный из исходников ArduinoOBI для ESP32-C3.",
    "Log": "Журнал",
    "Works in <1>Chrome, Edge, Opera or Firefox</1> on desktop, over HTTPS or localhost. If something goes wrong, open <2>Advanced</2> for the full log.":
      "Работает в <1>Chrome, Edge, Opera и Firefox</1> на компьютере, по HTTPS или на localhost. Если что-то пошло не так, откройте раздел <2>«Дополнительно»</2> — там полный журнал.",
    "(missing — build with CI)": "(отсутствует — соберите через CI)",
    "Flash cancelled — no port selected.": "Прошивка отменена — порт не выбран.",
    "Web Serial isn't available in this browser. Use Chrome or Edge on desktop over HTTPS (or localhost).":
      "Web Serial недоступен в этом браузере. Используйте Chrome или Edge на компьютере по HTTPS (или на localhost).",
    "Web Serial is not available in this browser. Use Chrome or Edge on desktop over HTTPS (or localhost).":
      "Web Serial недоступен в этом браузере. Используйте Chrome или Edge на компьютере по HTTPS (или на localhost).",
    "Plug in your board, then click to choose its port…": "Подключите плату и выберите её порт…",
    "Loading the flashing engine…": "Загрузка модуля прошивки…",
    "Preparing the firmware image…": "Подготовка образа прошивки…",
    "Done! Your board is now running the OBI firmware.": "Готово! На плате теперь работает прошивка OBI.",
    "Connecting to the ESP32-C3 and entering download mode…":
      "Подключение к ESP32-C3 и вход в режим загрузки…",
    "Flashing your board — don't unplug it…": "Идёт прошивка — не отключайте плату…",
    "Restarting the board…": "Перезагрузка платы…",
    "Done! Your ESP32-C3 is now running the OBI firmware.": "Готово! На ESP32-C3 теперь работает прошивка OBI.",
    "Select a firmware file compiled for the selected board.":
      "Выберите файл прошивки, собранный для выбранной платы.",
    "No local firmware file selected.": "Файл прошивки не выбран.",
    "The firmware hex file is empty.": "Файл прошивки .hex пуст.",
  };

  var T = lang === "ru" ? RU : EN;

  /* Strings built at runtime from parts. $1…$9 are the captured groups,
     each of which is itself looked up in the dictionary. */
  var PATTERNS = [
    [/^Firmware version: (.*)$/, "Версия прошивки: $1"],
    [/^(.*) \(9600 baud\)$/, "$1 (9600 бод)"],
    [/^Connected to Arduino OBI \(firmware (.*)\)$/, "Подключено к Arduino OBI (прошивка $1)"],
    [/^(.*) Check that the port is not in use by another application\.$/,
      "$1\n\nПроверьте, что порт не занят другой программой."],
    [/^Failed to get a valid response after (\d+) attempts\. Ensure the Arduino is connected and a battery is inserted\.$/,
      "Не удалось получить корректный ответ за $1 попыток. Убедитесь, что диагностическое устройство подключено и аккумулятор вставлен."],
    [/^Battery is present but the model is not supported\. Last error: (.*)$/,
      "Аккумулятор обнаружен, но модель не поддерживается.\n\nПоследняя ошибка: $1"],
    [/^Cell (\d) Voltage$/, "Напряжение ячейки $1"],
    [/^Temperature Sensor (\d)$/, "Датчик температуры $1"],
    [/^(\d+\.\d)Ah$/, "$1 А·ч"],
    [/^Latest release: (.+)$/, "Последний релиз: $1"],
    [/^\((.+) bytes\)$/, "($1 байт)"],
    [/^Flash failed \(exit code (.+)\)\. Open Advanced for the log\.$/,
      "Ошибка прошивки (код выхода $1). Журнал — в разделе «Дополнительно»."],
    [/^Flash failed: (.+)$/, "Ошибка прошивки: $1"],
    [/^Flashing at (.+) baud \(attempt (\d+) of (\d+)\) — don't unplug it…$/,
      "Прошивка на скорости $1 бод (попытка $2 из $3) — не отключайте плату…"],
    [/^Flashing at (.+) baud — don't unplug it…$/, "Прошивка на скорости $1 бод — не отключайте плату…"],
    [/^Will flash (.+)$/, "Будет прошит файл $1"],
    [/^Could not fetch (\S+) \((\d+)\)\. Run the firmware\.yml GitHub Actions workflow to build it\.$/,
      "Не удалось загрузить $1 ($2). Запустите workflow firmware.yml в GitHub Actions, чтобы собрать прошивку."],
    [/^Could not fetch avrdude\.conf \((\d+)\)\.$/, "Не удалось загрузить avrdude.conf ($1)."],
  ];

  var ATTRS = ["title", "aria-label", "alt", "placeholder"];
  var SKIP = "#debug-text, #log-output, script, style, svg";
  var has = Object.prototype.hasOwnProperty;

  function norm(s) {
    return s.replace(/\s+/g, " ").trim();
  }

  /* Returns the Russian text, or null when there is no translation. */
  function tr(raw) {
    var n = norm(raw);
    if (!n) return null;
    if (has.call(T, n)) return T[n];

    /* "Some heading:\n\ndetails", as the error dialogs are built */
    var parts = /^([^\n]+:)\n\n([\s\S]+)$/.exec(raw.trim());
    if (parts && has.call(T, parts[1])) {
      return T[parts[1]] + "\n\n" + (tr(parts[2]) || parts[2]);
    }

    for (var i = 0; lang === "ru" && i < PATTERNS.length; i++) {
      var m = PATTERNS[i][0].exec(n);
      if (m) {
        return PATTERNS[i][1].replace(/\$(\d)/g, function (_, d) {
          return tr(m[d]) || m[d];
        });
      }
    }
    return null;
  }

  function skipped(el) {
    return !el || !el.closest || el.closest(SKIP) !== null;
  }

  function translateText(node) {
    if (!node.isConnected || skipped(node.parentElement)) return;
    var value = node.nodeValue;
    var r = tr(value);
    if (r === null) return;
    node.nodeValue = /^\s*/.exec(value)[0] + r + /\s*$/.exec(value)[0];
  }

  function translateAttr(el, name) {
    var value = el.getAttribute(name);
    if (!value) return;
    var r = tr(value);
    if (r !== null) el.setAttribute(name, r);
  }

  /* A paragraph with inline elements: translate it as a whole so the word
     order can change, reusing the existing child elements. */
  function translateMixed(el) {
    var kids = Array.prototype.slice.call(el.children);
    if (!kids.length || kids.length > 9) return false;
    var hasText = false;
    var key = "";
    for (var node = el.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === 3) {
        if (node.nodeValue.trim()) hasText = true;
        key += node.nodeValue;
      } else if (node.nodeType === 1) {
        if (node.childElementCount) return false;
        var idx = kids.indexOf(node) + 1;
        key += "<" + idx + ">" + node.textContent + "</" + idx + ">";
      }
    }
    key = norm(key);
    if (!hasText || !has.call(T, key)) return false;

    var out = document.createDocumentFragment();
    var re = /<(\d)>([\s\S]*?)<\/\1>/g;
    var value = T[key];
    var last = 0;
    var m;
    while ((m = re.exec(value))) {
      out.appendChild(document.createTextNode(value.slice(last, m.index)));
      var kid = kids[m[1] - 1];
      kid.textContent = m[2];
      out.appendChild(kid);
      last = re.lastIndex;
    }
    out.appendChild(document.createTextNode(value.slice(last)));
    el.textContent = "";
    el.appendChild(out);
    return true;
  }

  function translateElement(el) {
    if (!el.isConnected || skipped(el)) return;
    for (var i = 0; i < ATTRS.length; i++) translateAttr(el, ATTRS[i]);
    if (translateMixed(el)) return;
    for (var node = el.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === 3) translateText(node);
      else if (node.nodeType === 1) translateElement(node);
    }
  }

  if (lang === "ru") document.documentElement.lang = "ru";

  new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var rec = records[i];
      if (rec.type === "characterData") {
        translateText(rec.target);
      } else if (rec.type === "attributes") {
        if (!skipped(rec.target)) translateAttr(rec.target, rec.attributeName);
      } else {
        for (var j = 0; j < rec.addedNodes.length; j++) {
          var node = rec.addedNodes[j];
          if (node.nodeType === 3) translateText(node);
          else if (node.nodeType === 1) translateElement(node);
        }
      }
    }
  }).observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS,
  });

  /* Catch anything the observer saw only half-parsed. */
  document.addEventListener("DOMContentLoaded", function () {
    translateElement(document.documentElement);

    var links = document.querySelectorAll('a[href$="setup.html"]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].closest(".nav-links, .hero-actions")) continue;
      links[i].replaceWith(document.createTextNode(links[i].textContent));
    }
  });
})();
