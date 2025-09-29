type Props = {
  id: string;
};

import { Suspense } from "react";
import IdInfoPanel from "./IdInfoPanel";

const DynamicIdPanel = ({ id }: Props) => {
  return (
    <div className="border p-4 rounded bg-blue-50 mt-4">
      <h2 className="text-lg font-semibold mb-2">DynamicIdPanel</h2>
      <p>
        propsで受け取ったid:{" "}
        <span className="font-mono text-blue-700">{id}</span>
      </p>
      <Suspense
        fallback={
          <div className="mt-2 text-yellow-400">IdInfoPanel Loading...</div>
        }
      >
        <IdInfoPanel id={id} />
      </Suspense>
    </div>
  );
};

export default DynamicIdPanel;
