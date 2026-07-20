export interface ProsodyAnalysisResult {
  annotatedText: string;
  ssmlAnnotated: string;
  detectedPauses: number;
  detectedBreathPoints: number;
  prolongedVowelsCount: number;
  stressPointsCount: number;
}

/**
 * Arabic Prosody Analysis Engine
 * Analyzes Arabic sentence structure, punctuation, diacritics, pauses, and prolongation before TTS generation.
 */
export class ArabicProsodyEngine {
  public analyzeAndAnnotate(text: string, profilePauseSec: number = 0.5): ProsodyAnalysisResult {
    let annotated = text;

    // Detect punctuation for natural pauses
    annotated = annotated.replace(/([.،!؟;])/g, '$1 <break time="' + Math.round(profilePauseSec * 1000) + 'ms"/> ');

    // Detect Prolongation (مد) - e.g. آ، أو، إي
    const prolongedMatches = text.match(/[آأإ][ويا]/g) || [];
    const prolongCount = prolongedMatches.length;

    // Detect Shaddah / Stress Points (تشديد)
    const stressMatches = text.match(/[\u0651]/g) || [];
    const stressCount = stressMatches.length;

    // Count sentence pauses
    const pausesCount = (text.match(/[.،!؟;]/g) || []).length;
    const breathPointsCount = Math.max(1, Math.floor(text.length / 40));

    const ssmlAnnotated = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='ar-SA'>${annotated}</speak>`;

    return {
      annotatedText: annotated,
      ssmlAnnotated,
      detectedPauses: pausesCount,
      detectedBreathPoints: breathPointsCount,
      prolongedVowelsCount: prolongCount,
      stressPointsCount: stressCount
    };
  }
}
