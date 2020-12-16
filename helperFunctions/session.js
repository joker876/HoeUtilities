import { sessionFileStructure } from './constants';

export function startSession() {
    ChatLib.chat('&aSession started')
}

export function endSession() {
    ChatLib.chat('&cSession ended')
}