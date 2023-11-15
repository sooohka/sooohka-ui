//@ts-check
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];
const rootPath = process.env.PWD;

const componentFolderPath = path.resolve(rootPath ?? '', `src/components/${componentName}`);

function colorRed(string) {
  return `\x1b[31m ${string}\x1b[0m`;
}
function colorGreen(string) {
  return `\x1b[32m ${string}\x1b[0m`;
}

function check() {
  if (!componentName) {
    throw new Error(colorRed('🚨componentName is not provided'));
  }
  if (!rootPath) {
    throw new Error(colorRed('🚨rootPath is not defined'));
  }
  if (componentFolderPath.includes('.')) {
    throw new Error(colorRed('🚨componentName should not include "."'));
  }
  if (fs.existsSync(componentFolderPath)) {
    throw new Error(colorRed(`🚨component is already exists in path ${componentFolderPath}`));
  }
}

function create() {
  const storybookTemplate = `import type { Meta, StoryObj } from '@storybook/react';

import ${componentName} from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  component: ${componentName},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Basic: Story = {
  args: {},
  render: (args) => <${componentName} {...args} />,
};
`;
  const componentTemplate = `'use client';
import { DOMAttributes, forwardRef } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const ${componentName.toLocaleLowerCase()}Variants = tv({
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
});

export interface ${componentName}Props
  extends Omit<DOMAttributes<HTMLDivElement>, 'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur'>,
    VariantProps<typeof ${componentName.toLocaleLowerCase()}Variants> {
  className?: string | undefined;
}

const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>((props, ref) => {
  const { className, size = 'md', ...rest } = props;
  return <div ref={ref} className={container({ size, className })} {...rest}></div>;
});
${componentName}.displayName = '${componentName}';

export default ${componentName};
    `;
  const indexTemplate = `export { default as ${componentName} } from './${componentName}';`;
  fs.mkdirSync(componentFolderPath);
  fs.writeFileSync(`${componentFolderPath}/${componentName}.stories.tsx`, storybookTemplate);
  console.log(
    colorGreen(`✅ ${componentName}.stories.tsx is created in ${componentFolderPath}/${componentName}.stories.tsx`),
  );
  fs.writeFileSync(`${componentFolderPath}/${componentName}.tsx`, componentTemplate);
  console.log(colorGreen(`✅ ${componentName}.tsx is created in ${componentFolderPath}/${componentName}.tsx`));
  fs.writeFileSync(`${componentFolderPath}/index.ts`, indexTemplate);
  console.log(colorGreen(`✅ index.ts is created in ${componentFolderPath}/index.ts`));
  fs.appendFileSync(`${rootPath}/src/components/index.ts`, `export * from './${componentName}';`);
  console.log(colorGreen(`✅ ${componentName} is exported in ${rootPath}/src/components/index.ts`));
}

function run() {
  //발리데이션
  check();
  create();
}
run();
