/**
 * 主题背景配置
 * 每个主题对应不同的渐变色背景和卡通形象
 */

export const themeBackgrounds = {
  '魔法校园': {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: '紫色魔法渐变',
    textColor: '#f7f8f8',
    mascot: '/images/themes/magic-school.jpeg',
    mascotName: '魔法师',
    backgroundImage: '/images/themes/magic-school.jpeg'
  },
  '宇宙探险': {
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    description: '深空星河渐变',
    textColor: '#f7f8f8',
    mascot: '/images/themes/space-explorer.jpeg',
    mascotName: '宇航员',
    backgroundImage: '/images/themes/space-explorer.jpeg'
  },
  '侦探推理': {
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    description: '神秘蓝灰渐变',
    textColor: '#f7f8f8',
    mascot: '/images/themes/detective.jpeg',
    mascotName: '侦探',
    backgroundImage: '/images/themes/detective.jpeg'
  },
  '森林冒险': {
    gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    description: '森林绿意渐变',
    textColor: '#f7f8f8',
    mascot: '/images/themes/forest-adventure.jpeg',
    mascotName: '森林动物',
    backgroundImage: '/images/themes/forest-adventure.jpeg'
  },
  '海底世界': {
    gradient: 'linear-gradient(135deg, #667eea 0%, #00c6fb 100%)',
    description: '海洋蓝渐变',
    textColor: '#f7f8f8',
    mascot: '/images/themes/underwater.jpeg',
    mascotName: '海底生物',
    backgroundImage: '/images/themes/underwater.jpeg'
  },
  '恐龙时代': {
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    description: '史前橙色渐变',
    textColor: '#1a1a1a',
    mascot: '/images/themes/dinosaur.jpeg',
    mascotName: '霸王龙',
    backgroundImage: '/images/themes/dinosaur.jpeg'
  },
  '艾莎公主': {
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    description: '冰雪粉蓝渐变',
    textColor: '#1a1a1a',
    mascot: '/images/themes/elsa.webp',
    mascotName: '艾莎公主',
    backgroundImage: '/images/themes/elsa.webp'
  }
} as const;

export type ThemeName = keyof typeof themeBackgrounds;
