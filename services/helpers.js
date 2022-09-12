export function sequence(count, start) {
    const offset = start ?? 0;

    return new Array(count).fill().map( (_, i) => i+offset);
}