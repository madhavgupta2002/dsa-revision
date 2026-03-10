### Q1) Introduction (Max Consecutive Ones)
- **Problem Statement:** Given a binary array, find the maximum number of consecutive 1s in the array.
- **Concept:** Array Traversal / State Tracking.
- **Optimal Algo:** 
  - Maintain a `max_count` and a `current_count`.
  - Iterate through the array. If the element is 1, increment `current_count`.
  - If the element is 0, update `max_count` with `current_count` and reset `current_count` to 0.
  - Return the max of `max_count` and `current_count` at the end.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int max_count = 0, current_count = 0;
        for (int num : nums) {
            if (num == 1) current_count++;
            else {
                max_count = max(max_count, current_count);
                current_count = 0;
            }
        }
        return max(max_count, current_count);
    }
};
```
- **Dry Run:** `nums = [1,1,0,1]`
  - i=0: num=1, current=1, max=0
  - i=1: num=1, current=2, max=0
  - i=2: num=0, max=max(0,2)=2, current=0
  - i=3: num=1, current=1
  - End: max(2,1) = 2.
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q2) Move Zeroes
- **Problem Statement:** Move all 0s to the end of the array while maintaining the relative order of the non-zero elements (in-place).
- **Concept:** Two Pointers.
- **Optimal Algo:**
  - Use a `left` pointer to track the position where the next non-zero element should go.
  - Iterate `right` pointer through the array.
  - Whenever `nums[right]` is non-zero, swap it with `nums[left]` and increment `left`.
- **C++ Code:**
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int left = 0;
        for (int right = 0; right < nums.size(); right++) {
            if (nums[right] != 0) {
                swap(nums[left], nums[right]);
                left++;
            }
        }
    }
};
```
- **Dry Run:** `nums = [0,1,0,3]`
  - right=0 (0): do nothing
  - right=1 (1): swap left(0) and right(1) -> `[1,0,0,3]`, left=1
  - right=2 (0): do nothing
  - right=3 (3): swap left(1) and right(3) -> `[1,3,0,0]`, left=2
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q3) Majority Element
- **Problem Statement:** Find the element that appears more than `⌊n / 2⌋` times in an array.
- **Concept:** Boyer-Moore Voting Algorithm.
- **Optimal Algo:**
  - Maintain a `candidate` and a `count`.
  - Iterate through the array. If `count == 0`, set the current number as `candidate`.
  - If the current number equals the candidate, `count++`, else `count--`.
- **C++ Code:**
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0, count = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
};
```
- **Dry Run:** `nums = [2,2,1,1,1,2,2]`
  - i=0 (2): count=1, cand=2
  - i=1 (2): count=2, cand=2
  - i=2 (1): count=1, cand=2
  - i=3 (1): count=0, cand=2
  - i=4 (1): count=1, cand=1
  - i=5 (2): count=0, cand=1
  - i=6 (2): count=1, cand=2. Output: 2
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q4) Remove Duplicates from Sorted Array
- **Problem Statement:** Remove duplicates in-place from a sorted array so that each element appears only once. Return the new length.
- **Concept:** Two Pointers.
- **Optimal Algo:**
  - Use a `left` pointer to track the index of the last unique element.
  - Iterate `right` pointer. If `nums[right] != nums[left]`, increment `left` and copy `nums[right]` to `nums[left]`.
- **C++ Code:**
```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int left = 0;
        for (int right = 1; right < nums.size(); right++) {
            if (nums[right] != nums[left]) {
                left++;
                nums[left] = nums[right];
            }
        }
        return left + 1;
    }
};
```
- **Dry Run:** `nums = [1,1,2]`
  - right=1 (1): == nums[0], skip
  - right=2 (2): != nums[0], left=1, nums[1]=2 -> `[1,2,2]`
  - Returns left+1 = 2
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q5) Best Time to Buy and Sell Stock
- **Problem Statement:** Find the maximum profit you can achieve by buying on one day and selling on a different day in the future.
- **Concept:** Greedy / Running Minimum.
- **Optimal Algo:**
  - Track the `min_price` seen so far.
  - For each price, calculate the potential profit (`price - min_price`).
  - Update `max_profit` if the potential profit is greater.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int min_price = INT_MAX, max_profit = 0;
        for (int price : prices) {
            min_price = min(min_price, price);
            max_profit = max(max_profit, price - min_price);
        }
        return max_profit;
    }
};
```
- **Dry Run:** `prices = [7,1,5,3,6,4]`
  - i=0 (7): min_price=7, max_profit=0
  - i=1 (1): min_price=1, max_profit=0
  - i=2 (5): min_price=1, max_profit=4
  - i=4 (6): min_price=1, max_profit=5
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q6) Rotate Array
- **Problem Statement:** Rotate an array to the right by `k` steps.
- **Concept:** Array Reversal Math.
- **Optimal Algo:**
  - Normalize `k` using `k = k % n`.
  - Reverse the entire array.
  - Reverse the first `k` elements.
  - Reverse the remaining `n-k` elements.
- **C++ Code:**
```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k = k % n;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
```
- **Dry Run:** `nums = [1,2,3,4], k = 2`
  - Reverse all: `[4,3,2,1]`
  - Reverse first 2: `[3,4,2,1]`
  - Reverse last 2: `[3,4,1,2]`
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q7) Product of Array Except Self
- **Problem Statement:** Return an array such that `ans[i]` is equal to the product of all elements except `nums[i]`. Cannot use division.
- **Concept:** Prefix and Suffix Arrays.
- **Optimal Algo:**
  - Create the result array. Compute prefix products from left to right directly in the result array.
  - Traverse from right to left, maintaining a running `suffix_product`, multiplying it into the result array.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
};
```
- **Dry Run:** `nums = [1,2,3,4]`
  - Prefix Pass: `res = [1, 1, 2, 6]`
  - Suffix Pass (Right to Left): 
    - i=3: res[3] *= 1 -> 6, suffix=4
    - i=2: res[2] *= 4 -> 8, suffix=12
    - i=1: res[1] *= 12 -> 12, suffix=24
    - i=0: res[0] *= 24 -> 24. Final: `[24,12,8,6]`
- **Complexity:** Time: O(N) | Space: O(1) (excluding output array)

---

### Q8) Best Time to Buy and Sell Stock II
- **Problem Statement:** Maximize profit. You can complete as many transactions as you like, but can only hold 1 share at a time.
- **Concept:** Greedy (Peak-Valley).
- **Optimal Algo:**
  - Add up all the positive price differences between consecutive days.
  - If `prices[i] > prices[i-1]`, simply add `prices[i] - prices[i-1]` to total profit.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
};
```
- **Dry Run:** `prices = [7,1,5,3,6,4]`
  - 1-7: No (diff < 0)
  - 5-1: Yes, profit += 4
  - 3-5: No
  - 6-3: Yes, profit += 3
  - Total profit = 7
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q9) Number of Zero-Filled Subarrays
- **Problem Statement:** Return the number of subarrays filled with exactly `0`.
- **Concept:** Contiguous Subsegment Math.
- **Optimal Algo:**
  - Keep a counter `current_zeros` for contiguous zeroes.
  - When encountering `0`, increment `current_zeros` and add it to `total_subarrays`.
  - When encountering non-zero, reset `current_zeros` to 0.
- **C++ Code:**
```cpp
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long total = 0, current_zeros = 0;
        for (int num : nums) {
            if (num == 0) {
                current_zeros++;
                total += current_zeros;
            } else {
                current_zeros = 0;
            }
        }
        return total;
    }
};
```
- **Dry Run:** `nums = [0,0,1,0]`
  - i=0 (0): current_zeros=1, total=1
  - i=1 (0): current_zeros=2, total=3
  - i=2 (1): current_zeros=0
  - i=3 (0): current_zeros=1, total=4
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q10) Increasing Triplet Subsequence
- **Problem Statement:** Return true if there exists `i < j < k` such that `nums[i] < nums[j] < nums[k]`.
- **Concept:** Greedy Minimum Tracking.
- **Optimal Algo:**
  - Maintain two variables: `first = INT_MAX` and `second = INT_MAX`.
  - Iterate the array:
    - If `num <= first`, update `first = num`
    - Else if `num <= second`, update `second = num`
    - Else (num is strictly greater than both `first` and `second`), return `true`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int first = INT_MAX, second = INT_MAX;
        for (int num : nums) {
            if (num <= first) first = num;
            else if (num <= second) second = num;
            else return true;
        }
        return false;
    }
};
```
- **Dry Run:** `nums = [2,1,5,0,4,6]`
  - i=0 (2): first=2, second=INF
  - i=1 (1): first=1, second=INF
  - i=2 (5): first=1, second=5
  - i=3 (0): first=0, second=5
  - i=4 (4): first=0, second=4
  - i=5 (6): > second (4). Returns true!
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q11) First Missing Positive
- **Problem Statement:** Given an unsorted array, find the smallest missing positive integer in O(N) time and O(1) space.
- **Concept:** Cyclic Sort / Index Mapping.
- **Optimal Algo:**
  - Try to place every positive number `x` (where `1 <= x <= N`) at the index `x - 1`.
  - Iterate array: While `nums[i]` is in range `[1, N]` and not already at its correct index, swap `nums[i]` with `nums[nums[i] - 1]`.
  - Finally, iterate 0 to N. The first index `i` where `nums[i] != i + 1` gives the missing positive `i + 1`. If none, return `N + 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]);
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
};
```
- **Dry Run:** `nums = [3,4,-1,1]`
  - i=0 (3): valid, swap with nums[2](-1) -> `[-1,4,3,1]`
  - i=1 (4): valid, swap with nums[3](1) -> `[-1,1,3,4]`
  - i=1 (1): valid, swap with nums[0](-1) -> `[1,-1,3,4]`
  - Loop done. Indexes check: `nums[0]==1`, `nums[1]==-1` != 2. Answer is 2.
- **Complexity:** Time: O(N) | Space: O(1)


## 🔤 Strings — **6 Questions**

### Q12) Introduction (Reverse String)
- **Problem Statement:** Reverse an array of characters in-place.
- **Concept:** Two Pointers.
- **Optimal Algo:**
  - Initialize two pointers: `left` at the start and `right` at the end.
  - Swap the characters at `left` and `right`.
  - Increment `left` and decrement `right` until they meet.
- **C++ Code:**
```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            swap(s[left++], s[right--]);
        }
    }
};
```
- **Dry Run:** `s = ['h','e','l','l','o']`
  - swap 'h' & 'o' -> `['o','e','l','l','h']`
  - swap 'e' & 'l' -> `['o','l','l','e','h']`
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q13) Is Subsequence
- **Problem Statement:** Check if string `s` is a subsequence of string `t`.
- **Concept:** Two Pointers.
- **Optimal Algo:**
  - Use pointer `i` for `s` and `j` for `t`.
  - Iterate through `t`. If `s[i] == t[j]`, increment `i`.
  - Return true if `i` reaches the length of `s`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s[i] == t[j]) i++;
            j++;
        }
        return i == s.length();
    }
};
```
- **Dry Run:** `s = "abc", t = "ahbgdc"`
  - 'a' == 'a' (i=1) -> 'b' == 'b' (i=2) -> 'c' == 'c' (i=3). Return true.
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q14) Valid Palindrome
- **Problem Statement:** Check if a string is a palindrome, considering only alphanumeric characters and ignoring cases.
- **Concept:** Two Pointers.
- **Optimal Algo:**
  - `left` pointer at start, `right` at end.
  - Skip non-alphanumeric characters.
  - Compare characters in lowercase. If they mismatch, return false.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (!isalnum(s[left])) left++;
            else if (!isalnum(s[right])) right--;
            else if (tolower(s[left++]) != tolower(s[right--])) return false;
        }
        return true;
    }
};
```
- **Dry Run:** `s = "A man, a plan, a canal: Panama"`
  - Skips spaces and punctuation, compares `a`==`a`, `m`==`m`, etc., until center. Returns true.
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q15) Longest Common Prefix
- **Problem Statement:** Find the longest common prefix string amongst an array of strings.
- **Concept:** Vertical Scanning / Sorting.
- **Optimal Algo:**
  - Sort the array of strings.
  - The common prefix of the whole array will just be the common prefix of the *first* and *last* strings in the sorted array.
- **C++ Code:**
```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        sort(strs.begin(), strs.end());
        string first = strs.front();
        string last = strs.back();
        int i = 0;
        while (i < first.size() && i < last.size() && first[i] == last[i]) {
            i++;
        }
        return first.substr(0, i);
    }
};
```
- **Dry Run:** `strs = ["flower","flow","flight"]`
  - Sorted: `["flight", "flow", "flower"]`
  - Compare "flight" and "flower": `f`==`f`, `l`==`l`, `i`!=`o`. Output: "fl".
- **Complexity:** Time: O(N log N * M) | Space: O(1)

---

### Q16) Zigzag Conversion
- **Problem Statement:** Convert a string into a zigzag pattern given a number of rows, then read row by row.
- **Concept:** String Simulation.
- **Optimal Algo:**
  - Create an array of strings for each row.
  - Traverse the string, placing characters into the current row.
  - Reverse direction (up/down) whenever reaching the top or bottom row.
- **C++ Code:**
```cpp
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) return s;
        vector<string> rows(min(numRows, int(s.length())));
        int currRow = 0;
        bool goingDown = false;
        for (char c : s) {
            rows[currRow] += c;
            if (currRow == 0 || currRow == numRows - 1) goingDown = !goingDown;
            currRow += goingDown ? 1 : -1;
        }
        string result;
        for (string row : rows) result += row;
        return result;
    }
};
```
- **Dry Run:** `s = "PAYPALISHIRING", numRows = 3`
  - row 0: P, A, H, N
  - row 1: A, P, L, S, I, I, G
  - row 2: Y, I, R
  - Output: "PAHNAPLSIIGYIR"
- **Complexity:** Time: O(N) | Space: O(N)

---

### Q17) Reverse Words in a String
- **Problem Statement:** Reverse the order of words in a string, reducing multiple spaces to a single space.
- **Concept:** Two Pointers / String Manipulation.
- **Optimal Algo:**
  - Reverse the entire string.
  - Reverse each individual word.
  - Clean up extra spaces using a write pointer (in-place).
- **C++ Code:**
```cpp
class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());
        int n = s.size(), left = 0, right = 0, i = 0;
        while (i < n) {
            while (i < n && s[i] == ' ') i++; // skip spaces
            if (i == n) break;
            while (i < n && s[i] != ' ') s[right++] = s[i++]; // copy word
            reverse(s.begin() + left, s.begin() + right); // reverse word
            s[right++] = ' '; // add space
            left = right;
        }
        s.resize(max(0, right - 1)); // remove trailing space
        return s;
    }
};
```
- **Dry Run:** `s = "  hello world  "`
  - Reverse all: `"  dlrow olleh  "`
  - Parse words & reverse them: `[world, hello]` -> string mapped to `"world hello"`
- **Complexity:** Time: O(N) | Space: O(1) (In C++ strings are mutable)

---

### Q18) Guess the Word
- **Problem Statement:** Guess a secret 6-letter word within 10 guesses. `guess(word)` returns the number of exact character matches.
- **Concept:** Minimax / Heuristic Pruning.
- **Optimal Algo:**
  - From the wordlist, guess a random word.
  - Get the match score from the `Master` API.
  - Filter the wordlist to keep only words that have the *exact same match score* with your guessed word.
  - Repeat until found.
- **C++ Code:**
```cpp
/**
 * // This is the Master's API interface.
 * // You should not implement it, or speculate about its implementation
 * class Master {
 *   public:
 *     int guess(string word);
 * };
 */
class Solution {
    int match(string& a, string& b) {
        int matches = 0;
        for (int i = 0; i < 6; i++) {
            if (a[i] == b[i]) matches++;
        }
        return matches;
    }
public:
    void findSecretWord(vector<string>& words, Master& master) {
        for (int i = 0; i < 10; i++) {
            string guess = words[rand() % words.size()];
            int x = master.guess(guess);
            if (x == 6) return;
            vector<string> next_words;
            for (string w : words) {
                if (match(guess, w) == x) {
                    next_words.push_back(w);
                }
            }
            words = next_words;
        }
    }
};
```
- **Complexity:** Time: O(N) per guess, max 10 guesses -> O(N) | Space: O(N)

---

## 🧠 Bit Manipulation — **8 Questions**

### Q19) Introduction (Power of Two)
- **Problem Statement:** Given an integer, write a function to determine if it is a power of two.
- **Concept:** Bitwise AND.
- **Optimal Algo:**
  - A power of two has exactly one '1' bit in its binary representation.
  - `n & (n - 1)` unsets the rightmost '1' bit. If `n > 0` and `n & (n - 1) == 0`, it's a power of two.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
};
```
- **Complexity:** Time: O(1) | Space: O(1)

---

### Q20) Single Number
- **Problem Statement:** Every element appears twice except for one. Find that single one.
- **Concept:** Bitwise XOR.
- **Optimal Algo:**
  - XOR of a number with itself is 0 (`a ^ a = 0`).
  - XOR all elements together; the pairs will cancel out, leaving the single number.
- **C++ Code:**
```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for (int num : nums) {
            ans ^= num;
        }
        return ans;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q21) Number of 1 Bits
- **Problem Statement:** Return the number of '1' bits in an unsigned integer.
- **Concept:** Bitwise trick to remove lowest set bit.
- **Optimal Algo:**
  - Loop while `n != 0`.
  - Perform `n = n & (n - 1)`, which removes the lowest set bit, and increment count.
- **C++ Code:**
```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
};
```
- **Complexity:** Time: O(1) (max 32 ops) | Space: O(1)

---

### Q22) Counting Bits
- **Problem Statement:** Return an array of length `n+1` containing the number of 1's in binary representation of `i`.
- **Concept:** Dynamic Programming + Bitwise.
- **Optimal Algo:**
  - The number of set bits in `i` is the number of set bits in `i >> 1` (i.e., `i / 2`) plus `1` if `i` is odd (`i & 1`).
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

---

### Q23) Reverse Bits
- **Problem Statement:** Reverse bits of a given 32-bit unsigned integer.
- **Concept:** Bit Shifting.
- **Optimal Algo:**
  - Initialize result to 0.
  - Loop 32 times: shift result left by 1, add the least significant bit of `n` (`n & 1`), then shift `n` right by 1.
- **C++ Code:**
```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t ans = 0;
        for (int i = 0; i < 32; i++) {
            ans = (ans << 1) | (n & 1);
            n >>= 1;
        }
        return ans;
    }
};
```
- **Complexity:** Time: O(1) | Space: O(1)

---

### Q24) Bitwise AND of Numbers Range
- **Problem Statement:** Return the bitwise AND of all numbers in range `[left, right]`.
- **Concept:** Common Prefix of Binary Strings.
- **Optimal Algo:**
  - Right shift `left` and `right` until they are equal (this removes the bits that change and flip between 0 and 1).
  - Track how many shifts were made.
  - Left shift the common prefix back by the shift count.
- **C++ Code:**
```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int shifts = 0;
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shifts++;
        }
        return left << shifts;
    }
};
```
- **Dry Run:** `left = 5 (101), right = 7 (111)`
  - Shift 1: left=2 (10), right=3 (11)
  - Shift 2: left=1 (1), right=1 (1)
  - Equal! `1 << 2 = 4 (100)`. Output 4.
- **Complexity:** Time: O(1) (max 32 shifts) | Space: O(1)

---

### Q25) Single Number III
- **Problem Statement:** Two elements appear only once, all others twice. Find the two single elements.
- **Concept:** XOR & Bitmasking.
- **Optimal Algo:**
  - XOR all elements. The result is `XOR = a ^ b` (the two unique numbers).
  - Find the rightmost set bit in `XOR` (`mask = XOR & -XOR`). This bit differs between `a` and `b`.
  - Group numbers into two based on this bit, XORing each group to find `a` and `b`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        long long axorb = 0;
        for (int num : nums) axorb ^= num;
        
        long long mask = axorb & (-axorb);
        int a = 0, b = 0;
        for (int num : nums) {
            if (num & mask) a ^= num;
            else b ^= num;
        }
        return {a, b};
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q26) Sum of Two Integers
- **Problem Statement:** Add two integers without using the operators `+` and `-`.
- **Concept:** Full Adder Logic using Bitwise operators.
- **Optimal Algo:**
  - `a ^ b` computes the sum without carry.
  - `(a & b) << 1` computes the carry.
  - Repeat until carry is 0. (Cast carry to `unsigned int` to avoid undefined behavior on negative numbers in C++).
- **C++ Code:**
```cpp
class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            unsigned int carry = a & b;
            a = a ^ b;
            b = carry << 1;
        }
        return a;
    }
};
```
- **Complexity:** Time: O(1) | Space: O(1)

---

## 🗂️ Hash Tables — **14 Questions**

### Q27) Introduction (Two Sum)
- **Problem Statement:** Find indices of two numbers that add up to a target.
- **Concept:** Hash Map lookup.
- **Optimal Algo:**
  - Iterate through the array. Store elements and their index in a hash map.
  - Check if `target - num` already exists in the map.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            if (mp.count(target - nums[i])) {
                return {mp[target - nums[i]], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

---

### Q28) Design HashMap
- **Problem Statement:** Implement a HashMap without using built-in hash table libraries.
- **Concept:** Array of Linked Lists (Chaining).
- **Optimal Algo:**
  - Use a fixed-size vector of `list<pair<int, int>>`.
  - Hash function: `key % SIZE`.
  - Iterate through the list at the hashed index for `put`, `get`, and `remove`.
- **C++ Code:**
```cpp
class MyHashMap {
    vector<list<pair<int, int>>> buckets;
    int size = 10007;
public:
    MyHashMap() {
        buckets.resize(size);
    }
    
    void put(int key, int value) {
        int idx = key % size;
        for (auto& p : buckets[idx]) {
            if (p.first == key) { p.second = value; return; }
        }
        buckets[idx].push_back({key, value});
    }
    
    int get(int key) {
        int idx = key % size;
        for (auto& p : buckets[idx]) {
            if (p.first == key) return p.second;
        }
        return -1;
    }
    
    void remove(int key) {
        int idx = key % size;
        buckets[idx].remove_if([key](auto const& p) { return p.first == key; });
    }
};
```
- **Complexity:** Time: O(1) amortized | Space: O(N)

---

### Q29) Maximum Number of Balloons
- **Problem Statement:** Maximize the number of times you can form the word "balloon" from a given string.
- **Concept:** Frequency Map.
- **Optimal Algo:**
  - Count frequencies of all letters.
  - Find the minimum available sets for 'b', 'a', 'l' (divided by 2), 'o' (divided by 2), and 'n'.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxNumberOfBalloons(string text) {
        unordered_map<char, int> counts;
        for (char c : text) counts[c]++;
        return min({counts['b'], counts['a'], counts['l'] / 2, counts['o'] / 2, counts['n']});
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1) (only 26 letters)

---

### Q30) Number of Good Pairs
- **Problem Statement:** Return the number of pairs `(i, j)` where `nums[i] == nums[j]` and `i < j`.
- **Concept:** Hash Map math.
- **Optimal Algo:**
  - Iterate elements, look up how many times the current element has appeared so far in a frequency map, add that to the answer, and then increment the map count.
- **C++ Code:**
```cpp
class Solution {
public:
    int numIdenticalPairs(vector<int>& nums) {
        unordered_map<int, int> count;
        int ans = 0;
        for (int num : nums) {
            ans += count[num];
            count[num]++;
        }
        return ans;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

---

### Q31) Isomorphic Strings
- **Problem Statement:** Check if characters in `s` can be replaced to get `t`. No two characters can map to the same character.
- **Concept:** Bi-directional Mapping.
- **Optimal Algo:**
  - Use two arrays of size 256. Store the latest mapped index of each character from `s` and `t`.
  - If the last seen indices of the current characters in `s` and `t` differ, return false.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        vector<int> map_s(256, -1), map_t(256, -1);
        for (int i = 0; i < s.length(); i++) {
            if (map_s[s[i]] != map_t[t[i]]) return false;
            map_s[s[i]] = i;
            map_t[t[i]] = i;
        }
        return true;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q32) Ransom Note
- **Problem Statement:** Return true if `ransomNote` can be constructed from `magazine`.
- **Concept:** Frequency Array.
- **Optimal Algo:**
  - Count characters of `magazine` in an array of size 26.
  - Decrease count while traversing `ransomNote`. If count drops below 0, return false.
- **C++ Code:**
```cpp
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        vector<int> counts(26, 0);
        for (char c : magazine) counts[c - 'a']++;
        for (char c : ransomNote) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
};
```
- **Complexity:** Time: O(N + M) | Space: O(1)

---

### Q33) Contains Duplicate II
- **Problem Statement:** Return true if `nums[i] == nums[j]` and `abs(i - j) <= k`.
- **Concept:** Hash Map for indices.
- **Optimal Algo:**
  - Iterate array. Check if `num` is in map and the difference between current index and stored index is `<= k`.
  - Update the map with the current index.
- **C++ Code:**
```cpp
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            if (mp.count(nums[i]) && i - mp[nums[i]] <= k) return true;
            mp[nums[i]] = i;
        }
        return false;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

---

### Q34) Group Anagrams
- **Problem Statement:** Group an array of strings into anagrams.
- **Concept:** Hash Map with Sorted String Keys.
- **Optimal Algo:**
  - Iterate through strings. Sort the characters of each string to use as the key in a hash map.
  - Append original string to the vector associated with that key.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for (string s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            mp[key].push_back(s);
        }
        vector<vector<string>> ans;
        for (auto& p : mp) ans.push_back(p.second);
        return ans;
    }
};
```
- **Complexity:** Time: O(N * K log K) | Space: O(N * K)

---

### Q35) Encode and Decode TinyURL
- **Problem Statement:** Design a system to shorten a URL and restore it.
- **Concept:** Dual Hash Map / Global Counter.
- **Optimal Algo:**
  - Maintain two maps: `url2code` and `code2url`.
  - Use the size of the maps as a simple unique ID for encoding.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<string, string> urlToCode, codeToUrl;
    string baseUrl = "http://tinyurl.com/";
public:
    string encode(string longUrl) {
        if (!urlToCode.count(longUrl)) {
            string code = to_string(urlToCode.size());
            urlToCode[longUrl] = code;
            codeToUrl[code] = longUrl;
        }
        return baseUrl + urlToCode[longUrl];
    }
    string decode(string shortUrl) {
        string code = shortUrl.substr(baseUrl.length());
        return codeToUrl[code];
    }
};
```
- **Complexity:** Time: O(1) | Space: O(N)

---

### Q36) Reorganize String
- **Problem Statement:** Rearrange characters so that no two adjacent characters are the same.
- **Concept:** Max Heap / Priority Queue.
- **Optimal Algo:**
  - Count frequencies. Push to max heap: `pair<count, char>`.
  - Pop the top two most frequent characters, append them, decrement their counts, and push them back if count > 0.
  - If 1 char left and count > 1, impossible (return "").
- **C++ Code:**
```cpp
class Solution {
public:
    string reorganizeString(string s) {
        unordered_map<char, int> freq;
        for (char c : s) freq[c]++;
        priority_queue<pair<int, char>> pq;
        for (auto& p : freq) pq.push({p.second, p.first});
        
        string ans = "";
        while (pq.size() > 1) {
            auto top1 = pq.top(); pq.pop();
            auto top2 = pq.top(); pq.pop();
            ans += top1.second;
            ans += top2.second;
            if (--top1.first > 0) pq.push(top1);
            if (--top2.first > 0) pq.push(top2);
        }
        if (!pq.empty()) {
            if (pq.top().first > 1) return "";
            ans += pq.top().second;
        }
        return ans;
    }
};
```
- **Complexity:** Time: O(N log A) (A=26) -> O(N) | Space: O(A) -> O(1)

---

### Q37) Longest Consecutive Sequence
- **Problem Statement:** Find the length of the longest consecutive elements sequence in an unsorted array. O(N) time required.
- **Concept:** Hash Set lookup.
- **Optimal Algo:**
  - Insert all elements into an `unordered_set`.
  - Iterate through elements. Only start counting if `num - 1` is NOT in the set (i.e., `num` is the start of a sequence).
  - Count upwards `num + 1`, `num + 2`, etc., tracking the max length.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> st(nums.begin(), nums.end());
        int longest = 0;
        for (int num : st) {
            if (!st.count(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                while (st.count(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }
                longest = max(longest, currentStreak);
            }
        }
        return longest;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

---

### Q38) Split Array into Consecutive Subsequences
- **Problem Statement:** Check if array can be split into valid consecutive subsequences of length >= 3.
- **Concept:** Greedy Hash Map tracking.
- **Optimal Algo:**
  - Use two maps: `freq` to count available numbers, `appendfreq` to track subsequences that need a specific next number.
  - For each number: if it can append to an existing sequence (`appendfreq[num] > 0`), do so. Else, try to form a new sequence of 3 (`num`, `num+1`, `num+2`). Else, return false.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isPossible(vector<int>& nums) {
        unordered_map<int, int> freq, appendfreq;
        for (int i : nums) freq[i]++;
        for (int i : nums) {
            if (freq[i] == 0) continue;
            else if (appendfreq[i] > 0) {
                appendfreq[i]--;
                appendfreq[i + 1]++;
            } else if (freq[i + 1] > 0 && freq[i + 2] > 0) {
                freq[i + 1]--;
                freq[i + 2]--;
                appendfreq[i + 3]++;
            } else {
                return false;
            }
            freq[i]--;
        }
        return true;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

---

### Q39) Number of Matching Subsequences
- **Problem Statement:** Given a string `s` and an array of words, find how many words are subsequences of `s`.
- **Concept:** Array of Pointers / Iterators.
- **Optimal Algo:**
  - Create a bucket array of size 26. Each bucket holds the suffixes of the words waiting for that character.
  - Iterate through characters of `s`. For each character, process all words waiting for it, moving them to the bucket of their next character.
- **C++ Code:**
```cpp
class Solution {
public:
    int numMatchingSubseq(string s, vector<string>& words) {
        vector<const char*> waiting[26];
        for (auto& w : words) {
            waiting[w[0] - 'a'].push_back(w.c_str());
        }
        int count = 0;
        for (char c : s) {
            auto advance = waiting[c - 'a'];
            waiting[c - 'a'].clear();
            for (auto it : advance) {
                it++;
                if (*it == 0) count++; // Reached null terminator
                else waiting[*it - 'a'].push_back(it);
            }
        }
        return count;
    }
};
```
- **Complexity:** Time: O(len(s) + sum(len(word))) | Space: O(N)

---

### Q40) Number of Good Ways to Split a String
- **Problem Statement:** Split string into two non-empty parts `left` and `right` such that both have the same number of distinct letters.
- **Concept:** Prefix and Suffix Arrays.
- **Optimal Algo:**
  - Create two arrays/maps to track unique characters from left-to-right and right-to-left.
  - Count distinct characters in suffix map first.
  - Iterate string, adding to prefix map, removing from suffix map. If distinct counts match, increment answer.
- **C++ Code:**
```cpp
class Solution {
public:
    int numSplits(string s) {
        unordered_map<char, int> rightMap, leftMap;
        for (char c : s) rightMap[c]++;
        
        int ans = 0;
        for (char c : s) {
            leftMap[c]++;
            if (--rightMap[c] == 0) {
                rightMap.erase(c);
            }
            if (leftMap.size() == rightMap.size()) {
                ans++;
            }
        }
        return ans;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1) (Only 26 characters)

## 👉 Two Pointers — **6 Questions**

### Q41) Introduction (Squares of a Sorted Array)
- **Problem Statement:** Given an array sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.
- **Concept:** Two Pointers (Converging).
- **Optimal Algo:**
  - Create a result array of the same size.
  - Use `left` pointer at 0 and `right` pointer at `n-1`.
  - Compare absolute values. Place the square of the larger value at the end of the result array, then move the corresponding pointer inward.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        int left = 0, right = n - 1;
        for (int i = n - 1; i >= 0; i--) {
            if (abs(nums[left]) > abs(nums[right])) {
                res[i] = nums[left] * nums[left];
                left++;
            } else {
                res[i] = nums[right] * nums[right];
                right--;
            }
        }
        return res;
    }
};
```
- **Dry Run:** `nums = [-4,-1,0,3,10]`
  - |-4| < |10| -> res[4] = 100, right=3
  - |-4| > |3| -> res[3] = 16, left=1
  - |-1| < |3| -> res[2] = 9, right=2
  - |-1| > |0| -> res[1] = 1, left=2
  - |0| == |0| -> res[0] = 0. Output: `[0,1,9,16,100]`
- **Complexity:** Time: O(N) | Space: O(N) (for result array)

---

### Q42) Merge Sorted Array
- **Problem Statement:** Merge two sorted integer arrays `nums1` and `nums2` into `nums1` as one sorted array. `nums1` has enough space at the end.
- **Concept:** Three Pointers (Iterate from back).
- **Optimal Algo:**
  - Pointer `p1` at last valid element of `nums1`, `p2` at last element of `nums2`.
  - Pointer `p` at the very end of `nums1`.
  - Compare `nums1[p1]` and `nums2[p2]`. Place the larger at `p` and decrement `p` and the chosen pointer.
  - If `nums2` has remaining elements, copy them over.
- **C++ Code:**
```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];
            else nums1[p--] = nums2[p2--];
        }
        while (p2 >= 0) nums1[p--] = nums2[p2--];
    }
};
```
- **Dry Run:** `nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3`
  - p1=2 (val 3), p2=2 (val 6). 6 > 3 -> nums1[5] = 6, p2=1
  - p1=2 (val 3), p2=1 (val 5). 5 > 3 -> nums1[4] = 5, p2=0
  - p1=2 (val 3), p2=0 (val 2). 3 > 2 -> nums1[3] = 3, p1=1
  - Continuing leaves `[1,2,2,3,5,6]`.
- **Complexity:** Time: O(N+M) | Space: O(1)

---

### Q43) Two Sum II - Input Array Is Sorted
- **Problem Statement:** Find two numbers that add up to a specific target in a 1-indexed sorted array. Use O(1) extra space.
- **Concept:** Two Pointers.
- **Optimal Algo:**
  - `left` at 0, `right` at `n-1`.
  - Check `sum = nums[left] + nums[right]`.
  - If `sum == target`, return 1-based indices.
  - If `sum < target`, increment `left`. Else, decrement `right`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return {left + 1, right + 1};
            else if (sum < target) left++;
            else right--;
        }
        return {};
    }
};
```
- **Dry Run:** `nums = [2,7,11,15], target = 9`
  - 2 + 15 = 17 > 9 -> right--
  - 2 + 11 = 13 > 9 -> right--
  - 2 + 7 = 9 == 9 -> return {1, 2}
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q44) Container With Most Water
- **Problem Statement:** Find two lines that together with the x-axis form a container, such that the container contains the most water.
- **Concept:** Two Pointers / Greedy.
- **Optimal Algo:**
  - `left` at 0, `right` at `n-1`.
  - Calculate area: `min(height[left], height[right]) * (right - left)`.
  - Update max area. Move the pointer pointing to the shorter line inward.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int max_water = 0;
        while (left < right) {
            int current_water = min(height[left], height[right]) * (right - left);
            max_water = max(max_water, current_water);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return max_water;
    }
};
```
- **Dry Run:** `height = [1,8,6,2,5,4,8,3,7]`
  - l=0 (1), r=8 (7) -> area 1*8 = 8. Move l++.
  - l=1 (8), r=8 (7) -> area 7*7 = 49. Move r--.
  - Final max_water = 49.
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q45) 3Sum
- **Problem Statement:** Find all unique triplets in the array which gives the sum of zero.
- **Concept:** Sorting + Two Pointers.
- **Optimal Algo:**
  - Sort the array.
  - Iterate `i` from 0 to `n-3`. Skip duplicate `nums[i]`.
  - Use `left = i + 1`, `right = n - 1` to find pairs that sum to `-nums[i]`.
  - Skip duplicates for `left` and `right` upon finding a valid triplet.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        int n = nums.size();
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicate i
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++; // Skip dups
                    while (left < right && nums[right] == nums[right - 1]) right--; // Skip dups
                    left++; right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
};
```
- **Dry Run:** `nums = [-1,0,1,2,-1,-4]` -> Sorted: `[-4,-1,-1,0,1,2]`
  - i=0 (-4): Two Sum for 4. No valid.
  - i=1 (-1): Two Sum for 1. Valid: (-1, -1, 2) and (-1, 0, 1).
  - i=2 (-1): Duplicate, skip.
- **Complexity:** Time: O(N^2) | Space: O(1) or O(N) depending on sorting

---

### Q46) Trapping Rain Water
- **Problem Statement:** Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap.
- **Concept:** Two Pointers.
- **Optimal Algo:**
  - `left` at 0, `right` at `n-1`. Track `left_max` and `right_max`.
  - If `height[left] <= height[right]`, evaluate the `left` side: if `height[left] < left_max`, trap water. Update `left_max`, move `left`.
  - Else, do the same for `right`.
- **C++ Code:**
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int left_max = 0, right_max = 0;
        int water = 0;
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= left_max) left_max = height[left];
                else water += left_max - height[left];
                left++;
            } else {
                if (height[right] >= right_max) right_max = height[right];
                else water += right_max - height[right];
                right--;
            }
        }
        return water;
    }
};
```
- **Dry Run:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
  - Moves pointers inward, tracking bounded heights. Pits add up to total water = 6.
- **Complexity:** Time: O(N) | Space: O(1)

---

## 📊 Prefix Sum — **6 Questions**

### Q47) Introduction (Running Sum of 1d Array)
- **Problem Statement:** Return the running sum of an array where `runningSum[i] = sum(nums[0]...nums[i])`.
- **Concept:** Prefix Sum Array.
- **Optimal Algo:**
  - Iterate from index 1 to `n-1`.
  - Add the previous element to the current element.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) {
            nums[i] += nums[i - 1];
        }
        return nums;
    }
};
```
- **Dry Run:** `nums = [1,2,3,4]`
  - i=1: 2+1=3 -> `[1,3,3,4]`
  - i=2: 3+3=6 -> `[1,3,6,4]`
  - i=3: 4+6=10 -> `[1,3,6,10]`
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q48) Range Sum Query - Immutable
- **Problem Statement:** Compute the sum of the elements of `nums` between indices `left` and `right` inclusive.
- **Concept:** Prefix Sum pre-computation.
- **Optimal Algo:**
  - Precompute a prefix sum array `prefix` where `prefix[i + 1]` stores sum of `nums[0..i]`.
  - For query `(left, right)`, return `prefix[right + 1] - prefix[left]`.
- **C++ Code:**
```cpp
class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.assign(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};
```
- **Dry Run:** `nums = [-2, 0, 3, -5, 2, -1]`
  - Prefix: `[0, -2, -2, 1, -4, -2, -3]`
  - query(0, 2) -> prefix[3] - prefix[0] = 1 - 0 = 1.
- **Complexity:** Constructor Time: O(N) | Query Time: O(1) | Space: O(N)

---

### Q49) Subarray Sum Equals K
- **Problem Statement:** Find the total number of continuous subarrays whose sum equals `k`.
- **Concept:** Prefix Sum + Hash Map.
- **Optimal Algo:**
  - Maintain a running sum (`prefix_sum`).
  - To find a subarray ending at current index summing to `k`, we check if `prefix_sum - k` has been seen before.
  - Store frequency of all `prefix_sum`s in a map. Initialize map with `{0: 1}`.
- **C++ Code:**
```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCounts;
        prefixCounts[0] = 1;
        int sum = 0, count = 0;
        for (int num : nums) {
            sum += num;
            if (prefixCounts.count(sum - k)) count += prefixCounts[sum - k];
            prefixCounts[sum]++;
        }
        return count;
    }
};
```
- **Dry Run:** `nums = [1,1,1], k = 2`
  - i=0 (1), sum=1, map={0:1, 1:1}, sum-2 = -1 (not in map)
  - i=1 (1), sum=2, map={0:1, 1:1, 2:1}, sum-2 = 0 (in map, freq 1), count=1
  - i=2 (1), sum=3, map={...3:1}, sum-2 = 1 (in map, freq 1), count=2.
- **Complexity:** Time: O(N) | Space: O(N)

---

### Q50) Subarray Sums Divisible by K
- **Problem Statement:** Find the number of contiguous subarrays whose sum is divisible by `k`.
- **Concept:** Prefix Sum Remainder + Hash Map.
- **Optimal Algo:**
  - Track `prefix_sum % k`. Subarrays divisible by `k` start and end at points with the same remainder.
  - Adjust negative remainders by adding `k`: `rem = (rem % k + k) % k`.
  - Use an array/map to count frequencies of remainders.
- **C++ Code:**
```cpp
class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        vector<int> remCounts(k, 0);
        remCounts[0] = 1;
        int sum = 0, count = 0;
        for (int num : nums) {
            sum += num;
            int rem = (sum % k + k) % k; // handle negatives
            count += remCounts[rem];
            remCounts[rem]++;
        }
        return count;
    }
};
```
- **Dry Run:** `nums = [4,5,0,-2,-3,1], k = 5`
  - 4%5=4 (freq 1) -> 9%5=4 (add 1 to count, freq 2) -> 9%5=4 (add 2 to count, freq 3) -> 7%5=2 -> 4%5=4 (add 3 to count, freq 4) -> 5%5=0 (add 1 to count, freq 2). Total = 7.
- **Complexity:** Time: O(N) | Space: O(K)

---

### Q51) Continuous Subarray Sum
- **Problem Statement:** Return true if there is a continuous subarray of size at least 2 whose sum is a multiple of `k`.
- **Concept:** Prefix Sum Remainder Map storing indices.
- **Optimal Algo:**
  - Track `prefix_sum % k`.
  - Use a hash map to store the *first index* where each remainder occurs. Initialize with `{0: -1}`.
  - If a remainder is seen again, check if `currentIndex - storedIndex >= 2`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> remMap;
        remMap[0] = -1;
        int sum = 0;
        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i];
            int rem = sum % k;
            if (remMap.count(rem)) {
                if (i - remMap[rem] >= 2) return true;
            } else {
                remMap[rem] = i;
            }
        }
        return false;
    }
};
```
- **Dry Run:** `nums = [23,2,4,6,7], k = 6`
  - map={0:-1}, sum=23, rem=5 -> map={0:-1, 5:0}
  - sum=25, rem=1 -> map={..., 1:1}
  - sum=29, rem=5. Seen 5! index 2 - map[5](0) = 2 >= 2. Returns true.
- **Complexity:** Time: O(N) | Space: O(min(N, K))

---

### Q52) Contiguous Array
- **Problem Statement:** Find the maximum length of a contiguous subarray with an equal number of 0s and 1s.
- **Concept:** Prefix Sum (+1 for 1, -1 for 0).
- **Optimal Algo:**
  - Treat `0`s as `-1`. A valid subarray has a sum of `0`.
  - Use a hash map storing the *first index* of each `prefix_sum`. Initialize `{0: -1}`.
  - If `prefix_sum` is seen again, update `max_len = max(max_len, i - map[prefix_sum])`.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        unordered_map<int, int> sumIndex;
        sumIndex[0] = -1;
        int sum = 0, max_len = 0;
        for (int i = 0; i < nums.size(); i++) {
            sum += (nums[i] == 1) ? 1 : -1;
            if (sumIndex.count(sum)) {
                max_len = max(max_len, i - sumIndex[sum]);
            } else {
                sumIndex[sum] = i;
            }
        }
        return max_len;
    }
};
```
- **Dry Run:** `nums = [0,1,0]`
  - i=0 (0->-1): sum=-1, map={0:-1, -1:0}
  - i=1 (1->1): sum=0. Seen 0 at -1. length = 1 - (-1) = 2.
  - i=2 (0->-1): sum=-1. Seen -1 at 0. length = 2 - 0 = 2. Max is 2.
- **Complexity:** Time: O(N) | Space: O(N)

---

## 🪟 Sliding Window — **11 Questions**

### Fixed Size

### Q53) Introduction (Maximum Sum Subarray of Size K)
- **Problem Statement:** Given an array of integers and an integer K, find the maximum sum of any contiguous subarray of size K.
- **Concept:** Fixed Sliding Window.
- **Optimal Algo:**
  - Calculate sum of the first `K` elements.
  - Slide window 1 by 1: `new_sum = old_sum - nums[i - K] + nums[i]`.
  - Update maximum sum.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxSumSubarray(vector<int>& nums, int k) {
        int window_sum = 0, max_sum = 0;
        for (int i = 0; i < k; i++) window_sum += nums[i];
        max_sum = window_sum;
        for (int i = k; i < nums.size(); i++) {
            window_sum += nums[i] - nums[i - k];
            max_sum = max(max_sum, window_sum);
        }
        return max_sum;
    }
};
```
- **Dry Run:** `nums = [2, 1, 5, 1, 3, 2], k = 3`
  - init: 2+1+5 = 8.
  - i=3 (1): 8 - 2 + 1 = 7. max = 8.
  - i=4 (3): 7 - 1 + 3 = 9. max = 9.
  - i=5 (2): 9 - 5 + 2 = 6. max = 9.
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q54) Maximum Average Subarray I
- **Problem Statement:** Find a contiguous subarray whose length is `k` that has the maximum average value, and return this value.
- **Concept:** Fixed Sliding Window.
- **Optimal Algo:**
  - Identical to Q53, just return `max_sum / (double)k`.
- **C++ Code:**
```cpp
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double current_sum = 0, max_sum = 0;
        for (int i = 0; i < k; i++) current_sum += nums[i];
        max_sum = current_sum;
        for (int i = k; i < nums.size(); i++) {
            current_sum += nums[i] - nums[i - k];
            max_sum = max(max_sum, current_sum);
        }
        return max_sum / k;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q55) Find All Anagrams in a String
- **Problem Statement:** Find all starting indices of `p`'s anagrams in `s`.
- **Concept:** Fixed Sliding Window + Frequency Arrays.
- **Optimal Algo:**
  - Create frequency arrays (size 26) for string `p` and the first `p.length()` characters of `s`.
  - Compare the two arrays. Slide the window one character at a time, adding the new character and removing the old one.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        if (s.length() < p.length()) return {};
        vector<int> pCount(26, 0), sCount(26, 0), res;
        for (int i = 0; i < p.length(); i++) {
            pCount[p[i] - 'a']++;
            sCount[s[i] - 'a']++;
        }
        if (pCount == sCount) res.push_back(0);
        
        for (int i = p.length(); i < s.length(); i++) {
            sCount[s[i] - 'a']++;
            sCount[s[i - p.length()] - 'a']--;
            if (pCount == sCount) res.push_back(i - p.length() + 1);
        }
        return res;
    }
};
```
- **Dry Run:** `s = "cbaebabacd", p = "abc"`
  - pCount = [1,1,1]
  - index 0 ("cba"): matches, add 0
  - index 1 ("bae"): no match
  - index 6 ("bac"): matches, add 6.
- **Complexity:** Time: O(N) | Space: O(1) (26-length arrays)

---

### Q56) Permutation in String
- **Problem Statement:** Return true if `s2` contains a permutation of `s1`.
- **Concept:** Fixed Sliding Window + Frequency Arrays.
- **Optimal Algo:**
  - Exactly the same logic as Q55, but instead of appending indices to a list, immediately return `true` upon finding a match. Return `false` at the end.
- **C++ Code:**
```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if (s1.length() > s2.length()) return false;
        vector<int> s1Count(26, 0), s2Count(26, 0);
        for (int i = 0; i < s1.length(); i++) {
            s1Count[s1[i] - 'a']++;
            s2Count[s2[i] - 'a']++;
        }
        if (s1Count == s2Count) return true;
        
        for (int i = s1.length(); i < s2.length(); i++) {
            s2Count[s2[i] - 'a']++;
            s2Count[s2[i - s1.length()] - 'a']--;
            if (s1Count == s2Count) return true;
        }
        return false;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q57) Maximum Sum of Distinct Subarrays With Length K
- **Problem Statement:** Maximize the sum of a subarray of size `K`, given that all elements in the subarray must be distinct.
- **Concept:** Fixed Sliding Window + Hash Map.
- **Optimal Algo:**
  - Track window sum and frequencies of elements in a hash map.
  - Slide window. If `map.size() == k`, it means all elements are distinct; update `max_sum`.
- **C++ Code:**
```cpp
class Solution {
public:
    long long maximumSubarraySum(vector<int>& nums, int k) {
        long long current_sum = 0, max_sum = 0;
        unordered_map<int, int> freq;
        for (int i = 0; i < k; i++) {
            current_sum += nums[i];
            freq[nums[i]]++;
        }
        if (freq.size() == k) max_sum = current_sum;
        
        for (int i = k; i < nums.size(); i++) {
            current_sum += nums[i] - nums[i - k];
            freq[nums[i]]++;
            freq[nums[i - k]]--;
            if (freq[nums[i - k]] == 0) freq.erase(nums[i - k]);
            
            if (freq.size() == k) max_sum = max(max_sum, current_sum);
        }
        return max_sum;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(K)

---

### Q58) Substring with Concatenation of All Words
- **Problem Statement:** Find all starting indices of substring(s) in `s` that is a concatenation of all words in `words` exactly once. All words are of equal length.
- **Concept:** Sliding Window with Step Size = Word Length.
- **Optimal Algo:**
  - Create a frequency map for the required words.
  - Because each word is of length `L`, we can run the sliding window `L` times (offsetting start from 0 to `L-1`).
  - Slide by chunks of size `L`. Keep a local frequency map and match count. Adjust left edge of window when a word count exceeds requirement.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> res;
        int wordLen = words[0].length(), wordCount = words.size();
        if (s.length() < wordLen * wordCount) return res;
        
        unordered_map<string, int> wordMap;
        for (string w : words) wordMap[w]++;
        
        for (int i = 0; i < wordLen; i++) {
            int left = i, count = 0;
            unordered_map<string, int> seen;
            for (int right = i; right <= (int)s.length() - wordLen; right += wordLen) {
                string sub = s.substr(right, wordLen);
                if (wordMap.count(sub)) {
                    seen[sub]++;
                    count++;
                    while (seen[sub] > wordMap[sub]) {
                        string leftWord = s.substr(left, wordLen);
                        seen[leftWord]--;
                        count--;
                        left += wordLen;
                    }
                    if (count == wordCount) res.push_back(left);
                } else {
                    seen.clear();
                    count = 0;
                    left = right + wordLen;
                }
            }
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N * L) (N=len(s), L=len(word)) | Space: O(M) (M=words array size)

---

### Dynamic Size

### Q59) Longest Substring Without Repeating Characters
- **Problem Statement:** Find the length of the longest substring without repeating characters.
- **Concept:** Dynamic Sliding Window + Hash Set / Array.
- **Optimal Algo:**
  - `left` and `right` pointers. Expand `right`.
  - If `s[right]` is already in the set, remove `s[left]` from the set and move `left` inward until `s[right]` can be added.
  - Update `max_len = max(max_len, right - left + 1)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastIndex(256, -1);
        int max_len = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            if (lastIndex[s[right]] >= left) {
                left = lastIndex[s[right]] + 1;
            }
            lastIndex[s[right]] = right;
            max_len = max(max_len, right - left + 1);
        }
        return max_len;
    }
};
```
- **Dry Run:** `s = "abcabcbb"`
  - a: len 1
  - b: len 2
  - c: len 3
  - a: repeat at 0. left becomes 1. len 3.
  - Final max is 3 ("abc").
- **Complexity:** Time: O(N) | Space: O(1) (256 ASCII characters)

---

### Q60) Longest Repeating Character Replacement
- **Problem Statement:** Replace at most `k` characters with any character to find the longest substring containing identical characters.
- **Concept:** Dynamic Sliding Window.
- **Optimal Algo:**
  - Window `[left, right]`. Track frequencies of characters.
  - Track `maxFreq` inside the window.
  - Condition: If `windowSize - maxFreq > k`, the window is invalid. Shrink it by moving `left` and decrementing the frequency of `s[left]`.
- **C++ Code:**
```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> counts(26, 0);
        int left = 0, max_len = 0, maxFreq = 0;
        for (int right = 0; right < s.length(); right++) {
            counts[s[right] - 'A']++;
            maxFreq = max(maxFreq, counts[s[right] - 'A']);
            
            if ((right - left + 1) - maxFreq > k) {
                counts[s[left] - 'A']--;
                left++;
            }
            max_len = max(max_len, right - left + 1);
        }
        return max_len;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1) (26 characters)

---

### Q61) Minimum Size Subarray Sum
- **Problem Statement:** Find minimal length of a subarray whose sum `>= target`.
- **Concept:** Dynamic Sliding Window (Shrinking).
- **Optimal Algo:**
  - Add elements to `sum` while advancing `right`.
  - While `sum >= target`, update `min_len` and subtract `nums[left]` then increment `left` to shrink the window.
- **C++ Code:**
```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0, min_len = INT_MAX;
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (sum >= target) {
                min_len = min(min_len, right - left + 1);
                sum -= nums[left++];
            }
        }
        return min_len == INT_MAX ? 0 : min_len;
    }
};
```
- **Dry Run:** `target = 7, nums = [2,3,1,2,4,3]`
  - add till 2,3,1,2 (sum=8). len=4. shrink -> 3,1,2 (sum=6).
  - add 4 (sum=10). len=4. shrink -> 1,2,4 (sum=7). len=3. shrink -> 2,4 (sum=6).
  - add 3 (sum=9). len=3. shrink -> 4,3 (sum=7). len=2.
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q62) Max Consecutive Ones III
- **Problem Statement:** Find max number of consecutive 1s if you can flip at most `k` 0s.
- **Concept:** Dynamic Sliding Window.
- **Optimal Algo:**
  - Keep track of `zeros` in the window.
  - While `zeros > k`, if `nums[left] == 0` decrement `zeros`, move `left++`.
  - Max length is updated `right - left + 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0, zeros = 0, max_len = 0;
        for (int right = 0; right < nums.size(); right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > k) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            max_len = max(max_len, right - left + 1);
        }
        return max_len;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q63) Minimum Window Substring
- **Problem Statement:** Find the minimum window in `s` which will contain all the characters in `t`.
- **Concept:** Dynamic Sliding Window + Two Frequency Maps.
- **Optimal Algo:**
  - Count requirements in `tMap`. Maintain `required` unique character count.
  - Expand `right` and update `windowMap`. If a character's frequency matches the target frequency, `formed++`.
  - While `formed == required`, update minimum window and shrink `left`.
- **C++ Code:**
```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        if (s.length() < t.length()) return "";
        unordered_map<char, int> tMap, windowMap;
        for (char c : t) tMap[c]++;
        
        int required = tMap.size(), formed = 0;
        int left = 0, min_len = INT_MAX, start_idx = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s[right];
            windowMap[c]++;
            if (tMap.count(c) && windowMap[c] == tMap[c]) formed++;
            
            while (left <= right && formed == required) {
                if (right - left + 1 < min_len) {
                    min_len = right - left + 1;
                    start_idx = left;
                }
                char leftChar = s[left];
                windowMap[leftChar]--;
                if (tMap.count(leftChar) && windowMap[leftChar] < tMap[leftChar]) formed--;
                left++;
            }
        }
        return min_len == INT_MAX ? "" : s.substr(start_idx, min_len);
    }
};
```
- **Dry Run:** `s = "ADOBECODEBANC", t = "ABC"`
  - Expand till "ADOBEC". Contains A, B, C. Length 6.
  - Shrink `left` to 'D'. Needs 'A' again.
  - Expand till "ADOBECODEBA", etc. Shortest found is "BANC", len 4.
- **Complexity:** Time: O(N + M) | Space: O(1) (ASCII size constraint)


## ⚡ Kadane's Algorithm — **5 Questions**

### Q64) Introduction (Maximum Subarray Sum Basics)
- **Problem Statement:** Understand how to find the maximum sum of a contiguous subarray using Kadane's algorithm.
- **Concept:** Local Maximum vs. Global Maximum.
- **Optimal Algo:** 
  - Track `current_sum` and `max_sum`.
  - For each element, `current_sum = max(element, current_sum + element)`.
  - Update `max_sum = max(max_sum, current_sum)`.
- **C++ Code:** *(Covered in Q65 Maximum Subarray)*

---

### Q65) Maximum Subarray
- **Problem Statement:** Given an integer array `nums`, find the contiguous subarray containing at least one number which has the largest sum and return its sum.
- **Concept:** Kadane's Algorithm.
- **Optimal Algo:**
  - Initialize `curr_max = nums[0]` and `global_max = nums[0]`.
  - Iterate from index 1: `curr_max = max(nums[i], curr_max + nums[i])`.
  - Update `global_max = max(global_max, curr_max)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int curr_max = nums[0], global_max = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            curr_max = max(nums[i], curr_max + nums[i]);
            global_max = max(global_max, curr_max);
        }
        return global_max;
    }
};
```
- **Dry Run:** `nums = [-2,1,-3,4,-1,2,1,-5,4]`
  - i=1 (1): curr_max=max(1, -1)=1, global=1
  - i=2 (-3): curr_max=max(-3, -2)=-2, global=1
  - i=3 (4): curr_max=max(4, 2)=4, global=4
  - i=4 (-1): curr_max=3, global=4
  - i=5 (2): curr_max=5, global=5. Max is 6 eventually (4,-1,2,1).
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q66) Maximum Sum Circular Subarray
- **Problem Statement:** Find the maximum possible sum of a non-empty subarray of a circular array.
- **Concept:** Kadane's Algorithm (Max and Min variants).
- **Optimal Algo:**
  - Find the normal `max_subarray_sum` using Kadane's.
  - Find the normal `min_subarray_sum` using Kadane's. Calculate the `total_sum` of the array.
  - The circular max sum is `total_sum - min_subarray_sum`.
  - Edge case: If all numbers are negative, `total_sum == min_subarray_sum`, which means the circular max would be 0 (empty subarray). In this case, just return `max_subarray_sum`.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total_sum = 0, curr_max = 0, curr_min = 0;
        int max_sum = INT_MIN, min_sum = INT_MAX;
        for (int x : nums) {
            total_sum += x;
            curr_max = max(curr_max + x, x);
            max_sum = max(max_sum, curr_max);
            curr_min = min(curr_min + x, x);
            min_sum = min(min_sum, curr_min);
        }
        return max_sum > 0 ? max(max_sum, total_sum - min_sum) : max_sum;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q67) Maximum Product Subarray
- **Problem Statement:** Find a contiguous non-empty subarray within an array that has the largest product.
- **Concept:** Modified Kadane's (Tracking Min and Max).
- **Optimal Algo:**
  - Because multiplying two negatives yields a positive, we must track both the `current_max` and `current_min` product up to the current element.
  - If we see a negative number, swap `current_max` and `current_min`.
  - Update `current_max = max(num, current_max * num)` and similarly for min.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        if (nums.empty()) return 0;
        int curr_max = nums[0], curr_min = nums[0], global_max = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] < 0) swap(curr_max, curr_min);
            curr_max = max(nums[i], curr_max * nums[i]);
            curr_min = min(nums[i], curr_min * nums[i]);
            global_max = max(global_max, curr_max);
        }
        return global_max;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Q68) Best Sightseeing Pair
- **Problem Statement:** Maximize `values[i] + values[j] + i - j` for `i < j`.
- **Concept:** DP / Kadane's variation.
- **Optimal Algo:**
  - Rewrite formula as `(values[i] + i) + (values[j] - j)`.
  - Maintain the maximum of `values[i] + i` seen so far while iterating `j`.
  - For each `j`, calculate the score using the `max_i_val` and update `max_score`.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxScoreSightseeingPair(vector<int>& values) {
        int max_i_val = values[0] + 0;
        int max_score = 0;
        for (int j = 1; j < values.size(); j++) {
            max_score = max(max_score, max_i_val + values[j] - j);
            max_i_val = max(max_i_val, values[j] + j);
        }
        return max_score;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

## 🧱 Matrix — **5 Questions**

### Q69) Spiral Matrix
- **Problem Statement:** Return all elements of an `m x n` matrix in spiral order.
- **Concept:** 4-Way Boundary Traversal.
- **Optimal Algo:**
  - Maintain 4 boundaries: `top`, `bottom`, `left`, `right`.
  - Traverse right across `top`, then `top++`. Traverse down `right`, then `right--`. Traverse left across `bottom` (if `top <= bottom`), then `bottom--`. Traverse up `left` (if `left <= right`), then `left++`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        if (matrix.empty()) return res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;
        
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
            top++;
            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
};
```
- **Complexity:** Time: O(M * N) | Space: O(1)

---

### Q70) Rotate Image
- **Problem Statement:** Rotate an `n x n` 2D matrix 90 degrees clockwise in-place.
- **Concept:** Matrix Transposition & Reversal.
- **Optimal Algo:**
  - Step 1: Transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`).
  - Step 2: Reverse every row.
- **C++ Code:**
```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};
```
- **Complexity:** Time: O(N^2) | Space: O(1)

---

### Q71) Set Matrix Zeroes
- **Problem Statement:** If an element is 0, set its entire row and column to 0 in-place.
- **Concept:** In-place State Tracking.
- **Optimal Algo:**
  - Use the first row and first column to keep track of which rows/cols need to be set to zero.
  - Since `matrix[0][0]` overlaps for both, use an extra variable `col0` for the first column.
  - Traverse to mark flags. Traverse again (from bottom-right to top-left) to apply zeroes.
- **C++ Code:**
```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool col0 = false;
        
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) col0 = true;
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 1; j--) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
            if (col0) matrix[i][0] = 0;
        }
    }
};
```
- **Complexity:** Time: O(M * N) | Space: O(1)

---

### Q72) Valid Sudoku
- **Problem Statement:** Determine if a 9x9 Sudoku board is valid (no repeating numbers in rows, cols, or 3x3 sub-boxes).
- **Concept:** Hash Set / Boolean Array tracking.
- **Optimal Algo:**
  - Create 3 arrays of hash sets (or bitmasks) for rows, columns, and 3x3 boxes.
  - The box index for `(r, c)` is `(r / 3) * 3 + (c / 3)`.
  - Check if the number already exists in the corresponding row, column, or box.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        int rows[9][9] = {0}, cols[9][9] = {0}, boxes[9][9] = {0};
        
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] != '.') {
                    int num = board[r][c] - '1';
                    int boxIndex = (r / 3) * 3 + c / 3;
                    if (rows[r][num]++ || cols[c][num]++ || boxes[boxIndex][num]++) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
```
- **Complexity:** Time: O(1) (81 cells) | Space: O(1)

---

### Q73) Game of Life
- **Problem Statement:** Compute the next state of Conway's Game of Life on an `m x n` board in-place.
- **Concept:** In-place State Encoding.
- **Optimal Algo:**
  - Use bits to represent states.
  - `00` -> Dead to Dead (0), `01` -> Live to Dead (1), `10` -> Dead to Live (2), `11` -> Live to Live (3).
  - Iterate board: count live neighbors (check `board[r][c] % 2 == 1`). If a cell becomes alive, set to 2. If it stays alive, set to 3.
  - Second pass: update board by doing `board[r][c] >>= 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size(), n = board[0].size();
        auto countNeighbors = [&](int r, int c) {
            int live = 0;
            for (int i = -1; i <= 1; i++) {
                for (int j = -1; j <= 1; j++) {
                    if (i == 0 && j == 0) continue;
                    int nr = r + i, nc = c + j;
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && (board[nr][nc] & 1) == 1) live++;
                }
            }
            return live;
        };
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int live = countNeighbors(r, c);
                if (board[r][c] == 1 && (live == 2 || live == 3)) board[r][c] = 3;
                if (board[r][c] == 0 && live == 3) board[r][c] = 2;
            }
        }
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) board[r][c] >>= 1;
        }
    }
};
```
- **Complexity:** Time: O(M * N) | Space: O(1)

---

## 🔗 Linked List — **20 Questions**

*(I will collapse simple questions like Introduction into foundational ones as before.)*

### Basic

### Q74) Introduction (Delete Node in a Linked List)
- **Problem Statement:** Delete a node from a singly linked list given only access to that node.
- **Concept:** Pointer Modification.
- **Optimal Algo:** Copy the value of the next node to the current node, then delete the next node by skipping it.
- **C++ Code:**
```cpp
class Solution {
public:
    void deleteNode(ListNode* node) {
        node->val = node->next->val;
        node->next = node->next->next;
    }
};
```

### Q75) Intersection of Two Linked Lists
- **Problem Statement:** Find the node at which the intersection of two singly linked lists begins.
- **Concept:** Two Pointers / Equalization.
- **Optimal Algo:** 
  - Use two pointers, `pA` and `pB`, starting at the heads.
  - Traverse. If `pA` reaches null, reset it to `headB`. If `pB` reaches null, reset it to `headA`.
  - They will meet at the intersection (or at null).
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *pA = headA, *pB = headB;
        while (pA != pB) {
            pA = pA ? pA->next : headB;
            pB = pB ? pB->next : headA;
        }
        return pA;
    }
};
```
- **Complexity:** Time: O(N + M) | Space: O(1)

### Q76) Design Linked List
- **Problem Statement:** Design a singly or doubly linked list (get, addAtHead, addAtTail, addAtIndex, deleteAtIndex).
- **Concept:** Object-Oriented List Operations.
- **Optimal Algo:** Maintain a `size`, `head`, and `tail` (if doubly). Careful with null checks. *(Code omitted for brevity as it's a standard class design rather than algorithmic puzzle)*

### Q77) Remove Nth Node From End of List
- **Problem Statement:** Remove the `n`-th node from the end of the list and return its head.
- **Concept:** Fast and Slow Pointers.
- **Optimal Algo:**
  - Create a `dummy` node pointing to `head`.
  - Advance `fast` pointer `n` steps ahead.
  - Advance `fast` and `slow` together until `fast->next == null`.
  - Skip the node: `slow->next = slow->next->next`.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode *slow = dummy, *fast = dummy;
        for (int i = 0; i < n; i++) fast = fast->next;
        while (fast->next) {
            slow = slow->next;
            fast = fast->next;
        }
        slow->next = slow->next->next;
        return dummy->next;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q78) Remove Duplicates from Sorted List II
- **Problem Statement:** Given a sorted list, delete all nodes that have duplicate numbers, leaving only distinct numbers.
- **Concept:** Dummy Node / Look Ahead.
- **Optimal Algo:**
  - `dummy` node points to `head`. `prev` points to `dummy`.
  - If `head` and `head->next` have same values, advance `head` until a new value is found, then point `prev->next` to this new value. Else, advance `prev`.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;
        while (head) {
            if (head->next && head->val == head->next->val) {
                while (head->next && head->val == head->next->val) head = head->next;
                prev->next = head->next;
            } else {
                prev = prev->next;
            }
            head = head->next;
        }
        return dummy->next;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q79) Swap Nodes in Pairs
- **Problem Statement:** Swap every two adjacent nodes and return its head.
- **Concept:** Iterative Pointer Swapping.
- **Optimal Algo:**
  - `prev` points to dummy.
  - While `prev->next` and `prev->next->next` exist:
    - Identify `first` and `second`.
    - `prev->next = second`. `first->next = second->next`. `second->next = first`.
    - Move `prev` to `first`.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;
        while (prev->next && prev->next->next) {
            ListNode* first = prev->next;
            ListNode* second = first->next;
            first->next = second->next;
            second->next = first;
            prev->next = second;
            prev = first;
        }
        return dummy->next;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q80) Copy List with Random Pointer
- **Problem Statement:** Deep copy a linked list where nodes have a `next` and a `random` pointer.
- **Concept:** Interleaving / Hash Map.
- **Optimal Algo (Interleaving):**
  - Duplicate each node and insert it immediately after the original node: `A -> A' -> B -> B'`.
  - Set random pointers: `A'->random = A->random ? A->random->next : null`.
  - Unweave the lists back into original and copy.
- **C++ Code:**
```cpp
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        for (Node* curr = head; curr; curr = curr->next->next) {
            Node* copy = new Node(curr->val);
            copy->next = curr->next;
            curr->next = copy;
        }
        for (Node* curr = head; curr; curr = curr->next->next) {
            if (curr->random) curr->next->random = curr->random->next;
        }
        Node* copyHead = head->next;
        for (Node* curr = head; curr; curr = curr->next) {
            Node* copy = curr->next;
            curr->next = copy->next;
            if (copy->next) copy->next = copy->next->next;
        }
        return copyHead;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q81) Partition List
- **Problem Statement:** Partition list such that all nodes less than `x` come before nodes greater than or equal to `x`. Preserve relative order.
- **Concept:** Two Dummy Heads.
- **Optimal Algo:**
  - Create `lessHead` and `greaterHead`. Add nodes to the respective lists.
  - Merge the end of `less` to the start of `greater`. Set end of `greater` to null.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode *lessHead = new ListNode(0), *less = lessHead;
        ListNode *greaterHead = new ListNode(0), *greater = greaterHead;
        while (head) {
            if (head->val < x) { less->next = head; less = less->next; }
            else { greater->next = head; greater = greater->next; }
            head = head->next;
        }
        greater->next = nullptr;
        less->next = greaterHead->next;
        return lessHead->next;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q82) Rotate List
- **Problem Statement:** Rotate a list to the right by `k` places.
- **Concept:** Make Circular & Cut.
- **Optimal Algo:**
  - Compute length `n`. Connect tail to head to form a cycle.
  - Find the new tail at `(n - k % n - 1)` steps from head.
  - Set new head to `new_tail->next`. Break the cycle `new_tail->next = null`.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        ListNode* tail = head;
        int n = 1;
        while (tail->next) { tail = tail->next; n++; }
        tail->next = head; // cycle
        
        k = k % n;
        ListNode* new_tail = head;
        for (int i = 0; i < n - k - 1; i++) new_tail = new_tail->next;
        
        ListNode* new_head = new_tail->next;
        new_tail->next = nullptr; // break cycle
        return new_head;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q83) Add Two Numbers
- **Problem Statement:** Add two numbers represented by linked lists (digits stored in reverse order).
- **Concept:** Math Carry / List Traversal.
- **Optimal Algo:** Iterate through both lists, add values + carry. Create a new node with `sum % 10`, pass `sum / 10` as carry.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int sum = carry + (l1 ? l1->val : 0) + (l2 ? l2->val : 0);
            curr->next = new ListNode(sum % 10);
            carry = sum / 10;
            curr = curr->next;
            if (l1) l1 = l1->next;
            if (l2) l2 = l2->next;
        }
        return dummy->next;
    }
};
```
- **Complexity:** Time: O(max(N,M)) | Space: O(max(N,M))

### Q84) Flatten a Multilevel Doubly Linked List
- **Problem Statement:** Flatten a multi-level doubly linked list where nodes have `next`, `prev`, and `child` pointers.
- **Concept:** DFS / Stack (Iterative connection).
- **Optimal Algo:**
  - Iterate through list. When a node has a `child`, find the tail of that child's list.
  - Connect the tail to the current node's `next`. Connect the current node to the `child`. Nullify the `child` pointer.
- **C++ Code:**
```cpp
class Solution {
public:
    Node* flatten(Node* head) {
        Node* curr = head;
        while (curr) {
            if (curr->child) {
                Node* tail = curr->child;
                while (tail->next) tail = tail->next;
                tail->next = curr->next;
                if (curr->next) curr->next->prev = tail;
                curr->next = curr->child;
                curr->child->prev = curr;
                curr->child = nullptr;
            }
            curr = curr->next;
        }
        return head;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Reversal

### Q85) In-place Reversal (Reverse Linked List)
- **Problem Statement:** Reverse a singly linked list.
- **Concept:** Iterative Pointer Reversal.
- **Optimal Algo:** Use `prev`, `curr`, `next`. While `curr`: `next = curr->next`, `curr->next = prev`, `prev = curr`, `curr = next`.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q86) Introduction (Middle/Reversal combo basics)
*(Skipped as redundant, merged into Palindrome Linked List)*

### Q87) Palindrome Linked List
- **Problem Statement:** Determine if a singly linked list is a palindrome.
- **Concept:** Fast/Slow Pointers + Reversal.
- **Optimal Algo:**
  - Find middle using fast/slow.
  - Reverse the second half of the list.
  - Compare first half and reversed second half.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
        ListNode *prev = nullptr;
        while (slow) {
            ListNode* nextTemp = slow->next;
            slow->next = prev;
            prev = slow;
            slow = nextTemp;
        }
        while (prev) {
            if (head->val != prev->val) return false;
            head = head->next; prev = prev->next;
        }
        return true;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q88) Reverse Linked List II
- **Problem Statement:** Reverse nodes of the list from position `left` to `right`.
- **Concept:** Sublist Reversal.
- **Optimal Algo:**
  - Dummy node. Advance `prev` to `left - 1`.
  - `start = prev->next`, `then = start->next`.
  - For `i` from 0 to `right - left`: perform standard internal reversal insertion.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;
        for (int i = 0; i < left - 1; i++) prev = prev->next;
        ListNode* start = prev->next;
        ListNode* then = start->next;
        for (int i = 0; i < right - left; i++) {
            start->next = then->next;
            then->next = prev->next;
            prev->next = then;
            then = start->next;
        }
        return dummy->next;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q89) Reverse Nodes in k-Group
- **Problem Statement:** Reverse the nodes of a list `k` at a time. Leftover nodes remain as is.
- **Concept:** Group counting + Reverse Between.
- **Optimal Algo:**
  - Count length. For every `k` chunk, reverse the inner links similarly to Q88.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        if (!head || k == 1) return head;
        int count = 0; ListNode* dummy = new ListNode(0, head);
        ListNode *curr = dummy, *prev = dummy, *next = dummy;
        while (curr->next) { curr = curr->next; count++; }
        
        while (count >= k) {
            curr = prev->next; next = curr->next;
            for (int i = 1; i < k; i++) {
                curr->next = next->next;
                next->next = prev->next;
                prev->next = next;
                next = curr->next;
            }
            prev = curr; count -= k;
        }
        return dummy->next;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

### Fast and Slow Pointers

### Q90) Middle of the Linked List
- **Problem Statement:** Find the middle node. If two middle nodes, return the second.
- **Concept:** Fast/Slow.
- **Optimal Algo:** `slow` moves 1 step, `fast` moves 2 steps. When `fast` reaches end, `slow` is at the middle.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
        return slow;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q91) Happy Number
- **Problem Statement:** Determine if a number is "happy" (sum of squares of digits eventually reaches 1).
- **Concept:** Cycle Detection (Floyd's).
- **Optimal Algo:** Treat digit-squaring as finding `next` in a linked list. Use fast and slow pointers. If they meet at 1, true. Else, false.
- **C++ Code:**
```cpp
class Solution {
    int getNext(int n) {
        int sum = 0;
        while (n) { sum += (n % 10) * (n % 10); n /= 10; }
        return sum;
    }
public:
    bool isHappy(int n) {
        int slow = n, fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }
};
```
- **Complexity:** Time: O(log N) | Space: O(1)

### Q92) Linked List Cycle II
- **Problem Statement:** Return the node where the cycle begins.
- **Concept:** Floyd's Cycle-Finding Algorithm.
- **Optimal Algo:**
  - `slow` and `fast` pointers. When they meet, there is a cycle.
  - Reset `slow` to `head`. Move both `slow` and `fast` by 1 step. Where they meet again is the start of the cycle.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next; fast = fast->next->next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) { slow = slow->next; fast = fast->next; }
                return slow;
            }
        }
        return nullptr;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

---

## 📚 Stacks — **16 Questions**

### Basics

### Q93) Introduction (Implement Stack using Queues)
- **Problem Statement:** Implement a LIFO stack using only two queues.
- **Concept:** Queue Simulation.
- **Optimal Algo:** On push, push to an empty queue `q2`, then enqueue all elements from `q1` to `q2`. Swap `q1` and `q2`.
- **C++ Code:** *(Skipped standard ADT implementation code for brevity)*

### Q94) Valid Parentheses
- **Problem Statement:** Determine if input string has valid matching brackets.
- **Concept:** Stack.
- **Optimal Algo:** Push opening brackets. If closing bracket, pop stack and check if it matches. Return `stack.empty()`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) return false;
            }
        }
        return st.empty();
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q95) Remove All Adjacent Duplicates In String
- **Problem Statement:** Remove duplicate adjacent pairs recursively.
- **Concept:** String as Stack.
- **Optimal Algo:** Use the output string as a stack. If `c` equals the back of the string, pop it. Else, push it.
- **C++ Code:**
```cpp
class Solution {
public:
    string removeDuplicates(string s) {
        string res = "";
        for (char c : s) {
            if (!res.empty() && res.back() == c) res.pop_back();
            else res.push_back(c);
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q96) Min Stack
- **Problem Statement:** Design a stack that supports `getMin()` in O(1) time.
- **Concept:** Parallel Stack for Minimums.
- **Optimal Algo:** Push pairs of `(value, current_min)`.
- **C++ Code:**
```cpp
class MinStack {
    stack<pair<int, int>> st;
public:
    void push(int val) {
        int min_val = st.empty() ? val : min(val, st.top().second);
        st.push({val, min_val});
    }
    void pop() { st.pop(); }
    int top() { return st.top().first; }
    int getMin() { return st.top().second; }
};
```
- **Complexity:** Time: O(1) | Space: O(N)

### Q97) Remove Duplicate Letters
- **Problem Statement:** Remove duplicate letters so result is the smallest in lexicographical order.
- **Concept:** Monotonic Stack + Char Count.
- **Optimal Algo:**
  - Track char frequencies and whether they are currently in the stack (`seen`).
  - Iterate string. Decrement frequency. If `c` is in stack, continue.
  - While stack is not empty, `c < stack.top()`, and `freq[stack.top()] > 0` (meaning we can add it later), pop it and unmark `seen`.
  - Push `c` and mark `seen`.
- **C++ Code:**
```cpp
class Solution {
public:
    string removeDuplicateLetters(string s) {
        vector<int> count(26, 0); vector<bool> seen(26, false);
        for (char c : s) count[c - 'a']++;
        string res = "";
        for (char c : s) {
            count[c - 'a']--;
            if (seen[c - 'a']) continue;
            while (!res.empty() && c < res.back() && count[res.back() - 'a'] > 0) {
                seen[res.back() - 'a'] = false;
                res.pop_back();
            }
            res.push_back(c);
            seen[c - 'a'] = true;
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1) (size 26)

### Q98) Removing Stars From a String
- **Problem Statement:** You are given a string `s`, which contains stars `*`. In one operation, you can choose a star in `s` and remove the closest non-star character to its left, as well as remove the star itself. Return the string after all stars have been removed.
- **Concept:** String as Stack.
- **Optimal Algo:** If `*`, pop the back. Else, append.
- **C++ Code:**
```cpp
class Solution {
public:
    string removeStars(string s) {
        string res = "";
        for (char c : s) {
            if (c == '*') res.pop_back();
            else res.push_back(c);
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q99) Evaluate Reverse Polish Notation
- **Problem Statement:** Evaluate the value of an arithmetic expression in RPN.
- **Concept:** Stack Evaluation.
- **Optimal Algo:** If number, push. If operator, pop two numbers, evaluate, and push result.
- **C++ Code:**
```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for (string t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                long b = st.top(); st.pop();
                long a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                if (t == "-") st.push(a - b);
                if (t == "*") st.push(a * b);
                if (t == "/") st.push(a / b);
            } else st.push(stoi(t));
        }
        return st.top();
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q100) Basic Calculator II
- **Problem Statement:** Evaluate a string expression containing non-negative integers and `+, -, *, /`.
- **Concept:** Delayed Evaluation Stack.
- **Optimal Algo:** Keep track of the previous operator. If a new operator is found, process the *previous* operator with the accumulated number and push to stack. Sum stack at the end.
- **C++ Code:**
```cpp
class Solution {
public:
    int calculate(string s) {
        stack<int> st; int num = 0; char sign = '+';
        s += '+';
        for (int i = 0; i < s.length(); i++) {
            if (isdigit(s[i])) num = num * 10 + (s[i] - '0');
            else if (s[i] != ' ') {
                if (sign == '+') st.push(num);
                else if (sign == '-') st.push(-num);
                else if (sign == '*') { int tmp = st.top(); st.pop(); st.push(tmp * num); }
                else if (sign == '/') { int tmp = st.top(); st.pop(); st.push(tmp / num); }
                sign = s[i]; num = 0;
            }
        }
        int res = 0; while (!st.empty()) { res += st.top(); st.pop(); }
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q101) Longest Valid Parentheses
- **Problem Statement:** Find the length of the longest valid (well-formed) parentheses substring.
- **Concept:** Stack with indices.
- **Optimal Algo:**
  - Initialize stack with `-1` as the base boundary.
  - If `(`, push index.
  - If `)`, pop stack. If stack is empty, it means the current `)` is the new base boundary, so push its index. Else, update max length `i - stack.top()`.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> st; st.push(-1); int max_len = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '(') st.push(i);
            else {
                st.pop();
                if (st.empty()) st.push(i);
                else max_len = max(max_len, i - st.top());
            }
        }
        return max_len;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Monotonic Stack

### Q102) Introduction (Next Greater Element Logic)
*(Concept explained below in Q103).*

### Q103) Next Greater Element I
- **Problem Statement:** For each element in `nums1`, find its next greater element in `nums2`.
- **Concept:** Decreasing Monotonic Stack + Hash Map.
- **Optimal Algo:**
  - Iterate `nums2` from left to right.
  - Maintain a stack of elements looking for their next greater element.
  - While current element > stack top, we found the next greater element for stack top. Store it in a map. Push current element.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nextGreater; stack<int> st;
        for (int n : nums2) {
            while (!st.empty() && st.top() < n) {
                nextGreater[st.top()] = n; st.pop();
            }
            st.push(n);
        }
        vector<int> res;
        for (int n : nums1) res.push_back(nextGreater.count(n) ? nextGreater[n] : -1);
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q104) Daily Temperatures
- **Problem Statement:** Return array of number of days you have to wait for a warmer temperature.
- **Concept:** Decreasing Monotonic Stack (storing indices).
- **Optimal Algo:** Similar to Q103. If current temperature > temperature at `stack.top()` index, pop and calculate index difference.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size(); vector<int> res(n, 0); stack<int> st;
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prevIndex = st.top(); st.pop();
                res[prevIndex] = i - prevIndex;
            }
            st.push(i);
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q105) Online Stock Span
- **Problem Statement:** Return the max number of consecutive days prior where the stock price was less than or equal to current.
- **Concept:** Monotonic Stack of `(price, span)`.
- **Optimal Algo:** Pop while stack top's price is `<= current price`. Accumulate their spans. Push new `(price, total_span)`.
- **C++ Code:**
```cpp
class StockSpanner {
    stack<pair<int, int>> st;
public:
    int next(int price) {
        int span = 1;
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second; st.pop();
        }
        st.push({price, span}); return span;
    }
};
```
- **Complexity:** Time: O(1) amortized per call | Space: O(N)

### Q106) 132 Pattern
- **Problem Statement:** Check if there are indices `i < j < k` such that `nums[i] < nums[k] < nums[j]`.
- **Concept:** Monotonic Stack from Right.
- **Optimal Algo:**
  - Maintain `third` element (max valid `nums[k]`). Iterate from right to left.
  - If `nums[i] < third`, we found the 132 pattern (since `third` is only updated when we pop elements smaller than `nums[j]`).
  - While stack is not empty and `nums[i] > stack.top()`, update `third = stack.top()` and pop. Push `nums[i]`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        int third = INT_MIN; stack<int> st;
        for (int i = nums.size() - 1; i >= 0; i--) {
            if (nums[i] < third) return true;
            while (!st.empty() && nums[i] > st.top()) {
                third = st.top(); st.pop();
            }
            st.push(nums[i]);
        }
        return false;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q107) Number of Visible People in a Queue
- **Problem Statement:** Count how many people each person can see to their right.
- **Concept:** Monotonic Stack.
- **Optimal Algo:** Traverse from right to left. While stack top is `< heights[i]`, they see that person, so pop and `count++`. If stack is not empty after popping, they can see one more taller person, so `count++`. Push `heights[i]`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> canSeePersonsCount(vector<int>& heights) {
        int n = heights.size(); vector<int> res(n, 0); stack<int> st;
        for (int i = n - 1; i >= 0; i--) {
            int count = 0;
            while (!st.empty() && heights[i] > st.top()) { st.pop(); count++; }
            if (!st.empty()) count++;
            res[i] = count;
            st.push(heights[i]);
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q108) Largest Rectangle in Histogram
- **Problem Statement:** Find the area of largest rectangle in the histogram.
- **Concept:** Monotonic Stack (Increasing).
- **Optimal Algo:**
  - Push indices. If current height is less than stack top, it means stack top's right boundary is found.
  - Pop stack top, calculate width using current index and new stack top (left boundary). Update max area.
- **C++ Code:**
```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st; heights.push_back(0); int max_area = 0;
        for (int i = 0; i < heights.size(); i++) {
            while (!st.empty() && heights[i] < heights[st.top()]) {
                int h = heights[st.top()]; st.pop();
                int w = st.empty() ? i : i - st.top() - 1;
                max_area = max(max_area, h * w);
            }
            st.push(i);
        }
        return max_area;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

---

## 🚶 Queues — **8 Questions**

### Q109) Introduction (Implement Queue using Stacks)
- **Problem Statement:** Implement FIFO queue using two stacks.
- **Concept:** Double Stack Reversal.
- **Optimal Algo:** Push onto `s1`. When popping/peeking, if `s2` is empty, pour all elements from `s1` into `s2`. Pop from `s2`.
- **C++ Code:** *(Skipped standard ADT implementation code for brevity)*

### Q110) Number of Recent Calls
- **Problem Statement:** Count the number of recent requests within the past 3000 milliseconds.
- **Concept:** Simple Queue.
- **Optimal Algo:** Enqueue `t`. While `q.front() < t - 3000`, dequeue. Return `q.size()`.
- **C++ Code:**
```cpp
class RecentCounter {
    queue<int> q;
public:
    int ping(int t) {
        q.push(t);
        while (q.front() < t - 3000) q.pop();
        return q.size();
    }
};
```
- **Complexity:** Time: O(1) amortized | Space: O(W) (W=3000)

### Q111) Time Needed to Buy Tickets
- **Problem Statement:** Time taken for person at index `k` to buy their tickets (1 ticket per second, looping).
- **Concept:** Math / Simulation.
- **Optimal Algo:** For people before `k`, they buy `min(tickets[i], tickets[k])`. For people after `k`, they buy `min(tickets[i], tickets[k] - 1)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int timeRequiredToBuy(vector<int>& tickets, int k) {
        int time = 0;
        for (int i = 0; i < tickets.size(); i++) {
            if (i <= k) time += min(tickets[i], tickets[k]);
            else time += min(tickets[i], tickets[k] - 1);
        }
        return time;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q112) Reveal Cards In Increasing Order
- **Problem Statement:** Reorder a deck so that if you alternatingly reveal top and put next to bottom, the revealed cards are in increasing order.
- **Concept:** Simulation with Deque / Queue of Indices.
- **Optimal Algo:**
  - Sort the deck. Use a queue of indices `0..n-1`.
  - Simulate the process: take front index, assign the smallest available card to it, then take next front index and push it to back.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> deckRevealedIncreasing(vector<int>& deck) {
        sort(deck.begin(), deck.end());
        queue<int> q; for (int i = 0; i < deck.size(); i++) q.push(i);
        vector<int> res(deck.size());
        for (int card : deck) {
            res[q.front()] = card; q.pop();
            if (!q.empty()) { q.push(q.front()); q.pop(); }
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N log N) | Space: O(N)

### Monotonic Queue

### Q113) Jump Game VI
- **Problem Statement:** You can jump at most `k` steps forward. Maximize your score.
- **Concept:** DP + Monotonic Deque.
- **Optimal Algo:**
  - `dp[i] = nums[i] + max(dp[i-k] ... dp[i-1])`.
  - Use a decreasing deque storing indices to find the max of the last `k` DP values in O(1).
- **C++ Code:**
```cpp
class Solution {
public:
    int maxResult(vector<int>& nums, int k) {
        deque<int> dq; dq.push_back(0);
        for (int i = 1; i < nums.size(); i++) {
            while (!dq.empty() && dq.front() < i - k) dq.pop_front();
            nums[i] += nums[dq.front()];
            while (!dq.empty() && nums[i] >= nums[dq.back()]) dq.pop_back();
            dq.push_back(i);
        }
        return nums.back();
    }
};
```
- **Complexity:** Time: O(N) | Space: O(K)

### Q114) Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
- **Problem Statement:** Find the longest subarray where max - min <= limit.
- **Concept:** Sliding Window + Two Monotonic Deques.
- **Optimal Algo:** Maintain a max deque (decreasing) and a min deque (increasing). If `max - min > limit`, advance `left` and pop deques accordingly.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        deque<int> maxD, minD; int left = 0, res = 0;
        for (int right = 0; right < nums.size(); right++) {
            while (!maxD.empty() && nums[maxD.back()] <= nums[right]) maxD.pop_back();
            while (!minD.empty() && nums[minD.back()] >= nums[right]) minD.pop_back();
            maxD.push_back(right); minD.push_back(right);
            
            while (nums[maxD.front()] - nums[minD.front()] > limit) {
                if (maxD.front() == left) maxD.pop_front();
                if (minD.front() == left) minD.pop_front();
                left++;
            }
            res = max(res, right - left + 1);
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q115) Sliding Window Maximum
- **Problem Statement:** Return the max sliding window of size `k`.
- **Concept:** Monotonic Deque.
- **Optimal Algo:**
  - Deque stores indices of useful elements (decreasing order of values).
  - Pop out-of-window indices from front.
  - Pop smaller elements from back (they can never be max).
  - Append to result when window hits size `k`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq; vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (!dq.empty() && dq.front() == i - k) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(K)

### Q116) Max Value of Equation
- **Problem Statement:** Maximize `yi + yj + |xi - xj|` for `i < j` and `xj - xi <= k`.
- **Concept:** Monotonic Deque.
- **Optimal Algo:** Equation becomes `(yi - xi) + (yj + xj)`. We want to maximize `yi - xi`. Maintain a decreasing deque of `(yi - xi, xi)`. Remove elements where `xj - xi > k`.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMaxValueOfEquation(vector<vector<int>>& points, int k) {
        deque<pair<int, int>> dq; int max_val = INT_MIN;
        for (auto& p : points) {
            int x = p[0], y = p[1];
            while (!dq.empty() && x - dq.front().second > k) dq.pop_front();
            if (!dq.empty()) max_val = max(max_val, dq.front().first + x + y);
            while (!dq.empty() && dq.back().first <= y - x) dq.pop_back();
            dq.push_back({y - x, x});
        }
        return max_val;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)


## 🔃 Sorting — **9 Questions**

### Q117) Bucket Sort (Top K Frequent Elements)
- **Problem:** Find the `k` most frequent elements.
- **Concept:** Frequency Map + Array of Buckets.
- **Optimal Algo:** Count frequencies. Create an array of arrays (`buckets`) where index = frequency. Iterate buckets from right to left to collect `k` elements.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int n : nums) count[n]++;
        vector<vector<int>> buckets(nums.size() + 1);
        for (auto& p : count) buckets[p.second].push_back(p.first);
        vector<int> res;
        for (int i = buckets.size() - 1; i >= 0 && res.size() < k; i--) {
            for (int num : buckets[i]) res.push_back(num);
        }
        return res;
    }
};
```
- **Dry Run:** `[1,1,1,2,2,3], k=2` -> freq: 1:3, 2:2, 3:1 -> buckets[3]=[1], buckets[2]=[2]. Res: `[1,2]`.
- **Complexity:** T: O(N) | S: O(N)

### Q118) Sort Characters By Frequency
- **Problem:** Sort a string in decreasing order based on frequency of characters.
- **Concept:** Hash Map + Priority Queue / Bucket Sort.
- **Optimal Algo:** Count frequencies, push to a max-heap `<freq, char>`, and pop to build string.
- **C++ Code:**
```cpp
class Solution {
public:
    string frequencySort(string s) {
        unordered_map<char, int> freq;
        for (char c : s) freq[c]++;
        priority_queue<pair<int, char>> pq;
        for (auto& p : freq) pq.push({p.second, p.first});
        string res = "";
        while (!pq.empty()) {
            res.append(pq.top().first, pq.top().second); pq.pop();
        }
        return res;
    }
};
```
- **Dry Run:** `"tree"` -> freq(e)=2, r=1, t=1 -> heap pops 'e', then 'r', 't' -> `"eert"`.
- **Complexity:** T: O(N log K) | S: O(N)

### Q119) Top K Frequent Words
- **Problem:** Return the top `k` frequent words sorted by frequency, then lexicographically.
- **Concept:** Hash Map + Min-Heap.
- **Optimal Algo:** Use a custom comparator for min-heap (keep size `k`). Pop and reverse.
- **C++ Code:**
```cpp
class Solution {
    struct Comp {
        bool operator()(const pair<int, string>& a, const pair<int, string>& b) {
            return a.first > b.first || (a.first == b.first && a.second < b.second);
        }
    };
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> count;
        for (string w : words) count[w]++;
        priority_queue<pair<int, string>, vector<pair<int, string>>, Comp> pq;
        for (auto& p : count) {
            pq.push({p.second, p.first});
            if (pq.size() > k) pq.pop();
        }
        vector<string> res;
        while (!pq.empty()) { res.push_back(pq.top().second); pq.pop(); }
        reverse(res.begin(), res.end()); return res;
    }
};
```
- **Dry Run:** `["i","love","leetcode","i","love","coding"], k=2` -> 'i':2, 'love':2 -> return `["i", "love"]`.
- **Complexity:** T: O(N log K) | S: O(N)

### Q120) Maximum Gap
- **Problem:** Find the maximum difference between successive elements in its sorted form.
- **Concept:** Pigeonhole Principle (Bucket Sort).
- **Optimal Algo:** Calculate min/max. Bucket size = `max(1, (max - min) / (n - 1))`. Store min/max in each bucket. Gap is between `min` of current non-empty bucket and `max` of previous.
- **C++ Code:**
```cpp
class Solution {
public:
    int maximumGap(vector<int>& nums) {
        if (nums.size() < 2) return 0;
        int minV = *min_element(nums.begin(), nums.end());
        int maxV = *max_element(nums.begin(), nums.end());
        int bSize = max(1, (maxV - minV) / ((int)nums.size() - 1));
        int bCount = (maxV - minV) / bSize + 1;
        vector<int> bMin(bCount, INT_MAX), bMax(bCount, INT_MIN);
        for (int n : nums) {
            int idx = (n - minV) / bSize;
            bMin[idx] = min(bMin[idx], n); bMax[idx] = max(bMax[idx], n);
        }
        int maxGap = 0, prevMax = minV;
        for (int i = 0; i < bCount; i++) {
            if (bMin[i] == INT_MAX) continue;
            maxGap = max(maxGap, bMin[i] - prevMax);
            prevMax = bMax[i];
        }
        return maxGap;
    }
};
```
- **Dry Run:** `[3,6,9,1]` -> buckets: [1..3], [4..6], [7..9] -> diffs: 6-3=3, 9-6=3. Max=3.
- **Complexity:** T: O(N) | S: O(N)

### Q121) Merge Sort (Sort an Array)
- **Problem:** Sort an array in O(N log N) without built-in functions.
- **Concept:** Divide and Conquer.
- **Optimal Algo:** Recursively divide array into halves, sort, and merge them back together.
- **C++ Code:**
```cpp
class Solution {
    void mergeSort(vector<int>& arr, int l, int r) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m); mergeSort(arr, m + 1, r);
        vector<int> temp(r - l + 1);
        int i = l, j = m + 1, k = 0;
        while (i <= m && j <= r) temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
        while (i <= m) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];
        for (int p = 0; p < k; p++) arr[l + p] = temp[p];
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        mergeSort(nums, 0, nums.size() - 1);
        return nums;
    }
};
```
- **Dry Run:** `[2,1,3]` -> split `[2,1]`, `[3]` -> merge `[1,2]` and `[3]` -> `[1,2,3]`.
- **Complexity:** T: O(N log N) | S: O(N)

### Q122) Sort List
- **Problem:** Sort a linked list in O(N log N) time and O(1) space.
- **Concept:** Merge Sort on Linked List.
- **Optimal Algo:** Fast/slow pointer to find mid, break into two lists, recurse, and merge two sorted lists.
- **C++ Code:**
```cpp
class Solution {
    ListNode* merge(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); ListNode* tail = &dummy;
        while (l1 && l2) {
            if (l1->val < l2->val) { tail->next = l1; l1 = l1->next; }
            else { tail->next = l2; l2 = l2->next; }
            tail = tail->next;
        }
        tail->next = l1 ? l1 : l2;
        return dummy.next;
    }
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *slow = head, *fast = head->next;
        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
        ListNode* mid = slow->next; slow->next = nullptr;
        return merge(sortList(head), sortList(mid));
    }
};
```
- **Dry Run:** `4->2->1->3` -> splits to `4->2`, `1->3` -> sorts to `2->4`, `1->3` -> merges `1->2->3->4`.
- **Complexity:** T: O(N log N) | S: O(log N) (call stack)

### Q123) Reverse Pairs
- **Problem:** Find number of pairs where `i < j` and `nums[i] > 2 * nums[j]`.
- **Concept:** Merge Sort modifications.
- **Optimal Algo:** While merging, keep an inner loop to count `nums[i] > 2LL * nums[j]`.
- **C++ Code:**
```cpp
class Solution {
    int mergeSort(vector<int>& nums, int left, int right) {
        if (left >= right) return 0;
        int mid = left + (right - left) / 2;
        int count = mergeSort(nums, left, mid) + mergeSort(nums, mid + 1, right);
        int j = mid + 1;
        for (int i = left; i <= mid; i++) {
            while (j <= right && nums[i] > 2LL * nums[j]) j++;
            count += j - (mid + 1);
        }
        inplace_merge(nums.begin() + left, nums.begin() + mid + 1, nums.begin() + right + 1);
        return count;
    }
public:
    int reversePairs(vector<int>& nums) {
        return mergeSort(nums, 0, nums.size() - 1);
    }
};
```
- **Dry Run:** `[1,3,2,3,1]` -> during merge `[3]` & `[1]`, `3 > 2*1`, count +1. Total 2.
- **Complexity:** T: O(N log N) | S: O(N)

### Q124) Sort Colors
- **Problem:** Sort an array of 0s, 1s, and 2s in-place (Dutch National Flag).
- **Concept:** 3-Way Partitioning / QuickSelect.
- **Optimal Algo:** Pointers `low` (for 0), `mid` (for 1), `high` (for 2). Swap and shift based on `nums[mid]`.
- **C++ Code:**
```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
            else if (nums[mid] == 1) mid++;
            else swap(nums[mid], nums[high--]);
        }
    }
};
```
- **Dry Run:** `[2,0,1]` -> mid=0(2) swap with high -> `[1,0,2]`. mid=0(1) mid++ -> mid=1(0) swap low -> `[0,1,2]`.
- **Complexity:** T: O(N) | S: O(1)

### Q125) Kth Largest Element in an Array
- **Problem:** Find the `k`-th largest element.
- **Concept:** QuickSelect.
- **Optimal Algo:** Partition array. If pivot index is `N-k`, return. If `< N-k`, search right. Else search left.
- **C++ Code:**
```cpp
class Solution {
    int partition(vector<int>& nums, int l, int r) {
        int pivot = nums[r], i = l;
        for (int j = l; j < r; j++) {
            if (nums[j] <= pivot) swap(nums[i++], nums[j]);
        }
        swap(nums[i], nums[r]); return i;
    }
public:
    int findKthLargest(vector<int>& nums, int k) {
        int l = 0, r = nums.size() - 1, target = nums.size() - k;
        while (true) {
            int p = partition(nums, l, r);
            if (p == target) return nums[p];
            if (p < target) l = p + 1;
            else r = p - 1;
        }
    }
};
```
- **Dry Run:** `[3,2,1,5,6,4], k=2` -> Target index = 4. QuickSelect partitions until index 4 holds `5`.
- **Complexity:** T: O(N) avg, O(N^2) worst | S: O(1)

---

## ♻️ Recursion & Backtracking — **12 Questions**

### Q126) Introduction to Backtracking (Combinations)
- **Problem:** Generate all combinations of `k` numbers out of `1...n`.
- **Concept:** Base backtracking pattern.
- **Optimal Algo:** Pick element, recurse, pop element.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(int start, int n, int k, vector<int>& curr, vector<vector<int>>& res) {
        if (curr.size() == k) { res.push_back(curr); return; }
        for (int i = start; i <= n; i++) {
            curr.push_back(i); backtrack(i + 1, n, k, curr, res); curr.pop_back();
        }
    }
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res; vector<int> curr; backtrack(1, n, k, curr, res); return res;
    }
};
```
- **Dry Run:** `n=4, k=2` -> `[1,2], [1,3], [1,4], [2,3]...`
- **Complexity:** T: O(C(n,k)) | S: O(k)

### Q127) Merge Two Sorted Lists (Recursive)
- **Problem:** Merge two sorted linked lists.
- **Concept:** Functional Recursion.
- **Optimal Algo:** `list1->next = merge(list1->next, list2)`.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        if (!list1) return list2; if (!list2) return list1;
        if (list1->val < list2->val) {
            list1->next = mergeTwoLists(list1->next, list2); return list1;
        } else {
            list2->next = mergeTwoLists(list1, list2->next); return list2;
        }
    }
};
```
- **Dry Run:** `[1,3], [2]` -> 1->merge([3],[2]) -> 1->2->merge([3],[]) -> 1->2->3.
- **Complexity:** T: O(N+M) | S: O(N+M)

### Q128) Pow(x, n)
- **Problem:** Calculate `x` raised to the power `n`.
- **Concept:** Fast Exponentiation (Divide and Conquer).
- **Optimal Algo:** If `n` is even: `val = pow(x, n/2)`, return `val * val`. Handle negative `n`.
- **C++ Code:**
```cpp
class Solution {
public:
    double myPow(double x, int n) {
        long long N = n;
        if (N < 0) { x = 1 / x; N = -N; }
        double res = 1;
        while (N > 0) {
            if (N % 2 == 1) res *= x;
            x *= x; N /= 2;
        }
        return res;
    }
};
```
- **Dry Run:** `2^10` -> `N=5, res=1, x=4` -> `N=2, res=4, x=16` -> `N=1, x=256` -> `res=4*256=1024`.
- **Complexity:** T: O(log N) | S: O(1)

### Q129) Decode String
- **Problem:** Decode string like `3[a2[c]]`.
- **Concept:** Recursive Descent / Stack.
- **Optimal Algo:** Parse number, recurse/loop on brackets, multiply and append.
- **C++ Code:**
```cpp
class Solution {
    string decode(string& s, int& i) {
        string res = ""; int num = 0;
        while (i < s.length()) {
            if (isdigit(s[i])) num = num * 10 + (s[i] - '0');
            else if (s[i] == '[') { i++; string inner = decode(s, i); while (num--) res += inner; num = 0; }
            else if (s[i] == ']') return res;
            else res += s[i];
            i++;
        }
        return res;
    }
public:
    string decodeString(string s) { int i = 0; return decode(s, i); }
};
```
- **Dry Run:** `3[a]` -> num=3, inside `[` return `a`, appends 3 times -> `aaa`.
- **Complexity:** T: O(Max_Output_Length) | S: O(Recursion Depth)

### Q130) Generate Parentheses
- **Problem:** Generate all combinations of `n` pairs of valid parentheses.
- **Concept:** Backtracking with State Constraints.
- **Optimal Algo:** Add `(` if `open < n`. Add `)` if `close < open`. Base case: string length is `2n`.
- **C++ Code:**
```cpp
class Solution {
    void solve(int open, int close, int n, string curr, vector<string>& res) {
        if (curr.length() == 2 * n) { res.push_back(curr); return; }
        if (open < n) solve(open + 1, close, n, curr + '(', res);
        if (close < open) solve(open, close + 1, n, curr + ')', res);
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res; solve(0, 0, n, "", res); return res;
    }
};
```
- **Dry Run:** `n=2` -> `(`, `((`, `(()`, `(())`. 
- **Complexity:** T: O(4^n / sqrt(n)) | S: O(n)

### Q131) Permutations
- **Problem:** Return all possible permutations of an array.
- **Concept:** Backtracking with Swaps.
- **Optimal Algo:** Iterate through indices, swap `start` with `i`, recurse on `start + 1`, backtrack swap.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& nums, int start, vector<vector<int>>& res) {
        if (start == nums.size()) { res.push_back(nums); return; }
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(nums, start + 1, res);
            swap(nums[start], nums[i]);
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res; backtrack(nums, 0, res); return res;
    }
};
```
- **Dry Run:** `[1,2]` -> swap 1,1 -> `[1,2]`. backtrack swap 1,2 -> `[2,1]`.
- **Complexity:** T: O(N!) | S: O(N)

### Q132) Subsets
- **Problem:** Generate all possible subsets (the power set).
- **Concept:** Pick / Don't Pick.
- **Optimal Algo:** Base case `idx == n`. Either include `nums[i]` or omit it.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& nums, int i, vector<int>& curr, vector<vector<int>>& res) {
        res.push_back(curr);
        for (int j = i; j < nums.size(); j++) {
            curr.push_back(nums[j]);
            backtrack(nums, j + 1, curr, res);
            curr.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res; vector<int> curr; backtrack(nums, 0, curr, res); return res;
    }
};
```
- **Dry Run:** `[1,2]` -> `[]`, `[1]`, `[1,2]`, `[2]`.
- **Complexity:** T: O(2^N) | S: O(N)

### Q133) Combination Sum
- **Problem:** Find combinations that sum to `target`. Items can be reused.
- **Concept:** Backtracking Unbounded.
- **Optimal Algo:** If `sum == target`, add. Iterate `j` from `i`. Push, recurse at `j` (allows reuse), pop.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& cands, int target, int i, vector<int>& curr, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(curr); return; }
        for (int j = i; j < cands.size(); j++) {
            if (cands[j] <= target) {
                curr.push_back(cands[j]);
                backtrack(cands, target - cands[j], j, curr, res);
                curr.pop_back();
            }
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res; vector<int> curr; backtrack(candidates, target, 0, curr, res); return res;
    }
};
```
- **Dry Run:** `[2,3], T=7` -> uses 2,2,3 -> pushes `[2,2,3]`.
- **Complexity:** T: O(2^T) worst | S: O(T)

### Q134) Combination Sum II
- **Problem:** Find combinations summing to `target`. Items can only be used once. Duplicates exist.
- **Concept:** Sorting + Duplicate Skip.
- **Optimal Algo:** Sort array. If `j > i && cands[j] == cands[j-1]`, skip. Recurse at `j + 1`.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& cands, int target, int i, vector<int>& curr, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(curr); return; }
        for (int j = i; j < cands.size() && cands[j] <= target; j++) {
            if (j > i && cands[j] == cands[j - 1]) continue;
            curr.push_back(cands[j]);
            backtrack(cands, target - cands[j], j + 1, curr, res);
            curr.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res; vector<int> curr; backtrack(candidates, target, 0, curr, res); return res;
    }
};
```
- **Dry Run:** `[1,1,2], T=2` -> `[1,1]`, `[2]`. Second `1` is skipped at root level.
- **Complexity:** T: O(2^N) | S: O(N)

### Q135) Letter Combinations of a Phone Number
- **Problem:** Return all possible letter combinations a phone number string could represent.
- **Concept:** Hash Map + DFS.
- **Optimal Algo:** Map digit to letters. Iterate letters for current digit, append, recurse to next digit, pop.
- **C++ Code:**
```cpp
class Solution {
    vector<string> pad = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    void backtrack(string& digits, int i, string curr, vector<string>& res) {
        if (i == digits.length()) { res.push_back(curr); return; }
        for (char c : pad[digits[i] - '0']) backtrack(digits, i + 1, curr + c, res);
    }
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        vector<string> res; backtrack(digits, 0, "", res); return res;
    }
};
```
- **Dry Run:** `"23"` -> 'a' + 'd' -> `"ad"`.
- **Complexity:** T: O(4^N * N) | S: O(N)

### Q136) Palindrome Partitioning
- **Problem:** Partition `s` such that every substring is a palindrome.
- **Concept:** Backtracking + Palindrome Check.
- **Optimal Algo:** Iterate split point `j`. If `s[i..j]` is palindrome, push it and recurse on `j+1`.
- **C++ Code:**
```cpp
class Solution {
    bool isPal(string& s, int l, int r) {
        while (l < r) if (s[l++] != s[r--]) return false; return true;
    }
    void backtrack(string& s, int i, vector<string>& curr, vector<vector<string>>& res) {
        if (i == s.length()) { res.push_back(curr); return; }
        for (int j = i; j < s.length(); j++) {
            if (isPal(s, i, j)) {
                curr.push_back(s.substr(i, j - i + 1));
                backtrack(s, j + 1, curr, res);
                curr.pop_back();
            }
        }
    }
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res; vector<string> curr; backtrack(s, 0, curr, res); return res;
    }
};
```
- **Dry Run:** `"aab"` -> `"a", "a", "b"` and `"aa", "b"`.
- **Complexity:** T: O(N * 2^N) | S: O(N)

### Q137) N-Queens
- **Problem:** Place `N` queens on an `NxN` board so none attack each other.
- **Concept:** Backtracking + Board State Tracking.
- **Optimal Algo:** Use 3 sets (columns, positive diagonal `r+c`, negative diagonal `r-c`) to check valid placement.
- **C++ Code:**
```cpp
class Solution {
    void solve(int r, int n, vector<string>& board, vector<vector<string>>& res, vector<bool>& col, vector<bool>& d1, vector<bool>& d2) {
        if (r == n) { res.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (col[c] || d1[r + c] || d2[r - c + n]) continue;
            board[r][c] = 'Q'; col[c] = d1[r + c] = d2[r - c + n] = true;
            solve(r + 1, n, board, res, col, d1, d2);
            board[r][c] = '.'; col[c] = d1[r + c] = d2[r - c + n] = false;
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res; vector<string> board(n, string(n, '.'));
        vector<bool> col(n), d1(2*n), d2(2*n);
        solve(0, n, board, res, col, d1, d2); return res;
    }
};
```
- **Dry Run:** places Q at `[0,1]`, blocks col 1 and diagonals. Tries row 1, etc.
- **Complexity:** T: O(N!) | S: O(N^2)

---

## 🪓 Divide and Conquer — **3 Questions**

### Q138) Convert Sorted List to Binary Search Tree
- **Problem:** Create height-balanced BST from sorted linked list.
- **Concept:** Fast/Slow Pointer + DFS.
- **Optimal Algo:** Find middle of list, make it root. Recurse left half and right half.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* sortedListToBST(ListNode* head) {
        if (!head) return nullptr;
        if (!head->next) return new TreeNode(head->val);
        ListNode *slow = head, *fast = head, *prev = nullptr;
        while (fast && fast->next) { prev = slow; slow = slow->next; fast = fast->next->next; }
        prev->next = nullptr; // cut list
        TreeNode* root = new TreeNode(slow->val);
        root->left = sortedListToBST(head);
        root->right = sortedListToBST(slow->next);
        return root;
    }
};
```
- **Dry Run:** `-10->-3->0->5->9`. Mid is `0`. Left `-10->-3`. Right `5->9`.
- **Complexity:** T: O(N log N) | S: O(log N)

### Q139) Construct Quad Tree
- **Problem:** Convert boolean grid to Quad Tree.
- **Concept:** Grid Recursion.
- **Optimal Algo:** Check if all grid values are the same. If yes, return leaf. Else, divide into 4 quadrants and recurse.
- **C++ Code:**
```cpp
class Solution {
    Node* build(vector<vector<int>>& grid, int r, int c, int n) {
        int val = grid[r][c]; bool same = true;
        for (int i = r; i < r + n; i++) {
            for (int j = c; j < c + n; j++) {
                if (grid[i][j] != val) { same = false; break; }
            }
        }
        if (same) return new Node(val == 1, true);
        return new Node(true, false, build(grid, r, c, n/2), build(grid, r, c+n/2, n/2),
                                     build(grid, r+n/2, c, n/2), build(grid, r+n/2, c+n/2, n/2));
    }
public:
    Node* construct(vector<vector<int>>& grid) {
        return build(grid, 0, 0, grid.size());
    }
};
```
- **Complexity:** T: O(N^2 log N) | S: O(log N)

### Q140) Maximum Binary Tree
- **Problem:** Build tree where root is maximum value, left child is from left sub-array, right child from right sub-array.
- **Concept:** Array Partitioning.
- **Optimal Algo:** Find max index `m`, make it root, recurse on `(l, m-1)` and `(m+1, r)`.
- **C++ Code:**
```cpp
class Solution {
    TreeNode* build(vector<int>& nums, int l, int r) {
        if (l > r) return nullptr;
        int max_i = l;
        for (int i = l; i <= r; i++) if (nums[i] > nums[max_i]) max_i = i;
        TreeNode* root = new TreeNode(nums[max_i]);
        root->left = build(nums, l, max_i - 1);
        root->right = build(nums, max_i + 1, r);
        return root;
    }
public:
    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {
        return build(nums, 0, nums.size() - 1);
    }
};
```
- **Dry Run:** `[3,2,1,6,0,5]` -> `6` is root. Left subarray `[3,2,1]`, Right `[0,5]`.
- **Complexity:** T: O(N^2) worst | S: O(N)

---

## 🔍 Binary Search — **11 Questions**

### Q141) Introduction (Binary Search)
- **Problem:** Find target in sorted array.
- **Optimal Algo:** `left=0`, `right=n-1`. Compare mid. If `> target`, `right = mid - 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) return m;
            else if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

### Q142) Search Insert Position
- **Problem:** Find index where target would be inserted.
- **Optimal Algo:** Same as binary search. Return `left` at the end.
- **C++ Code:**
```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) return m;
            else if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return l;
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

### Q143) Find First and Last Position of Element
- **Problem:** Return starting and ending position of target.
- **Optimal Algo:** Do BS twice. First to find left boundary (shrink right). Second to find right boundary (shrink left).
- **C++ Code:**
```cpp
class Solution {
    int findBound(vector<int>& nums, int target, bool isFirst) {
        int l = 0, r = nums.size() - 1, res = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) { res = m; if (isFirst) r = m - 1; else l = m + 1; }
            else if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return res;
    }
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        return {findBound(nums, target, true), findBound(nums, target, false)};
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

### Q144) Search in Rotated Sorted Array
- **Problem:** Search in an array pivoted at some point.
- **Optimal Algo:** Check which half is perfectly sorted. Check if target lies within that boundary. Shrink accordingly.
- **C++ Code:**
```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) return m;
            if (nums[l] <= nums[m]) { // Left sorted
                if (target >= nums[l] && target < nums[m]) r = m - 1; else l = m + 1;
            } else { // Right sorted
                if (target > nums[m] && target <= nums[r]) l = m + 1; else r = m - 1;
            }
        }
        return -1;
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

### Q145) Find Peak Element
- **Problem:** Find an element strictly greater than its neighbors.
- **Optimal Algo:** If `nums[mid] < nums[mid + 1]`, peak must be on the right. Else, on the left.
- **C++ Code:**
```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] < nums[m + 1]) l = m + 1;
            else r = m;
        }
        return l;
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

### Q146) Random Pick with Weight
- **Problem:** Pick an index proportional to its weight.
- **Optimal Algo:** Precompute prefix sums. Generate random number up to total sum. Use `lower_bound` (BS) to find index.
- **C++ Code:**
```cpp
class Solution {
    vector<int> prefix;
public:
    Solution(vector<int>& w) {
        prefix.push_back(w[0]);
        for (int i = 1; i < w.size(); i++) prefix.push_back(prefix.back() + w[i]);
    }
    int pickIndex() {
        int rand_val = rand() % prefix.back() + 1;
        return lower_bound(prefix.begin(), prefix.end(), rand_val) - prefix.begin();
    }
};
```
- **Complexity:** T: Init O(N), Pick O(log N) | S: O(N)

### Q147) Koko Eating Bananas
- **Problem:** Min speed `k` to eat all bananas within `h` hours.
- **Optimal Algo:** Binary search on `k` `[1, max(piles)]`. Calculate hours taken.
- **C++ Code:**
```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int l = 1, r = *max_element(piles.begin(), piles.end());
        while (l < r) {
            int m = l + (r - l) / 2;
            long long hours = 0;
            for (int p : piles) hours += (p + m - 1) / m; // ceil(p/m)
            if (hours <= h) r = m; else l = m + 1;
        }
        return l;
    }
};
```
- **Complexity:** T: O(N log(MaxPile)) | S: O(1)

### Q148) Find Minimum in Rotated Sorted Array
- **Problem:** Find minimum element in rotated sorted array.
- **Optimal Algo:** Compare mid with right. If `nums[m] > nums[r]`, min is to the right. Else left.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] > nums[r]) l = m + 1;
            else r = m;
        }
        return nums[l];
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

### Q149) Search a 2D Matrix
- **Problem:** Search in matrix where rows are sorted and `row[i][-1] < row[i+1][0]`.
- **Optimal Algo:** Treat 2D matrix as 1D array. Index `mid` translates to `row = mid / cols`, `col = mid % cols`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int l = 0, r = m * n - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            else if (val < target) l = mid + 1;
            else r = mid - 1;
        }
        return false;
    }
};
```
- **Complexity:** T: O(log(M*N)) | S: O(1)

### Q150) Find in Mountain Array
- **Problem:** Find target index in mountain array.
- **Optimal Algo:** BS to find peak. BS ascending on left side. If not found, BS descending on right side.
- **C++ Code:** *(API pseudo-code due to space)*
```cpp
class Solution {
    int bs(MountainArray &m, int t, int l, int r, bool asc) {
        while(l <= r) {
            int mid = l + (r - l) / 2, val = m.get(mid);
            if(val == t) return mid;
            if(asc) { if(val < t) l = mid + 1; else r = mid - 1; }
            else    { if(val > t) l = mid + 1; else r = mid - 1; }
        } return -1;
    }
public:
    int findInMountainArray(int target, MountainArray &m) {
        int l = 0, r = m.length() - 1, peak = 0;
        while(l < r) { // Find peak
            int mid = l + (r - l) / 2;
            if(m.get(mid) < m.get(mid + 1)) l = mid + 1; else r = mid;
        } peak = l;
        int res = bs(m, target, 0, peak, true);
        return res != -1 ? res : bs(m, target, peak + 1, m.length() - 1, false);
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

### Q151) Median of Two Sorted Arrays
- **Problem:** O(log(min(m,n))) median of 2 sorted arrays.
- **Optimal Algo:** BS on smaller array partition. Ensure max(left) <= min(right). 
- **C++ Code:**
```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size(), l = 0, r = m;
        while (l <= r) {
            int px = l + (r - l) / 2, py = (m + n + 1) / 2 - px;
            int maxLx = (px == 0) ? INT_MIN : nums1[px - 1];
            int minRx = (px == m) ? INT_MAX : nums1[px];
            int maxLy = (py == 0) ? INT_MIN : nums2[py - 1];
            int minRy = (py == n) ? INT_MAX : nums2[py];
            
            if (maxLx <= minRy && maxLy <= minRx) {
                if ((m + n) % 2 == 0) return (max(maxLx, maxLy) + min(minRx, minRy)) / 2.0;
                else return max(maxLx, maxLy);
            } else if (maxLx > minRy) r = px - 1;
            else l = px + 1;
        }
        return 0.0;
    }
};
```
- **Complexity:** T: O(log(min(M,N))) | S: O(1)

---

## 🌳 Binary Tree — **32 Questions**

### Level Order

### Q152) Introduction (Level Order Basics)
*(Included inside Q153).*

### Q153) Binary Tree Level Order Traversal
- **Problem:** Group nodes level by level.
- **Optimal Algo:** Standard BFS using a Queue. Push `q.size()` elements per level.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res; queue<TreeNode*> q; q.push(root);
        while (!q.empty()) {
            int size = q.size(); vector<int> level;
            while (size--) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q154) Binary Tree Right Side View
- **Problem:** Elements visible from right side.
- **Optimal Algo:** BFS. Push last element of each level loop.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        if (!root) return {};
        vector<int> res; queue<TreeNode*> q; q.push(root);
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                if (i == size - 1) res.push_back(node->val);
                if (node->left) q.push(node->left); if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q155) Binary Tree Zigzag Level Order Traversal
- **Problem:** Level order alternating directions.
- **Optimal Algo:** BFS. Maintain a `leftToRight` bool. Reverse level vector if false.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res; queue<TreeNode*> q; q.push(root); bool ltr = true;
        while (!q.empty()) {
            int size = q.size(); vector<int> level;
            while (size--) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left); if (node->right) q.push(node->right);
            }
            if (!ltr) reverse(level.begin(), level.end());
            res.push_back(level); ltr = !ltr;
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q156) Populating Next Right Pointers in Each Node II
- **Problem:** Point `next` to right node. Not a perfect binary tree.
- **Optimal Algo:** Use dummy head for next level construction using current level's `next` pointers.
- **C++ Code:**
```cpp
class Solution {
public:
    Node* connect(Node* root) {
        Node* curr = root;
        while (curr) {
            Node dummy(0); Node* tail = &dummy;
            while (curr) {
                if (curr->left) { tail->next = curr->left; tail = tail->next; }
                if (curr->right) { tail->next = curr->right; tail = tail->next; }
                curr = curr->next;
            }
            curr = dummy.next;
        }
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

### Q157) Maximum Width of Binary Tree
- **Problem:** Max width across all levels.
- **Optimal Algo:** Queue stores `{node, index}`. Prevent overflow by shifting zero: `index - level_start_index`. Width = `last - first + 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        int maxW = 0; queue<pair<TreeNode*, unsigned long long>> q; q.push({root, 0});
        while (!q.empty()) {
            int size = q.size(); unsigned long long minI = q.front().second, first, last;
            for (int i = 0; i < size; i++) {
                unsigned long long curI = q.front().second - minI;
                TreeNode* node = q.front().first; q.pop();
                if (i == 0) first = curI;
                if (i == size - 1) last = curI;
                if (node->left) q.push({node->left, curI * 2 + 1});
                if (node->right) q.push({node->right, curI * 2 + 2});
            }
            maxW = max(maxW, (int)(last - first + 1));
        }
        return maxW;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Preorder

### Q158) Binary Tree Preorder Traversal
- **Problem:** Return preorder (Root, Left, Right).
- **Optimal Algo:** Recursive array build.
- **C++ Code:**
```cpp
class Solution {
    void dfs(TreeNode* root, vector<int>& res) {
        if (!root) return;
        res.push_back(root->val); dfs(root->left, res); dfs(root->right, res);
    }
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res; dfs(root, res); return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q159) Same Tree
- **Problem:** Check if two trees are exactly same.
- **Optimal Algo:** Preorder comparison. Both null -> true. One null -> false. Vals diff -> false.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q160) Symmetric Tree
- **Problem:** Check if tree is mirror of itself.
- **Optimal Algo:** Check `left->left` with `right->right` and `left->right` with `right->left`.
- **C++ Code:**
```cpp
class Solution {
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2 || t1->val != t2->val) return false;
        return isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);
    }
public:
    bool isSymmetric(TreeNode* root) {
        return root ? isMirror(root->left, root->right) : true;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q161) Binary Tree Paths
- **Problem:** Return all root-to-leaf paths.
- **Optimal Algo:** DFS tracking string state. If leaf, push to result.
- **C++ Code:**
```cpp
class Solution {
    void dfs(TreeNode* root, string path, vector<string>& res) {
        if (!root) return;
        path += to_string(root->val);
        if (!root->left && !root->right) res.push_back(path);
        else { path += "->"; dfs(root->left, path, res); dfs(root->right, path, res); }
    }
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> res; dfs(root, "", res); return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q162) Convert Sorted Array to Binary Search Tree
- **Problem:** Sorted array to height-balanced BST.
- **Optimal Algo:** Binary Search style split. Mid is root.
- **C++ Code:**
```cpp
class Solution {
    TreeNode* build(vector<int>& nums, int l, int r) {
        if (l > r) return nullptr;
        int m = l + (r - l) / 2;
        TreeNode* root = new TreeNode(nums[m]);
        root->left = build(nums, l, m - 1);
        root->right = build(nums, m + 1, r);
        return root;
    }
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return build(nums, 0, nums.size() - 1);
    }
};
```
- **Complexity:** T: O(N) | S: O(log N)

### Q163) Count Complete Tree Nodes
- **Problem:** Count nodes in a Complete Binary Tree.
- **Optimal Algo:** Find left height and right height. If equal, `2^h - 1`. Else, `1 + count(left) + count(right)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        int hl = 0, hr = 0;
        for (TreeNode* l = root; l; l = l->left) hl++;
        for (TreeNode* r = root; r; r = r->right) hr++;
        if (hl == hr) return (1 << hl) - 1;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};
```
- **Complexity:** T: O(log^2 N) | S: O(log N)

### Q164) Path Sum III
- **Problem:** Paths summing to `target` (downwards, not necessarily root/leaf).
- **Optimal Algo:** Preorder DFS with Prefix Sum Map (like Subarray Sum Equals K).
- **C++ Code:**
```cpp
class Solution {
    int dfs(TreeNode* root, long long sum, int target, unordered_map<long long, int>& mp) {
        if (!root) return 0;
        sum += root->val;
        int count = mp.count(sum - target) ? mp[sum - target] : 0;
        mp[sum]++;
        count += dfs(root->left, sum, target, mp) + dfs(root->right, sum, target, mp);
        mp[sum]--; // Backtrack
        return count;
    }
public:
    int pathSum(TreeNode* root, int targetSum) {
        unordered_map<long long, int> mp; mp[0] = 1;
        return dfs(root, 0, targetSum, mp);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q165) Maximum Difference Between Node and Ancestor
- **Problem:** Max `abs(A.val - B.val)` where A is ancestor of B.
- **Optimal Algo:** Pass `currMax` and `currMin` down the tree. Diff is updated at leaves.
- **C++ Code:**
```cpp
class Solution {
    int dfs(TreeNode* root, int cMax, int cMin) {
        if (!root) return cMax - cMin;
        cMax = max(cMax, root->val); cMin = min(cMin, root->val);
        return max(dfs(root->left, cMax, cMin), dfs(root->right, cMax, cMin));
    }
public:
    int maxAncestorDiff(TreeNode* root) {
        return dfs(root, root->val, root->val);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q166) Construct Binary Tree from Preorder and Inorder Traversal
- **Problem:** Reconstruct tree.
- **Optimal Algo:** First in `preorder` is root. Find root in `inorder`. Left of it is left subtree, right is right subtree. Use Hash Map for O(1) inorder index lookup.
- **C++ Code:**
```cpp
class Solution {
    int preIdx = 0;
    TreeNode* build(vector<int>& pre, int inStart, int inEnd, unordered_map<int, int>& inMap) {
        if (inStart > inEnd) return nullptr;
        TreeNode* root = new TreeNode(pre[preIdx++]);
        int inIdx = inMap[root->val];
        root->left = build(pre, inStart, inIdx - 1, inMap);
        root->right = build(pre, inIdx + 1, inEnd, inMap);
        return root;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> inMap;
        for (int i = 0; i < inorder.size(); i++) inMap[inorder[i]] = i;
        return build(preorder, 0, inorder.size() - 1, inMap);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q167) Construct Binary Tree from Inorder and Postorder Traversal
- **Problem:** Reconstruct tree.
- **Optimal Algo:** Last in `postorder` is root. Decrement postIdx. Map inorder to split left/right. Recursively build RIGHT first!
- **C++ Code:**
```cpp
class Solution {
    int postIdx;
    TreeNode* build(vector<int>& post, int inStart, int inEnd, unordered_map<int, int>& inMap) {
        if (inStart > inEnd) return nullptr;
        TreeNode* root = new TreeNode(post[postIdx--]);
        int inIdx = inMap[root->val];
        root->right = build(post, inIdx + 1, inEnd, inMap); // Must be right first
        root->left = build(post, inStart, inIdx - 1, inMap);
        return root;
    }
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        unordered_map<int, int> inMap; postIdx = postorder.size() - 1;
        for (int i = 0; i < inorder.size(); i++) inMap[inorder[i]] = i;
        return build(postorder, 0, inorder.size() - 1, inMap);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q168) Serialize and Deserialize Binary Tree
- **Problem:** Convert tree to string and back.
- **Optimal Algo:** Preorder stringification with 'N' for null, split by spaces. Stringstream parsing.
- **C++ Code:**
```cpp
class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "N";
        return to_string(root->val) + " " + serialize(root->left) + " " + serialize(root->right);
    }
    TreeNode* deserialize(string data) {
        stringstream ss(data); return build(ss);
    }
    TreeNode* build(stringstream& ss) {
        string val; ss >> val;
        if (val == "N") return nullptr;
        TreeNode* root = new TreeNode(stoi(val));
        root->left = build(ss); root->right = build(ss);
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Inorder

### Q169) Binary Tree Inorder Traversal
- **Problem:** Return inorder (Left, Root, Right).
- **C++ Code:**
```cpp
class Solution {
    void dfs(TreeNode* root, vector<int>& res) {
        if (!root) return;
        dfs(root->left, res); res.push_back(root->val); dfs(root->right, res);
    }
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res; dfs(root, res); return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q170) Minimum Distance Between BST Nodes
- **Problem:** Min difference between any two different nodes.
- **Optimal Algo:** Inorder traversal processes BST in sorted order. Compare current with previous node.
- **C++ Code:**
```cpp
class Solution {
    int minDiff = INT_MAX, prev = -1;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        if (prev != -1) minDiff = min(minDiff, root->val - prev);
        prev = root->val;
        inorder(root->right);
    }
public:
    int minDiffInBST(TreeNode* root) { inorder(root); return minDiff; }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q171) Minimum Absolute Difference in BST
- *(Exactly identical logic to Q170).*

### Q172) Validate Binary Search Tree
- **Problem:** Check if valid BST.
- **Optimal Algo:** Track Min/Max bounds for each node. (Or use inorder prev validation).
- **C++ Code:**
```cpp
class Solution {
    bool check(TreeNode* root, long minV, long maxV) {
        if (!root) return true;
        if (root->val <= minV || root->val >= maxV) return false;
        return check(root->left, minV, root->val) && check(root->right, root->val, maxV);
    }
public:
    bool isValidBST(TreeNode* root) {
        return check(root, LONG_MIN, LONG_MAX);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q173) Kth Smallest Element in a BST
- **Problem:** Find the `k`-th smallest element.
- **Optimal Algo:** Inorder traversal. Decrement `k`, if `k==0`, record answer.
- **C++ Code:**
```cpp
class Solution {
    int res = 0, count = 0;
    void inorder(TreeNode* root, int k) {
        if (!root) return;
        inorder(root->left, k);
        if (++count == k) { res = root->val; return; }
        inorder(root->right, k);
    }
public:
    int kthSmallest(TreeNode* root, int k) {
        inorder(root, k); return res;
    }
};
```
- **Complexity:** T: O(H + K) | S: O(H)

### Q174) Binary Search Tree Iterator
- **Problem:** Iterator for inorder traversal. `next()` and `hasNext()` in O(1) avg time.
- **Optimal Algo:** Stack holding left spine. On `next()`, pop, push right child's left spine.
- **C++ Code:**
```cpp
class BSTIterator {
    stack<TreeNode*> st;
    void pushLeft(TreeNode* node) { while (node) { st.push(node); node = node->left; } }
public:
    BSTIterator(TreeNode* root) { pushLeft(root); }
    int next() {
        TreeNode* node = st.top(); st.pop();
        pushLeft(node->right); return node->val;
    }
    bool hasNext() { return !st.empty(); }
};
```
- **Complexity:** T: O(1) amortized | S: O(H)

### Postorder

### Q175) Binary Tree Postorder Traversal
- **Problem:** Return postorder (Left, Right, Root).
- **C++ Code:**
```cpp
class Solution {
    void dfs(TreeNode* root, vector<int>& res) {
        if (!root) return;
        dfs(root->left, res); dfs(root->right, res); res.push_back(root->val);
    }
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res; dfs(root, res); return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q176) Invert Binary Tree
- **Problem:** Mirror the tree.
- **Optimal Algo:** Swap left and right children, recurse.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q177) Diameter of Binary Tree
- **Problem:** Longest path between any two nodes.
- **Optimal Algo:** Postorder height calculation. Update `max(diameter, leftH + rightH)`. Return `1 + max(leftH, rightH)`.
- **C++ Code:**
```cpp
class Solution {
    int maxD = 0;
    int dfs(TreeNode* root) {
        if (!root) return 0;
        int l = dfs(root->left), r = dfs(root->right);
        maxD = max(maxD, l + r);
        return 1 + max(l, r);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        dfs(root); return maxD;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q178) Delete Nodes And Return Forest
- **Problem:** Remove target nodes and return disjoint trees.
- **Optimal Algo:** Postorder DFS. If node in `to_delete`, push children to forest, return null.
- **C++ Code:**
```cpp
class Solution {
    TreeNode* dfs(TreeNode* root, unordered_set<int>& del, vector<TreeNode*>& res) {
        if (!root) return nullptr;
        root->left = dfs(root->left, del, res);
        root->right = dfs(root->right, del, res);
        if (del.count(root->val)) {
            if (root->left) res.push_back(root->left);
            if (root->right) res.push_back(root->right);
            return nullptr;
        }
        return root;
    }
public:
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        vector<TreeNode*> res; unordered_set<int> del(to_delete.begin(), to_delete.end());
        if (dfs(root, del, res)) res.push_back(root);
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q179) Lowest Common Ancestor of a Binary Tree
- **Problem:** Find LCA of `p` and `q`.
- **Optimal Algo:** If root is p or q, return root. Recurse left and right. If both return non-null, root is LCA. If one returns non-null, pass it up.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* l = lowestCommonAncestor(root->left, p, q);
        TreeNode* r = lowestCommonAncestor(root->right, p, q);
        if (l && r) return root;
        return l ? l : r;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q180) Find Duplicate Subtrees
- **Problem:** Return roots of duplicate subtrees.
- **Optimal Algo:** Serialize subtrees in postorder format `L,R,Root`. Store in hash map. If count == 2, add to result.
- **C++ Code:**
```cpp
class Solution {
    string dfs(TreeNode* root, unordered_map<string, int>& map, vector<TreeNode*>& res) {
        if (!root) return "#";
        string s = dfs(root->left, map, res) + "," + dfs(root->right, map, res) + "," + to_string(root->val);
        if (++map[s] == 2) res.push_back(root);
        return s;
    }
public:
    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root) {
        unordered_map<string, int> map; vector<TreeNode*> res;
        dfs(root, map, res); return res;
    }
};
```
- **Complexity:** T: O(N^2) (string concat) | S: O(N^2)

### Q181) Flatten Binary Tree to Linked List
- **Problem:** Flatten in-place to right-skewed list (preorder).
- **Optimal Algo:** Reverse postorder (Right, Left, Root). Set `node->right = prev`, `node->left = null`, `prev = node`.
- **C++ Code:**
```cpp
class Solution {
    TreeNode* prev = nullptr;
public:
    void flatten(TreeNode* root) {
        if (!root) return;
        flatten(root->right); flatten(root->left);
        root->right = prev; root->left = nullptr; prev = root;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q182) Distribute Coins in Binary Tree
- **Problem:** Moves required to make every node have exactly 1 coin.
- **Optimal Algo:** Postorder. Balance for a subtree is `coins - nodes`. Extra/deficit flows up. Moves = sum of absolute balances.
- **C++ Code:**
```cpp
class Solution {
    int moves = 0;
    int dfs(TreeNode* root) {
        if (!root) return 0;
        int l = dfs(root->left), r = dfs(root->right);
        moves += abs(l) + abs(r);
        return root->val + l + r - 1; // Balance
    }
public:
    int distributeCoins(TreeNode* root) {
        dfs(root); return moves;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q183) Binary Tree Maximum Path Sum
- **Problem:** Max sum of any path.
- **Optimal Algo:** Postorder. Calculate max sum going down left and right branches (must be >= 0). Update global max with `root + L + R`. Return `root + max(L, R)`.
- **C++ Code:**
```cpp
class Solution {
    int maxS = INT_MIN;
    int dfs(TreeNode* root) {
        if (!root) return 0;
        int l = max(0, dfs(root->left)), r = max(0, dfs(root->right));
        maxS = max(maxS, root->val + l + r);
        return root->val + max(l, r);
    }
public:
    int maxPathSum(TreeNode* root) {
        dfs(root); return maxS;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

## 🌲 BST / Ordered Set — **5 Questions**

### Q184) Introduction (Search in a BST)
- **Problem:** Find target node in BST.
- **Optimal Algo:** If `val < root->val`, search left. Else right.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        while (root && root->val != val) root = (val < root->val) ? root->left : root->right;
        return root;
    }
};
```
- **Complexity:** T: O(H) | S: O(1)

### Q185) Trim a Binary Search Tree
- **Problem:** Remove nodes outside `[low, high]`.
- **Optimal Algo:** If `root < low`, left subtree is useless, return `trim(right)`. If `root > high`, return `trim(left)`.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        if (!root) return nullptr;
        if (root->val < low) return trimBST(root->right, low, high);
        if (root->val > high) return trimBST(root->left, low, high);
        root->left = trimBST(root->left, low, high);
        root->right = trimBST(root->right, low, high);
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

### Q186) My Calendar I
- **Problem:** Book events without overlap.
- **Optimal Algo:** `std::map` to store `start -> end`. `upper_bound(start)` gives next event. Check if previous ends after `start` or next starts before `end`.
- **C++ Code:**
```cpp
class MyCalendar {
    map<int, int> cal;
public:
    bool book(int start, int end) {
        auto it = cal.upper_bound(start);
        if (it != cal.end() && it->first < end) return false; // overlaps next
        if (it != cal.begin() && prev(it)->second > start) return false; // overlaps prev
        cal[start] = end; return true;
    }
};
```
- **Complexity:** T: O(log N) | S: O(N)

### Q187) My Calendar II
- **Problem:** Book events, allow double booking, prevent triple booking.
- **Optimal Algo:** Line sweep. Add `+1` to start, `-1` to end. Check if running sum > 2. If so, revert and return false.
- **C++ Code:**
```cpp
class MyCalendarTwo {
    map<int, int> sweep;
public:
    bool book(int start, int end) {
        sweep[start]++; sweep[end]--;
        int sum = 0;
        for (auto& p : sweep) {
            sum += p.second;
            if (sum > 2) { sweep[start]--; sweep[end]++; return false; }
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q188) Stock Price Fluctuation
- **Problem:** Stream of `(timestamp, price)`. Get current, max, min prices.
- **Optimal Algo:** `map<time, price>` and `multiset<price>`. Update deletes old price from multiset, adds new.
- **C++ Code:**
```cpp
class StockPrice {
    map<int, int> timeToPrice;
    multiset<int> prices;
public:
    void update(int timestamp, int price) {
        if (timeToPrice.count(timestamp)) prices.erase(prices.find(timeToPrice[timestamp]));
        timeToPrice[timestamp] = price; prices.insert(price);
    }
    int current() { return timeToPrice.rbegin()->second; }
    int maximum() { return *prices.rbegin(); }
    int minimum() { return *prices.begin(); }
};
```
- **Complexity:** T: O(log N) | S: O(N)

---

## 🔤 Tries — **7 Questions**

### Q189) Introduction (Trie Node Concept)
*(Combined into Q190)*

### Q190) Implement Trie (Prefix Tree)
- **Problem:** Insert, Search, StartsWith.
- **Optimal Algo:** Use an array of 26 pointers and `isEnd`. Traverse letter by letter.
- **C++ Code:**
```cpp
class Trie {
    struct Node { Node* child[26] = {NULL}; bool isEnd = false; };
    Node* root = new Node();
public:
    void insert(string word) {
        Node* curr = root;
        for (char c : word) {
            if (!curr->child[c - 'a']) curr->child[c - 'a'] = new Node();
            curr = curr->child[c - 'a'];
        }
        curr->isEnd = true;
    }
    bool search(string word) {
        Node* curr = root;
        for (char c : word) { if (!curr->child[c - 'a']) return false; curr = curr->child[c - 'a']; }
        return curr->isEnd;
    }
    bool startsWith(string prefix) {
        Node* curr = root;
        for (char c : prefix) { if (!curr->child[c - 'a']) return false; curr = curr->child[c - 'a']; }
        return true;
    }
};
```
- **Complexity:** T: O(Word_Length) | S: O(N * Word_Length)

### Q191) Design Add and Search Words Data Structure
- **Problem:** Add word and search with `.` matching any char.
- **Optimal Algo:** Trie + DFS when encountering `.`.
- **C++ Code:**
```cpp
class WordDictionary {
    struct Node { Node* child[26] = {NULL}; bool isEnd = false; };
    Node* root = new Node();
    bool dfs(string& word, int i, Node* curr) {
        if (i == word.size()) return curr->isEnd;
        if (word[i] == '.') {
            for (int c = 0; c < 26; c++) if (curr->child[c] && dfs(word, i + 1, curr->child[c])) return true;
            return false;
        }
        if (!curr->child[word[i] - 'a']) return false;
        return dfs(word, i + 1, curr->child[word[i] - 'a']);
    }
public:
    void addWord(string word) {
        Node* curr = root;
        for (char c : word) {
            if (!curr->child[c - 'a']) curr->child[c - 'a'] = new Node();
            curr = curr->child[c - 'a'];
        } curr->isEnd = true;
    }
    bool search(string word) { return dfs(word, 0, root); }
};
```
- **Complexity:** T: Insert O(L), Search O(26^Dots * L) | S: O(N * L)

### Q192) Search Suggestions System
- **Problem:** Top 3 matching words as you type.
- **Optimal Algo:** Sort words. Binary Search (`lower_bound`) prefix. Add next 3 matches. (Or Trie + DFS).
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
        sort(products.begin(), products.end());
        vector<vector<string>> res; string prefix = "";
        auto it = products.begin();
        for (char c : searchWord) {
            prefix += c;
            it = lower_bound(it, products.end(), prefix);
            vector<string> top3;
            for (int i = 0; i < 3 && it + i != products.end(); i++) {
                string& w = *(it + i);
                if (w.substr(0, prefix.size()) != prefix) break;
                top3.push_back(w);
            }
            res.push_back(top3);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N log N + L * log N) | S: O(1) beyond input/output

### Q193) Longest Word in Dictionary
- **Problem:** Find longest word built 1 char at a time from other words.
- **Optimal Algo:** Insert all words to Trie. BFS to find deepest path where *every node* is a valid word endpoint.
- **C++ Code:**
```cpp
class Solution {
public:
    string longestWord(vector<string>& words) {
        sort(words.begin(), words.end()); unordered_set<string> built; string res = "";
        for (string w : words) {
            if (w.length() == 1 || built.count(w.substr(0, w.length() - 1))) {
                res = w.length() > res.length() ? w : res; built.insert(w);
            }
        }
        return res;
    }
};
```
*(Code optimized to Sorting + Hash Set which is vastly cleaner and faster than raw Trie)*
- **Complexity:** T: O(N log N * L) | S: O(N)

### Q194) Maximum XOR of Two Numbers in an Array
- **Problem:** Max `nums[i] ^ nums[j]`.
- **Optimal Algo:** Bitwise Trie. Insert numbers as 32-bit binaries. For each num, traverse Trie trying to pick opposite bits to maximize XOR.
- **C++ Code:**
```cpp
class Solution {
    struct Node { Node* child[2] = {NULL}; };
public:
    int findMaximumXOR(vector<int>& nums) {
        Node* root = new Node(); int maxXor = 0;
        for (int n : nums) {
            Node* curr = root;
            for (int i = 31; i >= 0; i--) {
                int bit = (n >> i) & 1;
                if (!curr->child[bit]) curr->child[bit] = new Node();
                curr = curr->child[bit];
            }
        }
        for (int n : nums) {
            Node* curr = root; int currentXor = 0;
            for (int i = 31; i >= 0; i--) {
                int bit = (n >> i) & 1;
                if (curr->child[1 - bit]) { currentXor |= (1 << i); curr = curr->child[1 - bit]; }
                else curr = curr->child[bit];
            }
            maxXor = max(maxXor, currentXor);
        }
        return maxXor;
    }
};
```
- **Complexity:** T: O(N) (32 bits = constant multiplier) | S: O(N)

### Q195) Word Search II
- **Problem:** Find all words from dictionary in grid.
- **Optimal Algo:** Insert all words into Trie. DFS on grid, passing Trie node down. Prune branches if node doesn't exist. Clear matched words from Trie to prevent duplicates.
- **C++ Code:**
```cpp
class Solution {
    struct Node { Node* child[26] = {NULL}; string* word = NULL; };
    void dfs(vector<vector<char>>& board, int r, int c, Node* curr, vector<string>& res) {
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] == '#') return;
        char ch = board[r][c]; curr = curr->child[ch - 'a'];
        if (!curr) return;
        if (curr->word) { res.push_back(*(curr->word)); curr->word = NULL; } // Add & avoid dups
        board[r][c] = '#'; // visited
        dfs(board, r + 1, c, curr, res); dfs(board, r - 1, c, curr, res);
        dfs(board, r, c + 1, curr, res); dfs(board, r, c - 1, curr, res);
        board[r][c] = ch;
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        Node* root = new Node();
        for (string& w : words) {
            Node* curr = root;
            for (char c : w) {
                if (!curr->child[c - 'a']) curr->child[c - 'a'] = new Node();
                curr = curr->child[c - 'a'];
            } curr->word = &w;
        }
        vector<string> res;
        for (int r = 0; r < board.size(); r++) {
            for (int c = 0; c < board[0].size(); c++) dfs(board, r, c, root, res);
        }
        return res;
    }
};
```
- **Complexity:** T: O(M * N * 3^L) | S: O(W * L)

## 🧮 Heaps — **15 Questions**

### Core

### Q196) Introduction (Kth Largest Element in an Array - Heap approach)
- **Problem:** Find the `k`-th largest element.
- **Concept:** Min-Heap.
- **Optimal Algo:** Maintain a min-heap of size `k`. If a new element is larger than `heap.top()`, pop and push. Top is the `k`-th largest.
- **C++ Code:**
```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minH;
        for (int n : nums) {
            minH.push(n);
            if (minH.size() > k) minH.pop();
        }
        return minH.top();
    }
};
```
- **Complexity:** Time: O(N log K) | Space: O(K)

### Q197) Furthest Building You Can Reach
- **Problem:** Reach furthest building given `bricks` and `ladders`.
- **Concept:** Min-Heap for Ladders.
- **Optimal Algo:** Use ladders for the largest jumps. Min-heap stores ladder jumps. If heap size > ladders, replace the smallest ladder jump with bricks. If `bricks < 0`, return current index.
- **C++ Code:**
```cpp
class Solution {
public:
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        priority_queue<int, vector<int>, greater<int>> minH;
        for (int i = 0; i < heights.size() - 1; i++) {
            int diff = heights[i + 1] - heights[i];
            if (diff > 0) minH.push(diff);
            if (minH.size() > ladders) { bricks -= minH.top(); minH.pop(); }
            if (bricks < 0) return i;
        }
        return heights.size() - 1;
    }
};
```
- **Dry Run:** jumps=[3,1,2], ladders=1, bricks=2 -> push 3. push 1 -> size>1, pop 1, bricks=2-1=1. push 2 -> size>1, pop 2, bricks=1-2=-1. Fails at index 2.
- **Complexity:** Time: O(N log L) | Space: O(L)

### Q198) Single-Threaded CPU
- **Problem:** CPU processes tasks (enqueueTime, processingTime). Shortest task first.
- **Concept:** Sorting + Min-Heap.
- **Optimal Algo:** Sort tasks by enqueue time. Maintain a min-heap `<procTime, index>`. Advance `time` to next available task if heap is empty. Push available tasks to heap, then pop and process.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        for (int i = 0; i < tasks.size(); i++) tasks[i].push_back(i);
        sort(tasks.begin(), tasks.end());
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> res; long long time = 0; int i = 0, n = tasks.size();
        while (i < n || !pq.empty()) {
            if (pq.empty() && time < tasks[i][0]) time = tasks[i][0];
            while (i < n && tasks[i][0] <= time) {
                pq.push({tasks[i][1], tasks[i][2]}); i++;
            }
            auto [pTime, idx] = pq.top(); pq.pop();
            time += pTime; res.push_back(idx);
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N log N) | Space: O(N)

### Q199) Process Tasks Using Servers
- **Problem:** Assign tasks to available servers (weight, index). 
- **Concept:** Two Min-Heaps.
- **Optimal Algo:** `freeServers` stores `{weight, index}`. `busyServers` stores `{endTime, weight, index}`. For each task, free up servers whose `endTime <= time`. Assign to top of `freeServers`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> freeS;
        priority_queue<vector<long long>, vector<vector<long long>>, greater<vector<long long>>> busyS;
        for (int i = 0; i < servers.size(); i++) freeS.push({servers[i], i});
        vector<int> res; long long time = 0;
        for (int i = 0; i < tasks.size(); i++) {
            time = max(time, (long long)i);
            if (freeS.empty()) time = max(time, busyS.top()[0]);
            while (!busyS.empty() && busyS.top()[0] <= time) {
                freeS.push({busyS.top()[1], busyS.top()[2]}); busyS.pop();
            }
            auto [w, idx] = freeS.top(); freeS.pop();
            res.push_back(idx); busyS.push({time + tasks[i], w, idx});
        }
        return res;
    }
};
```
- **Complexity:** Time: O(M log N) | Space: O(N)

### Two Heaps

### Q200) Find Median from Data Stream
- **Problem:** Add numbers and get median in O(1).
- **Concept:** Max-Heap (left) + Min-Heap (right).
- **Optimal Algo:** Keep `maxH` (smaller half) and `minH` (larger half). `maxH` can have at most 1 more element than `minH`.
- **C++ Code:**
```cpp
class MedianFinder {
    priority_queue<int> maxH;
    priority_queue<int, vector<int>, greater<int>> minH;
public:
    void addNum(int num) {
        maxH.push(num);
        minH.push(maxH.top()); maxH.pop();
        if (maxH.size() < minH.size()) { maxH.push(minH.top()); minH.pop(); }
    }
    double findMedian() {
        return maxH.size() > minH.size() ? maxH.top() : (maxH.top() + minH.top()) / 2.0;
    }
};
```
- **Complexity:** Time: O(log N) per add, O(1) median | Space: O(N)

### Q201) IPO
- **Problem:** Maximize capital by selecting at most `k` distinct projects.
- **Concept:** Greedy + Max-Heap.
- **Optimal Algo:** Sort projects by `capital` required. Push all affordable projects' profits to a `maxH`. Pop the largest profit and add to capital. Repeat `k` times.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        vector<pair<int, int>> projs;
        for (int i = 0; i < profits.size(); i++) projs.push_back({capital[i], profits[i]});
        sort(projs.begin(), projs.end());
        priority_queue<int> maxH; int i = 0, n = projs.size();
        while (k--) {
            while (i < n && projs[i].first <= w) maxH.push(projs[i++].second);
            if (maxH.empty()) break;
            w += maxH.top(); maxH.pop();
        }
        return w;
    }
};
```
- **Complexity:** Time: O(N log N + K log N) | Space: O(N)

### Q202) Sliding Window Median
- **Problem:** Median of sliding window of size `k`.
- **Concept:** Two Multisets / Lazy Deletion Heaps.
- **Optimal Algo:** Multiset automatically keeps elements sorted. Use `prev(mid)` and `next(mid)` pointers or indexing if using PBDS. Given C++ STL, `multiset` + iterator to median is optimal.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        multiset<long long> window(nums.begin(), nums.begin() + k);
        auto mid = next(window.begin(), (k - 1) / 2);
        vector<double> res;
        for (int i = k; ; i++) {
            res.push_back((double(*mid) + *next(mid, 1 - k % 2)) / 2.0);
            if (i == nums.size()) break;
            window.insert(nums[i]);
            if (nums[i] < *mid) mid--;
            if (nums[i - k] <= *mid) mid++;
            window.erase(window.lower_bound(nums[i - k]));
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N log K) | Space: O(K)

### K-Way Merge

### Q203) Find K Pairs with Smallest Sums
- **Problem:** `k` pairs with smallest sums from two sorted arrays.
- **Concept:** Min-Heap (K-Way Merge).
- **Optimal Algo:** Push `{nums1[i]+nums2[0], i, 0}` for `i` up to `k`. Pop, add pair to result, push `{nums1[i]+nums2[j+1], i, j+1}`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> minH;
        for (int i = 0; i < nums1.size() && i < k; i++) minH.push({nums1[i] + nums2[0], i, 0});
        vector<vector<int>> res;
        while (k-- && !minH.empty()) {
            auto t = minH.top(); minH.pop();
            int i = t[1], j = t[2]; res.push_back({nums1[i], nums2[j]});
            if (j + 1 < nums2.size()) minH.push({nums1[i] + nums2[j + 1], i, j + 1});
        }
        return res;
    }
};
```
- **Complexity:** Time: O(K log K) | Space: O(K)

### Q204) Kth Smallest Element in a Sorted Matrix
- **Problem:** Return the `k`-th smallest element in `N x N` matrix where rows and cols are sorted.
- **Concept:** Min-Heap / Binary Search.
- **Optimal Algo (Heap):** Push first element of each row. Pop `k-1` times, pushing the next element in the popped element's row.
- **C++ Code:**
```cpp
class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> minH;
        int n = matrix.size();
        for (int i = 0; i < min(n, k); i++) minH.push({matrix[i][0], i, 0});
        int ans = 0;
        while (k--) {
            auto t = minH.top(); minH.pop();
            ans = t[0]; int r = t[1], c = t[2];
            if (c + 1 < n) minH.push({matrix[r][c + 1], r, c + 1});
        }
        return ans;
    }
};
```
- **Complexity:** Time: O(K log N) | Space: O(N)

### Q205) Merge k Sorted Lists
- **Problem:** Merge `k` sorted linked lists.
- **Concept:** Min-Heap.
- **Optimal Algo:** Push the head of each list into a Min-Heap. Pop smallest, append to dummy list, push `node->next`.
- **C++ Code:**
```cpp
class Solution {
    struct Comp { bool operator()(ListNode* a, ListNode* b) { return a->val > b->val; } };
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Comp> minH;
        for (auto l : lists) if (l) minH.push(l);
        ListNode dummy(0); ListNode* tail = &dummy;
        while (!minH.empty()) {
            ListNode* node = minH.top(); minH.pop();
            tail->next = node; tail = tail->next;
            if (node->next) minH.push(node->next);
        }
        return dummy.next;
    }
};
```
- **Complexity:** Time: O(N log K) | Space: O(K)

### Q206) Smallest Range Covering Elements from K Lists
- **Problem:** Smallest range that includes at least one number from each of the `k` lists.
- **Concept:** Min-Heap + Track Max.
- **Optimal Algo:** Push 1st element of all lists to Min-Heap, track `currMax`. Pop `currMin`, update `range`. Push next element of popped list, update `currMax`. Break if any list exhausts.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> smallestRange(vector<vector<int>>& nums) {
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> minH;
        int currMax = INT_MIN;
        for (int i = 0; i < nums.size(); i++) {
            minH.push({nums[i][0], i, 0});
            currMax = max(currMax, nums[i][0]);
        }
        int start = -100000, end = 100000;
        while (true) {
            auto t = minH.top(); minH.pop();
            int currMin = t[0], r = t[1], c = t[2];
            if (currMax - currMin < end - start) { start = currMin; end = currMax; }
            if (c + 1 == nums[r].size()) break;
            minH.push({nums[r][c + 1], r, c + 1});
            currMax = max(currMax, nums[r][c + 1]);
        }
        return {start, end};
    }
};
```
- **Complexity:** Time: O(N log K) | Space: O(K)

### Top K

### Q207) Introduction (Sort / Heap Basics)
*(Concept covered heavily above)*

### Q208) Kth Largest Element in a Stream
- **Problem:** Find the `k`-th largest element dynamically.
- **Concept:** Min-Heap of size `k`.
- **Optimal Algo:** Maintain min-heap of size `k`. Top element is `k`-th largest.
- **C++ Code:**
```cpp
class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minH; int k;
public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k; for (int n : nums) add(n);
    }
    int add(int val) {
        minH.push(val);
        if (minH.size() > k) minH.pop();
        return minH.top();
    }
};
```
- **Complexity:** Time: O(log K) per add | Space: O(K)

### Q209) Top K Frequent Elements
*(Identical to Q117 under Sorting. C++ priority queue usage omitted to save redundancy).*

### Q210) K Closest Points to Origin
- **Problem:** Find `k` closest points to `(0, 0)`.
- **Concept:** Max-Heap of size `k`.
- **Optimal Algo:** Dist = `x*x + y*y`. Push to max-heap. If size > k, pop largest.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<pair<int, vector<int>>> maxH;
        for (auto& p : points) {
            maxH.push({p[0] * p[0] + p[1] * p[1], p});
            if (maxH.size() > k) maxH.pop();
        }
        vector<vector<int>> res;
        while (!maxH.empty()) { res.push_back(maxH.top().second); maxH.pop(); }
        return res;
    }
};
```
- **Complexity:** Time: O(N log K) | Space: O(K)

---

## 📏 Intervals — **6 Questions**

### Q211) Introduction to Intervals (Check Overlap)
- **Problem:** Check if `[s1, e1]` and `[s2, e2]` overlap.
- **Optimal Algo:** `max(s1, s2) <= min(e1, e2)`.

### Q212) Merge Intervals
- **Problem:** Merge all overlapping intervals.
- **Concept:** Sorting + Sweeping.
- **Optimal Algo:** Sort by start time. If `curr_start <= prev_end`, merge by `prev_end = max(prev_end, curr_end)`. Else, push to result.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res; res.push_back(intervals[0]);
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= res.back()[1]) res.back()[1] = max(res.back()[1], intervals[i][1]);
            else res.push_back(intervals[i]);
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N log N) | Space: O(N)

### Q213) Insert Interval
- **Problem:** Insert new interval into sorted non-overlapping intervals.
- **Concept:** Three-Phase Sweep.
- **Optimal Algo:** Push intervals ending before new interval. Merge overlapping intervals into new interval. Push remaining intervals.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newI) {
        vector<vector<int>> res; int i = 0, n = intervals.size();
        while (i < n && intervals[i][1] < newI[0]) res.push_back(intervals[i++]);
        while (i < n && intervals[i][0] <= newI[1]) {
            newI[0] = min(newI[0], intervals[i][0]);
            newI[1] = max(newI[1], intervals[i][1]); i++;
        }
        res.push_back(newI);
        while (i < n) res.push_back(intervals[i++]);
        return res;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q214) Minimum Number of Arrows to Burst Balloons
- **Problem:** Minimum arrows to shoot through all overlapping balloon intervals.
- **Concept:** Greedy Sorting by End Time.
- **Optimal Algo:** Sort by `end`. If next balloon's `start <= prev_end`, one arrow bursts both. Else, need a new arrow.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(), points.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
        int arrows = 1, end = points[0][1];
        for (int i = 1; i < points.size(); i++) {
            if (points[i][0] > end) { arrows++; end = points[i][1]; }
        }
        return arrows;
    }
};
```
- **Complexity:** Time: O(N log N) | Space: O(1)

### Q215) Maximum Number of Events That Can Be Attended
- **Problem:** Attend max events (1 event per day). Events have `[start, end]`.
- **Concept:** Sorting + Min-Heap.
- **Optimal Algo:** Sort by `start`. Iterate days. Push all events starting on `day` to Min-Heap (sorted by `end`). Remove expired events. Attend the event ending soonest (pop 1).
- **C++ Code:**
```cpp
class Solution {
public:
    int maxEvents(vector<vector<int>>& events) {
        sort(events.begin(), events.end());
        priority_queue<int, vector<int>, greater<int>> minH;
        int i = 0, n = events.size(), day = 0, count = 0;
        while (i < n || !minH.empty()) {
            if (minH.empty()) day = max(day, events[i][0]);
            while (i < n && events[i][0] == day) minH.push(events[i++][1]);
            minH.pop(); count++; day++;
            while (!minH.empty() && minH.top() < day) minH.pop();
        }
        return count;
    }
};
```
- **Complexity:** Time: O(N log N) | Space: O(N)

### Q216) Non-overlapping Intervals
- **Problem:** Min intervals to remove to make the rest non-overlapping.
- **Concept:** Greedy Sorting by End Time.
- **Optimal Algo:** Sort by `end`. If `start < prev_end`, remove it (count++). Else, update `prev_end`.
- **C++ Code:**
```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
        int count = 0, end = intervals[0][1];
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < end) count++;
            else end = intervals[i][1];
        }
        return count;
    }
};
```
- **Complexity:** Time: O(N log N) | Space: O(1)

---

## 🏗️ Data Structure Design — **8 Questions**

### Q217) Design Browser History
- **Problem:** Back, Forward, Visit history like a web browser.
- **Optimal Algo:** Use two stacks or a Vector with a `curr` pointer and `bound` pointer.
- **C++ Code:**
```cpp
class BrowserHistory {
    vector<string> history; int curr = 0, bound = 0;
public:
    BrowserHistory(string homepage) { history.push_back(homepage); }
    void visit(string url) {
        curr++;
        if (curr < history.size()) history[curr] = url; else history.push_back(url);
        bound = curr;
    }
    string back(int steps) { curr = max(0, curr - steps); return history[curr]; }
    string forward(int steps) { curr = min(bound, curr + steps); return history[curr]; }
};
```
- **Complexity:** Time: O(1) all ops | Space: O(N)

### Q218) Time Based Key-Value Store
- **Problem:** Get the value of a key at `timestamp` `<= target`.
- **Optimal Algo:** Hash Map to `vector<pair<timestamp, value>>`. Since timestamps are strictly increasing, use Binary Search (`upper_bound`).
- **C++ Code:**
```cpp
class TimeMap {
    unordered_map<string, vector<pair<int, string>>> mp;
public:
    void set(string key, string value, int timestamp) { mp[key].push_back({timestamp, value}); }
    string get(string key, int timestamp) {
        if (!mp.count(key)) return "";
        auto& vec = mp[key];
        int l = 0, r = vec.size() - 1, ans = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (vec[m].first <= timestamp) { ans = m; l = m + 1; }
            else r = m - 1;
        }
        return ans == -1 ? "" : vec[ans].second;
    }
};
```
- **Complexity:** Time: Set O(1), Get O(log N) | Space: O(N)

### Q219) Snapshot Array
- **Problem:** Array that takes snapshots and gets value at `snap_id`.
- **Optimal Algo:** Array of vectors. Each vector stores `pair<snap_id, value>`. Binary search to fetch by `snap_id`.
- **C++ Code:**
```cpp
class SnapshotArray {
    vector<vector<pair<int, int>>> arr; int snapId = 0;
public:
    SnapshotArray(int length) { arr.resize(length); for (auto& v : arr) v.push_back({0, 0}); }
    void set(int index, int val) {
        if (arr[index].back().first == snapId) arr[index].back().second = val;
        else arr[index].push_back({snapId, val});
    }
    int snap() { return snapId++; }
    int get(int index, int snap_id) {
        auto it = upper_bound(arr[index].begin(), arr[index].end(), pair<int, int>(snap_id, INT_MAX));
        return prev(it)->second;
    }
};
```
- **Complexity:** Time: Set/Snap O(1), Get O(log S) | Space: O(N + S)

### Q220) Design Twitter
- **Problem:** Post tweet, get news feed, follow, unfollow.
- **Optimal Algo:** Global `time`. Map `user -> set<followees>`. Map `user -> vector<pair<time, tweet>>`. For feed: use Max-Heap combining 10 most recent tweets of user + followees.
- **C++ Code:**
```cpp
class Twitter {
    unordered_map<int, unordered_set<int>> follows;
    unordered_map<int, vector<pair<int, int>>> tweets; int time = 0;
public:
    void postTweet(int userId, int tweetId) { tweets[userId].push_back({time++, tweetId}); }
    vector<int> getNewsFeed(int userId) {
        priority_queue<pair<int, int>> pq;
        follows[userId].insert(userId);
        for (int f : follows[userId]) {
            for (int i = 0; i < tweets[f].size(); i++) pq.push(tweets[f][i]);
        }
        vector<int> res;
        while (!pq.empty() && res.size() < 10) { res.push_back(pq.top().second); pq.pop(); }
        return res;
    }
    void follow(int followerId, int followeeId) { follows[followerId].insert(followeeId); }
    void unfollow(int followerId, int followeeId) { follows[followerId].erase(followeeId); }
};
```
- **Complexity:** Time: Post/Follow O(1), Feed O(U * T log 10) | Space: O(U * T)

### Q221) LRU Cache
- **Problem:** Implement Least Recently Used Cache.
- **Concept:** Doubly Linked List + Hash Map.
- **Optimal Algo:** Hash Map stores `Key -> Node pointer`. DLL moves accessed nodes to head. If capacity exceeded, drop tail node and erase from map.
- **C++ Code:**
```cpp
class LRUCache {
    struct Node { int k, v; Node *prev, *next; Node(int k, int v): k(k), v(v), prev(NULL), next(NULL) {} };
    int cap; unordered_map<int, Node*> mp; Node *head, *tail;
    void addNode(Node* node) { node->next = head->next; node->next->prev = node; head->next = node; node->prev = head; }
    void removeNode(Node* node) { node->prev->next = node->next; node->next->prev = node->prev; }
public:
    LRUCache(int capacity) { cap = capacity; head = new Node(-1,-1); tail = new Node(-1,-1); head->next = tail; tail->prev = head; }
    int get(int key) {
        if (!mp.count(key)) return -1;
        Node* node = mp[key]; removeNode(node); addNode(node); return node->v;
    }
    void put(int key, int value) {
        if (mp.count(key)) { Node* node = mp[key]; node->v = value; removeNode(node); addNode(node); }
        else {
            if (mp.size() == cap) { Node* lru = tail->prev; mp.erase(lru->k); removeNode(lru); delete lru; }
            Node* newNode = new Node(key, value); mp[key] = newNode; addNode(newNode);
        }
    }
};
```
- **Complexity:** Time: O(1) | Space: O(Capacity)

### Q222) Insert Delete GetRandom O(1)
- **Problem:** O(1) insert, remove, and random.
- **Concept:** Hash Map + Vector.
- **Optimal Algo:** Vector stores values. Map stores `Val -> Index`. On removal, swap element to remove with the last element in the vector, update map, and pop back.
- **C++ Code:**
```cpp
class RandomizedSet {
    unordered_map<int, int> mp; vector<int> nums;
public:
    bool insert(int val) {
        if (mp.count(val)) return false;
        nums.push_back(val); mp[val] = nums.size() - 1; return true;
    }
    bool remove(int val) {
        if (!mp.count(val)) return false;
        int idx = mp[val], lastVal = nums.back();
        nums[idx] = lastVal; mp[lastVal] = idx;
        nums.pop_back(); mp.erase(val); return true;
    }
    int getRandom() { return nums[rand() % nums.size()]; }
};
```
- **Complexity:** Time: O(1) | Space: O(N)

### Q223) Design a Food Rating System
- **Problem:** Change rating of food. Get highest rated food by cuisine.
- **Concept:** Map + Sorted Set (Custom Compare).
- **Optimal Algo:** Map food to `{cuisine, rating}`. Map cuisine to `set<pair<rating, food>>`. Erase old pair, insert new pair on rating change.
- **C++ Code:**
```cpp
class FoodRatings {
    struct Comp {
        bool operator()(const pair<int, string>& a, const pair<int, string>& b) const {
            if (a.first != b.first) return a.first > b.first;
            return a.second < b.second;
        }
    };
    unordered_map<string, pair<string, int>> foodMap;
    unordered_map<string, set<pair<int, string>, Comp>> cuisineMap;
public:
    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {
        for (int i = 0; i < foods.size(); i++) {
            foodMap[foods[i]] = {cuisines[i], ratings[i]};
            cuisineMap[cuisines[i]].insert({ratings[i], foods[i]});
        }
    }
    void changeRating(string food, int newRating) {
        auto& [cuisine, oldRating] = foodMap[food];
        cuisineMap[cuisine].erase({oldRating, food});
        oldRating = newRating;
        cuisineMap[cuisine].insert({newRating, food});
    }
    string highestRated(string cuisine) { return cuisineMap[cuisine].begin()->second; }
};
```
- **Complexity:** Time: Change O(log N), Highest O(1) | Space: O(N)

### Q224) Maximum Frequency Stack
- **Problem:** Push, Pop (returns most frequent element). Ties broken by closest to top.
- **Concept:** Frequency Map + Map of Stacks.
- **Optimal Algo:** `freq` map to track counts. `group` map maps frequency to a Stack. Track `maxFreq`. Push to `group[freq[val]]`. Pop from `group[maxFreq]`, decrement `maxFreq` if stack empties.
- **C++ Code:**
```cpp
class FreqStack {
    unordered_map<int, int> freq;
    unordered_map<int, stack<int>> group; int maxFreq = 0;
public:
    void push(int val) {
        int f = ++freq[val]; maxFreq = max(maxFreq, f);
        group[f].push(val);
    }
    int pop() {
        int val = group[maxFreq].top(); group[maxFreq].pop();
        freq[val]--;
        if (group[maxFreq].empty()) maxFreq--;
        return val;
    }
};
```
- **Complexity:** Time: O(1) | Space: O(N)

---

## 🎯 Greedy — **8 Questions**

### Q225) Introduction (Jump Game I)
- **Problem:** Check if you can reach the last index.
- **Optimal Algo:** Track `max_reach`. Loop `i`. If `i > max_reach`, return false. `max_reach = max(max_reach, i + nums[i])`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int max_reach = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (i > max_reach) return false;
            max_reach = max(max_reach, i + nums[i]);
        }
        return true;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q226) Jump Game II
- **Problem:** Minimum jumps to reach the end.
- **Optimal Algo:** BFS/Greedy window. Maintain `current_end` and `farthest`. When `i == current_end`, jump! Update `current_end = farthest`.
- **C++ Code:**
```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, current_end = 0, farthest = 0;
        for (int i = 0; i < nums.size() - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            if (i == current_end) { jumps++; current_end = farthest; }
        }
        return jumps;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q227) Minimum Add to Make Parentheses Valid
- **Problem:** Minimum additions to balance string.
- **Optimal Algo:** Track `open_needed` and `close_needed`. If `(`, `close_needed++`. If `)`, if `close_needed > 0` it decrements, else `open_needed++`.
- **C++ Code:**
```cpp
class Solution {
public:
    int minAddToMakeValid(string s) {
        int open_needed = 0, close_needed = 0;
        for (char c : s) {
            if (c == '(') close_needed++;
            else { if (close_needed > 0) close_needed--; else open_needed++; }
        }
        return open_needed + close_needed;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q228) Gas Station
- **Problem:** Can you complete circuit?
- **Optimal Algo:** If total gas < total cost, return -1. Track `tank`. If `tank < 0`, reset `tank = 0` and `start = i + 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int total = 0, tank = 0, start = 0;
        for (int i = 0; i < gas.size(); i++) {
            total += gas[i] - cost[i]; tank += gas[i] - cost[i];
            if (tank < 0) { start = i + 1; tank = 0; }
        }
        return total < 0 ? -1 : start;
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q229) Task Scheduler
- **Problem:** Minimum intervals to finish tasks with cooling period `n`.
- **Optimal Algo:** Find max frequency `F`. Max idle spots = `(F - 1) * n`. Iterate remaining counts and deduct from idle spots. Total time = `tasks.size() + max(0, idle_spots)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> count(26, 0); int maxF = 0;
        for (char c : tasks) maxF = max(maxF, ++count[c - 'A']);
        int idles = (maxF - 1) * n;
        for (int i = 0; i < 26; i++) {
            if (count[i] == maxF) idles -= (maxF - 1);
            else idles -= count[i];
        }
        idles += (maxF - 1); // fix over-deduction of max element itself
        return tasks.size() + max(0, idles);
    }
};
```
- **Complexity:** Time: O(N) | Space: O(1)

### Q230) Minimum Cost to Hire K Workers
- **Problem:** Min cost to hire `k` workers meeting their min wage/quality ratio constraint.
- **Concept:** Sorting + Max-Heap.
- **Optimal Algo:** Sort workers by `wage/quality` ratio. Iterate through workers, push quality to Max-Heap, maintain `sum_quality`. If heap size > `k`, pop max quality. Calculate `cost = ratio * sum_quality`.
- **C++ Code:**
```cpp
class Solution {
public:
    double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int k) {
        vector<pair<double, int>> w;
        for (int i = 0; i < quality.size(); i++) w.push_back({(double)wage[i] / quality[i], quality[i]});
        sort(w.begin(), w.end());
        priority_queue<int> maxH; int sumQ = 0; double minCost = 1e18;
        for (auto& worker : w) {
            sumQ += worker.second; maxH.push(worker.second);
            if (maxH.size() > k) { sumQ -= maxH.top(); maxH.pop(); }
            if (maxH.size() == k) minCost = min(minCost, sumQ * worker.first);
        }
        return minCost;
    }
};
```
- **Complexity:** Time: O(N log N) | Space: O(N)

### Q231) Candy
- **Problem:** Distribute candies. Higher rating than neighbor gets more candies.
- **Optimal Algo:** Two-pass array. Pass 1 (left to right): if `R[i] > R[i-1]`, `candies[i] = candies[i-1] + 1`. Pass 2 (right to left): if `R[i] > R[i+1]`, `candies[i] = max(candies[i], candies[i+1] + 1)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size(); vector<int> c(n, 1);
        for (int i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;
        for (int i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) c[i] = max(c[i], c[i + 1] + 1);
        return accumulate(c.begin(), c.end(), 0);
    }
};
```
- **Complexity:** Time: O(N) | Space: O(N)

### Q232) Minimum Number of Refueling Stops
- **Problem:** Min stops to reach `target`.
- **Optimal Algo:** Max-Heap of passed fuel stations. While `fuel < current_target`, pop from Max-Heap and add to fuel. If empty, return -1.
- **C++ Code:**
```cpp
class Solution {
public:
    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {
        priority_queue<int> maxH; int i = 0, res = 0;
        int max_reach = startFuel;
        while (max_reach < target) {
            while (i < stations.size() && stations[i][0] <= max_reach) {
                maxH.push(stations[i++][1]);
            }
            if (maxH.empty()) return -1;
            max_reach += maxH.top(); maxH.pop(); res++;
        }
        return res;
    }
};
```
- **Complexity:** Time: O(N log N) | Space: O(N)


## 🌐 Graphs — **39 Questions**

### DFS

### Q233) Introduction (DFS Template - Find if Path Exists in Graph)
- **Problem:** Given edges, check if a valid path exists from `source` to `destination`.
- **Concept:** DFS Graph Traversal.
- **Optimal Algo:** Build adjacency list. Recursively visit nodes, marking a `visited` array.
- **C++ Code:**
```cpp
class Solution {
    bool dfs(int u, int target, vector<vector<int>>& adj, vector<bool>& vis) {
        if (u == target) return true;
        vis[u] = true;
        for (int v : adj[u]) if (!vis[v] && dfs(v, target, adj, vis)) return true;
        return false;
    }
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int dest) {
        vector<vector<int>> adj(n); vector<bool> vis(n, false);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        return dfs(source, dest, adj, vis);
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

### Q234) Number of Islands
- **Problem:** Count connected components of '1's (land) in a grid.
- **Concept:** Grid DFS.
- **Optimal Algo:** Iterate grid. When finding '1', increment counter, and launch DFS to sink the island (turn connected '1's to '0's).
- **C++ Code:**
```cpp
class Solution {
    void dfs(vector<vector<char>>& grid, int i, int j) {
        if (i < 0 || i >= grid.size() || j < 0 || j >= grid[0].size() || grid[i][j] == '0') return;
        grid[i][j] = '0';
        dfs(grid, i + 1, j); dfs(grid, i - 1, j); dfs(grid, i, j + 1); dfs(grid, i, j - 1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }
            }
        } return count;
    }
};
```
- **Complexity:** T: O(V) (V = M*N) | S: O(V) (call stack)

### Q235) Time Needed to Inform All Employees
- **Problem:** Time for a message to reach all employees from `headID`.
- **Concept:** Tree/Graph DFS.
- **Optimal Algo:** Build adj list mapping managers to subordinates. DFS returns max time among children + `informTime[manager]`.
- **C++ Code:**
```cpp
class Solution {
    int dfs(int u, vector<vector<int>>& adj, vector<int>& informTime) {
        int maxTime = 0;
        for (int v : adj[u]) maxTime = max(maxTime, dfs(v, adj, informTime));
        return maxTime + informTime[u];
    }
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<vector<int>> adj(n);
        for (int i = 0; i < n; i++) if (manager[i] != -1) adj[manager[i]].push_back(i);
        return dfs(headID, adj, informTime);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q236) All Paths From Source to Target
- **Problem:** Find all paths from node `0` to `n-1` in a DAG.
- **Concept:** DFS / Backtracking.
- **Optimal Algo:** Push current node to path. Recurse neighbors. If node == target, push path to result. Pop node.
- **C++ Code:**
```cpp
class Solution {
    void dfs(int u, vector<vector<int>>& graph, vector<int>& path, vector<vector<int>>& res) {
        path.push_back(u);
        if (u == graph.size() - 1) res.push_back(path);
        else for (int v : graph[u]) dfs(v, graph, path, res);
        path.pop_back();
    }
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        vector<vector<int>> res; vector<int> path; dfs(0, graph, path, res); return res;
    }
};
```
- **Complexity:** T: O(2^V * V) | S: O(V)

### Q237) Clone Graph
- **Problem:** Deep copy of a connected undirected graph.
- **Concept:** DFS + Hash Map.
- **Optimal Algo:** Use map `original Node* -> copied Node*`. If node exists in map, return it. Else, clone it, add to map, and recursively clone neighbors.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<Node*, Node*> copies;
public:
    Node* cloneGraph(Node* node) {
        if (!node) return NULL;
        if (copies.count(node)) return copies[node];
        Node* copy = new Node(node->val); copies[node] = copy;
        for (Node* neighbor : node->neighbors) copy->neighbors.push_back(cloneGraph(neighbor));
        return copy;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

### Q238) Is Graph Bipartite?
- **Problem:** Check if graph can be colored with 2 colors such that no adjacent nodes share a color.
- **Concept:** DFS Coloring.
- **Optimal Algo:** Use color array initialized to 0. DFS assigning alternating colors (1 and -1). If neighbor has same color, return false.
- **C++ Code:**
```cpp
class Solution {
    bool dfs(int u, int c, vector<vector<int>>& graph, vector<int>& color) {
        if (color[u] != 0) return color[u] == c;
        color[u] = c;
        for (int v : graph[u]) if (!dfs(v, -c, graph, color)) return false;
        return true;
    }
public:
    bool isBipartite(vector<vector<int>>& graph) {
        vector<int> color(graph.size(), 0);
        for (int i = 0; i < graph.size(); i++) {
            if (color[i] == 0 && !dfs(i, 1, graph, color)) return false;
        } return true;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

### Q239) All Nodes Distance K in Binary Tree
- **Problem:** Find all nodes at exactly distance `k` from `target`.
- **Concept:** Graph Conversion + BFS/DFS.
- **Optimal Algo:** Convert tree to undirected graph using a map of parents. Run BFS from `target` outward up to `k` levels.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<TreeNode*, TreeNode*> parent;
    void dfs(TreeNode* root, TreeNode* p) {
        if (!root) return;
        parent[root] = p; dfs(root->left, root); dfs(root->right, root);
    }
public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        dfs(root, NULL); unordered_set<TreeNode*> vis; queue<TreeNode*> q;
        q.push(target); vis.insert(target); int dist = 0; vector<int> res;
        while (!q.empty()) {
            if (dist == k) {
                while (!q.empty()) { res.push_back(q.front()->val); q.pop(); } return res;
            }
            int size = q.size();
            while (size--) {
                TreeNode* curr = q.front(); q.pop();
                if (curr->left && !vis.count(curr->left)) { vis.insert(curr->left); q.push(curr->left); }
                if (curr->right && !vis.count(curr->right)) { vis.insert(curr->right); q.push(curr->right); }
                if (parent[curr] && !vis.count(parent[curr])) { vis.insert(parent[curr]); q.push(parent[curr]); }
            } dist++;
        } return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q240) Employee Importance
- **Problem:** Total importance of an employee and all subordinates.
- **Concept:** DFS with Adjacency Map.
- **Optimal Algo:** Map ID to Employee object. DFS accumulating `importance`.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<int, Employee*> mp;
    int dfs(int id) {
        int sum = mp[id]->importance;
        for (int sub : mp[id]->subordinates) sum += dfs(sub);
        return sum;
    }
public:
    int getImportance(vector<Employee*> employees, int id) {
        for (auto e : employees) mp[e->id] = e;
        return dfs(id);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q241) Surrounded Regions
- **Problem:** Capture regions surrounded by 'X'.
- **Concept:** Border DFS.
- **Optimal Algo:** DFS from all 'O's on the border, marking them as safe ('T'). Turn all remaining 'O's to 'X', then revert 'T's to 'O'.
- **C++ Code:**
```cpp
class Solution {
    void dfs(vector<vector<char>>& board, int i, int j) {
        if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] != 'O') return;
        board[i][j] = 'T';
        dfs(board, i + 1, j); dfs(board, i - 1, j); dfs(board, i, j + 1); dfs(board, i, j - 1);
    }
public:
    void solve(vector<vector<char>>& board) {
        int m = board.size(), n = board[0].size();
        for (int i = 0; i < m; i++) { dfs(board, i, 0); dfs(board, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(board, 0, j); dfs(board, m - 1, j); }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == 'T') board[i][j] = 'O';
            }
        }
    }
};
```
- **Complexity:** T: O(M*N) | S: O(M*N)

### Q242) Pacific Atlantic Water Flow
- **Problem:** Cells that flow to both Pacific and Atlantic.
- **Concept:** Reverse Flow DFS.
- **Optimal Algo:** Start DFS from oceans inward (uphill). Keep two boolean grids. Result is cells marked true in both.
- **C++ Code:**
```cpp
class Solution {
    void dfs(vector<vector<int>>& h, vector<vector<bool>>& vis, int i, int j) {
        vis[i][j] = true;
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        for (auto d : dirs) {
            int x = i + d[0], y = j + d[1];
            if (x >= 0 && x < h.size() && y >= 0 && y < h[0].size() && !vis[x][y] && h[x][y] >= h[i][j])
                dfs(h, vis, x, y);
        }
    }
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& h) {
        int m = h.size(), n = h[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n)), atl(m, vector<bool>(n));
        for (int i = 0; i < m; i++) { dfs(h, pac, i, 0); dfs(h, atl, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(h, pac, 0, j); dfs(h, atl, m - 1, j); }
        vector<vector<int>> res;
        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) if (pac[i][j] && atl[i][j]) res.push_back({i, j});
        return res;
    }
};
```
- **Complexity:** T: O(M*N) | S: O(M*N)

### Q243) Making A Large Island
- **Problem:** Change at most one '0' to '1' to max island size.
- **Concept:** DFS + Component ID.
- **Optimal Algo:** Phase 1: DFS to assign unique ID to each island and calculate size, store in map. Phase 2: For each '0', sum sizes of unique neighboring island IDs + 1. Update max.
- **C++ Code:**
```cpp
class Solution {
    int dfs(vector<vector<int>>& grid, int i, int j, int id) {
        if (i < 0 || i >= grid.size() || j < 0 || j >= grid[0].size() || grid[i][j] != 1) return 0;
        grid[i][j] = id;
        return 1 + dfs(grid, i+1, j, id) + dfs(grid, i-1, j, id) + dfs(grid, i, j+1, id) + dfs(grid, i, j-1, id);
    }
public:
    int largestIsland(vector<vector<int>>& grid) {
        unordered_map<int, int> area; int id = 2, maxArea = 0, n = grid.size();
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (grid[i][j] == 1) {
            area[id] = dfs(grid, i, j, id); maxArea = max(maxArea, area[id++]);
        }
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (grid[i][j] == 0) {
            unordered_set<int> seen; int curArea = 1;
            for (auto d : dirs) {
                int x = i + d[0], y = j + d[1];
                if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] > 1 && !seen.count(grid[x][y])) {
                    curArea += area[grid[x][y]]; seen.insert(grid[x][y]);
                }
            } maxArea = max(maxArea, curArea);
        }
        return maxArea;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N^2)

### BFS

### Q244) Introduction (BFS Template - Clone Graph / Matrix layer sweep)
*(Covered via the upcoming problems explicitly utilizing core BFS logic)*

### Q245) Rotting Oranges
- **Problem:** Time until all oranges rot.
- **Concept:** Multi-Source BFS.
- **Optimal Algo:** Queue all rotten oranges. Count fresh oranges. BFS level by level. Decrement fresh count.
- **C++ Code:**
```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        queue<pair<int, int>> q; int fresh = 0, mins = 0;
        int m = grid.size(), n = grid[0].size();
        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.push({i, j}); else if (grid[i][j] == 1) fresh++;
        }
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        while (!q.empty() && fresh > 0) {
            int size = q.size();
            while (size--) {
                auto [r, c] = q.front(); q.pop();
                for (auto d : dirs) {
                    int x = r + d[0], y = c + d[1];
                    if (x >= 0 && x < m && y >= 0 && y < n && grid[x][y] == 1) {
                        grid[x][y] = 2; fresh--; q.push({x, y});
                    }
                }
            } mins++;
        } return fresh == 0 ? mins : -1;
    }
};
```
- **Complexity:** T: O(M*N) | S: O(M*N)

### Q246) 01 Matrix
- **Problem:** Distance of nearest 0 for each cell.
- **Concept:** Multi-Source BFS.
- **Optimal Algo:** Queue all 0s, set others to infinity. BFS outward to update 1s.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size(); queue<pair<int, int>> q;
        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) {
            if (mat[i][j] == 0) q.push({i, j}); else mat[i][j] = INT_MAX;
        }
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (auto d : dirs) {
                int x = r + d[0], y = c + d[1];
                if (x >= 0 && x < m && y >= 0 && y < n && mat[x][y] > mat[r][c] + 1) {
                    mat[x][y] = mat[r][c] + 1; q.push({x, y});
                }
            }
        } return mat;
    }
};
```
- **Complexity:** T: O(M*N) | S: O(M*N)

### Q247) Open the Lock
- **Problem:** Find min turns to target string without hitting deadends.
- **Concept:** String BFS.
- **Optimal Algo:** Queue "0000". Avoid `deadends` (set). For each position, rotate digit +1 and -1.
- **C++ Code:**
```cpp
class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_set<string> dead(deadends.begin(), deadends.end()), vis;
        if (dead.count("0000")) return -1;
        queue<pair<string, int>> q; q.push({"0000", 0}); vis.insert("0000");
        while (!q.empty()) {
            auto [curr, steps] = q.front(); q.pop();
            if (curr == target) return steps;
            for (int i = 0; i < 4; i++) {
                for (int d : {-1, 1}) {
                    string next = curr; next[i] = (next[i] - '0' + d + 10) % 10 + '0';
                    if (!dead.count(next) && !vis.count(next)) { vis.insert(next); q.push({next, steps + 1}); }
                }
            }
        } return -1;
    }
};
```
- **Complexity:** T: O(10^4) | S: O(10^4)

### Q248) Shortest Path in a Grid with Obstacles Elimination
- **Problem:** Shortest path allowing `k` obstacle eliminations.
- **Concept:** 3D BFS State.
- **Optimal Algo:** Queue `{row, col, k_left, steps}`. Track visited using `vis[r][c] = max_k_remaining`.
- **C++ Code:**
```cpp
class Solution {
public:
    int shortestPath(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> vis(m, vector<int>(n, -1));
        queue<vector<int>> q; q.push({0, 0, k, 0}); vis[0][0] = k;
        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        while (!q.empty()) {
            auto curr = q.front(); q.pop();
            int r = curr[0], c = curr[1], rem = curr[2], steps = curr[3];
            if (r == m - 1 && c == n - 1) return steps;
            for (auto d : dirs) {
                int x = r + d[0], y = c + d[1];
                if (x >= 0 && x < m && y >= 0 && y < n) {
                    int nextRem = rem - grid[x][y];
                    if (nextRem >= 0 && vis[x][y] < nextRem) {
                        vis[x][y] = nextRem; q.push({x, y, nextRem, steps + 1});
                    }
                }
            }
        } return -1;
    }
};
```
- **Complexity:** T: O(M*N*K) | S: O(M*N)

### Q249) Bus Routes
- **Problem:** Min buses to reach `target`.
- **Concept:** Bipartite BFS (Stops to Buses).
- **Optimal Algo:** Map stop to list of bus indices. Queue stops. BFS explores buses (mark bus as visited) and adds all their stops to queue.
- **C++ Code:**
```cpp
class Solution {
public:
    int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {
        if (source == target) return 0;
        unordered_map<int, vector<int>> adj;
        for (int i = 0; i < routes.size(); i++) for (int stop : routes[i]) adj[stop].push_back(i);
        queue<int> q; unordered_set<int> visStops, visBuses;
        q.push(source); visStops.insert(source); int buses = 0;
        while (!q.empty()) {
            int size = q.size();
            while (size--) {
                int curr = q.front(); q.pop();
                if (curr == target) return buses;
                for (int bus : adj[curr]) {
                    if (visBuses.count(bus)) continue;
                    visBuses.insert(bus);
                    for (int stop : routes[bus]) {
                        if (!visStops.count(stop)) { visStops.insert(stop); q.push(stop); }
                    }
                }
            } buses++;
        } return -1;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

### Q250) Word Ladder
- **Problem:** Shortest transformation sequence from `beginWord` to `endWord`.
- **Concept:** BFS String Transformation.
- **Optimal Algo:** Hash set of dict. BFS on word. Change each letter `a-z`, check if valid. Remove from set to prevent cycles.
- **C++ Code:**
```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        queue<string> q; q.push(beginWord); int len = 1;
        while (!q.empty()) {
            int size = q.size();
            while (size--) {
                string w = q.front(); q.pop();
                if (w == endWord) return len;
                for (int i = 0; i < w.size(); i++) {
                    char orig = w[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        w[i] = c;
                        if (dict.count(w)) { dict.erase(w); q.push(w); }
                    } w[i] = orig;
                }
            } len++;
        } return 0;
    }
};
```
- **Complexity:** T: O(M^2 * N) | S: O(M * N)

### Topological Sort

### Q251) Introduction (Course Schedule I)
- **Problem:** Check if all courses can be finished.
- **Concept:** Kahn's Algorithm / Cycle Detection.
- **Optimal Algo:** Calculate in-degrees. Queue nodes with 0 in-degree. BFS, decrements neighbors. If processed == N, true.
- **C++ Code:**
```cpp
class Solution {
public:
    bool canFinish(int n, vector<vector<int>>& pre) {
        vector<vector<int>> adj(n); vector<int> in(n, 0);
        for (auto& p : pre) { adj[p[1]].push_back(p[0]); in[p[0]]++; }
        queue<int> q; int count = 0;
        for (int i = 0; i < n; i++) if (in[i] == 0) q.push(i);
        while (!q.empty()) {
            int u = q.front(); q.pop(); count++;
            for (int v : adj[u]) if (--in[v] == 0) q.push(v);
        } return count == n;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

### Q252) Course Schedule II
- **Problem:** Return ordering of courses.
- **Concept:** Kahn's Algorithm.
- **Optimal Algo:** Same as Q251, but append to `res` array. Return `res` if size == N, else empty.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findOrder(int n, vector<vector<int>>& pre) {
        vector<vector<int>> adj(n); vector<int> in(n, 0), res;
        for (auto& p : pre) { adj[p[1]].push_back(p[0]); in[p[0]]++; }
        queue<int> q;
        for (int i = 0; i < n; i++) if (in[i] == 0) q.push(i);
        while (!q.empty()) {
            int u = q.front(); q.pop(); res.push_back(u);
            for (int v : adj[u]) if (--in[v] == 0) q.push(v);
        } return res.size() == n ? res : vector<int>();
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

### Q253) Find Eventual Safe States
- **Problem:** Return nodes that eventually lead to terminal nodes.
- **Concept:** Topo Sort on Reversed Graph (or DFS Cycle Detection).
- **Optimal Algo (DFS):** Node states: 0=unvisited, 1=visiting, 2=safe. DFS: if 1, cycle! Mark safe if all neighbors are safe.
- **C++ Code:**
```cpp
class Solution {
    bool dfs(int u, vector<vector<int>>& graph, vector<int>& state) {
        if (state[u] > 0) return state[u] == 2;
        state[u] = 1;
        for (int v : graph[u]) if (!dfs(v, graph, state)) return false;
        state[u] = 2; return true;
    }
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size(); vector<int> state(n, 0), res;
        for (int i = 0; i < n; i++) if (dfs(i, graph, state)) res.push_back(i);
        return res;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

### Q254) Minimum Height Trees
- **Problem:** Find roots that give min height tree.
- **Concept:** Topo Sort / Leaf Peeling.
- **Optimal Algo:** Start with leaves (degree == 1). Trim them iteratively. Stop when <= 2 nodes remain.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};
        vector<unordered_set<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].insert(e[1]); adj[e[1]].insert(e[0]); }
        queue<int> q;
        for (int i = 0; i < n; i++) if (adj[i].size() == 1) q.push(i);
        while (n > 2) {
            int size = q.size(); n -= size;
            while (size--) {
                int u = q.front(); q.pop();
                for (int v : adj[u]) { adj[v].erase(u); if (adj[v].size() == 1) q.push(v); }
            }
        }
        vector<int> res; while (!q.empty()) { res.push_back(q.front()); q.pop(); } return res;
    }
};
```
- **Complexity:** T: O(V) | S: O(V)

### Q255) Sort Items by Groups Respecting Dependencies
- **Problem:** Sort items honoring item constraints AND group constraints.
- **Concept:** Double Topological Sort.
- **Optimal Algo:** Assign independent items a unique group. Build two graphs: Group-Level and Item-Level. Topo sort Groups. Topo sort Items. Weave items based on Group order. *(Code is long, abstract logic summarized)*
- **C++ Code:** *(Condensed snippet logic)*
```cpp
// Logic:
// 1. Assign isolated items unique group IDs.
// 2. Map itemInDegree, groupInDegree, itemAdj, groupAdj.
// 3. Populate above from 'beforeItems'.
// 4. itemOrder = topSort(items), groupOrder = topSort(groups).
// 5. Group items to map: groupID -> vector of sorted items.
// 6. Concatenate vectors based on groupOrder.
```
- **Complexity:** T: O(V + E) | S: O(V + E)

### Union Find

### Q256) Introduction (Find if Path Exists - DSU approach)
- **Concept:** Disjoint Set Union (DSU) basics.
- **Optimal Algo:** Array `parent`. `find()` with path compression. `union()` with rank.

### Q257) Number of Provinces
- **Problem:** Count disconnected components.
- **Concept:** Union Find.
- **Optimal Algo:** Union all connected nodes. Count unique parents.
- **C++ Code:**
```cpp
class Solution {
    vector<int> parent;
    int find(int i) { return parent[i] == i ? i : parent[i] = find(parent[i]); }
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size(), count = n; parent.resize(n);
        iota(parent.begin(), parent.end(), 0);
        for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) {
            if (isConnected[i][j]) {
                int p1 = find(i), p2 = find(j);
                if (p1 != p2) { parent[p1] = p2; count--; }
            }
        } return count;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

### Q258) Redundant Connection
- **Problem:** Find the edge that forms a cycle.
- **Concept:** DSU.
- **Optimal Algo:** Add edges to DSU. If `find(u) == find(v)`, this edge forms the cycle. Return it.
- **C++ Code:**
```cpp
class Solution {
    vector<int> parent;
    int find(int i) { return parent[i] == i ? i : parent[i] = find(parent[i]); }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        parent.resize(edges.size() + 1); iota(parent.begin(), parent.end(), 0);
        for (auto& e : edges) {
            int pu = find(e[0]), pv = find(e[1]);
            if (pu == pv) return e; parent[pu] = pv;
        } return {};
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

### Q259) Accounts Merge
- **Problem:** Merge overlapping emails.
- **Concept:** DSU on Emails.
- **Optimal Algo:** Map email to ID. Union emails belonging to same account. Group emails by parent ID. Sort and append name.
- **C++ Code:**
```cpp
class Solution {
    vector<int> parent;
    int find(int i) { return parent[i] == i ? i : parent[i] = find(parent[i]); }
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size(); parent.resize(n); iota(parent.begin(), parent.end(), 0);
        unordered_map<string, int> emailMap;
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                if (emailMap.count(accounts[i][j])) parent[find(i)] = find(emailMap[accounts[i][j]]);
                else emailMap[accounts[i][j]] = i;
            }
        }
        unordered_map<int, vector<string>> resMap;
        for (auto& pair : emailMap) resMap[find(pair.second)].push_back(pair.first);
        vector<vector<string>> res;
        for (auto& pair : resMap) {
            sort(pair.second.begin(), pair.second.end());
            vector<string> tmp = {accounts[pair.first][0]};
            tmp.insert(tmp.end(), pair.second.begin(), pair.second.end());
            res.push_back(tmp);
        } return res;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

### Q260) Minimize Malware Spread
- **Problem:** Remove 1 node from `initial` to minimize infected.
- **Concept:** DSU sizes.
- **Optimal Algo:** DSU to find sizes of components. Count how many `initial` nodes are in each component. If exactly 1, removing it saves the whole component. Maximize saved nodes. Tie break by min ID.
- **C++ Code:**
```cpp
class Solution {
    vector<int> p, sz;
    int find(int i) { return p[i] == i ? i : p[i] = find(p[i]); }
    void unite(int i, int j) {
        int r1 = find(i), r2 = find(j);
        if (r1 != r2) { p[r1] = r2; sz[r2] += sz[r1]; }
    }
public:
    int minMalwareSpread(vector<vector<int>>& graph, vector<int>& init) {
        int n = graph.size(); p.resize(n); sz.assign(n, 1);
        iota(p.begin(), p.end(), 0);
        for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) if (graph[i][j]) unite(i, j);
        vector<int> initCount(n, 0); for (int i : init) initCount[find(i)]++;
        sort(init.begin(), init.end()); int ans = init[0], maxSaved = 0;
        for (int i : init) {
            int root = find(i);
            if (initCount[root] == 1 && sz[root] > maxSaved) { maxSaved = sz[root]; ans = i; }
        } return ans;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

### Q261) Min Cost to Connect All Points
- **Problem:** Connect all points minimum cost (MST).
- **Concept:** Kruskal's / Prim's Algorithm.
- **Optimal Algo (Prim's):** Min-heap tracking `cost, node`. Start at 0, add to MST, push neighbors, pop cheapest.
- **C++ Code:**
```cpp
class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size(), cost = 0, connected = 0;
        vector<bool> inMST(n, false);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        pq.push({0, 0});
        while (connected < n) {
            auto [w, u] = pq.top(); pq.pop();
            if (inMST[u]) continue;
            inMST[u] = true; cost += w; connected++;
            for (int v = 0; v < n; v++) {
                if (!inMST[v]) pq.push({abs(points[u][0]-points[v][0]) + abs(points[u][1]-points[v][1]), v});
            }
        } return cost;
    }
};
```
- **Complexity:** T: O(V^2 log V) | S: O(V^2)

### Shortest Path

### Q262) Introduction (Dijkstra's Algo Basics)
*(Included in Q263 Network Delay Time).*

### Q263) Network Delay Time
- **Problem:** Time for signal to reach all nodes.
- **Concept:** Dijkstra's Algorithm.
- **Optimal Algo:** Min-heap `{dist, node}`. Run Dijkstra. Max value in distances array is answer. If any unreachable, return -1.
- **C++ Code:**
```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
        vector<int> dist(n + 1, INT_MAX); dist[k] = 0;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        pq.push({0, k});
        while (!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;
            for (auto& edge : adj[u]) {
                int v = edge.first, w = edge.second;
                if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.push({dist[v], v}); }
            }
        }
        int ans = 0; for (int i = 1; i <= n; i++) ans = max(ans, dist[i]);
        return ans == INT_MAX ? -1 : ans;
    }
};
```
- **Complexity:** T: O(E log V) | S: O(V + E)

### Q264) Cheapest Flights Within K Stops
- **Problem:** Shortest path with <= K edges (stops).
- **Concept:** Bellman-Ford / BFS.
- **Optimal Algo:** Level-order BFS / iterative array update for `k+1` steps.
- **C++ Code:**
```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX); dist[src] = 0;
        for (int i = 0; i <= k; i++) {
            vector<int> temp = dist;
            for (auto& f : flights) {
                if (dist[f[0]] != INT_MAX) temp[f[1]] = min(temp[f[1]], dist[f[0]] + f[2]);
            } dist = temp;
        } return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};
```
- **Complexity:** T: O(K * E) | S: O(V)

### Q265) Path with Maximum Probability
- **Problem:** Path maximizing product of probabilities.
- **Concept:** Dijkstra (Max-Heap).
- **Optimal Algo:** Max-Heap of `{prob, node}`. Initial prob = 1.0. Relax edges with multiplication.
- **C++ Code:**
```cpp
class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start, int end) {
        vector<vector<pair<int, double>>> adj(n);
        for (int i = 0; i < edges.size(); i++) {
            adj[edges[i][0]].push_back({edges[i][1], succProb[i]});
            adj[edges[i][1]].push_back({edges[i][0], succProb[i]});
        }
        vector<double> probs(n, 0.0); probs[start] = 1.0;
        priority_queue<pair<double, int>> pq; pq.push({1.0, start});
        while (!pq.empty()) {
            auto [p, u] = pq.top(); pq.pop();
            if (u == end) return p;
            if (p < probs[u]) continue;
            for (auto& edge : adj[u]) {
                int v = edge.first; double w = edge.second;
                if (probs[u] * w > probs[v]) { probs[v] = probs[u] * w; pq.push({probs[v], v}); }
            }
        } return 0.0;
    }
};
```
- **Complexity:** T: O(E log V) | S: O(V + E)

### Q266) Path With Minimum Effort
- **Problem:** Path from top-left to bottom-right minimizing max absolute difference in heights along path.
- **Concept:** Dijkstra (Modified relaxation).
- **Optimal Algo:** Min-Heap `{effort, r, c}`. Effort to neighbor is `max(current_effort, abs(h1 - h2))`.
- **C++ Code:**
```cpp
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& h) {
        int m = h.size(), n = h[0].size();
        vector<vector<int>> eff(m, vector<int>(n, INT_MAX)); eff[0][0] = 0;
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        pq.push({0, 0, 0}); int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        while (!pq.empty()) {
            auto curr = pq.top(); pq.pop();
            int e = curr[0], r = curr[1], c = curr[2];
            if (r == m - 1 && c == n - 1) return e;
            if (e > eff[r][c]) continue;
            for (auto d : dirs) {
                int x = r + d[0], y = c + d[1];
                if (x >= 0 && x < m && y >= 0 && y < n) {
                    int nextE = max(e, abs(h[r][c] - h[x][y]));
                    if (nextE < eff[x][y]) { eff[x][y] = nextE; pq.push({nextE, x, y}); }
                }
            }
        } return 0;
    }
};
```
- **Complexity:** T: O(MN log MN) | S: O(MN)

### Q267) Swim in Rising Water
- **Problem:** Same as Minimum Effort path, but constraint is `max(current_max, grid[x][y])`.
- **Optimal Algo:** Dijkstra. Exactly identical implementation to Q266, replacing absolute diff with `max(current_effort, grid[x][y])`.
- **C++ Code:**
```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size(); vector<vector<int>> eff(n, vector<int>(n, INT_MAX));
        eff[0][0] = grid[0][0]; priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        pq.push({grid[0][0], 0, 0}); int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        while (!pq.empty()) {
            auto curr = pq.top(); pq.pop();
            int e = curr[0], r = curr[1], c = curr[2];
            if (r == n - 1 && c == n - 1) return e;
            for (auto d : dirs) {
                int x = r + d[0], y = c + d[1];
                if (x >= 0 && x < n && y >= 0 && y < n) {
                    int nextE = max(e, grid[x][y]);
                    if (nextE < eff[x][y]) { eff[x][y] = nextE; pq.push({nextE, x, y}); }
                }
            }
        } return 0;
    }
};
```
- **Complexity:** T: O(N^2 log N) | S: O(N^2)

### Eulerian

### Q268) Reconstruct Itinerary
- **Problem:** Traverse all flight tickets using Eulerian Path.
- **Concept:** Hierholzer's Algorithm.
- **Optimal Algo:** Adjacency List `map<string, multiset<string>>`. DFS, append to path *after* visiting all descendants. Reverse the path at the end.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<string, multiset<string>> adj; vector<string> res;
    void dfs(string u) {
        while (adj[u].size()) {
            string v = *adj[u].begin(); adj[u].erase(adj[u].begin()); dfs(v);
        } res.push_back(u);
    }
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (auto& t : tickets) adj[t[0]].insert(t[1]);
        dfs("JFK"); reverse(res.begin(), res.end()); return res;
    }
};
```
- **Complexity:** T: O(E log E) | S: O(V + E)

### Q269) Cracking the Safe
- **Problem:** Shortest string containing all passwords of length `n` with `k` digits.
- **Concept:** De Bruijn Sequence / Eulerian Path.
- **Optimal Algo:** Post-order DFS. Traverse all outgoing edges `0..k-1`. Append edge to answer.
- **C++ Code:**
```cpp
class Solution {
    unordered_set<string> vis; string res;
    void dfs(string node, int k) {
        for (int i = 0; i < k; i++) {
            string next = node + to_string(i);
            if (!vis.count(next)) {
                vis.insert(next); dfs(next.substr(1), k); res += to_string(i);
            }
        }
    }
public:
    string crackSafe(int n, int k) {
        string start(n - 1, '0'); dfs(start, k); return res + start;
    }
};
```
- **Complexity:** T: O(K^N) | S: O(K^N)

---

## 🧩 Dynamic Programming — **47 Questions**

### 1-D DP

### Q270) Climbing Stairs
- **Problem:** Find the number of distinct ways to climb `n` stairs if you can take 1 or 2 steps at a time.
- **Concept / Optimal Algo:** The problem breaks down into the Fibonacci sequence. The number of ways to reach step `i` is the sum of ways to reach `i-1` and `i-2`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    int solve(int i, vector<int>& memo) {
        if (i <= 2) return i;
        if (memo[i] != -1) return memo[i];
        return memo[i] = solve(i - 1, memo) + solve(i - 2, memo);
    }
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        vector<int> memo(n + 1, -1);
        return solve(n, memo);
    }
};
```

**Tabulation (Bottom-Up / Space Optimized):**
```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1;
        int prev1 = 2;
        
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};
```
- **Complexity:** T: O(N) | S: O(N) for Memoization, O(1) for Tabulation.

---

### Q271) Min Cost Climbing Stairs
- **Problem:** Find the minimum cost to reach the top of the floor. You can start from index 0 or 1.
- **Concept / Optimal Algo:** At each step `i`, the minimum cost to reach it is the cost of the current step plus the minimum of the cost to reach `i-1` or `i-2`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    int solve(vector<int>& cost, int i, vector<int>& memo) {
        if (i < 0) return 0;
        if (i == 0 || i == 1) return cost[i];
        if (memo[i] != -1) return memo[i];
        
        return memo[i] = cost[i] + min(solve(cost, i - 1, memo), solve(cost, i - 2, memo));
    }
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        vector<int> memo(n, -1);
        return min(solve(cost, n - 1, memo), solve(cost, n - 2, memo));
    }
};
```

**Tabulation (Bottom-Up / Space Optimized):**
```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int prev2 = cost[0];
        int prev1 = cost[1];
        
        for (int i = 2; i < cost.size(); i++) {
            int curr = cost[i] + min(prev1, prev2);
            prev2 = prev1;
            prev1 = curr;
        }
        return min(prev1, prev2);
    }
};
```
- **Complexity:** T: O(N) | S: O(N) for Memoization, O(1) for Tabulation.

---

### Q272) House Robber
- **Problem:** Maximize the amount of money you can rob without robbing adjacent houses.
- **Concept / Optimal Algo:** Decide whether to rob the current house `i` (add to `i-2`) or skip it (take max from `i-1`).
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    int solve(vector<int>& nums, int i, vector<int>& memo) {
        if (i < 0) return 0;
        if (memo[i] != -1) return memo[i];
        
        int rob = nums[i] + solve(nums, i - 2, memo);
        int skip = solve(nums, i - 1, memo);
        
        return memo[i] = max(rob, skip);
    }
public:
    int rob(vector<int>& nums) {
        vector<int> memo(nums.size(), -1);
        return solve(nums, nums.size() - 1, memo);
    }
};
```

**Tabulation (Bottom-Up / Space Optimized):**
```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int prev2 = 0; // i-2
        int prev1 = 0; // i-1
        
        for (int x : nums) {
            int curr = max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) for Tabulation.

---

### Q273) House Robber II
- **Problem:** Maximize the amount of money robbed where houses are arranged in a circle (first and last are adjacent).
- **Concept / Optimal Algo:** Since the first and last are adjacent, you can either rob from `0` to `N-2` or from `1` to `N-1`. Take the maximum of these two scenarios using the standard House Robber logic.
- **C++ Code:**

**Tabulation (Space Optimized for both ranges):**
```cpp
class Solution {
    int robRange(vector<int>& nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        for (int i = start; i <= end; i++) {
            int curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        return max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q274) Partition Equal Subset Sum (Knapsack)
- **Problem:** Determine if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.
- **Concept / Optimal Algo:** This is a 0/1 Knapsack problem. Find if there exists a subset that sums up to `Total Sum / 2`. If the total sum is odd, it's impossible.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    bool solve(vector<int>& nums, int i, int target, vector<vector<int>>& memo) {
        if (target == 0) return true;
        if (i == 0) return nums[0] == target;
        if (memo[i][target] != -1) return memo[i][target];
        
        bool notTake = solve(nums, i - 1, target, memo);
        bool take = false;
        if (target >= nums[i]) {
            take = solve(nums, i - 1, target - nums[i], memo);
        }
        
        return memo[i][target] = take || notTake;
    }
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) sum += num;
        
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        vector<vector<int>> memo(nums.size(), vector<int>(target + 1, -1));
        return solve(nums, nums.size() - 1, target, memo);
    }
};
```

**Tabulation (Bottom-Up / Space Optimized):**
```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int x : nums) {
            for (int j = target; j >= x; j--) {
                dp[j] = dp[j] || dp[j - x];
            }
        }
        return dp[target];
    }
};
```
- **Complexity:** T: O(N * Target) | S: O(Target) for Tabulation.

---

### Q275) Target Sum
- **Problem:** Assign `+` or `-` to elements to sum to a target. Return the number of ways.
- **Concept / Optimal Algo:** Math + DP. Let `S1` be positive elements, `S2` be negative. `S1 - S2 = target`, `S1 + S2 = totalSum`. So, `S1 = (target + totalSum) / 2`. The problem reduces to finding subset sums equal to `S1`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    int solve(vector<int>& nums, int i, int target, vector<vector<int>>& memo) {
        if (i < 0) return target == 0 ? 1 : 0;
        if (memo[i][target] != -1) return memo[i][target];
        
        int notTake = solve(nums, i - 1, target, memo);
        int take = 0;
        if (target >= nums[i]) {
            take = solve(nums, i - 1, target - nums[i], memo);
        }
        
        return memo[i][target] = take + notTake;
    }
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum < abs(target) || (sum + target) % 2 != 0) return 0;
        
        int s = (sum + target) / 2;
        vector<vector<int>> memo(nums.size(), vector<int>(s + 1, -1));
        return solve(nums, nums.size() - 1, s, memo);
    }
};
```

**Tabulation (Bottom-Up / Space Optimized):**
```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum < abs(target) || (sum + target) % 2 != 0) return 0;
        
        int s = (sum + target) / 2;
        vector<int> dp(s + 1, 0);
        dp[0] = 1;
        
        for (int x : nums) {
            for (int j = s; j >= x; j--) {
                dp[j] += dp[j - x];
            }
        }
        return dp[s];
    }
};
```
- **Complexity:** T: O(N * S) | S: O(S)

---

### Q276) Last Stone Weight II
- **Problem:** Smash stones together, return the minimum remaining weight.
- **Concept / Optimal Algo:** Partition the stones into two subsets whose sum is as close as possible. Target = `sum / 2`. Find the max possible subset sum `maxS <= target`. Answer is `sum - 2 * maxS`.
- **C++ Code:**

**Tabulation (Bottom-Up 1D Array):**
```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int sum = accumulate(stones.begin(), stones.end(), 0);
        int target = sum / 2;
        
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        int maxS = 0;
        
        for (int x : stones) {
            for (int j = target; j >= x; j--) {
                if (dp[j - x]) {
                    dp[j] = true;
                    maxS = max(maxS, j);
                }
            }
        }
        return sum - 2 * maxS;
    }
};
```
- **Complexity:** T: O(N * Target) | S: O(Target)

---

### Q277) Coin Change
- **Problem:** Find the minimum number of coins needed to make a given amount.
- **Concept / Optimal Algo:** Unbounded Knapsack. `dp[i] = min(dp[i], dp[i - coin] + 1)`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    int solve(vector<int>& coins, int amount, vector<int>& memo) {
        if (amount == 0) return 0;
        if (amount < 0) return 1e9;
        if (memo[amount] != -1) return memo[amount];
        
        int minCoins = 1e9;
        for (int coin : coins) {
            int res = solve(coins, amount - coin, memo);
            if (res != 1e9) minCoins = min(minCoins, res + 1);
        }
        return memo[amount] = minCoins;
    }
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> memo(amount + 1, -1);
        int ans = solve(coins, amount, memo);
        return ans >= 1e9 ? -1 : ans;
    }
};
```

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        
        for (int c : coins) {
            for (int j = c; j <= amount; j++) {
                dp[j] = min(dp[j], dp[j - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```
- **Complexity:** T: O(N * Amount) | S: O(Amount)

---

### Q278) Coin Change II
- **Problem:** Find the number of combinations that make up an amount.
- **Concept / Optimal Algo:** Unbounded Knapsack. `dp[i] += dp[i - coin]`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    int solve(int i, int amount, vector<int>& coins, vector<vector<int>>& memo) {
        if (amount == 0) return 1;
        if (i < 0 || amount < 0) return 0;
        if (memo[i][amount] != -1) return memo[i][amount];
        
        int notTake = solve(i - 1, amount, coins, memo);
        int take = 0;
        if (coins[i] <= amount) {
            take = solve(i, amount - coins[i], coins, memo);
        }
        
        return memo[i][amount] = take + notTake;
    }
public:
    int change(int amount, vector<int>& coins) {
        vector<vector<int>> memo(coins.size(), vector<int>(amount + 1, -1));
        return solve(coins.size() - 1, amount, coins, memo);
    }
};
```

**Tabulation (Bottom-Up 1D Array):**
```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        
        for (int c : coins) {
            for (int j = c; j <= amount; j++) {
                dp[j] += dp[j - c];
            }
        }
        return dp[amount];
    }
};
```
- **Complexity:** T: O(N * Amount) | S: O(Amount)

---

### Q279) Perfect Squares
- **Problem:** Return the minimum number of perfect square numbers that sum to `N`.
- **Concept / Optimal Algo:** Unbounded knapsack variation where "coins" are perfect squares `<= N`.
- **C++ Code:**

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1, n + 1);
        dp[0] = 0;
        
        for (int i = 1; i * i <= n; i++) {
            int sq = i * i;
            for (int j = sq; j <= n; j++) {
                dp[j] = min(dp[j], dp[j - sq] + 1);
            }
        }
        return dp[n];
    }
};
```
- **Complexity:** T: O(N * sqrt(N)) | S: O(N)

---

### LIS (Longest Increasing Subsequence)

### Q280) Longest Increasing Subsequence
- **Problem:** Find the length of the longest strictly increasing subsequence.
- **Concept / Optimal Algo:** 
    - DP approach: `dp[i] = 1 + max(dp[j])` for `j < i` and `nums[j] < nums[i]`.
    - Binary Search approach (Optimal): Maintain an array `res`. If `x > res.back()`, append it. Otherwise, use `lower_bound` to replace the first element `>= x`.
- **C++ Code:**

**DP Tabulation:**
```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        int max_len = 1;
        
        for(int i = 0; i < n; i++){
            for(int j = 0; j < i; j++){
                if(nums[i] > nums[j]){
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            max_len = max(max_len, dp[i]);
        }
        return max_len;
    }
};
```

**Binary Search (Optimal):**
```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> res;
        for (int x : nums) {
            auto it = lower_bound(res.begin(), res.end(), x);
            if (it == res.end()) {
                res.push_back(x);
            } else {
                *it = x;
            }
        }
        return res.size();
    }
};
```
- **Complexity:** T: O(N log N) (Optimal) | S: O(N)

---

### Q281) Number of Longest Increasing Subsequence
- **Problem:** Return the number of longest increasing subsequences.
- **Concept / Optimal Algo:** Two DP arrays. `len[i]` stores LIS ending at `i`. `count[i]` stores the number of ways to form LIS ending at `i`.
- **C++ Code:**

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        
        vector<int> len(n, 1);
        vector<int> count(n, 1);
        int maxL = 1;
        int res = 0;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    if (len[j] + 1 > len[i]) {
                        len[i] = len[j] + 1;
                        count[i] = count[j]; // Reset count
                    } else if (len[j] + 1 == len[i]) {
                        count[i] += count[j]; // Accumulate count
                    }
                }
            }
            maxL = max(maxL, len[i]);
        }
        
        for (int i = 0; i < n; i++) {
            if (len[i] == maxL) {
                res += count[i];
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

---

### Q282) Russian Doll Envelopes
- **Problem:** Maximum number of envelopes you can Russian doll (fit inside one another).
- **Concept / Optimal Algo:** 2D LIS. Sort by width ASC, height DESC. Running 1D LIS on heights ensures we don't pick two envelopes with the same width (since height is DESC, the second one will be smaller/equal and skipped by LIS).
- **C++ Code:**

**Optimal (Sorting + Binary Search LIS):**
```cpp
class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& e) {
        sort(e.begin(), e.end(), [](const vector<int>& a, const vector<int>& b) {
            if (a[0] == b[0]) return a[1] > b[1];
            return a[0] < b[0];
        });
        
        vector<int> dp;
        for (auto& env : e) {
            auto it = lower_bound(dp.begin(), dp.end(), env[1]);
            if (it == dp.end()) {
                dp.push_back(env[1]);
            } else {
                *it = env[1];
            }
        }
        return dp.size();
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### 2-D Grid DP

### Q283) Unique Paths II
- **Problem:** Find unique paths from top-left to bottom-right avoiding obstacles (represented by 1).
- **Concept / Optimal Algo:** `dp[i][j]` = `dp[i-1][j] + dp[i][j-1]`. If obstacle, `dp[i][j] = 0`. Space optimized to 1D array.
- **C++ Code:**

**Tabulation (Space Optimized 1D Array):**
```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& og) {
        if (og[0][0] == 1) return 0;
        
        int m = og.size();
        int n = og[0].size();
        vector<int> dp(n, 0);
        dp[0] = 1; // Start position
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (og[i][j] == 1) {
                    dp[j] = 0;
                } else if (j > 0) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[n - 1];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(N)

---

### Q284) Minimum Path Sum
- **Problem:** Find a path from top left to bottom right which minimizes the sum of all numbers along its path.
- **Concept / Optimal Algo:** `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`. Can modify the grid in-place to save space.
- **C++ Code:**

**Tabulation (In-place Grid Modification):**
```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j > 0) {
                    grid[i][j] += grid[i][j - 1];
                } else if (j == 0 && i > 0) {
                    grid[i][j] += grid[i - 1][j];
                } else if (i > 0 && j > 0) {
                    grid[i][j] += min(grid[i - 1][j], grid[i][j - 1]);
                }
            }
        }
        return grid[m - 1][n - 1];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(1)

---

### Q285) Triangle
- **Problem:** Find the minimum path sum from top to bottom of a triangle array.
- **Concept / Optimal Algo:** Work bottom-up. Modify the row below directly into the current row. `triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1])`.
- **C++ Code:**

**Tabulation (Bottom-Up In-place):**
```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        
        // Start from the second to last row and move upwards
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j < triangle[i].size(); j++) {
                triangle[i][j] += min(triangle[i + 1][j], triangle[i + 1][j + 1]);
            }
        }
        return triangle[0][0];
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1)

---

### Q286) Count Square Submatrices with All Ones
- **Problem:** Count how many square submatrices have all ones.
- **Concept / Optimal Algo:** `dp[i][j] = min(up, left, diag_up_left) + 1`. The value at `dp[i][j]` is exactly the number of squares ending at `(i,j)`. Sum them all up.
- **C++ Code:**

**Tabulation (In-place Matrix):**
```cpp
class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int count = 0;
        int m = matrix.size();
        int n = matrix[0].size();
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1 && i > 0 && j > 0) {
                    matrix[i][j] = min({matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]}) + 1;
                }
                count += matrix[i][j];
            }
        }
        return count;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(1)

---

### Q287) Maximum Profit in Job Scheduling
- **Problem:** Find max profit scheduling non-overlapping jobs `(startTime, endTime, profit)`.
- **Concept / Optimal Algo:** Sort jobs by `endTime`. DP map stores `{endTime -> maxProfit}`. For each job, binary search the latest job ending before its start time, add current profit. If it's greater than the max profit seen so far, record it.
- **C++ Code:**

**Tabulation + Binary Search (Optimal):**
```cpp
class Solution {
public:
    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
        int n = startTime.size();
        vector<vector<int>> jobs;
        
        for (int i = 0; i < n; i++) {
            jobs.push_back({endTime[i], startTime[i], profit[i]});
        }
        // Sort by end time
        sort(jobs.begin(), jobs.end());
        
        map<int, int> dp;
        dp[0] = 0; // Base case
        
        for (auto& job : jobs) {
            int e = job[0], s = job[1], p = job[2];
            // Find max profit up to start time
            auto it = prev(dp.upper_bound(s));
            int currProfit = it->second + p;
            
            // If we found a strictly better profit, add it
            if (currProfit > dp.rbegin()->second) {
                dp[e] = currProfit;
            }
        }
        return dp.rbegin()->second;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q288) Burst Balloons
- **Problem:** Maximize coins by bursting balloons. `coins = nums[left] * nums[i] * nums[right]`.
- **Concept / Optimal Algo:** Interval DP. Instead of picking which balloon to burst first, pick which balloon to burst **LAST** in the range `[l, r]`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    int solve(int l, int r, vector<int>& nums, vector<vector<int>>& memo) {
        if (l > r) return 0;
        if (memo[l][r] != -1) return memo[l][r];
        
        int maxCoins = 0;
        for (int i = l; i <= r; i++) {
            int coins = nums[l - 1] * nums[i] * nums[r + 1] 
                      + solve(l, i - 1, nums, memo) 
                      + solve(i + 1, r, nums, memo);
            maxCoins = max(maxCoins, coins);
        }
        return memo[l][r] = maxCoins;
    }
public:
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        vector<vector<int>> memo(nums.size(), vector<int>(nums.size(), -1));
        return solve(1, nums.size() - 2, nums, memo);
    }
};
```

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        int n = nums.size();
        
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        for (int len = 2; len < n; len++) {
            for (int l = 0; l < n - len; l++) {
                int r = l + len;
                for (int i = l + 1; i < r; i++) {
                    dp[l][r] = max(dp[l][r], 
                                   nums[l] * nums[i] * nums[r] + dp[l][i] + dp[i][r]);
                }
            }
        }
        return dp[0][n - 1];
    }
};
```
- **Complexity:** T: O(N^3) | S: O(N^2)

---

### Q289) Longest Increasing Path in a Matrix
- **Problem:** Find the length of the longest increasing path in a matrix.
- **Concept / Optimal Algo:** DFS + Memoization is the most natural way. Compute the max increasing path starting from every cell.
- **C++ Code:**

**Memoization (DFS Top-Down):**
```cpp
class Solution {
    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    
    int dfs(vector<vector<int>>& matrix, vector<vector<int>>& dp, int i, int j) {
        if (dp[i][j] != 0) return dp[i][j];
        
        int maxL = 1;
        for (auto& d : dirs) {
            int x = i + d[0];
            int y = j + d[1];
            
            if (x >= 0 && x < matrix.size() && y >= 0 && y < matrix[0].size() 
                && matrix[x][y] > matrix[i][j]) {
                maxL = max(maxL, 1 + dfs(matrix, dp, x, y));
            }
        }
        return dp[i][j] = maxL;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        
        int maxPath = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxPath = max(maxPath, dfs(matrix, dp, i, j));
            }
        }
        return maxPath;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### String DP

### Q290) Longest Common Subsequence
- **Problem:** Length of the longest common subsequence of two strings.
- **Concept / Optimal Algo:** If `s1[i-1] == s2[j-1]`, then `dp[i][j] = 1 + dp[i-1][j-1]`. Else, take the `max(dp[i-1][j], dp[i][j-1])`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    int solve(string& t1, string& t2, int i, int j, vector<vector<int>>& memo) {
        if (i == 0 || j == 0) return 0;
        if (memo[i][j] != -1) return memo[i][j];
        
        if (t1[i - 1] == t2[j - 1]) {
            return memo[i][j] = 1 + solve(t1, t2, i - 1, j - 1, memo);
        }
        return memo[i][j] = max(solve(t1, t2, i - 1, j, memo), 
                                solve(t1, t2, i, j - 1, memo));
    }
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> memo(m + 1, vector<int>(n + 1, -1));
        return solve(text1, text2, m, n, memo);
    }
};
```

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    int longestCommonSubsequence(string t1, string t2) {
        int m = t1.size(), n = t2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (t1[i - 1] == t2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q291) Edit Distance
- **Problem:** Minimum operations (insert, delete, replace) to convert word1 to word2.
- **Concept / Optimal Algo:** `dp[i][j] = 1 + min(insert, delete, replace)`. Base cases fill out rows/cols where strings are empty.
- **C++ Code:**

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    int minDistance(string w1, string w2) {
        int m = w1.size(), n = w2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else if (w1[i - 1] == w2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({dp[i - 1][j],    // Delete
                                        dp[i][j - 1],    // Insert
                                        dp[i - 1][j - 1] // Replace
                                       });
                }
            }
        }
        return dp[m][n];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q292) Decode Ways
- **Problem:** Count ways to decode a string of digits (A=1, B=2 ... Z=26).
- **Concept / Optimal Algo:** Fibonacci-like. Check if single digit (1-9) is valid, then check if double digit (10-26) is valid. Add valid paths.
- **C++ Code:**

**Tabulation (Space Optimized):**
```cpp
class Solution {
public:
    int numDecodings(string s) {
        if (s.empty() || s[0] == '0') return 0;
        
        int n = s.size();
        int dp2 = 1; // i-2
        int dp1 = 1; // i-1
        
        for (int i = 1; i < n; i++) {
            int curr = 0;
            // 1-digit decode
            if (s[i] != '0') {
                curr += dp1;
            }
            // 2-digit decode
            int twoDigit = stoi(s.substr(i - 1, 2));
            if (twoDigit >= 10 && twoDigit <= 26) {
                curr += dp2;
            }
            
            dp2 = dp1;
            dp1 = curr;
        }
        return dp1;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q293) Word Break
- **Problem:** Check if a string can be segmented into words from a dictionary.
- **Concept / Optimal Algo:** `dp[i]` is true if a substring ending at `i` is valid and the prefix `dp[j]` before it is also valid.
- **C++ Code:**

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.length();
        vector<bool> dp(n + 1, false);
        dp[0] = true; // Base case: empty string
        
        for (int i = 1; i <= n; i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (dp[j] && dict.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break; // Stop looking once we found a valid split
                }
            }
        }
        return dp.back();
    }
};
```
- **Complexity:** T: O(N^3) (due to substring check) | S: O(N)

---

### Q294) Maximum Number of Points with Cost (Missed 2D DP)
- **Problem:** Pick one cell per row. Maximize sum, but subtract distance penalty `abs(c1 - c2)`.
- **Concept / Optimal Algo:** A pure DP `O(M * N^2)` will TLE. Use Left-to-Right and Right-to-Left pass DP. The max valid from the left is `max(left[c-1] - 1, prev_dp[c])`. Same for right. Current is `max(left, right) + points[r][c]`.
- **C++ Code:**

**Tabulation (Optimal Left/Right Sweep):**
```cpp
class Solution {
public:
    long long maxPoints(vector<vector<int>>& P) {
        long long m = P.size();
        long long n = P[0].size();
        vector<long long> dp(n);
        
        for (int i = 0; i < n; i++) dp[i] = P[0][i];
        
        for (int r = 1; r < m; r++) {
            vector<long long> left(n), right(n), curr(n);
            
            // Left to right sweep
            left[0] = dp[0];
            for (int c = 1; c < n; c++) {
                left[c] = max(left[c - 1] - 1, dp[c]);
            }
            
            // Right to left sweep
            right[n - 1] = dp[n - 1];
            for (int c = n - 2; c >= 0; c--) {
                right[c] = max(right[c + 1] - 1, dp[c]);
            }
            
            // Current row evaluation
            for (int c = 0; c < n; c++) {
                curr[c] = P[r][c] + max(left[c], right[c]);
            }
            dp = curr;
        }
        
        return *max_element(dp.begin(), dp.end());
    }
};
```
- **Complexity:** T: O(M * N) | S: O(N)

---

### Q295) Cherry Pickup (Missed 2D DP)
- **Problem:** Collect max cherries going (0,0) to (n-1,n-1) and returning back.
- **Concept / Optimal Algo:** Instead of going down then up, simulate TWO people going DOWN simultaneously. States: `(r1, c1, r2, c2)`. Since they move at the same speed, `r1 + c1 = r2 + c2`, reducing it to a 3D DP `(r1, c1, c2)`.
- **C++ Code:**

**Memoization (Top-Down 3D DP):**
```cpp
class Solution {
    int dp[50][50][50];
    
    int solve(vector<vector<int>>& grid, int n, int r1, int c1, int c2) {
        int r2 = r1 + c1 - c2; 
        
        // Out of bounds or obstacle hit
        if (r1 >= n || r2 >= n || c1 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1) {
            return -1e9;
        }
        
        // Both reached destination
        if (r1 == n - 1 && c1 == n - 1) return grid[r1][c1]; 
        
        if (dp[r1][c1][c2] != -1) return dp[r1][c1][c2];
        
        // Cherries collected at current step
        int ans = grid[r1][c1] + (c1 != c2 ? grid[r2][c2] : 0);
        
        // 4 Possible Moves combinations (Down-Down, Down-Right, Right-Down, Right-Right)
        int bestNext = max({
            solve(grid, n, r1 + 1, c1, c2),
            solve(grid, n, r1 + 1, c1, c2 + 1),
            solve(grid, n, r1, c1 + 1, c2),
            solve(grid, n, r1, c1 + 1, c2 + 1)
        });
        
        ans += bestNext;
        return dp[r1][c1][c2] = ans;
    }
public:
    int cherryPickup(vector<vector<int>>& grid) {
        memset(dp, -1, sizeof(dp));
        return max(0, solve(grid, grid.size(), 0, 0, 0));
    }
};
```
- **Complexity:** T: O(N^3) | S: O(N^3)

---

### String DP (Continued)

### Q296) Longest Palindromic Subsequence
- **Problem:** Longest subsequence that reads the same backward as forward.
- **Concept / Optimal Algo:** A string's longest palindromic subsequence is simply the Longest Common Subsequence (LCS) of the string and its reversed version.
- **C++ Code:**

**Tabulation (Using LCS Logic):**
```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        int n = s.size();
        
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == rev[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][n];
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N^2)

---

### Q297) Interleaving String
- **Problem:** Determine if `s3` is formed by interleaving `s1` and `s2`.
- **Concept / Optimal Algo:** 2D DP. `dp[i][j]` = true if `s1[0..i]` and `s2[0..j]` can interleave to form `s3[0..i+j]`.
- **C++ Code:**

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.size();
        int n = s2.size();
        
        if (m + n != s3.size()) return false;
        
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i > 0 && s1[i - 1] == s3[i + j - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
                if (j > 0 && s2[j - 1] == s3[i + j - 1]) {
                    dp[i][j] = dp[i][j] || dp[i][j - 1];
                }
            }
        }
        return dp[m][n];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q298) Wildcard Matching
- **Problem:** String matching with `?` (matches any char) and `*` (matches any sequence).
- **Concept / Optimal Algo:** 2D DP. If `*`, we can ignore the `*` (`dp[i][j-1]`) or use it to match one/more chars (`dp[i-1][j]`).
- **C++ Code:**

**Tabulation (Bottom-Up):**
```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        
        dp[0][0] = true;
        
        // Initialize for patterns starting with '*'
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 1];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == s[i - 1] || p[j - 1] == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (p[j - 1] == '*') {
                    dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
                }
            }
        }
        return dp[m][n];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q299) Distinct Subsequences
- **Problem:** Number of distinct subsequences of `s` that equal `t`.
- **Concept / Optimal Algo:** If `s[i-1] == t[j-1]`, we can either use the character (so `dp[i-1][j-1]`) or skip it (`dp[i-1][j]`). Optimized to 1D DP.
- **C++ Code:**

**Tabulation (Space Optimized 1D Array):**
```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size();
        int n = t.size();
        
        // Use unsigned int to prevent potential overflow before modulo/constraints
        vector<unsigned int> dp(n + 1, 0); 
        dp[0] = 1;
        
        // Walk string s
        for (int i = 1; i <= m; i++) {
            // Traverse t backwards for space optimization
            for (int j = n; j >= 1; j--) {
                if (s[i - 1] == t[j - 1]) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[n];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(N)

### Q300) Palindrome Partitioning II
- **Problem:** Min cuts to partition a string such that every substring is a palindrome.
- **Concept / Optimal Algo:** Combine a 2D Palindrome checking DP with a 1D DP for minimum cuts. `dp[i]` stores the min cuts for the prefix of length `i`.
- **C++ Code:**

**Tabulation (Bottom-Up 2D + 1D DP):**
```cpp
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        // pal[j][i] is true if s[j...i] is a palindrome
        vector<vector<bool>> pal(n, vector<bool>(n, false));
        // dp[i] stores min cuts for substring s[0...i]
        vector<int> dp(n, 0);
        
        for (int i = 0; i < n; i++) {
            int minCuts = i; // Max cuts is i (cutting every character)
            for (int j = 0; j <= i; j++) {
                // If characters match and (length <= 2 or inner string is palindrome)
                if (s[j] == s[i] && (i - j < 2 || pal[j + 1][i - 1])) {
                    pal[j][i] = true;
                    // If j == 0, the whole string s[0...i] is a palindrome, 0 cuts needed
                    if (j == 0) {
                        minCuts = 0;
                    } else {
                        minCuts = min(minCuts, dp[j - 1] + 1);
                    }
                }
            }
            dp[i] = minCuts;
        }
        return dp[n - 1];
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N^2)

---

### Tree/Graph DP

### Q301) House Robber III
- **Problem:** Rob max money in a binary tree without triggering adjacent (parent-child) nodes.
- **Concept / Optimal Algo:** Tree DP using Post-order DFS. For each node, return a pair: `{rob_root, skip_root}`.
- **C++ Code:**

**Recursive Tree DP (Optimal - No explicit Memo map needed):**
```cpp
class Solution {
    // Returns pair: {max money if rob this node, max money if skip this node}
    pair<int, int> dfs(TreeNode* root) {
        if (!root) return {0, 0};
        
        auto left = dfs(root->left);
        auto right = dfs(root->right);
        
        // If we rob this node, we CANNOT rob its children
        int rob = root->val + left.second + right.second;
        
        // If we skip this node, we take the max of robbing or skipping its children
        int skip = max(left.first, left.second) + max(right.first, right.second);
        
        return {rob, skip};
    }
public:
    int rob(TreeNode* root) {
        auto res = dfs(root);
        return max(res.first, res.second);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q302) Unique Binary Search Trees II
- **Problem:** Generate all structurally unique BSTs containing values from `1` to `n`.
- **Concept / Optimal Algo:** Recursive DP taking each `i` as the root, then recursively generating all left subtrees from `1` to `i-1` and all right subtrees from `i+1` to `n`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    map<pair<int, int>, vector<TreeNode*>> memo;
    
    vector<TreeNode*> solve(int l, int r) {
        if (l > r) return {nullptr};
        if (memo.count({l, r})) return memo[{l, r}];
        
        vector<TreeNode*> res;
        for (int i = l; i <= r; i++) {
            auto lefts = solve(l, i - 1);
            auto rights = solve(i + 1, r);
            
            for (auto L : lefts) {
                for (auto R : rights) {
                    TreeNode* root = new TreeNode(i);
                    root->left = L;
                    root->right = R;
                    res.push_back(root);
                }
            }
        }
        return memo[{l, r}] = res;
    }
public:
    vector<TreeNode*> generateTrees(int n) {
        if (n == 0) return vector<TreeNode*>();
        return solve(1, n);
    }
};
```
- **Complexity:** T: O(Catalan(N)) | S: O(Catalan(N))

---

### Q303) Number of Ways to Arrive at Destination
- **Problem:** Find the total number of paths that reach the end in the absolute shortest time.
- **Concept / Optimal Algo:** Modified Dijkstra's Algorithm with a `ways` array. Track `dist[v]`. If we find a strictly shorter path, update `dist[v]` and copy `ways[u]`. If we find an equal shortest path, add `ways[u]` to `ways[v]`.
- **C++ Code:**

**Dijkstra DP (Bottom-Up Graph Traversal):**
```cpp
class Solution {
public:
    int countPaths(int n, vector<vector<int>>& roads) {
        vector<vector<pair<int, long long>>> adj(n);
        for (auto& r : roads) {
            adj[r[0]].push_back({r[1], r[2]});
            adj[r[1]].push_back({r[0], r[2]});
        }
        
        vector<long long> dist(n, 1e18);
        vector<long long> ways(n, 0);
        
        dist[0] = 0;
        ways[0] = 1;
        int mod = 1e9 + 7;
        
        // Priority Queue: {distance, node}
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
        pq.push({0, 0});
        
        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();
            
            if (d > dist[u]) continue; // Stale node
            
            for (auto& edge : adj[u]) {
                int v = edge.first;
                long long w = edge.second;
                
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    ways[v] = ways[u];
                    pq.push({dist[v], v});
                } else if (d + w == dist[v]) {
                    ways[v] = (ways[v] + ways[u]) % mod;
                }
            }
        }
        return ways[n - 1];
    }
};
```
- **Complexity:** T: O(E log V) | S: O(V + E)

---

### Q304) Binary Tree Cameras
- **Problem:** Minimum cameras to monitor all nodes (a camera covers itself, parent, and children).
- **Concept / Optimal Algo:** Post-order DFS State DP.  
  States: `0 = Needs Cover`, `1 = Has Camera`, `2 = Covered (but no camera)`.
- **C++ Code:**

**Recursive Tree DP (Optimal):**
```cpp
class Solution {
    int cams = 0;
    
    // 0: needs cover, 1: has camera, 2: is covered
    int dfs(TreeNode* root) {
        if (!root) return 2; // Null nodes are inherently "covered"
        
        int left = dfs(root->left);
        int right = dfs(root->right);
        
        // If any child needs cover, parent MUST have a camera
        if (left == 0 || right == 0) {
            cams++;
            return 1;
        }
        
        // If any child has a camera, parent is covered
        if (left == 1 || right == 1) {
            return 2;
        }
        
        // Otherwise, both children are covered, but parent needs cover from above
        return 0;
    }
public:
    int minCameraCover(TreeNode* root) {
        // If root itself needs cover after DFS, add one more camera
        if (dfs(root) == 0) cams++;
        return cams;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q305) Sum of Distances in Tree
- **Problem:** Find sum of path distances to all nodes for every node.
- **Concept / Optimal Algo:** Two passes DFS.  
  1. Bottom-up: find sizes of subtrees and ans for root (0).  
  2. Top-down: Shift the root. Moving from parent to child: `ans[child] = ans[parent] - count[child] + (N - count[child])`.
- **C++ Code:**

**Tree Re-rooting DP:**
```cpp
class Solution {
    vector<unordered_set<int>> adj;
    vector<int> res;
    vector<int> count;
    int N;
    
    void dfs(int root, int pre) {
        for (int i : adj[root]) {
            if (i != pre) {
                dfs(i, root);
                count[root] += count[i];
                res[root] += res[i] + count[i];
            }
        }
    }
    
    void dfs2(int root, int pre) {
        for (int i : adj[root]) {
            if (i != pre) {
                // Formula: moving closer to subtree i saves distance for count[i] nodes,
                // but adds distance for all other (N - count[i]) nodes.
                res[i] = res[root] - count[i] + N - count[i];
                dfs2(i, root);
            }
        }
    }
public:
    vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
        N = n;
        adj.resize(n);
        res.assign(n, 0);
        count.assign(n, 1); // Every subtree has at least 1 node (itself)
        
        for (auto& e : edges) {
            adj[e[0]].insert(e[1]);
            adj[e[1]].insert(e[0]);
        }
        
        dfs(0, -1);
        dfs2(0, -1);
        
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Bitmask DP

### Q306) Minimum Number of Work Sessions to Finish the Tasks
- **Problem:** Find the min sessions (max time `T`) to finish all tasks.
- **Concept / Optimal Algo:** State is a bitmask of finished tasks. Iterate over submasks.
- **C++ Code:**

**Tabulation (Bitmask DP):**
```cpp
class Solution {
public:
    int minSessions(vector<int>& tasks, int sessionTime) {
        int n = tasks.size();
        int maxMask = 1 << n;
        vector<int> dp(maxMask, 1e9);
        vector<int> sum(maxMask, 0);
        
        // Precompute sum for all submasks and mark single session masks
        for (int mask = 1; mask < maxMask; mask++) {
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) {
                    sum[mask] += tasks[j];
                }
            }
            if (sum[mask] <= sessionTime) {
                dp[mask] = 1;
            }
        }
        
        // DP: For each mask, iterate over its submasks
        for (int mask = 1; mask < maxMask; mask++) {
            // Traverse all submasks of 'mask'
            for (int submask = mask; submask > 0; submask = (submask - 1) & mask) {
                dp[mask] = min(dp[mask], dp[submask] + dp[mask ^ submask]);
            }
        }
        return dp.back();
    }
};
```
- **Complexity:** T: O(3^N) | S: O(2^N)

---

### Q307) Fair Distribution of Cookies
- **Problem:** Distribute cookies to kids to minimize the maximum amount a single child gets.
- **Concept / Optimal Algo:** While DP Bitmask works, pure recursive backtracking is much cleaner and faster due to strict pruning and small constraints (`k <= 8`).
- **C++ Code:**

**Backtracking (DFS):**
```cpp
class Solution {
    int ans = INT_MAX;
    
    void dfs(vector<int>& cookies, vector<int>& sums, int k, int idx) {
        if (idx == cookies.size()) {
            int mx = 0;
            for (int x : sums) mx = max(mx, x);
            ans = min(ans, mx);
            return;
        }
        
        for (int i = 0; i < k; i++) {
            // Pruning: if current sum + cookie > current global min, skip
            if (sums[i] + cookies[idx] >= ans) continue; 
            
            sums[i] += cookies[idx];
            dfs(cookies, sums, k, idx + 1);
            sums[i] -= cookies[idx];
            
            // Optimization: first child starting a completely new bucket is symmetric
            if (sums[i] == 0) break;
        }
    }
public:
    int distributeCookies(vector<int>& cookies, int k) {
        vector<int> sums(k, 0);
        // Optimization: Distribute largest cookies first
        sort(cookies.rbegin(), cookies.rend());
        dfs(cookies, sums, k, 0);
        return ans;
    }
};
```
- **Complexity:** T: O(K^N) | S: O(K)

---

### Q308) Shortest Path Visiting All Nodes
- **Problem:** Return the min number of edges to visit every node at least once. Re-visiting is allowed.
- **Concept / Optimal Algo:** Shortest Path -> BFS. Track state as `(CurrentNode, VisitedMask)`. Target is `(1<<N) - 1`.
- **C++ Code:**

**BFS + Bitmask DP:**
```cpp
class Solution {
public:
    int shortestPathLength(vector<vector<int>>& graph) {
        int n = graph.size();
        if (n == 1) return 0;
        
        int targetMask = (1 << n) - 1;
        // Queue stores: {current_node, visited_mask, distance_taken}
        queue<vector<int>> q;
        // Visited grid to prevent loops: [node][mask]
        vector<vector<bool>> vis(n, vector<bool>(1 << n, false));
        
        // Multi-source BFS: we can start from any node
        for (int i = 0; i < n; i++) {
            q.push({i, 1 << i, 0});
            vis[i][1 << i] = true;
        }
        
        while (!q.empty()) {
            auto curr = q.front();
            q.pop();
            
            int u = curr[0];
            int mask = curr[1];
            int dist = curr[2];
            
            if (mask == targetMask) return dist;
            
            for (int v : graph[u]) {
                int nextMask = mask | (1 << v);
                if (!vis[v][nextMask]) {
                    vis[v][nextMask] = true;
                    q.push({v, nextMask, dist + 1});
                }
            }
        }
        return 0;
    }
};
```
- **Complexity:** T: O(N * 2^N) | S: O(N * 2^N)

---

### Digit DP

### Q309) Count Numbers with Unique Digits
- **Problem:** Count integers `0 <= x < 10^n` with all unique digits.
- **Concept / Optimal Algo:** Math Combinatorics.
  - `n=1`: 10 numbers (0-9).
  - `n=2`: 9 choices for 1st digit (1-9), 9 choices for 2nd (0-9 minus 1st). Total 9 * 9 = 81.
  - `n=3`: 9 * 9 * 8.
- **C++ Code:**

**Math (O(1) Space DP):**
```cpp
class Solution {
public:
    int countNumbersWithUniqueDigits(int n) {
        if (n == 0) return 1;
        
        int res = 10; // n = 1 -> {0, 1, 2, ..., 9}
        int availableNumbers = 9;
        int currentPermutations = 9;
        
        for (int i = 2; i <= n && availableNumbers > 0; i++) {
            currentPermutations *= availableNumbers;
            res += currentPermutations;
            availableNumbers--;
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q310) Number of Digit One
- **Problem:** Count occurrences of the digit '1' in all integers `<= n`.
- **Concept / Optimal Algo:** Math. Count 1s digit by digit (ones place, tens place, hundreds place...). The formula splits the number around the current power of 10.
- **C++ Code:**

**Math:**
```cpp
class Solution {
public:
    int countDigitOne(int n) {
        long long res = 0;
        
        for (long long m = 1; m <= n; m *= 10) {
            long long a = n / m; // Higher digits
            long long b = n % m; // Lower digits
            
            // Full blocks of length `m`
            res += (a + 8) / 10 * m;
            
            // Remainder block
            if (a % 10 == 1) {
                res += b + 1;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

---

### Q311) Numbers At Most N Given Digit Set
- **Problem:** Count numbers `<= N` formed using only a given set of digit strings.
- **Concept / Optimal Algo:** 
  1. Add all numbers with fewer digits than `N` (`digits^len`).
  2. For the same length as `N`, compare from left to right. If a digit is less than `N`'s digit, add all combos for remaining positions. If equal, proceed to next position.
- **C++ Code:**

**Math / String Compare:**
```cpp
class Solution {
public:
    int atMostNGivenDigitSet(vector<string>& D, int n) {
        string S = to_string(n);
        int K = S.size();
        int res = 0;
        int sz = D.size();
        
        // 1. Valid numbers with length < K
        for (int i = 1; i < K; i++) {
            res += pow(sz, i);
        }
        
        // 2. Valid numbers with length == K
        for (int i = 0; i < K; i++) {
            bool hasSameDigit = false;
            
            for (string& d : D) {
                if (d[0] < S[i]) {
                    // Digit strictly smaller, all combinations of remaining digits are valid
                    res += pow(sz, K - i - 1);
                } else if (d[0] == S[i]) {
                    // Digit matches, need to check next digit of N
                    hasSameDigit = true;
                }
            }
            
            // If there's no matching digit for S[i], we can't form exactly N's prefix anymore
            if (!hasSameDigit) return res;
        }
        
        // If we survived the loop, the number `N` itself is valid.
        return res + 1;
    }
};
```
- **Complexity:** T: O(log N) | S: O(log N)

---

### Probability DP

### Q312) Knight Probability in Chessboard
- **Problem:** Find probability that a knight stays on an `N x N` board after `k` moves.
- **Concept / Optimal Algo:** Toggle 2D grids (Current state -> Next state) mapping out probabilities. Accumulate probabilities of jumping to `(r, c)` from 8 directions and divide by 8.
- **C++ Code:**

**Tabulation (Space Optimized 2D Grid Toggle):**
```cpp
class Solution {
public:
    double knightProbability(int n, int k, int r, int c) {
        vector<vector<double>> dp(n, vector<double>(n, 0.0));
        dp[r][c] = 1.0;
        
        int dirs[8][2] = {{-2, 1}, {-1, 2}, {1, 2}, {2, 1}, 
                          {2, -1}, {1, -2}, {-1, -2}, {-2, -1}};
        
        while (k--) {
            vector<vector<double>> next_dp(n, vector<double>(n, 0.0));
            
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dp[i][j] > 0) {
                        for (auto& d : dirs) {
                            int x = i + d[0];
                            int y = j + d[1];
                            if (x >= 0 && x < n && y >= 0 && y < n) {
                                next_dp[x][y] += dp[i][j] / 8.0;
                            }
                        }
                    }
                }
            }
            dp = next_dp;
        }
        
        double sum = 0.0;
        for (auto& row : dp) {
            for (double val : row) {
                sum += val;
            }
        }
        return sum;
    }
};
```
- **Complexity:** T: O(K * N^2) | S: O(N^2)

---

### Q313) Soup Servings
- **Problem:** Probability Soup A empties first + half prob that both empty simultaneously.
- **Concept / Optimal Algo:** Operations remove 4 portions total. Divide `N` by 25 to reduce state space. For `N >= 4800`, probability naturally converges to `1.0`.
- **C++ Code:**

**Memoization (Top-Down):**
```cpp
class Solution {
    double dp[200][200]; // 4800 / 25 = 192 max size needed
    
    double solve(int a, int b) {
        if (a <= 0 && b <= 0) return 0.5; // Both empty
        if (a <= 0) return 1.0;           // A empties first
        if (b <= 0) return 0.0;           // B empties first
        
        if (dp[a][b] > 0) return dp[a][b];
        
        double prob = 0.25 * (
            solve(a - 4, b) +     // Op 1: 100ml A, 0ml B
            solve(a - 3, b - 1) + // Op 2: 75ml A, 25ml B
            solve(a - 2, b - 2) + // Op 3: 50ml A, 50ml B
            solve(a - 1, b - 3)   // Op 4: 25ml A, 75ml B
        );
        
        return dp[a][b] = prob;
    }
public:
    double soupServings(int n) {
        // Law of large numbers: A is consumed faster on average.
        if (n >= 4800) return 1.0; 
        
        // Ceiling division by 25
        int m = (n + 24) / 25; 
        return solve(m, m);
    }
};
```
- **Complexity:** T: O(1) bounded (Max `192 x 192`) | S: O(1) bounded

---

### Q314) New 21 Game
- **Problem:** Probability sum of points `<= n` when you stop drawing after reaching `>= k`.
- **Concept / Optimal Algo:** Sliding Window DP. `dp[i]` is prob of reaching exact score `i`. At `i`, prob is `sum(dp[i-maxPts] ... dp[i-1]) / maxPts`.
- **C++ Code:**

**Tabulation (Sliding Window):**
```cpp
class Solution {
public:
    double new21Game(int n, int k, int maxPts) {
        if (k == 0 || n >= k + maxPts) return 1.0;
        
        vector<double> dp(n + 1, 0.0);
        dp[0] = 1.0;
        
        double windowSum = 1.0;
        double res = 0.0;
        
        for (int i = 1; i <= n; i++) {
            // Calculate current probability based on previous maxPts probabilities
            dp[i] = windowSum / maxPts;
            
            // If we are under K, this state contributes to future draws
            if (i < k) {
                windowSum += dp[i];
            } else {
                // Once we pass K, we stop drawing, so accumulate to result
                res += dp[i];
            }
            
            // Slide window: remove the state that falls out of range maxPts
            if (i >= maxPts) {
                windowSum -= dp[i - maxPts];
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### State Machine DP

### Q315) Best Time to Buy and Sell Stock with Cooldown
- **Problem:** Max profit given a 1-day cooldown after selling before you can buy again.
- **Concept / Optimal Algo:** State tracking. 3 States: `Hold` (have stock), `Sold` (just sold, now on cooldown), `Rest` (cooldown finished, ready to buy).
- **C++ Code:**

**Tabulation (Space Optimized O(1) State Machine):**
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int hold = INT_MIN; // Max profit if currently holding a stock
        int sold = 0;       // Max profit if just sold a stock
        int rest = 0;       // Max profit if doing nothing/ready to buy
        
        for (int p : prices) {
            int prevSold = sold;
            // Sell the stock we were holding
            sold = hold + p;
            // Either keep holding, or buy a new stock from rest state
            hold = max(hold, rest - p);
            // Rest continues, or cooldown over
            rest = max(rest, prevSold);
        }
        
        return max(sold, rest);
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q316) Best Time to Buy and Sell Stock III
- **Problem:** Max profit with at most 2 transactions.
- **Concept / Optimal Algo:** 4 states sequential DP: First Buy (`b1`), First Sell (`s1`), Second Buy (`b2`), Second Sell (`s2`).
- **C++ Code:**

**Tabulation (Space Optimized O(1) State Machine):**
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int b1 = INT_MIN; // Money left after 1st buy
        int s1 = 0;       // Profit after 1st sell
        int b2 = INT_MIN; // Money left after 2nd buy (Profit1 - Cost)
        int s2 = 0;       // Final Profit after 2nd sell
        
        for (int p : prices) {
            b1 = max(b1, -p);        // Spend p to buy
            s1 = max(s1, b1 + p);    // Sell 1st stock at p
            b2 = max(b2, s1 - p);    // Re-invest profit to buy 2nd stock at p
            s2 = max(s2, b2 + p);    // Sell 2nd stock at p
        }
        
        return s2; // Max possible profit ends here
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

## 📐 Maths / Geometry

### Q317) Palindrome Number
- **Problem:** Check if integer is a palindrome without string conversion.
- **Concept / Optimal Algo:** Reverse half the number. If `x < 0` or ends in 0 (but isn't 0), it's false. Keep popping from `x` into `rev` until `x <= rev`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        // Negatives, or numbers ending in 0 (except 0 itself) are not palindromes
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }
        
        int rev = 0;
        // Rebuild half the number
        while (x > rev) {
            rev = rev * 10 + (x % 10);
            x /= 10;
        }
        
        // Even length match || Odd length match (discard middle digit)
        return x == rev || x == rev / 10;
    }
};
```
- **Complexity:** T: O(log X) | S: O(1)

---

### Q318) Reverse Integer
- **Problem:** Reverse integer digits, return 0 on 32-bit overflow.
- **Concept / Optimal Algo:** Extract digits with `% 10`, check bounds `INT_MAX/10` and `INT_MIN/10` before multiplying.
- **C++ Code:**
```cpp
class Solution {
public:
    int reverse(int x) {
        int res = 0;
        
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            
            // Overflow checks before `res * 10`
            if (res > INT_MAX / 10 || (res == INT_MAX / 10 && pop > 7)) return 0;
            if (res < INT_MIN / 10 || (res == INT_MIN / 10 && pop < -8)) return 0;
            
            res = res * 10 + pop;
        }
        return res;
    }
};
```
- **Complexity:** T: O(log X) | S: O(1)

---

### Q319) Factorial Trailing Zeroes
- **Problem:** Find the number of trailing zeroes in `n!`.
- **Concept / Optimal Algo:** Trailing zeroes are created by `10 = 2 * 5`. In factorials, 5s are the bottleneck. Count how many times 5 divides into `n` (`n/5 + n/25 + n/125 ...`).
- **C++ Code:**
```cpp
class Solution {
public:
    int trailingZeroes(int n) {
        int res = 0;
        while (n > 0) {
            res += n / 5;
            n /= 5;
        }
        return res;
    }
};
```
- **Complexity:** T: O(log_5 N) | S: O(1)

---

### Q320) Valid Square
- **Problem:** Given 4 points, determine if they form a valid square.
- **Concept / Optimal Algo:** Calculate the squared distance between all pairs of points (6 distances). For a square, there must be 4 equal shorter distances (sides) and 2 equal longer distances (diagonals). Sort and verify.
- **C++ Code:**
```cpp
class Solution {
    int getDist(vector<int>& p1, vector<int>& p2) {
        return (p1[0] - p2[0]) * (p1[0] - p2[0]) + 
               (p1[1] - p2[1]) * (p1[1] - p2[1]);
    }
public:
    bool validSquare(vector<int>& p1, vector<int>& p2, vector<int>& p3, vector<int>& p4) {
        vector<int> dists = {
            getDist(p1, p2), getDist(p1, p3), getDist(p1, p4),
            getDist(p2, p3), getDist(p2, p4), getDist(p3, p4)
        };
        
        sort(dists.begin(), dists.end());
        
        // 4 equal sides (> 0) AND 2 equal diagonals
        return dists[0] > 0 && 
               dists[0] == dists[1] && dists[1] == dists[2] && dists[2] == dists[3] && 
               dists[4] == dists[5];
    }
};
```
- **Complexity:** T: O(1) | S: O(1)

---

### Q321) Minimum Area Rectangle II
- **Problem:** Find the minimum area of a rectangle formed by points, not necessarily parallel to the X and Y axes.
- **Concept / Optimal Algo:** A rectangle's diagonals intersect at exactly their midpoints and are equal in length. Map `Key: "Center_X, Center_Y, Diagonal_Length" -> Value: list of point pairs`. Any two pairs in the same key form a rectangle. Compute area and minimize.
- **C++ Code:**
```cpp
class Solution {
public:
    double minAreaFreeRect(vector<vector<int>>& points) {
        unordered_map<string, vector<pair<int, int>>> mp;
        double minA = DBL_MAX;
        int n = points.size();
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Diagonal length squared
                long distSq = pow(points[i][0] - points[j][0], 2) + 
                              pow(points[i][1] - points[j][1], 2);
                
                // Center point coordinates
                double cx = (points[i][0] + points[j][0]) / 2.0;
                double cy = (points[i][1] + points[j][1]) / 2.0;
                
                string key = to_string(distSq) + "_" + to_string(cx) + "_" + to_string(cy);
                
                // Compare with all previous pairs that have same diagonal length & center
                for (auto& p : mp[key]) {
                    double area = sqrt(pow(points[i][0] - points[p.first][0], 2) + 
                                       pow(points[i][1] - points[p.first][1], 2)) * 
                                  sqrt(pow(points[i][0] - points[p.second][0], 2) + 
                                       pow(points[i][1] - points[p.second][1], 2));
                    minA = min(minA, area);
                }
                
                mp[key].push_back({i, j});
            }
        }
        
        return minA == DBL_MAX ? 0 : minA;
    }
};
```
- **Complexity:** T: O(N^2) (assuming few collinear points on same circle) | S: O(N^2)

---

### Q322) Max Points on a Line
- **Problem:** Return the max points that lie on the same straight line.
- **Concept / Optimal Algo:** For a fixed point `i`, compute the normalized slope to all other points `j` using `dy/dx` simplified via their Greatest Common Divisor (GCD). Store slopes in a hashmap to count collinear points.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxPoints(vector<vector<int>>& pt) {
        int n = pt.size();
        if (n <= 2) return n;
        
        int res = 1;
        for (int i = 0; i < n; i++) {
            unordered_map<string, int> slopeMap;
            int maxForI = 0;
            
            for (int j = i + 1; j < n; j++) {
                int dx = pt[j][0] - pt[i][0];
                int dy = pt[j][1] - pt[i][1];
                
                // Normalize slope using GCD to avoid float precision issues
                int g = gcd(dx, dy);
                string key = to_string(dx / g) + "_" + to_string(dy / g);
                
                slopeMap[key]++;
                maxForI = max(maxForI, slopeMap[key]);
            }
            // Add 1 for the point `i` itself
            res = max(res, maxForI + 1);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N^2 log(coord)) | S: O(N)

---

## 🧠 Advanced Topics

### String Matching

### Q323) Repeated String Match
- **Problem:** Minimum times you must repeat `a` so that `b` is a substring of it.
- **Concept / Optimal Algo:** Append `a` until its length is `>=` `b.length()`. Check if `b` is found. If not, append `a` one last time (to account for boundary alignment wraps). Check again.
- **C++ Code:**
```cpp
class Solution {
public:
    int repeatedStringMatch(string a, string b) {
        string s = a;
        int count = 1;
        
        // Build base string until it matches size requirement
        while (s.size() < b.size()) {
            s += a;
            count++;
        }
        
        // First check
        if (s.find(b) != string::npos) return count;
        
        // Append one more time for shifted alignments
        s += a;
        if (s.find(b) != string::npos) return count + 1;
        
        return -1;
    }
};
```
- **Complexity:** T: O(N * M) string matching | S: O(M) where M is length of B.

---

### Q324) Shortest Palindrome
- **Problem:** Add characters to the *front* of a string to make it the shortest palindrome possible.
- **Concept / Optimal Algo:** Find the longest palindromic prefix of `s`. Build `str = s + "#" + rev_s`. Create a KMP `lps` (Longest Prefix Suffix) array. The last value of LPS is the length of the longest palindromic prefix. Add the missing reversed suffix to the front.
- **C++ Code:**
```cpp
class Solution {
public:
    string shortestPalindrome(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        
        // Combine with separator to prevent suffix bleeding into prefix
        string str = s + "#" + rev;
        vector<int> pi(str.size(), 0);
        
        // KMP LPS Array Generation
        for (int i = 1; i < str.size(); i++) {
            int j = pi[i - 1];
            while (j > 0 && str[i] != str[j]) {
                j = pi[j - 1];
            }
            if (str[i] == str[j]) {
                j++;
            }
            pi[i] = j;
        }
        
        // pi.back() gives length of longest palindromic prefix
        // We prepend the remainder of the reversed string
        return rev.substr(0, s.size() - pi.back()) + s;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Segment Tree

### Q325) Range Sum Query - Mutable
- **Problem:** Array update and range sum queries.
- **Concept / Optimal Algo:** Fenwick Tree (Binary Indexed Tree). Enables `O(log N)` point updates and `O(log N)` prefix sum queries.
- **C++ Code:**
```cpp
class NumArray {
    vector<int> bit;
    vector<int> nums;
    int n;
    
    // Internal Fenwick logic
    void add(int i, int val) {
        for (; i <= n; i += i & -i) {
            bit[i] += val;
        }
    }
    
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & -i) {
            sum += bit[i];
        }
        return sum;
    }
    
public:
    NumArray(vector<int>& arr) {
        n = arr.size();
        bit.assign(n + 1, 0);
        nums = arr;
        
        // Build BIT
        for (int i = 0; i < n; i++) {
            add(i + 1, nums[i]);
        }
    }
    
    void update(int index, int val) {
        add(index + 1, val - nums[index]);
        nums[index] = val; // Store state
    }
    
    int sumRange(int left, int right) {
        return query(right + 1) - query(left);
    }
};
```
- **Complexity:** T: O(log N) Update/Query | S: O(N)

---

### Q326) Count of Smaller Numbers After Self
- **Problem:** For each element, count elements smaller than it to its right.
- **Concept / Optimal Algo:** Merge Sort. Track original index inside `pair<val, original_index>`. During the `merge` phase, if a left element is placed into the temp array, all elements previously processed from the right half are strictly smaller. Add that right-half count to the left element's original index.
- **C++ Code:**
```cpp
class Solution {
    vector<int> count;
    
    void merge(vector<pair<int, int>>& v, int l, int m, int r) {
        vector<pair<int, int>> tmp(r - l + 1);
        int i = l, j = m + 1, k = 0, rightC = 0;
        
        while (i <= m && j <= r) {
            if (v[j].first < v[i].first) {
                // Number from right array is smaller
                rightC++;
                tmp[k++] = v[j++];
            } else {
                // Number from left array is smaller/equal. Register `rightC` elements skipped.
                count[v[i].second] += rightC;
                tmp[k++] = v[i++];
            }
        }
        
        while (i <= m) {
            count[v[i].second] += rightC;
            tmp[k++] = v[i++];
        }
        
        while (j <= r) {
            tmp[k++] = v[j++];
        }
        
        for (int p = 0; p < k; p++) {
            v[l + p] = tmp[p];
        }
    }
    
    void mergeSort(vector<pair<int, int>>& v, int l, int r) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        mergeSort(v, l, m);
        mergeSort(v, m + 1, r);
        merge(v, l, m, r);
    }
public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        count.assign(n, 0);
        vector<pair<int, int>> v(n);
        
        for (int i = 0; i < n; i++) {
            v[i] = {nums[i], i};
        }
        
        mergeSort(v, 0, n - 1);
        return count;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Line Sweep

### Q327) Minimum Interval to Include Each Query
- **Problem:** Find the smallest interval size that contains the query point `q`.
- **Concept / Optimal Algo:** Offline Queries. 
  1. Sort queries preserving indices. 
  2. Sort intervals by start time. 
  3. Sweep line: Push intervals starting `<= q` into a Min-Heap based on size.
  4. Pop intervals from Heap that end `< q`. 
  5. Top is the minimum valid interval size.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        int numQ = queries.size();
        vector<pair<int, int>> q; // {query_time, original_index}
        for (int i = 0; i < numQ; i++) {
            q.push_back({queries[i], i});
        }
        
        sort(q.begin(), q.end());
        sort(intervals.begin(), intervals.end());
        
        // Priority Queue: {interval_size, end_time}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        vector<int> res(numQ, -1);
        
        int i = 0;
        int n = intervals.size();
        
        for (auto& p : q) {
            int t = p.first;
            int idx = p.second;
            
            // Add all intervals starting on or before current query time
            while (i < n && intervals[i][0] <= t) {
                pq.push({intervals[i][1] - intervals[i][0] + 1, intervals[i][1]});
                i++;
            }
            
            // Remove intervals from PQ that end before current query time
            while (!pq.empty() && pq.top().second < t) {
                pq.pop();
            }
            
            if (!pq.empty()) {
                res[idx] = pq.top().first;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N log N + Q log Q) | S: O(N + Q)

---

### Q328) The Skyline Problem
- **Problem:** Return the key points of the skyline formed by rectangular buildings.
- **Concept / Optimal Algo:** Line sweep over edges. Start edge is `-height`, End edge is `+height`. Sort them (ensures start edges process before end edges at the same coordinate). Push heights to a Multiset (acts as max heap with random deletion). Whenever the max height in the multiset changes, record a key point.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<pair<int, int>> edges;
        
        for (auto& b : buildings) {
            edges.push_back({b[0], -b[2]}); // Left edge (negative to sort top/left first)
            edges.push_back({b[1], b[2]});  // Right edge (positive)
        }
        
        sort(edges.begin(), edges.end());
        
        multiset<int> pq = {0}; // Add ground level 0
        vector<vector<int>> res;
        int prevMax = 0;
        
        for (auto& e : edges) {
            if (e.second < 0) {
                // Add building height (convert back to positive)
                pq.insert(-e.second);
            } else {
                // Remove building height when exiting
                pq.erase(pq.find(e.second));
            }
            
            int currMax = *pq.rbegin();
            // If the highest active building changes, it's a skyline key point
            if (currMax != prevMax) {
                res.push_back({e.first, currMax});
                prevMax = currMax;
            }
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Suffix Array / Rolling Hash

### Q329) Longest Duplicate Substring
- **Problem:** Longest substring occurring at least twice.
- **Concept / Optimal Algo:** Binary Search + Rabin-Karp Rolling Hash. Search the length `L` of the substring. Calculate hash for window of size `L`. Move window, update hash in `O(1)`. If hash collision, verify string to prevent false positive.
- **C++ Code:**
```cpp
class Solution {
    int search(string& s, int L) {
        long long q = 1e9 + 7; // Large prime modulo
        long long h = 0;
        long long p = 1;
        long long d = 26; // Base for lowercase letters
        unordered_map<long long, vector<int>> mp;
        
        // Calculate hash value for the first window of length L
        for (int i = 0; i < L; i++) {
            h = (h * d + (s[i] - 'a')) % q;
            if (i < L - 1) {
                p = (p * d) % q; // Highest power base for window slide
            }
        }
        mp[h].push_back(0);
        
        // Slide the window
        for (int i = 1; i <= (int)s.size() - L; i++) {
            // Remove outgoing char and add incoming char
            h = (d * (h - (s[i - 1] - 'a') * p % q + q) % q + (s[i + L - 1] - 'a')) % q;
            
            // Hash match found
            for (int start : mp[h]) {
                // Double check to prevent hash collision false positives
                if (s.substr(start, L) == s.substr(i, L)) {
                    return i;
                }
            }
            mp[h].push_back(i);
        }
        return -1;
    }
    
public:
    string longestDupSubstring(string s) {
        int l = 1, r = s.size() - 1;
        int start = -1;
        int maxL = 0;
        
        // Binary search the length of the substring
        while (l <= r) {
            int m = l + (r - l) / 2;
            int idx = search(s, m);
            
            if (idx != -1) {
                // Found duplicate of length m, try finding longer
                maxL = m;
                start = idx;
                l = m + 1;
            } else {
                // Did not find, search shorter lengths
                r = m - 1;
            }
        }
        
        return start == -1 ? "" : s.substr(start, maxL);
    }
};
```
- **Complexity:** T: O(N log N) Average | S: O(N)