// 获取网站的cookie，并打印出来
export function handleCookie(params) {
	console.log('chrome', chrome)
	chrome.tabs.query({}, tabs => {
		console.log('tabs', tabs)
		tabs.forEach(element => {
			let url = 'https://www.baidu.com/';
			// use `url` here inside the callback because it's asynchronous!
			console.log('url--', url);
			chrome.cookies.getAll({ url }, function (cookies) {
				console.log('cookies', cookies)

				const resList = cookies.map(item => {
					return `${item.name}=${item.value}`
				})
				const cookieStr = resList.join(";")
				console.log("cookies-----", cookieStr);
			});
		});

	});
}
const reg1 = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
const reg2 = /((https|http|ftp|file):\/\/)([A-Za-z0-9\-.]+)(:[0-9]+){0,1}/g;

export function getDomain(url, isFullPath) {
	let reg = isFullPath ? reg1 : reg2;
	let text = '';
	if (url && typeof url === 'string') {
		const reg = /((https|http|ftp|file):\/\/)([A-Za-z0-9\-.]+)(:[0-9]+){0,1}/g;
		const arr = url.match(reg);
		if (arr && arr.length > 0) {
			text = arr[0];
		} else {
			//
		}
	} else {
		//
	}
	return text;
}
// 获取某一网站，某一个key的cookie
export function getCookieVlaue(url, key) {
	let res = {}
	return new Promise(function (resolve, reject) {
		try {
			chrome.tabs.query({}, tabs => {
				const targetTabs = tabs.filter(element => {
					return getDomain(element.url) == getDomain(url)
				})
				if (targetTabs.length == 0) {
					resolve(res)
				}
				targetTabs.forEach((element, index) => {
					console.log('11', index, targetTabs.length, element)
					chrome.cookies.getAll({ url }, function (cookies) {
						console.log(url, cookies, key)
						res = cookies.find((item) => {
							console.log(item, item.name, key)
							return item.name == key
						})
						console.log(res)
						if (res) {
							resolve(res)
						} else if (index == targetTabs.length - 1)
							resolve(res)
					})
				});

			});
		} catch (error) {
			resolve({ value: 1 })

		}
	})
}


