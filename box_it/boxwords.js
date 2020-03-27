let arr = process.argv.slice(2)

function drawLine(n){

    return '\u2501'.repeat(n)
}

function drawTopBorder(n){
    
    return'\u250F'+ drawLine(n) + '\u2513'
}
function drawMiddleBorder(n){

    return '\u2523'+ drawLine(n)+ '\u252B'
}
function drawBottomBorder(n){

    return '\u2517'+ drawLine(n)+'\u251B'
}
function drawBarsAround(set){

    return '\u2503' + set + " ".repeat(maxlength - set.length) + '\u2503' 
}


let maxlength = 0

for (let j=0; j < arr.length; j++) {
    if (arr[j].length > maxlength) {
        maxlength = arr[j].length
    }
}

console.log(drawTopBorder(maxlength));

for (let i=0; i < arr.length; i++) {
    if (i !== 0) {
        console.log(drawMiddleBorder(maxlength))
    }
    console.log(drawBarsAround(arr[i]))
}

console.log(drawBottomBorder(maxlength))
