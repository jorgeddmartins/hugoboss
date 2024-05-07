import process from 'process';
import buffer from 'buffer';

if (typeof window !== 'undefined') {
  (window as any).Buffer = buffer.Buffer;
  (window as any).process = process;
}

export {};
