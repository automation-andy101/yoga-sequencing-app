import type { Difficulty, Energy } from "./common";

export type BreathPattern =
  | "steady"
  | "deep"
  | "flowing"
  | "expansive";

export type Duration =
  | { type: "breaths"; value: number }
  | { type: "seconds"; value: number };

export type Pose = {
  _id: string;

  englishName: string;
  shortName?: string;
  sanskritName?: string;

  difficulty: Difficulty;

  categories: string[];
  bodyFocus: string[];
  movementPattern: string[];

  energy: Energy;

  contraindications: string[];

  prepPoses: string[];
  counterPoses: string[];
  transitionsTo: string[];

  duration: Duration;

  bilateral: boolean;

  image?: {
    url: string;
    thumbnailUrl?: string;
  };

  breathPattern: BreathPattern;

  peakPose: boolean;
};
