import { JSXElement, createMemo, Accessor } from "solid-js";

export function createJSXParser<TTokens = {}>(id: string = "solid-parser") {
  const $TOKEN = Symbol(id);

  function createToken<TProps extends { [key: string]: any }, TToken extends TTokens>(
    tokenProperties: (props: TProps) => TToken,
    component?: (props: TProps) => JSXElement
  ): (props: TProps) => JSXElement {
    return (props: TProps) => {
      return Object.assign(
        component
          ? () => component(props)
          : () => {
              process.env.DEV &&
                console.info(`tokens can only be rendered inside a Parser with id '${id}'`);
              return "";
            },
        {
          [$TOKEN]: true,
          ...tokenProperties(props)
        }
      );
    };
  }

  function childrenTokens(fn: Accessor<JSXElement | JSXElement[]>): Accessor<TTokens[]> {
    const children = createMemo(fn);
    const resolveChild = (child: any) => {
      while (true) {
        if (typeof child !== "function") return child;
        if ($TOKEN in child) return child;
        child = child();
      }
    };
    return createMemo(() =>
      ([] as any[])
        .concat(children())
        .map(resolveChild)
        .filter(child => child && $TOKEN in child)
    );
  }

  return { createToken, childrenTokens, $TOKEN };
}
