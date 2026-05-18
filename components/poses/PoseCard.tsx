import type { Pose } from "@/types/pose";

type PoseCardProps = {
  pose: Pose;
};

export default function PoseCard({ pose }: PoseCardProps) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-500">
        Pose image
      </div>

      <div className="space-y-2">
        <div>
          <h2 className="text-xl font-semibold">{pose.englishName}</h2>
          {pose.sanskritName && (
            <p className="text-sm text-gray-500">{pose.sanskritName}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-gray-100 px-2 py-1">
            {pose.difficulty}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-1">
            {pose.energy}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-1">
            {pose.breathPattern}
          </span>
        </div>

        <div>
          <p className="text-sm font-medium">Focus</p>
          <p className="text-sm text-gray-600">
            {pose.bodyFocus.join(", ")}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">Categories</p>
          <p className="text-sm text-gray-600">
            {pose.categories.join(", ")}
          </p>
        </div>
      </div>
    </article>
  );
}