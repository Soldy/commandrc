'use strict'

const separatorBase =  (require('commandseparatorrc')).separatorBase;


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
     this.run = function (command) {
         let commandAr = separator(command);
              for (var i = 0; commandAr.length > i; i++) {
                   if (typeof container.commands[commandAr[i][0]] !== "undefined"){
                       return container.commands[commandAr[i][0]](commandAr[i]);
                  }
            }
    };
    /*
     * @param {string}||{array}
     * @param {function}
     * @param {object}
     * @public
     *
     */
    this.add=function (command, call, help) {
            if (Object.prototype.toString.call(command) === '[object Array]') {
                for (var i = 0; command.length > i; i++)
                    addOne(command[i], call, help);
            } else if (typeof command === "string") {
                addOne(command, call, help);
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
    this.addOne=function (command, call, help) {
        return  addOne(command, call, help);
    };
    /*
     *
     * @public
     *
     */
    this.watch = function (input) {
        if (line.text === '')
            return '';
        return make(looking(input));
    };
    /*
     *
     * @param {string}
     * @param {function}
     * @param {object}
     * @private
     *
     */
    let addOne=function (command, call, help) {
            if (
                (typeof command === 'undefined')||
                (typeof call === 'undefined')
            )
                return false;
            if (typeof container.commands[command] !== 'undefined')
                return false;
            container.commands[command] = call;
            if (typeof help === 'undefined')
                help = {};
            container.helper[command] = help;
    };
    /*
     * 
     * @private
     *
     */
    let container = {
        helper: {},
        commands: {}
    };
    /*
     * 
     * @private
     *
     */
    let separator = separatorBase;
    /*
     * 
     * @private
     *
     */
    let looking = function (input) {
        let separated = separator(input),
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
                 out = filter(tags, separated[i]);
            }
        }
        return out;
    };
    /*
     *
     * @private
     * @retutrn {array}
     */
    let filter = function (tags, separated) {
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
     * @@return {string}
     */
    let make = function (input) {
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
