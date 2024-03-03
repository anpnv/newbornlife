import { ChildCareActivity } from './child-care-activity.model';

export type BabyProfile = {
  name: string;
  birthDate: Date;
  gender: 'Male' | 'Female' | 'Other';
  childActivity?: ChildCareActivity[];
};
