const elbtn = document.querySelector(".header__btn");
const dark = localStorage.getItem("mode");
localStorage.setItem("mode", "dark")
if (localStorage.getItem("mode") == "dark") {
    darkMode();
} else {
    noDark();
}
elbtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkMode();
    } else {
        noDark();
    }
});
function darkMode() {
    document.body.classList.add("dark");
    localStorage.setItem("mode", "dark");
}
function noDark() {
    document.body.classList.remove("dark");
    localStorage.setItem("mode", "light");

}


/* ms  */
const elList = document.querySelector(".flaggs__list");
const elSelect = document.querySelector(".form__select")
const elOption = document.querySelector(".form__option");
const elInput = document.querySelector(".form__input")
const elfragment = new DocumentFragment();

// api dan malumot olib keldim
async function fetchApi(url, list, select, nameCountry) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        // console.log(data);
        if (list) {
            render(data)
        }
        if (select) {
            render(data)
        }
        if (nameCountry) {
            render(data)
        }
    } catch (error) {
        console.log(error.message);
    }
}
fetchApi("https://restcountries.com/v3.1/all", true, false)




// render f-yani chizdim
let region = []
const elTemplate = document.querySelector(".temp__list").content;
function render(arr) {
    elList.innerHTML = "";
    arr.forEach(item => {
        // console.log(item);
        const tempClone = elTemplate.cloneNode(true)

        tempClone.querySelector(".flaggs__img").src = item.flags.png
        tempClone.querySelector(".flaggs__title").textContent = item.name.common
        tempClone.querySelector(".flaggs__desc-population").innerHTML = `Population : ${item.population}`
        tempClone.querySelector(".flaggs__desc-region").innerHTML = `Region : ${item.region}`
        tempClone.querySelector(".flaggs__desc-capital").innerHTML = `Capital : ${item.capital}`

        elfragment.appendChild(tempClone)

        const findRegion = region.find(el => {
            return item.region == el
        })
        if (!findRegion) {
            region.push(item.region)
        }


    });
    region.forEach(element => {
        elOption.textContent = element
        elOption.value = element
    })
    elList.appendChild(elfragment)
}

// selectni chizyapman
// console.log(region);


elSelect.addEventListener("change", evt => {
    fetchApi(`https://restcountries.com/v3.1/region/${elSelect.value}`, false, true)
})
elInput.addEventListener("keyup", evt => {
    const inputValue = elInput.value
   if (inputValue!="") {
    fetchApi(`https://restcountries.com/v3.1/name/${inputValue}`, false, false, true)
   }
})


