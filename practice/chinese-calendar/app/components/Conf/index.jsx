export const BASE_DAY = {
  time: new Date('2017/01/28'),
  year: '丁酉',
  month: '辛丑',
  day: '乙卯',
  animal: '鸡',
  desc: '正月初一',
};

/**
 * 获取某一天所在的周的开始和结束
 * @param day
 * @returns {{begin: Date, end: Date}}
 */
export const getWeekBeginAndEnd = (day) => {
  if (day instanceof Date) {
    // 获取所在的月份
    const WeekFirstDay = new Date(day - ((day.getDay() - 1) * 86400000));
    return {
      begin: WeekFirstDay,
      end: new Date(WeekFirstDay.getTime() + (6 * 86400 * 1000)),
    };
  }
  throw new TypeError('help.getWeekBeginAndEnd传入的参数不是日期类型!');
};

/**
 * 获取某一天所在月份的第一天和最后一天
 * @param day
 * @returns {{begin: Date, end: Date}}
 */
export const getMonthBeginAndEnd = (day) => {
  // 判断是否是一个日期变量
  if (day instanceof Date) {
    // 获取所在的月份
    const year = day.getFullYear();
    const month = day.getMonth();
    const nextMonth = month < 11 ? new Date(year, month + 1, 1) : new Date(year + 1, 0, 1);
    return {
      begin: new Date(year, month, 1),
      end: new Date(nextMonth - 86400000),
    };
  }

  throw new TypeError('help.getMonthBeginAndEnd传入的参数不是日期类型!');
};

export default {
  WEEK: ['一', '二', '三', '四', '五', '六', '日'],
  SKY: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  GRD: ['子', '丑', '寅', '卯', '辰', '巳', '无', '为', '申', '酉', '戌', '亥'],
  ANM: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
  MID: [
    '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚无', '辛为', '壬申', '癸酉',
    '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬无', '癸为',
    '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
    '甲无', '乙为', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
    '甲辰', '乙巳', '丙无', '丁为', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
    '甲寅', '乙卯', '丙辰', '丁巳', '戊无', '己为', '庚申', '辛酉', '壬戌', '癸亥',
  ],
};
