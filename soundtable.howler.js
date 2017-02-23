/**
 * # soundtable.howler.js
 * Uma mesa de som para gerenciar as instâncias de audio [Howler.js](https://github.com/goldfire/howler.js)
 * ### Metodos:
 * ``` javascript
 * Soundtable.addSound(String: name, HowlerParams: howler): void
 * Soundtable.addSoundCollection(Array: soundCollection): void
 * Soundtable.stopAllSounds(): void
 * Soundtable.iterate(Function(name, howl instance)): void
 * Soundtable.play(String: name, String: sprite): Howl
 * Soundtable.pause(String: name): void
 * Soundtable.stop(String: name): void
 * Soundtable.size(): int
 * ```
 */
(function (window) {

    /**
     * @prop {Object} howlSounds estrutura de armazenamento das instâncias de audio
     */
    var howlSounds = { };

    /**
     * @prop {int} totalSounds contador de audios
     */
    var totalSounds = 0;

    /**
     * addSound - adiciona um audio a mesa de audio
     *
     * @param  {String} name nome chave
     * @param  {HowlerParams} howl parametros de construtor de Howler
     * @return {void}
     */
    function addSound(name, howl) {
        howlSounds[name]=new Howl(howl);
        totalSounds++;
    }

    /**
     * unload - interrompe, descarrega e limpa um audio da memória
     *
     * @param  {String} name
     * @return {void}
     */
    function unload(name) {
        howlSounds[name].unload();
        howlSounds[name]=null;
    }
    
    /**
     * addSoundCollection - adiciona vários audios através de um array
     *      com a seguinte esturtura de dados:
     *      [{name:"teste",howl:"estrutuda de parametros do Howler"}]
     * @param  {Array} soundCollection colecao de audios com a estrutura = {name:"teste",howl:"estrutuda de parametros do Howler"}
     * @return {void}
     */

    function addSoundCollection(soundCollection) {
        for (var i in soundCollection) {
            if (soundCollection.hasOwnProperty(i)) {
                addSound(soundCollection[i].name,soundCollection[i].howl);
            }
        }
    }

    /**
     * play - aciona um audio carregado
     *
     * @param  {String} name  nome chave do audio
     * @param  {String} sprite  nome chave de sprite
     * @return {Howl} retorna uma instancia da classe Howl
     */

    function play(name, sprite) {
        if (howlSounds.hasOwnProperty(name)) {
            return howlSounds[name].play(sprite);
        }else{
            throw "Soundtable.play: audio \""+name+"não encontrado...";
        }
    }

    /**
     * pause - pausa um audio carregado
     *
     * @param  {String} name  nome chave do audio
     * @return {void}
     */
    function pause(name) {
        if (howlSounds.hasOwnProperty(name)) {
            howlSounds[name].pause();
        }else{
            throw "Soundtable.pause: audio \""+name+"não encontrado...";
        }
    }

    /**
     * stop - interrompe um audio carregado
     *
     * @param  {String} name  nome chave do audio
     * @return {void}
     */
    function stop(name) {
        if (howlSounds.hasOwnProperty(name)) {
            howlSounds[name].stop();
        }else{
            throw "Soundtable.stop: audio \""+name+"não encontrado...";
        }
    }

    /**
     * iterate - funcao de iteracao pelos audios carregados
     *
     * @param  {Function} fun function(name, howl instance)
     * @return {void}
     */
    function iterate(fun) {
        for (var i in howlSounds) {
            if (howlSounds.hasOwnProperty(i)) {
                fun(i, howlSounds[i]);
            }
        }
    }

    /**
     * stopAllSounds - interrompe todos os audios carregados pela Soundtable.
     *
     * @return {void}
     */

    function stopAllSounds() {
        iterate(function (i, instance) {
            instance.stop();
        });

    }

    /**
     * size - retorna quantos audios foram carregados
     *
     * @return {int}
     */
    function size() {
        return totalSounds;
    }

    /**
     *  Soundtable - objeto singleton para gerenciamento de audios
     *  @class {Soundtable} Soundtable: tornando global o uso da soundtable
     */
    window.Soundtable = window.Soundtable || {
        addSound: addSound,
        addSoundCollection: addSoundCollection,
        stopAllSounds: stopAllSounds,
        iterate: iterate,
        play: play,
        size: size
    };
})(window);
