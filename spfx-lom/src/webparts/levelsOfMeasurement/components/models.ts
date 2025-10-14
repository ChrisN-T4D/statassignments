export type MeasurementLevel = 'Nominal' | 'Ordinal' | 'Interval' | 'Ratio';

export interface IMeasurementLevelDescriptor {
  value: MeasurementLevel;
  label: string;
  definition: string;
  example: string;
  guidingQuestion?: string;
}

export interface IMeasurementQuestion {
  id: number;
  prompt: string;
  answer: MeasurementLevel;
  explanation: string;
  context?: string;
  insight?: string;
}
