const baseConfig = {
  id: {
    size: 'small',
    placeholder: 'UserName',
  },
  password: {
    size: 'small',
    placeholder: 'Password',
    type: 'password',
  },
  email: {
    size: 'small',
    placeholder: 'Email',
  },
  name: {
    size: 'small',
    placeholder: 'Full name',
  },
} as const;

type EventType = React.ChangeEvent<HTMLInputElement>;

type Props = {
  size: 'small';
  placeholder: string;
  error: boolean;
  helperText: string;
  onChange: (e: EventType) => void;
};

export const getProps = (
  type: keyof typeof baseConfig,
  handleChange: (e: EventType, name: string) => void,
  validation = { [type]: '' }
): Props => {
  if (baseConfig[type]) {
    return {
      ...baseConfig[type],
      error: !!validation[type],
      helperText: validation[type],
      onChange: (e: EventType) => handleChange(e, type),
    };
  }

  return {
    size: 'small',
    placeholder: '',
    error: false,
    helperText: '',
    onChange: (e: EventType) => handleChange(e, ''),
  };
};
