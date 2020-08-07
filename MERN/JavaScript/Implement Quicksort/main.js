/*
Implement Quicksort
Objectives:
    Technical interview practice
    Implement quicksort
    Sort an unsorted array with no duplicate values

Using what you learned from the previous module, implement quicksort!

Begin by writing the code for Hoare's partitioning algorithm. Remember that we will need to call this function to partition not just the entire array, but sections of the array. Therefore, our function should receive not just the array to partition, but also boundaries to indicate the portion of the array that is being partitioned. Don't forget to return the position of the pivot value!

Once we have a way to partition, we can think about writing our quicksort function. Quicksort will call the partition algorithm and pass it the array to sort and the boundaries. Since partition returns the pivot position, quicksort will be able to use the pivot position to do the procedure all over again, but with different boundaries.

Consider: Where will the recursive call be? When do we know a portion of the array has been sorted? When do we know the entire array has been sorted?

Bonus 1:  Different strategies are used to choose the pivot. Any pivot would work, so why not just choose an easy pivot, such as the i-most value? The answer is that the time complexity could be greatly increased if we were to call quicksort on an array that is already sorted. Diagram this out and determine why this is true.

Bonus 2:  What is the Big O time complexity of this algorithm?

Bonus 3:  The Big O time complexity of quicksort is actually not impressive at all. So why is it called quicksort? Remember that Big O is for the worst case scenario. In this case, the worst case scenario is unlikely to be encountered - it's when we try to quicksort a sorted array and assign the pivot to an edge value. We use Big Omega to talk about the best case scenario and Big Theta to talk about the average case.  What are the Big Omega and Big Theta time complexities of quicksort?
 */


let sample = [1, 4, 2, 7, 6, 3, 8, 20, 9, 15, 12, 10, 30];
let sample2 = [1, 3, 5, 4, 8, 30, 20, 17, 7];


function quicksort(arr, i = 0, j = arr.length - 1) {
  if (i >= j) return;
  const pivot = arr[Math.floor((i + j) / 2)];
  const index = partition(arr, i, j, pivot);
  quicksort(arr, i, index - 1);
  quicksort(arr, index, j);
  return arr;
}


function partition(arr, i, j, pivot) {
    while (i <= j) {
        while (arr[i] < pivot && i <= j) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }
    return i;
}

console.log(quicksort(sample));
console.log(quicksort(sample2));

// Hoare's partitioning algorithm

// 1. Choose a pivot value.
// const pivot = arr[Math.floor((i + j) / 2)];

// 2. Scan the values in the array from the i and from the j
// while (arr[i] < pivot && i <= j) {
//     i++;
// }
// while (arr[j] > pivot) {
//     j--;
// }

// 3. Swap the values at i and j
// [arr[i], arr[j]] = [arr[j], arr[i]];

// 4. Break when i = j
// 

// 5. Return j
// 
