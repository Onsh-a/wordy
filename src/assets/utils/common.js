const _debounce = (callBack, delay = 1000) => {
	let timeout

	return (...args) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			callBack(...args)
		}, delay)
	}
}

const _throttle = (callBack, delay = 1000) => {
	let shouldWait = false
	let waitingArgs
	const timeoutFunc = () => {
		if (waitingArgs == null) {
			shouldWait = false
		} else {
			callBack(...waitingArgs)
			waitingArgs = null
			setTimeout(timeoutFunc, delay)
		}
	}

	return (...args) => {
		if (shouldWait) {
			waitingArgs = args
			return
		}

		callBack(...args)
		shouldWait = true

		setTimeout(timeoutFunc, delay)
	}
}

function _validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export default {
	_debounce,
	_throttle,
	_validateEmail,
}
