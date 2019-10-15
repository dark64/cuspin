# cuspin
> Minimal JavaScript Event Manager

## Install

```bash
npm install cuspin
```

## Usage example

```javascript
import { subscribe, emit } from "cuspin";

// subscribe to en event
subscribe('example', (args) => {
    console.log(args)
})

// emit event
emit('example', 'Hello world!');
```