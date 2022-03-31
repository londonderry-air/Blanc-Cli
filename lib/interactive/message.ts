import { MessageType } from "../types";

const getColor = (type: MessageType) => {
    switch (type) {
        case 'success':
            return '\x1b[32m'
        case 'error':
            return '\x1b[31m'
        case 'caution':
            return '\x1b[33m'
        case 'default':
            return '\x1b[0m'
        default:
            return '\x1b[0m'
    }
}

export default (messages: string[], type: MessageType) => {
    const color = getColor(type)
    messages.forEach(msg => console.log(color + msg + '\x1b[0m'))
}