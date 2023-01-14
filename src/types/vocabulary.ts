export default interface vocabularyPair {
  foreign: string[]
  _id: string
  russian: russianTranslation
  userId: string
  createdAt: string
}

export interface russianTranslation {
  adjective: string | null
  noun: string | null
  other: string | null
  verb: string | null
}
