const input = document.getElementById('lettersInput');

const onClick = () => {
	input.value.split('').forEach((item, i) => {
		const letter = document.createElement('span');
		letter.className = 'letter';
		letter.id = `id${i}`;
		letter.innerText = item;
		document.body.append(letter)
		letter.style.left = letter.getBoundingClientRect().left + 'px';
		letter.style.top = letter.getBoundingClientRect().top + 'px';
		setTimeout(() => {
			letter.style.position = 'absolute'
		})
		setupElementEvents(letter);
		return letter;
	})

}

const setupElementEvents = (letterElement) => {
	letterElement.ondragstart = () => false;
	letterElement.onmousedown = (event) => {
		const shiftX = event.clientX - letterElement.getBoundingClientRect().left;
		const shiftY = event.clientY - letterElement.getBoundingClientRect().top;

		const x = letterElement.style.left;
		const y = letterElement.style.top;

		const moveAt = (pageX, pageY) => {
			letterElement.style.left = pageX - shiftX + 'px';
			letterElement.style.top = pageY - shiftY + 'px';
		}
		const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
		document.addEventListener('mousemove', onMouseMove);

		letterElement.onmouseup = () => {
			const letters = document.getElementsByClassName('letter')
			const currentRect = letterElement.getBoundingClientRect();

			const swappedElement = Array.from(letters).find((element) => {
				const potentialRect = element.getBoundingClientRect();
				return (letterElement.id !== element.id && isInside(potentialRect, currentRect))
			});

			if (swappedElement) {
				swappedElement.style.left = x;
				swappedElement.style.top = y;
			}

			document.removeEventListener('mousemove', onMouseMove);
			letterElement.onmouseup = null;
		};
	}
}
const isInside = (potentialRect, currentRect) => {
	return (currentRect.right >= potentialRect.left && currentRect.left <= potentialRect.left &&
		currentRect.bottom >= potentialRect.top && currentRect.top <= potentialRect.top)
		||
		(currentRect.right >= potentialRect.left && currentRect.left <= potentialRect.left &&
			currentRect.top <= potentialRect.bottom && currentRect.top >= potentialRect.top)
		||
		(currentRect.left <= potentialRect.right && currentRect.left >= potentialRect.left &&
			currentRect.bottom >= potentialRect.top && currentRect.top <= potentialRect.top)
		||
		(currentRect.left <= potentialRect.right && currentRect.left >= potentialRect.left &&
			currentRect.top <= potentialRect.bottom && currentRect.top >= potentialRect.top);
}