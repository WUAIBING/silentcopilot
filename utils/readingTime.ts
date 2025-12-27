/**
 * Calculate estimated reading time for text content
 * @param text - The text content to analyze
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(text: string | null): number {
  if (!text) return 0;
  
  // Average reading speed for Chinese: ~200-250 characters per minute
  // For mixed Chinese/English content, we adjust accordingly
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = text.split(/\s+/).filter(word => /[a-zA-Z]/.test(word)).length;
  
  // Calculate reading time
  // Chinese: 250 characters per minute
  // English: 200 words per minute
  const chineseTime = chineseChars / 250;
  const englishTime = englishWords / 200;
  
  const totalMinutes = chineseTime + englishTime;
  
  // Round to nearest minute, minimum 1 minute
  return Math.max(1, Math.round(totalMinutes));
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read" or "1 min read"
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '< 1 min read';
  return `${minutes} min read`;
}
