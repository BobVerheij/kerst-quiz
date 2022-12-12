export type Round = {
  round: number;
  correct: number;
  bonus: number;
  shredded?: boolean;
};

export type Team = {
  id: number;
  hex?: string;
  name?: string;
  scores: Round[];
};
