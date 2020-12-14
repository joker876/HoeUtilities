const Desktop = Java.type("java.awt.Desktop");
const URI = Java.type("java.net.URI");
import { printFeatureList } from './featureListMessage';
import { helpMessages } from './constants';

/* export function commandHandler(...args) {
    if (!args || !args[0]) return ChatLib.command('hoeutilities', true);
    if (args[0].toLowerCase() == 'gui') global.hoeutils.gui.open();
    else if (args[0].toLowerCase() == 'help') printFeatureList();
    else if (args[0].toLowerCase() == 'key') {
        if (!args[1]) return ChatLib.chat('&cNo key specified! &fUse &b/api new &fto get one.');
        if (!args[1].toLowerCase().match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)) return ChatLib.chat('&cInvalid API key!');
        global.hoeutils.data.key = args[1].toLowerCase();
        ChatLib.chat('&a[HoeUtilities] &eyour API key has been set.');
    }
    else if (args[0].toLowerCase() == 'discord') {
        if(Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
            Desktop.getDesktop().browse(new URI('https://discord.gg/UmpNYNRmGE'));
        }
    }
    else if (args[0].toLowerCase() == 'testsound') {
        World.playSound(args[1] || 'random.orb', args[2] || 1000, args[3] || 1);
    }
    else if (args[0].toLowerCase() == 'debug') {
        FileLib.write('hoeutilities', './variableDumb.json', JSON.stringify(global.hoeutils[args[1]] ?? {state: 'undefined'}, null, 4));
        console.log(JSON.stringify(global.hoeutils[args[1]] ?? {state: 'undefined'}));
    }
    else if (args[0].toLowerCase() == 'help') {

    }
    else ChatLib.chat('&eInvalid argument "'+args[0]+'".')
} */
export function commandHandler(...args) {
    let [ cmd, ...cmdData ] = args;
    
    if (!cmd) return ChatLib.command('hoeutilities', true)
    cmd = cmd.toLowerCase();
    switch(cmd) {
        case 'gui': global.hoeutils.gui.open(); break;
        case 'key': {
            let [ key ] = cmdData;
            if (!key) return ChatLib.chat('&cNo key specified! &fUse &b/api new &fto get one.');
            if (!key.toLowerCase().match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/)) return ChatLib.chat('&cInvalid API key!');
            global.hoeutils.data.key = key.toLowerCase();
            ChatLib.chat('&a[HoeUtilities] &eyour API key has been set.');
            break;
        }
        case 'discord': {
            if(Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                Desktop.getDesktop().browse(new URI('https://discord.gg/UmpNYNRmGE'));
            }
            break;
        }
        case 'testsound': {
            let [ sfx, volume, pitch ] = cmdData;
            World.playSound(sfx || 'random.orb', volume || 1000, pitch || 1);
            break;
        }
        case 'debug': {
            FileLib.write('hoeutilities', './variableDumb.json', JSON.stringify(global.hoeutils[args[1]] ?? {state: 'undefined'}, null, 4));
            console.log(JSON.stringify(global.hoeutils[args[1]] ?? {state: 'undefined'}));
            break;
        }
        case 'help': {
            let [ type, feature ] = cmdData;
            type = type ? type.toLowerCase() : null;
            feature = feature ? feature.toLowerCase() : null;
            if (type == 'features') printFeatureList();
            else if (type == 'problems') {
                switch(feature) {
                    case 'elephant':      helpMessages.elephant.chat(); break;
                    case 'harvest_crops': helpMessages.harvest_crops.chat(); break;
                    case 'common_fixes':  helpMessages.common_fixes.chat(); break;
                    default:              helpMessages.problems_default.chat();
                }
            }
            else {
                helpMessages.default.chat()
            }
            break;
        }
        case 'anita': {
            
        }
        default: {
            ChatLib.chat('&eInvalid argument "'+cmd+'".');
        }
    }
}