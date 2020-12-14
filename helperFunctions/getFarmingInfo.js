import { romanNums, skillCurves } from './constants';
import   getAPIInfo from './getAPI';

export default function getFarmingInfo(current, total, gained) {
    global.hoeutils.farmingLevelProgress = calcSkillProgress(total, current);

    let totalExp = 0;
    if (current == 0) getAPIInfo('farming');
    else skillCurves.forEach((level, i) => {
            if (current == level - skillCurves[i - 1]) {
                global.hoeutils.farmingLevel = i;
                totalExp = skillCurves[i];
            }
        })
    global.hoeutils.hourlyXpGain = calculateXpGain(gained);
    global.hoeutils.skillProgress = calcSkillProgress(total, current);
    global.hoeutils.expToNext = total < current ? Math.round(current*10 - total*10)/10 : null;

    totalExp += total;
    global.hoeutils.totalExp = totalExp;

    global.hoeutils.etaToNext = global.hoeutils.expToNext ? decimalToTime(global.hoeutils.expToNext/global.hoeutils.hourlyXpGain) : null;
    
    global.hoeutils.debug.exp.level = global.hoeutils.farmingLevel;
    global.hoeutils.debug.exp.gained = global.hoeutils.gained;

    global.hoeutils.farmingLevelRoman = Object.keys(romanNums)[global.hoeutils.farmingLevel-1];

    global.hoeutils.progressToMax = calcSkillProgress(totalExp, skillCurves[global.hoeutils.levelCap-1], 1000)
    global.hoeutils.expToMax = Math.round(skillCurves[global.hoeutils.levelCap-1]*10 - totalExp*10)/10;
    global.hoeutils.etaToMax = decimalToTime(global.hoeutils.expToMax/global.hoeutils.hourlyXpGain);
}
const calcSkillProgress = (xp, next, round = 100) =>  Math.round(xp/next*100*round)/round;

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