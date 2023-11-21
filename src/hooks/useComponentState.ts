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
    'aria-invalid': isInvalid || undefined,
    'aria-required': isRequired || undefined,
    'aria-read-only': isReadonly || undefined,
    'aria-disabled': isDisabled || undefined,

    'data-invalid': isInvalid || undefined,
    'data-required': isRequired || undefined,
    'data-read-only': isReadonly || undefined,
    'data-disabled': isDisabled || undefined,
  };
}
