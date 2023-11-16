'use client';

import { sva } from '@styled-system/css';
import { DOMAttributes, forwardRef, MutableRefObject, ReactNode, useCallback, useRef, useState } from 'react';

import { useClickAway, useMergeRefs } from '@/hooks';
import { createContextAndHook, createStyleContext, passCallbackIfTrue, runIfFn, throwError } from '@/utils';

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

export const dropdownVariants = sva({
  slots: ['root', 'list', 'listItemGroup', 'listItem'],
  base: {
    root: {
      position: 'relative',
    },
    list: {
      visibility: 'hidden',
      position: 'absolute',
      left: 0,
      zIndex: 10,
      mt: 2,
      display: 'flex',
      w: 'fit-content',
      minW: '10px',
      flexDirection: 'column',
      gap: 1,
      borderRadius: 'lg',
      border: '1px solid',
      borderColor: 'gray.100',
      bg: 'white',
      py: 2,
      textAlign: 'left',
      boxShadow: 'lg',
      '&[data-expanded="true"]': {
        visibility: 'visible',
      },
    },
    listItemGroup: {},
    listItem: {},
  },
  variants: {
    size: {
      sm: { list: {}, listItemGroup: {}, listItem: { fontSize: 'sm' } },
      md: { list: {}, listItemGroup: {}, listItem: { fontSize: 'md' } },
      lg: { list: {}, listItemGroup: {}, listItem: { fontSize: 'lg' } },
    },
  },
});

const { withProvider, withContext } = createStyleContext(dropdownVariants);

const Root = withProvider('div', 'root');
const List = withContext('ul', 'list');
const ListItem = withContext('li', 'listItem');

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
export const DropdownRoot = (props: DropdownProps) => {
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
      <Root>{runIfFn(children, { triggerRef, isOpen, onClose, onOpen, onToggle })}</Root>
    </DropdownProvider>
  );
};
DropdownRoot.displayName = 'Dropdown';

export interface DropdownTriggerProps extends DOMAttributes<HTMLButtonElement> {
  className?: string | undefined;
  children: ReactNode;
}

export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>((props, ref) => {
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

export interface DropdownListProps extends DOMAttributes<HTMLUListElement> {
  className?: string | undefined;
  children?: ReactNode;
}
export const DropdownList = forwardRef<HTMLUListElement, DropdownListProps>((props, ref) => {
  const { children } = props;
  const { menuListRef, isOpen } = useDropdownContext();
  const refs = useMergeRefs(ref, menuListRef);

  return (
    <List data-expanded={isOpen} ref={refs}>
      {children}
    </List>
  );
});
DropdownList.displayName = 'DropdownList';

export interface DropdownListItemProps extends DOMAttributes<HTMLLIElement> {
  className?: string | undefined;
  children?: ReactNode;
}
export const DropdownListItem = forwardRef<HTMLLIElement, DropdownListItemProps>((props, ref) => {
  const { children } = props;
  const { shouldCloseOnSelect, onClose } = useDropdownContext();

  return (
    <ListItem ref={ref} onClickCapture={passCallbackIfTrue(shouldCloseOnSelect, onClose)}>
      {children}
    </ListItem>
  );
});
DropdownListItem.displayName = 'DropdownListItem';

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  List: DropdownList,
  ListItem: DropdownListItem,
};
