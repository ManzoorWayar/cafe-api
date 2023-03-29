const isHalf = 30                   // 30 minutes in value
const blessedTime = 5              // Time to be ignored
const isHalfPlus5 = 35            // 35 minutes in value
const halfNetValue = 20          // 20 minutes half File-Share price
const defaultNetValue = 30      // default File-Share price
const deafultGenerator = 10    // By Generator add 10 afg for everything

export const countMoney = (body) => {
    let payment = 0;

    const [wifiValue, halfWifiValue] = speedAscertain(body.speed)
    const passedTime = generateTimeDeff(body.from)

    if (!body.pc) {
        payment = 0
        return [payment, passedTime];
    }

    if (passedTime <= 5) {
        payment = 0
        return [payment, passedTime];
    }

    if (passedTime < isHalf || passedTime <= isHalfPlus5) {
        payment = body.isUsingWifi ? halfWifiValue : halfNetValue;
        payment = body.isGenerator ? (payment += deafultGenerator) : payment;

    } else {
        const hours = parseInt(passedTime / 60, 10)
        const remain = passedTime % 60;

        payment = body.isUsingWifi ?
            (remain > blessedTime ? (hours * wifiValue + (remain <= 35 ? halfWifiValue : wifiValue)) : hours * wifiValue)
            :
            (remain > blessedTime ? (hours * defaultNetValue + (remain <= 35 ? halfNetValue : defaultNetValue)) : hours * defaultNetValue)

        payment = body.isGenerator ? (payment += deafultGenerator * hours) : payment;
    }

    return [Math.trunc(payment), passedTime];
}

export const countMobileWifiMoney = (body) => {
    let payment = 0;

    const [wifiValue, halfWifiValue] = speedAscertain(body.mobileSpeed)
    const passedTime = generateMobWifiTime(body.mobileFrom)

    if (!body.mobileFrom) {
        payment = 0
        return [payment, passedTime];
    }

    if (passedTime <= 5) {
        payment = 0
        return [payment, passedTime];
    }

    const hours = parseInt(passedTime / 60, 10)
    const remain = passedTime % 60;

    payment = (remain > blessedTime ? (hours * wifiValue + (remain <= 35 ? halfWifiValue : wifiValue)) : hours * wifiValue)

    payment = isNaN(payment) ? 0 : Math.trunc(payment)

    return [payment, passedTime];
}

const generateTimeDeff = (from) => {
    let diff = (new Date(from).getTime() - new Date()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff))
}

const generateMobWifiTime = (from) => {
    if (!from) {
        return 0
    }

    let diff = (new Date(from).getTime() - new Date()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff))
}

const speedAscertain = (speed) => {
    const wifiValue = speed === '1.5' ? 60 : speed === '2' ? 80 : 40        // 1hr minutes Wi-Fi price 

    const halfWifiValue = speed === '1.5' ? 30 : speed === '2' ? 40 : 20   // 30 minutes Wi-Fi price

    return [wifiValue, halfWifiValue]
}

