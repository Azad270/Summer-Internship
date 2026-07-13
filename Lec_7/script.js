document.body.style.backgroundColor = 'lightpink';

let header = document.createElement('div');
let sidebar = document.createElement('div');
let content1 = document.createElement('div');
let content2 = document.createElement('div');
let footer = document.createElement('div');

header.style.height='200px';
header.style.width='200px';

header.style.backgroundColor='white';

let body = document.body;
body.appendChild(header);

sidebar.style.width='200px';
sidebar.style.height='200px';
sidebar.style.backgroundColor='lightblue';
body.appendChild(sidebar);

content1.style.height='200px';
content1.style.width='200px';
content1.style.backgroundColor='green';
body.appendChild(content1);

content2.style.height='200px';
content2.style.width='200px';
content2.style.backgroundColor='red';
body.appendChild(content2);

