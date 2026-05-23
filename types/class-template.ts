import type { Difficulty, YogaStyle } from "./common";

export type ClassTemplateSectionType =
  | "arrival"
  | "warmup"
  | "sun-salutations"
  | "standing-flow"
  | "peak-prep"
  | "cooldown"
  | "final-relaxation";

export type ClassTemplateSection = {
  type: ClassTemplateSectionType;
  moduleIds: string[];
  durationTargetMinutes?: number;
};

export type ClassTemplate = {
  _id: string;
  name: string;
  style: YogaStyle;
  difficulty: Difficulty;
  durationMinutes: number;
  sections: ClassTemplateSection[];
};
