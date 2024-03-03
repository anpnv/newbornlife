import { DiaperChange } from './diaper-change.model';
import { FeedingSession } from './feeding-session.model';
import { GrowthRecord } from './growth-record.model';
import { SleepSession } from './sleep-session.model';

export type ChildCareActivity = {
  diaperChanges: DiaperChange[];
  feedingSessions: FeedingSession[];
  sleepSessions: SleepSession[];
  growthRecord: GrowthRecord[];
};
