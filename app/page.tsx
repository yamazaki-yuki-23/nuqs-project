import type { SearchParams } from "nuqs/server";
import FilterPanel from "./components/FilterPanel";
import LinkPrefetchTest from "./components/LinkPrefetchTest";
import ResultPanel from "./components/ResultPanel";
import { searchParamsCache } from "./searchParams";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await searchParamsCache.parse(searchParams);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-foreground mb-4">
          nuqs検索アプリ
        </h1>
        <ResultPanel />
        <FilterPanel />
        <LinkPrefetchTest />
      </main>
    </div>
  );
};

export default Page;
