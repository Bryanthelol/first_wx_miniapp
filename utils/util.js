/**
 * @Author: 何玉龙 <apple>
 * @Date:   2017-06-09T06:44:24+08:00
 * @Email:  bryantsisu@gmail.com
 * @Filename: util.js
 * @Last modified by:   apple
 * @Last modified time: 2017-07-31T05:54:43+08:00
 */



function formatTime( date ) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [ year, month, day ].map( formatNumber ).join( '/' ) + ' ' + [ hour, minute, second ].map( formatNumber ).join( ':' )
}

function formatNumber( n ) {
  n = n.toString()
  return n[ 1 ] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber
}
