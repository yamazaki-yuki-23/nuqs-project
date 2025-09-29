import DynamicIdPanel from "./DynamicIdPanel";

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

const LinkTestDynamicPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">動的ページ: {id}</h1>
      <p className="mb-2">このページは動的ルートで生成されています。</p>
      <p className="text-xs text-gray-500">URL: /link-test-dest/{id}</p>
      <DynamicIdPanel id={id} />
    </div>
  );
};

export default LinkTestDynamicPage;
