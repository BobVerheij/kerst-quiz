export type Round = {
  round: number;
  correct: number;
  bonus: number;
  shredded?: boolean;
};

export type Team = {
  id: string;
  hex?: string;
  name?: string;
  scores: Round[];
};
