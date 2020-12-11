import { romanNums, skillCurves } from './constants';
import { getFarmingLevelFromAPI } from './getAPI';

export function getFarmingInfo(current, total, gained) {
    global.hoeutils.farmingLevelProgress = calcSkillProgress(total, current);

    if (current == 0) getFarmingLevelFromAPI();
    else skillCurves.forEach((level, i) => {
            if (current == level - skillCurves[i - 1]) {
                global.hoeutils.farmingLevel = i;
            }
        })
    global.hoeutils.hourlyXpGain = calculateXpGain(gained);
    global.hoeutils.skillProgress = calcSkillProgress(total, current);
    global.hoeutils.expToNext = total < current ? current - total : null;

    let totalExp = 0;
    skillCurves.forEach((_, i) => {
        if (i <= global.hoeutils.farmingLevel) {
            totalExp += skillCurves[i];
        }
    })
    totalExp += total;
    global.hoeutils.totalExp = totalExp;

    global.hoeutils.etaToNext = global.hoeutils.expToNext ? decimalToTime(global.hoeutils.expToNext/global.hoeutils.hourlyXpGain) : null;
    
    global.hoeutils.debug.exp.level = global.hoeutils.farmingLevel;
    global.hoeutils.debug.exp.gained = global.hoeutils.gained;

    global.hoeutils.farmingLevelRoman = Object.keys(romanNums)[farmingLevel-1];

    global.hoeutils.progressToMax = calcSkillProgress(totalExp, skillCurves[(farmingLevel >= 50 ? 60 : 50)-1])
    global.hoeutils.expToMax = skillCurves[(farmingLevel >= 50 ? 60 : 50)-1] - totalExp;
    global.hoeutils.etaToMax = decimalToTime(global.hoeutils.expToMax/global.hoeutils/hourlyXpGain);
}
const calcSkillProgress = (xp, next) =>  Math.round(xp/next*10000)/100;

function calculateXpGain(gained) {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    if (heldItem.getString('id').match(/HOE_CANE/)) return gained*20*2*60*60;
    return gained*20*60*60;
}
function decimalToTime(dec) {
    let hours, minutes;
    hours = Math.floor(dec);
    minutes = Math.floor((dec-hours)*60)
    return `${hours}h${minutes}m`;
}