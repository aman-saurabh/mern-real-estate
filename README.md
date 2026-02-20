![1.0.0](https://img.shields.io/badge/Version-1.0.0-brightgreen?style=for-the-badge)


# How to create a react app using vite
```
npm create vite@latest client
```
Here "client" is the directory name where react app will be created

# How to run client application
```
cd client
npm install
npm run dev
```

# How to install tailwind css using vite
You can google search - Install tailwind using vite
or, you can directly go to URL : 
https://v3.tailwindcss.com/docs/guides/vite

In this page you will see steps to install tailwind css using vite, which is as follows currently, but might change in future.

### Step 1: Command to install tailwind css and it's peer dependencies :
## npm install -D tailwindcss@3 postcss autoprefixer

### Step 2: Command to initialize tailwind css - It will generate your tailwind.config.js and postcss.config.js files
## npx tailwindcss init -p

### Step 3: Now delete content of tailwind.config.js and replace with the content given on this page i.e.
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 4: Now delete everything on page ./src/index.css and replace with given code i.e.
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 5: Run the react application
```
npm run dev
```