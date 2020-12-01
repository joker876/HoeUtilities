const Desktop = Java.type("java.awt.Desktop");
const URI = Java.type("java.net.URI");
import { printFeatureList } from '../helperFunctions/featureListMessage';

export function commandHandler(...args) {
    if (!args[0]) return ChatLib.command('hoeutilities', true);
    if (args[0].toLowerCase() == 'gui') global.hoeutils.gui.open();
    else if (args[0].toLowerCase() == 'timergui') global.hoeutils.timerGui.open();
    else if (args[0].toLowerCase() == 'help') printFeatureList();
    else if (args[0].toLowerCase() == 'key') {
        if (!args[1]) return ChatLib.chat('&cNo key specified! &fUse &b/api new &fto get one.');
        if (!args[1].toLowerCase().match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)) return ChatLib.chat('&cInvalid API key!');
        let data = global.hoeutils.data;
        data = args[1].toLowerCase();
        ChatLib.chat('&a[HoeUtilities] &eyour API key has been set.');
    }
    else if (args[0].toLowerCase() == 'discord') {
        if(Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
            Desktop.getDesktop().browse(new URI('https://discord.gg/mrkuS7Rs'));
        }
    }
    else if (args[0].toLowerCase() == 'testsound') {
        World.playSound(args[1] || 'random.orb', args[2] || 1000, args[3] || 1);
    }
    else ChatLib.chat('&eInvalid argument "'+args[0]+'".')
}