import Link from "next/link";

import connectDB from "@/lib/db/db";
import SavedClass from "@/lib/models/SavedClass";

export default async function SavedClassesPage() {
    await connectDB();

    const savedClasses = await SavedClass.find({})
        .sort({ createdAt: -1 })
        .lean();

    const plainSavedClasses = JSON.parse(JSON.stringify(savedClasses));

    return (
        <main className="min-h-screen px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Saved Classes</h1>
                    <p className="mt-2 text-muted-foreground">
                        Your custom yoga sequences.
                    </p>
                </div>

                {plainSavedClasses.length === 0 ? (
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-600">
                            No saved classes yet. Create one from the builder.
                        </p>

                        <Link
                            href="/builder"
                            className="mt-4 inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                            >
                            Go to Builder
                        </Link>
                    </div>
                ) : (
                <div className="grid gap-5 md:grid-cols-2">
                    {plainSavedClasses.map((savedClass: any) => (
                        <article
                            key={savedClass._id}
                            className="rounded-2xl border bg-white p-5 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold">{savedClass.name}</h2>

                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                <span className="rounded-full bg-gray-100 px-2 py-1">
                                    {savedClass.style}
                                </span>

                                <span className="rounded-full bg-gray-100 px-2 py-1">
                                    {savedClass.difficulty}
                                </span>

                                <span className="rounded-full bg-gray-100 px-2 py-1">
                                    {savedClass.durationMinutes} mins
                                </span>

                                <span className="rounded-full bg-gray-100 px-2 py-1">
                                    {savedClass.sections.length} sections
                                </span>
                            </div>

                            <div className="mt-5">
                                <Link
                                    href={`/saved-classes/${savedClass._id}`}
                                    className="inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                >
                                    View Class
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
                )}
            </div>
        </main>
    );
}

