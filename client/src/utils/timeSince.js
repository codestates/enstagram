export const timeSince = (previous) => {
    const current = new Date()
    const previousDate = new Date(previous)
    const elapsed = (current.getTime() - previousDate.getTime())/1000

    const msPerMinute = 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';
    } else if (elapsed < msPerWeek) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    } else {
        return 'approximately ' + Math.round(elapsed/msPerWeek) + ' weeks ago';
    }
}
