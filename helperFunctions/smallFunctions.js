import { baseCropDrops, collections } from './constants';
import getCollections from './getCollections';

if (!global.hoeutils.collections) {
    global.hoeutils.collections = collections;
}

function calculateCollection(crop, counter) {
    if (!global.hoeutils.data.key) return '&cEnter &fAPI key';
    if (global.hoeutils.isCollectionError) {
        global.hoeutils.isCollectionError--;
        return '&cAPI limit reached &f(&e' + makeTimer(global.hoeutils.isCollectionError/20, 17, 2) + '&f)';
    }
    if (!global.hoeutils.collections[crop].API) return '&cProcessing...';
    return global.hoeutils.collections[crop].API + counter - global.hoeutils.collections[crop].counter;
}
function calculateXpGain(gained) {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    if (heldItem.getString('id').match(/HOE_CANE/)) {
        global.hoeutils.hourlyXpGain = gained*20*2*60*60;
        return;
    }
    global.hoeutils.hourlyXpGain = gained*20*60*60;
}
const calcSkillProgress = (xp, next) =>  Math.round(xp/next*10000)/100;

function getColorInRange(num) {
    if (num >= 90) return '&2';
    if (num >= 75) return '&a';
    if (num >= 50) return '&e';
    if (num >= 25) return '&6';
    if (num >= 10) return '&c';
    return '&4';
}
function makeLabel(crop, type) {
    if (type == 'counter') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Counter${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'max_efficiency') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Max Yield${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'level') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Farming Level${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'collection') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Collection${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'max_exp') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Max Exp${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Crop Rate${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
}
function addCommas(str) {
    str = String(str);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getMaxEfficiencyYield(cropRate, crop, replenishModif = 0) {
    return addCommas(Math.floor((cropRate/100 * baseCropDrops[crop] - replenishModif) * 20 * 60 * 60 + 0.5))+'/h';
}
function makeTimer(seconds, charsFromStart, amountOfChars) {
    return new Date(seconds * 1000).toISOString().substr(charsFromStart ?? 14, amountOfChars ?? 5);
}
export { calculateCollection, calculateXpGain, calcSkillProgress, getColorInRange, makeLabel, addCommas, getMaxEfficiencyYield, makeTimer }