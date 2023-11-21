import { isFunction, omit } from "lodash";
import { createElement, ElementType, forwardRef, Fragment, Ref } from "react";

import { DEFAULT_CHILD_TAG } from "./conts";

/**
 * This is a hack, but basically we want to keep the full 'API' of the component, but we do want to
 * wrap it in a forwardRef so that we _can_ passthrough the ref
 */
export function forwardRefWithAs<
  T extends { name: string; displayName?: string }
>(component: T): T & { displayName: string } {
  return Object.assign(forwardRef(component as unknown as any) as any, {
    displayName: component.displayName ?? component.name,
  });
}

function render<TTag extends ElementType, TSlot>(
  props: AS.Props<TTag>,
  slot: TSlot,
  tag: ElementType
) {
  const { as: Component = tag, children, refName = "ref", ...rest } = props;

  const refRelatedProps =
    props.ref !== undefined ? { [refName]: props.ref } : {};

  const resolvedChildren = isFunction(children)
    ? children(slot || {})
    : children;

  const dataAttributes: Record<string, string> = {};

  return createElement(
    Component,
    Object.assign(
      {},
      omit(rest, ["ref"]),
      Component !== Fragment && refRelatedProps,
      Component !== Fragment && dataAttributes
    ),
    resolvedChildren
  );
}

function ASWrapper<TTag extends ElementType = AS.DefaultTag>(
  props: AS.Props<TTag>,
  ref: Ref<HTMLElement>
) {
  const renderProps = { ...props, ref };
  return render(renderProps, {}, DEFAULT_CHILD_TAG);
}

/**
 * 替换包裹组件
 * @returns
 */
export const AS = forwardRefWithAs(ASWrapper);

AS.displayName = "AS";
