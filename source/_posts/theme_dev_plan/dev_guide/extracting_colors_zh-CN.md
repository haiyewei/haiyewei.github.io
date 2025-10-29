---
title: extracting_colors_zh-CN
date: 2025-10-19 10:51:05
author: DDLG
categories: DynamicColor
tags: DynamicColor
---

# 从图像中提取颜色

有关概念性概述，请参阅[颜色提取](../concepts/color_extraction_zh-CN.md)。

## 步骤 1 — 图像到像素

第一步是将图像转换为 **ARGB 格式的像素数组**。在此之前，请将其大小调整为 128 × 128 像素以便更快地处理。

MCU 不提供此功能，因此您必须依赖您编程语言中的惯用方法。例如，在 Java 中，可以使用 `BufferedImage.getRGB` 方法：

```java
import java.awt.image.BufferedImage;

class ImageUtils {
  // ...

  public static int[] imageToPixels(BufferedImage image) {
    int width = image.getWidth();
    int height = image.getHeight();
    BufferedImage outputImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
    return image.getRGB(0, 0, width, height, null, 0, width);
  }
}
```

## 步骤 2 — 像素到主色

一旦有了像素数组，就将其传递给 `quantize` 库提供的 `QuantizerCelebi.quantize`。

<section>

###### Dart

```dart
final quantizerResult = await QuantizerCelebi.quantize(pixels, maxColors);
```

###### Java

```java
QuantizerResult quantizerResult = QuantizerCelebi.quantize(pixels, maxColors);
```

###### TypeScript

```typescript
const quantizerResult = QuantizerCelebi.quantize(pixels, maxColors);
```

###### C++

```cpp
QuantizerResult quantizer_result = QuantizeCelebi(pixels, max_colors);
```

###### Swift

```swift
let quantizerResult = QuantizerCelebi().quantize(pixels, maxColors)
```

</section>

参数 `maxColors` 是量化器返回颜色数量的限制。一个合理的默认值是 128。

## 步骤 3 — 主色到源色

使用 `score` 库提供的 `Score.score` 方法来提取适合作为配色方案种子的颜色，并按适用性降序排列。

<section>

###### Dart

```dart
final colors = Score.score(quantizerResult.colorToCount);
```

###### Java

```java
List<Integer> colors = Score.score(quantizerResult);
```

###### TypeScript

```typescript
final colors = Score.score(quantizerResult);
```

###### C++

```cpp
std::vector<Argb> colors = RankedSuggestions(quantizer_result.color_to_count);
```

###### Swift

```swift
let colors = Score.score(quantizerResult.colorToCount)
```

</section>

## 引用

- [Dynamic Color](https://github.com/material-foundation/material-color-utilities)
