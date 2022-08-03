// 正则封装
let NameReg = /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/g
let PhoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/g
let PasswordReg = /^\d{6}$/g

function Regular (node, reg) {
    let newStr
    if (reg.test(node.value)) {
        newStr = false
    } else {
        newStr = true
    }
    return newStr
}

export function nameRegular (node) {
    return Regular(node, NameReg)
}
export function phoneRegular (node) {
    return Regular(node, PhoneReg)
}
export function passwordRegular (node) {
    return Regular(node, PasswordReg)
}

/*
功能：用来判断每个节点中是不是为空
*/
export function checkAll (node) {
    let flag
    let list = []
    node.forEach((ele, index) => {
        if (ele.value == '') {
            list.push(index)
        }
    });
    if (!list.length) {
        flag = true
    } else {
        flag = false
    }

    return flag
}