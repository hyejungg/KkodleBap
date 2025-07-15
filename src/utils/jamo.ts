import allNounsList from '@/assets/words/all_nouns.txt?raw';
import commonNounsList from '@/assets/words/common_nouns.txt?raw';

const CHOSEONG = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const JUNGSEONG = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const JONGSEONG = [
    "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ",
    "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ",
    "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

const complexInitialMap: Record<string, string[]> = {
    'ㄲ': ['ㄱ', 'ㄱ'], 'ㄸ': ['ㄷ', 'ㄷ'],
    'ㅃ': ['ㅂ', 'ㅂ'], 'ㅆ': ['ㅅ', 'ㅅ'], 'ㅉ': ['ㅈ', 'ㅈ']
};

const complexMedialMap: Record<string, string[]> = {
    'ㅘ': ['ㅗ', 'ㅏ'], 'ㅙ': ['ㅗ', 'ㅐ'], 'ㅚ': ['ㅗ', 'ㅣ'],
    'ㅝ': ['ㅜ', 'ㅓ'], 'ㅞ': ['ㅜ', 'ㅔ'], 'ㅟ': ['ㅜ', 'ㅣ'],
    'ㅢ': ['ㅡ', 'ㅣ'], 'ㅐ': ['ㅏ', 'ㅣ'], 'ㅔ': ['ㅓ', 'ㅣ'],
    'ㅒ': ['ㅑ', 'ㅣ'], 'ㅖ': ['ㅕ', 'ㅣ'],
};

const complexFinalMap: Record<string, string[]> = {
    "ㄳ": ['ㄱ', 'ㅅ'], "ㄵ": ['ㄴ', 'ㅈ'], "ㄶ": ['ㄴ', 'ㅎ'],
    "ㄺ": ['ㄹ', 'ㄱ'], "ㄻ": ['ㄹ', 'ㅁ'], "ㄼ": ['ㄹ', 'ㅂ'],
    "ㄽ": ['ㄹ', 'ㅅ'], "ㄾ": ['ㄹ', 'ㅌ'], "ㄿ": ['ㄹ', 'ㅍ'],
    "ㅀ": ['ㄹ', 'ㅎ'], "ㅄ": ['ㅂ', 'ㅅ'],
    "ㄲ": ['ㄱ', 'ㄱ'], "ㅆ": ['ㅅ', 'ㅅ']
};

let answerWords: string[] = [];
let allWords: string[] = [];
let jamoParsedWords: string[][] = [];

const JAMO_COUNT = 6;

export function splitWordToJamo(input: string): string[] {
    const result: string[] = [];

    for (const char of input) {
        if (char >= '가' && char <= '힣') {
            const code = char.charCodeAt(0) - 0xAC00;
            const choIdx = Math.floor(code / (21 * 28));
            const jungIdx = Math.floor((code % (21 * 28)) / 28);
            const jongIdx = code % 28;

            const cho = CHOSEONG[choIdx];
            const jung = JUNGSEONG[jungIdx];
            const jong = JONGSEONG[jongIdx];

            // 초성 분해
            result.push(...(complexInitialMap[cho] || [cho]));
            // 중성 분해
            result.push(...(complexMedialMap[jung] || [jung]));
            // 종성 분해
            if (jong) {
                result.push(...(complexFinalMap[jong] || [jong]));
            }
        } else {
            result.push(char);
        }
    }

    return result;
}

export function getAnswerWords(): string[] {
    if (answerWords.length === 0) {
        answerWords = commonNounsList.split('\n')
            .map(it => it.trim())
            .filter(it => it.length > 0 && splitWordToJamo(it).length === JAMO_COUNT);
    }
    return answerWords;
}

export function getAllWords(): string[] {
    if (allWords.length === 0) {
        allWords = allNounsList.split('\n')
            .map(it => it.trim())
            .filter(it => it.length > 0);
    }
    return allWords;
}

export function drawAnswer(): string | null {
    const wordList = getAnswerWords();
    if (wordList.length === 0) return null;

    const word = wordList[Math.floor(Math.random() * wordList.length)];
    answerWords = answerWords.filter(it => it !== word);
    return word;
}

export function getAllWordsAsJamoList(): string[][] {
    if (jamoParsedWords.length === 0) {
        jamoParsedWords = getAllWords().map(it => splitWordToJamo(it));
    }
    return jamoParsedWords;
}

export function isValidWord(inputJamos: string[]): boolean {
    const allJamoWords = getAllWordsAsJamoList();
    const inputWordStr = inputJamos.join('');
    return allJamoWords.some(jamoList => jamoList.join('') === inputWordStr);
}