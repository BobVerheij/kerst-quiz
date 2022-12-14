export type Answer = {
  number: number;
  answer?: string;
};

export type Round = {
  round: number;
  correct: number;
  bonus: number;
  shredded?: boolean;
  answers?: Answer[];
};

export type Team = {
  id: string;
  hex?: string;
  name?: string;
  scores: Round[];
};
