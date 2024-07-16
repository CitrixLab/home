function assembleWebsite(url, contentDivId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data) {
        const contentDiv = document.getElementById(contentDivId);
        contentDiv.textContent = 'Error loading website structure: Empty data';
        return;
      }
      buildHTML(data, contentDivId);
    })
    .catch(error => {
      const contentDiv = document.getElementById(contentDivId);
      console.error("Error loading website structure:", error);
      contentDiv.textContent = 'Error loading website structure: ' + error.message;
    });
}

function buildHTML(data, contentDivId) {
  const contentDiv = document.getElementById(contentDivId);
  contentDiv.innerHTML = ''; // Clear existing content

  const headElements = buildHeadElements(data.head);
  const bodyElements = buildBodyElements(data.body);

  const head = document.createElement('head');
  head.append(...headElements);

  const body = document.createElement('body');
  body.append(...bodyElements);

  contentDiv.appendChild(head);
  contentDiv.appendChild(body);
}

function buildHeadElements(headData) {
  if (!headData) return []; // Handle missing head data

  const elements = [];
  for (const key in headData) {
    const element = document.createElement(key);
    if (typeof headData[key] === 'object') {
      for (const attr in headData[key]) {
        element.setAttribute(attr, headData[key][attr]);
      }
    } else {
      element.textContent = headData[key];
    }
    elements.push(element);
  }
  return elements;
}

function buildBodyElements(bodyData) {
  if (!bodyData) return []; // Handle missing body data

  const elements = [];
  for (const section in bodyData) {
    const sectionElement = buildSectionElement(bodyData[section]);
    elements.push(sectionElement);
  }
  return elements;
}

function buildSectionElement(sectionData) {
  const element = document.createElement(Object.keys(sectionData)[0]);
  const content = sectionData[Object.keys(sectionData)[0]];
  if (Array.isArray(content)) {
    const childElements = content.map(buildListItemElement);
    element.append(...childElements);
  } else {
    const childElement = buildContentElement(content);
    element.appendChild(childElement);
  }
  return element;
}

function buildListItemElement(listItemData) {
  const element = document.createElement('li');
  const anchorElement = buildContentElement(listItemData.a);
  element.appendChild(anchorElement);
  return element;
}

function buildContentElement(contentData) {
  const element = document.createElement(typeof contentData === 'string' ? 'p' : Object.keys(contentData)[0]);
  element.textContent = typeof contentData === 'string' ? contentData : contentData[Object.keys(contentData)[0]];
  return element;
}

assembleWebsite("website-structure.json", "website-content");
