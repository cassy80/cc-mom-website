# 每日AI新闻自动化脚本
# 用途：每天6:00自动收集数据 + 生成日报/周报

param(
    [string]$Mode = "daily"  # "daily" 或 "weekly"
)

# 配置
$Workspace = "C:\Users\Cassy\.openclaw\workspace\cc-mom-website"
$TemplatesDir = "$Workspace\templates"
$ReportsDir = "C:\Users\Cassy\.openclaw\workspace\daily-reports"
$LogFile = "C:\Users\Cassy\.openclaw\logs\ai-news-automation.log"

# 确保目录存在
if (-not (Test-Path $TemplatesDir)) {
    New-Item -ItemType Directory -Path $TemplatesDir -Force | Out-Null
}
if (-not (Test-Path $ReportsDir)) {
    New-Item -ItemType Directory -Path $ReportsDir -Force | Out-Null
}
$logDir = Split-Path $LogFile
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $Message" | Out-File -FilePath $LogFile -Append
}

Write-Log "===== 自动化开始 ====="
Write-Log "模式：$Mode"
Write-Log "执行时间：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# Step 1: 收集数据（6:00-7:00）
Write-Log "[Step 1/4] 收集数据..."
try {
    & "$Workspace\scripts\collect-twitter.ps1" -HoursAgo 168
    & "$Workspace\scripts\collect-youtube.ps1" -HoursAgo 168
    Write-Log "  ✅ 数据收集完成"
} catch {
    Write-Log "  ❌ 数据收集失败：$_"
}

# Step 2: 处理数据（7:00-7:30）
Write-Log "[Step 2/4] 处理数据..."
try {
    & "$Workspace\scripts\process-daily.ps1" -HoursAgo 168
    Write-Log "  ✅ 数据处理完成"
} catch {
    Write-Log "  ❌ 数据处理失败：$_"
}

# Step 3: 生成报告（7:30-8:00）
$CurrentDate = Get-Date -Format "yyyy-MM-dd"

if ($Mode -eq "daily") {
    Write-Log "[Step 3a/4] 生成日报..."

    # 读取日报模板
    $template = Get-Content "$TemplatesDir\daily-report-template.md" -Raw

    # 获取数据
    $dataFile = "$Workspace\public\api\ai-news\daily-data.json"
    if (Test-Path $dataFile) {
        $data = Get-Content $dataFile -Raw | ConvertFrom-Json
        $news = $data.news
        $lastUpdate = $data.lastUpdate
    } else {
        $news = @()
        $lastUpdate = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss+08:00")
    }

    # 替换占位符
    $dateStr = Get-Date -Format "yyyy年M月d日"
    $output = $template -replace '\[日期\]', $dateStr
    $output = $output -replace '\[数据范围\]', "过去168小时（7天）"
    $output = $output -replace '\[最后更新\]', $lastUpdate

    # 保存日报
    $reportFile = "$ReportsDir\ai-daily-report-$CurrentDate.txt"
    $output | Out-File -FilePath $reportFile -Encoding UTF8

    Write-Log "  ✅ 日报已保存：$reportFile"

    # 发送到Feishu（注释：需要手动触发）
    # & "C:\path\to\message\tool" send to feishu...

} elseif ($Mode -eq "weekly") {
    Write-Log "[Step 3b/4] 生成周报..."

    # 读取周报模板
    $template = Get-Content "$TemplatesDir\weekly-report-template.md" -Raw

    # 计算周数
    $weekNum = [math]::Ceiling((Get-Date).Day / 7)

    # 替换基本占位符
    $dateRange = "3月1日-3月7日"
    $weekStr = "第$weekNum周"
    $output = $template -replace '\[周数\]', $weekStr
    $output = $output -replace '\[日期范围\]', $dateRange

    # TODO: 填充实际的教育契合点和小红书选题
    # 这里需要从收集的数据中分析并填充

    # 保存周报
    $reportFile = "$ReportsDir\ai-weekly-report-2026-03-week$weekNum.txt"
    $output | Out-File -FilePath $reportFile -Encoding UTF8

    Write-Log "  ✅ 周报已保存：$reportFile"
}

Write-Log "===== 自动化完成 ====="
Write-Log "报告已保存到：$ReportsDir"
