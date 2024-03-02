import { InjectionToken } from '@angular/core';
import { GeminiConfig, GeminiSafetySetting } from './interfaces/genmini.interface';

export const GEMINI_API_KEY = new InjectionToken<string>('API_KEY');
export const GEMINI_PRO_URL = new InjectionToken<string>('GEMINI_PRO_URL');
export const GEMINI_PRO_VISION_URL = new InjectionToken<string>('GEMINI_PRO_VISION_URL');

export const GEMINI_GENERATION_CONFIG = new InjectionToken<GeminiConfig>('GEMINI_GENERATION_CONFIG');
export const GEMINI_SAFETY_SETTINGS = new InjectionToken<GeminiSafetySetting[]>('GEMINI_SAFETY_SETTINGS');
