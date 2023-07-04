// 获取网站的cookie，并打印出来
export function handleCookie(params) {
	console.log('chrome',chrome)
	chrome.tabs.query({ }, tabs => {
		console.log('tabs',tabs)
    tabs.forEach(element => {
      let url= 'https://www.baidu.com/';
		// use `url` here inside the callback because it's asynchronous!
		console.log('url--', url);
		chrome.cookies.getAll({ url }, function (cookies) {
	console.log('cookies',cookies)

			const resList = cookies.map(item => {
				return `${item.name}=${item.value}`
			})
			const cookieStr = resList.join(";")
			console.log("cookies-----", cookieStr);
		});      
    });

	});
}
