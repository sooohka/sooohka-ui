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
    ['read-only']: isReadonly,
    required: isRequired,
    invalid: isInvalid,
    'data-invalid': isInvalid || undefined,
    'data-required': isRequired || undefined,
    'data-read-only': isReadonly || undefined,
    'data-disabled': isDisabled || undefined,
  };
}
