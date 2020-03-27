

function drawLine(n){

    return '\u2501'.repeat(n)
}



function drawTopBorder(n){
    
    return'\u250F'+ '\u2501'.repeat(n) + '\u2513'
}


function drawMiddleBorder(n){

    return '\u2523'+ '\u2501'.repeat(n)+ '\u252B'
}



function drawBottomBorder(n){

    return '\u2517'+ '\u2501'.repeat(n)+'\u251B'
}

function drawBarsAround(set){

    return '\u2503' + set + '\u2503' 
}

let arr = []

for (let i = 0; i < process.argv.length ; i++){
    arr[i] = process.argv[i+2]
}

console.log(arr)

//arr = ['jon snow' , 'adasd', 'adasd']
   

///  

//for(     )
//{
 //   if (i ===0)
//___________
//|          | = drawTopBorder()

 


//arr[i] 

//middleborder(n)
 //------------



//if (i === arr.length)
    //arr[i] 
 //   |__________|

//}






