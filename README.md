#vali.js
中文API地址：http://1029131145.github.io/vali/

#使用方法
```javascript
<!-- 非常简单 -->
<form class="form">
    <input type="text" email="t" vali>
</form>
<script type="text/javascript">
    $(".form").vali();
</script>
```

-------------------
# v1.2
**更新内容**  
1.修复了一个Bug,这个Bug导致提示框宽度不跟输入框一样，主要原因是padding and border  
2.优化了提示框top属性不准确小Bug，可以通过 disparityH 修改误差  


-------------------
# v1.1
**更新内容**  
1.验证银行卡，现在必须得是真实的银行卡才能通过验证  
2.验证身份证，现在必须得是真实的身份证才能通过验证  
3.日期验证 1.0版本必须是 1996-5-21，现在1996/5/21 也可以通过验证  
4.货币验证，小数位设置可以用过元素属性进行设置  
```javascript
<!-- dp is 位数 -->
<input type="text" number="y" dp="3" vali>
```


-------------------
# v1.0
提供快速验证表单的很强大的控件。由于是初版，问题还有很多，希望大家能多多协助。
