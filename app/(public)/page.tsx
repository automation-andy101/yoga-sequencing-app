export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Divine Yoga Sequencing
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Build intelligent yoga classes using modular sequencing.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/builder"
            className="px-6 py-3 rounded-xl bg-black text-white"
          >
            Create Sequence
          </a>

          <a
            href="/templates"
            className="px-6 py-3 rounded-xl border border-gray-300"
          >
            Browse Templates
          </a>
        </div>
      </div>

    </main>
  );
}