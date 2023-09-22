export function isSerializedEqual (a: string, b: string) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] === "*") continue;
        if (b[i] === "*") continue;

        if (a[i] !== b[i]) return false;
    }

    return true;
}