import ClassTemplateDetail from "@/components/class-templates/ClassTemplateDetail";
import connectDB from "@/lib/db/db";
import SavedClass from "@/lib/models/SavedClass";
import Module from "@/lib/models/Module";
import Pose from "@/lib/models/Pose";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SavedClassDetailPage({ params }: PageProps) {
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
        <>
            <ClassTemplateDetail
                classTemplate={JSON.parse(JSON.stringify(savedClass))}
                modules={JSON.parse(JSON.stringify(modules))}
                poses={JSON.parse(JSON.stringify(poses))}
                action={
                    <Link
                        href={`/saved-classes/${id}/edit`}
                        className="inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        Edit Class
                    </Link>
                }
            />
        </>
    );
}
