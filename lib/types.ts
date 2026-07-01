// 用户数据类型
export interface User {
  id: string;
  phone_number: string;
  password: string;
  created_at: string;
  expires_at: string;
  access_count: number;
  is_active: boolean;
}

// 访问日志类型
export interface AccessLog {
  id: string;
  user_id: string;
  action: 'login' | 'generate' | 'print' | 'game';
  timestamp: string;
}

// AI生成复习计划请求
export interface GenerateRequest {
  words: string[];
  grade: string;
}

// AI生成的主题闯关计划
export interface AdventurePlan {
  theme: string;                    // 主题名称
  part0_word_clinic: WordClinicItem[];    // 装备补给站
  part1_fill_blank: FillBlankItem[];       // 清除路障
  part2_multiple_choice: MultipleChoiceItem[]; // 陷阱识破
  part3_reading: ReadingItem[];             // 终极Boss战
  part4_mini_mission: MiniMissionItem[];   // 大招释放
}

// Part 0: 装备补给站 - 错词解析
export interface WordClinicItem {
  word: string;
  syllables: string[];            // 音节拆解
  memory_trick: string;           // 记忆诀窍
}

// Part 1: 清除路障 - 填空题
export interface FillBlankItem {
  sentence_with_blank: string;
  options: string[];              // 选项（含干扰项）
  correct_answer: string;
  explanation: string;
}

// Part 2: 陷阱识破 - 单选题
export interface MultipleChoiceItem {
  question: string;
  options: string[];
  correct_answer: string;
  error_analysis: string;        // 错因辨析
}

// Part 3: 终极Boss战 - 阅读理解
export interface ReadingItem {
  story: string;                 // 短文（错词标记）
  questions: ReadingQuestion[];
}

export interface ReadingQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

// Part 4: 大招释放 - 开放式造句
export interface MiniMissionItem {
  mission: string;               // 任务描述
  example?: string;               // 示例答案（参考）
}

// 用户认证响应
export interface AuthResponse {
  success: boolean;
  message?: string;
  password?: string;
  token?: string;
  expires_at?: string;
}

// 年级选项
export type GradeOption = '1-2年级' | '3-4年级' | '5-6年级' | '7-9年级';

// 游戏词汇对
export interface WordPair {
  id: number;
  english: string;
  chinese: string;
  unit?: number;
}

// 游戏状态
export interface GameState {
  grade: GradeOption;
  words: WordPair[];
  selected: number[];
  matched: number[];
  score: number;
  time: number;
  isComplete: boolean;
}
