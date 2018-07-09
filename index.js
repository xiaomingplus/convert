const alfy = require('alfy');
const log = alfy.log;
let input = alfy.input;
let source = input;
let inputFormat = null;
let description = source;
let error = null;
let debug = false;
let tips = null;
let tipsArr =[
    {
        title:"10进制直接输入数字"
    },
    {
        title:"16进制数字以0x开头"
    },
    {
        title:"8进制数字以0o开头"
    },
    {
        title:'2进制数字以0b开头'
    }
]
try {
    if (input) {
        //是否是数字
        if (input.startsWith('0x') || input.startsWith('-0x')) {
            //源是16进制
            if(input==='0x' || input==='-0x'){
                error = {
                    message: "请继续输入"
                }
                tips = tipsArr;
            }else{
                inputFormat = parseInt(input, 16);

            }
            
        }else if(input.startsWith('0o') || input.startsWith('-0o')){
            //八进制
            if(input==='0o' || input==='-0o'){
                error = {
                    message: "请继续输入"
                }
                tips = tipsArr;
            }else{
                if(input.startsWith('-')){
                    inputFormat = parseInt(input.substr(3), 8);

                }else{
                    inputFormat = parseInt(input.substr(2), 8);

                }

            }
        }else if(input.startsWith('0b') || input.startsWith('-0b')){
            if(input==='0b' || input==='-0b'){
                error = {
                    message: "请继续输入"
                }
                tips = tipsArr;
            }else{
                if(input.startsWith('-')){
                    inputFormat = parseInt(input.substr(3), 2);
                }else{
                    inputFormat = parseInt(input.substr(2), 2);
                }

            }
        } else if(input.startsWith('-')){
            tips = tipsArr;

        }else {
            if(input===''){
                error = {
                    message: "请继续输入"
                }
                tips = tipsArr;
            }else{
                inputFormat = Number(input);
            }

        }
    }else{
        error = {
            message: "请输入你要转换的数字"
        }
        tips = tipsArr;

    }
} catch (e) {
    error = {
        message: "输入不符合规范"
    }
}
let outputItems = [];
if(inputFormat===0){
    error = {
        message: "请继续输入"
    }
    tips = tipsArr;

}
if(inputFormat){
    if(isNaN(inputFormat)){
        error = {
            message: "输入不符合规范"
        }
    }
    let number = {};
    try {
        number = {
            '16': inputFormat.toString(16),
            source: source,
            '10': inputFormat.toString(10),
            '8':inputFormat.toString(8),
            '2':inputFormat.toString(2)
        };
    } catch (error) {
        error = {
            message: "输入不符合规范"
        }
    }
    
    
    if (error) {
        outputItems = [{
            title: error.message
        }]
    } else {
        outputItems = [{
            title: number['10'],
            subtitle: '10进制'
    
        }, {
            title: number['16'],
            subtitle: "16进制",
    
        },
        {
            title:number['8'],
            subtitle:'8进制'
        },
        {
            title:number['2'],
            subtitle:'2进制'
        }
    ]
    }
    outputItems = outputItems.map(item => {
        if (!item.arg) {
            item.arg = item.title;
        }
        return item;
    })
    
    output(outputItems);
}else{
    if(isNaN(inputFormat)){
        error = {
            message: "输入不符合规范"
        }
    }
    if(error){
        outputItems = [{
            title: error.message
        }]
    }
    output(outputItems);

}


function output(outputItems){
    if(debug){
        log(JSON.stringify(outputItems));
    }else{
        if(tips && tips.length>0){
            alfy.output(tips)
        }else{
            alfy.output(outputItems)

        }
    }
}


function format(time, formatStr) {
    const date = new Date(Number(time));
    //格式化时间
    const arrWeek = ['日', '一', '二', '三', '四', '五', '六'];
    let str = formatStr
        .replace(/yyyy|YYYY/, date.getFullYear())
        .replace(/yy|YY/, addZero(date.getFullYear() % 100, 2))
        .replace(/mm|MM/, addZero(date.getMonth() + 1))
        .replace(/m|M/g, date.getMonth() + 1)
        .replace(/dd|DD/, addZero(date.getDate()))
        .replace(/d|D/g, date.getDate())
        .replace(/hh|HH/, addZero(date.getHours()))
        .replace(/h|H/g, date.getHours())
        .replace(/ii|II/, addZero(date.getMinutes()))
        .replace(/i|I/g, date.getMinutes())
        .replace(/ss|SS/, addZero(date.getSeconds()))
        .replace(/s|S/g, date.getSeconds())
        .replace(/w/g, date.getDay())
        .replace(/W/g, arrWeek[date.getDay()]);
    return str;
}

function addZero(time) {
    time = String(time);
    return (`0${time}`).substr(-2);
}