// import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const tailwindMerge = extendTailwindMerge<'mb-radius' | 'mb-fonts'>({
  extend: {
    theme: {
      spacing: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    classGroups: {
      'mb-radius': [{ rounded: ['none', 's', 'm', 'full'] }],
      'mb-fonts': [
        'mb-font-label-s',
        'mb-font-label-m',
        'mb-font-label-l',
        'mb-font-label-xl',
        'mb-font-placeholder',
        'mb-font-paragraph-m',
        'mb-font-paragraph-l',
        'mb-font-h4',
        'mb-font-h3',
        'mb-font-h2',
        'mb-font-h1',
      ],
    },
  },
});
