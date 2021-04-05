---
title: LeetCode做题记录
categories:
- Algorithm
tags:
- 算法
- 数据结构

date: 2019/05/03 23:47:41
---
个人LeetCode记录，持续更新中……

<!--more-->

#### [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9

所以返回 [0, 1]

```
var twoSum = function(nums, target) {
    let arr = [],length = nums.length;
    for(let i = 0;i<length;++i){
        let temp = target - nums[i];
        if(arr[temp]!=undefined){
            return [nums.indexOf(temp),i]
        }else{
            arr[nums[i]]=nums[i]
        }
    }
};
```

**哈希表**的方法，用空间换时间，用数组的结构，要用indexOf查询下标，耗时

**执行用时 :104 ms, 在所有 JavaScript 提交中击败了72.39%的用户**

**内存消耗 :34.5 MB, 在所有 JavaScript 提交中击败了72.79%的用户**

```
var twoSum = function(nums, target) {
    let length = nums.length;
    let arr = new Object()
    for(let i = 0;i<length;++i){
        let temp = target - nums[i];
        if(arr.hasOwnProperty(temp)){
            return [arr[temp],i]
        }else{
            Object.defineProperty(arr,nums[i],{
                value : i,
                writable : true,
                enumerable : true,
                configurable : true
            }) 
        }
    }
};
```

哈希表的方法，用空间换时间，用对象的方法，空间稍大但时间优化近20%

**执行用时 :84 ms, 在所有 JavaScript 提交中击败了84.29%的用户**

**内存消耗 :36.3 MB, 在所有 JavaScript 提交中击败了7.49%的用户**



#### [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

给出两个 非空 的**链表**用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

```
var addTwoNumbers = function(l1, l2) {
    let temp = 0;let p=l1,q=l2;
    while(q!=null){
        if(p.next==null&&q.next!=null){
            p.next = new ListNode(0);
        }
        if(q.next==null&&p.next!=null){
            q.next = new ListNode(0);
        }
        let sumAll = temp + p.val + q.val;
        p.val = sumAll % 10;
        temp = Math.floor(sumAll / 10);
        if(p.next == null && q.next == null && temp!=0){
            p.next = new ListNode(temp);
        }
        p=p.next
        q=q.next
    }
    return l1
};
```

浅拷贝保存引用，操作p和q

**执行用时 :172 ms, 在所有 JavaScript 提交中击败了78.18%的用户**

**内存消耗 :38.3 MB, 在所有 JavaScript 提交中击败了68.50%的用户**

#### [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

```
var lengthOfLongestSubstring = function(s) {
    let arr =new Array();
    let j=0;
    arr[j]=new Array();
    for(let i = 0;i<s.length;++i){
        let k = arr[j].indexOf(s.charAt(i))
        if(k==-1){
           arr[j].push(s.charAt(i))
        }else{
            j++
            arr[j]=new Array()
            arr[j]=arr[j-1].slice(k+1)
            arr[j-1]=arr[j-1].length
            arr[j].push(s.charAt(i))
        }
    }
    arr[j]=arr[j].length
    arr.sort((a,b)=>{
        return b-a
    })
    return arr[0]
};
```

开一个二维数组储存每段不重复子串，新开一个元素就把上一个元素转换成具体长度，排序求解

**执行用时 :140 ms, 在所有 JavaScript 提交中击败了56.06%的用户**

**内存消耗 :43 MB, 在所有 JavaScript 提交中击败了13.45%的用户**

```
var lengthOfLongestSubstring = function(s) {
    if(s.length==0){
        return 0
    }
    let obj = {},ans = 0,start=0;
    for(let i =0;i<s.length;i++){
        if(obj.hasOwnProperty(s.charAt(i))){
            start = Math.max(start,obj[s.charAt(i)]+1)
            obj[s.charAt(i)]=i
        }else{
            obj[s.charAt(i)]=i
        }
        ans = Math.max(i-start,ans)
    }
    return ans+1
};
```

##### **滑动窗口**

https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/hua-jie-suan-fa-3-wu-zhong-fu-zi-fu-de-zui-chang-z/

**执行用时 :136 ms, 在所有 JavaScript 提交中击败了59.07%的用户**

**内存消耗 :40 MB, 在所有 JavaScript 提交中击败了55.58%的用户**

#### [4. 寻找两个有序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

示例 1:

nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
示例 2:

nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5

```
var findMedianSortedArrays = function(nums1, nums2) {
    nums1 = nums1.concat(nums2)
    nums1 = nums1.sort((a,b)=>{
        return a-b
    })

    let m = nums1.length;
    if(m%2==0){
        return (nums1[m/2]+nums1[m/2-1])/2
    }else{
        return nums1[Math.floor(m/2)]
    }
};
```

暴力法，合并数组后排序取值

**执行用时 :204 ms, 在所有 JavaScript 提交中击败了54.66%的用户**

**内存消耗 :39.3 MB, 在所有 JavaScript 提交中击败了61.53%的用户**



#### [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：

输入: "cbbd"
输出: "bb"

```
var longestPalindrome = function(s) {
    let len = s.length,start = 0,end = 0;
    for(let i = 0;i<len;++i){
      let l1 = centralExpand(s,i,i,len),
          l2 = centralExpand(s,i,i+1,len);
      let l3 = Math.max(l1,l2);
      if (l3 > end - start) {
          start = i - l3/2+1
          end = i + l3/2+1
      }
    }
    return s.substring(start, end);
};
function centralExpand(s,l,r,len){
    while(l>=0 && r<=len && s.charAt(l)==s.charAt(r)){
        l--;
        r++;
    }
   return r-l-1;
}
```

##### **中心扩展算法**

事实上，只需使用恒定的空间，我们就可以在 O(n^2) 的时间内解决这个问题。

我们观察到回文中心的两侧互为镜像。因此，回文可以从它的中心展开，并且只有 2n - 1 个中心。对比扩展中心的两侧

时间复杂度：O(n^2)，由于围绕中心来扩展回文会耗去 O(n) 的时间，所以总的复杂度为 O(n^2)。

空间复杂度：O(1)。

**执行用时 :180 ms, 在所有 JavaScript 提交中击败了62.54%的用户**

**内存消耗 :37.1 MB, 在所有 JavaScript 提交中击败了57.35%的用户**



#### [6. Z 字形变换](https://leetcode-cn.com/problems/zigzag-conversion/)

将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

L   C   I   R
E T O E S I I G
E   D   H   N
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);

```
var convert = function(s, numRows) {
    let str = [];
    if(numRows==1|s.length==1|s.length<=numRows){
        return s
    }
    for(let i=0;i<s.length/(numRows*2-2);++i){
        str[i]= s.substring(i*(numRows*2-2),(i+1)*(numRows*2-2));
        str[i]=str[i].split("");
    }
    let strs = [];
    for(let j=0;j<numRows;++j){
        strs[j]='';
        if(j==0){
            for(let i=0;i<str.length;++i){
                strs[j]+=str[i][0];
            }
        }else if(j==numRows-1){
           for(let i=0;i<str.length;++i){
               if(str[i][numRows-1]){
                   strs[j]+=str[i][numRows-1];
               }
            }
       }else{
           for(let i=0;i<str.length;++i){
               if(str[i][numRows*2-2-j]){
                   strs[j]+=str[i][j]+str[i][numRows*2-2-j];
               }else if(str[i][j]){
                   strs[j]+=str[i][j]
               }
                
           }
       }
    }
    strs=strs.join("")
   return strs;
};
```

**执行用时 :152 ms, 在所有 JavaScript 提交中击败了47.37%的用户**

**内存消耗 :39.1 MB, 在所有 JavaScript 提交中击败了46.97%的用户**

#### [7. 整数反转](https://leetcode-cn.com/problems/reverse-integer/)

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

输入: 123
输出: 321
 示例 2:

输入: -123
输出: -321
示例 3:

输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

```
var reverse = function(x) {
    var x1 = x < 0 ? -1 : 1;
    let y = Math.abs(x);
    y = y.toString().split('').reverse().join('');
    let s = +y*x1
    return s>Math.pow(2, 31) - 1||s<-Math.pow(2, 31)?0:s
};
```

**执行用时 :112 ms, 在所有 JavaScript 提交中击败了51.81%的用户**

**内存消耗 :35.8 MB, 在所有 JavaScript 提交中击败了40.11%的用户**

#### [8. 字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)

```
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    str = str.trim()
    let f = false,reg = /^\d*/
    if(str.charAt(0)=="-"){
        f = true
        str = str.substring(1)
    }else if(str.charAt(0)=="+"){
             str = str.substring(1)
    }
    let number = parseInt(str.match(reg))
    if(isNaN(number)){
        return 0
    }
    if(number>=2147483648&&f==true){
        number = 2147483648
    }else if(number>=2147483648){
        number = 2147483647
    }
    if(f){
        number*=-1
    }
    return number
};
```

暴力破解

**执行用时 :92 ms, 在所有 JavaScript 提交中击败了96.15%的用户**

**内存消耗 :36.2 MB, 在所有 JavaScript 提交中击败了35.32%的用户**

```
var myAtoi = function(str) {
    str = parseInt(str)||0;

    if(str>2147483647 ){
        return 2147483647 
    }
    if(str<-2147483648 ){
        return -2147483648 
    }
    return str;
};
```

parseInt已经实现这个功能了...

#### [9. 回文数](https://leetcode-cn.com/problems/palindrome-number/)

```
var isPalindrome = function(x) {
    return  x.toString().split("").reverse().join("")==x.toString()
};
```

**执行用时 :272 ms, 在所有 javascript 提交中击败了70.74%的用户**

**内存消耗 :45.6 MB, 在所有 javascript 提交中击败了62.37%的用户**

```
//没有用字符串的解法
var isPalindrome = function(x) {
    if(x < 0)
        return false;
    var l = (x+'').length;
    var t = 1;
    for(var i = 1; i < l; i++)
        t*=10;
    return test(x,t);
};

function test(x,t){
    if(t <= 1)
        return true;
    if(x%t == x)
        var shi = 0;
    else 
        var shi = (x - x%t)/t;
    if(x%10 != shi){
        return false;
    }
    else
        return test((x-x%10)/10-(x%10)*t/10,t/100);
}
```



#### [10. 正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/)

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *

```
var isMatch = function(s, p) {
    return new RegExp("^"+p+"$").test(s)
};
```

赖皮做法，JS无脑过

**执行用时 :92 ms, 在所有 JavaScript 提交中击败了94.99%的用户**

**内存消耗 :34.9 MB, 在所有 JavaScript 提交中击败了37.08%的用户**



#### [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

示例:

输入: [1,8,6,2,5,4,8,3,7]
输出: 49

```
var maxArea = function(height) {
    let maxarea = 0, l = 0, r = height.length - 1;
    while (l < r) {
        maxarea = Math.max(maxarea, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r])
            l++;
        else
            r--;
    }
    return maxarea;
};
```

外围逼近，中间扩展以及滑动窗口都跪了

**执行用时 :64 ms, 在所有 JavaScript 提交中击败了99.65%的用户**

**内存消耗 :35.4 MB, 在所有 JavaScript 提交中击败了63.90%的用户**

#### [14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)

```
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length==0){
        return ""
    }
    let i = 0,con=true
    while(i<strs[0].length){
       for(var j = 1;j<strs.length;j++){
            if(strs[j].charAt(i)!=strs[j-1].charAt(i)){
                break
            }
        }
        if(j!=strs.length){
            break
        }else{
            i++
        }
    }
    let res = ""
    res+=strs[0].substr(0,i)
    return res
};
```

**执行用时 :68 ms, 在所有 JavaScript 提交中击败了95.21%的用户**

**内存消耗 :34.9 MB, 在所有 JavaScript 提交中击败了47.14%的用户**

#### [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

```
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if(digits.length == 0){
        return []
    }
    let map = [
        null,
        null,
        ["a","b","c"],
        ["d","e","f"],
        ["g","h","i"],
        ["j","k","l"],
        ["m","n","o"],
        ["p","q","r","s"],
        ["t","u","v"],
        ["w","x","y","z"]
    ];
    let res=[]
    for(let i = 0;i<digits.length;i++){
        let dic = map[digits.charAt(i)]
        res[i] = new Array()
        if(i==0){
            res[0] = dic
        }else{
            for(let j = 0;j<res[i-1].length;j++){
                for(let k = 0;k<dic.length;k++){
                    res[i].push(res[i-1][j]+dic[k])
                }
            }
        }
    }
    return res[res.length-1]
};
```

笨方法，回溯

复杂度分析

时间复杂度： O(3^N \times 4^M)，其中 N 是输入数字中对应 3 个字母的数目（比方说 2，3，4，5，6，8）， M 是输入数字中对应 4 个字母的数目（比方说 7，9），N+M 是输入数字的总数。

空间复杂度：O(3^N \times 4^M)，这是因为需要保存 3^N \times 4^M个结果。

**执行用时 :64 ms, 在所有 javascript 提交中击败了82.96%的用户**

**内存消耗 :33.7 MB, 在所有 javascript 提交中击败了38.78%的用户**

#### [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

```
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let res=[];
    for(let i=0;i<s.length;i++){
        if(s.charAt(i)=="("){
            res.push(s.charAt(i))
        }else if(s.charAt(i)=="{"){
            res.push(s.charAt(i))
        }else if(s.charAt(i)=="["){
            res.push(s.charAt(i))
        }else if(s.charAt(i)==")"){
            if(res[res.length-1]=="("){
                res.pop()
            }else{
                res.push(s.charAt(i))
            }
        }else if(s.charAt(i)=="}"){
            if(res[res.length-1]=="{"){
                res.pop()
            }else{
                res.push(s.charAt(i))
            }
        }else if(s.charAt(i)=="]"){
            if(res[res.length-1]=="["){
                res.pop()
            }else{
                res.push(s.charAt(i))
            }
        }
    }
    if(res.length==0){
        return true
    }else{
        return false
    }
};
```

生成一个栈储存数据

**执行用时 :60 ms, 在所有 javascript 提交中击败了96.37%的用户**

**内存消耗 :36 MB, 在所有 javascript 提交中击败了10.82%的用户**

```
var isValid = function(s) {
    let rightSymbols = [];
    for (let i = 0; i < s.length; i++) {
       if (s[i] == '(') {
         rightSymbols.push(')');
       } else if (s[i] == '[') {
         rightSymbols.push(']');
       } else if (s[i] == '{') {
         rightSymbols.push('}');
       } else if (rightSymbols.pop() != s[i]) {
          return false;
       }
    }
    return !rightSymbols.length;
};
```

通过.pop()检查是否合法来中途返回结果，达到剪枝的目的

#### [55. 跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个位置。

示例 1:

输入: [2,3,1,1,4]
输出: true
解释: 从位置 0 到 1 跳 1 步, 然后跳 3 步到达最后一个位置。
示例 2:

输入: [3,2,1,0,4]
输出: false
解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。

```
var canJump = function(nums) {
    let length = nums.length;
    let front = nums[0], behind = 0,temp=0,last=0;
    while(front<length-1&&last!=front){
        last=front
        temp=behind
        while(behind<front-1){
            behind++
            temp=Math.max(temp,behind+nums[behind])
        }
        if(temp>front){
            [front,behind]=[front,temp].sort((a,b)=>b-a)
        }else{
            behind=front
            front+=nums[front]
        }
        
    }
    if(front>=length-1){
        return true
    }else{
        return false
    }
    
};
```

**执行用时 :84 ms, 在所有 JavaScript 提交中击败了66.37%的用户**

**内存消耗 :35.5 MB, 在所有 JavaScript 提交中击败了57.97%的用户**

#### [58. 最后一个单词的长度](https://leetcode-cn.com/problems/length-of-last-word/)

给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。

如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指仅由字母组成、不包含任何空格的 最大子字符串。

```
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let arr = s.split(""),len = 0,temp = 0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]!=" "){
            len++
        }else{
            len == 0?temp:temp=len;
            len = 0
        }
    }
    if(len==0){
        return temp
    }else{
        return len
    }
};

var lengthOfLastWord = function(s) {
  const arr = s.trim().split(' ');
  return arr.length ? arr[arr.length - 1].length : 0;
};
```

**执行用时 :64 ms, 在所有 JavaScript 提交中击败了65.03%的用户**

**内存消耗 :34.7 MB, 在所有 JavaScript 提交中击败了5.02%的用户**



#### [62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

示例 1:

输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右

```
var uniquePaths = function(m, n) {
   if(m==1||n==1){
        return 1
    }
    return uniquePaths(m-1,n)+uniquePaths(m,n-1)
};
```

**递归**DP，容易超时，二维数组考虑越界问题

```
var uniquePaths = function(m, n) {
    let dp = [];
    for(let j=0;j<n;++j){
        dp.push([])
        for(let i = 0;i<m;++i){
            if(i==0||j==0){
                dp[j][i]=1
            }else{
                dp[j].push(dp[j][i-1]+dp[j-1][i])
            }
        }
    }
    return dp[n-1][m-1]
};
```

**DP**

```
var uniquePaths = function(m, n) {
    var a= new Array(n).fill(1);
    var dp=new Array(m).fill(a);
    for(var i=1; i<m; i++){
        for(var j=1; j<n; j++){
            dp[i][j]=dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
};
```

new Array(n).fill(1) 这个操作省时

#### [63. 不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)

输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右

```
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length,n = obstacleGrid[0].length;
    var a= new Array(n).fill(0);
    var dp=new Array(m).fill(a);
    for(let i=0; i<m; i++){
        for(let j=0; j<n; j++){            
            if(i == 0 && j == 0){
                dp[i][j]=1;
            }else if(i == 0){
                dp[i][j]=dp[i][j-1]
            }else if(j == 0){
                dp[i][j]=dp[i-1][j]
            }else{
                dp[i][j]=dp[i][j-1]+dp[i-1][j]
            }
            if(obstacleGrid[i][j]==1){
                dp[i][j]=0
            }
        }
    }
    return dp[m-1][n-1];
};
```

    let a = new Array(2).fill(0)
    let b = new Array(K+1).fill(a)
    let dp = new Array(n).fill(b)
fill创建三维数组带来浅拷贝的问题，Array.fill()如果填充类型为对象，则为浅拷贝。数组内的对象指向的都是同一个内存地址。

##### 你可以这样做

**执行用时 :88 ms, 在所有 JavaScript 提交中击败了65.92%的用户**

**内存消耗 :34.9 MB, 在所有 JavaScript 提交中击败了98.31%的用户**

#### [75. 颜色分类](https://leetcode-cn.com/problems/sort-colors/)

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

示例:

输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]

```
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let p1=0,p2=nums.length-1,cur=0;
    if(p2<=0){
        return 0
    }
    while(cur<=p2){
        if(nums[cur]==0){
            [nums[p1],nums[cur]]=[nums[cur],nums[p1]]
            p1++
        }else if(nums[cur]==2){
            [nums[p2],nums[cur]]=[nums[cur],nums[p2]]
            p2--
            cur--
        }
        cur++
    }
};

```

三指针法

**执行用时 :68 ms, 在所有 javascript 提交中击败了77.52%的用户**

**内存消耗 :33.7 MB, 在所有 javascript 提交中击败了29.69%的用户**



#### [78. 子集](https://leetcode-cn.com/problems/subsets/)

 给定一组**不含重复元素**的整数数组 *nums*，返回该数组所有可能的子集（幂集）。 

```
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let l = nums.length,n = Math.pow(2,l),re = [];
    for(let i = 0;i<n;i++){
        let arr = i.toString(2).split("")
        while(arr.length<l){
            arr.unshift('0')
        }
        let res = []
        for(let j = 0;j<l;j++){
            if(arr[j]=='1'){
                res.push(nums[j])
            }
        }
        re.push(res)
    }
    return re
};
```

子集长度为2^nums.length，二进制000，至111,0则不出现对应数字

**执行用时 :68 ms, 在所有 javascript 提交中击败了94.80%的用户**

**内存消耗 :36 MB, 在所有 javascript 提交中击败了10.64%的用户**



#### [93. 复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

示例:

输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]

```
var restoreIpAddresses = function(s) {
    let re = []
    find(s,0,"")
    function find(s,n,ip){
    	if(n==4){
        	if(s.length==0){
            	re.push(ip)
        	}
    	}else{
        	for(let i = 1;i<4;i++){
            	if(s.length<i){
                	break
            	}
            	let str = s.substr(0,i)
            	if(parseInt(str)<256&&str.length==parseInt(str).toString().length){
                	let st = str+(n==3?"":".")
                	find(s.substr(i),n+1,ip + st)
            	}
        	}
        	return null
    	}
    }
    return re 
}
```

通过str.length==parseInt(str).toString().length排除010 00 001 等答案

**执行用时 :64 ms, 在所有 JavaScript 提交中击败了91.81%的用户**

**内存消耗 :35.2 MB, 在所有 JavaScript 提交中击败了69.23%的用户**



#### [94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```
var inorderTraversal = function(root) {
    let arr=[]
    order(root,arr)
    return arr
};
function order(root,arr){
    if(root!=null){
        order(root.left,arr)
        arr.push(root.val)
        order(root.right,arr)
    }
}
```

**执行用时 :76 ms, 在所有 JavaScript 提交中击败了56.89%的用户**

**内存消耗 :34.3 MB, 在所有 JavaScript 提交中击败了5.23%的用户**

```
var inorderTraversal = function(root) {
    let arr=[]
    function order(root){
    	if(root!=null){
        	order(root.left)
        	arr.push(root.val)
        	order(root.right)
    	}
	}
    order(root)
    return arr
};
```

改成内部函数，去掉arr的调参

**执行用时 :56 ms, 在所有 JavaScript 提交中击败了98.33%的用户**

**内存消耗 :34.3 MB, 在所有 JavaScript 提交中击败了5.23%的用户**

#### [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

##### 深搜

```
var isValidBST = function(root) {
    if(root == null){
        return true
    }
    let right = leftest(root.right)
    let left = rightest(root.left)
    if (left && left.val >= root.val) {
        return false
    }
    if (right && right.val <= root.val) {
        return false
    }
    return isValidBST(root.left) && isValidBST(root.right)
};

function rightest(node){
    while(node && node.right){
        node = node.right
    }
    return node
}
function leftest(node){
    while(node && node.left){
        node = node.left
    }
    return node
}
```

对比左子树最右节点和右子树最左节点确保左子树所有值小于自身，右大于自身

**执行用时 :112 ms, 在所有 JavaScript 提交中击败了30.95%的用户**

**内存消耗 :37.4 MB, 在所有 JavaScript 提交中击败了57.23%的用户**

```
var isValidBST = function(root, arr = []) {
  if (!root) return true;
  return isValidBST(root.left, arr) && compareAndPush(root.val, arr) && isValidBST(root.right, arr);
};

function compareAndPush (val, arr) {
  if (arr.length) if (arr[arr.length - 1] >= val) return false
  arr.push(val);
  return true;
}
```

中序遍历方法

```
/**
 * @param {TreeNode} root
 * @param {TreeNode} pre 当前节点值的下限
 * @param {TreeNode} next 当前节点值的上限
 * @return {boolean}
 */
var isValidBST = function(root, pre = null, next = null) {
  if (!root) return true;
  // 在这里打印日志可以很好的观察到遍历顺序以及每个节点到底与哪些上下限进行了比较
  // console.log(root && root.val, pre && pre.val, next && next.val);
  if (pre && pre.val >= root.val) return false;
  if (next && next.val <= root.val) return false;
  return isValidBST(root.left, pre, root) && isValidBST(root.right, root, next);
};
```

因为在每个二叉搜索树中，根节点的值一定比左子树所有节点的值大且一定比右子树所有节点的值小。巧妙的将这些上下限值通过函数递归传给子节点来进行比较。顺便发现了该方法的遍历顺序就是先序遍历

```
var isValidBST = function(root) {
    let data = []
    Inorder(root,data)
    for(let i=0;i+1<data.length;i++){
        if(data[i]>=data[i+1]) return false
    }
    return true
};

function Inorder(root,data){
    if(root){
        Inorder(root.left,data)
        data.push(root.val)
        Inorder(root.right,data)
    }
    else
        return
}
```

最快，把树全部打印成数组从头比较过去

#### [100. 相同的树](https://leetcode-cn.com/problems/same-tree/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if(p!=null&&q!=null){
        return q.val==p.val && isSameTree(p.left,q.left) && isSameTree(p.right,q.right)
    }else if(p==null&&q==null){
        return true
    }else{
        return false
    }
};

```

**执行用时 :60 ms, 在所有 JavaScript 提交中击败了96.35%的用户**

**内存消耗 :33.7 MB, 在所有 JavaScript 提交中击败了21.59%的用户**

#### [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

##### 广搜

```
var isSymmetric = function(root) {
    return isM(root,root)
};
function isM(n1,n2){
    if(n1==null&&n2==null){
        return true
    }
    if(n1==null||n2==null){
        return false
    }
    return n1.val==n2.val && isM(n1.left,n2.right) && isM(n1.right,n2.left)
}
```

**执行用时 :88 ms, 在所有 JavaScript 提交中击败了72.72%的用户**

**内存消耗 :35.4 MB, 在所有 JavaScript 提交中击败了53.38%的用户**





#### [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```
var maxDepth = function(root) {
    let depth=0,i=0
    function deep(root,i){
        if(root!=null){
            i++
            depth=Math.max(depth,i)
            return deep(root.left,i)||deep(root.right,i)
        }else{
            i=0
        }
    }
    deep(root,i)
    return depth
};
```

**执行用时 :76 ms, 在所有 JavaScript 提交中击败了90.76%的用户**

**内存消耗 :37 MB, 在所有 JavaScript 提交中击败了70.72%的用户**

```
var maxDepth = root => root? Math.max(maxDepth(root.left),maxDepth(root.right))+1 : 0
```

递归+箭头函数

**执行用时 :72 ms, 在所有 JavaScript 提交中击败了94.44%的用户**

**内存消耗 :37.1 MB, 在所有 JavaScript 提交中击败了52.78%的用户**





#### [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

低进高出

```
var maxProfit = function(prices) {
    let low = prices[0],high = prices[0],profit = 0;
    prices.forEach((ele)=>{
      if(ele<low){
          low = ele
          high = ele
      }else if(ele>high){
          high = ele
          profit = Math.max(profit,high-low)
      }  
    })
    return profit
};
```

for of 比 forEach更耗空间一些，时间上有随机的可能

**执行用时 :72 ms, 在所有 JavaScript 提交中击败了98.04%的用户**

**内存消耗 :35 MB, 在所有 JavaScript 提交中击败了92.95%的用户**

#### [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

多笔交易

```
var maxProfit = function(prices) {
    let low = prices[0],high = prices[0],profit = 0,total = 0;
    for(let ele of prices){
        if(ele>high){
          high = ele
          profit = Math.max(profit,high-low)    
        }else{
          total +=profit;
          profit = 0;
          low = ele
          high = ele
        }
    }
    total +=profit
    return total
};
```

**执行用时 :88 ms, 在所有 JavaScript 提交中击败了51.61%的用户**

**内存消耗 :36.3 MB, 在所有 JavaScript 提交中击败了7.56%的用户**

#### [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

限制交易次数

##### **状态转移方程**

**每天都有三种「选择」**：买入、卖出、无操作

**这个问题的「状态」有三个**，第一个是天数，第二个是允许交易的最大次数，第三个是当前的持有状态

https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/yi-ge-tong-yong-fang-fa-tuan-mie-6-dao-gu-piao-wen/

```
dp[i][k][0 or 1]
0 <= i <= n-1, 1 <= k <= K
n 为天数，大 K 为最多交易数
此问题共 n × K × 2 种状态，全部穷举就能搞定。

for(let i=0; i<n; i++){
	for(let k=K; k>=1; k--){
		for(let s=0; s<2; s++){
			 dp[i][k][s] = max(buy, sell, rest)
		}
	}
}
```

我们想求的最终答案是 dp 【n - 1】【 K】【0】，即最后一天，最多允许 K 次交易，最多获得多少利润。读者可能问为什么不是dp 【n - 1】【 K】【1】？因为 [1] 代表手上还持有股票，[0] 表示手上的股票已经卖出去了，很显然后者得到的利润一定大于前者。

现在，我们完成了「状态」的穷举，我们开始思考每种「状态」有哪些「选择」，应该如何更新「状态」。只看「持有状态」，可以画个状态转移图。

![40198bf2f6894018328b250b772b4a17724a983f99ba359b798a289733bffcbc-file_1559885188422-1.png](https://pic.leetcode-cn.com/c4eb5f0aa4daf7bef4b3b8af95129bb7394ec58e1ba7b191d9104bbd8ff1ccb3-40198bf2f6894018328b250b772b4a17724a983f99ba359b798a289733bffcbc-file_1559885188422-1.png)

通过这个图可以很清楚地看到，每种状态（0 和 1）是如何转移而来的。根据这个图，我们来写一下状态转移方程：

```
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
              max(选择 rest,选择 sell)

解释：今天我没有持有股票，有两种可能：
要么是我昨天就没有持有，然后今天选择 rest，所以我今天还是没有持有；
要么是我昨天持有股票，但是今天我 sell 了，所以我今天没有持有股票了。

dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
              max(选择 rest,选择 buy)

解释：今天我持有着股票，有两种可能：
要么我昨天就持有着股票，然后今天选择 rest，所以我今天还持有着股票；
要么我昨天本没有持有，但今天我选择 buy，所以今天我就持有股票了。
注意 k 的限制，我们在选择 buy 的时候，把 k 减小了 1，很好理解吧，当然你也可以在 sell的时候减 1。
```

还差最后一点点，就是定义 `base case`，即最简单的情况。

```
base case：
dp[-1][k][0] = dp[i][0][0] = 0
dp[-1][k][1] = dp[i][0][1] = -infinity
```

```
var maxProfit = function(prices) {
    if(prices.length==0){
        return 0
    }
    let n = prices.length,K = 2;
    let dp = new Array(n).fill([[0,0],[0,0],[0,0]])
    for(let i=0; i<n; i++){
	    for(let k=K; k>0; k--){
	    	if(i==0){
	    		dp[i][k][0] = 0;
                dp[i][k][1] = 0-prices[i];
                continue;
	    	}
			dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
			dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0]-prices[i])
	    }
    }
    return dp[n-1][K][0]
};
```

```
//[3,3,5,0,0,3,1,4]
[ [ [ 0, 0 ], [ 4, 0 ], [ 6, 2 ] ],
  [ [ 0, 0 ], [ 4, 0 ], [ 6, 2 ] ],
  [ [ 0, 0 ], [ 4, 0 ], [ 6, 2 ] ],
  [ [ 0, 0 ], [ 4, 0 ], [ 6, 2 ] ],
  [ [ 0, 0 ], [ 4, 0 ], [ 6, 2 ] ],
  [ [ 0, 0 ], [ 4, 0 ], [ 6, 2 ] ],
  [ [ 0, 0 ], [ 4, 0 ], [ 6, 2 ] ],
  [ [ 0, 0 ], [ 4, 0 ], [ 6, 2 ] ] ]
```

```
var maxProfit = function(prices) {
  if(prices.length===0){
    return 0
  }
  // 设置基础条件
    var dp10=0,dp20=0
    var dp11=-prices[0], dp21 = -prices[0]
    for(let i=1;i<prices.length;i++){
      dp11=Math.max(dp11,-prices[i])
      dp10=Math.max(dp10,dp11+prices[i])
      //此行完成状态转移
      dp21=Math.max(dp21,dp10-prices[i])
      dp20=Math.max(dp20,dp21+prices[i])
    }
  return dp20
};
```

循环执行避免创建数组的耗时

**执行用时 :96 ms, 在所有 JavaScript 提交中击败了63.11%的用户**

**内存消耗 :36.4 MB, 在所有 JavaScript 提交中击败了53.33%的用户**



#### [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```
var preorderTraversal = function(root) {
    let arr=[]
    function order(root){
    	if(root!=null){
            arr.push(root.val)
        	order(root.left)
        	order(root.right)
    	}
	}
    order(root)
    return arr
};
```

**执行用时 :64 ms, 在所有 JavaScript 提交中击败了92.44%的用户**

**内存消耗 :33.7 MB, 在所有 JavaScript 提交中击败了29.53%的用户**

#### [145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```
var postorderTraversal = function(root) {
    let arr=[]
    function order(root){
    	if(root!=null){
        	order(root.left)
        	order(root.right)
            arr.push(root.val)
    	}
	}
    order(root)
    return arr
};
```

**执行用时 :64 ms, 在所有 JavaScript 提交中击败了91.12%的用户**

**内存消耗 :34.1 MB, 在所有 JavaScript 提交中击败了5.74%的用户**

#### [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

```
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = new Array()
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack[this.stack.length]=x
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack[this.stack.length-1]=null
    this.stack.length--
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length-1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return Math.min(...this.stack)
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

**执行用时 :356 ms, 在所有 JavaScript 提交中击败了10.05%的用户**

**内存消耗 :44.3 MB, 在所有 JavaScript 提交中击败了38.10%的用户**

```
var MinStack = function() {
    this.val = [];
    this.min = Infinity;
    this.top;
};
MinStack.prototype.push = function(x) {
    this.val.push(x);
    this.min = this.min > x ? x : this.min;
    this.topVal = x;
};
MinStack.prototype.pop = function() {
    var popVal = this.val.pop();
    if(this.min === popVal) {
        this.min = Math.min(...this.val);
    }
    this.topVal = this.val[this.val.length - 1];
    return popVal;
};
MinStack.prototype.top = function() {
    return this.topVal;
};
MinStack.prototype.getMin = function() {
    return this.min;
};
```

在push是确定最小可提升getMin 性能

#### [162. 寻找峰值](https://leetcode-cn.com/problems/find-peak-element/)

峰值元素是指其值大于左右相邻值的元素。

给定一个输入数组 nums，其中 nums[i] ≠ nums[i+1]，找到峰值元素并返回其索引。

数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。

你可以假设 nums[-1] = nums[n] = -∞。

```
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    nums.push(-Infinity)
    let temp = 0,len = nums.length;
    if(len<2){
        return 0
    }
    for(let i=1;i<len;i++){
        if(nums[i]>nums[i-1]){
            temp=1
        }else if(nums[i]<nums[i-1]){
            if(temp===1){
                return i-1
            }else{
                temp=0
            }
        }else{
            temp=0
        }
        
    }
    return 0
};
```

**线性扫描**

**执行用时 :56 ms, 在所有 JavaScript 提交中击败了98.48%的用户**

**内存消耗 :34.1 MB, 在所有 JavaScript 提交中击败了38.46%的用户**

```
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let len = nums.length-1
    for(let i=0;i<len;i++){
         if (nums[i] > nums[i + 1])
                return i
        }
    }
    return len
}
```

**执行用时 :60 ms, 在所有 JavaScript 提交中击败了97.97%的用户**

**内存消耗 :33.6 MB, 在所有 JavaScript 提交中击败了80.77%的用户**

#### [165. 比较版本号](https://leetcode-cn.com/problems/compare-version-numbers/)

```javascript
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    arr1 = version1.split(".").map((item)=>{
        return parseInt(item)
    })
    arr2 = version2.split(".").map((item)=>{
        return parseInt(item)
    })
    let length = Math.max(arr1.length,arr2.length);
    for(let i=0;i<length;i++){
        if(arr1[i]===undefined)arr1[i]=0
        if(arr2[i]===undefined)arr2[i]=0
        if(arr1[i]<arr2[i])return -1
        if(arr1[i]>arr2[i])return 1
    }
    return 0
    
};
```

**执行用时 :64 ms, 在所有 JavaScript 提交中击败了90.44%的用户**

**内存消耗 :33.7 MB, 在所有 JavaScript 提交中击败了26.09%的用户**

#### [169. 求众数](https://leetcode-cn.com/problems/majority-element/)

众数是指在数组中出现次数**大于** `⌊ n/2 ⌋` 的元素。

```
var majorityElement = function(nums) {
    let map = new Map(),length = nums.length;
    for(let i = 0;i<length;i++){
        if(map.has(nums[i])){
            map.set(nums[i],map.get(nums[i])+1)
        }else{
            map.set(nums[i],1)
        }
    }
    let maxValue,maxKey
    for(let [key,value] of map){
        if(!maxValue || maxValue < value) {
            maxValue = value
            maxKey = key
        }
    }
    return maxKey
};
```

**执行用时 :132 ms, 在所有 JavaScript 提交中击败了20.61%的用户**

**内存消耗 :37.7 MB, 在所有 JavaScript 提交中击败了29.33%的用户**

哈希表法

```
var majorityElement = function (nums) {
    if (nums.length === 1) {
        return nums[0];
    }
    const map = new Map();
    for (let num of nums) {
        if (!map.get(num)) {
            map.set(num, 1);
        } else {
            map.set(num, map.get(num) + 1);
            if (map.get(num) > nums.length / 2) {
                return num;
            }
        }
    }
};

```

栈

位运算

异位相消



#### [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

```
var maxProfit = function (k, prices) {
    let n = prices.length;
    if(n==0){
        return 0
    }
    if(k>n/2){
        let ans = 0
        for(let i=0;i<n-1;i++){
            ans = Math.max(ans,ans+prices[i+1]-prices[i])
        }
        return ans
    }else{
        let dp0 = new Array(k+1).fill(0)
        let dp1 = new Array(k+1).fill(-prices[0])
        for(let i = 1;i<n;i++){
            for(let j = 1;j<k+1;j++){
                dp0[j]=Math.max(dp0[j],dp1[j]+prices[i])
                dp1[j]=Math.max(dp1[j],dp0[j-1]-prices[i])
            }
        }
        return dp0[k]
    }
};
```

k>n/2跟不限次数交易一样

**执行用时 :88 ms, 在所有 JavaScript 提交中击败了93.75%的用户**

**内存消耗 :35.2 MB, 在所有 JavaScript 提交中击败了100.00%的用户**

#### [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。

示例 1:

输入:
11110
11010
11000
00000

输出: 1

```
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if(grid.length==0||grid[0].length==0){
        return 0
    }
    let count=0;
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j]==1){
                count++
                islandClean(i,j,grid)
            }
        }
    }
    function islandClean(i,j){
        grid[i][j]=0
        if(j+1<grid[0].length&&grid[i][j+1]==1){
            islandClean(i,j+1)
        }
        if(i+1<grid.length&&grid[i+1][j]==1){
            islandClean(i+1,j)
        }
        if(j-1>=0&&grid[i][j-1]==1){
            islandClean(i,j-1)
        }
        if(i-1>=0&&grid[i-1][j]==1){
            islandClean(i-1,j)
        }
    }
    return count
};

```

感染法，把计数岛屿部分全部归零

**执行用时 :84 ms, 在所有 JavaScript 提交中击败了93.77%的用户**

**内存消耗 :37.8 MB, 在所有 JavaScript 提交中击败了50.50%的用户**

#### [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```
var findKthLargest = function(nums, k) {
    let arr = nums.slice(0,k),len = nums.length;
    arr.sort((a,b)=>a-b)
    for(let i=k;i<len;i++){
        if(nums[i]>arr[0]){
            arr[0]=nums[i]
            arr.sort((a,b)=>a-b)
        }
    }
    return arr[0]
};
```

**执行用时 :372 ms, 在所有 JavaScript 提交中击败了7.31%的用户**

**内存消耗 :38.4 MB, 在所有 JavaScript 提交中击败了7.19%的用户**

#### [292. Nim 游戏](https://leetcode-cn.com/problems/nim-game/)

你和你的朋友，两个人一起玩 Nim 游戏：桌子上有一堆石头，每次你们轮流拿掉 1 - 3 块石头。 拿掉最后一块石头的人就是获胜者。你作为先手。

你们是聪明人，每一步都是最优解。 编写一个函数，来判断你是否可以在给定石头数量的情况下赢得游戏。

如果有五块、六块、或是七块石头，你可以控制自己拿取的石头数，总是恰好给你的对手留下四块石头，使他输掉这场比赛。但是如果石头堆里有八块石头，你就不可避免地会输掉，因为不管你从一堆石头中挑出一块、两块还是三块，你的对手都可以选择三块、两块或一块，以确保在再一次轮到你的时候，你会面对四块石头。

```
var canWinNim = function(n) {
    if(n%4==0){return false}else{return true}
};
```

**执行用时 :76 ms, 在所有 JavaScript 提交中击败了59.01%的用户**

**内存消耗 :33.8 MB, 在所有 JavaScript 提交中击败了22.35%的用户**

```
return n % 4 == 0 ? false : true
更快
```

#### [319. 灯泡开关](https://leetcode-cn.com/problems/bulb-switcher/)

初始时有 n 个灯泡关闭。 第 1 轮，你打开所有的灯泡。 第 2 轮，每两个灯泡你关闭一次。 第 3 轮，每三个灯泡切换一次开关（如果关闭则开启，如果开启则关闭）。第 i 轮，每 i 个灯泡切换一次开关。 对于第 n 轮，你只切换最后一个灯泡的开关。 找出 n 轮后有多少个亮着的灯泡。



于是转而观察某个位置，看看某个位置是怎样变化的，什么条件下会翻转

第18个灯泡会在1,2,3,6,9,18轮翻转。
第36个灯泡会在1,2,3,4,6,9,13,18,36轮翻转。

规律显而易见，只有在轮数是该位置因数的时候才会执行翻转操作。

于是我们回答了那个问题：只要找到该位置的所有因数个数，我们就知道该位置翻转了多少次。

更进一步的，**除了完全平方数，因数都是成对出现的**，这意味着实际起到翻转作用(0->1)的，只有
完全平方数而已。

此时任务已经大大简化，因为n个灯泡翻转n轮，我们只要看看**到n位置，一共有多少个完全平方数即可**。

**parseInt()比Math.floor()快**

```
var bulbSwitch = function(n) {
    return Math.floor(Math.sqrt(n))
};
```

**执行用时 :72 ms, 在所有 JavaScript 提交中击败了79.17%的用户**

**内存消耗 :33.8 MB, 在所有 JavaScript 提交中击败了12.50%的用户**

#### [718. 最长重复子数组](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)







#### [777. 在LR字符串中交换相邻字符](https://leetcode-cn.com/problems/swap-adjacent-in-lr-string/)

在一个由 'L' , 'R' 和 'X' 三个字符组成的字符串（例如"RXXLRXRXL"）中进行移动操作。一次移动操作指用一个"LX"替换一个"XL"，或者用一个"XR"替换一个"RX"。现给定起始字符串start和结束字符串end，请编写代码，当且仅当存在一系列移动操作使得start可以转换成end时， 返回True。

```
var canTransform = function(start, end) {
    let i=0,j=0;
    while(i<start.length&&j<start.length){
        while(start.charAt(i)=="X"){
            i++
        }
        while(end.charAt(j)=="X"){
            j++
        }
        if(start[i]!=end[j]){
            return false
        }//LR不能互相穿过
        if(start[i]=="R"){
            if(i>j){
                return false
            }
        }//R只能右移
        if(start[i]=="L"){
            if(i<j){
                return false
            }
        }//L只能左移
        i++
        j++
    }
    return true
};
```

**执行用时 :92 ms, 在所有 JavaScript 提交中击败了72.73%的用户**

**内存消耗 :35.7 MB, 在所有 JavaScript 提交中击败了100.00%的用户**



#### [1033. 移动石子直到连续](https://leetcode-cn.com/problems/moving-stones-until-consecutive/)

三枚石子放置在数轴上，位置分别为 a，b，c。

每一回合，我们假设这三枚石子当前分别位于位置 x, y, z 且 x < y < z。从位置 x 或者是位置 z 拿起一枚石子，并将该石子移动到某一整数位置 k 处，其中 x < k < z 且 k != y。

当你无法进行任何移动时，即，这些石子的位置连续时，游戏结束。

要使游戏结束，你可以执行的最小和最大移动次数分别是多少？ 以长度为 2 的数组形式返回答案：answer = [minimum_moves, maximum_moves]

```
var numMovesStones = function(a, b, c) {
    [a,b,c]=[a,b,c].sort((a,b)=>a-b)
    let arr=[0,0];
    if(b-a==1&&c-b==1){
        return arr
    }else if(b-a==1){
        arr[0]=1
    }else if(c-b==1){
        arr[0]=1
    }else if(b-a==2||c-b==2){
        arr[0]=1
    }else{
        arr[0]=2       
    }
    arr[1]=c-a-2
    return arr
};
```

**执行用时 :76 ms, 在所有 JavaScript 提交中击败了90.20%的用户**

**内存消耗 :33.9 MB, 在所有 JavaScript 提交中击败了100.00%的用户**