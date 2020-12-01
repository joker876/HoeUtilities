import { imageCane, imagePotato, imageCarrot, imageWheat, imageWart, imageEvent } from './constants';
export function standardImages() {
    if (!global.hoeutils.userSettings.isImageEnabled) return;
    if (global.hoeutils.imageData.type == 'cane') {
        imageCane.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y+global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
    } else if (global.hoeutils.imageData.type == 'potato') {
        imagePotato.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y+global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
    } else if (global.hoeutils.imageData.type == 'carrot') {
        imageCarrot.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y+global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
    } else if (global.hoeutils.imageData.type == 'wheat') {
        imageWheat.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size - 2, global.hoeutils.data.hud.y+global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
    } else if (global.hoeutils.imageData.type == 'wart') {
        imageWart.draw(global.hoeutils.data.hud.x - global.hoeutils.imageData.size, global.hoeutils.data.hud.y+global.hoeutils.imageData.yOffset, global.hoeutils.imageData.size, global.hoeutils.imageData.size)
    }
}
export function timerImage() {
    if (!global.hoeutils.userSettings.isEventTimerEnabled) return;
    if (!TabList.getNames().filter(name => ChatLib.removeFormatting(name).match(/Account Info/i))[0] && !global.hoeutils.userSettings.isEventTimerEnabledEverywhere) return;
    imageEvent.draw(global.hoeutils.data.timer.x - global.hoeutils.eventImageData.size - 4, global.hoeutils.data.timer.y + global.hoeutils.eventImageData.yOffset, global.hoeutils.eventImageData.size, global.hoeutils.eventImageData.size)
}