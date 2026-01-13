/**
 * Material Design 3 主题生成工具
 * 使用 @material/material-color-utilities 从种子颜色生成完整的调色板
 */
import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  type Theme,
} from '@material/material-color-utilities';
import { getSeedColor } from './config';

// ============ 类型定义 ============

/** 颜色角色映射 */
export interface ColorRoles {
  // Primary 主色系
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  // Secondary 次要色系
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  // Tertiary 第三色系
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error 错误色系
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Background & Surface 背景和表面
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;

  // Outline 轮廓
  outline: string;
  outlineVariant: string;

  // Inverse 反色
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;

  // Shadow & Scrim
  shadow: string;
  scrim: string;

  // Surface Tones 表面色调
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
}

/** 主题调色板 */
export interface ThemePalette {
  light: ColorRoles;
  dark: ColorRoles;
}

// ============ 主题生成函数 ============

/**
 * 从种子颜色生成 Material Design 3 主题
 * @param seedColor 种子颜色（十六进制格式，如 "#6750A4"）
 * @returns 包含浅色和深色模式的完整调色板
 */
export function generateTheme(seedColor: string): ThemePalette {
  // 将十六进制颜色转换为 ARGB 格式
  const sourceColor = argbFromHex(seedColor);

  // 使用 Material Color Utilities 生成主题
  const theme = themeFromSourceColor(sourceColor);

  return {
    light: extractColorRoles(theme, 'light'),
    dark: extractColorRoles(theme, 'dark'),
  };
}

/**
 * 从 Material 主题中提取颜色角色
 * @param theme Material 主题对象
 * @param mode 主题模式（'light' 或 'dark'）
 * @returns 颜色角色对象
 */
function extractColorRoles(
  theme: Theme,
  mode: 'light' | 'dark'
): ColorRoles {
  const scheme = mode === 'light' ? theme.schemes.light : theme.schemes.dark;
  const neutralPalette = theme.palettes.neutral;

  // Surface tone 值根据 Material Design 3 规范
  // 浅色模式和深色模式使用不同的 tone 值
  const surfaceTones = mode === 'light'
    ? {
        surfaceDim: 87,
        surfaceBright: 98,
        surfaceContainerLowest: 100,
        surfaceContainerLow: 96,
        surfaceContainer: 94,
        surfaceContainerHigh: 92,
        surfaceContainerHighest: 90,
      }
    : {
        surfaceDim: 6,
        surfaceBright: 24,
        surfaceContainerLowest: 4,
        surfaceContainerLow: 10,
        surfaceContainer: 12,
        surfaceContainerHigh: 17,
        surfaceContainerHighest: 22,
      };

  return {
    // Primary
    primary: hexFromArgb(scheme.primary),
    onPrimary: hexFromArgb(scheme.onPrimary),
    primaryContainer: hexFromArgb(scheme.primaryContainer),
    onPrimaryContainer: hexFromArgb(scheme.onPrimaryContainer),

    // Secondary
    secondary: hexFromArgb(scheme.secondary),
    onSecondary: hexFromArgb(scheme.onSecondary),
    secondaryContainer: hexFromArgb(scheme.secondaryContainer),
    onSecondaryContainer: hexFromArgb(scheme.onSecondaryContainer),

    // Tertiary
    tertiary: hexFromArgb(scheme.tertiary),
    onTertiary: hexFromArgb(scheme.onTertiary),
    tertiaryContainer: hexFromArgb(scheme.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(scheme.onTertiaryContainer),

    // Error
    error: hexFromArgb(scheme.error),
    onError: hexFromArgb(scheme.onError),
    errorContainer: hexFromArgb(scheme.errorContainer),
    onErrorContainer: hexFromArgb(scheme.onErrorContainer),

    // Background & Surface
    background: hexFromArgb(scheme.background),
    onBackground: hexFromArgb(scheme.onBackground),
    surface: hexFromArgb(scheme.surface),
    onSurface: hexFromArgb(scheme.onSurface),
    surfaceVariant: hexFromArgb(scheme.surfaceVariant),
    onSurfaceVariant: hexFromArgb(scheme.onSurfaceVariant),

    // Outline
    outline: hexFromArgb(scheme.outline),
    outlineVariant: hexFromArgb(scheme.outlineVariant),

    // Inverse
    inverseSurface: hexFromArgb(scheme.inverseSurface),
    inverseOnSurface: hexFromArgb(scheme.inverseOnSurface),
    inversePrimary: hexFromArgb(scheme.inversePrimary),

    // Shadow & Scrim
    shadow: hexFromArgb(scheme.shadow),
    scrim: hexFromArgb(scheme.scrim),

    // Surface Tones - 使用 neutral 调色板手动计算
    // 因为 @material/material-color-utilities@0.3.0 的 scheme 对象
    // 可能不包含这些属性或返回 0
    surfaceDim: hexFromArgb(neutralPalette.tone(surfaceTones.surfaceDim)),
    surfaceBright: hexFromArgb(neutralPalette.tone(surfaceTones.surfaceBright)),
    surfaceContainerLowest: hexFromArgb(neutralPalette.tone(surfaceTones.surfaceContainerLowest)),
    surfaceContainerLow: hexFromArgb(neutralPalette.tone(surfaceTones.surfaceContainerLow)),
    surfaceContainer: hexFromArgb(neutralPalette.tone(surfaceTones.surfaceContainer)),
    surfaceContainerHigh: hexFromArgb(neutralPalette.tone(surfaceTones.surfaceContainerHigh)),
    surfaceContainerHighest: hexFromArgb(neutralPalette.tone(surfaceTones.surfaceContainerHighest)),
  };
}

/**
 * 将颜色角色转换为 CSS 变量字符串
 * @param colors 颜色角色对象
 * @param prefix CSS 变量前缀（默认为 'md'）
 * @returns CSS 变量字符串
 */
export function colorRolesToCssVariables(
  colors: ColorRoles,
  prefix: string = 'md'
): string {
  const lines: string[] = [];

  // 将 camelCase 转换为 kebab-case
  const toKebabCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  for (const [key, value] of Object.entries(colors)) {
    const cssVarName = `--${prefix}-${toKebabCase(key)}`;
    lines.push(`  ${cssVarName}: ${value};`);
  }

  return lines.join('\n');
}

/**
 * 生成完整的主题 CSS（基础版本）
 * @param seedColor 种子颜色
 * @param prefix CSS 变量前缀
 * @returns 完整的 CSS 字符串
 */
export function generateThemeCss(
  seedColor: string,
  prefix: string = 'md'
): string {
  const palette = generateTheme(seedColor);

  const lightVars = colorRolesToCssVariables(palette.light, prefix);
  const darkVars = colorRolesToCssVariables(palette.dark, prefix);

  return `/* Material Design 3 主题变量 - 由 ${seedColor} 生成 */

/* 浅色模式 */
:root {
${lightVars}
}

/* 深色模式 */
:root.dark {
${darkVars}
}

/* 系统偏好检测 */
@media (prefers-color-scheme: dark) {
  :root:not(.light):not(.dark) {
${darkVars}
  }
}
`;
}

/**
 * 生成完整的主题 CSS（包含语义化映射）
 * 用于在 BaseLayout 中内联注入
 * @param seedColor 种子颜色
 * @returns 完整的 CSS 字符串，包含 MD3 变量和语义化映射
 */
export function generateFullThemeCss(seedColor: string): string {
  const palette = generateTheme(seedColor);

  const lightVars = colorRolesToCssVariables(palette.light, 'md');
  const darkVars = colorRolesToCssVariables(palette.dark, 'md');

  // 语义化映射 - 浅色模式
  const lightSemanticVars = `  /* 品牌色 */
  --color-primary: var(--md-primary);
  --color-primary-light: var(--md-primary-container);
  --color-primary-dark: var(--md-primary);

  /* 语义色 */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: var(--md-error);
  --color-info: var(--md-primary);

  /* 中性色 - 从 MD3 surface 色调生成 */
  --color-gray-50: var(--md-surface-container-lowest);
  --color-gray-100: var(--md-surface-container-low);
  --color-gray-200: var(--md-surface-container);
  --color-gray-300: var(--md-surface-container-high);
  --color-gray-400: var(--md-outline-variant);
  --color-gray-500: var(--md-outline);
  --color-gray-600: var(--md-on-surface-variant);
  --color-gray-700: var(--md-on-surface);
  --color-gray-800: var(--md-on-background);
  --color-gray-900: var(--md-on-background);

  /* 背景色 */
  --bg-primary: var(--md-background);
  --bg-secondary: var(--md-surface-container-low);
  --bg-tertiary: var(--md-surface-container);
  --bg-inverse: var(--md-inverse-surface);

  /* 文字色 */
  --text-primary: var(--md-on-background);
  --text-secondary: var(--md-on-surface-variant);
  --text-muted: var(--md-outline);
  --text-inverse: var(--md-inverse-on-surface);

  /* 边框色 */
  --border-default: var(--md-outline-variant);
  --border-light: var(--md-surface-container-high);
  --border-dark: var(--md-outline);

  /* 链接色 */
  --link-color: var(--md-primary);
  --link-hover: var(--md-tertiary);

  /* 代码色 */
  --code-bg: var(--md-inverse-surface);
  --code-text: var(--md-inverse-on-surface);
  --code-inline-bg: var(--md-surface-container-high);
  --code-inline-text: var(--md-tertiary);

  /* 标签色 */
  --tag-bg: var(--md-surface-container);
  --tag-text: var(--md-on-surface-variant);
  --tag-hover-bg: var(--md-surface-container-high);`;

  // 语义化映射 - 深色模式
  const darkSemanticVars = `  /* 品牌色 */
  --color-primary: var(--md-primary);
  --color-primary-light: var(--md-primary-container);
  --color-primary-dark: var(--md-primary);

  /* 语义色 */
  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-error: var(--md-error);
  --color-info: var(--md-primary);

  /* 中性色 */
  --color-gray-50: var(--md-surface-container-lowest);
  --color-gray-100: var(--md-surface-container-low);
  --color-gray-200: var(--md-surface-container);
  --color-gray-300: var(--md-surface-container-high);
  --color-gray-400: var(--md-outline-variant);
  --color-gray-500: var(--md-outline);
  --color-gray-600: var(--md-on-surface-variant);
  --color-gray-700: var(--md-on-surface);
  --color-gray-800: var(--md-on-background);
  --color-gray-900: var(--md-on-background);

  /* 背景色 */
  --bg-primary: var(--md-background);
  --bg-secondary: var(--md-surface-container-low);
  --bg-tertiary: var(--md-surface-container);
  --bg-inverse: var(--md-inverse-surface);

  /* 文字色 */
  --text-primary: var(--md-on-background);
  --text-secondary: var(--md-on-surface-variant);
  --text-muted: var(--md-outline);
  --text-inverse: var(--md-inverse-on-surface);

  /* 边框色 */
  --border-default: var(--md-outline-variant);
  --border-light: var(--md-surface-container-high);
  --border-dark: var(--md-outline);

  /* 链接色 */
  --link-color: var(--md-primary);
  --link-hover: var(--md-tertiary);

  /* 代码色 */
  --code-bg: var(--md-surface-container-highest);
  --code-text: var(--md-on-surface);
  --code-inline-bg: var(--md-surface-container-high);
  --code-inline-text: var(--md-tertiary);

  /* 标签色 */
  --tag-bg: var(--md-surface-container);
  --tag-text: var(--md-on-surface-variant);
  --tag-hover-bg: var(--md-surface-container-high);`;

  return `/* Material Design 3 主题变量 - 由 ${seedColor} 生成 */

/* 浅色模式 - MD3 基础变量 */
:root {
${lightVars}
}

/* 深色模式 - MD3 基础变量 */
:root.dark {
${darkVars}
}

/* 系统偏好检测 - MD3 基础变量 */
@media (prefers-color-scheme: dark) {
  :root:not(.light):not(.dark) {
${darkVars}
  }
}

/* 浅色模式 - 语义化映射 */
:root {
${lightSemanticVars}
}

/* 深色模式 - 语义化映射 */
:root.dark {
${darkSemanticVars}
}

/* 系统偏好检测 - 语义化映射 */
@media (prefers-color-scheme: dark) {
  :root:not(.light):not(.dark) {
${darkSemanticVars}
  }
}
`;
}

/**
 * 生成语义化颜色映射 CSS
 * 将 Material Design 3 颜色映射到项目现有的语义化变量
 */
export function generateSemanticMappingCss(): string {
  return `/* 语义化颜色映射 - 将 MD3 颜色映射到项目变量 */

:root {
  /* 品牌色 */
  --color-primary: var(--md-primary);
  --color-primary-light: var(--md-primary-container);
  --color-primary-dark: var(--md-primary);

  /* 语义色 */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: var(--md-error);
  --color-info: var(--md-primary);

  /* 背景色 */
  --bg-primary: var(--md-background);
  --bg-secondary: var(--md-surface-container-low);
  --bg-tertiary: var(--md-surface-container);
  --bg-inverse: var(--md-inverse-surface);

  /* 文字色 */
  --text-primary: var(--md-on-background);
  --text-secondary: var(--md-on-surface-variant);
  --text-muted: var(--md-outline);
  --text-inverse: var(--md-inverse-on-surface);

  /* 边框色 */
  --border-default: var(--md-outline-variant);
  --border-light: var(--md-surface-container-high);
  --border-dark: var(--md-outline);

  /* 链接色 */
  --link-color: var(--md-primary);
  --link-hover: var(--md-tertiary);

  /* 代码色 */
  --code-bg: var(--md-surface-container-highest);
  --code-text: var(--md-on-surface);
  --code-inline-bg: var(--md-surface-container);
  --code-inline-text: var(--md-tertiary);

  /* 标签色 */
  --tag-bg: var(--md-surface-container);
  --tag-text: var(--md-on-surface-variant);
  --tag-hover-bg: var(--md-surface-container-high);
}

:root.dark {
  /* 品牌色 */
  --color-primary: var(--md-primary);
  --color-primary-light: var(--md-primary-container);
  --color-primary-dark: var(--md-primary);

  /* 语义色 */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: var(--md-error);
  --color-info: var(--md-primary);

  /* 背景色 */
  --bg-primary: var(--md-background);
  --bg-secondary: var(--md-surface-container-low);
  --bg-tertiary: var(--md-surface-container);
  --bg-inverse: var(--md-inverse-surface);

  /* 文字色 */
  --text-primary: var(--md-on-background);
  --text-secondary: var(--md-on-surface-variant);
  --text-muted: var(--md-outline);
  --text-inverse: var(--md-inverse-on-surface);

  /* 边框色 */
  --border-default: var(--md-outline-variant);
  --border-light: var(--md-surface-container-high);
  --border-dark: var(--md-outline);

  /* 链接色 */
  --link-color: var(--md-primary);
  --link-hover: var(--md-tertiary);

  /* 代码色 */
  --code-bg: var(--md-surface-container-highest);
  --code-text: var(--md-on-surface);
  --code-inline-bg: var(--md-surface-container);
  --code-inline-text: var(--md-tertiary);

  /* 标签色 */
  --tag-bg: var(--md-surface-container);
  --tag-text: var(--md-on-surface-variant);
  --tag-hover-bg: var(--md-surface-container-high);
}

@media (prefers-color-scheme: dark) {
  :root:not(.light):not(.dark) {
    /* 品牌色 */
    --color-primary: var(--md-primary);
    --color-primary-light: var(--md-primary-container);
    --color-primary-dark: var(--md-primary);

    /* 语义色 */
    --color-success: #10b981;
    --color-warning: #f59e0b;
    --color-error: var(--md-error);
    --color-info: var(--md-primary);

    /* 背景色 */
    --bg-primary: var(--md-background);
    --bg-secondary: var(--md-surface-container-low);
    --bg-tertiary: var(--md-surface-container);
    --bg-inverse: var(--md-inverse-surface);

    /* 文字色 */
    --text-primary: var(--md-on-background);
    --text-secondary: var(--md-on-surface-variant);
    --text-muted: var(--md-outline);
    --text-inverse: var(--md-inverse-on-surface);

    /* 边框色 */
    --border-default: var(--md-outline-variant);
    --border-light: var(--md-surface-container-high);
    --border-dark: var(--md-outline);

    /* 链接色 */
    --link-color: var(--md-primary);
    --link-hover: var(--md-tertiary);

    /* 代码色 */
    --code-bg: var(--md-surface-container-highest);
    --code-text: var(--md-on-surface);
    --code-inline-bg: var(--md-surface-container);
    --code-inline-text: var(--md-tertiary);

    /* 标签色 */
    --tag-bg: var(--md-surface-container);
    --tag-text: var(--md-on-surface-variant);
    --tag-hover-bg: var(--md-surface-container-high);
  }
}
`;
}

// ============ 配置读取 ============

/**
 * 从配置文件获取种子颜色
 * @returns 种子颜色，默认为 Material Design 3 紫色
 */
/**
 * 从配置文件获取种子颜色
 * 使用 config.ts 中的 getSeedColor 函数，确保配置读取的一致性
 * @returns 种子颜色，默认为 Material Design 3 紫色
 */
export function getSeedColorFromConfig(): string {
  return getSeedColor();
}

export default {
  generateTheme,
  generateThemeCss,
  generateFullThemeCss,
  generateSemanticMappingCss,
  getSeedColorFromConfig,
  colorRolesToCssVariables,
};