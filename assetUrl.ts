export function publicAssetUrl(assetPath: string): string {
  const normalized = assetPath.replace(/^\/+/, '');
  return new URL(normalized, window.location.href).pathname;
}

