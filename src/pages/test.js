/*var list=[{aa:"aa1",bb:"bb1"},{aa:"aa2",bb:"bb2"}]
list.push({aa:"aa3",bb:"bb3"})
console.log("push=> "+JSON.stringify(list))
list.splice(list[1])
list.push({aa:"aa4",bb:"bb4"})
console.log("splice obj=> "+JSON.stringify(list))*/

// var str1="Bgdt6Fde9fXuoiFiDonwL2RNkpKhYn6ySV58asJRT71b";
// var str2="00000000000000000000000000000000000000000000";
// console.log(str1.length,str2.length)

// var enc = new TextDecoder("utf-8");

// var arr = new Uint16Array([123678]);
// console.log(arr[0]);

function convert(Uint16Arr) {
    var length = Uint16Arr.length;

    let buffer = Buffer.from(Uint16Arr);
    var result = buffer.readUIntBE(0, length);

    console.log("result "+result)
    return result;
}

// convert(new Uint16Array([123678]))

const uint16 = Int16Array.from('12345888');

console.log(uint16);


// convert(uint16)
