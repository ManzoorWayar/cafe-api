const isHalf = 30                  // 30 minutes in value
const blessedTime = 5             // Time to be ignored
const halfNetValue = 20          // 20 minutes half File-Share price
const defaultNetValue = 30      // default File-Share price
const deafultGenerator = 10    // By Generator add 10 afg for everything

export const countMoney = (body) => {
    let payment = 0;

    const [wifiValue, halfWifiValue] = speedAscertain(body.speed)
    const passedTime = generateTimeDeff(body.from)

    if (passedTime < isHalf) {
        payment = body.isUsingWifi ? halfWifiValue : halfNetValue;
        payment = body.isGenerator ? (payment += deafultGenerator) : payment;

    } else {
        const hours = parseInt(passedTime / 60, 10)
        const remain = passedTime % 60;

        payment = body.isUsingWifi ?
            (remain > blessedTime ? (hours * wifiValue + (remain <= 30 ? halfWifiValue : wifiValue)) : hours * wifiValue)
            :
            (remain > blessedTime ? hours * (remain <= 30 ? halfNetValue : defaultNetValue) + halfNetValue : hours * defaultNetValue);

        payment = body.isGenerator ? (payment += deafultGenerator * hours) : payment;
    }

    return [Math.trunc(payment), passedTime];
}

export const countMobileWifiMoney = (body) => {
    let payment = 0;

    if (!body.mobileFrom) {
        payment = 0
        return [payment, 0];
    }

    const [wifiValue, halfWifiValue] = speedAscertain(body.mobileSpeed)
    const passedTime = generateMobWifiTime(body.mobileFrom)

    const hours = parseInt(passedTime / 60, 10)
    const remain = passedTime % 60;

    payment = (remain > blessedTime ? (hours * wifiValue + (remain <= 30 ? halfWifiValue : wifiValue)) : hours * wifiValue)

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
    const wifiValue = speed === '1.5' ? 50 : speed === '2' ? 60 : 40        // 40 minutes Wi-Fi price 

    const halfWifiValue = speed === '1.5' ? 40 : speed === '2' ? 50 : 30   // 30 minutes Wi-Fi price

    return [wifiValue, halfWifiValue]
}

