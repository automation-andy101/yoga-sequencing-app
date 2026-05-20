import ClassTemplateDetail from "@/components/class-templates/ClassTemplateDetail";
import connectDB from "@/lib/db/db";
import ClassTemplate from "@/lib/models/ClassTemplate";
import Module from "@/lib/models/Module";
import Pose from "@/lib/models/Pose";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ClassTemplateDetailPage({ 
    params 
}: PageProps) {
    const { id } = await params;

    await connectDB();

    const classTemplate = await ClassTemplate.findById(id).lean();
    const modules = await Module.find({}).lean();
    const poses = await Pose.find({}).lean();

    if (!classTemplate) {
        return (
            <main className="min-h-screen px-6 py-10">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-2xl font-bold">Class template not found</h1>
                </div>
            </main>
        );
    }

    return (
        <ClassTemplateDetail
            classTemplate={JSON.parse(JSON.stringify(classTemplate))}
            modules={JSON.parse(JSON.stringify(modules))}
            poses={JSON.parse(JSON.stringify(poses))}
        />
    )

}