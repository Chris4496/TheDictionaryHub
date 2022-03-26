export interface dict {
    name: string;
    searchQuery: string;
}


interface AudioLink {
    tag: string;
    link: string;
}


export interface entry {
    id: string;
    word: string;
    wordType: string;
    audioLinks: AudioLink[];
    explanation: Object[][];
}

export interface entries {
    entries: entry[];
}

export interface SynAnt {
    synonyms: {percent: number, synonyms: string[]};
}


export interface synAntEntry {
    definition: string;
    pos: string;
    synonyms: any;
    antonyms: any;
}