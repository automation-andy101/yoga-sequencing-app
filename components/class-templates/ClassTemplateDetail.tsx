import { ClassTemplate } from "@/types/class-template";
import { Module } from "@/types/module";
import { Pose } from "@/types/pose";
import { formatSectionType } from "@/lib/utils/format";

type Props = {
    classTemplate: ClassTemplate;
    modules: Module[];
    poses: Pose[];
};

export default function ClassTemplateDetails({
    classTemplate,
    modules,
    poses
}: Props) {
    const getModule = (moduleId: string) => modules.find((module) => module._id === moduleId);

    const getPoseName = (poseId: string) => {
        const pose = poses.find((pose) => pose._id === poseId);

        return pose?.shortName || pose?.englishName || poseId;
    };

    return (
        <main className="min-hscreen px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">{classTemplate.name}</h1>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-grap-100 px-2 py-1">
                            {classTemplate.style}
                        </span>

                        <span className="rounded-full bg-gray-100 px-2 py-1">
                            {classTemplate.difficulty}
                        </span>

                        <span className="rounded-full bg-gray-100 px-2 py-1">
                            {classTemplate.durationMinutes} mins
                        </span>
                    </div>
                </div>

                <div className="space-y-8">
                    {classTemplate.sections.map((section) => (
                        <section 
                            key={section.type}
                            className="rounded-2xl border bg-white p-5 shadow-sm"
                        >
                            <h2 className="mb-5 text-2xl font-bold tracking-tight">
                                {formatSectionType(section.type.replaceAll("-", " "))}
                            </h2>

                            <div className="space-y-5">
                                {section.moduleIds.map((moduleId) => {
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
                                        <div key={module._id} className="rounded-xl bg-gray-50 p-4">
                                            <div className="mb-3">
                                                <h3 className="font-medium">{module.name}</h3>

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

                                            <p className="mb-3 text-sm text-gray-600">
                                                Focus: {module.focus.join(", ")}
                                            </p>

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
                                    )
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}