# React + Vite + Jest

- First of all, we have to install Jest and its types as development dependecies:

```bash
npm install -D jest @types/jest
```

<br>

- Second, let's intall React Testing Library:

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

<br>

- Next, we need to install jest-environment-jsdom **if you're using Jest28 or later** and ts-jest **instead of babel for JavaScript projects**

```bash
npm install -D jest-environment-jsdom ts-jest
```

<br>

- Then, create a **jest.config.js** file in the root of your project and add the following code:

```javascript
// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
```

You can also put this code inside a **jest** property in the **package.json**

<br>

- Then, create a **jest.setup.ts** file in the root of your project and add the following code, this will make sure that the Jest environment is set up correctly:

```typescript
// jest.setup.ts
import '@testing-library/jest-dom'
```

<br>

- Vite create 3 tsconfig files, I prefer to have 1 tsconfig, but this is optional, you only need to add 2 lines of code to your **tsconfig.app.json** and **tsconfig.json** or delete them if you wanna have only one tsconfig file:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "esModuleInterop": true, // add this line

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Aliases */
    "baseUrl": "./src",
    "paths": { "@/*": ["./*"] }
  },

  "include": ["src", "vite.config.ts", "jest.setup.ts"] // add this line
}
```

<br>

- As you can see, in our tsconfig.json file we've added the esModuleInterop option and Aliases to have a better experience.

  Now, we add types for Node to use the alias in our project:

```bash
npm install -D @types/node
```

- Add this in **vite.config.ts**:

```typescript
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /* For Aliases */
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

<br>

- Then, we need to add a linter to our project

```bash
npm install -D eslint-plugin-jest-dom eslint-plugin-testing-library
```

- Add this to your **eslint.config.js**:

```javascript
{
  // ....
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // Add these lines
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended'
  ],
  // ....
}
```

<br>

- Finally, we need to add a script to our **package.json** file:

```json
  "scripts": {
    // ....
    "test": "jest",
    "test:watch": "jest --watchAll=true", // realtime
  },
```

- Run your tests with `npm run test`

<br>

## Optional

- For SVG and CSS Modules, you should add these libraries:

```bash
npm install -D identity-obj-proxy jest-transformer-svg
```

- Then, modify your **jest.config.js**:

```javascript
// jest.config.js
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',

    // Add these lines
    '^.+\\.svg$': 'jest-transformer-svg',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
```
