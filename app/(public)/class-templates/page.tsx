import ClassTemplateCard from "@/components/class-templates/ClassTemplateCard";
import connectDB from "@/lib/db/db";
import ClassTemplate from "@/lib/models/ClassTemplate";
import Module from "@/lib/models/Module";
import Pose from "@/lib/models/Pose";

export default async function ClassTemplatesPage() {
    await connectDB();

    const classTemplates = await ClassTemplate.find({}).lean();
    const modules = await Module.find({}).lean();
    const poses = await Pose.find({}).lean();

    const plainClassTemplates = JSON.parse(JSON.stringify(classTemplates));
    const plainModules = JSON.parse(JSON.stringify(modules));
    const plainPoses = JSON.parse(JSON.stringify(poses));

    return (
        <main className="min-h-screen px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Class Templates</h1>
                    <p className="mt-2 text-muted-foreground">
                        View full yoga class structures built from reusable modules.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-col-2">
                    {plainClassTemplates.map((classTemplate: any) => (
                        <ClassTemplateCard 
                            key={classTemplate._id}
                            classTemplate={classTemplate}
                            modules={plainModules}
                            poses={plainPoses}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}