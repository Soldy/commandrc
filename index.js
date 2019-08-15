
exports.command = function(){
     this.on = function (commandArray) { // ? on 
         return false;
     }
     this.run = function (command) {
         let commandAr = separator(command);
              for (var i = 0; commandAr.length > i; i++) {
                   if (typeof container.commands[commandAr[i][0]] !== "undefined"){
                       return container.commands[commandAr[i][0]](commandAr[i]);
                  }
            }
    };
    this.add=function (command, call, help) {
            if (Object.prototype.toString.call(command) === "[object Array]") {
                for (var i = 0; command.length > i; i++)
                    this.addOne(command[i], call, help);
            } else if (typeof command === "string") {
                this.addOne(command, call, help);
            }
    };
    this.addOne=function (command, call, help) {
            if (
                (typeof command === "undefined")||
                (typeof call === "undefined")
            )
                return false;
            if (typeof container.commands[command] !== "undefined")
                return false;
            container.commands[command] = call;
            if (typeof help === "undefined")
                help = {};
            container.helper[command] = help;
    };
    this.watch = function (input) {
        if (line.text === "")
            return "";
        return make(looking(input));
    };
    var container = {
            helper: {},
            commands: {}
    };
    var separator=function (command) {
        command = command.toString().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ");
        let  commands = [],
            commandi = 0,
            commandit = 0,
            mod = 0,
            modSelector = "";
        for (let i = 0; command.length > i; i++) {
            if (typeof commands[commandi] === "undefined")
                commands[commandi] = [];
            if (typeof commands[commandi][commandit] === "undefined")
                commands[commandi][commandit] = "";
            if (mod === 0) {
                if (command.charAt(i) === ";") {
                    commandi++;
                    commandit = 0;
                } else if (command.charAt(i) === "\\") {
                    mod = 2;
                } else if (command.charAt(i) === "'") {
                    mod = 1;
                    modSelector = "'";
                } else if (command.charAt(i) === "\"") {
                    mod = 1;
                    modSelector = "\"";
                } else if (
                    (command.charAt(i) === " ") || (command.charAt(i) === "\t")) {
                    if (
                        (i > 0) && (command.charAt(i - 1) !== " ") && 
                        (command.charAt(i - 1) !== "\t") && 
                        (command.charAt(i - 1) !== ";") && 
                        (command.charAt(i - 1) !== "'") && 
                        (command.charAt(i - 1) !== "\""))
                        commandit++;
                } else {
                    commands[commandi][commandit] += command.charAt(i);
                }
            } else if (mod === 1) {
                if (command.charAt(i) === modSelector) {
                    mod = 0;
                } else {
                    commands[commandi][commandit] += command.charAt(i);
                }
            } else if (mod === 2) {
                commands[commandi][commandit] += command.charAt(i);
                mod = 0;
            }
        }
        return commands;
    };
    var looking = function (input) {
        let separated = separator(input),
            tags = container.helper,
            out = [];
        separated = separated[separated.length - 1];
        if (typeof separated === "undefined")
            return false;
        for (var i = 0; separated.length > i; i++) {
            if (i !== separated.length - 1) {
                if (typeof tags[separated[i]] === "undefined")
                    return false;
                tags = tags[separated[i]];
            } else {
                out = filter(tags, separated[i]);
            }
        }
        return out;
    };
    var filter = function (tags, separated) {
        let out = [];
        if (separated === "") {
            for (let I in tags)
                out.push(I);
        } else {
            for (let I in tags)
                if (I.indexOf(separated) == 0)
                    out.push(I);
        }
        return out;
    };
    var make = function (input) {
        var out = "",
            elementsNumber = 0;
        for (var i in input) {
            if (elementsNumber < 6)
                out += input[i] + " ";
        }
        return out;
    };
};
