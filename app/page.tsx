export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to Next.js
        </h1>
        <p className="text-lg text-foreground/80 max-w-md">
          This is a simple Next.js application with Tailwind CSS styling.
        </p>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200">
            Start building your amazing application!
          </p>
        </div>
      </main>
    </div>
  );
}
