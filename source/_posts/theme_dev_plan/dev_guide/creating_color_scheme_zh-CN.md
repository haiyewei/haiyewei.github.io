---
title: creating_color_scheme_zh-CN
date: 2025-10-19 10:51:05
author: DDLG
categories: DynamicColor
tags: DynamicColor
---

# 创建配色方案

有关概念性概述，请参阅[动态配色方案](../concepts/dynamic_color_scheme_zh-CN.md)。

## 获取用于主题化的颜色

要获取用于设置 UI 样式的颜色值，第一步是使用以下参数初始化 `DynamicScheme`：

1.  源颜色（以前称为种子颜色）。
    - 可以是 ARGB 格式的 `sourceColorArgb`，或 HCT 格式的 `sourceColorHct`。
2.  方案变体 `variant`。
3.  方案是浅色模式还是深色模式，`isDark`。
4.  对比度级别 `contrastLevel`，类型为 `Double`。建议的级别是：
    - `0.0` 表示默认对比度。
    - `0.5` 表示较高对比度。
    - `1.0` 表示最高对比度。
    - `-1.0` 表示降低对比度。
5.  色调调色板：
    - `primaryPalette`
    - `secondaryPalette`
    - `tertiaryPalette`
    - `neutralPalette`
    - `neutralVariantPalette`
    - `errorPalette`

我们提供了各种方案变体，例如 `SchemeTonalSpot`、`SchemeContent` 等，它们继承自 `DynamicScheme` 并带有预定义的色调调色板。这意味着您只需要指定源颜色、主题模式和对比度级别即可创建方案。

`DynamicScheme` 对象不存储特定颜色角色的 ARGB 或 HCT 值。相反，这些值是按需生成的，您可以使用 `DynamicColor` 类获取它们。我们提供了像 `DynamicScheme.primary` 这样的颜色角色 API，以便更轻松地获取特定颜色。

## 分步说明

### 1. 生成方案

#### 方法 1 — 使用变体

从源颜色生成方案的推荐方法是使用方案变体构造函数，例如 `SchemeTonalSpot`。以下示例从 HCT 格式的源颜色 `hct` 生成一个浅色模式、默认对比度的 `SchemeTonalSpot` 方案。

<section>

###### Dart

```dart
final scheme = SchemeTonalSpot(sourceColorHct: hct, isDark: false, contrastLevel: 0.0);
```

###### Java

```java
DynamicScheme scheme = new SchemeTonalSpot(hct, false, 0.0);
```

###### TypeScript

```typescript
const scheme = new SchemeTonalSpot(hct, false, 0.0);
```

###### C++

```cpp
DynamicScheme scheme = SchemeTonalSpot(hct, false, 0.0);
```

###### Swift

```swift
let scheme = SchemeTonalSpot(
    sourceColorHct: hct,
    isDark: false,
    contrastLevel: 0.0)
```

</section>

我们提供以下变体：

- Content
- Expressive
- Fidelity
- Fruit salad
- Monochrome
- Neutral
- Rainbow
- Tonal spot
- Vibrant

#### 方法 2 — 指定调色板

<section>

###### Dart

```dart
final scheme = DynamicScheme(
    sourceColorArgb: 0xFFEB0057,
    variant: Variant.vibrant,
    isDark: false,
    contrastLevel: 0.0,
    primaryPalette: TonalPalette.fromHct(Hct.fromInt(0xFFEB0057)),
    secondaryPalette: TonalPalette.fromHct(Hct.fromInt(0xFFF46B00)),
    tertiaryPalette: TonalPalette.fromHct(Hct.fromInt(0xFF00AB46)),
    neutralPalette: TonalPalette.fromHct(Hct.fromInt(0xFF949494)),
    neutralVariantPalette: TonalPalette.fromHct(Hct.fromInt(0xFFBC8877)),
);
```

###### Java

```java
DynamicScheme scheme = new DynamicScheme(
    /*sourceColorHct=*/ Hct.fromInt(0xFFEB0057),
    /*variant=*/ Variant.VIBRANT,
    /*isDark=*/ false,
    /*contrastLevel=*/ 0.0,
    /*primaryPalette=*/ TonalPalette.fromInt(0xFFEB0057),
    /*secondaryPalette=*/ TonalPalette.fromInt(0xFFF46B00),
    /*tertiaryPalette=*/ TonalPalette.fromInt(0xFF00AB46),
    /*neutralPalette=*/ TonalPalette.fromInt(0xFF949494),
    /*neutralVariantPalette=*/ TonalPalette.fromInt(0xFFBC8877));
```

###### TypeScript

```typescript
const scheme = new DynamicScheme({
  sourceColorArgb: 0xffeb0057,
  variant: Variant.VIBRANT,
  isDark: false,
  contrastLevel: 0.0,
  primaryPalette: TonalPalette.fromInt(0xffeb0057),
  secondaryPalette: TonalPalette.fromInt(0xfff46b00),
  tertiaryPalette: TonalPalette.fromInt(0xff00ab46),
  neutralPalette: TonalPalette.fromInt(0xff949494),
  neutralVariantPalette: TonalPalette.fromInt(0xffbc8877),
});
```

###### C++

```cpp
DynamicScheme scheme = DynamicScheme(
    /*source_color_argb=*/ 0xFFEB0057,
    /*variant=*/ Variant::kVibrant,
    /*contrast_level=*/ 0.0,
    /*is_dark=*/ false,
    /*primary_palette=*/ TonalPalette(0xFFEB0057),
    /*secondary_palette=*/ TonalPalette(0xFFF46B00),
    /*tertiary_palette=*/ TonalPalette(0xFF00AB46),
    /*neutral_palette=*/ TonalPalette(0xFF949494),
    /*neutral_variant_palette=*/ TonalPalette(0xFFBC8877));
```

###### Swift

```swift
let scheme = DynamicScheme(
    sourceColorArgb: 0xFFEB0057,
    variant: Variant.vibrant,
    isDark: false,
    contrastLevel: 0.0,
    primaryPalette: TonalPalette.fromHct(Hct(0xFFEB0057)),
    secondaryPalette: TonalPalette.fromHct(Hct(0xFFF46B00)),
    tertiaryPalette: TonalPalette.fromHct(Hct(0xFF00AB46)),
    neutralPalette: TonalPalette.fromHct(Hct(0xFF949494)),
    neutralVariantPalette: TonalPalette.fromHct(Hct(0xFFBC8877)))
```

</section>

### 2. 获取颜色

颜色可以是 ARGB 或 HCT 格式。下面显示了如何获取 `primary` 颜色。

<section>

###### Dart

```dart
final argb = scheme.primary;
```

或者,

```dart
final argb = MaterialDynamicColors.primary.getArgb(scheme);
final hct = MaterialDynamicColors.primary.getHct(scheme);
```

###### Java

```java
int argb = scheme.getPrimary();
```

或者,

```java
MaterialDynamicColors materialDynamicColors = new MaterialDynamicColors();
int argb = materialDynamicColors.primary().getArgb(scheme);
Hct hct = materialDynamicColors.primary().getHct(scheme);
```

###### TypeScript

```typescript
const argb = scheme.primary;
```

或者,

```typescript
const argb = MaterialDynamicColors.primary.getArgb(scheme);
const hct = MaterialDynamicColors.primary.getHct(scheme);
```

###### C++

```cpp
Argb argb = MaterialDynamicColors::Primary().GetArgb(s);
Hct hct = MaterialDynamicColors::Primary().GetHct(s);
```

###### Swift

```swift
let argb = scheme.primary
```

或者,

```swift
let argb = MaterialDynamicColors.primary.getArgb(scheme)
let hct = MaterialDynamicColors.primary.getHct(scheme)
```

</section>

## 对于使用 `Scheme` 的现有库用户

`Scheme` 类将很快被弃用，因为它不支持不同的对比度级别。`Scheme` 的功能已完全由 `SchemeTonalSpot` 和 `SchemeContent` 复制。

<section>

###### Dart

| 替代 …                       | 使用 …                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `Scheme.light(color)`        | `SchemeTonalSpot(sourceColorHct: Hct.fromInt(color), isDark: false, contrastLevel: 0.0)` |
| `Scheme.dark(color)`         | `SchemeTonalSpot(sourceColorHct: Hct.fromInt(color), isDark: true, contrastLevel: 0.0)`  |
| `Scheme.lightContent(color)` | `SchemeContent(sourceColorHct: Hct.fromInt(color), isDark: false, contrastLevel: 0.0)`   |
| `Scheme.darkContent(color)`  | `SchemeContent(sourceColorHct: Hct.fromInt(color), isDark: true, contrastLevel: 0.0)`    |

###### Java

| 替代 …                       | 使用 …                                                |
| ---------------------------- | ----------------------------------------------------- |
| `Scheme.light(color)`        | `new SchemeTonalSpot(Hct.fromInt(color), false, 0.0)` |
| `Scheme.dark(color)`         | `new SchemeTonalSpot(Hct.fromInt(color), true, 0.0)`  |
| `Scheme.lightContent(color)` | `new SchemeContent(Hct.fromInt(color), false, 0.0)`   |
| `Scheme.darkContent(color)`  | `new SchemeContent(Hct.fromInt(color), true, 0.0)`    |

###### TypeScript

| 替代 …                       | 使用 …                                                |
| ---------------------------- | ----------------------------------------------------- |
| `Scheme.light(color)`        | `new SchemeTonalSpot(Hct.fromInt(color), false, 0.0)` |
| `Scheme.dark(color)`         | `new SchemeTonalSpot(Hct.fromInt(color), true, 0.0)`  |
| `Scheme.lightContent(color)` | `new SchemeContent(Hct.fromInt(color), false, 0.0)`   |
| `Scheme.darkContent(color)`  | `new SchemeContent(Hct.fromInt(color), true, 0.0)`    |

###### C++

| 替代 …                                   | 使用 …                                    |
| ---------------------------------------- | ----------------------------------------- |
| `MaterialLightColorScheme(color)`        | `SchemeTonalSpot(Hct(color), false, 0.0)` |
| `MaterialDarkColorScheme(color)`         | `SchemeTonalSpot(Hct(color), true, 0.0)`  |
| `MaterialLightContentColorScheme(color)` | `SchemeContent(Hct(color), false, 0.0)`   |
| `MaterialDarkContentColorScheme(color)`  | `SchemeContent(Hct(color), true, 0.0)`    |

###### Swift

| 替代 …                       | 使用 …                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `Scheme.light(color)`        | `SchemeTonalSpot(sourceColorHct: Hct.fromInt(color), isDark: false, contrastLevel: 0.0)` |
| `Scheme.dark(color)`         | `SchemeTonalSpot(sourceColorHct: Hct.fromInt(color), isDark: true, contrastLevel: 0.0)`  |
| `Scheme.lightContent(color)` | `SchemeContent(sourceColorHct: Hct.fromInt(color), isDark: false, contrastLevel: 0.0)`   |
| `Scheme.darkContent(color)`  | `SchemeContent(sourceColorHct: Hct.fromInt(color), isDark: true, contrastLevel: 0.0)`    |

</section>

对于 `Scheme.lightFromCorePalette` 和 `Scheme.darkFromCorePalette`（在 C++ 中是 `MaterialLightColorSchemeFromPalette` 和 `MaterialDarkColorSchemeFromPalette`），请改用 `DynamicScheme` 构造函数。

请参阅 **步骤 2 — 获取颜色** 以从 `DynamicScheme` 获取颜色。

由于规范更新，许多颜色角色的值在 `Scheme` 和新的动态方案 `SchemeTonalSpot` 和 `SchemeContent` 之间发生了变化。迁移后，您可能需要更新测试。

对于 `SchemeTonalSpot`，使用“primary”和“neutral”调色板的颜色角色（例如 `onPrimary` 和 `outline`）可能会受到影响。此外，`background` 和 `surface` 角色的色调也已更新。

对于 `SchemeContent`，所有颜色都可能受到影响，因为 `SchemeContent` 是一个保真方案：颜色角色的色调可能取决于种子颜色的色调。

## 引用

- [Dynamic Color](https://github.com/material-foundation/material-color-utilities)
