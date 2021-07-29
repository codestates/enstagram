export const timeSince = (previous) => {
    const current = new Date()
    const previousDate = new Date(previous)
    const elapsed = (current.getTime() - previousDate.getTime())/1000

    const msPerMinute = 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed) + '초 전';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + '분 전';
    } else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + '시간 전';
    } else if (elapsed < msPerWeek) {
        return Math.round(elapsed/msPerDay) + '일 전';
    } else {
        return Math.round(elapsed/msPerWeek) + '주 전';
    }
}
