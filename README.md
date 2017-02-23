# soundtable.howler.js
Uma mesa de som para gerenciar as instâncias de audio [Howler.js](https://github.com/goldfire/howler.js)


### Metodos:
``` javascript
Soundtable.addSound(String: name, HowlerParams: howler): void
Soundtable.addSoundCollection(Array: soundCollection): void
Soundtable.stopAllSounds(): void
Soundtable.iterate(Function(name, howl instance)): void
Soundtable.play(String: name, String: sprite): Howl
Soundtable.pause(String: name): void
Soundtable.stop(String: name): void
Soundtable.size(): int
```
