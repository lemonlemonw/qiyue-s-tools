function picktool(toolId) {
    if (toolId == null) {
        toolId = 'jsontool';
    }

    // 取消之前选中工具的高亮
    var prePickedToolId = localStorage.getItem('curtool');
    if (prePickedToolId != null) {
        document.getElementById(prePickedToolId).classList.remove('highlight');
    }

    var toolPath;
    switch (toolId) {
        case 'jsontool':
            toolPath = "tools/json.html";
            break;
        case 'pomodorotechniquetool':
            toolPath = "tools/pomodorotechnique.html"
            break;
    }
    $("#curtool").load(toolPath);

    // 记住当前选中的工具并高亮展示
    localStorage.setItem('curtool', toolId);
    document.getElementById(toolId).classList.add('highlight')
}

function formatSting() {
    var inputVal = document.getElementById('inputTextarea').value;
    formartedString = doFormatString(inputVal);
    document.getElementById('outputTextarea').value = formartedString;
    localStorage.setItem('inputContent', inputVal);
}

function doFormatString(inputVal) {
    const collection1 = new Set(['{', '(', '[']);
    const collection2 = new Set(['}', ')', ']']);
    const collection3 = new Set([',']);
    const QuotationMarkSet = new Set(['\'', "\""]);

    var indentChar = '  '
    var linefeedChar = '\n'

    var curDepth = 0;
    var resp = "";
    var hasLestQuotation = false;
    for (var i = 0; i < inputVal.length; i++) {
        var curChar = inputVal.charAt(i);

        if (collection1.has(curChar)) {
            curDepth++;
            resp = resp + curChar + linefeedChar + generateChars(curDepth, indentChar);

            continue;
        }

        if (collection2.has(curChar)) {
            curDepth--;
            resp = resp  + linefeedChar + generateChars(curDepth, indentChar) + curChar;
            continue;
        }

        resp = resp + curChar;
        if (collection3.has(curChar)
            && !hasLestQuotation) {
            resp = resp + linefeedChar + generateChars(curDepth, indentChar);
        }
        if (QuotationMarkSet.has(curChar)) {
            hasLestQuotation = !hasLestQuotation;
        }
    }
    return resp;
}


function generateChars(n, char) {
    if (n <= 0) {
        return "";
    }
    return new Array(n).fill(char).join('');
}