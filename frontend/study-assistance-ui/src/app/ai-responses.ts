export interface SummaryResponse {
  summary: string;
  key_concepts: KeyConcept[];
}

interface KeyConcept {
  concept: string;
  explanation: string;
  features: string[];
  example: string;
}

export interface QAResponse {
  question: string;
  options: string[];
  correct_answer: string;
}

export interface FlashcardResponse {
  question: string;
  answer: string;
}
