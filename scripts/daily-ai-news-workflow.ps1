# 每日AI动态数据收集和报告生成
# 早上6:00-9:00执行：数据收集 + 日报生成 + 发送Feishu

param(
    [int]$HoursAgo = 168  # 过去168小时（7天）
)

$StartTime = Get-Date
Write-Host "===== 每日AI动态收集开始 =====" -ForegroundColor Cyan
Write-Host "执行时间：$($StartTime.ToString('yyyy-MM-dd HH:mm:ss'))" -ForegroundColor Cyan
Write-Host "数据范围：过去 $HoursAgo 小时（7天）" -ForegroundColor Cyan
Write-Host ""

# Step 1: 收集Twitter数据（6:00-6:30）
Write-Host "[Step 1/5] 收集Twitter数据..." -ForegroundColor Yellow
try {
    & "C:\Users\Cassy\.openclaw\workspace\cc-mom-website\scripts\collect-twitter.ps1" -HoursAgo $HoursAgo
    Write-Host "  ✅ Twitter数据收集完成" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Twitter数据收集失败：$_" -ForegroundColor Red
}

Write-Host ""

# Step 2: 收集YouTube数据（6:30-7:00）
Write-Host "[Step 2/5] 收集YouTube数据..." -ForegroundColor Yellow
try {
    & "C:\Users\Cassy\.openclaw\workspace\cc-mom-website\scripts\collect-youtube.ps1" -HoursAgo $HoursAgo
    Write-Host "  ✅ YouTube数据收集完成" -ForegroundColor Green
} catch {
    Write-Host "  ❌ YouTube数据收集失败：$_" -ForegroundColor Red
}

Write-Host ""

# Step 3: 处理数据（7:00-7:30）
Write-Host "[Step 3/5] 处理和合并数据..." -ForegroundColor Yellow
try {
    & "C:\Users\Cassy\.openclaw\workspace\cc-mom-website\scripts\process-daily.ps1" -HoursAgo $HoursAgo
    Write-Host "  ✅ 数据处理完成" -ForegroundColor Green
} catch {
    Write-Host "  ❌ 数据处理失败：$_" -ForegroundColor Red
}

Write-Host ""

# Step 4: 生成日报（7:30-8:00）
Write-Host "[Step 4/5] 生成Feishu日报..." -ForegroundColor Yellow
try {
    $reportContent = & "C:\Users\Cassy\.openclaw\workspace\cc-mom-website\scripts\generate-daily-report.ps1"
    Write-Host "  ✅ 日报生成完成" -ForegroundColor Green
} catch {
    Write-Host "  ❌ 日报生成失败：$_" -ForegroundColor Red
}

Write-Host ""

# Step 5: 准备发送（8:00-9:00）
Write-Host "[Step 5/5] 日报已准备好，等待9:00发送到Feishu" -ForegroundColor Yellow
Write-Host "  日报文件：C:\Users\Cassy\.openclaw\workspace\daily-reports\ai-daily-report-$(Get-Date -Format 'yyyy-MM-dd').txt" -ForegroundColor Cyan

$EndTime = Get-Date
$Duration = ($EndTime - $StartTime).TotalMinutes

Write-Host ""
Write-Host "===== 执行完成 =====" -ForegroundColor Cyan
Write-Host "总耗时：$([math]::Round($Duration, 2)) 分钟" -ForegroundColor Cyan
Write-Host "准备9:00发送到Feishu" -ForegroundColor Green
Write-Host ""

# 注意：实际发送需要通过OpenClaw的message工具
# 这里只生成日报内容，由定时任务在9:00发送

Write-Host "下一步：" -ForegroundColor Yellow
Write-Host "  9:00 - 发送日报到Feishu" -ForegroundColor Gray
Write-Host "  10:00 - 更新网站动态页面" -ForegroundColor Gray
