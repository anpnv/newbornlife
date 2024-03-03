import { BabyProfile } from './baby-profile.model';
import { ParentProfile } from './parent-profile.model';

export type Family = {
  parents: ParentProfile[];
  babies: BabyProfile[];
};
