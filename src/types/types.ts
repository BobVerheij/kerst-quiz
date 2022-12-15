export type Round = {
  round: number;
  correct?: number;
  bonus?: number;
  shredded?: boolean;
  answers?: string[];
};

export type Team = {
  id: string;
  hex?: string;
  name?: string;
  scores: Round[];
};
