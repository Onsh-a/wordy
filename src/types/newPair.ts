export type NewPair = {
  lang: string,
  _id: string
  foreign: string,
  russian: RussianVocabularyData
}

export type RussianVocabularyData = {
  noun: string | null,
  verb: string | null,
  adjective: string | null,
  other: string | null,
}
