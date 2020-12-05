'use strict';
function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
    var temp = this.template;
    var check = /{{[^{]*}}/g;
    var wordCheck = this.template.match(check);
    var before, key, after;
    for (var i = 0; i < wordCheck.length; i++) {
        before = wordCheck[i];
        key = before.replace("{{", "");
        key = key.replace("}}", "");
        after = dictionary[key] || "";
        temp = temp.replace(before, after);
    }
    return temp;
};