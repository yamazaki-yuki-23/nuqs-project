const LinkTestDestPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">リンク遷移先ページ</h1>
      <p className="mb-2">このページはLinkタグの遷移先です。</p>
      <p className="text-xs text-gray-500">URL: /link-test-dest</p>
    </div>
  );
};

export default LinkTestDestPage;
