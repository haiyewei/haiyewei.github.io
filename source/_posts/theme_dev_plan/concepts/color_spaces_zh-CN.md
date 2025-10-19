---
title: color_spaces_zh-CN
date: 2025-10-19 10:51:05
author: DDLG
categories: DynamicColor
tags: DynamicColor
---
# MCU 中的色彩空间

## 概述

色彩空间用于描述颜色。当颜色在不同的色彩空间之间转换时，它本身并不会改变。就像使用不同的“距离单位”（如公里或英里）不会改变你所在的位置一样，它只是改变了衡量你位置的方式。

当今设计中使用的色彩空间，如 RGB、HSL、CMYK 等，虽然能够指定颜色，但在几个基本方面存在缺陷。它们能描述颜色，但不能很好地描述颜色之间的关系。因此，MCU 使用多个**色彩空间**来创建一个动态的设计系统。每个色彩空间在不同的领域都有其用途，并提供了一种理解颜色的方式。

例如，sRGB 对于机器来说很容易显示，但对于人类来说却不然。你能得到颜色，但得不到其特性。HCT 提供了一种定义颜色不同特性的方法，例如色相、色度和色调。MCU 在 HCT 中进行大部分计算，然后将颜色转换为 sRGB 以供使用。

## 基础知识

在每个色彩空间中，颜色都表示为坐标系中的点。任何点都可以通过矩形（笛卡尔）或圆形（极坐标）坐标来定位。例如，下面这个自然界中存在的特定颜色，可以在每个空间中使用三个数值来描述。

![颜色十六进制代码 #ff6600](/images/orange.png){style="float: left; padding: 50px"}

| 色彩空间 | 坐标 |
| --- | --- |
| sRGB | 255, 102, 0 (十六进制代码: #ff6600) |
| 线性 RGB | 100.00, 13.29, 0.00 |
| XYZ | 45.99, 30.76, 3.52 |
| L\*a\*b\* | 62.31, 54.99, 71.33 |
| Cam16-JCH | 55.16, 79.39, 42.39 |
| Cam16-UCS | 67.65, 28.75, 26.24 |
| HCT | 42.39, 79.39, 62.31 |

大多数色彩空间都是三维的，这并非巧合。人眼通常拥有三种类型的视锥细胞：一种对较短波长最敏感（通常称为蓝色），另一种对中等波长最敏感（通常称为绿色），第三种对较长波长最敏感（通常称为红色）。细胞对不同波长的光产生的信号有不同强度的反应。因此，人类对任何颜色的感知都可以用三个数值来描述。

每个色彩空间可以表示的颜色范围都不同。像 **XYZ** 这样的色彩空间可以表示人眼能看到的所有颜色。它们是客观描述颜色的有用基础。相反，**sRGB** 色彩空间对于显示颜色很有用；然而，由于色域的形状，某些颜色无法使用三种可显示的原色来表示，导致它们在 sRGB 色彩空间中缺失。

## MCU 中使用的色彩空间

### sRGB

RGB 将颜色表示为红色、绿色和蓝色的组合。这主要用于显示。每个通道的位深度通常为 8，这意味着有 256<sup>3</sup> = 16,777,216 种可用颜色。

在 MCU 中，sRGB 颜色通常以 ARGB 格式的十六进制数出现：例如，`#abcdef` 是 `0xffabcdef`。开头的 `ff` 表示这是一种不透明的颜色（alpha = `0xff`）。

### HCT

Cam16-JCH 和 L\*a\*b\* 的结合被用于在 MCU 中引入 HCT。这个色彩空间对于创建配色方案、混合颜色和处理不讨喜的颜色至关重要。

请注意，虽然 HCT 是无限的，但它可以描述像 H26 C231 T100 这样的颜色。然而，这种颜色并非“真实”存在。没有一种红色（H26）既*极其*鲜艳（C231）又和白色一样亮（T100）。当它被转换为 RGB 以进行显示时，HCT 会保留色调，并降低色度，直到颜色变得可行。

### Cam16

CAM16 是一个**颜色外观模型**，它考虑了**观看条件**。同一个红色色块在中午和晚上看起来会不同，甚至在背景颜色不同这样简单的情况下也会有所不同。

其目标是准确地表示人类对颜色的感知。Cam16 模型使用 `ViewingCondition` 类来定义环境，使用相同的十六进制代码但不同的 `ViewingCondition` 对象可以产生不同的“Cam16”对象。该库提供了一个标准的默认 `ViewingCondition`。

一个 `Cam16` 对象包含 9 个分量，如果给定以下任何一项，就可以唯一确定：

-   一个由 {`j`, `q`} 中的一个、{`chroma`, `m`, `s`} 中的一个和 `hue` 组成的三元组
-   一个由 `jstar`、`astar` 和 `bstar` 组成的三元组

从技术上讲，Cam16 不是一个单一的色彩空间，而是包含多个色彩空间。MCU 将**Cam16-JCH**（使用分量 `j`、`chroma`、`hue`）和 **Cam16-UCS**（使用分量 `jstar`、`astar`、`bstar`）用于不同的目的。

### XYZ (CIEXYZ)

XYZ 有时被称为**连接器空间**，每个色彩空间都可以与它相互转换。它经常用于转换，但不适合设计。它不试图提供颜色的感知上准确的属性，并且三个通道在视觉上是相互依赖的。

这个线性色彩空间与视锥细胞对光的反应方式密切相关。

### L\*a\*b\* (CIELAB)

一个旨在实现感知均匀的色彩空间。内部用于图像量化。

L\*a\*b\* 和 RGB 一样，都在一个立方体中。

-   L\* 是 Z 轴，代表亮度。
-   a\* 是 X 轴，从左到右，从绿色到红色。
-   b\* 是 Y 轴，从下到上，从蓝色到黄色。

### 线性 RGB (`linrgb`)

sRGB 色彩空间的线性化版本，对位深度没有限制。

内部用于 HCT 求解器。

## 色彩空间之间的转换

<section>

###### Dart

*   sRGB ⇌ HCT
    -   `Hct.fromInt(argb)`
    -   `Hct.from(h, c, t).toInt()`
*   sRGB ⇌ XYZ
    -   `ColorUtils.xyzFromArgb(argb)`
    -   `ColorUtils.argbFromXyz(x, y, z)`
*   sRGB ⇌ Cam16
    -   `Cam16.fromInt(argb)`
    -   `cam16.toInt()`
    -   从 JCH 或 UCS 构建 Cam16：
        -   `Cam16.fromJch(j, c, h)`
        -   `Cam16.fromUcs(jstar, astar, bstar)`
*   XYZ ⇌ Cam16
    -   `Cam16.fromXyzInViewingConditions(x, y, z, vc)`
    -   `cam16.xyzInViewingConditions(vc)`
*   sRGB ⇌ L\*a\*b\*
    -   `ColorUtils.labFromArgb(argb)`
    -   `ColorUtils.argbFromLab(l, a, b)`
*   linRGB → sRGB
    -   `ColorUtils.argbFromLinrgb(linrgb)`

###### Java

*   sRGB ⇌ HCT
    -   `Hct.fromInt(argb)`
    -   `Hct.from(h, c, t).toInt()`
*   sRGB ⇌ XYZ
    -   `ColorUtils.xyzFromArgb(argb)`
    -   `ColorUtils.argbFromXyz(x, y, z)`
*   sRGB ⇌ Cam16
    -   `Cam16.fromInt(argb)`
    -   `cam16.toInt()`
    -   从 JCH 或 UCS 构建 Cam16：
        -   `Cam16.fromJch(j, c, h)`
        -   `Cam16.fromUcs(jstar, astar, bstar)`
*   XYZ ⇌ Cam16
    -   `Cam16.fromXyzInViewingConditions(x, y, z, vc)`
    -   `cam16.xyzInViewingConditions(vc, returnArray)`
*   sRGB ⇌ L\*a\*b\*
    -   `ColorUtils.labFromArgb(argb)`
    -   `ColorUtils.argbFromLab(l, a, b)`
*   linRGB → sRGB
    -   `ColorUtils.argbFromLinrgb(linrgb)`

###### TypeScript

*   sRGB ⇌ HCT
    -   `Hct.fromInt(argb)`
    -   `Hct.from(h, c, t).toInt()`
*   sRGB ⇌ XYZ
    -   `colorUtils.xyzFromArgb(argb)`
    -   `colorUtils.argbFromXyz(x, y, z)`
*   sRGB ⇌ Cam16
    -   `Cam16.fromInt(argb)`
    -   `cam16.toInt()`
    -   从 JCH 或 UCS 构建 Cam16：
        -   `Cam16.fromJch(j, c, h)`
        -   `Cam16.fromUcs(jstar, astar, bstar)`
*   XYZ ⇌ Cam16
    -   `Cam16.fromXyzInViewingConditions(x, y, z, vc)`
    -   `cam16.xyzInViewingConditions(vc)`
*   sRGB ⇌ L\*a\*b\*
    -   `colorUtils.labFromArgb(argb)`
    -   `colorUtils.argbFromLab(l, a, b)`
*   linRGB → sRGB
    -   `colorUtils.argbFromLinrgb(linrgb)`

###### C++

*   sRGB ⇌ HCT
    -   `Hct::Hct(argb)`
    -   `Hct::ToInt()`
*   sRGB ⇌ XYZ — *尚未提供*
*   sRGB ⇌ Cam16
    -   `CamFromInt(argb)`
    -   `IntFromCam(cam)`
    -   (*尚无法从 JCH 构建 Cam16*)
    -   从 UCS 构建 Cam16：
        -   `CamFromUcsAndViewingConditions(jstar, astar, bstar, vc)`
*   XYZ ⇌ Cam16
    -   `CamFromXyzAndViewingConditions(x, y, z, vc)`
    -   (*尚无法将 Cam16 转换为 XYZ*)
*   sRGB ⇌ L\*a\*b\*
    -   `LabFromInt(argb)`
    -   `IntFromLab(lab)`
*   linRGB → sRGB
    -   `ArgbFromLinrgb(linrgb)`

###### Swift

*   sRGB ⇌ HCT
    -   `Hct.fromInt(argb)`
    -   `Hct.from(h, c, t).toInt()`
*   sRGB ⇌ XYZ
    -   `ColorUtils.xyzFromArgb(argb)`
    -   `ColorUtils.argbFromXyz(x, y, z)`
*   sRGB ⇌ Cam16
    -   `Cam16.fromInt(argb)`
    -   `cam16.toInt()`
    -   从 JCH 或 UCS 构建 Cam16：
        -   `Cam16.fromJch(j, c, h)`
        -   `Cam16.fromUcs(jstar, astar, bstar)`
*   XYZ ⇌ Cam16
    -   `Cam16.fromXyzInViewingConditions(x, y, z, vc)`
    -   `cam16.xyzInViewingConditions(vc)`
*   sRGB ⇌ L\*a\*b\*
    -   `ColorUtils.labFromArgb(argb)`
    -   `ColorUtils.argbFromLab(l, a, b)`
*   linRGB → sRGB
    -   `ColorUtils.argbFromLinrgb(linrgb)`

</section>

## 参考资料

### 维基百科

-   [色彩空间](https://zh.wikipedia.org/wiki/色彩空间)
-   [颜色模型](https://zh.wikipedia.org/wiki/颜色模型)
-   [sRGB](https://zh.wikipedia.org/wiki/SRGB)
    -   [sRGB: Gamma](https://en.wikipedia.org/wiki/SRGB#Transfer_function_\(%22gamma%22\))
-   [伽玛校正](https://zh.wikipedia.org/wiki/伽玛校正)
-   [CIE 1931 色彩空间 (CIEXYZ 等)](https://zh.wikipedia.org/wiki/CIE_1931_色彩空间)
-   [CIELAB 色彩空间 (L\*a\*b\*)](https://zh.wikipedia.org/wiki/CIELAB色彩空间)
-   [颜色外观模型 (CAM)](https://en.wikipedia.org/wiki/Color_appearance_model)
    -   [Cam16](https://en.wikipedia.org/wiki/Color_appearance_model#CAM16)

## 引用
- [Dynamic Color](https://github.com/material-foundation/material-color-utilities)
