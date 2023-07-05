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
export function getDomain(url) {
	if (!url) { return '' }
	var domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im)[0];
	console.log(domain)
	return domain
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


