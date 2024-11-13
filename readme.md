# Three.js

## Setup
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## startup

```bash
# all in one command npx
NPX is installed with Node.js and NPM
npm allow us to ru  npm packages without having to create a progject and instal the dependebencies
npx create-react-app .
```

## startup from scratch
```bash
Create folder in place
in cmd terminal
>> npm init -y 
>> npm install react@18 react-dom@18.2 react-scripts@5.0

in package.json 
"scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
}
```

Create public folder

Create index.js in src folder
```bash
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

root.render(
    <h1>ashta 3lek</h1>
)

``` 