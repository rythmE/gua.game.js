var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

// var rectIntersects = function(a, b) {
//     var o = a
//     if (b.y > o.y && b.y < o.y + o.h) {
//         if (b.x > o.x && b.x < o.x + o.w) {
//             log('香蕉！')
//             return true
//         }
//     }
//     return false
// }

var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}

var rectIntersects = function (a, b) {
    if ((b.x + b.w < a.x) || (b.x > a.x + a.w)
        || (b.y + b.h < a.y) || (b.y > a.y + a.h)) {
            return false
        }
    // log('香蕉！')
    return true
}
