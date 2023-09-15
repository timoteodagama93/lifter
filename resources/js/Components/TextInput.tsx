import classNames from 'classnames';
import React, { forwardRef } from 'react';

const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(
      'border-gray-300 text-gray-700 focus:border-red-500 dark:focus:border-red-600 focus:ring-red-500 dark:focus:ring-red-600 rounded-md shadow-sm',
      props.className,
    )}
  />
));

export default TextInput;
