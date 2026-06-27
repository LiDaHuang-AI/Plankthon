'use client';

import * as React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

import {
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
  type ThemeSelection,
  type Resolved,
} from './theme-toggler-primitive';
import { useAppContext } from '@/app/ClientProvider';
import clsx from 'clsx';
const cn = clsx;

const getIcon = (
  effective: ThemeSelection,
  resolved: Resolved,
  modes: ThemeSelection[],
) => {
  const theme = modes.includes('system') ? effective : resolved;
  return theme === 'system' ? (
    <Monitor className="size-4" />
  ) : theme === 'dark' ? (
    <Moon className="size-4" />
  ) : (
    <Sun className="size-4" />
  );
};

const getNextTheme = (
  effective: ThemeSelection,
  modes: ThemeSelection[],
): ThemeSelection => {
  const i = modes.indexOf(effective);
  if (i === -1) return modes[0];
  return modes[(i + 1) % modes.length];
};

type ThemeTogglerButtonProps = React.ComponentProps<'button'> & {
    modes?: ThemeSelection[];
    onImmediateChange?: ThemeTogglerPrimitiveProps['onImmediateChange'];
    direction?: ThemeTogglerPrimitiveProps['direction'];
  };

function ThemeTogglerButton({
  modes = ['light', 'dark'],
  direction = 'ltr',
  onImmediateChange,
  onClick,
  className,
  ...props
}: ThemeTogglerButtonProps) {
  const { state, updateState } = useAppContext();
  
  if (!state) return null;
  const theme = state.settings.theme as ThemeSelection;
  const resolvedTheme = theme as Resolved;
  const setTheme = (val: ThemeSelection) => {
    updateState(prev => ({
      ...prev,
      settings: { ...prev.settings, theme: val as any }
    }));
  };

  return (
    <ThemeTogglerPrimitive
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ effective, resolved, toggleTheme }) => (
        <button
          data-slot="theme-toggler-button"
          className={cn("p-2 rounded-full bg-surface-2 border border-border shadow hover:brightness-110 transition-all outline-none", className)}
          onClick={(e) => {
            onClick?.(e);
            toggleTheme(getNextTheme(effective, modes), e);
          }}
          {...props}
        >
          {getIcon(effective, resolved, modes)}
        </button>
      )}
    </ThemeTogglerPrimitive>
  );
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };
