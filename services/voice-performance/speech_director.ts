import { EmotionParameter } from './emotions';

export interface DirectorInstruction {
  directiveAr: string;
  targetSentenceIndex?: number;
}

export interface DirectorParsedPlan {
  pitchAdjustmentHz: number;
  rateAdjustmentPct: number;
  pauseSec: number;
  emotions: EmotionParameter[];
  emphasisIndexes: number[];
}

/**
 * Speech Director Layer - High Level Natural Directives Parser
 */
export class SpeechDirectorEngine {
  public parseDirectives(instructions: DirectorInstruction[]): DirectorParsedPlan {
    let pitchAdjustmentHz = 0;
    let rateAdjustmentPct = 0;
    let pauseSec = 0.5;
    const emotions: EmotionParameter[] = [];
    const emphasisIndexes: number[] = [];

    instructions.forEach(inst => {
      const text = inst.directiveAr;

      if (text.includes('ابدأ بهدوء') || text.includes('اخفض صوتك')) {
        pitchAdjustmentHz -= 8;
        rateAdjustmentPct -= 10;
        emotions.push({ type: 'calmness', intensity: 0.8 });
      }

      if (text.includes('ارفع الحماس') || text.includes('حماس')) {
        pitchAdjustmentHz += 18;
        rateAdjustmentPct += 15;
        emotions.push({ type: 'enthusiasm', intensity: 0.9 });
      }

      if (text.includes('توقف') || text.includes('ثانية')) {
        pauseSec = 0.8;
      }

      if (text.includes('أكد') || text.includes('تشديد')) {
        emotions.push({ type: 'confidence', intensity: 0.9 });
        if (inst.targetSentenceIndex !== undefined) {
          emphasisIndexes.push(inst.targetSentenceIndex);
        }
      }

      if (text.includes('مفاجأة') || text.includes('صدمة')) {
        pitchAdjustmentHz += 25;
        emotions.push({ type: 'surprise', intensity: 0.95 });
      }
    });

    return {
      pitchAdjustmentHz,
      rateAdjustmentPct,
      pauseSec,
      emotions,
      emphasisIndexes
    };
  }
}
