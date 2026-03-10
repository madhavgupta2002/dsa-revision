## 🗂️ Sorting

### Q1) Count of Smaller Numbers After Self
- **Problem:** Given an array, return an array where `counts[i]` is the number of smaller elements to the right of `nums[i]`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Merge Sort. We track the original indices of elements. During the merge step, if an element from the right half is placed before an element from the left half, it means the right element is smaller. We count these inversions for each element in the left half.
- **C++ Code:**
```cpp
class Solution {
    vector<int> count;
    
    void merge(vector<pair<int, int>>& v, int l, int mid, int r) {
        vector<pair<int, int>> temp(r - l + 1);
        int i = l, j = mid + 1, k = 0;
        int rightCount = 0; // Number of elements from right half that are strictly smaller
        
        while (i <= mid && j <= r) {
            if (v[j].first < v[i].first) {
                rightCount++;
                temp[k++] = v[j++];
            } else {
                count[v[i].second] += rightCount;
                temp[k++] = v[i++];
            }
        }
        
        while (i <= mid) {
            count[v[i].second] += rightCount;
            temp[k++] = v[i++];
        }
        while (j <= r) {
            temp[k++] = v[j++];
        }
        
        for (int p = 0; p < k; p++) {
            v[l + p] = temp[p];
        }
    }
    
    void mergeSort(vector<pair<int, int>>& v, int l, int r) {
        if (l >= r) return;
        int mid = l + (r - l) / 2;
        mergeSort(v, l, mid);
        mergeSort(v, mid + 1, r);
        merge(v, l, mid, r);
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

### Q2) First Missing Positive
- **Problem:** Find the smallest missing positive integer in an unsorted array.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Cyclic Sort. Try to place every number `i` at index `i-1` (i.e., put `1` at index `0`, `2` at index `1`). Iterate through and swap elements into their correct positions. Finally, scan for the first index where `nums[i] != i + 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        
        for (int i = 0; i < n; i++) {
            // While the number is in valid range and not already at its correct position
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]);
            }
        }
        
        // Find the first missing match
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        
        // If all 1 to n are present, the missing positive is n + 1
        return n + 1;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

## 🗂️ Two Pointers

### Q3) 3Sum
- **Problem:** Find all unique triplets in the array which gives the sum of zero.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort the array. Iterate `i` from `0` to `n-3`. Use two pointers (`left` and `right`) for the remaining array to find a sum of `-nums[i]`. Skip duplicates for `i`, `left`, and `right` to ensure unique triplets.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        int n = nums.size();
        
        for (int i = 0; i < n - 2; i++) {
            // Skip duplicate fixed elements
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                
                if (sum == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    // Skip duplicates for left and right
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } 
                else if (sum < 0) left++;
                else right--;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1) or O(log N) for sorting

---

### Q4) Sort Colors
- **Problem:** Sort an array of 0s, 1s, and 2s in-place.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Dutch National Flag Algorithm. Use three pointers: `low`, `mid`, and `high`. `mid` traverses the array. If 0, swap with `low`; if 2, swap with `high`; if 1, just move `mid`.
- **C++ Code:**
```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++; mid++;
            } 
            else if (nums[mid] == 1) {
                mid++;
            } 
            else { // nums[mid] == 2
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q5) Next Permutation
- **Problem:** Rearrange numbers into the lexicographically next greater permutation.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 
    1. Find the first element from the right that is smaller than its next element (`nums[i] < nums[i+1]`).
    2. Find the smallest element to the right of `i` that is strictly greater than `nums[i]`.
    3. Swap them.
    4. Reverse the subarray to the right of `i`.
- **C++ Code:**
```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int i = n - 2;
        
        // Find the pivot
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        if (i >= 0) {
            // Find the rightmost successor
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        
        // Reverse from i+1 to the end
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

## 🗂️ Prefix Sum and Line Sweep

### Q6) Product of Array Except Self
- **Problem:** Return an array where `ans[i]` is the product of all elements except `nums[i]`, without using division.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use prefix and suffix products. Calculate the prefix product and store it directly in the result array. Then, iterate backwards maintaining a running suffix product, multiplying it into the result array.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        
        // Left pass (Prefix product)
        int leftProduct = 1;
        for (int i = 0; i < n; i++) {
            res[i] = leftProduct;
            leftProduct *= nums[i];
        }
        
        // Right pass (Suffix product)
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= rightProduct;
            rightProduct *= nums[i];
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (excluding output array)

---

### Q7) Increment Submatrices by One
- **Problem:** Increment all elements in a given 2D submatrix for a series of queries.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 2D Difference Array (Line Sweep). For a query `[r1, c1, r2, c2]`, add 1 at `(r1, c1)`, subtract 1 at `(r2+1, c1)` and `(r1, c2+1)`, and add 1 at `(r2+1, c2+1)`. Finally, do a 2D prefix sum to apply the updates.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> rangeAddQueries(int n, vector<vector<int>>& queries) {
        vector<vector<int>> mat(n, vector<int>(n, 0));
        
        // Mark the difference boundaries
        for (auto& q : queries) {
            int r1 = q[0], c1 = q[1], r2 = q[2], c2 = q[3];
            mat[r1][c1]++;
            if (r2 + 1 < n) mat[r2 + 1][c1]--;
            if (c2 + 1 < n) mat[r1][c2 + 1]--;
            if (r2 + 1 < n && c2 + 1 < n) mat[r2 + 1][c2 + 1]++;
        }
        
        // Row-wise prefix sum
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < n; j++) {
                mat[i][j] += mat[i][j - 1];
            }
        }
        
        // Column-wise prefix sum
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < n; j++) {
                mat[i][j] += mat[i - 1][j];
            }
        }
        
        return mat;
    }
};
```
- **Complexity:** T: O(N^2 + Q) | S: O(N^2)

---

### Q8) My Calendar II
- **Problem:** Implement a calendar that allows booking events. An event can be double-booked, but NOT triple-booked.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Line Sweep using `std::map`. Increment at `start`, decrement at `end`. Iterate through the map keeping a running sum of active bookings. If active bookings hit 3, revert the `start` and `end` increments and return false.
- **C++ Code:**
```cpp
class MyCalendarTwo {
    map<int, int> timeline;
public:
    MyCalendarTwo() {}
    
    bool book(int start, int end) {
        timeline[start]++;
        timeline[end]--;
        
        int activeEvents = 0;
        for (auto& [time, count] : timeline) {
            activeEvents += count;
            
            if (activeEvents >= 3) {
                // Triple booking detected, revert changes
                timeline[start]--;
                timeline[end]++;
                return false;
            }
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) per booking | S: O(N)

---

## 🗂️ Matrix

### Q9) Rotate Image
- **Problem:** Rotate an N x N 2D matrix 90 degrees clockwise in-place.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`), then reverse every row.
- **C++ Code:**
```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        
        // 1. Transpose the matrix
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        
        // 2. Reverse each row
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1)

---

### Q10) Spiral Matrix
- **Problem:** Return all elements of a matrix in spiral order.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Maintain four pointers/boundaries: `top`, `bottom`, `left`, `right`. Traverse right -> down -> left -> up. Shrink boundaries after each directional traversal.
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
            // Traverse Top
            for (int j = left; j <= right; j++) res.push_back(matrix[top][j]);
            top++;
            
            // Traverse Right
            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
            right--;
            
            // Traverse Bottom
            if (top <= bottom) {
                for (int j = right; j >= left; j--) res.push_back(matrix[bottom][j]);
                bottom--;
            }
            
            // Traverse Left
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(1)

---

## 🗂️ Hashing

### Q11) Majority Element
- **Problem:** Find the element that appears more than `⌊n / 2⌋` times.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Boyer-Moore Voting Algorithm. Maintain a candidate and a counter. If counter is 0, choose a new candidate. If current element matches candidate, increment, else decrement.
- **C++ Code:**
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0, count = 0;
        
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }
        
        return candidate;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q12) Subarray Sum Equals K
- **Problem:** Find the total number of continuous subarrays whose sum equals `k`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Prefix Sum + Hash Map. Keep a running sum. If `sum - k` exists in the hash map, it means there is a subarray summing to `k`. Add the frequency of `sum - k` to the result.
- **C++ Code:**
```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCounts;
        prefixCounts[0] = 1; // Base case: prefix sum exactly equals k
        
        int currentSum = 0;
        int count = 0;
        
        for (int num : nums) {
            currentSum += num;
            
            // If currentSum - k exists, we found valid subarrays
            if (prefixCounts.find(currentSum - k) != prefixCounts.end()) {
                count += prefixCounts[currentSum - k];
            }
            
            // Add current sum to map
            prefixCounts[currentSum]++;
        }
        
        return count;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

## 🗂️ Sliding Window

### Q13) Subarray Product Less Than K
- **Problem:** Count contiguous subarrays where the product of all elements is strictly less than `k`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Expand window to the right, multiplying elements. While the product `>= k`, divide by the left element and shrink the window. Number of valid subarrays ending at `right` is `right - left + 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k <= 1) return 0; // Strictly less, and elements are >= 1
        
        int prod = 1;
        int res = 0;
        int left = 0;
        
        for (int right = 0; right < nums.size(); right++) {
            prod *= nums[right];
            
            while (prod >= k && left <= right) {
                prod /= nums[left];
                left++;
            }
            
            res += (right - left + 1);
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q14) Frequency of the Most Frequent Element
- **Problem:** You can increment any element by 1 at most `k` times. Find the max possible frequency of any element.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort the array. Use a sliding window. The cost to make all elements in the window equal to `nums[right]` is `(right - left + 1) * nums[right] - sum_of_window`. Shrink from `left` if cost exceeds `k`.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        
        long long currentSum = 0;
        int left = 0;
        int maxFreq = 0;
        
        for (int right = 0; right < nums.size(); right++) {
            currentSum += nums[right];
            
            // Required sum to make all elements equal to nums[right] 
            // is window_size * nums[right]
            while ((long long)(right - left + 1) * nums[right] - currentSum > k) {
                currentSum -= nums[left];
                left++;
            }
            
            maxFreq = max(maxFreq, right - left + 1);
        }
        
        return maxFreq;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(1)

---

### Q15) Subarrays with K Different Integers
- **Problem:** Number of good subarrays containing exactly `K` different integers.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** `Exact(K) = atMost(K) - atMost(K - 1)`. Use a sliding window to calculate subarrays with at most `k` distinct elements.
- **C++ Code:**
```cpp
class Solution {
    int atMost(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int left = 0, res = 0;
        
        for (int right = 0; right < nums.size(); right++) {
            if (count[nums[right]] == 0) k--;
            count[nums[right]]++;
            
            while (k < 0) {
                count[nums[left]]--;
                if (count[nums[left]] == 0) k++;
                left++;
            }
            
            res += (right - left + 1);
        }
        return res;
    }
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

## 🗂️ Linked List

### Q16) Linked List Cycle II
- **Problem:** Return the node where the cycle begins. Return null if no cycle.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Floyd’s Tortoise and Hare. First, detect if there is a cycle. When they meet, reset one pointer to `head` and move both pointers one step at a time. The node where they meet again is the start of the cycle.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (!head || !head->next) return nullptr;
        
        ListNode *slow = head;
        ListNode *fast = head;
        
        // Find intersection point
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) break;
        }
        
        // No cycle found
        if (slow != fast) return nullptr;
        
        // Reset slow to head, move both at 1x speed
        slow = head;
        while (slow != fast) {
            slow = slow->next;
            fast = fast->next;
        }
        
        return slow; // Cycle start node
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q17) Reverse Linked List
- **Problem:** Reverse a singly linked list.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Maintain three pointers: `prev`, `curr`, `next`. Iterate and flip `curr->next = prev`, then move pointers forward.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        
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
- **Complexity:** T: O(N) | S: O(1)

---

### Q18) Sort List
- **Problem:** Sort a linked list in `O(N log N)` time and `O(1)` memory.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Merge Sort. Find the middle using fast/slow pointers. Split the list, sort recursively, and merge two sorted lists.
- **C++ Code:**
```cpp
class Solution {
    ListNode* merge(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (l1 && l2) {
            if (l1->val < l2->val) {
                tail->next = l1;
                l1 = l1->next;
            } else {
                tail->next = l2;
                l2 = l2->next;
            }
            tail = tail->next;
        }
        if (l1) tail->next = l1;
        if (l2) tail->next = l2;
        
        return dummy.next;
    }
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;
        
        // Find Mid
        ListNode *slow = head, *fast = head->next;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        // Split
        ListNode* mid = slow->next;
        slow->next = nullptr;
        
        // Sort and Merge
        return merge(sortList(head), sortList(mid));
    }
};
```
- **Complexity:** T: O(N log N) | S: O(log N) due to recursion stack

---

### Q19) Copy List with Random Pointer
- **Problem:** Deep copy a linked list where nodes have a `next` and a `random` pointer.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Three passes, `O(1)` space algorithm. 
    1. Interleave cloned nodes: `A -> A' -> B -> B'`.
    2. Assign random pointers: `A'->random = A->random ? A->random->next : null`.
    3. Detach the cloned list from the original list.
- **C++ Code:**
```cpp
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        
        // 1. Insert cloned nodes next to original nodes
        Node* curr = head;
        while (curr) {
            Node* clone = new Node(curr->val);
            clone->next = curr->next;
            curr->next = clone;
            curr = clone->next;
        }
        
        // 2. Assign random pointers for the clones
        curr = head;
        while (curr) {
            if (curr->random) {
                curr->next->random = curr->random->next;
            }
            curr = curr->next->next;
        }
        
        // 3. Separate the original and cloned lists
        curr = head;
        Node* cloneHead = head->next;
        Node* cloneCurr = cloneHead;
        
        while (curr) {
            curr->next = curr->next->next;
            if (cloneCurr->next) {
                cloneCurr->next = cloneCurr->next->next;
            }
            curr = curr->next;
            cloneCurr = cloneCurr->next;
        }
        
        return cloneHead;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q20) Merge k Sorted Lists
- **Problem:** Merge `k` sorted linked lists into one sorted linked list.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Min-Heap (Priority Queue). Push the head of each list into a Min-Heap. Pop the smallest node, append to result, and push its `next` node into the Heap.
- **C++ Code:**
```cpp
class Solution {
    struct compare {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val; // Min-Heap
        }
    };
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, compare> pq;
        
        for (ListNode* list : lists) {
            if (list) pq.push(list);
        }
        
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (!pq.empty()) {
            ListNode* curr = pq.top();
            pq.pop();
            
            tail->next = curr;
            tail = tail->next;
            
            if (curr->next) {
                pq.push(curr->next);
            }
        }
        
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N log K) | S: O(K) where K is number of lists.

---

### Q21) LRU Cache
- **Problem:** Implement Least Recently Used (LRU) Cache class (`get` and `put` in `O(1)`).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Hash Map + Doubly Linked List. Map stores `key -> Node pointer`. DLL stores `(key, value)`. Head is Most Recently Used, Tail is Least Recently Used. On access, move node to Head. On eviction, remove Tail.
- **C++ Code:**
```cpp
class LRUCache {
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    
    int capacity;
    unordered_map<int, Node*> cache;
    Node *head, *tail;
    
    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void insertToHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    
public:
    LRUCache(int cap) : capacity(cap) {
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        Node* node = cache[key];
        remove(node);
        insertToHead(node);
        return node->val;
    }
    
    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            Node* node = cache[key];
            node->val = value;
            remove(node);
            insertToHead(node);
        } else {
            if (cache.size() == capacity) {
                Node* lru = tail->prev;
                cache.erase(lru->key);
                remove(lru);
                delete lru;
            }
            Node* newNode = new Node(key, value);
            cache[key] = newNode;
            insertToHead(newNode);
        }
    }
};
```
- **Complexity:** T: O(1) for `get` and `put` | S: O(Capacity)

---

### Q22) LFU Cache
- **Problem:** Implement Least Frequently Used (LFU) Cache.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Two Hash Maps. `key -> Node` and `freq -> DoublyLinkedList`. A variable `minFreq` tracks the lowest frequency. When cache is full, pop from the tail of the DLL at `minFreq`. On access, move node to the DLL of `freq + 1` and update `minFreq` if its old DLL becomes empty.
- **C++ Code:**
```cpp
class LFUCache {
    struct Node {
        int key, val, freq;
        Node(int k, int v) : key(k), val(v), freq(1) {}
    };
    
    int capacity, minFreq;
    unordered_map<int, Node*> keyMap;
    // Map frequency to a list of iterators pointing to keys in order of usage
    unordered_map<int, list<int>> freqList; 
    unordered_map<int, list<int>::iterator> posMap;
    
    void updateFreq(Node* node) {
        int f = node->freq;
        freqList[f].erase(posMap[node->key]);
        if (freqList[f].empty() && minFreq == f) {
            minFreq++;
        }
        node->freq++;
        freqList[node->freq].push_front(node->key);
        posMap[node->key] = freqList[node->freq].begin();
    }
    
public:
    LFUCache(int cap) : capacity(cap), minFreq(0) {}
    
    int get(int key) {
        if (capacity == 0 || keyMap.find(key) == keyMap.end()) return -1;
        Node* node = keyMap[key];
        updateFreq(node);
        return node->val;
    }
    
    void put(int key, int value) {
        if (capacity == 0) return;
        
        if (keyMap.find(key) != keyMap.end()) {
            Node* node = keyMap[key];
            node->val = value;
            updateFreq(node);
        } else {
            if (keyMap.size() == capacity) {
                int lfuKey = freqList[minFreq].back();
                freqList[minFreq].pop_back();
                delete keyMap[lfuKey];
                keyMap.erase(lfuKey);
                posMap.erase(lfuKey);
            }
            
            Node* newNode = new Node(key, value);
            keyMap[key] = newNode;
            minFreq = 1;
            freqList[1].push_front(key);
            posMap[key] = freqList[1].begin();
        }
    }
};
```
- **Complexity:** T: O(1) for `get` and `put` | S: O(Capacity)

---
Here is the next batch of problems, continuing from exactly where we left off. This covers **Stack, Queue, Binary Search, Bit Manipulation, and Recursion & Backtracking** (Q23 to Q45).

---

## 🗂️ Stack

### Q23) Longest Valid Parentheses
- **Problem:** Find the length of the longest valid (well-formed) parentheses substring.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Use a stack to store indices. Push `-1` initially to act as a base for the first valid substring. For `(`, push its index. For `)`, pop the top. If the stack becomes empty, push the current index as the new base. If not empty, calculate length as `i - st.top()`.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> st;
        st.push(-1);
        int maxLen = 0;
        
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '(') {
                st.push(i);
            } else {
                st.pop();
                if (st.empty()) {
                    st.push(i); // Base for the next valid sequence
                } else {
                    maxLen = max(maxLen, i - st.top());
                }
            }
        }
        return maxLen;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q24) Insert Interval
*(Note: Categorized under Stack in some lists due to its relation to Merge Intervals, but optimal is 1D Array Traversal).*
- **Problem:** Insert a new interval into a list of sorted non-overlapping intervals and merge if necessary.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Linear Sweep. Iterate through the intervals. 1) Add all intervals completely before the new interval. 2) Merge all overlapping intervals by updating the new interval's start/end. 3) Add the merged new interval. 4) Add all remaining intervals.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();
        
        // 1. Skip (and add to output) all intervals that come before the 'newInterval'
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i++]);
        }
        
        // 2. Merge all overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        
        // 3. Add all the remaining intervals
        while (i < n) {
            res.push_back(intervals[i++]);
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N) for output array

---

### Q25) Sum of Subarray Minimums
- **Problem:** Find the sum of `min(b)` for every contiguous subarray `b`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Monotonic Increasing Stack. Find the Previous Smaller Element (PSE) and Next Smaller Element (NSE) for each element. The number of subarrays where `arr[i]` is the minimum is `(i - PSE) * (NSE - i)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size();
        int mod = 1e9 + 7;
        vector<int> left(n), right(n);
        stack<int> st;
        
        // Previous Smaller Element (strict less to handle duplicates uniquely)
        for (int i = 0; i < n; i++) {
            while (!st.empty() && arr[st.top()] > arr[i]) st.pop();
            left[i] = st.empty() ? -1 : st.top();
            st.push(i);
        }
        
        while (!st.empty()) st.pop();
        
        // Next Smaller Element (less or equal)
        for (int i = n - 1; i >= 0; i--) {
            while (!st.empty() && arr[st.top()] >= arr[i]) st.pop();
            right[i] = st.empty() ? n : st.top();
            st.push(i);
        }
        
        long long sum = 0;
        for (int i = 0; i < n; i++) {
            long long count = ((i - left[i]) * (right[i] - i)) % mod;
            sum = (sum + count * arr[i]) % mod;
        }
        return sum;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q26) Trapping Rain Water
- **Problem:** Compute how much water can be trapped between bars after raining.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Two Pointers (Optimal). Water at `i` depends on `min(max_left, max_right) - height[i]`. Instead of precomputing arrays, use two pointers `L` and `R`. The smaller max boundary dictates the water level for the current side.
- **C++ Code:**
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q27) Largest Rectangle in Histogram
- **Problem:** Find the area of the largest rectangle in a histogram.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Monotonic Increasing Stack. Push indices. If the current bar is shorter than the bar at the top of the stack, the top bar's boundary is found. Pop it, calculate its area using `height * width`, where width is `(current_index - new_top_index - 1)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0;
        int n = heights.size();
        
        for (int i = 0; i <= n; i++) {
            // Append 0 at the end to force flush the stack
            int currHeight = (i == n) ? 0 : heights[i];
            
            while (!st.empty() && currHeight < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                
                int w = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, h * w);
            }
            st.push(i);
        }
        
        return maxArea;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

## 🗂️ Queue

### Q28) Queue using Two Stacks
- **Problem:** Implement a FIFO queue using only two stacks.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Push elements to `stack1`. For `pop` or `peek`, if `stack2` is empty, pour everything from `stack1` into `stack2`. This reverses the LIFO order to FIFO. Pop/Peek from `stack2`.
- **C++ Code:**
```cpp
class MyQueue {
    stack<int> s1, s2;
    
    void transfer() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
    }
public:
    MyQueue() {}
    
    void push(int x) {
        s1.push(x);
    }
    
    int pop() {
        transfer();
        int val = s2.top();
        s2.pop();
        return val;
    }
    
    int peek() {
        transfer();
        return s2.top();
    }
    
    bool empty() {
        return s1.empty() && s2.empty();
    }
};
```
- **Complexity:** T: O(1) Amortized | S: O(N)

---

### Q29) Shortest Subarray with Sum at Least K
- **Problem:** Find the length of the shortest, non-empty, contiguous subarray with a sum of at least `K`. (Array contains negative numbers).
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Monotonic Deque with Prefix Sum. A sliding window fails due to negative numbers. Use a deque storing indices of prefix sums in monotonically increasing order. If `prefix[i] - prefix[dq.front()] >= K`, record the length and pop front. If `prefix[i] <= prefix[dq.back()]`, pop back (as it's a worse candidate).
- **C++ Code:**
```cpp
class Solution {
public:
    int shortestSubarray(vector<int>& nums, int k) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        
        deque<int> dq;
        int minLen = INT_MAX;
        
        for (int i = 0; i <= n; i++) {
            // Valid subarray found
            while (!dq.empty() && prefix[i] - prefix[dq.front()] >= k) {
                minLen = min(minLen, i - dq.front());
                dq.pop_front(); // We want shortest, so no need to keep this front
            }
            
            // Maintain monotonic increasing deque
            while (!dq.empty() && prefix[i] <= prefix[dq.back()]) {
                dq.pop_back(); // Remove worse candidates (larger prefix sum at earlier index)
            }
            
            dq.push_back(i);
        }
        
        return minLen == INT_MAX ? -1 : minLen;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

## 🗂️ Binary Search

### Q30) Search a 2D Matrix
- **Problem:** Search for a target value in an `m x n` matrix where rows are sorted and the first integer of a row is greater than the last of the previous.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Treat the 2D matrix as a flat 1D sorted array of length `m * n`. Calculate 2D coordinates using `row = mid / n` and `col = mid % n`. Perform standard Binary Search.
- **C++ Code:**
```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        
        int m = matrix.size();
        int n = matrix[0].size();
        int left = 0, right = m * n - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int mid_val = matrix[mid / n][mid % n];
            
            if (mid_val == target) return true;
            else if (mid_val < target) left = mid + 1;
            else right = mid - 1;
        }
        
        return false;
    }
};
```
- **Complexity:** T: O(log(M * N)) | S: O(1)

---

### Q31) Search in Rotated Sorted Array II
- **Problem:** Search in a rotated sorted array that may contain duplicates. Return `true` or `false`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Binary Search. Because of duplicates, `nums[low] == nums[mid] == nums[high]` can happen, making it impossible to know which half is sorted. In this case, simply shrink the bounds (`low++`, `high--`). Otherwise, check which half is sorted and evaluate the target.
- **C++ Code:**
```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (nums[mid] == target) return true;
            
            // Handle duplicates
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++; high--;
            }
            // Left half is sorted
            else if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            }
            // Right half is sorted
            else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return false;
    }
};
```
- **Complexity:** T: O(log N) Avg, O(N) Worst | S: O(1)

---

### Q32) Koko Eating Bananas
- **Problem:** Find the minimum integer eating speed `k` to eat all bananas within `H` hours.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Binary Search on Answer. The eating speed is between `1` and `max(piles)`. For a given speed `mid`, calculate total hours. If `hours <= H`, it's valid, try slower (search left). Otherwise, try faster (search right).
- **C++ Code:**
```cpp
class Solution {
    bool canEatInTime(vector<int>& piles, int speed, int h) {
        long long hours = 0;
        for (int p : piles) {
            hours += (p + speed - 1) / speed; // Math.ceil(p / speed)
        }
        return hours <= h;
    }
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int low = 1, high = 0;
        for (int p : piles) high = max(high, p);
        
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canEatInTime(piles, mid, h)) {
                ans = mid;
                high = mid - 1; // Try to find a slower valid speed
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};
```
- **Complexity:** T: O(N log(Max_Pile)) | S: O(1)

---

### Q33) Aggressive Cows
- **Problem:** Place `C` cows in `N` stalls such that the minimum distance between any two cows is maximized.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Binary Search on Answer. Sort the stalls. The minimum possible distance is `1`, maximum is `stalls[n-1] - stalls[0]`. For a given distance `mid`, place the 1st cow in the 1st stall, and greedily place subsequent cows if the distance is `>= mid`. If successful, search right (try larger distance).
- **C++ Code:**
```cpp
class Solution {
    bool canPlace(vector<int>& stalls, int cows, int dist) {
        int count = 1;
        int lastPlaced = stalls[0];
        for (int i = 1; i < stalls.size(); i++) {
            if (stalls[i] - lastPlaced >= dist) {
                count++;
                lastPlaced = stalls[i];
                if (count == cows) return true;
            }
        }
        return false;
    }
public:
    int solve(int n, int k, vector<int>& stalls) {
        sort(stalls.begin(), stalls.end());
        int low = 1;
        int high = stalls[n - 1] - stalls[0];
        int ans = 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canPlace(stalls, k, mid)) {
                ans = mid;
                low = mid + 1; // Try for a larger minimum distance
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
};
```
- **Complexity:** T: O(N log(Max_Dist)) | S: O(1)

---

### Q34) Median of Two Sorted Arrays
- **Problem:** Find the median of two sorted arrays of sizes `m` and `n`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Binary Search on the smaller array. Partition both arrays such that the total elements on the left half equal `(m + n + 1) / 2`. Check validity: `L1 <= R2` and `L2 <= R1`. If valid, calculate median. If `L1 > R2`, move partition left. Else, move right.
- **C++ Code:**
```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) {
            return findMedianSortedArrays(nums2, nums1); // Binary search on smaller array
        }
        
        int n1 = nums1.size();
        int n2 = nums2.size();
        int low = 0, high = n1;
        
        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = (n1 + n2 + 1) / 2 - cut1;
            
            int left1 = (cut1 == 0) ? INT_MIN : nums1[cut1 - 1];
            int left2 = (cut2 == 0) ? INT_MIN : nums2[cut2 - 1];
            int right1 = (cut1 == n1) ? INT_MAX : nums1[cut1];
            int right2 = (cut2 == n2) ? INT_MAX : nums2[cut2];
            if (left1 <= right2 && left2 <= right1) {
                // We found the correct partition
                if ((n1 + n2) % 2 == 0) {
                    return (max(left1, left2) + min(right1, right2)) / 2.0;
                } else {
                    return max(left1, left2);
                }
            } else if (left1 > right2) {
                // Move partition left
                high = cut1 - 1;
            } else {
                // Move partition right
                low = cut1 + 1;
            }
        }
        return 0.0;
    }
};
```
- **Complexity:** T: O(log(min(M, N))) | S: O(1)

---

### Q35) Kth Smallest Number in Multiplication Table
- **Problem:** Find the `k`-th smallest number in an `m x n` multiplication table.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Binary Search on Answer. The table values range from `1` to `m * n`. For a given number `mid`, count how many numbers in the table are `<= mid`. In the `i`-th row, the elements are `i, 2i, 3i...`, so there are `min(mid / i, n)` elements `<= mid`.
- **C++ Code:**
```cpp
class Solution {
    int countLessEqual(int mid, int m, int n) {
        int count = 0;
        for (int i = 1; i <= m; i++) {
            count += min(mid / i, n);
        }
        return count;
    }
public:
    int findKthNumber(int m, int n, int k) {
        int low = 1, high = m * n;
        int ans = 0;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (countLessEqual(mid, m, n) >= k) {
                ans = mid;
                high = mid - 1; // Try to find a smaller valid number
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};
```
- **Complexity:** T: O(M log(M * N)) | S: O(1)

---

## 🗂️ Bit Manipulation

### Q36) Gray Code
- **Problem:** Generate an `n`-bit Gray code sequence (a sequence where two successive values differ in only one bit).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** The `i`-th number in a Gray code sequence can be generated directly using the formula `i ^ (i >> 1)`. Generate this for all numbers from `0` to `2^n - 1`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int> res;
        int totalNumbers = 1 << n; // 2^n
        
        for (int i = 0; i < totalNumbers; i++) {
            res.push_back(i ^ (i >> 1));
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(2^N) | S: O(1) (excluding output)

---

### Q37) XOR Queries of a Subarray
- **Problem:** Given an array and queries `[L, R]`, compute the XOR of elements from `L` to `R`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Prefix XOR. Just like Prefix Sum, `Prefix[i]` stores XOR from index `0` to `i-1`. For a query `[L, R]`, the answer is `Prefix[R+1] ^ Prefix[L]`. (XORing the same number twice cancels it out).
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> xorQueries(vector<int>& arr, vector<vector<int>>& queries) {
        int n = arr.size();
        vector<int> prefixXor(n + 1, 0);
        
        for (int i = 0; i < n; i++) {
            prefixXor[i + 1] = prefixXor[i] ^ arr[i];
        }
        
        vector<int> res;
        for (auto& q : queries) {
            int L = q[0], R = q[1];
            res.push_back(prefixXor[R + 1] ^ prefixXor[L]);
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(N + Q) | S: O(N)

---

### Q38) Find Longest Awesome Substring
- **Problem:** Find the longest substring that can be rearranged into a palindrome.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Bitmask + Hash Map. A string can form a palindrome if at most one character has an odd frequency. Since digits are `0-9`, we use a 10-bit integer mask to track the even/odd state of each digit. If we've seen the same mask before, the substring between them has all even frequencies. Also, check masks differing by exactly one bit (one odd frequency).
- **C++ Code:**
```cpp
class Solution {
public:
    int longestAwesome(string s) {
        int n = s.length();
        int mask = 0;
        int maxLen = 0;
        
        // Map to store the first occurrence of each mask
        vector<int> seen(1024, n); 
        seen[0] = -1; // Base case: mask 0 at index -1
        
        for (int i = 0; i < n; i++) {
            int digit = s[i] - '0';
            mask ^= (1 << digit); // Toggle the bit for the digit
            
            // 1. All characters have even frequencies
            if (seen[mask] != n) {
                maxLen = max(maxLen, i - seen[mask]);
            } else {
                seen[mask] = i; // Store first occurrence
            }
            
            // 2. Exactly one character has an odd frequency
            for (int j = 0; j < 10; j++) {
                int flippedMask = mask ^ (1 << j);
                if (seen[flippedMask] != n) {
                    maxLen = max(maxLen, i - seen[flippedMask]);
                }
            }
        }
        
        return maxLen;
    }
};
```
- **Complexity:** T: O(10 * N) = O(N) | S: O(1024) = O(1)

---

## 🗂️ Recursion and Backtracking

### Q39) Sort a Stack
- **Problem:** Sort a stack recursively without using loops or other data structures.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Recursive pop until the stack is empty, then call a helper function `insertSorted` that recursively places the popped element in its correct sorted position before pushing elements back.
- **C++ Code:**
```cpp
class Solution {
    void insertSorted(stack<int>& s, int x) {
        if (s.empty() || x > s.top()) {
            s.push(x);
            return;
        }
        int temp = s.top();
        s.pop();
        insertSorted(s, x);
        s.push(temp);
    }
public:
    void sortStack(stack<int>& s) {
        if (!s.empty()) {
            int temp = s.top();
            s.pop();
            sortStack(s);
            insertSorted(s, temp);
        }
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N) for recursion stack

---

### Q40) Permutations
- **Problem:** Return all possible permutations of an array of distinct integers.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Backtracking. Swap the current index with every index from `start` to `N-1`. Recurse for the next index. Swap back to restore the original array (backtrack).
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& nums, int start, vector<vector<int>>& res) {
        if (start == nums.size()) {
            res.push_back(nums);
            return;
        }
        
        for (int i = start; i < nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(nums, start + 1, res);
            swap(nums[start], nums[i]); // backtrack
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        backtrack(nums, 0, res);
        return res;
    }
};
```
- **Complexity:** T: O(N * N!) | S: O(N)

---

### Q41) Combination Sum II
- **Problem:** Find all unique combinations that sum up to `target`. Each number may only be used once. Array may contain duplicates.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort the array to group duplicates. Backtrack by iterating from `start` to `N`. Skip the element if it's identical to the previous element in the *same* recursion loop `if (i > start && nums[i] == nums[i-1]) continue`.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& candidates, int target, int start, vector<int>& current, vector<vector<int>>& res) {
        if (target == 0) {
            res.push_back(current);
            return;
        }
        
        for (int i = start; i < candidates.size(); i++) {
            // Skip duplicates
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            // Prune if current element exceeds target
            if (candidates[i] > target) break;
            
            current.push_back(candidates[i]);
            backtrack(candidates, target - candidates[i], i + 1, current, res);
            current.pop_back(); // backtrack
        }
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> current;
        sort(candidates.begin(), candidates.end()); // Crucial for handling duplicates
        backtrack(candidates, target, 0, current, res);
        return res;
    }
};
```
- **Complexity:** T: O(2^N) Worst Case | S: O(N)

---

### Q42) N-Queens
- **Problem:** Place `n` queens on an `n x n` chessboard such that no two attack each other.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Backtracking with Hash Arrays. Place queens row by row. Use three boolean arrays to track safe spots in `O(1)`: column (`col`), main diagonal (`row - col`), and anti-diagonal (`row + col`).
- **C++ Code:**
```cpp
class Solution {
    void solve(int row, int n, vector<string>& board, vector<vector<string>>& res,
               vector<bool>& cols, vector<bool>& posDiag, vector<bool>& negDiag) {
        if (row == n) {
            res.push_back(board);
            return;
        }
        
        for (int col = 0; col < n; col++) {
            int pDiag = row - col + n - 1; // offset to prevent negative index
            int nDiag = row + col;
            
            if (cols[col] || posDiag[pDiag] || negDiag[nDiag]) continue;
            
            // Place Queen
            board[row][col] = 'Q';
            cols[col] = posDiag[pDiag] = negDiag[nDiag] = true;
            
            solve(row + 1, n, board, res, cols, posDiag, negDiag);
            
            // Backtrack
            board[row][col] = '.';
            cols[col] = posDiag[pDiag] = negDiag[nDiag] = false;
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        
        vector<bool> cols(n, false);
        vector<bool> posDiag(2 * n - 1, false);
        vector<bool> negDiag(2 * n - 1, false);
        
        solve(0, n, board, res, cols, posDiag, negDiag);
        return res;
    }
};
```
- **Complexity:** T: O(N!) | S: O(N)

---

### Q43) Subsets
- **Problem:** Return all possible subsets (the power set) of an array of unique elements.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Backtracking (Include/Exclude approach). For each element, branch into two paths: one where the element is included in the subset, and one where it is excluded.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& nums, int index, vector<int>& current, vector<vector<int>>& res) {
        if (index == nums.size()) {
            res.push_back(current);
            return;
        }
        
        // 1. Exclude current element
        backtrack(nums, index + 1, current, res);
        
        // 2. Include current element
        current.push_back(nums[index]);
        backtrack(nums, index + 1, current, res);
        
        // Backtrack
        current.pop_back();
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> current;
        backtrack(nums, 0, current, res);
        return res;
    }
};
```
- **Complexity:** T: O(2^N) | S: O(N)

---

### Q44) Rat in a Maze Problem
- **Problem:** Find all possible paths for a rat to reach the destination `(N-1, N-1)` from `(0, 0)` in a matrix, moving in directions D, L, R, U.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS / Backtracking. Mark cells as visited to avoid cycles. Explore in lexicographical order: `D`, `L`, `R`, `U` to ensure the output list is sorted naturally. Unmark cell on backtrack.
- **C++ Code:**
```cpp
class Solution{
    void solve(vector<vector<int>> &m, int n, int r, int c, string path, vector<string> &res) {
        if (r < 0 || r >= n || c < 0 || c >= n || m[r][c] == 0) return;
        
        if (r == n - 1 && c == n - 1) {
            res.push_back(path);
            return;
        }
        
        // Mark as visited
        m[r][c] = 0;
        
        // Explore Lexicographically: D, L, R, U
        solve(m, n, r + 1, c, path + "D", res);
        solve(m, n, r, c - 1, path + "L", res);
        solve(m, n, r, c + 1, path + "R", res);
        solve(m, n, r - 1, c, path + "U", res);
        
        // Backtrack (unmark)
        m[r][c] = 1;
    }
public:
    vector<string> findPath(vector<vector<int>> &m, int n) {
        vector<string> res;
        if (m[0][0] == 0) return res;
        solve(m, n, 0, 0, "", res);
        return res;
    }
};
```
- **Complexity:** T: O(4^(N^2)) | S: O(L * X) where L=length of path, X=number of paths

---

### Q45) Sudoku Solver
- **Problem:** Write a program to solve a Sudoku puzzle by filling empty cells.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Backtracking. Find the first empty cell (`.`). Try placing numbers `1-9`. Use an `isValid` function to check the row, column, and `3x3` sub-box. Recurse. If successful, return true; else, backtrack and try the next number.
- **C++ Code:**
```cpp
class Solution {
    bool isValid(vector<vector<char>>& board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == c) return false;
            if (board[row][i] == c) return false;
            // 3x3 block check
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }
    
    bool solve(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            
                            if (solve(board)) return true;
                            
                            board[i][j] = '.'; // Backtrack
                        }
                    }
                    return false; // No valid number found
                }
            }
        }
        return true; // Solved
    }
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
};
```
- **Complexity:** T: O(9^(Empty Cells)) | S: O(81) for Recursion Stack

---

## 🗂️ Tree

### Q46) Preorder, Postorder, Inorder in a Single Traversal
- **Problem:** Perform all three standard DFS traversals of a binary tree simultaneously.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use a Stack of `pair<TreeNode*, int>`. `int` tracks the state (`1` = Preorder, `2` = Inorder, `3` = Postorder). Based on state, add node to the respective list, increment state, and push left/right children.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> getTreeTraversal(TreeNode *root){
        vector<int> pre, in, post;
        if (!root) return {pre, in, post};
        
        stack<pair<TreeNode*, int>> st;
        st.push({root, 1});
        
        while (!st.empty()) {
            auto it = st.top();
            st.pop();
            
            // State 1: Preorder (Root, Left, Right)
            if (it.second == 1) {
                pre.push_back(it.first->val);
                it.second++;
                st.push(it);
                if (it.first->left) st.push({it.first->left, 1});
            }
            // State 2: Inorder (Left, Root, Right)
            else if (it.second == 2) {
                in.push_back(it.first->val);
                it.second++;
                st.push(it);
                if (it.first->right) st.push({it.first->right, 1});
            }
            // State 3: Postorder (Left, Right, Root)
            else {
                post.push_back(it.first->val);
            }
        }
        
        return {in, pre, post};
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q47) Construct Binary Tree from Preorder and Inorder Traversal
- **Problem:** Construct a unique binary tree given its preorder and inorder traversals.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Preorder array gives the root (first element). Search for this root in the inorder array to find left and right subtree sizes. Recursively pass array boundaries. Hashmap for `O(1)` inorder lookups.
- **C++ Code:**
```cpp
class Solution {
    int preIndex = 0;
    unordered_map<int, int> inMap;
    
    TreeNode* build(vector<int>& preorder, int inStart, int inEnd) {
        if (inStart > inEnd) return nullptr;
        
        int rootVal = preorder[preIndex++];
        TreeNode* root = new TreeNode(rootVal);
        
        int inIndex = inMap[rootVal];
        
        root->left = build(preorder, inStart, inIndex - 1);
        root->right = build(preorder, inIndex + 1, inEnd);
        
        return root;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }
        return build(preorder, 0, inorder.size() - 1);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q48) Binary Tree Right Side View
- **Problem:** Return the values of nodes you can see when looking at the tree from the right side.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Modified Pre-order Traversal (Root, Right, Left). Pass the `depth`. If the result list size equals `depth`, it means this is the first node we're visiting at this depth (which is the rightmost). Add it.
- **C++ Code:**
```cpp
class Solution {
    void dfs(TreeNode* root, int depth, vector<int>& res) {
        if (!root) return;
        
        if (res.size() == depth) {
            res.push_back(root->val);
        }
        
        dfs(root->right, depth + 1, res);
        dfs(root->left, depth + 1, res);
    }
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q49) Vertical Order Traversal of a Binary Tree
- **Problem:** Return the vertical order traversal of a binary tree. If two nodes have same `(row, col)`, sort by value.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** BFS with coordinates. Queue stores `pair<TreeNode*, pair<row, col>>`. Map structure `map<col, map<row, multiset<val>>>` naturally sorts columns, rows, and overlapping values.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        map<int, map<int, multiset<int>>> nodes;
        queue<pair<TreeNode*, pair<int, int>>> q;
        
        if (root) q.push({root, {0, 0}});
        
        while (!q.empty()) {
            auto p = q.front();
            q.pop();
            TreeNode* curr = p.first;
            int x = p.second.first;  // Column
            int y = p.second.second; // Row
            
            nodes[x][y].insert(curr->val);
            
            if (curr->left) q.push({curr->left, {x - 1, y + 1}});
            if (curr->right) q.push({curr->right, {x + 1, y + 1}});
        }
        
        vector<vector<int>> res;
        for (auto p : nodes) {
            vector<int> col;
            for (auto q : p.second) {
                col.insert(col.end(), q.second.begin(), q.second.end());
            }
            res.push_back(col);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N log N) (due to multiset and map) | S: O(N)

---

### Q50) All Nodes Distance K in Binary Tree
- **Problem:** Find all nodes at exactly distance `k` from the target node.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Convert tree to undirected graph by doing BFS/DFS to map each node to its `parent`. Then, do a standard BFS starting from the `target` node, moving to left child, right child, and parent, tracking distance until `distance == k`.
- **C++ Code:**
```cpp
class Solution {
    void buildParentMap(TreeNode* root, unordered_map<TreeNode*, TreeNode*>& parentMap) {
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* curr = q.front(); q.pop();
            if (curr->left) {
                parentMap[curr->left] = curr;
                q.push(curr->left);
            }
            if (curr->right) {
                parentMap[curr->right] = curr;
                q.push(curr->right);
            }
        }
    }
public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        unordered_map<TreeNode*, TreeNode*> parentMap;
        buildParentMap(root, parentMap);
        
        unordered_map<TreeNode*, bool> visited;
        queue<TreeNode*> q;
        q.push(target);
        visited[target] = true;
        
        int currDist = 0;
        
        while (!q.empty()) {
            if (currDist == k) break;
            currDist++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* curr = q.front(); q.pop();
                
                // Explore Left, Right, Parent
                if (curr->left && !visited[curr->left]) {
                    visited[curr->left] = true;
                    q.push(curr->left);
                }
                if (curr->right && !visited[curr->right]) {
                    visited[curr->right] = true;
                    q.push(curr->right);
                }
                if (parentMap[curr] && !visited[parentMap[curr]]) {
                    visited[parentMap[curr]] = true;
                    q.push(parentMap[curr]);
                }
            }
        }
        
        vector<int> res;
        while (!q.empty()) {
            res.push_back(q.front()->val);
            q.pop();
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q51) Binary Tree Maximum Path Sum
- **Problem:** Find the maximum path sum between any two nodes in a binary tree.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Post-order DFS. At each node, compute the max path sum extending to its left and right subtrees. Ignore negative paths (`max(0, ...)`). The max path passing through the current node is `val + left + right`. Update global maximum. The function returns `val + max(left, right)` to its parent.
- **C++ Code:**
```cpp
class Solution {
    int maxPath;
    
    int dfs(TreeNode* root) {
        if (!root) return 0;
        
        // Ignore paths that bring negative sums
        int leftPath = max(0, dfs(root->left));
        int rightPath = max(0, dfs(root->right));
        
        // Path utilizing both left and right via current root
        int currentPathSum = root->val + leftPath + rightPath;
        maxPath = max(maxPath, currentPathSum);
        
        // Return max path sum taking only one branch
        return root->val + max(leftPath, rightPath);
    }
public:
    int maxPathSum(TreeNode* root) {
        maxPath = INT_MIN;
        dfs(root);
        return maxPath;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q52) Lowest Common Ancestor of a Binary Tree
- **Problem:** Find the Lowest Common Ancestor (LCA) of nodes `p` and `q`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Recursive DFS. If root is null, or matches `p` or `q`, return `root`. Recurse left and right. If both return non-null, the current root is the LCA. Otherwise, pass up the non-null value.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Base case
        if (!root || root == p || root == q) {
            return root;
        }
        
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        
        // If both left and right return a node, this is the LCA
        if (left && right) {
            return root;
        }
        
        // Otherwise pass the found node upwards
        return left ? left : right;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q53) Minimum Distance Between BST Nodes
- **Problem:** Minimum difference between values of any two different nodes in a Binary Search Tree.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Inorder Traversal of a BST yields sorted values. Keep a pointer to the previously visited node to calculate the difference sequentially.
- **C++ Code:**
```cpp
class Solution {
    int minDiff = INT_MAX;
    TreeNode* prev = nullptr;
    
    void inorder(TreeNode* root) {
        if (!root) return;
        
        inorder(root->left);
        
        if (prev) {
            minDiff = min(minDiff, root->val - prev->val);
        }
        prev = root;
        
        inorder(root->right);
    }
public:
    int minDiffInBST(TreeNode* root) {
        inorder(root);
        return minDiff;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q54) Recover Binary Search Tree
- **Problem:** Two nodes of a BST were swapped. Recover the tree without changing its structure.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Inorder Traversal yields a sorted array. If swapped, there will be 1 or 2 dips (inversions) where `prev->val > curr->val`. Store the `first`, `middle`, and `last` nodes causing the violation, then swap their values.
- **C++ Code:**
```cpp
class Solution {
    TreeNode *first, *middle, *last, *prev;
    
    void inorder(TreeNode* root) {
        if (!root) return;
        
        inorder(root->left);
        
        if (prev && root->val < prev->val) {
            // If this is the first violation
            if (!first) {
                first = prev;
                middle = root;
            } 
            // If this is the second violation
            else {
                last = root;
            }
        }
        prev = root;
        
        inorder(root->right);
    }
public:
    void recoverTree(TreeNode* root) {
        first = middle = last = prev = nullptr;
        inorder(root);
        
        if (first && last) {
            swap(first->val, last->val); // Non-adjacent swap
        } else if (first && middle) {
            swap(first->val, middle->val); // Adjacent swap
        }
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q55) Lowest Common Ancestor of a Binary Search Tree
- **Problem:** Find LCA of two nodes in a BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Because of BST properties, if both `p` and `q` are smaller than `root`, LCA is in the left subtree. If both are larger, LCA is in the right. If they split (one smaller, one larger, or one equals root), `root` is the LCA. Iterative approach saves stack space.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) {
                root = root->left;
            } 
            else if (p->val > root->val && q->val > root->val) {
                root = root->right;
            } 
            else {
                // Split occurs, this is the LCA
                return root;
            }
        }
        return nullptr;
    }
};
```
- **Complexity:** T: O(H) | S: O(1) Iteratively.

---
Here is the next batch of problems, continuing exactly from where we left off. This covers **Heap, Greedy, and Dynamic Programming** (Q56 to Q77).

---

## 🗂️ Heap

### Q56) Task Scheduler
- **Problem:** Given an array of task characters and a cooldown `n`, find the minimum time to finish all tasks. Same tasks must be separated by `n` intervals.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Math / Greedy. Find the frequency of the most common task(s). The minimum time is dictated by these max frequency tasks. They create "blocks" of time. Total time is `(max_freq - 1) * (n + 1) + num_tasks_with_max_freq`. If the array length is larger than this formula, the answer is just the array length (no idle time needed).
- **C++ Code:**
```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> counts(26, 0);
        int maxFreq = 0;
        
        for (char c : tasks) {
            counts[c - 'A']++;
            maxFreq = max(maxFreq, counts[c - 'A']);
        }
        
        int maxCount = 0;
        for (int count : counts) {
            if (count == maxFreq) {
                maxCount++;
            }
        }
        
        int intervals = (maxFreq - 1) * (n + 1) + maxCount;
        int size = tasks.size();
        
        return max(intervals, size);
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q57) The Skyline Problem
- **Problem:** Output the skyline formed by a series of overlapping rectangular buildings.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Line Sweep + Max Heap. Create events for the left edge (add height) and right edge (remove height). Sort events by x-coordinate. A `multiset` acts as a max-heap that supports deleting specific values. If the maximum height in the set changes, record a new skyline point.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<pair<int, int>> edges;
        for (auto& b : buildings) {
            edges.push_back({b[0], -b[2]}); // Negative height for start edge to sort correctly
            edges.push_back({b[1], b[2]});  // Positive height for end edge
        }
        
        sort(edges.begin(), edges.end());
        
        multiset<int> activeHeights = {0}; // Ground level
        vector<vector<int>> res;
        int prevMax = 0;
        
        for (auto& edge : edges) {
            if (edge.second < 0) {
                activeHeights.insert(-edge.second);
            } else {
                activeHeights.erase(activeHeights.find(edge.second));
            }
            
            int currMax = *activeHeights.rbegin();
            if (currMax != prevMax) {
                res.push_back({edge.first, currMax});
                prevMax = currMax;
            }
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q58) Kth Largest Element in a Stream
- **Problem:** Design a class to find the `k`-th largest element in a stream of numbers.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Min-Heap. Maintain a Min-Heap of size `k`. When a new number comes, push it. If the heap size exceeds `k`, pop the top. The top element is always the `k`-th largest.
- **C++ Code:**
```cpp
class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;
public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k;
        for (int num : nums) {
            add(num);
        }
    }
    
    int add(int val) {
        minHeap.push(val);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
        return minHeap.top();
    }
};
```
- **Complexity:** T: O(N log K) for initialization, O(log K) for add | S: O(K)

---

### Q59) Find Median from Data Stream
- **Problem:** Find the median of a data stream in `O(1)` time after inserting in `O(log N)` time.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Two Heaps. A Max-Heap for the lower half of numbers and a Min-Heap for the upper half. Balance them so the Max-Heap size is either equal to the Min-Heap or greater by exactly 1.
- **C++ Code:**
```cpp
class MedianFinder {
    priority_queue<int> maxHeap; // Lower half
    priority_queue<int, vector<int>, greater<int>> minHeap; // Upper half
public:
    MedianFinder() {}
    
    void addNum(int num) {
        maxHeap.push(num);
        
        // Ensure every element in lower half is <= upper half
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        // Re-balance: MaxHeap should have equal or +1 elements
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        } else {
            return (maxHeap.top() + minHeap.top()) / 2.0;
        }
    }
};
```
- **Complexity:** T: O(log N) for `add`, O(1) for `find` | S: O(N)

---

## 🗂️ Greedy

### Q60) Minimum Platforms
- **Problem:** Find the minimum number of railway platforms required given arrival and departure times.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort arrivals and departures independently. Use two pointers to simulate the timeline. If an arrival is `<= ` departure, a train arrives, platform needed increases. If arrival `> ` departure, a train leaves, platform needed decreases. Track the max platforms needed at any point.
- **C++ Code:**
```cpp
class Solution {
public:
    int findPlatform(int arr[], int dep[], int n) {
        sort(arr, arr + n);
        sort(dep, dep + n);
        
        int platforms = 1, maxPlatforms = 1;
        int i = 1, j = 0; // i for arrival, j for departure
        
        while (i < n && j < n) {
            // Train arrives before or exactly when the other departs
            if (arr[i] <= dep[j]) {
                platforms++;
                i++;
            } 
            // Train departs
            else {
                platforms--;
                j++;
            }
            maxPlatforms = max(maxPlatforms, platforms);
        }
        
        return maxPlatforms;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(1)

---

### Q61) Fractional Knapsack
- **Problem:** Maximize the total value in a knapsack of capacity `W`. You can break items to maximize the value.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Greedy based on Unit Value. Sort items by `value / weight` descending. Take full items as long as they fit. For the remaining capacity, take the fractional amount of the next item.
- **C++ Code:**
```cpp
/* Assuming a standard Item struct: struct Item{ int value; int weight; }; */
class Solution {
    static bool comp(Item a, Item b) {
        double r1 = (double)a.value / (double)a.weight;
        double r2 = (double)b.value / (double)b.weight;
        return r1 > r2;
    }
public:
    double fractionalKnapsack(int W, Item arr[], int n) {
        sort(arr, arr + n, comp);
        
        int currentWeight = 0;
        double finalValue = 0.0;
        
        for (int i = 0; i < n; i++) {
            if (currentWeight + arr[i].weight <= W) {
                currentWeight += arr[i].weight;
                finalValue += arr[i].value;
            } else {
                int remain = W - currentWeight;
                finalValue += ((double)arr[i].value / (double)arr[i].weight) * (double)remain;
                break; // Knapsack is full
            }
        }
        return finalValue;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(1)

---

### Q62) Job Sequencing Problem
- **Problem:** Maximize total profit given jobs with deadlines and profits. Each job takes 1 unit of time.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort jobs by profit descending. Try to place each job in the latest possible time slot on or before its deadline. An array tracks filled slots. (A Disjoint Set Union can optimize slot finding, but array is standard).
- **C++ Code:**
```cpp
/* Assuming struct Job { int id; int dead; int profit; }; */
class Solution {
    static bool comp(Job a, Job b) {
        return a.profit > b.profit;
    }
public:
    vector<int> JobScheduling(Job arr[], int n) {
        sort(arr, arr + n, comp);
        
        int maxDeadline = 0;
        for (int i = 0; i < n; i++) {
            maxDeadline = max(maxDeadline, arr[i].dead);
        }
        
        vector<int> slot(maxDeadline + 1, -1);
        int jobCount = 0, totalProfit = 0;
        
        for (int i = 0; i < n; i++) {
            // Find a free slot starting from the latest possible deadline
            for (int j = arr[i].dead; j > 0; j--) {
                if (slot[j] == -1) {
                    slot[j] = arr[i].id;
                    jobCount++;
                    totalProfit += arr[i].profit;
                    break;
                }
            }
        }
        return {jobCount, totalProfit};
    }
};
```
- **Complexity:** T: O(N log N + N * maxDeadline) | S: O(maxDeadline)

---

### Q63) Patching Array
- **Problem:** Add minimum patches to an array such that any number in `[1, n]` can be formed by the sum of elements in the array.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Track the maximum reachable sum starting from 0. If `nums[i] <= reachable + 1`, we can safely extend our reachable sum to `reachable + nums[i]`. If not, we *must* patch the array with `reachable + 1`, extending reachable to `reachable + (reachable + 1)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int minPatches(vector<int>& nums, int n) {
        long long reachable = 0;
        int patches = 0;
        int i = 0;
        int size = nums.size();
        
        while (reachable < n) {
            if (i < size && nums[i] <= reachable + 1) {
                reachable += nums[i];
                i++;
            } else {
                reachable += (reachable + 1); // Patching `reachable + 1`
                patches++;
            }
        }
        return patches;
    }
};
```
- **Complexity:** T: O(N + log N) | S: O(1)

---

### Q64) Gas Station
- **Problem:** Find the starting gas station index that allows you to travel around the circular circuit once.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Greedy. If total gas < total cost, return -1. Traverse the array while keeping a `current_surplus`. If it drops below zero, the current starting point is invalid. The next possible starting point is `i + 1`. Reset surplus. Since total gas >= total cost, the last found starting point is guaranteed to succeed.
- **C++ Code:**
```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int totalSurplus = 0;
        int currentSurplus = 0;
        int startIndex = 0;
        
        for (int i = 0; i < gas.size(); i++) {
            int netGas = gas[i] - cost[i];
            totalSurplus += netGas;
            currentSurplus += netGas;
            
            if (currentSurplus < 0) {
                currentSurplus = 0;
                startIndex = i + 1;
            }
        }
        
        return totalSurplus < 0 ? -1 : startIndex;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

## 🗂️ Dynamic Programming

### Q65) Coin Change II
- **Problem:** Compute the number of combinations that make up an amount using given coins.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Unbounded Knapsack. 1D DP Array. `dp[i]` is the number of ways to make amount `i`. `dp[j] += dp[j - coin]`.
- **C++ Code:**
```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1; // 1 way to make amount 0 (use no coins)
        
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] += dp[j - coin];
            }
        }
        
        return dp[amount];
    }
};
```
- **Complexity:** T: O(N * Amount) | S: O(Amount)

---

### Q66) Partition Equal Subset Sum
- **Problem:** Determine if the array can be partitioned into two subsets such that their sums are equal.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 0/1 Knapsack. Sum all elements; if odd, return false. Target is `sum / 2`. DP array maps if a certain sum can be formed. Traverse `j` backward to avoid using the same item twice.
- **C++ Code:**
```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int x : nums) sum += x;
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
- **Complexity:** T: O(N * Target) | S: O(Target)

---

### Q67) Best Time to Buy and Sell Stock IV
- **Problem:** Max profit given at most `k` transactions.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** 2D DP. `dp[k][day]` = max profit. Or space optimize to 1D states for Buying and Selling. If `k >= n/2`, it reduces to infinite transactions (add all positive slopes). Otherwise, use DP arrays `buy[k]` and `sell[k]`.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n == 0 || k == 0) return 0;
        
        // If k is large enough, we can capture every positive slope
        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }
        
        // Space optimized DP
        vector<int> buy(k + 1, INT_MIN);
        vector<int> sell(k + 1, 0);
        
        for (int p : prices) {
            for (int i = 1; i <= k; i++) {
                // To buy the i-th stock, subtract price from i-1 th sell
                buy[i] = max(buy[i], sell[i - 1] - p);
                // To sell the i-th stock, add price to i-th buy
                sell[i] = max(sell[i], buy[i] + p);
            }
        }
        
        return sell[k];
    }
};
```
- **Complexity:** T: O(N * K) | S: O(K)

---

### Q68) Minimum Path Sum
- **Problem:** Minimum path sum from top-left to bottom-right in a grid.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 2D DP (or in-place modification). `grid[i][j] += min(grid[i-1][j], grid[i][j-1])`. Handle borders appropriately.
- **C++ Code:**
```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                if (i == 0) grid[i][j] += grid[i][j - 1];
                else if (j == 0) grid[i][j] += grid[i - 1][j];
                else grid[i][j] += min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        
        return grid[m - 1][n - 1];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(1) in-place

---

### Q69) Knapsack - 1
- **Problem:** Maximize value inside a knapsack of capacity `W`. Weights and values are up to `10^5` array length is up to `100`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Standard 0/1 Knapsack. Space-optimized 1D Array. `dp[w] = max(dp[w], dp[w - weight[i]] + value[i])`. Traversing `w` from `W` down to `weight[i]`.
- **C++ Code:**
```cpp
class Solution {
public:
    long long knapsack(int W, vector<int>& weight, vector<int>& value) {
        vector<long long> dp(W + 1, 0);
        
        for (int i = 0; i < weight.size(); i++) {
            // Traverse backwards for 0/1 knapsack to prevent using item twice
            for (int w = W; w >= weight[i]; w--) {
                dp[w] = max(dp[w], dp[w - weight[i]] + value[i]);
            }
        }
        
        return dp[W];
    }
};
```
- **Complexity:** T: O(N * W) | S: O(W)

---

### Q70) Knapsack - 2
- **Problem:** Same as Knapsack 1, but `W` is huge (up to `10^9`) and values are small (`10^5` max sum).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Since `W` is massive, a `dp[W]` array causes TLE/MLE. Instead, flip the state: `dp[value]` = minimum weight required to achieve exact `value`. Loop through all possible values, take the maximum value where `dp[value] <= W`.
- **C++ Code:**
```cpp
class Solution {
public:
    long long knapsack2(int W, vector<int>& weight, vector<int>& value) {
        int maxValueSum = 0;
        for (int v : value) maxValueSum += v;
        
        // dp[v] stores min weight to get exactly value v
        vector<long long> dp(maxValueSum + 1, 1e18); // Initialize to infinity
        dp[0] = 0; 
        
        for (int i = 0; i < weight.size(); i++) {
            for (int v = maxValueSum; v >= value[i]; v--) {
                if (dp[v - value[i]] != 1e18) {
                    dp[v] = min(dp[v], dp[v - value[i]] + weight[i]);
                }
            }
        }
        
        // Find max value where min weight is <= W
        for (int v = maxValueSum; v >= 0; v--) {
            if (dp[v] <= W) {
                return v;
            }
        }
        return 0;
    }
};
```
- **Complexity:** T: O(N * MaxValueSum) | S: O(MaxValueSum)

---

### Q71) Rod Cutting
- **Problem:** Maximize total value by cutting a rod of length `N`. The array gives prices for pieces of length `i`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Unbounded Knapsack. Pieces can be reused. `dp[i]` represents max profit for length `i`. `dp[i] = max(dp[i], price[piece] + dp[i - piece])`. Traverse forwards.
- **C++ Code:**
```cpp
class Solution {
public:
    int cutRod(vector<int>& price, int n) {
        vector<int> dp(n + 1, 0);
        
        // For every piece length possible
        for (int i = 1; i <= n; i++) {
            // See if this piece can fit and increase value
            for (int j = i; j <= n; j++) {
                dp[j] = max(dp[j], price[i - 1] + dp[j - i]);
            }
        }
        return dp[n];
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

---

### Q72) Largest Divisible Subset
- **Problem:** Find the largest subset where every pair `(i, j)` satisfies `i % j == 0` or `j % i == 0`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort the array first. This converts the problem into Longest Increasing Subsequence (LIS). If `nums[i] % nums[j] == 0`, and we know `nums[j]` belongs to a valid divisible subset, `nums[i]` can just append to it. Track `hash[i]` to reconstruct the subset.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return {};
        
        sort(nums.begin(), nums.end());
        
        vector<int> dp(n, 1);
        vector<int> hash(n);
        int maxIndex = 0;
        
        for (int i = 0; i < n; i++) {
            hash[i] = i;
            for (int j = 0; j < i; j++) {
                if (nums[i] % nums[j] == 0 && dp[i] < dp[j] + 1) {
                    dp[i] = dp[j] + 1;
                    hash[i] = j;
                }
            }
            if (dp[i] > dp[maxIndex]) {
                maxIndex = i;
            }
        }
        
        // Reconstruct subset
        vector<int> res;
        while (hash[maxIndex] != maxIndex) {
            res.push_back(nums[maxIndex]);
            maxIndex = hash[maxIndex];
        }
        res.push_back(nums[maxIndex]);
        
        // Reversing to make it strictly increasing, though not strictly required
        reverse(res.begin(), res.end()); 
        return res;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

---

### Q73) Longest Common Subsequence
- **Problem:** Find length of the longest common subsequence between two strings.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 2D DP. If `s1[i-1] == s2[j-1]`, then `dp[i][j] = 1 + dp[i-1][j-1]`. Else, take the max of excluding from either string `max(dp[i-1][j], dp[i][j-1])`. Space optimization to 1D Array.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestCommonSubsequence(string t1, string t2) {
        int m = t1.size(), n = t2.size();
        vector<int> prev(n + 1, 0), curr(n + 1, 0);
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (t1[i - 1] == t2[j - 1]) {
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
            prev = curr;
        }
        return prev[n];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(N)

---

### Q74) Edit Distance
- **Problem:** Min operations (Insert, Delete, Replace) to convert string `word1` to `word2`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 2D DP. Base cases equal the length of the string up to that point. If chars match, cost is 0 (`dp[i-1][j-1]`). If mismatch, cost is `1 + min(delete(i-1, j), insert(i, j-1), replace(i-1, j-1))`.
- **C++ Code:**
```cpp
class Solution {
public:
    int minDistance(string w1, string w2) {
        int m = w1.size(), n = w2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (w1[i - 1] == w2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({
                        dp[i - 1][j],    // Delete
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
- **Complexity:** T: O(M * N) | S: O(M * N) (Space can be optimized to O(N))

---

### Q75) Count Square Submatrices with All Ones
- **Problem:** Count total square submatrices that contain only ones.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Grid DP. `dp[i][j]` represents the side length of the maximum square whose bottom-right corner is `(i, j)`. It also exactly equals the number of valid squares ending at `(i, j)`. Formula: `min(up, left, diag_up_left) + 1`. Sum them up.
- **C++ Code:**
```cpp
class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        int count = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1 && i > 0 && j > 0) {
                    matrix[i][j] = min({matrix[i - 1][j], 
                                        matrix[i][j - 1], 
                                        matrix[i - 1][j - 1]}) + 1;
                }
                count += matrix[i][j];
            }
        }
        return count;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(1) in-place modification

---

### Q76) Number of Submatrices That Sum to Target
- **Problem:** Find number of submatrices that sum to target.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Prefix Sum Array on rows. Then fix the left and right column boundaries, creating a flattened 1D array view. Run the standard "Subarray Sum Equals K" hashing algorithm on this 1D vertical view.
- **C++ Code:**
```cpp
class Solution {
public:
    int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        
        // 1. Calculate row prefix sums
        for (int i = 0; i < m; i++) {
            for (int j = 1; j < n; j++) {
                matrix[i][j] += matrix[i][j - 1];
            }
        }
        
        int count = 0;
        // 2. Fix the left and right columns
        for (int c1 = 0; c1 < n; c1++) {
            for (int c2 = c1; c2 < n; c2++) {
                
                unordered_map<int, int> prefixMap;
                prefixMap[0] = 1;
                int sum = 0;
                
                // Top-down 1D sliding sum
                for (int r = 0; r < m; r++) {
                    int val = matrix[r][c2] - (c1 > 0 ? matrix[r][c1 - 1] : 0);
                    sum += val;
                    
                    if (prefixMap.find(sum - target) != prefixMap.end()) {
                        count += prefixMap[sum - target];
                    }
                    prefixMap[sum]++;
                }
            }
        }
        
        return count;
    }
};
```
- **Complexity:** T: O(M * N^2) | S: O(M) for hashmap

---

### Q77) Burst Balloons
- **Problem:** Maximize coins by bursting balloons. Bursting `i` yields `nums[i-1] * nums[i] * nums[i+1]`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Interval DP. Instead of thinking which balloon to burst *first*, think about which balloon to burst *LAST* in a given interval `(l, r)`. This isolates the left and right subproblems.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        // Pad with 1s at boundaries
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        int n = nums.size();
        
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        // Length of the window
        for (int len = 2; len < n; len++) {
            for (int l = 0; l < n - len; l++) {
                int r = l + len;
                // k is the index of the balloon burst LAST in (l, r)
                for (int k = l + 1; k < r; k++) {
                    dp[l][r] = max(dp[l][r], 
                                   nums[l] * nums[k] * nums[r] + dp[l][k] + dp[k][r]);
                }
            }
        }
        
        return dp[0][n - 1];
    }
};
```
- **Complexity:** T: O(N^3) | S: O(N^2)

---
Here is the final batch of problems, continuing exactly from where we left off. This covers the remaining **Dynamic Programming, Graph, and Advanced Algorithms** (Q78 to Q97).

---

### Q78) Sum of Distances in Tree
- **Problem:** Find sum of path distances to all nodes for every node.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Tree DP. Two DFS passes. 
  1. Bottom-up: find sizes of subtrees and `ans` for the root (0).
  2. Top-down: Shift the root. Moving from parent to child: `ans[child] = ans[parent] - count[child] + (N - count[child])`.
- **C++ Code:**
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
                // Moving closer to subtree `i` saves distance for `count[i]` nodes,
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

### Q79) Maximum Subarray
- **Problem:** Find the contiguous subarray with the largest sum.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Kadane’s Algorithm. Keep a running sum. If the sum drops below zero, reset it to zero (since a negative prefix will only drag down future sums). Track the global maximum.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = INT_MIN;
        int currentSum = 0;
        
        for (int num : nums) {
            currentSum += num;
            
            if (currentSum > maxSum) {
                maxSum = currentSum;
            }
            
            if (currentSum < 0) {
                currentSum = 0;
            }
        }
        
        return maxSum;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

## 🗂️ Graph

### Q80) Clone Graph
- **Problem:** Return a deep copy (clone) of a graph given a reference node.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS/BFS with Hash Map. Map stores `original_node -> cloned_node`. Traverse the original graph; if a neighbor isn't in the map, clone it and recursively explore it. Link cloned nodes' neighbors.
- **C++ Code:**
```cpp
/* Assuming standard Node class: class Node { public: int val; vector<Node*> neighbors; }; */
class Solution {
    unordered_map<Node*, Node*> clones;
    
    Node* dfs(Node* node) {
        if (!node) return nullptr;
        
        // If already cloned, return the clone to prevent infinite loops
        if (clones.find(node) != clones.end()) {
            return clones[node];
        }
        
        // Create new clone and add to map
        Node* cloneNode = new Node(node->val);
        clones[node] = cloneNode;
        
        // Clone all neighbors
        for (Node* neighbor : node->neighbors) {
            cloneNode->neighbors.push_back(dfs(neighbor));
        }
        
        return cloneNode;
    }
public:
    Node* cloneGraph(Node* node) {
        return dfs(node);
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q81) Detect Cycles in 2D Grid
- **Problem:** Check if there is a cycle of the same value in a 2D grid. The cycle must have a length of at least 4.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS or BFS. Traverse cells matching the start character. Pass the `parent_x` and `parent_y` coordinates to avoid backtracking. If you hit an already visited cell that isn't the direct parent, a cycle exists.
- **C++ Code:**
```cpp
class Solution {
    int dirs[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    
    bool dfs(vector<vector<char>>& grid, vector<vector<bool>>& visited, int x, int y, int px, int py, char val) {
        visited[x][y] = true;
        
        for (auto& d : dirs) {
            int nx = x + d[0], ny = y + d[1];
            
            if (nx >= 0 && nx < grid.size() && ny >= 0 && ny < grid[0].size() && grid[nx][ny] == val) {
                if (!visited[nx][ny]) {
                    if (dfs(grid, visited, nx, ny, x, y, val)) return true;
                } 
                // Visited and not the direct parent
                else if (nx != px || ny != py) {
                    return true;
                }
            }
        }
        return false;
    }
public:
    bool containsCycle(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (!visited[i][j]) {
                    if (dfs(grid, visited, i, j, -1, -1, grid[i][j])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q82) Is Graph Bipartite?
- **Problem:** Determine if an undirected graph is bipartite.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Graph Coloring (BFS/DFS). Assign nodes a color (`1` or `-1`). Unvisited nodes are `0`. If an adjacent node has the same color as the current node, the graph is not bipartite. Traverse all disconnected components.
- **C++ Code:**
```cpp
class Solution {
    bool bfs(int start, vector<vector<int>>& graph, vector<int>& color) {
        queue<int> q;
        q.push(start);
        color[start] = 1;
        
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            
            for (int v : graph[u]) {
                if (color[v] == 0) {
                    color[v] = -color[u]; // Color with opposite color
                    q.push(v);
                } else if (color[v] == color[u]) {
                    return false; // Collision detected
                }
            }
        }
        return true;
    }
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, 0);
        
        // Check all components
        for (int i = 0; i < n; i++) {
            if (color[i] == 0) {
                if (!bfs(i, graph, color)) {
                    return false;
                }
            }
        }
        return true;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q83) Course Schedule II
- **Problem:** Return the ordering of courses to take given a list of prerequisite pairs `[A, B]` (must take B before A).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Topological Sort (Kahn's Algorithm). Build an adjacency list and in-degree array. Queue all nodes with in-degree 0. While queue is not empty, pop a node, add to result, and decrement in-degrees of neighbors. If neighbor in-degree hits 0, push to queue. If result size `!=` total courses, a cycle exists.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        
        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
            inDegree[pre[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        vector<int> topoOrder;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            topoOrder.push_back(u);
            
            for (int v : adj[u]) {
                inDegree[v]--;
                if (inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }
        
        if (topoOrder.size() == numCourses) return topoOrder;
        return {}; // Cycle detected
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

---

### Q84) Count Sub Islands
- **Problem:** Count islands in `grid2` that are entirely contained within an island in `grid1`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Run DFS on islands in `grid2`. While traversing, check if the corresponding cell in `grid1` is `1`. If any cell of the `grid2` island overlaps a `0` in `grid1`, it is not a sub-island.
- **C++ Code:**
```cpp
class Solution {
    int dirs[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    
    bool dfs(vector<vector<int>>& grid1, vector<vector<int>>& grid2, int x, int y) {
        int m = grid2.size(), n = grid2[0].size();
        
        // If this part of grid2 is land, but grid1 is water, not a sub-island
        bool isSub = (grid1[x][y] == 1);
        
        // Mark as visited by sinking it
        grid2[x][y] = 0;
        
        for (auto& d : dirs) {
            int nx = x + d[0], ny = y + d[1];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid2[nx][ny] == 1) {
                // Must use bitwise AND or ensure DFS executes fully. 
                // Do not short-circuit with `&&` to ensure entire island is sunk.
                bool res = dfs(grid1, grid2, nx, ny);
                isSub = isSub && res; 
            }
        }
        
        return isSub;
    }
public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        int count = 0;
        int m = grid2.size(), n = grid2[0].size();
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid2[i][j] == 1) {
                    if (dfs(grid1, grid2, i, j)) {
                        count++;
                    }
                }
            }
        }
        
        return count;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q85) Rotting Oranges
- **Problem:** Time required to rot all oranges. A rotten orange rots adjacent fresh oranges in 1 minute.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Multi-source BFS. Queue all initial rotten oranges. Track fresh orange count. Expand layer by layer (minute by minute) converting fresh to rotten and decrementing the fresh count.
- **C++ Code:**
```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        
        if (fresh == 0) return 0;
        
        int dirs[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int time = 0;
        
        while (!q.empty()) {
            int size = q.size();
            bool rotted = false; // Check if we actually rotted any orange this minute
            
            for (int i = 0; i < size; i++) {
                auto [r, c] = q.front();
                q.pop();
                
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; // Make it rotten
                        q.push({nr, nc});
                        fresh--;
                        rotted = true;
                    }
                }
            }
            if (rotted) time++;
        }
        
        return fresh == 0 ? time : -1;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q86) 01 Matrix
- **Problem:** Distance of the nearest 0 for each cell containing a 1.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Multi-source BFS. Push all `0`s into a queue and mark `1`s with `INFINITY`. Pop `0`s and update neighbors with `dist + 1`. Alternatively, perform two DP passes (Top-Left then Bottom-Right) for `O(1)` space.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        int maxDist = m + n; // A value strictly larger than any possible path
        
        // First Pass: Check Top and Left
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) continue;
                
                int top = maxDist, left = maxDist;
                if (i > 0) top = mat[i - 1][j];
                if (j > 0) left = mat[i][j - 1];
                
                mat[i][j] = min(top, left) + 1;
            }
        }
        
        // Second Pass: Check Bottom and Right
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (mat[i][j] == 0) continue;
                
                int bottom = maxDist, right = maxDist;
                if (i < m - 1) bottom = mat[i + 1][j];
                if (j < n - 1) right = mat[i][j + 1];
                
                mat[i][j] = min(mat[i][j], min(bottom, right) + 1);
            }
        }
        
        return mat;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(1) in-place

---
Here is the continuation of **Q87 (Investigation)**, followed by the remaining problems on your list (up to **Q97**).

---

### Q87) Investigation (Completed)
- **Problem:** In a directed graph with edge costs, find the min price from `1` to `N`, total paths with min price, min flights on a min price path, and max flights on a min price path.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Modified Dijkstra's Algorithm. Keep 4 state arrays tracking distance (`dist`), number of ways (`ways`), min flights (`minF`), and max flights (`maxF`).
- **C++ Code:**
```cpp
class Solution {
public:
    void investigateGraph(int n, vector<vector<int>>& edges) {
        vector<vector<pair<int, long long>>> adj(n + 1);
        for (auto& e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
        }
        
        long long INF = 1e18;
        int MOD = 1e9 + 7;
        
        vector<long long> dist(n + 1, INF);
        vector<long long> ways(n + 1, 0);
        vector<int> minF(n + 1, 0);
        vector<int> maxF(n + 1, 0);
        
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
        
        dist[1] = 0;
        ways[1] = 1;
        pq.push({0, 1});
        
        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();
            
            // If we've found a strictly shorter path since this was pushed, skip it
            if (d > dist[u]) continue;
            
            for (auto& edge : adj[u]) {
                int v = edge.first;
                long long w = edge.second;
                
                // 1. Found a strictly shorter path
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    ways[v] = ways[u];
                    minF[v] = minF[u] + 1;
                    maxF[v] = maxF[u] + 1;
                    pq.push({dist[v], v});
                } 
                // 2. Found another path with the exact same minimum cost
                else if (d + w == dist[v]) {
                    ways[v] = (ways[v] + ways[u]) % MOD;
                    minF[v] = min(minF[v], minF[u] + 1);
                    maxF[v] = max(maxF[v], maxF[u] + 1);
                }
            }
        }
        
        // Output format: [min_price, ways, min_flights, max_flights]
        cout << dist[n] << " " << ways[n] << " " << minF[n] << " " << maxF[n] << endl;
    }
};
```
- **Complexity:** T: O(E log V) | S: O(V + E)

---

### Q88) Find the City With the Smallest Number of Neighbors at a Threshold Distance
- **Problem:** Return the city with the smallest number of reachable cities within a threshold distance. If there is a tie, return the city with the greatest number.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Floyd-Warshall Algorithm. Since `N <= 100`, an `O(N^3)` algorithm is perfectly fine. Compute All-Pairs Shortest Path, then count how many cities have distance `<= threshold` for each city.
- **C++ Code:**
```cpp
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        vector<vector<int>> dist(n, vector<int>(n, 10001)); // Max possible distance
        
        for (int i = 0; i < n; i++) dist[i][i] = 0;
        
        for (auto& e : edges) {
            dist[e[0]][e[1]] = e[2];
            dist[e[1]][e[0]] = e[2];
        }
        
        // Floyd-Warshall
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        
        int minReachable = n;
        int resCity = -1;
        
        for (int i = 0; i < n; i++) {
            int reachable = 0;
            for (int j = 0; j < n; j++) {
                if (i != j && dist[i][j] <= distanceThreshold) {
                    reachable++;
                }
            }
            
            if (reachable <= minReachable) {
                minReachable = reachable;
                resCity = i; // Will automatically update to larger index on ties
            }
        }
        
        return resCity;
    }
};
```
- **Complexity:** T: O(N^3) | S: O(N^2)

---

### Q89) Accounts Merge
- **Problem:** Given lists of accounts containing emails, merge accounts if they share at least one email.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Disjoint Set Union (DSU). Map each email to a unique integer ID. Union the IDs of all emails within the same account. Group emails by their DSU root, sort them, and attach the original account name.
- **C++ Code:**
```cpp
class DSU {
    vector<int> parent;
public:
    DSU(int n) {
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    
    void unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI != rootJ) {
            parent[rootI] = rootJ;
        }
    }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        DSU dsu(n);
        
        // email -> account index
        unordered_map<string, int> emailMap;
        
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                string email = accounts[i][j];
                if (emailMap.find(email) != emailMap.end()) {
                    dsu.unite(i, emailMap[email]);
                } else {
                    emailMap[email] = i;
                }
            }
        }
        
        // Root account index -> list of emails
        unordered_map<int, vector<string>> mergedAccounts;
        for (auto& [email, idx] : emailMap) {
            int root = dsu.find(idx);
            mergedAccounts[root].push_back(email);
        }
        
        vector<vector<string>> res;
        for (auto& [root, emails] : mergedAccounts) {
            sort(emails.begin(), emails.end());
            vector<string> account(emails.size() + 1);
            account[0] = accounts[root][0]; // Name
            for (int i = 0; i < emails.size(); i++) {
                account[i + 1] = emails[i];
            }
            res.push_back(account);
        }
        
        return res;
    }
};
```
- **Complexity:** T: O(N log N) where N is total emails (due to sorting) | S: O(N)

---

### Q90) Prim’s Minimum Spanning Tree (MST)
- **Problem:** Find the Minimum Spanning Tree of a connected, undirected graph.
- **Difficulty:** Theory / Medium
- **Concept / Optimal Algo:** Greedy Algorithm. Start with an arbitrary node. Use a Min-Heap to pick the minimum weight edge that connects an unvisited node to the growing MST. Add the edge cost to the total and push the node's neighbors into the heap.
- **C++ Code:**
```cpp
class Solution {
public:
    int spanningTree(int V, vector<vector<int>> adj[]) {
        // Priority Queue: {weight, node}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        vector<bool> visited(V, false);
        
        pq.push({0, 0});
        int mstCost = 0;
        
        while (!pq.empty()) {
            auto [wt, u] = pq.top();
            pq.pop();
            
            if (visited[u]) continue; // Skip if already in MST
            
            visited[u] = true;
            mstCost += wt;
            
            for (auto& edge : adj[u]) {
                int v = edge[0];
                int edgeWeight = edge[1];
                
                if (!visited[v]) {
                    pq.push({edgeWeight, v});
                }
            }
        }
        return mstCost;
    }
};
```
- **Complexity:** T: O(E log V) | S: O(V + E)

---

### Q91) Kruskal’s Minimum Spanning Tree
- **Problem:** Find the Minimum Spanning Tree of a connected, undirected graph.
- **Difficulty:** Theory / Medium
- **Concept / Optimal Algo:** Greedy Algorithm with DSU. Sort all edges by weight ascending. Iterate over edges. If an edge connects two disjoint sets (using DSU), add it to the MST. Stop when `V-1` edges are added.
- **C++ Code:**
```cpp
class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    
    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
            else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true;
        }
        return false;
    }
};

class Solution {
public:
    int spanningTree(int V, vector<vector<int>>& edges) {
        // Sort edges by weight
        sort(edges.begin(), edges.end(), [](vector<int>& a, vector<int>& b) {
            return a[2] < b[2];
        });
        
        DSU dsu(V);
        int mstCost = 0;
        int edgeCount = 0;
        
        for (auto& e : edges) {
            int u = e[0], v = e[1], wt = e[2];
            
            if (dsu.unite(u, v)) {
                mstCost += wt;
                edgeCount++;
                if (edgeCount == V - 1) break; // Optimization
            }
        }
        
        return mstCost;
    }
};
```
- **Complexity:** T: O(E log E) | S: O(V)

---

## 🗂️ Advanced Algorithms

### Q92) KMP Algorithm for Pattern Searching
- **Problem:** Find all occurrences of a pattern in a text in `O(N + M)` time.
- **Difficulty:** Theory / Medium
- **Concept / Optimal Algo:** Precompute an LPS (Longest Prefix Suffix) array for the pattern. During text matching, if a mismatch occurs, use the LPS array to skip characters rather than restarting from the beginning of the pattern.
- **C++ Code:**
```cpp
class Solution {
    vector<int> computeLPS(string& pat) {
        int m = pat.size();
        vector<int> lps(m, 0);
        int len = 0, i = 1;
        
        while (i < m) {
            if (pat[i] == pat[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1]; // Fallback
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }
public:
    vector<int> search(string pat, string txt) {
        vector<int> res;
        int m = pat.size(), n = txt.size();
        if (m == 0 || n == 0 || m > n) return res;
        
        vector<int> lps = computeLPS(pat);
        int i = 0, j = 0;
        
        while (i < n) {
            if (pat[j] == txt[i]) {
                i++; j++;
            }
            if (j == m) {
                res.push_back(i - j); // Match found at index (i-j)
                j = lps[j - 1];       // Continue searching
            } else if (i < n && pat[j] != txt[i]) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N + M) | S: O(M)

---

### Q93) Rabin-Karp Algorithm for Pattern Searching
- **Problem:** Pattern matching using Rolling Hash.
- **Difficulty:** Theory / Medium
- **Concept / Optimal Algo:** Calculate a hash for the pattern and the first window of text. Slide the window by subtracting the leading character's hash and adding the trailing character's hash. If hashes match, verify char by char to avoid collisions.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> search(string pat, string txt) {
        vector<int> res;
        int M = pat.size();
        int N = txt.size();
        int d = 256;         // Characters in alphabet
        int q = 1000000007;  // Prime modulo
        
        int p = 0, t = 0; // Hash values
        long long h = 1;
        
        // Compute h = pow(d, M-1) % q
        for (int i = 0; i < M - 1; i++) {
            h = (h * d) % q;
        }
        
        // Calculate initial hashes
        for (int i = 0; i < M; i++) {
            p = (d * p + pat[i]) % q;
            t = (d * t + txt[i]) % q;
        }
        
        for (int i = 0; i <= N - M; i++) {
            // Check if hashes match
            if (p == t) {
                bool match = true;
                for (int j = 0; j < M; j++) {
                    if (txt[i + j] != pat[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) res.push_back(i);
            }
            
            // Calculate hash for next window
            if (i < N - M) {
                t = (d * (t - txt[i] * h) + txt[i + M]) % q;
                if (t < 0) t += q; // Fix negative modulo
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N + M) Avg, O(N * M) Worst (Hash Collisions) | S: O(1)

---

### Q94) Z Algorithm (Linear-Time Pattern Searching)
- **Problem:** Pattern matching in linear time.
- **Difficulty:** Theory / Hard
- **Concept / Optimal Algo:** Concatenate `pattern + "$" + text`. Create a Z-array where `Z[i]` represents the length of the longest substring starting from `i` that matches the prefix of the string. Maintain an active prefix window `[L, R]`.
- **C++ Code:**
```cpp
class Solution {
    vector<int> computeZ(string s) {
        int n = s.size();
        vector<int> Z(n, 0);
        int L = 0, R = 0;
        
        for (int i = 1; i < n; i++) {
            if (i > R) {
                L = R = i;
                while (R < n && s[R - L] == s[R]) R++;
                Z[i] = R - L;
                R--;
            } else {
                int k = i - L;
                if (Z[k] < R - i + 1) {
                    Z[i] = Z[k];
                } else {
                    L = i;
                    while (R < n && s[R - L] == s[R]) R++;
                    Z[i] = R - L;
                    R--;
                }
            }
        }
        return Z;
    }
public:
    vector<int> search(string pat, string txt) {
        string concat = pat + "$" + txt;
        int l = concat.size();
        vector<int> Z = computeZ(concat);
        
        vector<int> res;
        for (int i = 0; i < l; i++) {
            // If Z value equals pattern length, a match is found
            if (Z[i] == pat.size()) {
                res.push_back(i - pat.size() - 1); // Extract index from original txt
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N + M) | S: O(N + M)

---

### Q95) Find Substring with Given Hash Value
- **Problem:** Reverse rolling hash. Find substring of length `k` with hash value matching `hashValue`. Formula: `val[s[i]] * power^i`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Calculate rolling hash from Right to Left. Because `pow^k` grows too large, sliding from Left to Right requires modular division. By going backwards, we naturally multiply the old hash by `power`, making it safe under modulo. Keep the index of the last valid substring encountered.
- **C++ Code:**
```cpp
class Solution {
public:
    string subStrHash(string s, int power, int modulo, int k, int hashValue) {
        int n = s.size();
        long long currentHash = 0;
        long long p_k = 1; // p^k % m
        int bestIndex = 0;
        
        for (int i = 0; i < k; i++) {
            p_k = (p_k * power) % modulo;
        }
        
        // Traverse backwards to avoid modular inverse
        for (int i = n - 1; i >= 0; i--) {
            int val = s[i] - 'a' + 1;
            
            // new hash = (old hash * power + new char) % modulo
            currentHash = (currentHash * power + val) % modulo;
            
            if (i + k < n) {
                int outgoingVal = s[i + k] - 'a' + 1;
                // Subtract the outgoing character
                currentHash = (currentHash - outgoingVal * p_k % modulo + modulo) % modulo;
            }
            
            if (currentHash == hashValue) {
                bestIndex = i; // Will naturally capture the FIRST valid substring index
            }
        }
        
        return s.substr(bestIndex, k);
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q96) Implement Trie (Prefix Tree)
- **Problem:** Implement a Trie with `insert`, `search`, and `startsWith` functions.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Array of pointers (26 for lowercase letters). Traversal string char by char. If pointer doesn't exist, create it. At the end of the word, flip `isEnd = true`.
- **C++ Code:**
```cpp
class TrieNode {
public:
    TrieNode* children[26];
    bool isEnd;
    
    TrieNode() {
        isEnd = false;
        for (int i = 0; i < 26; i++) {
            children[i] = nullptr;
        }
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() {
        root = new TrieNode();
    }
    
    void insert(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
        }
        curr->isEnd = true;
    }
    
    bool search(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return curr->isEnd;
    }
    
    bool startsWith(string prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return true;
    }
};
```
- **Complexity:** T: O(L) where L is string length | S: O(N * L) total space

---

### Q97) Maximum XOR of Two Numbers in an Array
- **Problem:** Find the max result of `nums[i] XOR nums[j]`.
- **Difficulty:** Medium (Trie Approach)
- **Concept / Optimal Algo:** Bitwise Trie. Insert all numbers into a Binary Trie (`0` and `1` children) from MSB (31st bit) to LSB (0th bit). Then query each number: to maximize XOR, try to go to the *opposite* bit in the Trie at every level.
- **C++ Code:**
```cpp
class TrieNode {
public:
    TrieNode* child[2];
    TrieNode() { child[0] = child[1] = nullptr; }
};

class Solution {
    TrieNode* root;
    
    void insert(int num) {
        TrieNode* curr = root;
        // Start from Most Significant Bit
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (!curr->child[bit]) {
                curr->child[bit] = new TrieNode();
            }
            curr = curr->child[bit];
        }
    }
    
    int getMaxXOR(int num) {
        TrieNode* curr = root;
        int maxXOR = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int oppBit = 1 - bit;
            
            // Try to find opposite bit to maximize XOR
            if (curr->child[oppBit]) {
                maxXOR = maxXOR | (1 << i);
                curr = curr->child[oppBit];
            } else {
                curr = curr->child[bit];
            }
        }
        return maxXOR;
    }
    
public:
    int findMaximumXOR(vector<int>& nums) {
        root = new TrieNode();
        for (int num : nums) insert(num);
        
        int ans = 0;
        for (int num : nums) {
            ans = max(ans, getMaxXOR(num));
        }
        return ans;
    }
};
```
- **Complexity:** T: O(N) since bits = 32 | S: O(N)

---
*This successfully completes your requested list!*