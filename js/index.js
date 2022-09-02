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
    li.innerText = element.category_name;
    secondNavContainer.appendChild(li);
  });
};

loadAllMenu();
