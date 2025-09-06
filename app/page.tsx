import FilterPanel from "./components/FilterPanel";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-foreground mb-4">
          nuqs検索アプリ
        </h1>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded shadow">
          <h3 className="text-lg font-bold mb-2">検索結果：</h3>
          <pre className="text-xs text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 rounded p-2 overflow-x-auto">
            {JSON.stringify(params, null, 2)}
          </pre>
        </div>
        <FilterPanel />
      </main>
    </div>
  );
};

export default Page;
