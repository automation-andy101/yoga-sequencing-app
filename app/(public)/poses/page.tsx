import PoseCard from "../../../components/poses/PoseCard";
import Pose from "@/lib/models/Pose";
import connectDB from "@/lib/db/db";

export default async function PosesPage() {
    await connectDB();

    const poses = await Pose.find({}).lean();

    return (
        <main className="min-h-screen px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Pose Library</h1>
                    <p className="mt-2 text-muted-foreground">
                        Browse the foundational poses used to build yoga sequences.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {poses.map((pose) => (
                        <PoseCard key={pose._id} pose={JSON.parse(JSON.stringify(pose))} />
                    ))}
                </div>
            </div>
        </main>
    );
}