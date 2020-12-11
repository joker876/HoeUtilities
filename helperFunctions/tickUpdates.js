import { colors } from './constants';
import { makeTimer } from '../helperFunctions/smallFunctions';
const settings = global.hoeutils.settings

global.hoeutils.colorSettings = {
    main: colors[settings.getSetting('Colors', 'Main')],
    numbers: colors[settings.getSetting('Colors', 'Numbers')],
    timer: colors[settings.getSetting('Colors', 'Timer')],
    potato: colors[settings.getSetting('Colors', 'Potato')],
    cane: colors[settings.getSetting('Colors', 'Sugar Cane')],
    carrot: colors[settings.getSetting('Colors', 'Carrot')],
    wart: colors[settings.getSetting('Colors', 'Nether Wart')],
    wheat: colors[settings.getSetting('Colors', 'Wheat')],
    /* pumpkin: colors[settings.getSetting('Colors', 'Pumpkin')],
    melon: colors[settings.getSetting('Colors', 'Melon')],
    cocoa: colors[settings.getSetting('Colors', 'Cocoa')], */
}
export function updateColorSettings() {
    global.hoeutils.colorSettings = {
        main: colors[settings.getSetting('Colors', 'Main')],
        numbers: colors[settings.getSetting('Colors', 'Numbers')],
        timer: colors[settings.getSetting('Colors', 'Timer')],
        potato: colors[settings.getSetting('Colors', 'Potato')],
        cane: colors[settings.getSetting('Colors', 'Sugar Cane')],
        carrot: colors[settings.getSetting('Colors', 'Carrot')],
        wart: colors[settings.getSetting('Colors', 'Nether Wart')],
        wheat: colors[settings.getSetting('Colors', 'Wheat')],
        /* pumpkin: colors[settings.getSetting('Colors', 'Pumpkin')],
        melon: colors[settings.getSetting('Colors', 'Melon')],
        cocoa: colors[settings.getSetting('Colors', 'Cocoa')], */
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
        isImageEnabled: settings.getSetting('Settings', 'Enable images'),
        isEventImageEnabled: settings.getSetting('Timer', 'Enable image'),
        farmingInfo: {
            isLevelEnabled: settings.getSetting('Farming Info', 'Farming Level'),
            isExpPerHourEnabled: settings.getSetting('Farming Info', 'Exp per hour'),
            isTotalExpEnabled: settings.getSetting('Farming Info', 'Total Exp'),
            isProgressToNextEnabled: settings.getSetting('Farming Info', 'Progress to next level'),
            isExpLeftEnabled: settings.getSetting('Farming Info', 'Exp left to next level'),
            isETAToNextEnabled: settings.getSetting('Farming Info', 'Estimated time to next level'),
            isProgressToMaxEnabled: settings.getSetting('Farming Info', 'Progress to level 50/60'),
            isExpLeftToMaxEnabled: settings.getSetting('Farming Info', 'Exp left to level 50/60'),
            isETAToMaxEnabled: settings.getSetting('Farming Info', 'Estimated time to level 50/60'),
            isImageEnabled: settings.getSetting('Farming Info', 'Enable Image'),
        }
    }
}
export function updateScale() {
    global.hoeutils.scale = settings.getSetting('Settings', 'Scale &8in %') / 100
}
export function updateImageData() {
    global.hoeutils.eventImageData = {
        size: 14 * global.hoeutils.scale,
        yOffset: -4 * global.hoeutils.scale
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
    if (secondsRemaining >= 2400) global.hoeutils.timerDisplay.setLine(0, new DisplayLine(`&aNOW`).setShadow(true))
    else global.hoeutils.timerDisplay.setLine(0, new DisplayLine(`${global.hoeutils.colorSettings.timer}${makeTimer(secondsRemaining)}`).setShadow(true))
    global.hoeutils.timerDisplay.setShouldRender(true)
}
