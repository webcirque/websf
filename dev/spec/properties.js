// Init a closure
const Properties = (function () {
    return {
        Editor: function (text) {
            this.language = null;
            this.data = [];
            this.text = text || "";
            this.import = {
                yaml: () => {
                    
                }, 
                lang: (text) => {
                    return new Promise(function (resolve, reject) {
                        let editor = new Properties.Editor(text);
                        editor.language = "yaml";
                        editor.data = [new Properties.DataTab];
                        let content = text.split("\n");
                        //First pass: split all names and values
                        content.forEach((e, i, a) => {
                            if (e.trimLeft().slice(0,2) != "//") {
                            let name = "";
                            let value = "";
                            let valueArea = false;
                            let commentArea = [];
                            let comment = false;
                            Array.from(e.trimLeft).forEach((e, i) => {
                                if (e == "=") {
                                    valueArea = true;
                                } else if (e == "/") {
                                    commentArea.push(i);
                                    if (commentArea.indexOf(i - 1) != -1) {
                                        comment = true;
                                    }
                                } else {
                                    if (valueArea) {
                                        if (!(comment)) {
                                            value += e;
                                        }
                                    } else {
                                        name += e;
                                    }
                                };
                            });
                            a[i] = [name, value];
                            }
                        });
                        debugger;
                        resolve(editor);
                    });
                },
                json: () => {
                    
                }
            };
            this.export = {
                yaml: () => {
                    
                }, 
                lang: () => {
                    return new Promise(function (resolve, reject) {
                        let string = "";
                        resolve(string);
                    });
                },
                json: () => {
                    
                }
            };
            this.namespaces = function () {
                let namespaces = [];
                this.data.forEach((e, i) => {
                    if (namespaces.indexOf(e.namespace) == -1) {
                        namespaces.push(e.namespace);
                    }
                });
                return namespaces;
            };
        },
        DataTab: function (namespace) {
            this.namespace = namespace;
            this.data = {};
        }
    }
})();
