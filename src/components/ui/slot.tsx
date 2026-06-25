import * as React from 'react';

export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  (props, ref) => {
    const { children, ...slotProps } = props;
    
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...slotProps,
        ...(children.props as any),
        ref: (node: HTMLElement) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement>).current = node;
          
          const childRef = (children as any).ref;
          if (typeof childRef === 'function') childRef(node);
          else if (childRef) childRef.current = node;
        },
        style: {
          ...slotProps.style,
          ...(children.props as any).style,
        },
        className: [slotProps.className, (children.props as any).className].filter(Boolean).join(' '),
      } as any);
    }
    
    return null;
  }
);
Slot.displayName = 'Slot';
