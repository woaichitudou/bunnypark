!(function () {
  var legalDomains = [
    'adventurebunny.bunnypark.com/',
    'bunny.bunnypark.com/',
    'bunnypark-next-fe-pre.pages.dev/',
    'localhost:5600/',
  ]
  var isLegal = legalDomains.includes(document.referrer.replace('http://', '').replace('https://', '').split('/')[0] + '/')
  if (window.location != window.parent.location && !isLegal) {
    window.location.href = '/error.html'
    return
  }
  function isMobile () {
    var isPhone = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) != null
    var isVPhone = window.name === 'mobile'
    return isPhone || isVPhone
  }
  function htmlFontSize () {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var width = w > 900 ? 900 : w
    var fz = ~~(width * 100000 / 37.5) / 10000
    var html = document.querySelector('html')
    html.style.cssText = 'font-size: ' + fz + 'px'
    var realfz = ~~(+window.getComputedStyle(html).fontSize.replace('px', '') * 10000) / 10000
    if (fz !== realfz) {
      html.style.cssText = 'font-size: ' + fz * (fz / realfz) + 'px'
    }
  }
  var parts = location.pathname.replace(/(^\/|\/$)/g, '').split('/')
  if (isMobile()) {
    if (parts[0] !== 'm') {
      // location.href = ['', 'm'].concat(parts).join('/')
      location.href = '/m/rabbit'
    }
    document.querySelector('html').classList.add('mobile-model')
    // rem for mobile
    window.addEventListener(
      'resize',
      (function () {
        htmlFontSize()
        return arguments.callee
      })(),
      false
    )
  } else {
    if (parts[0] === 'm') {
      location.href = '/'
    }
  }
})()
