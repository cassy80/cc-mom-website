# Feishu日报生成脚本

param(
    [string]$DataFile = "C:\Users\Cassy\.openclaw\workspace\cc-mom-website\public\api\ai-news\daily-data.json"
)

# 配置
$OutputDir = "C:\Users\Cassy\.openclaw\workspace\daily-reports"
$LogFile = "C:\Users\Cassy\.openclaw\logs\generate-daily-report.log"

# 创建输出目录
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

# 创建日志目录
$logDir = Split-Path $LogFile
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $Message" | Out-File -FilePath $LogFile -Append
}

Write-Log "===== 日报生成开始 ====="

# 读取数据
if (-not (Test-Path $DataFile)) {
    Write-Log "错误：数据文件不存在 - $DataFile"
    return
}

$data = Get-Content $DataFile -Raw | ConvertFrom-Json
$news = $data.news
$lastUpdate = $data.lastUpdate

Write-Log "读取数据：$($news.Count) 条"
Write-Log "最后更新：$lastUpdate"

if ($news.Count -eq 0) {
    Write-Log "警告：没有数据可生成"
    return
}

# 生成日报
$reportDate = Get-Date -Format "yyyy年M月d日"
$reportLines = @()

# 标题
$reportLines += "AI科技日报 - $reportDate"
$reportLines += ""
$reportLines += "━━━━━━━━━━━━━━━━━━━━━━━━"
$reportLines += ""
$reportLines += "数据范围：过去168小时（7天）"
$reportLines += "最后更新：$lastUpdate"
$reportLines += ""
$reportLines += "━━━━━━━━━━━━━━━━━━━━━━━━"
$reportLines += ""

# 按类别分组
$highPriorityNews = $news | Where-Object { $_.priority -eq 'high' }
$productNews = $news | Where-Object { $_.category -eq '产品发布' }
$fundingNews = $news | Where-Object { $_.category -eq '融资动态' }
$techNews = $news | Where-Object { $_.category -eq '技术突破' }
$industryNews = $news | Where-Object { $_.category -eq '行业新闻' }

# 本周头条
if ($highPriorityNews.Count -gt 0) {
    $reportLines += "🔥 本周头条"
    $reportLines += ""
    foreach ($item in $highPriorityNews | Select-Object -First 5) {
        $reportLines += ""
        $reportLines += "[$($item.priority.ToUpper())] $($item.title)"
        $reportLines += "发布时间：$(Get-Date $item.time -Format 'M月d日 HH:mm')"
        $reportLines += "来源：$($item.source)"
        $reportLines += "链接：$($item.link)"
        $reportLines += ""
    }
    $reportLines += "━━━━━━━━━━━━━━━━━━━━━━━━"
    $reportLines += ""
}

# 产品发布
if ($productNews.Count -gt 0) {
    $reportLines += "🚀 产品发布（本周新增 $($productNews.Count) 个）"
    $reportLines += ""
    foreach ($item in $productNews) {
        $timeStr = Get-Date $item.time -Format 'M月d日 HH:mm'
        $reportLines += "• $($item.title)"
        $reportLines += "  时间：$timeStr | 来源：$($item.source)"
    }
    $reportLines += ""
    $reportLines += "━━━━━━━━━━━━━━━━━━━━━━━━"
    $reportLines += ""
}

# 融资动态
if ($fundingNews.Count -gt 0) {
    $reportLines += "💰 融资动态"
    $reportLines += ""
    foreach ($item in $fundingNews) {
        $reportLines += "• $($item.title)"
        $reportLines += "  时间：$(Get-Date $item.time -Format 'M月d日 HH:mm') | 来源：$($item.source)"
    }
    $reportLines += ""
    $reportLines += "━━━━━━━━━━━━━━━━━━━━━━━━"
    $reportLines += ""
}

# 技术突破
if ($techNews.Count -gt 0) {
    $reportLines += "🔬 技术突破"
    $reportLines += ""
    foreach ($item in $techNews) {
        $reportLines += "• $($item.title)"
        $reportLines += "  时间：$(Get-Date $item.time -Format 'M月d日 HH:mm') | 来源：$($item.source)"
    }
    $reportLines += ""
    $reportLines += "━━━━━━━━━━━━━━━━━━━━━━━━"
    $reportLines += ""
}

# 行业新闻
if ($industryNews.Count -gt 0) {
    $reportLines += "📰 行业新闻"
    $reportLines += ""
    foreach ($item in $industryNews) {
        $reportLines += "• $($item.title)"
        $reportLines += "  时间：$(Get-Date $item.time -Format 'M月d日 HH:mm') | 来源：$($item.source)"
    }
    $reportLines += ""
    $reportLines += "━━━━━━━━━━━━━━━━━━━━━━━━"
    $reportLines += ""
}

# 来源汇总
$reportLines += "🔗 原始链接汇总"
$reportLines += ""
$reportLines += "• Twitter: https://twitter.com/search?q=%23AI"
$reportLines += "• YouTube: https://youtube.com/results?search_query=AI"
$reportLines += "• TechCrunch: https://techcrunch.com/category/artificial-intelligence"
$reportLines += ""
$reportLines += "━━━━━━━━━━━━━━━━━━━━━━━━"

# 保存到文件
$outputDate = Get-Date -Format "yyyy-MM-dd"
$outputFile = "$OutputDir\ai-daily-report-$outputDate.txt"
$reportLines | Out-File -FilePath $outputFile -Encoding UTF8

Write-Log "日报已保存到：$outputFile"
Write-Log "日报行数：$($reportLines.Count)"

Write-Log "===== 日报生成结束 ====="

# 返回日报内容
return $reportLines -join "`n"
