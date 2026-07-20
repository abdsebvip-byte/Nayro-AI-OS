import fs from 'fs';
import path from 'path';

/**
 * Pure Backend Execution Test - No UI, No Frontend
 * Synthesizes real Arabic speech and writes MP3 file directly to disk.
 */
async function runVoiceSynthesisCLI() {
  console.log('====================================================');
  console.log('⚡ Nayro Studio - Pure Backend Engine Execution Test');
  console.log('====================================================');

  const outputDir = path.join(process.cwd(), 'output_test');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const text = 'أهلاً وسهلاً بكم في نايرو استوديو للذكاء الاصطناعي وصناعة المحتوى.';
  console.log(`[1/2] Target Text: "${text}"`);
  console.log('[2/2] Synthesizing speech via Google Arabic Speech Engine...');

  const gUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ar&client=tw-ob`;
  const response = await fetch(gUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`Synthesis HTTP Failed: ${response.statusText}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(audioBuffer);

  const outputPath = path.join(outputDir, `cli_output_${Date.now()}.mp3`);
  fs.writeFileSync(outputPath, buffer);

  console.log('----------------------------------------------------');
  console.log('✅ PURE BACKEND ENGINE TEST SUCCESSFUL!');
  console.log(`📁 Physical MP3 Output File Created: ${outputPath}`);
  console.log(`📊 File Size on Disk: ${buffer.byteLength} bytes`);
  console.log('----------------------------------------------------');
}

runVoiceSynthesisCLI().catch((err) => {
  console.error('❌ ENGINE TEST FAILED:', err.message);
});
