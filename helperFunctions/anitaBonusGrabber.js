global.hoeutils.anitaBonus = 0;
export default function anitaBonusGrabber(message) {
    message = ChatLib.removeFormatting(message);
    if (message.match(/You tiered up the Extra Farming Drops upgrade to \+([0-9]{1,2})%/)) {
        global.hoeutils.anitaBonus = message.match(/You tiered up the Extra Farming Drops upgrade to \+([0-9]{1,2})%/)[1];
    }
}