"use client";

import { useEffect, useMemo, useState } from "react";
import type { ClassTemplate } from "@/types/class-template";
import type { Module } from "@/types/module";
import type { Pose } from "@/types/pose";
import { formatSectionType } from "@/lib/utils/format";

type Props = {
  classTemplates: ClassTemplate[];
  modules: Module[];
  poses: Pose[];
};

export default function BuilderClient({
  classTemplates,
  modules,
  poses,
}: Props) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    classTemplates[0]?._id ?? ""
  );

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    const selectedTemplate = useMemo(
        () =>
        classTemplates.find(
            (classTemplate) => classTemplate._id === selectedTemplateId
        ),
        [classTemplates, selectedTemplateId]
    );

    const [editableTemplate, setEditableTemplate] =
        useState<ClassTemplate | null>(selectedTemplate ?? null);

    useEffect(() => {
        setEditableTemplate(selectedTemplate ?? null);
        setSaveMessage("");
    }, [selectedTemplate]);

    const getModule = (moduleId: string) =>
        modules.find((module) => module._id === moduleId);

    const getPoseName = (poseId: string) => {
        const pose = poses.find((pose) => pose._id === poseId);
        return pose?.shortName || pose?.englishName || poseId;
    };

    const addModule = (sectionType: string, moduleId: string) => {
        if (!editableTemplate || !moduleId) return;

        setEditableTemplate({
            ...editableTemplate,
            sections: editableTemplate.sections.map((section) =>
                section.type === sectionType
                ? {
                    ...section,
                    moduleIds: [...section.moduleIds, moduleId],
                }
                : section
            ),
        });
    };

    const removeModule = (sectionType: string, moduleId: string) => {
        if (!editableTemplate) return;

        setEditableTemplate({
            ...editableTemplate,
            sections: editableTemplate.sections.map((section) =>
                section.type === sectionType
                ? {
                    ...section,
                    moduleIds: section.moduleIds.filter((id) => id !== moduleId),
                }
                : section
            ),
        });
    };

    const moveModule = (
        sectionType: string,
        moduleIndex: number,
        direction: "up" | "down"
    ) => {
        if (!editableTemplate) return;

        setEditableTemplate({
            ...editableTemplate,
            sections: editableTemplate.sections.map((section) => {
                if (section.type !== sectionType) {
                    return section;
                }

                const updatedModuleIds = [...section.moduleIds];

                const targetIndex =
                    direction === "up"
                    ? moduleIndex - 1
                    : moduleIndex + 1;

                if (
                    targetIndex < 0 ||
                    targetIndex >= updatedModuleIds.length
                ) {
                    return section;
                }

                [updatedModuleIds[moduleIndex], updatedModuleIds[targetIndex]] = [
                    updatedModuleIds[targetIndex],
                    updatedModuleIds[moduleIndex],
                ];

                return {
                    ...section,
                    moduleIds: updatedModuleIds,
                };
            }),
        });
    };

    const saveClass = async () => {
        if (!editableTemplate) return;

        try {
            setIsSaving(true);
            setSaveMessage("");

            const response = await fetch("/api/saved-classes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: `${editableTemplate.name} - Custom`,
                sourceTemplateId: editableTemplate._id,
                style: editableTemplate.style,
                difficulty: editableTemplate.difficulty,
                durationMinutes: editableTemplate.durationMinutes,
                sections: editableTemplate.sections,
            }),
            });

            if (!response.ok) {
            throw new Error("Failed to save class");
            }

            setSaveMessage("Class saved successfully.");
        } catch (error) {
            console.error(error);
            setSaveMessage("Failed to save class.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="min-h-screen px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Class Builder</h1>
                    <p className="mt-2 text-muted-foreground">
                        Select a class template and customise the sequence.
                    </p>
                </div>

                <div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
                    <label className="mb-2 block text-sm font-medium">
                        Choose a class template
                    </label>

                    <select
                        value={selectedTemplateId}
                        onChange={(event) => setSelectedTemplateId(event.target.value)}
                        className="w-full rounded-xl border px-3 py-2 text-sm"
                    >
                        {classTemplates.map((classTemplate) => (
                            <option key={classTemplate._id} value={classTemplate._id}>
                                {classTemplate.name}
                            </option>
                        ))}
                    </select>
                </div>

                {!editableTemplate ? (
                    <p className="text-sm text-gray-500">No class template selected.</p>
                ) : (
                    <section className="space-y-6">
                        <div className="rounded-3xl border bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm">
                            <h2 className="text-4xl font-black tracking-tight">{editableTemplate.name}</h2>

                            <div className="mt-5 flex flex-wrap gap-3 text-sm">
                                <span className="rounded-full bg-black px-3 py-1 text-white">
                                    {editableTemplate.style}
                                </span>

                                <span className="rounded-full bg-black px-3 py-1 text-white">
                                    {editableTemplate.difficulty}
                                </span>

                                <span className="rounded-full bg-black px-3 py-1 text-white">
                                    {editableTemplate.durationMinutes} mins
                                </span>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={saveClass}
                                    disabled={isSaving}
                                    className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSaving ? "Saving..." : "Save Class"}
                                </button>

                                {saveMessage && (
                                    <p className="mt-2 text-sm text-gray-600">{saveMessage}</p>
                                )}
                            </div>
                        </div>

                        {editableTemplate.sections.map((section) => (
                            <div
                                key={section.type}
                                className="rounded-2xl border bg-white p-5 shadow-sm"
                            >
                                <h3 className="mb-5 text-2xl font-bold tracking-tight">
                                    {formatSectionType(section.type)}
                                </h3>

                                <div className="mb-4">
                                    <select
                                        defaultValue=""
                                        onChange={(event) => {
                                            addModule(section.type, event.target.value);
                                            event.target.value = "";
                                        }}
                                        className="w-full rounded-xl border px-3 py-2 text-sm"
                                    >
                                        <option value="" disabled>
                                            Add module to {formatSectionType(section.type)}
                                        </option>

                                        {modules.map((module) => (
                                            <option key={module._id} value={module._id}>
                                                {module.name} ({module.type})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    {section.moduleIds.length === 0 && (
                                        <p className="text-sm text-gray-500">
                                            No modules in this section.
                                        </p>
                                    )}

                                    {section.moduleIds.map((moduleId, moduleIndex) => {
                                        const module = getModule(moduleId);

                                        if (!module) {
                                            return (
                                                <div
                                                    key={moduleId}
                                                    className="rounded-xl bg-red-50 p-3 text-sm text-red-600"
                                                >
                                                    Missing module: {moduleId}
                                                </div>
                                            );
                                        }

                                        return (
                                            <div
                                                key={module._id}
                                                className="rounded-xl bg-gray-50 p-4"
                                            >
                                                <div className="mb-3 flex items-start justify-between gap-4">
                                                    <div>
                                                        <h4 className="font-semibold">{module.name}</h4>

                                                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                                            <span className="rounded-full bg-white px-2 py-1">
                                                                {module.type}
                                                            </span>

                                                            <span className="rounded-full bg-white px-2 py-1">
                                                                {module.energy}
                                                            </span>

                                                            <span className="rounded-full bg-white px-2 py-1">
                                                                {module.difficulty}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {moduleIndex > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    moveModule(section.type, moduleIndex, "up")
                                                                }
                                                                className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-100"
                                                            >
                                                            ↑
                                                            </button>
                                                        )}

                                                        {moduleIndex < section.moduleIds.length - 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    moveModule(section.type, moduleIndex, "down")
                                                                }
                                                                className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-100"
                                                            >
                                                            ↓
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeModule(section.type, module._id)
                                                            }
                                                            className="rounded-lg border px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>

                                                <ol className="space-y-2">
                                                    {module.poses.map((modulePose, index) => (
                                                        <li
                                                            key={`${module._id}-${modulePose.poseId}-${index}`}
                                                            className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm"
                                                        >
                                                            <span>
                                                                {index + 1}. {getPoseName(modulePose.poseId)}
                                                                {modulePose.side && (
                                                                <span className="text-gray-500">
                                                                    {" "}
                                                                    ({modulePose.side})
                                                                </span>
                                                                )}
                                                            </span>

                                                            <span className="text-gray-500">
                                                                {modulePose.duration.value}{" "}
                                                                {modulePose.duration.type}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}