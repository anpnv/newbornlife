export type FeedingSession = {
  type: 'Breast' | 'Bottle';
  startTime: Date;
  endTime: Date;
  amount?: number;
};
