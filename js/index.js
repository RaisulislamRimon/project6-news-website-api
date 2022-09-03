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
    console.log(element.category_name);

    

    const li = document.createElement("li");
    li.innerHTML = `
      <a onclick="loadNewsById('${element.category_id}')" class="btn btn-ghost normal-case text-lg">${element.category_name}</a>
    `;
    secondNavContainer.appendChild(li);
  });
};

const loadNewsById = (category_id) => {
  // console.log(category_id);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsById(data));
};

const displayNewsById = (news) => {
  console.log(news);
  // console.log(news.data.length);
  const noDataMsg = document.getElementById("no-data-msg");
  if (news.data.length === 0) {
    noDataMsg.classList.remove("hidden");
    console.log("No Data Found");
  } else {
    noDataMsg.classList.add("hidden");
  }
  const newsArray = news.data;
  console.log(newsArray);
  // sorting the post by total view count
  newsArray.sort((a, b) => b.total_view - a.total_view);

  // showing total found news count in the UI
  const itemNumber = document.getElementById("item-number");
  itemNumber.innerText = newsArray.length;

  // // showing the found news category in the UI
  // const categoryName =  document.getElementById('category-name')
  // categoryName.innerText = newsArray[0].category_name;

  // // showing the found news category in the UI
  // const categoryName = document.getElementById("category-name");
  // categoryName.innerText = element.category_name;

  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  newsArray.forEach((element) => {
    // console.log(element);
    // element.sort((a, b) => b.data[0].total_view - a.data[0].total_view);
    const { thumbnail_url, title, details, author, total_view, _id } = element;
    // console.log(total_view);

    const newsCard = document.createElement("div");
    newsCard.classList.add("mb-8");
    newsCard.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl p-4 flex flex-col md:flex-none	md:flex-row	">
          <img
            class="rounded-xl h-80	"
            src="${thumbnail_url}"
            alt="Movie"
          />
          <div class="card-body ">
            <h2 class="card-title text-2xl font-medium text-black mb-4">
              ${title}
            </h2>
            <p class="w-full md:w-auto">
              ${details.length > 300 ? details.slice(0, 300) + "..." : details}
            </p>
            <div>
              <div class="card-actions justify-between my-5">
                <div class="flex">
                  <div class="avatar">
                    <div class="w-12 mask mask-decagon">
                      <img src="${author.img}" />
                    </div>
                  </div>
                  <div class="mx-3">
                    <p class="font-bold">${
                      author.name ? author.name : "No data available"
                    }</p>
                    <p>${author.published_date}</p>
                  </div>
                </div>
                <div class="flex mt-4">
                  <span class="material-symbols-outlined m-0.5">
                    visibility
                  </span>
                  <span class="mx-2 font-bold text-lg">${
                    total_view ? total_view : "No data available"
                  }</span>
                </div>
                <div class="rating mt-4">
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                  />
                </div>
                <label for="my-modal-6" class="btn btn-primary" onclick="readMoreModal('${_id}')">Read More</label>
              </div>
            </div>
          </div>
        </div>
      `;
    newsContainer.appendChild(newsCard);
  });
};

const readMoreModal = (_id) => {
  // console.log(_id);
  const url = `https://openapi.programming-hero.com/api/news/${_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayReadMoreModal(data))
    .catch((err) => console.log(err));
};

const displayReadMoreModal = (news) => {
  // console.log(news);
  // console.log(news.data[0].title);
  const { title, image_url, details, author, rating, others_info, total_view } =
    news.data[0];
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = ``;
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal-box");
  modalDiv.innerHTML = `
  <h3 id="modal-title" class="font-bold text-xl">${title}</h3>
  <img class="w-full py-4" src="${image_url}" alt="" />
  <p class="py-4">
    ${details}
  </p>
  <p class="py-4">
    <span class="font-medium">Published Date : </span> 
    ${author.published_date}
  </p>
  <p class="py-4">
    <span class="font-medium">Author : </span> 
    ${author.name ? author.name : "No data available"}
  </p>
  <p class="py-4">
    <span class="font-medium">Rating : </span>
    ${rating.badge}
  </p>
  <p class="py-4"><span class="font-medium">Trending : </span>${
    others_info.is_trending ? "Yes" : "No"
  }</p>
  <p class="py-4">
    <span class="font-medium">Total View : </span>${
      total_view ? total_view : "No data available"
    }
  </p>
  <div class="modal-action">
    <label for="my-modal-6" class="btn">Close</label>
  </div>

  `;
  modalContainer.appendChild(modalDiv);
};

loadAllMenu();
loadNewsById("01");
