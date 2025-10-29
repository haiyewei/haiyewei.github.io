# HexoMDHeaderFormatter.ps1
# 功能：为当前目录及子目录下所有.md文件添加Hexo文章头和引用地址

# 获取当前脚本所在目录
$currentPath = Get-Location

# 递归获取所有.md文件
$mdFiles = Get-ChildItem -Path $currentPath -Filter "*.md" -Recurse

# 遍历处理每个.md文件
foreach ($file in $mdFiles) {
    try {
        # 读取文件内容
        $content = Get-Content -Path $file.FullName -Raw
        
        # 检查是否已存在Hexo头部（避免重复添加）
        $hasHeader = $content -match "^---\s*`r`n"
        
        if (-not $hasHeader) {
            # 获取文件名（不带扩展名）作为标题
            $title = $file.BaseName
            
            # 获取当前系统时间（格式：YYYY-MM-DD HH:mm:ss）
            $currentTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            
            # 构建Hexo文章头
            $hexoHeader = @"
---
title: $title
date: $currentTime
author: DDLG
categories: DynamicColor
tags: DynamicColor
---

"@
            
            # 在文件开头插入Hexo头部
            $content = $hexoHeader + $content
        }
        
        # 检查是否已存在引用部分（避免重复添加）
        $hasReference = $content -match "## 引用|\[Dynamic Color\]"
        
        if (-not $hasReference) {
            # 构建引用部分
            $referenceSection = @"

## 引用
- [Dynamic Color](https://github.com/material-foundation/material-color-utilities)
"@
            
            # 在文件末尾添加引用
            $content = $content.Trim() + "`r`n" + $referenceSection
        }
        
        # 将处理后的内容写回文件（UTF-8编码）
        $content | Out-File -FilePath $file.FullName -Encoding utf8
        
        Write-Host "已处理文件: $($file.FullName)" -ForegroundColor Green
    }
    catch {
        Write-Host "处理文件 $($file.FullName) 时出错: $_" -ForegroundColor Red
    }
}

Write-Host "`n处理完成！共处理了 $($mdFiles.Count) 个.md文件。" -ForegroundColor Cyan
Write-Host "Hexo文章头已添加：作者=DDLG, 分类=DynamicColor, 标签=DynamicColor" -ForegroundColor Yellow
Write-Host "引用地址已添加：https://github.com/material-foundation/material-color-utilities" -ForegroundColor Yellow