import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const inputClasses = [
      'input',
      error ? 'input-error' : '',
      fullWidth ? 'input-full-width' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={`input-wrapper ${fullWidth ? 'input-wrapper-full-width' : ''}`}>
        {label && (
          <label className="input-label" htmlFor={props.id}>
            {label}
            {props.required && <span className="input-required">*</span>}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
