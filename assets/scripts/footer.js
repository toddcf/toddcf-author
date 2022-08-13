const thisYear = new Date().getFullYear();
if (!!thisYear) {
	document.querySelector('.currentYear').innerHTML = `&ndash; ${thisYear} `;
}
