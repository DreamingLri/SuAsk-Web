function splitStr(str: string) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= 'a' && str[i] <= 'z') {
            return { val: parseFloat(str.slice(0, i)), unit: str.slice(i) }
        }
    }
    return { val: parseFloat(str), unit: '' }
}

export function getImgStyle(photos: string[] | undefined, MAX_SIZE = '450px') {
    let { val, unit } = splitStr(MAX_SIZE)
    val *= 0.97 // 留出一点边距
    let hasImages = false
    let sizew: number | string = 0
    let containerWidth: number | string = 0
    if (!photos || photos.length === 0) {
        // 没有图片
        return { size: '0px', hasImages, containerWidth, gap: 0 }
    }
    if (photos.length > 8) {
        // 最多显示8张图片
        photos.length = 8
    }
    hasImages = true
    const col = 4
    // let row = Math.ceil(photos.length / col); // 图片行数
    const width = (100 - (col - 1) * 2) / col // 图片宽度百分比
    sizew = (width / 100) * val // 图片大小
    containerWidth = ((width * col + (col - 1) * 2) / 100) * val // 图片容器宽度
    return {
        size: `${sizew}${unit}`,
        hasImages,
        containerWidth: `${containerWidth}${unit}`,
        gap: `${(2 / 100) * val}${unit}`,
    }
}

export function getTimeStr(timeStamp: number) {
    const now = new Date()
    const other = new Date(timeStamp)
    const year = other.getFullYear()
    const month = other.getMonth() + 1
    const day = other.getDate()
    const hour = other.getHours()
    const minute = other.getMinutes()
    if (year !== now.getFullYear()) {
        // 不同年
        return `${year}-${month}-${day}`
    } else if (month !== now.getMonth() + 1) {
        // 不同月
        return `${month}-${day}`
    } else if (day !== now.getDate()) {
        // 不同日
        const diff = now.getDate() - day
        if (diff === 1) {
            return `昨天  ${hour}:${minute < 10 ? '0' + minute : minute}`
        } else if (diff === 2) {
            return `前天  ${hour}:${minute < 10 ? '0' + minute : minute}`
        } else if (diff <= 7) {
            return `${diff}天前  ${hour}:${minute < 10 ? '0' + minute : minute}`
        } else {
            return `${month}-${day}`
        }
    } else {
        // 同一天
        return `${hour}:${minute < 10 ? '0' + minute : minute}`
    }
}
