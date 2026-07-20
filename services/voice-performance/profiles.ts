export type PerformanceProfileType =
  | 'storyteller'
  | 'fusha_standard'
  | 'poet'
  | 'orator'
  | 'news_anchor'
  | 'documentary'
  | 'horror_story'
  | 'children_story'
  | 'podcast'
  | 'educational'
  | 'commercial_ad'
  | 'natural_conversation'
  | 'cinematic_narration'
  | 'quranic_recitation_rules';

export interface PerformanceProfileConfig {
  type: PerformanceProfileType;
  nameAr: string;
  cadenceSpeedMultiplier: number;
  pitchVariationRangeHz: number;
  pauseDurationSec: number;
  breathFrequency: 'none' | 'low' | 'medium' | 'high';
  dynamicRangeLUFS: number;
}

export const PERFORMANCE_PROFILES: Record<PerformanceProfileType, PerformanceProfileConfig> = {
  storyteller: {
    type: 'storyteller',
    nameAr: 'الراوي القصصي السينمائي',
    cadenceSpeedMultiplier: 0.92,
    pitchVariationRangeHz: 25,
    pauseDurationSec: 0.6,
    breathFrequency: 'medium',
    dynamicRangeLUFS: -16
  },
  fusha_standard: {
    type: 'fusha_standard',
    nameAr: 'العربية الفصحى الإخبارية',
    cadenceSpeedMultiplier: 1.0,
    pitchVariationRangeHz: 15,
    pauseDurationSec: 0.4,
    breathFrequency: 'low',
    dynamicRangeLUFS: -14
  },
  poet: {
    type: 'poet',
    nameAr: 'الشاعر العربي الموزون',
    cadenceSpeedMultiplier: 0.85,
    pitchVariationRangeHz: 35,
    pauseDurationSec: 0.8,
    breathFrequency: 'high',
    dynamicRangeLUFS: -15
  },
  orator: {
    type: 'orator',
    nameAr: 'الخطيب الجماهيري الحماسي',
    cadenceSpeedMultiplier: 1.05,
    pitchVariationRangeHz: 45,
    pauseDurationSec: 0.5,
    breathFrequency: 'high',
    dynamicRangeLUFS: -12
  },
  news_anchor: {
    type: 'news_anchor',
    nameAr: 'المذيع الإخباري الرسمي',
    cadenceSpeedMultiplier: 1.08,
    pitchVariationRangeHz: 12,
    pauseDurationSec: 0.3,
    breathFrequency: 'low',
    dynamicRangeLUFS: -13
  },
  documentary: {
    type: 'documentary',
    nameAr: 'المشاهد الوثائقية الفخمة',
    cadenceSpeedMultiplier: 0.88,
    pitchVariationRangeHz: 20,
    pauseDurationSec: 0.7,
    breathFrequency: 'medium',
    dynamicRangeLUFS: -18
  },
  horror_story: {
    type: 'horror_story',
    nameAr: 'قصص الغموض والرعب',
    cadenceSpeedMultiplier: 0.80,
    pitchVariationRangeHz: 30,
    pauseDurationSec: 0.9,
    breathFrequency: 'high',
    dynamicRangeLUFS: -20
  },
  children_story: {
    type: 'children_story',
    nameAr: 'قصص الأطفال المرحة',
    cadenceSpeedMultiplier: 1.12,
    pitchVariationRangeHz: 50,
    pauseDurationSec: 0.4,
    breathFrequency: 'medium',
    dynamicRangeLUFS: -14
  },
  podcast: {
    type: 'podcast',
    nameAr: 'البودكاست الدافئ الطبيعي',
    cadenceSpeedMultiplier: 0.95,
    pitchVariationRangeHz: 18,
    pauseDurationSec: 0.5,
    breathFrequency: 'medium',
    dynamicRangeLUFS: -16
  },
  educational: {
    type: 'educational',
    nameAr: 'الشرح التعليمي والأكاديمي',
    cadenceSpeedMultiplier: 0.95,
    pitchVariationRangeHz: 16,
    pauseDurationSec: 0.5,
    breathFrequency: 'low',
    dynamicRangeLUFS: -14
  },
  commercial_ad: {
    type: 'commercial_ad',
    nameAr: 'الإعلان التجاري الترويجي',
    cadenceSpeedMultiplier: 1.15,
    pitchVariationRangeHz: 40,
    pauseDurationSec: 0.2,
    breathFrequency: 'low',
    dynamicRangeLUFS: -11
  },
  natural_conversation: {
    type: 'natural_conversation',
    nameAr: 'الحوار البشري الطبيعي',
    cadenceSpeedMultiplier: 1.0,
    pitchVariationRangeHz: 22,
    pauseDurationSec: 0.4,
    breathFrequency: 'high',
    dynamicRangeLUFS: -15
  },
  cinematic_narration: {
    type: 'cinematic_narration',
    nameAr: 'السرد السينمائي الرفيع',
    cadenceSpeedMultiplier: 0.86,
    pitchVariationRangeHz: 28,
    pauseDurationSec: 0.75,
    breathFrequency: 'medium',
    dynamicRangeLUFS: -17
  },
  quranic_recitation_rules: {
    type: 'quranic_recitation_rules',
    nameAr: 'قواعد الوقف والابتداء والترتيل النصي',
    cadenceSpeedMultiplier: 0.75,
    pitchVariationRangeHz: 30,
    pauseDurationSec: 1.0,
    breathFrequency: 'high',
    dynamicRangeLUFS: -16
  }
};
