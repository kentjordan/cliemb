export default function range(start: number, end: number, skip: number = 1) {
    return Array(end - start)
        .fill(0)
        .map((e, i) => i + start)
        .filter((e, i) => {
            return i % skip === 0;
        });
}