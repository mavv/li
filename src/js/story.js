import Image from './image';

class Story {
	constructor (item) {
		this.title = item.title;
		this.titleNoFormatting = item.titleNoFormatting;
		this.publisher = item.publisher;
		this.publishedDate = new Date(item.publishedDate);
	}
}

class StoryExpanded extends Story {
	constructor (item) {
		super(item);
		this.image = new Image(item.image);
		this.content = item.content;
		this.url = item.url;
		this.unescapedUrl = item.unescapedUrl;
		const rel = item.relatedStories;
		// console.log(rel);
		// this.relatedStories = new RelatedStoriesList(item.relatedStories);
	}

}

export class StoryExpandedList {
	constructor (items) {
		this.items = new Array();
		for (const el of items) {

			this.items.push(new StoryExpanded(el));
		}
	}

	render (id) {
		const root = document.getElementById(id);

		for (const el of this.items) {

			root.innerHTML += `<article id="a${this.items.indexOf(el)}">
					<header onClick="toggle(${this.items.indexOf(el)})" class="trigger" id="h${this.items.indexOf(el)}">
						<div>
							<img src="${el.image.tbUrl}"/>
						</div>
						<div>
							<span id="sp${this.items.indexOf(el)}">${el.title}</span>
						</div>
					</header>
					<section class="collapsable" id="s${this.items.indexOf(el)}">
						<div>
							<img src="${el.image.url}"/>
						</div>
						<div>
							<p>${el.content}<a href="${el.unescapedUrl}">Read more</a></p>
						</div>
					</section>
				</article>
				`;

		}
		return root.childNodes[0];
	}

}
