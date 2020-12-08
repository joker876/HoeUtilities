import { baseCropDrops } from './constants';
import { getCollections } from './getCollections';
import getCropRate from './getCropRate';

export function calculateCollection(crop, counter) {
    if (!global.hoeutils.data.key) return '&cEnter &fAPI key';
    if (global.hoeutils.isCollectionError) {
        global.hoeutils.isCollectionError--;
        if (global.hoeutils.isCollectionError == 0) getCollections();
        return '&cAPI limit reached &f(&e' + makeTimer(global.hoeutils.isCollectionError/20, 17, 2) + 's&f)';
    }
    if (!global.hoeutils.collections[crop].API) return '&cProcessing...';
    return global.hoeutils.collections[crop].API + counter - global.hoeutils.collections[crop].counter;
}
export function calculateXpGain(gained) {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    if (heldItem.getString('id').match(/HOE_CANE/)) {
        global.hoeutils.hourlyXpGain = gained*20*2*60*60;
        return;
    }
    global.hoeutils.hourlyXpGain = gained*20*60*60;
}
export const calcSkillProgress = (xp, next) =>  Math.round(xp/next*10000)/100;

export function getColorInRange(num) {
    if (num >= 90) return '&2';
    if (num >= 75) return '&a';
    if (num >= 50) return '&e';
    if (num >= 25) return '&6';
    if (num >= 10) return '&c';
    return '&4';
}
export function makeLabel(crop, type) {
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
export function addCommas(str) {
    str = String(str);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function getMaxEfficiencyYield(cropRate, crop, replenishModif = 0) {
    return addCommas(Math.floor((cropRate/100 * baseCropDrops[crop] - replenishModif) * 20 * 60 * 60 + 0.5))+'/h';
}
export function makeTimer(seconds, charsFromStart, amountOfChars) {
    return new Date(seconds * 1000).toISOString().substr(charsFromStart ?? 14, amountOfChars ?? 5);
}
export function produceAllLines(crop, settings = {}) {
    const counter = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes').getInteger('mined_crops');
    let cropRate = 0, displayLines = []
    if ((!settings.counter || !settings.cropRate) && (global.hoeutils.userSettings.isCropRateEnabled || global.hoeutils.userSettings.isMaxEfficiencyEnabled)) cropRate = getCropRate()
    if (!settings.counter && (global.hoeutils.userSettings.isCounterEnabled)) displayLines.push(new DisplayLine(makeLabel(crop, 'counter') + addCommas(counter)));
    if (!settings.cropRate && (global.hoeutils.userSettings.isCropRateEnabled)) displayLines.push(new DisplayLine(makeLabel(crop) + (global.hoeutils.farmingLevel ? cropRate + '%' : '&cHarvest crops...')));
    if (!settings.maxEff && (global.hoeutils.userSettings.isMaxEfficiencyEnabled)) displayLines.push(new DisplayLine(makeLabel(crop, 'max_efficiency') + (global.hoeutils.farmingLevel ? getMaxEfficiencyYield(cropRate, crop, 0) : '&cHarvest crops...')));
    if (!settings.hourlyGain && (global.hoeutils.userSettings.isHourlyXpGainEnabled)) displayLines.push(new DisplayLine(makeLabel(crop, 'max_exp') + (global.hoeutils.hourlyXpGain ? ('+' + addCommas(global.hoeutils.hourlyXpGain) + ' XP/h') : '&cHarvest crops...')));
    if (!settings.farmingLevel && (global.hoeutils.userSettings.isFarmingLevelEnabled)) displayLines.push(new DisplayLine(makeLabel(crop, 'level') + (global.hoeutils.farmingLevel ? ((global.hoeutils.farmingLevel ? (global.hoeutils.farmingLevel + ` &f(${getColorInRange(global.hoeutils.farmingLevelProgress)}${global.hoeutils.farmingLevelProgress}%&f)`) : '&cHarvest crops...')) : '&cHarvest crops...')));
    if (!settings.collection && (global.hoeutils.userSettings.isCollectionEnabled)) displayLines.push(new DisplayLine(makeLabel(crop, 'collection') + addCommas(calculateCollection(crop, counter))));
    return displayLines;
}