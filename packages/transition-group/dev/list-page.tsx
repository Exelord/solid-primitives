import { children, onCleanup, untrack } from "solid-js";
import { elements } from "@solid-primitives/refs";
import { Component, createSignal, For, Show } from "solid-js";
import { createListTransition } from "../src";

const grayOutOnDispose = (el: HTMLElement) => {
  onCleanup(() => {
    el.style.filter = "grayscale(60%)";
    el.style.zIndex = "0";
  });
};

const ListPage: Component = () => {
  const [show, setShow] = createSignal(false);
  const [show1, setShow1] = createSignal(false);
  const [show2, setShow2] = createSignal(true);
  const [showWrapper, setShowWrapper] = createSignal(true);

  const [list, setList] = createSignal([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }]);

  return (
    <>
      <div class="wrapper-h flex-wrap">
        <button
          class="btn"
          onclick={() => setList(p => [...p, { n: (p[p.length - 1]?.n ?? -1) + 1 }])}
        >
          + 1
        </button>
        <button
          class="btn"
          onclick={() => setList(p => (p.length > 0 ? p.slice(0, p.length - 1) : p))}
        >
          - 1
        </button>
        <button class="btn" onclick={() => setShow(p => !p)}>
          toggle 0
        </button>
        <button class="btn" onclick={() => setShow1(p => !p)}>
          toggle 1
        </button>
        <button class="btn" onclick={() => setShow2(p => !p)}>
          toggle 2 & 3
        </button>
        <button class="btn" onclick={() => setShowWrapper(p => !p)}>
          toggle wrapper
        </button>
      </div>
      <div class="wrapper-h flex-wrap space-x-0 gap-4">
        {untrack(() => {
          const resolved = children(() => (
            <Show when={showWrapper()}>
              <p>Hello</p>
              World
              {show() && (
                <div class="node" ref={grayOutOnDispose}>
                  ID 0
                </div>
              )}
              <Show when={show1()}>
                <div class="node" ref={grayOutOnDispose}>
                  ID 1
                </div>
              </Show>
              <Show when={show2()}>
                <div class="node" ref={grayOutOnDispose}>
                  ID 2
                </div>
                <div class="node" ref={grayOutOnDispose}>
                  ID 3
                </div>
              </Show>
              <For each={list()}>
                {({ n }, i) => (
                  <div
                    class="node bg-yellow-600 cursor-pointer"
                    onClick={() =>
                      setList(p => {
                        const copy = p.slice();
                        copy.splice(i(), 1);
                        return copy;
                      })
                    }
                    ref={grayOutOnDispose}
                  >
                    {n + 1}.
                  </div>
                )}
              </For>
            </Show>
          ));
          const refs = elements(resolved, HTMLElement);

          const options = { duration: 600, easing: "cubic-bezier(0.4, 0, 0.2, 1)" };

          return createListTransition(refs, {
            appear: true,
            onChange({ added, finishRemoved, moved, removed }) {
              added.forEach(el => {
                el.style.opacity = "0";
                el.style.transform = "translateY(10px)";
                requestAnimationFrame(() => {
                  el.animate(
                    [
                      { opacity: 0, transform: "translateY(-36px)" },
                      { opacity: 1, transform: "translateY(0)" },
                    ],
                    { ...options, fill: "both" },
                  );
                });
              });

              moved.forEach(el => {
                const { left: left1, top: top1 } = el.getBoundingClientRect();
                requestAnimationFrame(() => {
                  const { left: left2, top: top2 } = el.getBoundingClientRect();
                  el.animate(
                    [
                      { transform: `translate(${left1 - left2}px, ${top1 - top2}px)` },
                      { transform: "none" },
                    ],
                    options,
                  );
                });
              });

              const removedRects = removed.map(el => el.getBoundingClientRect());
              removed.forEach(el => {
                el.style.transform = "none";
                el.style.position = "absolute";
              });
              removed.forEach((el, i) => {
                const { left: left1, top: top1 } = removedRects[i]!;
                const { left: left2, top: top2 } = el.getBoundingClientRect();

                const a = el.animate(
                  [
                    { transform: `translate(${left1 - left2}px, ${top1 - top2}px)` },
                    {
                      opacity: 0,
                      transform: `translate(${left1 - left2}px, ${top1 - top2 + 36}px)`,
                    },
                  ],
                  options,
                );

                i === removed.length - 1 && a.finished.then(() => finishRemoved(removed));
              });
            },
          });
        })}
      </div>
    </>
  );
};

export default ListPage;
