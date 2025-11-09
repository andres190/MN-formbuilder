import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, PropsWithChildren } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '9999px',
  padding: '0.5rem 1.5rem',
  fontSize: '0.9rem',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'filter 0.2s ease'
};

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: '#0f172a',
    color: '#ffffff'
  },
  secondary: {
    backgroundColor: '#ffffff',
    color: '#1e293b',
    border: '1px solid #cbd5f5'
  }
};

const hoverStyle: CSSProperties = {
  filter: 'brightness(0.92)'
};

function buildStyle(variant: ButtonVariant, custom?: CSSProperties): CSSProperties {
  return {
    ...baseStyle,
    ...variantStyles[variant],
    ...custom
  };
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  style?: CSSProperties;
}

export function Button({ variant = 'primary', style, onMouseEnter, onMouseLeave, ...props }: ButtonProps) {
  const computed = buildStyle(variant, style);

  return (
    <button
      {...props}
      style={computed}
      onMouseEnter={(event) => {
        event.currentTarget.style.filter = hoverStyle.filter ?? '';
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.filter = '';
        onMouseLeave?.(event);
      }}
    />
  );
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  style?: CSSProperties;
}

export function ButtonLink({ variant = 'primary', style, onMouseEnter, onMouseLeave, children, ...props }: PropsWithChildren<ButtonLinkProps>) {
  const computed = buildStyle(variant, {
    textDecoration: 'none',
    ...style
  });

  return (
    <a
      {...props}
      style={computed}
      onMouseEnter={(event) => {
        event.currentTarget.style.filter = hoverStyle.filter ?? '';
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.filter = '';
        onMouseLeave?.(event);
      }}
    >
      {children}
    </a>
  );
}
