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
  // console.log(category_id);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsById(data));
};

const displayNewsById = (news) => {
  // console.log(news);
  const newsArray = news.data;
  // console.log(newsArray);
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  newsArray.forEach((element) => {
    console.log(element);
    const { thumbnail_url, title, details, author, total_view, _id } = element;
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
            <h2 class="card-title text-2xl">
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
                      author.name ? author.name : "info not available"
                    }</p>
                    <p>${author.published_date}</p>
                  </div>
                </div>
                <div class="flex mt-4">
                  <span class="material-symbols-outlined m-0.5">
                    visibility
                  </span>
                  <span class="mx-2 font-bold text-lg">${
                    total_view ? total_view : "n/a"
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
  console.log(_id);
  const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayReadMoreModal(data))
    .catch((err) => console.log(err));
};

const displayReadMoreModal = (news) => {
  console.log(news);
  const readMoreModal = document.getElementById("read-more-modal");
  const modalDiv = readMoreModal.createElement("div");
  modalDiv.classList.add("modal");
  modalDiv.innerHTML = `
    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg">
          Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military
          Aid Package Yet
        </h3>
        <img
          class="w-full py-4"
          src="https://i.ibb.co/M23fhxm/unsplash-Eh-Tc-C9s-YXsw.png"
          alt=""
        />
        <p class="py-4">
          Wednesday, August 24, 2022 | Tag Cloud Tags: Biden, EU, Euro,
          Europe, Joe Biden, Military, News, Russia, Security, UK, Ukraine,
          United States, Worthy News (Worthy News) – U.S. President Joe Biden
          has announced nearly $3 billion in new U.S. military aid for Kyiv as
          Ukraine marked its independence day...
        </p>
        <p class="py-4 ">
          <span class="font-medium">Published Date : </span> 03 September 2022
        </p>
        <p class="py-4"><span class="font-medium">Author : </span>name here</p>
        <p class="py-4"><span class="font-medium">Review : </span>Excellent</p>
        <p class="py-4"><span class="font-medium">Trending : </span>Yes</p>
        <p class="py-4"><span class="font-medium">Total view : </span>1199</p>
        <div class="modal-action">
          <label for="my-modal-6" class="btn">Close</label>
        </div>
      </div>
    </div>
    
    `;
};

loadAllMenu();
loadNewsById("01");
