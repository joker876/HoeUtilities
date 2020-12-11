import { baseCropDrops } from './constants';
import { getCollections } from './getAPI';
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
    else if (type == 'total_exp') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Total Exp${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'progress') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Progress${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'exp_left') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}Exp Left${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
    }
    else if (type == 'eta') {
        return `${global.hoeutils.colorSettings[crop]}[${global.hoeutils.colorSettings.main}ETA${global.hoeutils.colorSettings[crop]}]&f: ${global.hoeutils.colorSettings.numbers}`;
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
    return addCommas(Math.round((cropRate/100 * baseCropDrops[crop]) * 20 * 60 * 60) - replenishModif)+'/h';
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
    if (!settings.maxEff && (global.hoeutils.userSettings.isMaxEfficiencyEnabled)) displayLines.push(new DisplayLine(makeLabel(crop, 'max_efficiency') + (global.hoeutils.farmingLevel ? getMaxEfficiencyYield(cropRate, crop, settings.replenishModif ?? 0) : '&cHarvest crops...')));
    if (!settings.collection && (global.hoeutils.userSettings.isCollectionEnabled)) displayLines.push(new DisplayLine(makeLabel(crop, 'collection') + addCommas(calculateCollection(crop, counter))));
    return displayLines;
}
export function produceFarmingLines(crop, settings = {}) {
    const displayLines = [];
    const userSettings = global.hoeutils.userSettings.farmingInfo;
    if (
        (!settings.level || !settings.progress || !settings.expPerHour || !settings.expLeft || !settings.etaToNext || !settings.totalExp) 
        && 
        (userSettings.isLevelEnabled || userSettings.isExpPerHourEnabled || userSettings.isTotalExpEnabled || userSettings.isExpLeftEnabled || userSettings.isETAToNextEnabled)
    ) 
        displayLines.push(`${global.hoeutils.colorSettings[crop]}&lCurrent Level Info`);
    if (!settings.level && userSettings.isLevelEnabled) 
        displayLines.push(` ${makeLabel(crop, 'level')}${global.hoeutils.farmingLevelRoman} (${global.hoeutils.farmingLevel})`)
    if (!settings.progress && userSettings.isExpPerHourEnabled) 
        displayLines.push(` ${makeLabel(crop, 'progress')}${getColorInRange(global.hoeutils.skillProgress)}${global.hoeutils.skillProgress}%`)
    if (!settings.expPerHour && userSettings.isExpPerHourEnabled) 
        displayLines.push(` ${makeLabel(crop, 'max_exp')}${addCommas(global.hoeutils.hourlyXpGain)}/h`)
    if (!settings.expLeft && userSettings.isExpLeftEnabled) 
        displayLines.push(` ${makeLabel(crop, 'exp_left')}${addCommas(global.hoeutils.expToNext)}`)
    if (!settings.etaToNext && userSettings.isETAToNextEnabled) 
        displayLines.push(` ${makeLabel(crop, 'eta')}${global.hoeutils.etaToNext}`)
    if (
        (!settings.expLeftToMax || !settings.etaToMax || !settings.progressToMax ) 
        && 
        (userSettings.isProgressToMaxEnabled || userSettings.isExpLeftToMaxEnabled || userSettings.isETAToMaxEnabled)
    ) 
        displayLines.push(`${global.hoeutils.colorSettings[crop]}&lMax Level Info`)
    if (!settings.progressToMax && userSettings.isProgressToMaxEnabled) 
        displayLines.push(` ${makeLabel(crop, 'progress')}${getColorInRange(global.hoeutils.progressToMax)}${global.hoeutils.progressToMax}%`)
    if (!settings.expLeftToMax && userSettings.isExpLeftToMaxEnabled) 
        displayLines.push(` ${makeLabel(crop, 'exp_left')}${addCommas(global.hoeutils.expToMax)}`)
    if (!settings.etaToMax && userSettings.isETAToMaxEnabled) 
        displayLines.push(` ${makeLabel(crop, 'eta')}${global.hoeutils.etaToMax}`)
}