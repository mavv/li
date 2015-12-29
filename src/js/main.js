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
				if (evt.target.value !== '') {
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
						}
						if (matchTitle(el.titleNoFormatting) || matchContent(el.content) === true) {
							document.getElementById('a' + ind).classList.remove('hidden');
						} else {
							document.getElementById('a' + ind).classList.add('hidden');
						}

					});
				}

			});

		})
		.catch((reason) => {
			console.error('error', reason);
		});
});
