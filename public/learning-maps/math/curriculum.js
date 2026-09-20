// Editorial mapping, checked against the Ministry's corrected 2022 standard.
// Page numbers are printed pages; PDF viewer pages are seven higher.
export const curriculumUrl='https://www.moe.gov.cn/srcsite/A26/s8001/202204/W020220510531636118932.pdf';
export const reviewedAt='2026-09-14';
export const requirements={
 foundation:{band:'第一学段（1—2年级）',pages:'18—19',pdfPage:25,scope:'整数乘除与实际问题',kind:'相关基础'},
 initial:{band:'第二学段（3—4年级）',pages:'21—22',pdfPage:28,scope:'初步认识分数、感悟分数单位及简单加减',kind:'课标要求的学习拆解'},
 meaning:{band:'第三学段（5—6年级）',pages:'23—26',pdfPage:30,scope:'分数意义、大小比较、计数单位与运算',kind:'课标要求的学习拆解'},
 division:{band:'第三学段（5—6年级）',pages:'24',pdfPage:31,scope:'整数除法与分数的关系',kind:'课标要求的学习拆解'},
 factors:{band:'第三学段（5—6年级）',pages:'23—24',pdfPage:30,scope:'因数、倍数、公因数和公倍数',kind:'相关基础'},
 conversion:{band:'第三学段（5—6年级）',pages:'23—25',pdfPage:30,scope:'小数与分数的转化',kind:'课标要求的学习拆解'},
 operation:{band:'第三学段（5—6年级）',pages:'24—26',pdfPage:31,scope:'简单分数四则运算及运算道理',kind:'课标要求的学习拆解'},
 application:{band:'第三学段（5—6年级）',pages:'24—25',pdfPage:31,scope:'用数量关系解决问题并解释结果',kind:'课标要求的学习拆解'}
};
// These goals are original, parent-facing interpretations, not quotations.
export const alignment={
 equal:['foundation','能用实物说明为什么每份同样多。'],
 division:['foundation','能区分“分成几份”和“每几件一份”，解释商的意思。'],
 unit:['initial','能从平均分的图或实物中认出几分之一。'],
 notation:['initial','能联系图形，说清分子、分母各表示什么。'],
 multiple:['initial','能把几分之几理解为几个相同小份的累加。'],
 'fraction-unit':['initial','能说出一个分数由几个几分之一组成，并用纸条验证。'],
 'unit-compare':['initial','能用同样大小的整体说明几分之一的大小。'],
 'same-compare':['initial','能用相同分数单位的份数解释比较结果。'],
 'simple-add':['initial','能用合并或减少同样大小的份说明简单加减。'],
 whole:['meaning','能确定一个物体或一组物体作为整体，并解释部分与整体。'],
 'fraction-division':['division','能用公平分物的过程解释整数相除为什么得到分数。'],
 factors:['factors','能列举小整数的因数、倍数，找到共同的部分。'],
 types:['meaning','能用图或直线上的点判断分数与1的大小关系。'],
 equivalent:['meaning','能用重新分份说明分数大小不变，而表示方式改变。'],
 mixed:['meaning','能将超过1的分数拆成完整的1与剩余部分。'],
 simplify:['operation','能用合并小份说明约分保持大小不变。'],
 common:['operation','能说明通分是在统一计数单位，分数大小不变。'],
 compare:['meaning','能选择画图或通分比较分数，并解释方法。'],
 decimal:['conversion','能在图形、有限小数和分数之间转换并核对。'],
 add:['operation','能解释先统一分数单位、再相加减的道理。'],
 'multiply-int':['operation','能把相同分数的累加转成乘法并解释结果。'],
 multiply:['operation','能用面积或部分中的部分解释分数乘法。'],
 reciprocal:['operation','能用乘积等于1验证倒数，为理解除法作准备。'],
 divide:['operation','能用分组或乘法逆运算解释分数除法的结果。'],
 'part-problem':['application','能确定整体，用图和算式求部分，并解释数量单位。'],
 'whole-problem':['application','能从部分及其分率推回整体，并检验答案。'],
 'mixed-calc':['operation','能解释不超过三步的混合运算，并用估算或逆运算检查。']
};
export function curriculumFor(id){
 const [key,goal]=alignment[id];
 return {...requirements[key],key,goal,url:curriculumUrl+'#page='+requirements[key].pdfPage};
}
