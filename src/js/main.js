import { StoryExpandedList } from './story';

const resource = 'data.json';

requestAnimationFrame(() => {
	const search = document.getElementById('search');
	let openned;

	fetch(resource)
		.then((response) => {
			if (response.status >= 200 &&
				response.status < 300) {
				return Promise.resolve(response);
			} else {
				return Promise.reject(new Error(response.statusText));
			}
		})
		.then((response) => response.json())
		.then((data) => {

			const list = new StoryExpandedList(data.results);
			list.render('list');


			window.toggle = (e) => {
				if (openned === undefined) {
					document.getElementById('s' + e).classList.remove('collapsable');
				} else if (openned === e) {
					if (document.getElementById('s' + e).classList.length === 0) {
						document.getElementById('s' + e).classList.add('collapsable');
					} else {
						document.getElementById('s' + e).classList.remove('collapsable');
					}
				} else {
					document.getElementById('s' + e).classList.remove('collapsable');
					document.getElementById('s' + openned).classList.add('collapsable');
				}
				openned = e;
			};

			search.addEventListener('keyup', (evt) => {
				// console.log(evt.target.value, evt.target.id);
				const articles = document.querySelectorAll('article[id^=a]');
				const titles = document.querySelectorAll('span[id^=sp]');
				// console.log(articles);
				if (evt.target.value === '') {
					for(const article of articles) {
						article.classList.remove('hidden');
					}
				} else {


					for (const title of titles) {
						let match = title.innerText.toLowerCase().includes(evt.target.value);
						if (match === true) {
							// console.log('matched ? ' + match + ' at' + title.id);
							// console.log(title.innerText, title.id.substr(2));
							document.getElementById('a' + title.id.substr(2)).classList.remove('hidden');
						}
						if (match === false) {
							document.getElementById('a' + title.id.substr(2)).classList.add('hidden');
						}
					}
				}

			});

		})
		.catch((reason) => {
			console.error('error', reason);
		});
});
