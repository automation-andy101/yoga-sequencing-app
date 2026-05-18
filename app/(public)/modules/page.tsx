import ModuleCard from "@/components/modules/ModuleCard";
import connectDB from "@/lib/db/db";
import Module from "@/lib/models/Module";
import Pose from "@/lib/models/Pose";

export default async function ModulesPage() {
    await connectDB();

    const modules = await Module.find({}).lean();
    const poses = await Pose.find({}).lean();

    const plainModules = JSON.parse(JSON.stringify(modules));
    const plainPoses = JSON.parse(JSON.stringify(poses));

    return (
        <main className="min-h-screen px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Sequence Modules</h1>
                    <p className="mt-2 text-muted-foreground">
                        Reusable yoga flow blocks made from ordered poses.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-col-2">
                    {plainModules.map((module: any) => (
                        <ModuleCard 
                            key={module._id}
                            module={module}
                            poses={plainPoses}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}