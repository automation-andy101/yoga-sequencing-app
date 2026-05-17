import type {Difficulty, Energy, YogaStyle} from "./common";
import type { Duration } from "./pose";

export type ModuleType =
  | "warmup"
  | "mobility"
  | "flow"
  | "strength"
  | "cooldown"
  | "restorative"
  | "sun-salutation";

export type ModulePose = {
  poseId: string;
  duration: Duration;
  side?: "left" | "right" | "both";
  notes?: string;
};

export type Module = {
  _id: string;
  name: string;
  type: ModuleType;
  style: YogaStyle[];
  difficulty: Difficulty;
  focus: string[];
  energy: Energy;
  estimatedBreaths?: number;
  poses: ModulePose[];
};