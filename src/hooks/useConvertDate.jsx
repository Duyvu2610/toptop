function useConvertDate(date) {
    const now = new Date()
    const yourDate = new Date(date)
    const seconds = Math.floor((now.getTime() - yourDate.getTime()) / 1000)
    if (seconds < 60) return (seconds) + " giây trước"
    else if (seconds < 3600) return Math.floor(seconds / 60) + " phút trước"
    else if (seconds < 86400) return Math.floor(seconds / 3600) + " tiếng trước"
    else if (seconds < 604800) return Math.floor(seconds / 86400) + " ngày trước"
    else if (seconds < 2678400) return Math.floor(seconds / 604800) + " tuần trước"
    else if (seconds < 31536000) return Math.floor(seconds / 2678400) + " tháng trước"
    else return Math.floor(seconds / 31536000) + " năm trước"
}
export default useConvertDate