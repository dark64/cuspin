# cuspin
> Minimal JavaScript Event Manager

## Install

```bash
npm install cuspin
```

## Usage

```javascript
import { subscribe, emit } from "cuspin";

// subscribe to an event
subscribe('example', (args) => {
    console.log(args)
})

// emit event
emit('example', 'Hello world!');
```
