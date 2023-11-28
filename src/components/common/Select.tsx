import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode, useCallback } from "react";
import mapChildren from "@/utils/mapChildren";

export type BaseOption<V> = {
  label: ReactNode;
  value: V;
};
export type SelectProps<V, Option extends BaseOption<V>> = {
  children: ReactNode;
  options: Option[];
  active: Option["value"];
  renderItem?: (option: Option) => ReactNode;
  onSelect: (option: Option, event: Event) => void;
};

export function Select<V, Option extends BaseOption<V>>(
  props: SelectProps<V, Option>,
) {
  const { children, active, options, onSelect, renderItem } = props;

  const fixScrollPadding = () => {
    if (document.documentElement.classList.contains("scroll-padding")) {
      document.documentElement.classList.remove("scroll-padding");
    } else {
      document.documentElement.classList.add("scroll-padding");
    }
  };

  const _onSelect = useCallback(
    (option: Option) => {
      return (event: Event) => {
        onSelect(option, event);
      };
    },
    [onSelect],
  );

  return (
    <DropdownMenu.Root onOpenChange={fixScrollPadding}>
      <DropdownMenu.Trigger className="flex h-8 items-center rounded-md bg-transparent px-3 text-text-primary  hover:bg-gray-50 hover:text-slate-500 dark:text-slate-500 dark:hover:bg-gray-900 dark:hover:text-slate-400">
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="z-100 rounded-md border border-gray-100 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-900">
        {mapChildren(options, ({ item, key }) => (
          <DropdownMenu.Item
            key={key}
            onSelect={_onSelect(item)}
            className={`group flex h-8 cursor-pointer items-center space-x-4 rounded-md bg-transparent px-3 text-sm font-medium leading-none hover:outline-none ${
              active === item.value
                ? "bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50"
                : "text-slate-500 hover:bg-gray-50 hover:text-slate-600 dark:text-slate-400 dark:hover:bg-gray-900 dark:hover:text-slate-300"
            }`}
          >
            {renderItem ? renderItem(item) : item.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
