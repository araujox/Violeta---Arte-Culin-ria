import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Safe Storage Polyfill for sandboxed iframes and hosted environments
class MemoryStorage implements Storage {
  private data: Record<string, string> = {};

  [name: string]: any;

  get length(): number {
    return Object.keys(this.data).length;
  }

  getItem(key: string): string | null {
    return Object.prototype.hasOwnProperty.call(this.data, key) ? this.data[key] : null;
  }

  setItem(key: string, value: string): void {
    this.data[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.data[key];
  }

  clear(): void {
    this.data = {};
  }

  key(index: number): string | null {
    const keys = Object.keys(this.data);
    return keys[index] || null;
  }
}

// Test and apply polyfills gracefully
try {
  const testKey = '__test_local_storage__';
  window.localStorage.setItem(testKey, '1');
  window.localStorage.removeItem(testKey);
} catch (e) {
  console.warn('Native localStorage is not accessible. Using in-memory fallback.');
  try {
    Object.defineProperty(window, 'localStorage', {
      value: new MemoryStorage(),
      configurable: true,
      enumerable: true,
      writable: true
    });
  } catch (err) {
    console.error('Failed to define localStorage polyfill', err);
  }
}

try {
  const testKey = '__test_session_storage__';
  window.sessionStorage.setItem(testKey, '1');
  window.sessionStorage.removeItem(testKey);
} catch (e) {
  console.warn('Native sessionStorage is not accessible. Using in-memory fallback.');
  try {
    Object.defineProperty(window, 'sessionStorage', {
      value: new MemoryStorage(),
      configurable: true,
      enumerable: true,
      writable: true
    });
  } catch (err) {
    console.error('Failed to define sessionStorage polyfill', err);
  }
}

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
