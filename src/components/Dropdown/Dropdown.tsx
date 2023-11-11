'use client';
import { DOMAttributes, forwardRef, MutableRefObject, ReactNode, useCallback, useRef, useState } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import { useClickAway, useMergeRefs } from '@/hooks';
import { createContextAndHook, runIfFn, throwError } from '@/utils';

import { Button } from '../Button';

type DropdownContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  menuListRef: MutableRefObject<HTMLUListElement | null>;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
};

const [DropdownProvider, useDropdownContext] = createContextAndHook<DropdownContextType>({
  isOpen: false,
  onOpen: () => {
    throwError();
  },
  onClose: () => {
    throwError();
  },
  menuListRef: { current: null },
  triggerRef: { current: null },
});

const dropdownVariants = tv({});

interface T {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
export interface DropdownProps {
  children: ((props: T) => ReactNode) | ReactNode;
}

const Dropdown = (props: DropdownProps) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const menuListRef = useRef<HTMLUListElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  //TODO: do uncontrolled
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickAway({ enabled: isOpen, refs: [menuListRef, triggerRef], callback: onClose });
  return (
    <DropdownProvider value={{ isOpen, menuListRef, triggerRef, onOpen, onClose }}>
      {runIfFn(children, { isOpen, onClose, onOpen })}
    </DropdownProvider>
  );
};

export interface DropdownTriggerProps extends DOMAttributes<HTMLButtonElement>, VariantProps<typeof dropdownVariants> {
  className?: string | undefined;
  children: ReactNode;
}

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>((props, ref) => {
  const { children } = props;
  const { triggerRef, onOpen } = useDropdownContext();
  const refs = useMergeRefs(ref, triggerRef);

  return (
    <Button ref={refs} onClick={onOpen}>
      {children}
    </Button>
  );
});

export interface DropdownListProps extends DOMAttributes<HTMLUListElement>, VariantProps<typeof dropdownVariants> {
  className?: string | undefined;
}
const DropdownList = forwardRef<HTMLUListElement, DropdownListProps>((props, ref) => {
  const {} = props;
  const { menuListRef, isOpen } = useDropdownContext();
  const refs = useMergeRefs(ref, menuListRef);

  return <ul data-open={isOpen} className="invisible h-4 w-4 bg-red-100 data-[open='true']:visible" ref={refs}></ul>;
});

export interface DropdownListItemGroupProps
  extends DOMAttributes<HTMLLIElement>,
    VariantProps<typeof dropdownVariants> {
  className?: string | undefined;
}
const DropdownListItemGroup = forwardRef<HTMLLIElement, DropdownListItemGroupProps>((props, ref) => {
  const {} = props;

  return (
    <li ref={ref}>
      <ul></ul>
    </li>
  );
});

export interface DropdownListItemProps extends DOMAttributes<HTMLLIElement>, VariantProps<typeof dropdownVariants> {
  className?: string | undefined;
}
const DropdownListItem = forwardRef<HTMLLIElement, DropdownListItemProps>((props, ref) => {
  const {} = props;
  return <li ref={ref}></li>;
});

export { Dropdown, DropdownList, DropdownListItem, DropdownListItemGroup, DropdownTrigger };
