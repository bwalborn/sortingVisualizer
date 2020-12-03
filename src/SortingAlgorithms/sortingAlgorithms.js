

//––––––––––––––––––––––––––––– Section: QuickSort code ––––––––––––––––––––––––––––––––––––––––

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function swap(array, leftIndex, rightIndex, animationsArray){
    var temp = array[leftIndex];

    animationsArray.push([leftIndex, array[leftIndex], rightIndex, array[rightIndex]]); ///new 

    array[leftIndex] = array[rightIndex];
    animationsArray.push([leftIndex, array[leftIndex], rightIndex, array[rightIndex]]); ///new 

    array[rightIndex] = temp;
    animationsArray.push([leftIndex, array[leftIndex], rightIndex, array[rightIndex]]); ///new 
   

};

function partition(array, left, right, animationsArray, auxiliaryArray) {
    var pivot   = array[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right, //right pointer
        k = left;
        
    while (i <= j) {
        animationsArray.push([i, array[i], j, array[j]]);
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {

            swap(array, i, j, animationsArray); //sawpping two elements

            i++;
            j--;            
        }
    } 
    return i;
};


function quickSort(array, left, right, animationsArray, auxiliaryArray) {
    var index;
    if (array.length > 1) {

        index = partition(array, left, right, animationsArray, auxiliaryArray); //index returned from partition
      
        if (left < index - 1) { //more elements on the left side of the pivot

            quickSort(array, left, index - 1, animationsArray, auxiliaryArray);

        }
        if (index < right) { //more elements on the right side of the pivot

            quickSort(array, index, right, animationsArray, auxiliaryArray);

        }
    }
    return array;
};


export function sortingAnimation(array) {
    var animationsArray = [];
    quickSort(array, 0, array.length - 1, animationsArray, auxiliaryArray);
    var auxiliaryArray = animationsArray.slice();
    return animationsArray;
};


//––––––––––––––––––––––––––––– Section: BubbleSort code ––––––––––––––––––––––––––––––––––––––––

function BubbleSort(items, animationsBubbleSort) {
    var length = items.length;
    //Number of passes
    for (var i = 0; i < length; i++) { 
        //Notice that j < (length - i)
        for (var j = 0; j < (length - i - 1); j++) { 
            //Compare the adjacent positions
            if(items[j] > items[j+1]) {
                //Swap the numbers
                var tmp = items[j];  //Temporary variable to hold the current number
         
                items[j] = items[j+1]; //Replace current number with adjacent number
            
                animationsBubbleSort.push([ j, items[j]]);       // => Updates arrayBar positioning DURING switch.

                items[j+1] = tmp; //Replace adjacent number with current number

                animationsBubbleSort.push([ j+1, items[j+1]]);   // => Updates arrayBar positioning AFTER switch.

            }
        }        
    }return items; 
};

export function bubbleSortAnimations(array){
    var animationsBubbleSort = [];
    BubbleSort(array, animationsBubbleSort);
    return animationsBubbleSort;
};




//––––––––––––––––––––––––––––– Section: MergeSort code ––––––––––––––––––––––––––––––––––––––––

function mergeSort(array){
    var length = array.length;
    if(length <2)
       return array;
    var middleOfArray = Math.floor(length/2),
        left = array.slice(0,middleOfArray),
        right = array.slice(middleOfArray);
    //send left and right to the mergeSort to broke it down into pieces
    //then merge those
    return merge(mergeSort(left),mergeSort(right));
 }

 function merge(left, right){
    var result = [],
        leftLength = left.length,
        rightLength = right.length,
        l = 0,
        r = 0;
    while(l < leftLength && r < rightLength){
       if(left[l] < right[r]){
         result.push(left[l++]);
       }
       else{
         result.push(right[r++]);
      }
    }  
    //remaining part needs to be addred to the result
    return result.concat(left.slice(l)).concat(right.slice(r));
  }


//––––––––––––––––––––––––––––– Section: HEAPSort code ––––––––––––––––––––––––––––––––––––––––

function heapSort(arr){
    var len = arr.length,
        end = len-1;
  
    heapify(arr, len);
    
    while(end > 0){
        swapHeap(arr, end--, 0);
     siftDown(arr, 0, end);
    }
    return arr;
  }


  function heapify(arr, len){
    // break the array into root + two sides, to create tree (heap)
    var mid = Math.floor((len-2)/2);
    while(mid >= 0){
     siftDown(arr, mid--, len-1);    
   }
 }


 function siftDown(arr, start, end){
    var root = start,
        child = root*2 + 1,
        toSwap = root;
    while(child <= end){
       if(arr[toSwap] < arr[child]){
        swapHeap(arr, toSwap, child);
       }
       if(child+1 <= end && arr[toSwap] < arr[child+1]){
        swapHeap(arr, toSwap, child+1)
       }
       if(toSwap != root){
        swapHeap(arr, root, toSwap);
          root = toSwap;
       }
       else{
          return; 
       }
       toSwap = root;
       child = root*2+1
   }
 }


function swapHeap(arr, i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
       



//––––––––––––––––––––––––––––– Section: BubbleSort TEST code ––––––––––––––––––––––––––––––––––––––––
//–––––––––––––––––––––––––––––––––––––  TEST TEST ––––––––––––––––––––––––––––––––––––––––


// TEST TEST ******
/* <body>
<script>

function BubbleSort(items, animationsBubbleSort) {
    var length = items.length;
    //Number of passes
    for (var i = 0; i < length; i++) { 
        //Notice that j < (length - i)
        for (var j = 0; j < (length - i - 1); j++) { 
            //Compare the adjacent positions
            if(items[j] > items[j+1]) {
                //Swap the numbers
                var tmp = items[j];  //Temporary variable to hold the current number
         
                items[j] = items[j+1]; //Replace current number with adjacent number
            
                animationsBubbleSort.push([ j, items[j]]);       // => Updates arrayBar positioning DURING switch.

                items[j+1] = tmp; //Replace adjacent number with current number

                animationsBubbleSort.push([ j+1, items[j+1]]);   // => Updates arrayBar positioning AFTER switch.

            }
        }        
    }return items; 
};


   var myArray = [9, 0, 2, 7, -2, 6, 1, 6, 9, 11, 27, 86, 50, 37, 80, 47, 56, 23, 54,57, 88, 96, 4, 7, 16, 27, 34, 32, 46, 68];
   document.write("Original array: " + myArray);
   var sortedArray = BubbleSort(myArray, animationsBubbleSort);
   document.write("Sorted array: " + sortedArray);
</script>
</body> */







//––––––––––––––––––––––––––––– Section: QuickSort TEST code ––––––––––––––––––––––––––––––––––––––––
//–––––––––––––––––––––––––––––––––––––  TEST TEST ––––––––––––––––––––––––––––––––––––––––

/* <body>
<script>

function swap(array, leftIndex, rightIndex){
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}
function partition(array, left, right) {
    var pivot   = array[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(array, left, right) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(array, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(array, index, right);
        }
    }
    return array;
}


   var myArray = [9, 0, 2, 7, -2, 6, 1, 6, 9, 11, 27, 86, 50, 37, 80, 47, 56, 23, 54,57, 88, 96, 4, 7, 16, 27, 34, 32, 46, 68];
   document.write("Original array: " + myArray);
   var sortedArray = quickSort(array, 0, array.length - 1);
   document.write("Sorted array: " + sortedArray);
</script>
</body> */








// My source for all algorithms
// https://khan4019.github.io/front-end-Interview-Questions/sort.html#bubbleSort