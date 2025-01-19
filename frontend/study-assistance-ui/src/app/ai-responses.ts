export interface SummaryResponse {
  summary: string;
  key_concepts: KeyConcept[];
  question?: string;
  options?: string[];
  correct_answer?: string;
  answer?: string;
}

export interface KeyConcept {
  concept: string;
  explanation: string;
  features: string[];
  example: string;
}

export interface QAResponse {
  question: string;
  options: string[];
  correct_answer: string;
  summary?: string;
  key_concepts?: KeyConcept[]
  answer?: string;
}

export interface FlashcardResponse {
  question: string;
  answer: string;
  summary?: string;
  key_concepts?: KeyConcept[]
  options?: string[];
  correct_answer?: string;
}
