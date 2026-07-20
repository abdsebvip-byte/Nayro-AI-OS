/**
 * Nayro AI OS - Capability Registry Architecture
 * Atomic, extensible capability registry mapping capabilities to execution engines.
 */

export interface CapabilityDefinition {
  id: string;
  studio: string;
  name: string;
  description: string;
  primaryEngine: string;
  fallbackEngine?: string;
  isLocalOnly: boolean;
  status: 'active' | 'development' | 'planned';
}

export const CAPABILITY_REGISTRY: Record<string, CapabilityDefinition> = {
  // --- Voice Studio Capabilities ---
  'voice.tts.generate': {
    id: 'voice.tts.generate',
    studio: 'VoiceStudio',
    name: 'توليد النطق الصوتي الفوري (Arabic TTS)',
    description: 'Synthesizes clean, high-fidelity Saudi Arabic speech from text',
    primaryEngine: 'Microsoft Edge Neural API (ar-SA-HamedNeural / ar-SA-ZariyahNeural)',
    fallbackEngine: 'Google Arabic Speech API',
    isLocalOnly: false,
    status: 'active'
  },
  'voice.cloning.zero_shot': {
    id: 'voice.cloning.zero_shot',
    studio: 'VoiceStudio',
    name: 'استنساخ البصمة الصوتية (Voice Cloning)',
    description: 'Clones user voice characteristics from 5s sample audio',
    primaryEngine: 'CosyVoice / F5-TTS Engine (Python Microservice)',
    isLocalOnly: true,
    status: 'active'
  },
  'voice.stt.transcribe': {
    id: 'voice.stt.transcribe',
    studio: 'VoiceStudio',
    name: 'تفريغ الصوت لنص عربي (Speech-to-Text & STT)',
    description: 'Transcribes audio recordings into diacritized Arabic text',
    primaryEngine: 'Faster-Whisper (Whisper Large-v3)',
    isLocalOnly: true,
    status: 'active'
  },
  'voice.audio.denoise_lufs': {
    id: 'voice.audio.denoise_lufs',
    studio: 'VoiceStudio',
    name: 'تنقية وموازنة الصوت (Audio Denoise & -14 LUFS Normalization)',
    description: 'Denoises audio and normalizes loudness for TikTok/Reels standards',
    primaryEngine: 'DeepFilterNet + FFmpeg Audio Filter Graph',
    isLocalOnly: true,
    status: 'active'
  },
  'voice.conversion.vc': {
    id: 'voice.conversion.vc',
    studio: 'VoiceStudio',
    name: 'تحويل الصوت إلى صوت آخر (Voice-to-Voice Accent Conversion)',
    description: 'Converts speaker identity while retaining emotion and rhythm',
    primaryEngine: 'RVC v2 (Retrieval-based Voice Conversion)',
    isLocalOnly: true,
    status: 'active'
  },

  // --- Video & Avatar Studio Capabilities ---
  'video.avatar.lip_sync': {
    id: 'video.avatar.lip_sync',
    studio: 'VideoStudio',
    name: 'مزامنة الشفاه والأفاتار (Avatar Lip-Sync)',
    description: 'Generates avatar face animation synchronized with audio stream',
    primaryEngine: 'LongCat-Avatar 1.5 / MuseTalk',
    isLocalOnly: true,
    status: 'active'
  },
  'video.dubbing.joint_pipeline': {
    id: 'video.dubbing.joint_pipeline',
    studio: 'VideoStudio',
    name: 'الدبلجة الصوتية والمرئية المشتركة (Simultaneous Dub & Sync)',
    description: 'Stretches video/audio together while preserving ambient noise',
    primaryEngine: 'LTX-2 / Just-Dub-It Pipeline',
    isLocalOnly: true,
    status: 'active'
  },
  'video.face.enhance_1080p': {
    id: 'video.face.enhance_1080p',
    studio: 'VideoStudio',
    name: 'ترميم الوجه ورفع الدقة (1080p HD Face Enhancement)',
    description: 'Restores facial features and mouth clarity frame-by-frame',
    primaryEngine: 'CodeFormer HD Restoration',
    isLocalOnly: true,
    status: 'active'
  },

  // --- Content & Marketing Studio Capabilities ---
  'content.script.viral_hooks': {
    id: 'content.script.viral_hooks',
    studio: 'ContentStudio',
    name: 'توليد سيناريوهات وهوات تيك توك الفيروسية (Viral Script & Hook Generation)',
    description: 'Generates high-engagement Saudi dialect TikTok scripts',
    primaryEngine: 'Google Gemini 2.0 Flash API',
    isLocalOnly: false,
    status: 'active'
  },
  'marketing.listening.trends': {
    id: 'marketing.listening.trends',
    studio: 'MarketingStudio',
    name: 'رصد الترندات والكلمات الأكثر بحثاً (Social Listening & Trend Tracking)',
    description: 'Aggregates trending keywords and competitor insights in Saudi market',
    primaryEngine: 'TrendRadar / HasData Connector Engine',
    isLocalOnly: false,
    status: 'active'
  },

  // --- Publishing Studio Capabilities ---
  'publishing.social.schedule_post': {
    id: 'publishing.social.schedule_post',
    studio: 'PublishingStudio',
    name: 'جدولة ونشر المحتوى التلقائي (Social Media Auto-Publishing)',
    description: 'Schedules and posts videos/captions to TikTok, Instagram, X, YouTube',
    primaryEngine: 'Postiz Engine API / MCP Server',
    isLocalOnly: true,
    status: 'active'
  }
};
