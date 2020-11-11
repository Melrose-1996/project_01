var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	base64DecodeChars = new Array(
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		62,
		-1,
		-1,
		-1,
		63,
		52,
		53,
		54,
		55,
		56,
		57,
		58,
		59,
		60,
		61,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		25,
		-1,
		-1,
		-1,
		-1,
		-1,
		-1,
		26,
		27,
		28,
		29,
		30,
		31,
		32,
		33,
		34,
		35,
		36,
		37,
		38,
		39,
		40,
		41,
		42,
		43,
		44,
		45,
		46,
		47,
		48,
		49,
		50,
		51,
		-1,
		-1,
		-1,
		-1,
		-1
	)
function base64encode(e) {
	var r, a, t, o, c, d
	for (t = (e = utf16to8(e)).length, a = 0, r = ''; a < t; ) {
		if (((o = 255 & e.charCodeAt(a++)), a == t)) {
			;(r += base64EncodeChars.charAt(o >> 2)), (r += base64EncodeChars.charAt((3 & o) << 4)), (r += '==')
			break
		}
		if (((c = e.charCodeAt(a++)), a == t)) {
			;(r += base64EncodeChars.charAt(o >> 2)),
				(r += base64EncodeChars.charAt(((3 & o) << 4) | ((240 & c) >> 4))),
				(r += base64EncodeChars.charAt((15 & c) << 2)),
				(r += '=')
			break
		}
		;(d = e.charCodeAt(a++)),
			(r += base64EncodeChars.charAt(o >> 2)),
			(r += base64EncodeChars.charAt(((3 & o) << 4) | ((240 & c) >> 4))),
			(r += base64EncodeChars.charAt(((15 & c) << 2) | ((192 & d) >> 6))),
			(r += base64EncodeChars.charAt(63 & d))
	}
	return r
}
function base64decode(e) {
	var r, a, t, o, c, d, n
	for (d = e.length, c = 0, n = ''; c < d; ) {
		do {
			r = base64DecodeChars[255 & e.charCodeAt(c++)]
		} while (c < d && -1 == r)
		if (-1 == r) break
		do {
			a = base64DecodeChars[255 & e.charCodeAt(c++)]
		} while (c < d && -1 == a)
		if (-1 == a) break
		n += String.fromCharCode((r << 2) | ((48 & a) >> 4))
		do {
			if (61 == (t = 255 & e.charCodeAt(c++))) return utf8to16(n)
			t = base64DecodeChars[t]
		} while (c < d && -1 == t)
		if (-1 == t) break
		n += String.fromCharCode(((15 & a) << 4) | ((60 & t) >> 2))
		do {
			if (61 == (o = 255 & e.charCodeAt(c++))) return utf8to16(n)
			o = base64DecodeChars[o]
		} while (c < d && -1 == o)
		if (-1 == o) break
		n += String.fromCharCode(((3 & t) << 6) | o)
	}
	return utf8to16(n)
}
function utf16to8(e) {
	var r, a, t, o
	for (r = '', t = e.length, a = 0; a < t; a++)
		(o = e.charCodeAt(a)) >= 1 && o <= 127
			? (r += e.charAt(a))
			: o > 2047
				? ((r += String.fromCharCode(224 | ((o >> 12) & 15))),
					(r += String.fromCharCode(128 | ((o >> 6) & 63))),
					(r += String.fromCharCode(128 | ((o >> 0) & 63))))
				: ((r += String.fromCharCode(192 | ((o >> 6) & 31))), (r += String.fromCharCode(128 | ((o >> 0) & 63))))
	return r
}
function utf8to16(e) {
	var r, a, t, o, c, d
	for (r = '', t = e.length, a = 0; a < t; )
		switch ((o = e.charCodeAt(a++)) >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				r += e.charAt(a - 1)
				break
			case 12:
			case 13:
				;(c = e.charCodeAt(a++)), (r += String.fromCharCode(((31 & o) << 6) | (63 & c)))
				break
			case 14:
				;(c = e.charCodeAt(a++)),
					(d = e.charCodeAt(a++)),
					(r += String.fromCharCode(((15 & o) << 12) | ((63 & c) << 6) | ((63 & d) << 0)))
		}
	return r
}
function querystringify(obj, prefix) {
	var has = Object.prototype.hasOwnProperty
	prefix = prefix || ''
	var pairs = []
	if ('string' !== typeof prefix) prefix = '?'
	for (var key in obj) {
		if (has.call(obj, key)) {
			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
		}
	}
	return pairs.length ? prefix + pairs.join('&') : ''
}

export { base64encode, base64decode, querystringify }
