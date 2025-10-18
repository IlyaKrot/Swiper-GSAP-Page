export interface TimePeriod {
  startYear: number;
  endYear: number;
  title?: string;
}

export interface TimelineEvent {
  date: string;
  description: string;
}

export interface TimeSegment {
  period: TimePeriod;
  events: TimelineEvent[];
}

export interface TimelineProps {
  data: TimeSegment[];
  title?: string;
}