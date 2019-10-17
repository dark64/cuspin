# cuspin
> Minimal JavaScript Event Manager

## Install

```bash
npm install cuspin
```

## Usage

```javascript
import { subscribe, subscribeOnce, emit } from 'cuspin';

// subscribe to an event
subscribe('example', (args) => {
    console.log(args)
})

// subscribe once to an event
subscribeOnce('example', (args) => {
    console.log(args);
})

// emit event
emit('example', 'Hello world!');
emit('example', { message: 'Hello world!' });
emit('example', ['Hello', 'world!']);
```
