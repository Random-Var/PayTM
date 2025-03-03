export function TokenGenerator(length: number = 10): string {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}
