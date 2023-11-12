'use client';

import { DOMAttributes, forwardRef, MutableRefObject, ReactNode, useCallback, useRef, useState } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useClickAway, useMergeRefs } from '@/hooks';
import { createContextAndHook, passCallbackIfTrue, runIfFn, throwError } from '@/utils';

import { Button } from '../Button';

type DropdownContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  menuListRef: MutableRefObject<HTMLUListElement | null>;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
  shouldCloseOnOutsideClick: boolean;
  shouldCloseOnSelect: boolean;
};

const [DropdownProvider, useDropdownContext] = createContextAndHook<DropdownContextType>({
  isOpen: false,
  onOpen: () => {
    throwError();
  },
  onToggle: () => {
    throwError();
  },
  onClose: () => {
    throwError();
  },
  shouldCloseOnOutsideClick: true,
  shouldCloseOnSelect: true,
  menuListRef: { current: null },
  triggerRef: { current: null },
});

const dropdownVariants = tv({
  slots: {
    list: `invisible absolute left-0 z-10 mt-2 flex w-fit min-w-[10px] flex-col gap-1 rounded-lg border border-gray-100 bg-white py-2 text-left
    shadow-lg
    data-[open='true']:visible
    `,
    listItemGroup: '',
    listItem: '',
  },
  variants: {
    size: {
      sm: { list: '', listItemGroup: '', listItem: 'text-sm ' },
      md: { list: '', listItemGroup: '', listItem: 'text-sm ' },
      lg: { list: '', listItemGroup: '', listItem: 'text-sm ' },
    },
  },
});
const { list, listItem } = dropdownVariants();

interface T {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
}

export interface DropdownProps {
  children: ((props: T) => ReactNode) | ReactNode;
  shouldCloseOnOutsideClick?: boolean;
  shouldCloseOnSelect?: boolean;
}
/**
 * @argument shouldCloseOnSelect - if true, dropdown will close when user clicks on a dropdown item
 * @argument shouldCloseOnOutsideClick - if true, dropdown will close when user clicks outside of dropdown
 */
const Dropdown = (props: DropdownProps) => {
  const { children, shouldCloseOnOutsideClick = true, shouldCloseOnSelect = true } = props;
  const [isOpen, setIsOpen] = useState(false);
  const menuListRef = useRef<HTMLUListElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useClickAway({ enabled: shouldCloseOnOutsideClick && isOpen, refs: [menuListRef, triggerRef], callback: onClose });
  return (
    <DropdownProvider
      value={{
        isOpen,
        menuListRef,
        triggerRef,
        onOpen,
        onToggle,
        shouldCloseOnOutsideClick,
        shouldCloseOnSelect,
        onClose,
      }}
    >
      <div className="relative">{runIfFn(children, { triggerRef, isOpen, onClose, onOpen, onToggle })}</div>
    </DropdownProvider>
  );
};
Dropdown.displayName = 'Dropdown';

export interface DropdownTriggerProps extends DOMAttributes<HTMLButtonElement>, VariantProps<typeof dropdownVariants> {
  className?: string | undefined;
  children: ReactNode;
}

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>((props, ref) => {
  const { children } = props;
  const { triggerRef, onToggle } = useDropdownContext();
  const refs = useMergeRefs(ref, triggerRef);

  return (
    <Button ref={refs} onClick={onToggle}>
      {children}
    </Button>
  );
});
DropdownTrigger.displayName = 'DropdownTrigger';

export interface DropdownListProps extends DOMAttributes<HTMLUListElement>, VariantProps<typeof dropdownVariants> {
  className?: string | undefined;
  children?: ReactNode;
}
const DropdownList = forwardRef<HTMLUListElement, DropdownListProps>((props, ref) => {
  const { children } = props;
  const { menuListRef, isOpen } = useDropdownContext();
  const refs = useMergeRefs(ref, menuListRef);

  return (
    <ul data-open={isOpen} className={list()} ref={refs}>
      {children}
    </ul>
  );
});
DropdownList.displayName = 'DropdownList';

export interface DropdownListItemProps extends DOMAttributes<HTMLLIElement>, VariantProps<typeof dropdownVariants> {
  className?: string | undefined;
  children?: ReactNode;
}
const DropdownListItem = forwardRef<HTMLLIElement, DropdownListItemProps>((props, ref) => {
  const { children } = props;
  const { shouldCloseOnSelect, onClose } = useDropdownContext();
  return (
    <li ref={ref} className={listItem()} onClickCapture={passCallbackIfTrue(shouldCloseOnSelect, onClose)}>
      {children}
    </li>
  );
});
DropdownListItem.displayName = 'DropdownListItem';

export { Dropdown, DropdownList, DropdownListItem, DropdownTrigger };
