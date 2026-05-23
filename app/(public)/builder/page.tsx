import BuilderClient from "@/components/builder/BuilderClient";
import connectDB from "@/lib/db/db";
import ClassTemplate from "@/lib/models/ClassTemplate";
import Module from "@/lib/models/Module";
import Pose from "@/lib/models/Pose";

export default async function BuilderPage() {
    await connectDB();

    const classTemplates = await ClassTemplate.find({}).lean();
    const modules = await Module.find({}).lean();
    const poses = await Pose.find({}).lean();

    return (
        <BuilderClient
            classTemplates={JSON.parse(JSON.stringify(classTemplates))}
            modules={JSON.parse(JSON.stringify(modules))}
            poses={JSON.parse(JSON.stringify(poses))}
        />
    );
}
