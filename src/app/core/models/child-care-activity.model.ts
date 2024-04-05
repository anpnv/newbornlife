import { DiaperChange } from './diaper-change.model';
import { FeedingSession } from './feeding-session.model';
import { GrowthRecord } from './growth-record.model';
import { SleepSession } from './sleep-session.model';

export type ChildCareActivityAdvanced = {
  diaperChanges: DiaperChange[];
  feedingSessions: FeedingSession[];
  sleepSessions: SleepSession[];
  growthRecord: GrowthRecord[];
};

export type ChildCareActivity = {
  date: Date;
  startTime: string;
  endTime?: string;
  notes?: string;
  diaper?: 'Pee' | 'Poo' | 'Both';
  feeding?: 'Breast' | 'Bottle' | 'Both';
  breastSide: 'Left' | 'Right';
  weight?: number;
  height?: number;
  temperature?: number;
};
