const rarities = {
    COMMON: 5,
    UNCOMMON: 7,
    RARE: 9,
    EPIC: 13,
    LEGENDARY: 16,
    MYTHIC: 20,
}

const romanNums = {
    'I': 1,
    'II': 2,
    'III': 3,
    'IV': 4,
    'V': 5,
    'VI': 6,
    'VII': 7,
    'VIII': 8,
    'IX': 9,
    'X': 10,
}

const colors = {
    '&0Black': '&0',
    '&1Dark Blue': '&1',
    '&2Dark Green': '&2',
    '&3Dark Aqua': '&3',
    '&4Dark Red': '&4',
    '&5Dark Purple': '&5',
    '&6Gold': '&6',
    '&7Gray': '&7',
    '&8Dark Gray': '&8',
    '&9Blue': '&9',
    '&aGreen': '&a',
    '&bAqua': '&b',
    '&cRed': '&c',
    '&dLight Purple': '&d',
    '&eYellow': '&e',
    '&fWhite': '&f',
}

const baseCropDrops = {
    cane: 1*2,
    potato: 3,
    carrot: 3,
    wheat: 1,
    wart: 3,
    pumpkin: 1,
    melon: 4.64,
    cocoa: 2.5,
}

const dataFileStructure = {
    key: null,
    hud: { x: 20, y: 5 }, 
    timer: { x: Renderer.screen.getWidth() - 40, y: 5 },
    session: { x: Renderer.screen.getWidth() - 100, y: 5 }
}

const imageCane = new Image("hoeutils_sugar_cane","https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/58/Sugar_Cane_%28item%29_JE1_BE1.png")
const imagePotato = new Image('hoeutils_potato', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/ff/Potato_JE1_BE1.png')
const imageCarrot = new Image('hoeutils_carrot', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/4c/Carrot_JE2_BE1.png')
const imageWheat = new Image('hoeutils_wheat', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ef/Wheat_JE1_BE1.png')
const imageWart = new Image('hoeutils_wart', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c0/Nether_Wart_%28item%29_JE1.png')
const imageEvent = new Image('hoeutils_event', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ef/Wheat_JE1_BE1.png')

const collections = {
    last_updated: 0,
    cane: {API: 0, counter: 0},
    potato: {API: 0, counter: 0},
    carrot: {API: 0, counter: 0},
    wheat: {API: 0, counter: 0},
    wart: {API: 0, counter: 0},
    pumpkin: 0,
    melon: 0,
    cocoa: 0,
}

const skillCurves = [50, 175, 375, 675, 1175, 1925, 2925, 4425, 6425, 9925, 14925, 22425, 32425, 47425, 67425, 97425, 147425, 222425, 322425, 522425, 822425, 1222425, 1722425, 2322425, 3022425, 3822425, 4722425, 5722425, 6822425, 8022425, 9322425, 10722425, 12222425, 13822425, 15522425, 17322425, 19222425, 21222425, 23322425, 25522425, 27822425, 30222425, 32722425, 35322425, 38072425, 40972425, 44072425, 47472425, 51172425, 55172425, 59472425, 64072425, 68972452, 74172425, 79672425, 85472425, 91572425, 97972425, 104672425, 111672425];

export {rarities, romanNums, colors, baseCropDrops, dataFileStructure, imageCane, imagePotato, imageCarrot, imageWheat, imageWart, imageEvent, collections, skillCurves}