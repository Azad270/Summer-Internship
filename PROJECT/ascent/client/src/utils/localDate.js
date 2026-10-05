// The user's LOCAL calendar date as YYYY-MM-DD. The server validates this string
// (strict format, within a +/-1 day UTC window) but cannot know the user's timezone.
export function getLocalDate(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}
