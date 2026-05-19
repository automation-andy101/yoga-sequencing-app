import type { Module } from "@/types/module";
import type { Pose } from "@/types/pose";

type ModuleCardProps = {
  module: Module;
  poses: Pose[];
};

export default function ModuleCard({ module, poses }: ModuleCardProps) {
    const getPoseName = (poseId: string) => {
        const pose = poses.find((pose) => pose._id === poseId);
        return pose?.shortName || pose?.englishName || poseId;
    };

    return (
        <article className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">{module.name}</h2>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-gray-100 px-2 py-1">
                        {module.type}
                    </span>

                    <span className="rounded-full bg-gray-100 px-2 py-1">
                        {module.difficulty}
                    </span>

                    <span className="rounded-full bg-gray-100 px-2 py-1">
                        {module.energy}
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-sm font-medium">Focus</p>
                <p className="text-sm text-gray-600">{module.focus.join(", ")}</p>
            </div>

            <div>
                <p className="mb-2 text-sm font-medium">Pose sequence</p>

                <ol className="space-y-2">
                    {module.poses.map((modulePose, index) => (
                        <li
                            key={`${modulePose.poseId}-${index}`}
                            className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 text-sm"
                        >
                            <span>
                                {index + 1}. {getPoseName(modulePose.poseId)}
                            </span>

                            <span className="text-gray-500">
                                {modulePose.duration.value} {modulePose.duration.type}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </article>
    );
}