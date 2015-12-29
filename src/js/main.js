import { StoryExpandedList } from './story';

const resource = 'data.json';

requestAnimationFrame(() => {

	const search = document.getElementById('search');
	const oldNew = document.getElementById('oldNew');
	let openned;
	let ordered = 'desc';

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
			console.log(data);
			const list = new StoryExpandedList(data.results);

			list.render(ordered, 'list');

			window.toggle = (e) => {
				if (openned === undefined) {
					document.getElementById('s' + e).classList.remove('collapsable');
					document.getElementById('hi' + e).classList.add('hidden');
				} else if (openned === e) {

					if (document.getElementById('s' + e).classList.length === 0) {
						document.getElementById('s' + e).classList.add('collapsable');
						document.getElementById('hi' + e).classList.remove('hidden');
					} else {
						document.getElementById('s' + e).classList.remove('collapsable');
						document.getElementById('hi' + e).classList.add('hidden');
					}
				} else {

					document.getElementById('s' + e).classList.remove('collapsable');
					document.getElementById('s' + openned).classList.add('collapsable');
					document.getElementById('hi' + e).classList.add('hidden');
					document.getElementById('hi' + openned).classList.remove('hidden');
				}
				openned = e;
			};

			search.addEventListener('keyup', (evt) => {
				const articles = document.querySelectorAll('article[id^=a]');
				if (evt.target.value === '') {
					for(const article of articles) {
						article.classList.remove('hidden');
					}
				} else {
					(list.items).forEach((el, ind) => {
						const matchTitle = (title) => {
							return title.toLowerCase().includes(evt.target.value) ||
										title.toUpperCase().includes(evt.target.value) ||
										title.includes(evt.target.value);
						};
						const matchContent = (content) => {
							return content.toLowerCase().includes(evt.target.value) ||
										content.toUpperCase().includes(evt.target.value) ||
										content.includes(evt.target.value);
						};

						if (matchTitle(el.titleNoFormatting) || matchContent(el.content) === true) {
							document.getElementById('a' + ind).classList.remove('hidden');
						} else {
							document.getElementById('a' + ind).classList.add('hidden');
						}

					});
				}

			});

			oldNew.addEventListener('click', (evt) =>{
				// console.log(evt);
				const button = document.getElementById('oldNew');
				list.destroy('list');
				if (ordered === 'asc') {
					list.render('desc', 'list');
					ordered = 'desc';
					button.innerHTML = 'old => new';
				} else {
					list.render('asc', 'list');
					ordered = 'asc';
					button.innerHTML = 'new => old';
				}
			});

		})
		.catch((reason) => {
			console.error('error', reason);
		});
});
