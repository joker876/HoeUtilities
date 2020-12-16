export const rarities = {
    COMMON: 5,
    UNCOMMON: 7,
    RARE: 9,
    EPIC: 13,
    LEGENDARY: 16,
    MYTHIC: 20,
}

export const romanNums = {
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
    'XI': 11,
    'XII': 12,
    'XIII': 13,
    'XIV': 14,
    'XV': 15,
    'XVI': 16,
    'XVII': 17,
    'XVIII': 18,
    'XIX': 19,
    'XX': 20,
    'XXI': 21,
    'XXII': 22,
    'XXIII': 23,
    'XXIV': 24,
    'XXV': 25,
    'XXVI': 26,
    'XXVII': 27,
    'XXVIII': 28,
    'XXIX': 29,
    'XXX': 30,
    'XXXI': 31,
    'XXXII': 32,
    'XXXIII': 33,
    'XXXIV': 34,
    'XXXV': 35,
    'XXXVI': 36,
    'XXXVII': 37,
    'XXXVIII': 38,
    'XXXIX': 39,
    'XL': 40,
    'XLI': 41,
    'XLII': 42,
    'XLIII': 43,
    'XLIV': 44,
    'XLV': 45,
    'XLVI': 46,
    'XLVII': 47,
    'XLVIII': 48,
    'XLIX': 49,
    'L': 50,
    'LI': 51,
    'LII': 52,
    'LIII': 53,
    'LIV': 54,
    'LV': 55,
    'LVI': 56,
    'LVII': 57,
    'LVIII': 58,
    'LIX': 59,
    'LX': 60,
}

export const colors = {
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

export const baseCropDrops = {
    cane: 1*2,
    potato: 3.5,
    carrot: 3.5,
    wheat: 1,
    wart: 3.5,
    pumpkin: 1,
    melon: 4.64,
    cocoa: 2.5,
}

export const dataFileStructure = {
    key: null,
    hud: { x: 20, y: 5 }, 
    timer: { x: Renderer.screen.getWidth() - 40, y: 5 },
    farming: { x: Renderer.screen.getWidth() - 175, y: 5 },
    session: { x: Renderer.screen.getWidth() - 100, y: 100 },
}

export const sessionFileStructure = {
    startingTotalExp: 0,
    seconds: 0,
}

export const imageCane = new Image("hoeutils_sugar_cane","https://static.wikia.nocookie.net/minecraft_gamepedia/images/5/58/Sugar_Cane_%28item%29_JE1_BE1.png");
export const imagePotato = new Image('hoeutils_potato', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/ff/Potato_JE1_BE1.png');
export const imageCarrot = new Image('hoeutils_carrot', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/4c/Carrot_JE2_BE1.png');
export const imageWheat = new Image('hoeutils_wheat', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ef/Wheat_JE1_BE1.png');
export const imageWart = new Image('hoeutils_wart', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c0/Nether_Wart_%28item%29_JE1.png');
export const imageEvent = new Image('hoeutils_event', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/ef/Wheat_JE1_BE1.png');
export const imagePumpkin = new Image('hoeutils_pumpkin', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b6/Carved_Pumpkin_%28S%29_JE4_BE2.png');
export const imageMelon = new Image('hoeutils_melon', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/0d/Melon_Slice_JE1_BE1.png');
export const imageCocoa = new Image('hoeutils_cocoa', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b3/Cocoa_Beans_JE2.png');
export const imageCactus = new Image('hoeutils_cactus', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/29/Cactus_JE2_BE1.png');
export const imageMushroom = new Image('hoeutils_mushroom', 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/bd/Red_Mushroom_%28texture%29_JE1_BE1.png');

export const collections = {
    last_updated: 0,
    cane: {API: 0, counter: 0},
    potato: {API: 0, counter: 0},
    carrot: {API: 0, counter: 0},
    wheat: {API: 0, counter: 0},
    wart: {API: 0, counter: 0},
    pumpkin: 0,
    melon: 0,
    cocoa: 0,
    mushroom: 0,
    cactus: 0,
}

export const skillCurves = [50, 175, 375, 675, 1175, 1925, 2925, 4425, 6425, 9925, 14925, 22425, 32425, 47425, 67425, 97425, 147425, 222425, 322425, 522425, 822425, 1222425, 1722425, 2322425, 3022425, 3822425, 4722425, 5722425, 6822425, 8022425, 9322425, 10722425, 12222425, 13822425, 15522425, 17322425, 19222425, 21222425, 23322425, 25522425, 27822425, 30222425, 32722425, 35322425, 38072425, 40972425, 44072425, 47472425, 51172425, 55172425, 59472425, 64072425, 68972452, 74172425, 79672425, 85472425, 91572425, 97972425, 104672425, 111672425];

export const prefix = '&l&2[&aHoeUtilities&2]&r';
export const title = `&c==========< ${prefix} &c>==========\n`;

export const helpMessages = {
    elephant: new Message(
        new TextComponent(title),
        new TextComponent('&eIf your Elephant Pet is not being detected, possible solutions may be:\n'),
        new TextComponent(' &9> &fMake sure your pets are visible (found in the bottom row of the '),
        new TextComponent('&nPets menu')
            .setHoverValue('&eClick to open!')
            .setClick("run_command", "/pets"),
        new TextComponent('&r)'),
        new TextComponent('\n &9> &fMake sure your language is set to English (found in the Hypixel Menu)'),
        new TextComponent('\n &9> &fIf you want &aHoeUtilities &fto be translated to your language, join my '),
        new TextComponent('&3&ndiscord server')
            .setHoverValue('&eClick to get link!')
            .setClick("run_command", "/hoeutils discord"),
        new TextComponent('\n &9> &fIf the above don\'t work you can also try some '),
        new TextComponent('&9&ncommon fixes')
            .setHoverValue('&eClick to show!')
            .setClick("run_command", "/hoeutils help common_fixes"),
        new TextComponent('\n&r&8any underlined words are clickable!'),
    ),
    harvest_crops: new Message(
        new TextComponent(title),
        new TextComponent('&eIf the GUI says "&cHarvest crops...&e", possible solutions may be:'),
        new TextComponent('\n &9> &fMake sure you harvested at least one crop'),
        new TextComponent('\n &9> &fMake sure you are not using any SBA feature that changes the way the skill display looks like. The only acceptable format is "&b+?.? (???/???)&f".'),
        new TextComponent('\n &9> &fIf you Farming level reached max level unlocked, use '),
        new TextComponent('&9&n/hoeutils setlevel')
            .setHoverValue('&eClick to run!')
            .setClick("suggest_command", "/hoeutils setlevel <farming level>"),
        new TextComponent(' &rcommand to set your farming level.'),
        new TextComponent('\n &9> &fMake sure your language is set to English (found in the Hypixel Menu)'),
        new TextComponent('\n &9> &fIf you want &aHoeUtilities &fto be translated to your language, join my '),
        new TextComponent('&3&ndiscord server')
            .setHoverValue('&eClick to get link!')
            .setClick("run_command", "/hoeutils discord"),
        new TextComponent('\n &9> &fIf the above don\'t work you can also try some '),
        new TextComponent('&9&ncommon fixes')
            .setHoverValue('&eClick to show!')
            .setClick("run_command", "/hoeutils help problems common_fixes"),
        new TextComponent('\n&r&8any underlined words are clickable!'),
    ),
    common_fixes: new Message(
        new TextComponent(title),
        new TextComponent('&eHere are some common fixes that may (or may not) fix your problem: '),
        new TextComponent('\n &9> &fUse '),
        new TextComponent('&9&n/ct load')
            .setHoverValue('&eClick to run!')
            .setClick("run_command", "/ct load"),
        new TextComponent(' &rto reload all modules.'),
        new TextComponent('\n &9> &fUse '),
        new TextComponent('&9&n/ct delete')
            .setHoverValue('&eClick to run!')
            .setClick("run_command", "/ct delete HoeUtilities"),
        new TextComponent(' &rand then '),
        new TextComponent('&9&n/ct import')
            .setHoverValue('&eClick to run!')
            .setClick("run_command", "/ct import HoeUtilities"),
        new TextComponent(' &rcommands to update (re-install) the module.'),
        new TextComponent('\n&fIf your issue is still not fixed, you may try some '),
        new TextComponent('&9&nfeature-specific solutions')
            .setHoverValue('&eClick to show!')
            .setClick("run_command", "/hoeutils help problems"),
        new TextComponent('&r.\ If those don\'t fix your issue, please report it on my '),
        new TextComponent('&3&ndiscord server')
            .setHoverValue('&eClick to get link!')
            .setClick("run_command", "/hoeutils discord"),
        new TextComponent('\n&r&8any underlined words are clickable!'),
    ),
    problems_default: new Message(
        new TextComponent(title),
        new TextComponent('&eThere are a few guides available: '),
        new TextComponent('\n &9> '),
        new TextComponent('&e&nCommon fixes')
            .setHoverValue('&eClick to show!')
            .setClick("run_command", "/hoeutils help problems common_fixes"),
        new TextComponent(' &r&efor any issue'),
        new TextComponent('\n &9> '),
        new TextComponent('&e&n"Harvest crops..." issue')
            .setHoverValue('&eClick to show!')
            .setClick("run_command", "/hoeutils help problems harvest_crops"),
        new TextComponent('\n &9> '),
        new TextComponent('&e&nElephant pet issues')
            .setHoverValue('&eClick to show!')
            .setClick("run_command", "/hoeutils help problems elephant"),
        new TextComponent('\n&r&8any underlined words are clickable!'),
    ),
    default: new Message(
        new TextComponent(title),
        new TextComponent('&eWhat kind help are you looking for?'),
        new TextComponent('\n &9> &fI don\'t know what a certain feature does.')
            .setHoverValue('&eClick to show!')
            .setClick("run_command", "/hoeutils help features"),
        new TextComponent('\n &9> &fSomething isn\'t working.')
            .setHoverValue('&eClick to show!')
            .setClick("run_command", "/hoeutils help problems"),
    )
}