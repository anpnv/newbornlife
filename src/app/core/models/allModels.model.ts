export type BabyProfile = {
  name: string;
  birthDate: Date;
  gender: 'Male' | 'Female' | 'Other';
  childActivity?: ChildCareActivity[];
};

export type ChildCareActivity = {
  diaperChanges: DiaperChange[];
  feedingSessions: FeedingSession[];
  sleepSessions: SleepSession[];
  growthRecord: GrowthRecord[];
};
export type DiaperChange = {
  time: Date;
  type: 'Pee' | 'Poo' | 'Both';
  notes?: string;
};
export type Family = {
  parents: string[];
  babies: string[];
};
export type FeedingSession = {
  type: 'Breast' | 'Bottle';
  startTime: Date;
  endTime: Date;
  amount?: number;
};
export type GrowthRecord = {
  date: Date;
  weight?: number;
  height?: number;
  headCircumference?: number;
  temperature?: number;
};
export type ParentProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  relationshipToBaby: string;
  additionalNotes?: string;
};
export type SleepSession = {
  startTime: Date;
  endTime: Date;
};
