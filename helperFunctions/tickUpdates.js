import { colors } from './constants';
import { makeTimer } from '../helperFunctions/smallFunctions';
const settings = global.hoeutils.settings

const colorSettingsTemplate = {
    main: colors[settings.getSetting('Colors', 'Main')],
    numbers: colors[settings.getSetting('Colors', 'Numbers')],
    timer: colors[settings.getSetting('Colors', 'Timer')],
    potato: colors[settings.getSetting('Colors', 'Potato')],
    cane: colors[settings.getSetting('Colors', 'Sugar Cane')],
    carrot: colors[settings.getSetting('Colors', 'Carrot')],
    wheat: colors[settings.getSetting('Colors', 'Wheat')],
    wart: colors[settings.getSetting('Colors #2', 'Nether Wart')],
    pumpkin: colors[settings.getSetting('Colors #2', 'Pumpkin')],
    melon: colors[settings.getSetting('Colors #2', 'Melon')],
    cocoa: colors[settings.getSetting('Colors #2', 'Cocoa')],
    mushroom: colors[settings.getSetting('Colors #2', 'Mushrooms')],
    cactus: colors[settings.getSetting('Colors #2', 'Cactus')],
};
global.hoeutils.colorSettings = colorSettingsTemplate;
const userSettingsTemplate = {
    isCounterEnabled: settings.getSetting('Features', 'Counter'),
    isCropRateEnabled: settings.getSetting('Features', 'Crop Rate'),
    isMaxEfficiencyEnabled: settings.getSetting('Features', 'Hourly Drops'),
    isCollectionEnabled: settings.getSetting('Features', 'Collection'),
    isHoeLockEnabled: settings.getSetting('Features', 'Hoe Lock'),
    isEventReminderEnabled: settings.getSetting('Features', 'Event Reminder'),
    isEventTimerEnabled: settings.getSetting('Features', 'Event Timer'),
    isEventTimerEnabledEverywhere: settings.getSetting('Timer', 'Enable everywhere'),
    isImageEnabled: settings.getSetting('Tool Info', 'Enable images'),
    isEventImageEnabled: settings.getSetting('Timer', 'Enable image'),
    farmingInfo: {
        isLevelEnabled: settings.getSetting('Farming Info', 'Farming Level'),
        isExpPerHourEnabled: settings.getSetting('Farming Info', 'Exp per hour'),
        isTotalExpEnabled: settings.getSetting('Farming Info', 'Total Exp'),
        isProgressToNextEnabled: settings.getSetting('Farming Info', 'Progress to next level'),
        isExpLeftEnabled: settings.getSetting('Farming Info', 'Exp left to next level'),
        isETAToNextEnabled: settings.getSetting('Farming Info', 'Estimated time to next level'),
        isLevelCapEnabled: settings.getSetting('Farming Info', 'Level Cap'),
        isProgressToMaxEnabled: settings.getSetting('Farming Info', 'Progress to level cap'),
        isExpLeftToMaxEnabled: settings.getSetting('Farming Info', 'Exp left to level cap'),
        isETAToMaxEnabled: settings.getSetting('Farming Info', 'Estimated time to level cap'),
    }
};
global.hoeutils.userSettings = userSettingsTemplate;
export function updateColorSettings() {
    global.hoeutils.colorSettings = {
        main: colors[settings.getSetting('Colors', 'Main')],
        numbers: colors[settings.getSetting('Colors', 'Numbers')],
        timer: colors[settings.getSetting('Colors', 'Timer')],
        potato: colors[settings.getSetting('Colors', 'Potato')],
        cane: colors[settings.getSetting('Colors', 'Sugar Cane')],
        carrot: colors[settings.getSetting('Colors', 'Carrot')],
        wheat: colors[settings.getSetting('Colors', 'Wheat')],
        wart: colors[settings.getSetting('Colors #2', 'Nether Wart')],
        pumpkin: colors[settings.getSetting('Colors #2', 'Pumpkin')],
        melon: colors[settings.getSetting('Colors #2', 'Melon')],
        cocoa: colors[settings.getSetting('Colors #2', 'Cocoa')],
        mushroom: colors[settings.getSetting('Colors #2', 'Mushrooms')],
        cactus: colors[settings.getSetting('Colors #2', 'Cactus')],
    }
}
export function updateUserSettings() {
    global.hoeutils.userSettings = {
        isCounterEnabled: settings.getSetting('Features', 'Counter'),
        isCropRateEnabled: settings.getSetting('Features', 'Crop Rate'),
        isMaxEfficiencyEnabled: settings.getSetting('Features', 'Hourly Drops'),
        isCollectionEnabled: settings.getSetting('Features', 'Collection'),
        isHoeLockEnabled: settings.getSetting('Features', 'Hoe Lock'),
        isEventReminderEnabled: settings.getSetting('Features', 'Event Reminder'),
        isEventTimerEnabled: settings.getSetting('Features', 'Event Timer'),
        isEventTimerEnabledEverywhere: settings.getSetting('Timer', 'Enable everywhere'),
        isImageEnabled: settings.getSetting('Tool Info', 'Enable images'),
        isEventImageEnabled: settings.getSetting('Timer', 'Enable image'),
        farmingInfo: {
            isLevelEnabled: settings.getSetting('Farming Info', 'Farming Level'),
            isExpPerHourEnabled: settings.getSetting('Farming Info', 'Exp per hour'),
            isTotalExpEnabled: settings.getSetting('Farming Info', 'Total Exp'),
            isProgressToNextEnabled: settings.getSetting('Farming Info', 'Progress to next level'),
            isExpLeftEnabled: settings.getSetting('Farming Info', 'Exp left to next level'),
            isETAToNextEnabled: settings.getSetting('Farming Info', 'Estimated time to next level'),
            isLevelCapEnabled: settings.getSetting('Farming Info', 'Level Cap'),
            isProgressToMaxEnabled: settings.getSetting('Farming Info', 'Progress to level cap'),
            isExpLeftToMaxEnabled: settings.getSetting('Farming Info', 'Exp left to level cap'),
            isETAToMaxEnabled: settings.getSetting('Farming Info', 'Estimated time to level cap'),
        }
    }
}
export function updateScale() {
    global.hoeutils.scale = settings.getSetting('Tool Info', 'Scale &8in %') / 100
    global.hoeutils.timerScale = settings.getSetting('Timer', 'Scale &8in %') / 100
    global.hoeutils.farmingScale = settings.getSetting('Farming Info', 'Scale &8in %') / 100
}
export function countActiveModules() {
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    global.hoeutils.activeModuleCount = global.hoeutils.userSettings.isCropRateEnabled +
        (global.hoeutils.userSettings.isCounterEnabled && !heldItem.getString('id').match(/PUMPKIN|MELON|COCOA/)) +
        global.hoeutils.userSettings.isMaxEfficiencyEnabled +
        global.hoeutils.userSettings.isCollectionEnabled +
        (
            global.hoeutils.userSettings.isCropRateEnabled ||
            (global.hoeutils.userSettings.isCounterEnabled && !heldItem.getString('id').match(/PUMPKIN|MELON|COCOA/)) ||
            global.hoeutils.userSettings.isMaxEfficiencyEnabled ||
            global.hoeutils.userSettings.isCollectionEnabled
        )
}
export function updateImageData() {
    global.hoeutils.eventImageData = {
        scale: global.hoeutils.timerScale,
        yOffset: -4 * global.hoeutils.timerScale,
        size: 14 * global.hoeutils.timerScale,
    }
    const sampleTimestamp = 1606691700
    const timestamp = Math.floor(Date.now() / 1000)
    const secondsRemaining = 3600 + (sampleTimestamp - timestamp) % 3600
    const settingsNum = Number(settings.getSetting('Timer', 'Remind how long before the event starts? &8in seconds'))

    if (secondsRemaining == settingsNum && !global.hoeutils.wasEventReminderDisplayed) {
        global.hoeutils.wasEventReminderDisplayed = true;
        new Message(`&a[HoeUtilities] &e&nJacob\'s Farming Contest&r&e is starting in &c${settingsNum} seconds&e!`).chat();
        World.playSound('mob.villager.idle', 1000, 1);
        setTimeout(() => {
            global.hoeutils.wasEventReminderDisplayed = false;
        }, 1100);
    }
    if (!global.hoeutils.userSettings.isEventTimerEnabled) {
        global.hoeutils.timerDisplay.setShouldRender(false);
        return;
    }
    if (!Scoreboard.getTitle().replace(/§./g, '').equals('SKYBLOCK') && !global.hoeutils.userSettings.isEventTimerEnabledEverywhere) {
        global.hoeutils.timerDisplay.setShouldRender(false);
        return;
    }
    if (secondsRemaining >= 2400) global.hoeutils.timerDisplay.setLine(0, new DisplayLine(`&aNOW (${makeTimer(secondsRemaining-2400)})`).setShadow(true))
    else global.hoeutils.timerDisplay.setLine(0, new DisplayLine(`${global.hoeutils.colorSettings.timer}${makeTimer(secondsRemaining)}`).setShadow(true).setScale(global.hoeutils.timerScale))
    global.hoeutils.timerDisplay.setShouldRender(true)
}
