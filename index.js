'use strict'

const $separator =  (require('commandseparatorrc')).base;


const commandBase = function(){
    /*
     * @param {array}
     * @public
     *
     */
     this.on = function (commandArray) { // ? on 
         return false;
     }
    /*
     * @param {string}
     * @public
     * @return {void}
     *
     */
     this.run = async function (command) {
         for (let i of _separator(command)) 
             if (typeof _container.commands[i[0] !== "undefined")
                 await _container.commands[i[0](i);
    };
    /*
     * @param {string}||{array}
     * @param {function}
     * @param {object}
     * @public
     *
     */
    this.add = function (command, call, help) {
            if (Object.prototype.toString.call(command) === '[object Array]') {
                for (let i of command)
                    _addOne(command[i], call, help);
            } else if (typeof command === "string") {
                _addOne(command, call, help);
            }
    };
    /*
     *
     * @param {string}
     * @param {function}
     * @param {object}
     * @public
     *
     */
    this.addOne = function (command, call, help) {
        return  _addOne(command, call, help);
    };
    /*
     *
     * @public
     *
     */
    this.watch = function (input) {
        if (line.text === '')
            return '';
        return _make(
            _looking(input));
    };
    /*
     *
     * @param {string}
     * @param {function}
     * @param {object}
     * @private
     *
     */
    let _addOne = function (command, call, help) {
            if (
                (typeof command === 'undefined')||
                (typeof call === 'undefined')
            )
                return false;
            if (typeof _container.commands[command] !== 'undefined')
                return false;
            _container.commands[command] = call;
            if (typeof help === 'undefined')
                help = {};
            _container.helper[command] = help;
    };
    /*
     * 
     * @private
     * @var {dictonary}
     *
     */
    let _container = {
        helper: {},
        commands: {}
    };
    /*
     * 
     * @private
     *
     */
    const _separator = $eparator;
    /*
     * @param {string}
     * @private
     * @return {array}
     *
     */
    const _looking = function (input) {
        let separated = _separator(input),
            tags = container.helper,
            out = [];
        separated = separated[separated.length - 1];
        if (typeof separated === 'undefined')
            return false;
        for (let i = 0; separated.length > i; i++) {
            if (i !== separated.length - 1) {
                if (typeof tags[separated[i]] === 'undefined')
                    return false;
                tags = tags[separated[i]];
            } else {
                 out = _filter(tags, separated[i]);
            }
        }
        return out;
    };
    /*
     * @param {array}
     * @param {string}
     * @private
     * @retutrn {array}
     */
    const _filter = function (tags, separated) {
        let out = [];
        if (separated === '') {
            for (let I in tags)
                out.push(I);
        } else {
            for (let I in tags)
                if (I.indexOf(separated) == 0)
                    out.push(I);
        }
        return out;
    };
    /*
     *
     * @private
     * @return {string}
     */
    const _make = function (input) {
        let out = '',
            elementsNumber = 0;
        for (let i in input) {
            if (elementsNumber < 6)
                out += input[i] + ' ';
        }
        return out;
    };
};

exports.commandBase = commandBase;
