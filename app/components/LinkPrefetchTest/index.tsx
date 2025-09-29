import CustomLink from "./CustomLink";

const LINKS = Array.from({ length: 30 }, (_, i) => ({
  id: `link-${i + 1}`,
  label: `Linkタグ ${i + 1}`,
  href: `/link-test-dest/link-${i + 1}`,
}));

const LinkPrefetchTest = () => {
  return (
    <div className="border p-4 rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Linkタグ prefetch 検証</h2>
      <div className="space-y-2">
        {LINKS.map((item) => (
          <div key={item.id}>
            <CustomLink href={item.href} className="text-blue-600 underline">
              {item.label}
            </CustomLink>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">
        開発者ツールのNetworkタブで、hover時のリクエスト有無を確認してください。
      </p>
    </div>
  );
};

export default LinkPrefetchTest;
