const converterTranslations = {
    ru: {
        title: "Ramondrole",
        infoTab: "Информация",
        tempTab: "Температура",
        energyTab: "Энергия",
        massTab: "Масса",
        areaTab: "Площадь",
        powerTab: "Мощность",
        lengthTab: "Длина",
        volumeTab: "Объём",
        pressureTab: "Давление",
        timeTab: "Время",
        speedTab: "Скорость",
        infoTitle: "║ ИНФОРМАЦИЯ ║",
        tempTitle: "║ ТЕМПЕРАТУРА ║",
        energyTitle: "║ ЭНЕРГИЯ ║",
        massTitle: "║ МАССА ║",
        areaTitle: "║ ПЛОЩАДЬ ║",
        powerTitle: "║ МОЩНОСТЬ ║",
        lengthTitle: "║ ДЛИНА ║",
        volumeTitle: "║ ОБЪЁМ ║",
        pressureTitle: "║ ДАВЛЕНИЕ ║",
        timeTitle: "║ ВРЕМЯ ║",
        speedTitle: "║ СКОРОСТЬ ║",
        fromLabel: "Из:",
        toLabel: "В:",
        about: "Обо мне",
        games: "Наши игры",
        functions: "Полезные функции"
    },
    en: {
        title: "Ramondrole",
        infoTab: "Information",
        tempTab: "Temperature",
        energyTab: "Energy",
        massTab: "Mass",
        areaTab: "Area",
        powerTab: "Power",
        lengthTab: "Length",
        volumeTab: "Volume",
        pressureTab: "Pressure",
        timeTab: "Time",
        speedTab: "Speed",
        infoTitle: "║ INFORMATION ║",
        tempTitle: "║ TEMPERATURE ║",
        energyTitle: "║ ENERGY ║",
        massTitle: "║ MASS ║",
        areaTitle: "║ AREA ║",
        powerTitle: "║ POWER ║",
        lengthTitle: "║ LENGTH ║",
        volumeTitle: "║ VOLUME ║",
        pressureTitle: "║ PRESSURE ║",
        timeTitle: "║ TIME ║",
        speedTitle: "║ SPEED ║",
        fromLabel: "From:",
        toLabel: "To:",
        about: "About me",
        games: "Our games",
        functions: "Useful functions"
    },
    de: {
        title: "Ramondrole",
        infoTab: "Information",
        tempTab: "Temperatur",
        energyTab: "Energie",
        massTab: "Masse",
        areaTab: "Fläche",
        powerTab: "Leistung",
        lengthTab: "Länge",
        volumeTab: "Volumen",
        pressureTab: "Druck",
        timeTab: "Zeit",
        speedTab: "Geschwindigkeit",
        infoTitle: "║ INFORMATION ║",
        tempTitle: "║ TEMPERATUR ║",
        energyTitle: "║ ENERGIE ║",
        massTitle: "║ MASSE ║",
        areaTitle: "║ FLÄCHE ║",
        powerTitle: "║ LEISTUNG ║",
        lengthTitle: "║ LÄNGE ║",
        volumeTitle: "║ VOLUMEN ║",
        pressureTitle: "║ DRUCK ║",
        timeTitle: "║ ZEIT ║",
        speedTitle: "║ GESCHWINDIGKEIT ║",
        fromLabel: "Von:",
        toLabel: "Zu:",
        about: "Über mich",
        games: "Unsere Spiele",
        functions: "Nützliche Funktionen"
    }
};

let currentLang = localStorage.getItem('converter_language') || 'ru';

function t(key) {
    return converterTranslations[currentLang]?.[key] || converterTranslations.ru[key];
}

function updateConverterUILanguage() {
    const elements = ['title', 'infoTab', 'tempTab', 'energyTab', 'massTab', 'areaTab', 'powerTab', 'lengthTab', 'volumeTab', 'pressureTab', 'timeTab', 'speedTab', 'infoTitle', 'tempTitle', 'energyTitle', 'massTitle', 'areaTitle', 'powerTitle', 'lengthTitle', 'volumeTitle', 'pressureTitle', 'timeTitle', 'speedTitle', 'fromLabel', 'toLabel'];
    elements.forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) el.textContent = t(key);
    });
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        const flags = { ru: '🌐 RU', en: '🌐 EN', de: '🌐 DE' };
        langBtn.innerHTML = flags[currentLang];
    }
    
    document.querySelectorAll('.nav-links a').forEach((link, idx) => {
        const keys = ['about', 'games', 'functions'];
        if (idx < keys.length) link.textContent = t(keys[idx]);
    });
}

const buttons = document.querySelectorAll('.selector button');
const converters = document.querySelectorAll('.converter');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        converters.forEach(c => c.classList.remove('active'));
        const type = btn.dataset.type;
        document.getElementById(type).classList.add('active');
    });
});

function updateOutput(inputElem, fromSelect, toSelect, outputElem, convTable, isTemperature = false) {
    const val = parseFloat(inputElem.value) || 0;
    const from = fromSelect.value;
    const to = toSelect.value;
    let result;

    if (isTemperature) {
        let celsius;
        switch (from) {
            case 'c': celsius = val; break;
            case 'f': celsius = (val - 32) * 5/9; break;
            case 'k': celsius = val - 273.15; break;
            default: celsius = 0;
        }
        switch (to) {
            case 'c': result = celsius; break;
            case 'f': result = celsius * 9/5 + 32; break;
            case 'k': result = celsius + 273.15; break;
            default: result = 0;
        }
    } else {
        const baseValue = val * convTable[from];
        result = baseValue / convTable[to];
    }
    outputElem.value = parseFloat(result.toFixed(10)).toString();
}

const infoRates = { bit: 1/8, byte: 1, kb: 1024, mb: 1048576, gb: 1073741824, tb: 1099511627776 };
const infoInput = document.getElementById('infoInput');
const infoFrom = document.getElementById('infoFrom');
const infoTo = document.getElementById('infoTo');
const infoOutput = document.getElementById('infoOutput');
function updateInfo() { updateOutput(infoInput, infoFrom, infoTo, infoOutput, infoRates); }
infoInput.addEventListener('input', updateInfo);
infoFrom.addEventListener('change', updateInfo);
infoTo.addEventListener('change', updateInfo);
updateInfo();

const tempInput = document.getElementById('tempInput');
const tempFrom = document.getElementById('tempFrom');
const tempTo = document.getElementById('tempTo');
const tempOutput = document.getElementById('tempOutput');
function updateTemp() { updateOutput(tempInput, tempFrom, tempTo, tempOutput, null, true); }
tempInput.addEventListener('input', updateTemp);
tempFrom.addEventListener('change', updateTemp);
tempTo.addEventListener('change', updateTemp);
updateTemp();

const energyRates = { j: 1, cal: 4.184, wh: 3600, ev: 1.602176634e-19 };
const energyInput = document.getElementById('energyInput');
const energyFrom = document.getElementById('energyFrom');
const energyTo = document.getElementById('energyTo');
const energyOutput = document.getElementById('energyOutput');
function updateEnergy() { updateOutput(energyInput, energyFrom, energyTo, energyOutput, energyRates); }
energyInput.addEventListener('input', updateEnergy);
energyFrom.addEventListener('change', updateEnergy);
energyTo.addEventListener('change', updateEnergy);
updateEnergy();

const massRates = { kg: 1, g: 0.001, mg: 1e-6, t: 1000, lb: 0.45359237 };
const massInput = document.getElementById('massInput');
const massFrom = document.getElementById('massFrom');
const massTo = document.getElementById('massTo');
const massOutput = document.getElementById('massOutput');
function updateMass() { updateOutput(massInput, massFrom, massTo, massOutput, massRates); }
massInput.addEventListener('input', updateMass);
massFrom.addEventListener('change', updateMass);
massTo.addEventListener('change', updateMass);
updateMass();

const areaRates = { sqm: 1, sqkm: 1e6, ha: 10000, acre: 4046.8564224 };
const areaInput = document.getElementById('areaInput');
const areaFrom = document.getElementById('areaFrom');
const areaTo = document.getElementById('areaTo');
const areaOutput = document.getElementById('areaOutput');
function updateArea() { updateOutput(areaInput, areaFrom, areaTo, areaOutput, areaRates); }
areaInput.addEventListener('input', updateArea);
areaFrom.addEventListener('change', updateArea);
areaTo.addEventListener('change', updateArea);
updateArea();

const powerRates = { w: 1, kw: 1000, hp: 745.69987158227022 };
const powerInput = document.getElementById('powerInput');
const powerFrom = document.getElementById('powerFrom');
const powerTo = document.getElementById('powerTo');
const powerOutput = document.getElementById('powerOutput');
function updatePower() { updateOutput(powerInput, powerFrom, powerTo, powerOutput, powerRates); }
powerInput.addEventListener('input', updatePower);
powerFrom.addEventListener('change', updatePower);
powerTo.addEventListener('change', updatePower);
updatePower();

const lengthRates = { m: 1, km: 1000, cm: 0.01, mm: 0.001, mile: 1609.344, yard: 0.9144 };
const lengthInput = document.getElementById('lengthInput');
const lengthFrom = document.getElementById('lengthFrom');
const lengthTo = document.getElementById('lengthTo');
const lengthOutput = document.getElementById('lengthOutput');
function updateLength() { updateOutput(lengthInput, lengthFrom, lengthTo, lengthOutput, lengthRates); }
lengthInput.addEventListener('input', updateLength);
lengthFrom.addEventListener('change', updateLength);
lengthTo.addEventListener('change', updateLength);
updateLength();

const volumeRates = { l: 1, ml: 0.001, m3: 1000, gal: 3.785411784 };
const volumeInput = document.getElementById('volumeInput');
const volumeFrom = document.getElementById('volumeFrom');
const volumeTo = document.getElementById('volumeTo');
const volumeOutput = document.getElementById('volumeOutput');
function updateVolume() { updateOutput(volumeInput, volumeFrom, volumeTo, volumeOutput, volumeRates); }
volumeInput.addEventListener('input', updateVolume);
volumeFrom.addEventListener('change', updateVolume);
volumeTo.addEventListener('change', updateVolume);
updateVolume();

const pressureRates = { pa: 1, kpa: 1000, bar: 1e5, atm: 101325, mmhg: 133.32236842105263 };
const pressureInput = document.getElementById('pressureInput');
const pressureFrom = document.getElementById('pressureFrom');
const pressureTo = document.getElementById('pressureTo');
const pressureOutput = document.getElementById('pressureOutput');
function updatePressure() { updateOutput(pressureInput, pressureFrom, pressureTo, pressureOutput, pressureRates); }
pressureInput.addEventListener('input', updatePressure);
pressureFrom.addEventListener('change', updatePressure);
pressureTo.addEventListener('change', updatePressure);
updatePressure();

const timeRates = { s: 1, min: 60, h: 3600, d: 86400 };
const timeInput = document.getElementById('timeInput');
const timeFrom = document.getElementById('timeFrom');
const timeTo = document.getElementById('timeTo');
const timeOutput = document.getElementById('timeOutput');
function updateTime() { updateOutput(timeInput, timeFrom, timeTo, timeOutput, timeRates); }
timeInput.addEventListener('input', updateTime);
timeFrom.addEventListener('change', updateTime);
timeTo.addEventListener('change', updateTime);
updateTime();

const speedRates = { ms: 1, kmh: 0.2777777777777778, mph: 0.44704, knot: 0.5144444444444445 };
const speedInput = document.getElementById('speedInput');
const speedFrom = document.getElementById('speedFrom');
const speedTo = document.getElementById('speedTo');
const speedOutput = document.getElementById('speedOutput');
function updateSpeed() { updateOutput(speedInput, speedFrom, speedTo, speedOutput, speedRates); }
speedInput.addEventListener('input', updateSpeed);
speedFrom.addEventListener('change', updateSpeed);
speedTo.addEventListener('change', updateSpeed);
updateSpeed();

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('converter_language', lang);
    updateConverterUILanguage();
}

document.querySelectorAll('.lang-dropdown a').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        if (lang) changeLanguage(lang);
    });
});

updateConverterUILanguage();