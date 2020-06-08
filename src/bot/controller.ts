import TelegramBot, {InlineQueryResult} from 'node-telegram-bot-api';
import {isAllowed, register} from './Permission'
import {contienePalabrasProhibidas} from './blocked'
import fs from 'fs';
import {sendMessageToChannel} from './channel';
import {fetchQuote} from './api'
import {initCron } from './cron'

enum STATUS{
    NEXT_NAME,
    NEXT_EMAIL,
    NEXT_FAV_LANG
}

type MessageDictionary = {
    [key: string]: {
        status: STATUS,
        value: {
            name?: string,
            email?: string,
            fav_lang?: string
        }
    }
}
function init(){
    const bot = new TelegramBot(process.env.token as string, {polling: true});
    const bannedList: {
        [key: string]: number
    } = {};

    // initCron(bot);
    
    bot.on("message", (message)=> {
        bot.sendMessage(message.chat.id, "hello world")
    })
    
    bot.on("inline_query", (qry)=>{
        const matches: Array<InlineQueryResult> = dictionarySearch(qry.query).map(([word, definiton], i)=>{
            return {
                id: i.toString(),
                type: 'article',
                title: word,
                description: definiton,
                input_message_content: {
                    message_text: `${word}: ${definiton}`
                }
            }
        })

        bot.answerInlineQuery(qry.id, matches);
    })
}

function dictionarySearch(text: string): Array<[string, string]>{
    const dictionary: {
        [word: string]: string
    } = JSON.parse(fs.readFileSync('./dictionary.json', 'utf8'));

    const matches: Array<[string, string]> = Object.entries(dictionary).filter(([word])=>{
        return word.includes(text);
    })

    return matches;
}
const BotController = {init};
export default BotController;