const loadAllMenu = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const response = await fetch(url);
  const data = await response.json();
  displayAllMenu(data.data.news_category);
};

const displayAllMenu = (menu) => {
  const secondNavContainer = document.getElementById("second-navbar");
  console.log(menu);
  menu.forEach((element) => {
    console.log(element.category_name);
    const li = document.createElement("li");
    li.innerHTML = `
      <a class="btn btn-ghost normal-case text-lg">${element.category_name}</a>
    `
    secondNavContainer.appendChild(li);
  });
};

loadAllMenu();
