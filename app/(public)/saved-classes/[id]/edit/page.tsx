import BuilderClient from "@/components/builder/BuilderClient";
import connectDB from "@/lib/db/db";
import SavedClass from "@/lib/models/SavedClass";
import Module from "@/lib/models/Module";
import Pose from "@/lib/models/Pose";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditSavedClassPage({ params }: PageProps) {
    const { id } = await params;

    await connectDB();

    const savedClass = await SavedClass.findById(id).lean();
    const modules = await Module.find({}).lean();
    const poses = await Pose.find({}).lean();

    if (!savedClass) {
        return (
            <main className="min-h-screen px-6 py-10">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-2xl font-bold">Saved class not found</h1>
                </div>
            </main>
        );
    }

    return (
        <BuilderClient
            classTemplates={JSON.parse(JSON.stringify([savedClass]))}
            modules={JSON.parse(JSON.stringify(modules))}
            poses={JSON.parse(JSON.stringify(poses))}
            mode="edit"
            savedClassId={id}
        />
    );
}