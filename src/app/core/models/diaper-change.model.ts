export type DiaperChange = {
  time: Date;
  type: 'Pee' | 'Poo' | 'Both';
  notes?: string;
};
