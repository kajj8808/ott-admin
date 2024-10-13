import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";

/** Next.14 에서는 unmount되는 속도가 너무 빨라 framer motion의 exit 를 사용하지 못하는 문제를 해결하기 위해 사용. */
export default function FrozenRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
