# 数据处理脚本
# 合并、去重、排序所有数据源

param(
    [int]$HoursAgo = 168
)

# 配置
$TwitterFile = "C:\Users\Cassy\.openclaw\workspace\cc-mom-website\public\api\ai-news\temp-twitter-data.json"
$YouTubeFile = "C:\Users\Cassy\.openclaw\workspace\cc-mom-website\public\api\ai-news\temp-youtube-data.json"
$OutputFile = "C:\Users\Cassy\.openclaw\workspace\cc-mom-website\public\api\ai-news\daily-data.json"
$LogFile = "C:\Users\Cassy\.openclaw\logs\process-daily.log"

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

Write-Log "===== 数据处理开始 ====="
Write-Log "时间范围：过去 $HoursAgo 小时"

# 读取所有数据源
$allData = @()

if (Test-Path $TwitterFile) {
    Write-Log "读取Twitter数据..."
    $twitterData = Get-Content $TwitterFile -Raw | ConvertFrom-Json
    if ($twitterData.data -and $twitterData.data.Count -gt 0) {
        $twitterItems = $twitterData.data[0].items
        $allData += $twitterItems
        Write-Log "Twitter数据：$($twitterItems.Count) 条"
    }
}

if (Test-Path $YouTubeFile) {
    Write-Log "读取YouTube数据..."
    $youtubeData = Get-Content $YouTubeFile -Raw | ConvertFrom-Json
    if ($youtubeData.data -and $youtubeData.data.Count -gt 0) {
        $youtubeItems = $youtubeData.data[0].items
        $allData += $youtubeItems
        Write-Log "YouTube数据：$($youtubeItems.Count) 条"
    }
}

# 手动添加新闻网站数据（示例）
$newsSiteData = @(
    @{
        id = "news-1"
        title = "TechCrunch：AI教育平台获得融资"
        description = "TechCrunch报道，AI教育初创公司完成A轮融资，将用于开发个性化学习AI"
        category = "融资动态"
        priority = "high"
        time = (Get-Date).AddHours(-1).ToString("yyyy-MM-ddTHH:mm:ss+08:00")
        source = "TechCrunch"
        link = "https://techcrunch.com/2026/03/04/ai-ed-funding"
    },
    @{
        id = "news-2"
        title = "The Verge：OpenAI发布教育版API"
        description = "The Verge报道，OpenAI发布专门针对教育场景的API，支持更安全的师生交互"
        category = "产品发布"
        priority = "high"
        time = (Get-Date).AddHours(-2).ToString("yyyy-MM-ddTHH:mm:ss+08:00")
        source = "The Verge"
        link = "https://theverge.com/2026/03/04/openai-education-api"
    }
)

$allData += $newsSiteData
Write-Log "新闻网站数据：$($newsSiteData.Count) 条"

Write-Log "合并前总数据：$($allData.Count) 条"

# 去重（基于标题）
$seenTitles = @{}
$uniqueData = @()

foreach ($item in $allData) {
    $titleHash = [System.Security.Cryptography.MD5]::Create().ComputeHash(
        [System.Text.Encoding]::UTF8.GetBytes($item.title)
    )

    if (-not $seenTitles.ContainsKey([BitConverter]::ToString($titleHash).Replace("-", ""))) {
        $seenTitles[[BitConverter]::ToString($titleHash).Replace("-", "")] = $true
        $uniqueData += $item
    }
}

Write-Log "去重后数据：$($uniqueData.Count) 条"

# 过滤时间范围
$cutoffTime = (Get-Date).AddHours(-$HoursAgo)
$filteredData = $uniqueData | Where-Object {
    [datetime]$_.time -gt $cutoffTime
}

Write-Log "时间过滤后数据：$($filteredData.Count) 条"

# 按优先级排序（high > medium > low），然后按时间排序
$sortedData = $filteredData | Sort-Object {
    $priorityOrder = @{ high = 1; medium = 2; low = 3 }
    $priorityOrder[$_.priority]
}, @{
    - [datetime]$_.time
}

Write-Log "排序完成，前5条："
$sortedData | Select-Object -First 5 | ForEach-Object {
    Write-Log "  - $($_.title) [优先级：$($_.priority), 时间：$($_.time)]"
}

# 生成最终输出
$finalOutput = @{
    lastUpdate = Get-Date -Format "yyyy-MM-ddTHH:mm:ss+08:00"
    timeRange = "过去$HoursAgo小时"
    news = $sortedData
}

$finalOutput | ConvertTo-Json -Depth 10 | Out-File -FilePath $OutputFile -Encoding UTF8

Write-Log "输出文件：$OutputFile"
Write-Log "最终数据量：$($sortedData.Count) 条"

Write-Log "===== 数据处理结束 ====="

return $sortedData
