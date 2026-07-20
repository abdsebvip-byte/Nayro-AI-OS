import express from 'express';
import path from 'path';
import fs from 'fs';
import { NayroProductEngine } from './product/engine';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const productEngine = new NayroProductEngine();

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(process.cwd(), 'public')));

// Ensure output directories exist
const generatedDir = path.join(process.cwd(), 'public', 'generated');
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    product: 'Nayro Studio Product Gateway',
    kernelVersion: '2.0.0-clean',
    timestamp: new Date().toISOString()
  });
});

/**
 * Product API 1: Full End-to-End Campaign Generation (Script -> Voice -> Avatar Video -> Postiz Publish)
 */
app.post('/api/product/campaign', async (req, res) => {
  try {
    const { topic, platforms } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'موضوع الحملة مطلوب لتشغيل خط الإنتاج.' });
    }

    const result = await productEngine.createFullContentCampaign(topic, platforms);
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('[Campaign API Error]', error);
    res.status(500).json({ error: error.message || 'فشل تشغيل خط إنتاج الحملة.' });
  }
});

/**
 * Product API 2: Saudi Speech Synthesis Only
 */
app.post('/api/product/tts', async (req, res) => {
  try {
    const { text, voice } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'النص الصوتي مطلوب لتوليد الصوت.' });
    }

    const result = await productEngine.synthesizeSaudiSpeech(text, voice);
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('[TTS API Error]', error);
    res.status(500).json({ error: error.message || 'فشل توليد الصوت.' });
  }
});

/**
 * Product API 3: Schedule Social Post Only
 */
app.post('/api/product/publish', async (req, res) => {
  try {
    const { title, caption, mediaPath, platforms } = req.body;
    if (!title || !caption) {
      return res.status(400).json({ error: 'عنوان كابشن المنشور مطلوب للنشر.' });
    }

    const result = await productEngine.schedulePost(title, caption, mediaPath, platforms || ['tiktok', 'instagram']);
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('[Publish API Error]', error);
    res.status(500).json({ error: error.message || 'فشل جدولة المنشور.' });
  }
});

// Serve Vite Production Bundle
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Nayro Studio Product Engine] Listening on http://0.0.0.0:${PORT}`);
});
