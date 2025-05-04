var containsDuplicate = function (nums) {
    let newSet = new Set(nums);
    return !(nums.length == newSet.size);
};

console.log(containsDuplicate([1, 2, 3, 1]));
