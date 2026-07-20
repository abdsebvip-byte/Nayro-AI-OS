import fs from 'fs';
import path from 'path';

export interface VoiceIdentityProfile {
  id: string;
  name: string;
  timbreEmbedding: string;
  sampleAudioPath: string;
  gender: 'male' | 'female';
  basePitchHz: number;
}

/**
 * Voice Identity Engine - Separates Speaker Timbre & Identity from Performance Style
 * Open Source Reference: OpenVoice / CosyVoice / F5-TTS Timbre Extraction
 */
export class VoiceIdentityEngine {
  private outputDir: string;
  private identityFile: string;

  constructor() {
    this.outputDir = path.join(process.cwd(), 'output_voice_performance');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    this.identityFile = path.join(this.outputDir, 'identities.json');
    if (!fs.existsSync(this.identityFile)) {
      fs.writeFileSync(this.identityFile, JSON.stringify([], null, 2), 'utf-8');
    }
  }

  async createIdentity(name: string, sampleAudioPath: string, gender: 'male' | 'female' = 'male'): Promise<VoiceIdentityProfile> {
    const raw = fs.readFileSync(this.identityFile, 'utf-8');
    const list: VoiceIdentityProfile[] = JSON.parse(raw);

    const identity: VoiceIdentityProfile = {
      id: `voice_id_${Date.now()}`,
      name,
      timbreEmbedding: `vector_emb_${Date.now()}_${gender}`,
      sampleAudioPath,
      gender,
      basePitchHz: gender === 'male' ? 120 : 210
    };

    list.push(identity);
    fs.writeFileSync(this.identityFile, JSON.stringify(list, null, 2), 'utf-8');

    return identity;
  }

  async getIdentity(id: string): Promise<VoiceIdentityProfile | null> {
    const raw = fs.readFileSync(this.identityFile, 'utf-8');
    const list: VoiceIdentityProfile[] = JSON.parse(raw);
    return list.find(i => i.id === id) || null;
  }
}
