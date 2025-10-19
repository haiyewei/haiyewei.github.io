---
title: refining_contrast_zh-CN
date: 2025-10-19 10:51:05
author: DDLG
categories: DynamicColor
tags: DynamicColor
---
# 优化对比度

在本指南中，您将学习如何使用 MCU 对比度库手动优化颜色对比度。为获得最佳颜色对比度，我们建议您在生产中使用 `DynamicColor` 和 `DynamicScheme` 功能。

有关概念性概述，请参阅[辅助功能对比度](../concepts/contrast_for_accessibility_zh-CN.md)。

## 计算对比度

要测量两种颜色的对比度，请对这两种颜色的色调 (`L*`) 使用 `ratioOfTones` 方法。

HCT 颜色的色调是 `tone` 分量。ARGB 颜色的色调可以通过 `ColorUtils.lstarFromArgb` 方法获得。

<section>

###### Dart

```dart
final contrastRatio = Contrast.ratioOfTones(hct1.tone, hct2.tone);
```

```dart
final tone1 = ColorUtils.lstarFromArgb(argb1);
final tone2 = ColorUtils.lstarFromArgb(argb2);
final contrastRatio = Contrast.ratioOfTones(tone1, tone2);
```

###### Java

```java
double contrastRatio = Contrast.ratioOfTones(hct1.getTone(), hct2.getTone());
```

```java
double tone1 = ColorUtils.lstarFromArgb(argb1);
double tone2 = ColorUtils.lstarFromArgb(argb2);
double contrastRatio = Contrast.ratioOfTones(tone1, tone2);
```

###### TypeScript

```typescript
const contrastRatio = Contrast.ratioOfTones(hct1.tone, hct2.tone);
```

```typescript
const tone1 = ColorUtils.lstarFromArgb(argb1);
const tone2 = ColorUtils.lstarFromArgb(argb2);
const contrastRatio = Contrast.ratioOfTones(tone1, tone2);
```

###### C++

```cpp
double contrast_ratio = RatioOfTones(hct1.get_tone(), hct2.get_tone());
```

```cpp
double tone1 = LstarFromArgb(argb1);
double tone2 = LstarFromArgb(argb2);
double contrast_ratio = RatioOfTones(tone1, tone2);
```

###### Swift

```swift
let contrastRatio = Contrast.ratioOfTones(hct1.tone, hct2.tone)
```

```swift
let tone1 = ColorUtils.lstarFromArgb(argb1)
let tone2 = ColorUtils.lstarFromArgb(argb2)
let contrastRatio = Contrast.ratioOfTones(tone1, tone2)
```

</section>

## 获取对比度好的颜色

函数 `darker` 和 `lighter`（及其变体 `darkerUnsafe` 和 `lighterUnsafe`）允许人们获得与给定颜色的**色调**形成良好对比的**色调**。

如果无法达到所需的对比度，`darker` 和 `lighter` 函数将返回 `-1`，而 `darkerUnsafe` 和 `lighterUnsafe` 将分别返回 `0`（黑色的色调）和 `100`（白色的色调），从而使对比度尽可能高。

名称中的“unsafe”一词表示它们可能返回一种颜色，但不保证对比度。这些函数不会崩溃，但它们的输出颜色可能不符合无障碍标准。

<section>

###### Dart

```dart
final original = ColorUtils.lstarFromArgb(0xFF00AA00);  // 60.56

final darker = Contrast.darker(original, 3.0);  // 29.63
final lighter = Contrast.lighter(original, 3.0);  // 98.93
final darkerUnsafe = Contrast.darkerUnsafe(original, 3.0);  // 29.63
final lighterUnsafe = Contrast.lighterUnsafe(original, 3.0);  // 98.93

final darker = Contrast.darker(original, 7.0);  // -1.0
final lighter = Contrast.lighter(original, 7.0);  // -1.0
final darkerUnsafe = Contrast.darkerUnsafe(original, 7.0);  // 0.0
final lighterUnsafe = Contrast.lighterUnsafe(original, 7.0);  // 100.0
```

###### Java

```java
double original = ColorUtils.lstarFromArgb(0xFF00AA00);  // 60.56

double darker = Contrast.darker(original, 3.0);  // 29.63
double lighter = Contrast.lighter(original, 3.0);  // 98.93
double darkerUnsafe = Contrast.darkerUnsafe(original, 3.0);  // 29.63
double lighterUnsafe = Contrast.lighterUnsafe(original, 3.0);  // 98.93

double darker = Contrast.darker(original, 7.0);  // -1.0
double lighter = Contrast.lighter(original, 7.0);  // -1.0
double darkerUnsafe = Contrast.darkerUnsafe(original, 7.0);  // 0.0
double lighterUnsafe = Contrast.lighterUnsafe(original, 7.0);  // 100.0
```

###### TypeScript

```typescript
const original = ColorUtils.lstarFromArgb(0xFF00AA00);  // 60.56

const darker = Contrast.darker(original, 3.0);  // 29.63
const lighter = Contrast.lighter(original, 3.0);  // 98.93
const darkerUnsafe = Contrast.darkerUnsafe(original, 3.0);  // 29.63
const lighterUnsafe = Contrast.lighterUnsafe(original, 3.0);  // 98.93

const darker = Contrast.darker(original, 7.0);  // -1.0
const lighter = Contrast.lighter(original, 7.0);  // -1.0
const darkerUnsafe = Contrast.darkerUnsafe(original, 7.0);  // 0.0
const lighterUnsafe = Contrast.lighterUnsafe(original, 7.0);  // 100.0
```

###### C++

```cpp
double original = LstarFromArgb(0xFF00AA00);  // 60.56

double darker = Darker(original, 3.0);  // 29.63
double lighter = Lighter(original, 3.0);  // 98.93
double darker_unsafe = DarkerUnsafe(original, 3.0);  // 29.63
double lighter_unsafe = LighterUnsafe(original, 3.0);  // 98.93

double darker = Darker(original, 7.0);  // -1.0
double lighter = Lighter(original, 7.0);  // -1.0
double darker_unsafe = DarkerUnsafe(original, 7.0);  // 0.0
double lighter_unsafe = LighterUnsafe(original, 7.0);  // 100.0
```

###### Swift

```swift
let original = ColorUtils.lstarFromArgb(0xFF00AA00)  // 60.56

let darker = Contrast.darker(tone: original, ratio: 3.0)  // 29.63
let lighter = Contrast.lighter(tone: original, ratio: 3.0)  // 98.93
let darkerUnsafe = Contrast.darkerUnsafe(tone: original, ratio: 3.0)  // 29.63
let lighterUnsafe = Contrast.lighterUnsafe(tone: original, ratio: 3.0)  // 98.93

let darker = Contrast.darker(tone: original, ratio: 7.0)  // -1.0
let lighter = Contrast.lighter(tone: original, ratio: 7.0)  // -1.0
let darkerUnsafe = Contrast.darkerUnsafe(tone: original, ratio: 7.0)  // 0.0
let lighterUnsafe = Contrast.lighterUnsafe(tone: original, ratio: 7.0)  // 100.0
```

</section>

## 引用
- [Dynamic Color](https://github.com/material-foundation/material-color-utilities)
