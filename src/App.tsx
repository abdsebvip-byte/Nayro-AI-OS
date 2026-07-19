import React, { useState } from 'react';
import { Mic, Volume2, Download, CheckCircle, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [text, setText] = useState<string>('أهلاً وسهلاً بكم في نايرو استوديو للذكاء الاصطناعي وصناعة المحتوى الإبداعي.');
  const [voice, setVoice] = useState<string>('ar-SA-HamedNeural');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSynthesize = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل توليد الصوت.');
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في الاتصال بالخادم.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#070a12] text-slate-100 font-sans p-6">
      <header className="max-w-4xl mx-auto mb-8 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-amber-400">نايرو استوديو - Nayro Studio</h1>
            <p className="text-xs text-slate-400">منصة الذكاء الاصطناعي الشاملة (الركيزة الأولى: استوديو الصوت السعودي المباشر)</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="w-4 h-4" /> Zero-Mock Verified
        </span>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6 backdrop-blur-md">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-200">
            <Mic className="w-5 h-5 text-amber-400" />
            توليد النطق الصوتي العربي لـ نايرو استوديو
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">اختر هوية الصوت:</label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#090d16] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ar-SA-HamedNeural">SA حامد السعودي (صوت رجالي وقور وطبيعي)</option>
              <option value="ar-SA-ZariyahNeural">SA زارية السعودية (صوت أنثوي ناعم وفاخر)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">النص المراد نطقه وتوليده كملف MP3 حقيقي:</label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#090d16] border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={handleSynthesize}
            disabled={isLoading}
            className="w-full py-4 rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
            <span>توليد وإنشاء ملف الصوت MP3 لـ نايرو استوديو</span>
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md">
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-slate-200">
              <Volume2 className="w-5 h-5 text-amber-400" />
              مخرجات التوليد والحفظ
            </h3>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs mb-4">
                {error}
              </div>
            )}

            {result ? (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <p className="font-bold mb-1 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> تم توليد وحفظ الملف بنجاح!
                  </p>
                  <p className="text-[11px] text-slate-400">المحرك: {result.engineUsed}</p>
                  <p className="text-[11px] text-slate-400">الحجم: {result.bytesWritten} بايت</p>
                  <p className="text-[11px] text-slate-400 truncate">المسار: {result.savedPath}</p>
                </div>

                <audio src={result.audioUrl} controls autoPlay className="w-full my-2" />

                <a
                  href={result.audioUrl}
                  download="nayro_studio_speech.mp3"
                  className="w-full py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all"
                >
                  <Download className="w-4 h-4" /> تحميل ملف MP3
                </a>
              </div>
            ) : (
              <div className="h-48 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-slate-500 text-xs text-center p-4">
                اضغط على "توليد وإنشاء ملف الصوت" للإنشاء الفعلي والتحميل
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
