export interface UseComponentStateProps {
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadonly?: boolean;
}

export default function useComponentState(props: UseComponentStateProps) {
  const { isDisabled, isInvalid, isReadonly, isRequired } = props;

  return {
    disabled: isDisabled,
    readOnly: isReadonly,
    required: isRequired,
    'aria-invalid': isInvalid,
    'aria-required': isRequired,
    'aria-readonly': isReadonly,
    'aria-disabled': isDisabled,
  };
}
