import { PropsWithChildren } from "react";

export const Pre: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;

  return <pre style={{ margin: 0 }}>{children}</pre>;
};

export default Pre;
