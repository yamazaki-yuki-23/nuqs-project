type Props = {
  id: string;
};

// 疑似的な非同期処理（1秒待機してidを返す）
async function fetchIdInfo(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { id, info: `これはID「${id}」のダミーデータです` };
}

const IdInfoPanel = async ({ id }: Props) => {
  const data = await fetchIdInfo(id);
  return (
    <div className="border p-2 rounded bg-yellow-50 mt-2">
      <h3 className="text-base font-semibold mb-1">IdInfoPanel</h3>
      <p>
        propsで受け取ったid:{" "}
        <span className="font-mono text-yellow-700">{data.id}</span>
      </p>
      <p className="text-xs text-gray-600 mt-1">{data.info}</p>
    </div>
  );
};

export default IdInfoPanel;
