# Scale ImageData

``` bash
npm install scale-image-data
```

## 公式
> 以下不是严谨的解题过程，而是记录思考的过程，即“明确问题”与“通过‘推导’与‘观察过程’得到答案”。

### 问题描述
对于给定的 img_data（横向 3 个，纵向 2 个，共 3*2=6 个像素）:

<table>
  <tr>
    <th></th>
    <th>0</th>
    <th>1</th>
    <th>2</th>
  </tr>
  <tr>
    <th>0</th>
    <td>r0,g0,b0,a0</td>
    <td>r1,g1,b1,a1</td>
    <td>r2,g2,b2,a2</td>
  </tr>
  <tr>
    <th>1</th>
    <td>r3,g3,b3,a3</td>
    <td>r4,g4,b4,a4</td>
    <td>r5,g5,b5,a5</td>
  </tr>
</table>

其 ImageData 结构为：
``` js
{
  width: 3,
  height: 2,
  data: [r0,g0,b0,a0, r1,g1,b1,a1, r2,g2,b2,a2, ...],
}
```

其中 `g5` 的下标为 21，这里记为 `index=21`。

`g5` 的位置是第 2 列、第 1 行的格子中的第 1 个，
于是其坐标记为 `(2, 1, 1)`。

设映射 `f: index => (x, y, z)`，求 *f*。

### 解

##### 常量 width
引入常量 `width = img_data.width`，即图片横向的像素数。
本题中的 width 值 为 3。

##### *fx*, *fy*, *fz*

设:
+ `fx: index => x`
+ `fy: index => y`
+ `fz: index => z`

由题可知：`f(21) = (2, 1, 1)`，于是：
+ `fx(21) = 2`
+ `fy(21) = 1`
+ `fz(21) = 1`

##### *fn*
设 `fn: index => n` 为 index 到“第 n 个颜色”的映射。

据观察，可知：
``` js
fn(index) = Math.floor(index / 4)
```

验证：
``` js
fn(21) = Math.floor(21 / 4) = 5
```

##### 求 *fz*
据观察，可知：
``` js
fz(index) = index % 4
```

验证：
``` js
fz(21) = 21 % 4 = 1
```

##### 求 *fy*
据观察，可知:
``` js
fy(index) = Math.floor(index / (width * 4))
```

验证：
``` js
fy(21) = Math.floor(21 / (3*4)) = 1
```

##### 求 *fx*
据观察，可知：
``` js
fx(index) = fn(index) % width
          = Math.floor(index / 4) % width
```

验证：
``` js
fx(21) = 5 % 3 = 2
```

##### *f*
于是：
``` js
f(index)
        = (fx(index), fy(index), fz(index))
        = (
          Math.floor(index / 4) % width,
          Math.floor(index / (width * 4)),
          index % 4,
        )
```
