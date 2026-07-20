import fs from 'fs';
import path from 'path';

/**
 * Unified Storage & Asset Manager for Nayro AI OS
 */
export class StorageManager {
  private static instance: StorageManager;
  private baseOutputDir: string;

  private constructor() {
    this.baseOutputDir = path.join(process.cwd(), 'public', 'generated');
    this.ensureDirectories();
  }

  public static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  private ensureDirectories() {
    const subdirs = ['audio', 'video', 'content', 'publishing', 'cache'];
    subdirs.forEach(dir => {
      const fullPath = path.join(this.baseOutputDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });
  }

  public getCategoryPath(category: 'audio' | 'video' | 'content' | 'publishing' | 'cache'): string {
    return path.join(this.baseOutputDir, category);
  }

  public saveFile(category: 'audio' | 'video' | 'content' | 'publishing' | 'cache', filename: string, content: Buffer | string): string {
    const dir = this.getCategoryPath(category);
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  public getPublicUrl(category: string, filename: string): string {
    return `/generated/${category}/${filename}`;
  }
}
