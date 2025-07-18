---
title: Python_basic
author: GGLG
categories: Python
date: 2025-07-06 00:15:58
tags: [Python, fundamental, grammar, basic, 语法]
---

# <center>Python基础

## <center>第一部分

### 基本操作
```python
#单行注释

'''
多行注释
'''
```

### <center>数据类型及运算符

#### 数据类型
|类型名称|关键字|表示方式|备注|
|:---:|:---:|:---:|:---:|
|整型|int|整数|
|浮点型|float|小数|
|字符串|str|"字符"|
|布尔型|bool|(True/False)|
|列表|list|[元素]|有序序列|
|元组|tuple|(元素)|不可变更有序序列|
|集合|set|{元素}|无序不重复|
|字典|dict|{键值对Key:Value}|有序|

#### 类型转换方法
```python
# 将传入内容强制转换为对应的类型
int()       
float()
str()
bool()
```

#### 运算符
|运算符类别|符号|备注|
|:---:|:---:|:---:|
|算术运算符|+加, -(减), *(乘), /除, %(取模), **(幂次), //(整除)|
|比较运算符|==(等于), !=(不等于), >(大于), <(小于), >=(大于等于), <=(小于等于)|
|赋值运算符|=, +=, -=||
|身份运算符|is, is not|用于两对象一致性判断|
|成员运算符|in, not in|判断元素是否在某个对象中|

### <center>流程控制(分支, 循环)

#### 分支结构
```python
# if 分支

if 分支条件:
    分支内容        # python中代码块的内容注意缩进即可
elif 分支条件:{
    分支内容;        # 多行的代码块内容可用{}括起来并用;隔开增加可读性
    分支内容
}    
else:
    分支内容

# try 分支      常用于异常处理

try:
    分支内容
except 分支条件:
    分支内容
```

#### 循环结构
```python
# for 循环
for 判断条件:
    循环内容

# while 循环
while 判断条件:
    循环内容

# 控制
1. break # 跳出循环
2. continue # 跳过当前循环,直接进入下一次循环
```

### <center>方法和类

#### 方法 (函数)
```python
# 方法 定义
def 方法名(传递参数):
    定义内容

# lambda 定义匿名函数
lambda 传递参数: 表达式
    #例如:
add = lambda a, b: a + b    # 可将定义好的匿名函数赋值给变量,从而进行使用
print(add(3, 4))
```

#### 类
```python
类 = 属性(特征) + 方法(行为)  
'''
类是具体对象的抽象描述, 是具体对象的特征和行为的抽象总结

类的创建可以使得创建具体对象变得简单
'''
# 类 定义
class 类名称(父类):     # 在()中添加父类可以继承父类的属性和方法

    def __init__():    # 初始化
        self.属性名 = 赋值内容      # self 使得该属性或方法在整个类中的任何一个方法都可进行访问 
        属性名 = 赋值内容

    def 方法名(self):
        self.属性名 = 赋值内容 
        属性名 = 赋值内容 
```

### <center>模块导入

```python
# import 导入所需的库文件
import 库名 

# 只导入库中的某个类或者方法
from 库名 import 类或方法名
```

## <center>第二部分

### <center>数据操作

#### 列表操作

##### 列表创建
```python
list = []               # 空列表
list = [1, 2, 3]        # 单类元素列表
list = [1, "string", 3] # 混合列表
list = [[1, 2], [3, 4]] # 嵌套列表

# 使用表达式创建列表
list = [x**2 for x in range(5)]
```

##### 元素访问

###### 索引
```python
list = [1, 2, 3, 4]
print(list[0])      # 访问list第一个元素
print(list[3])      # 访问list末尾元素,list[-1]等效
```
###### 切片
```python
# 切片通过起始和步长值提取出所需要的列表片段
# 语法结构: 
[起始索引:终端索引:步长]

list = [1, 2, 3, 4, 5, 6, 7]
print(list[1:3]) # 输出2, 3(该输出不包含终端索引)
print(list[:3])  # 输出1, 2, 3
print(list[:])   # 输出所有元素(未输入索引表示抵达从源头抵达终端)
```

##### 元素修改
```python
list[索引] = 赋值   # 通过索引赋值即可修该索引对应元素
```

##### 元素添加
```python
# 末尾添加元素
list.append(添加内容)

# 插入元素
list.insert(索引, 插入内容)
```

##### 列表拓展与合并
```python
list = [1, 2, 3]
# 拓展列表
list.extend([4, 5])       # 在list上进行拓展

# 列表合并
combined = list + [6, 7]  # 不修改list列表
```

##### 删除列表元素
```python
# 移除指定元素
list.remove(被移除元素)

# 移除指定索引对应元素
del list[索引]

# 移除指定索引元素并将其值返回
a = list.pop(索引)

# 清空列表
list.clear()
```
##### 遍历列表
```python
# 使用成员运算符in和for循环遍历列表
for num in list:
    print(num, "\n")
```
#### 字典操作

##### 字典创建
```python
# 字典结构
dic = {key:value}       # 键值对
# 例
dic = {"date":07.07}
print(dic["date"])      # 通过键索引值
```

##### 字典新增元素
```python
# 新增元素
dic["fruit"] = apple    # 直接创建新的键并赋予值即可    
```

##### 字典遍历
```python
dic = {}
# 遍历键
for key in dic.keys():

# 遍历值
for value in dic.values():

# 遍历键值
for item in dic.items():    
```

```
其余字典内容与列表内容类似
```