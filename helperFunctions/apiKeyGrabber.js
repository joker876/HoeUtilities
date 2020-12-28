import getAPIInfo from './getAPI';
export function apiKeyGrabber(apiKey) {
    global.hoeutils.data.key = apiKey;
    setTimeout(() => {
        ChatLib.chat(`&a[HoeUtilities] &eAPI Key set!\n`);
        getAPIInfo('collection');
    }, 100);
    return;
}
export const apiKeyChatCriteria = "Your new API key is ${apiKey}";