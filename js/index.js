const loadAllMenu = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const response = await fetch(url);
  const data = await response.json();
  displayAllMenu(data.data.news_category);
};

const displayAllMenu = (menu) => {
  const secondNavContainer = document.getElementById("second-navbar");
  // console.log(menu);
  menu.forEach((element) => {
    // console.log(element.category_name);
    const li = document.createElement("li");
    li.innerHTML = `
      <a onclick="loadNewsById('${element.category_id}')" class="btn btn-ghost normal-case text-lg">${element.category_name}</a>
    `;
    secondNavContainer.appendChild(li);
  });
};

const loadNewsById = (category_id) => {
  console.log(category_id);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsById(data));
};

const displayNewsById = (news) => {
  const newsArray = news.data;
  const newsContainer = document.getElementById("news-container");
  newsArray.forEach(element => {
      console.log(element);
      const newsCard = document.createElement("div");
      
  });
};

loadAllMenu();
