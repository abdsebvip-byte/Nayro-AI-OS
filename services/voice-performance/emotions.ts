export type EmotionType =
  | 'confidence'
  | 'enthusiasm'
  | 'mystery'
  | 'curiosity'
  | 'awe'
  | 'sadness'
  | 'pride'
  | 'empathy'
  | 'persuasion'
  | 'calmness'
  | 'surprise';

export interface EmotionParameter {
  type: EmotionType;
  intensity: number; // 0.0 to 1.0
}

export class EmotionEngine {
  /**
   * Calculates SSML / Pitch / Energy Modifiers based on multi-dimensional emotion vectors
   */
  public calculateEmotionModifiers(emotions: EmotionParameter[]): {
    pitchModifierHz: number;
    rateModifierPct: number;
    energyGainDb: number;
    ssmlExpressiveTag: string;
  } {
    let pitchMod = 0;
    let rateMod = 0;
    let energyMod = 0;

    emotions.forEach(e => {
      const scale = Math.min(Math.max(e.intensity, 0.0), 1.0);

      switch (e.type) {
        case 'enthusiasm':
          pitchMod += 20 * scale;
          rateMod += 15 * scale;
          energyMod += 2.5 * scale;
          break;
        case 'confidence':
          pitchMod -= 5 * scale;
          rateMod += 5 * scale;
          energyMod += 1.8 * scale;
          break;
        case 'mystery':
          pitchMod -= 15 * scale;
          rateMod -= 12 * scale;
          energyMod -= 2.0 * scale;
          break;
        case 'awe':
          pitchMod += 10 * scale;
          rateMod -= 15 * scale;
          energyMod += 1.0 * scale;
          break;
        case 'pride':
          pitchMod += 8 * scale;
          rateMod += 4 * scale;
          energyMod += 2.0 * scale;
          break;
        case 'calmness':
          pitchMod -= 10 * scale;
          rateMod -= 10 * scale;
          energyMod -= 1.5 * scale;
          break;
        case 'surprise':
          pitchMod += 30 * scale;
          rateMod += 20 * scale;
          energyMod += 3.0 * scale;
          break;
        default:
          break;
      }
    });

    const rateSign = rateMod >= 0 ? `+${Math.round(rateMod)}%` : `${Math.round(rateMod)}%`;
    const pitchSign = pitchMod >= 0 ? `+${Math.round(pitchMod)}Hz` : `${Math.round(pitchMod)}Hz`;

    return {
      pitchModifierHz: pitchMod,
      rateModifierPct: rateMod,
      energyGainDb: energyMod,
      ssmlExpressiveTag: `rate='${rateSign}' pitch='${pitchSign}'`
    };
  }
}
