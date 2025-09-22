import { searchParamsCache } from "@/app/searchParams";

const ResultPanel = () => {
  const { category, tags, count, page } = searchParamsCache.all();
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded shadow">
      <h2 className="text-lg font-bold mb-2">検索結果：</h2>
      <ul className="text-xs text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 rounded p-2 overflow-x-auto">
        <li>
          <span className="font-bold">カテゴリ:</span> {category}
        </li>
        <li>
          <span className="font-bold">タグ:</span>{" "}
          {Array.isArray(tags) ? tags.join(", ") : tags}
        </li>
        <li>
          <span className="font-bold">カウント:</span> {count}
        </li>
        <li>
          <span className="font-bold">ページ:</span> {page + 1}
        </li>
      </ul>
    </div>
  );
};

export default ResultPanel;
