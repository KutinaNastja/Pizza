let pizzaMenu = [
  {
    name: "Диабло",
    img: "assets/pizza/acute.jpg",
    Ingredient:
      "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла, томатный соус",
    price: 719,
    type: "meat",
  },
  {
    name: "Цыпленок барбекю",
    img: "assets/pizza/B-B-Q.jpg",
    Ingredient:
      "Цыпленок, бекон, соус барбекю, красный лук, моцарелла, томатный соус",
    price: 719,
    type: "meat",
  },
  {
    name: "Четыре сыра",
    img: "assets/pizza/cheesy.jpg",
    Ingredient: "Сыр блю чиз, сыры чеддер и пармезан, моцарелла, соус альфредо",
    price: 719,
    type: "vegetarian",
  },
  {
    name: "Чикен бомбони",
    img: "assets/pizza/chicken.jpg",
    Ingredient:
      "Куриные кусочки, сладкий перец, смесь сыров чеддер и пармезан, моцарелла, красный лук, соус сладкий чили, соус альфредо",
    price: 719,
    type: "meat",
  },
];

let addIngredientsMenu = [
  {
    name: "Бекон",
    img: "assets/Ingredients/Bacon.png",
    price: 59,
  },
  {
    name: "Сладкий перец",
    img: "assets/Ingredients/BelPepper.png",
    price: 59,
  },
  {
    name: "Голубой сыр",
    img: "assets/Ingredients/BlueСheese.png",
    price: 59,
  },
  {
    name: "Брынза",
    img: "assets/Ingredients/Brynza.png",
    price: 59,
  },
  {
    name: "Шампиньоны",
    img: "assets/Ingredients/Champignon.png",
    price: 59,
  },
  {
    name: "Чеддер и Пармезан",
    img: "assets/Ingredients/CheddarandParmesan.png",
    price: 59,
  },
];

let pizzaType = [];

const sumOfIngredients = document.querySelector(".sumOfIngredients");

let order = [];
let pizzaIngredients = [];
const filter = document.querySelector(".filter");
const pizza = document.querySelector(".pizza");
const orderPrice = document.querySelector(".orderPrice");
const tableOfContents = document.querySelector(".tableOfContents");
const readyPizza = document.querySelector(".readyPizza");
const addedGoods = document.querySelector(".addedGoods");
let go = document.querySelector(".go");
let close = document.querySelector(".close");
let addIngredients = document.querySelector(".addIngredients");

const filerPizza = (button, type) => {
  console.log(button.className.toString());
  if (button.className.includes("active")) {
    button.className = button.className.replace("active", "");
    pizzaType = pizzaType.filter((v) => v !== type);
  } else {
    button.className += " active";
    pizzaType.push(type);
  }
  printPizza();
};

const requiredType = pizzaMenu.filter(function (element) {
  return element.type === "meat";
});
console.log(requiredType);

const addToOrder = (index) => {
  order.push(pizzaMenu[index]);
  let sum = 0;
  order.forEach((element) => {
    sum += element.price;
  });
  orderPrice.innerHTML = `${sum}₽`;
};

const sumIngredients = (index) => {
  let sumI = 0;
  pizzaIngredients.forEach((element) => {
    sumI += element.price;
  });
  sumOfIngredients.innerHTML = `<p> Стоимость пиццы:${sumI}₽</p>`;
};

const addToPizzaIngredients = (index) => {
  pizzaIngredients.push(addIngredientsMenu[index]);
  sumIngredients(index);
  addedGoods.innerHTML += ` <div class="addedProduct">${addIngredientsMenu[index].name}</div>
    <div class="addedPrice">${addIngredientsMenu[index].price}₽</div>
    <img id="closeIngredients" class="closeIngredients" src="assets/cancel.png" alt="Закрыть">`;
};

const printPizza = () => {
  pizza.innerHTML = pizzaMenu
    .filter(function (element) {
      console.log(pizzaType);
      if (!pizzaType.length) {
        return true;
      }
      return pizzaType.includes(element.type);
    })
    .reduce((acc, element, index) => {
      return (acc += `<div class="card">
<img src="${element.img}" alt="${element.name}" />
<div class="name">${element.name}</div>

<div class="ingredient">
${element.Ingredient}
</div>
<div class="purchase">
  <div class="price">${element.price}₽</div>
  <div onclick="addToOrder(${index})" class="add">Добавить</div>
  </div>
</div>`);
    }, "");
};
printPizza();

addIngredientsMenu.forEach((element, index) => {
  tableOfContents.innerHTML += ` <div class="tableOfIngredients">
  <img class="productPhoto" src="${element.img}" alt="${element.name}">
  <div class="product">${element.name}</div>
  <div class="price">${element.price}₽</div>
  <div onclick="addToPizzaIngredients(${index})" class="addIngredients">Собрать</div>
</div>`;
});

go.onclick = () => {
  if (getComputedStyle(popup).display === "none") {
    popup.style.display = "flex";
    backgroundGo.style.display = "block";
  } else {
    popup.style.display = "none";
    backgroundGo.style.display = "none";
  }
};

backgroundGo.onclick = () => {
  popup.style.display = "none";
  backgroundGo.style.display = "none";
};

close.onclick = () => {
  popup.style.display = "none";
  backgroundGo.style.display = "none";
};
