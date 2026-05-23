import type { Difficulty, YogaStyle } from "./common";
import type { ClassTemplateSection } from "./class-template";

export type SavedClass = {
    _id?: string;
    name: string;
    sourceTemplateId?: string;
    style: YogaStyle;
    difficulty: Difficulty;
    durationMinutes: number;
    sections: ClassTemplateSection[];
};

