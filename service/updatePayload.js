function updatePayload(req, res){
    var payload = req.body.payload;
    var referenceData = req.body.referenceData;
    var formattedpayload = formatData(payload, referenceData);
    res.status(200).send(formattedpayload);
    res.end();
}

function formatData(payload, referenceData){
    if(payload.valueType === 'array'){
        var arr = payload.value;
        for(var i=0;i<arr.length;i++){
            var ele = arr[i];
            formatData(ele, referenceData);
        }
    }else{
        var index = payload.value.indexOf('{');
        if(index !== -1){
            payload.value = replaceData(payload, referenceData, index);
        }
    }
    return payload;
}

function replaceData(payload, referenceData, firstIndex){
    var value = payload.value;
    var lastIndex = 0;
    var str = '';
    var refStr = '', refVal = '';
    if(firstIndex !== -1){
        lastIndex = value.indexOf('}', firstIndex + 1);
        str = value.substring(firstIndex, lastIndex + 1);
        refStr= str.substring(1, str.length-1);
        refVal = referenceData[refStr];
        value = value.replace(str, refVal);
    }
    return value;
}


module.exports = updatePayload;