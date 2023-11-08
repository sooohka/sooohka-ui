export interface UseComponentStateProps {
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

export default function useComponentState(props: UseComponentStateProps) {
  const { isDisabled, isInvalid, isReadOnly, isRequired } = props;

  return {
    invalid: isInvalid,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    'aria-invalid': isInvalid,
    'aria-required': isRequired,
    'aria-readonly': isReadOnly,
    "aria-disabled": isDisabled,
  };
}
