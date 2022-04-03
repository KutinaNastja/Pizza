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
let order = [];
let pizzaIngredients = [];
const sumBasket = document.querySelector(".sumBasket");
const popUpElement = document.querySelector(".buttonPopUp");
const readyCart = document.querySelector(".readyCart");
const sumOfIngredients = document.querySelector(".sumOfIngredients");
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
  if (button.className.includes("active")) {
    button.className = button.className.replace("active", "");
    pizzaType = pizzaType.filter((v) => v !== type);
  } else {
    button.className += " active";
    pizzaType.push(type);
  }
  printPizza();
};

const sumOrder = () => {
  let sum = 0;
  order.forEach((element) => {
    sum += element.price;
  });
  orderPrice.innerHTML = `${sum}₽`;
  sumBasket.innerHTML = `<p> Стоимость заказа:${sum}₽</p>`;
};

const allInCart = () => {
  readyCart.innerHTML = "";
  sumOrder();
  order.forEach((element, index) => {
    readyCart.innerHTML += `<div class="cardInBasket">
  <img class="imgInBasket" src="${element.img}" alt="${element.name}" />
  <div class="description" >
  <div class="nameInBasket"><p>${element.name}</p></div>
  <div class="description2" >
<div class="deleteIngredientsInBasket">
  <img onclick="deletePizzainBasket(${index})" class="deleteIngredients" 
  src="assets/cancel.png" alt="Закрыть"></div>
  <div class="ingredientInBasket">
  ${element.Ingredient}
  </div>
  <div class="purchaseInBasket">
    <div class="priceInBasket"><p>${element.price}₽</p></div>
    </div>
    </div>`;
  });
};

const deletePizzainBasket = (index) => {
  console.log(1);
  order = order.filter((v, i) => i !== index);
  allInCart();
};

const buttonPopUp = () => {
  const backgroundBasket = document.querySelector(".backgroundBasket");
  if (popUpElement.className.includes("activePopUp")) {
    popUpElement.className = popUpElement.className.replace("activePopUp", "");
    backgroundBasket.className = backgroundBasket.className.replace(
      "activeBackground",
      ""
    );
  } else {
    popUpElement.className += " activePopUp";
    backgroundBasket.className += " activeBackground";
  }
  allInCart();
};

const requiredType = pizzaMenu.filter(function (element) {
  return element.type === "meat";
});

const addToOrder = (index) => {
  order.push(pizzaMenu[index]);
  sumOrder();
};

let sumI = 0;
const addGeneratedPizzaToOrder = () => {
  const genPizza = {
    name: "Идеальная пицца",
    img: "assets/pizza.png",
    Ingredient: pizzaIngredients.reduce((acc, v) => acc + v.name + ", ", ""),
    price: sumI,
  };

  order.push(genPizza);
  let sum = 0;
  order.forEach((element) => {
    sum += element.price;
  });
  orderPrice.innerHTML = `${sum}₽`;
};

const sumIngredients = (index) => {
  sumI = 0;
  pizzaIngredients.forEach((element) => {
    sumI += element.price;
  });
  sumOfIngredients.innerHTML = `<p> Стоимость пиццы:${sumI}₽</p> <div onclick="addGeneratedPizzaToOrder()" class="addPizza">Добавить</div>`;
};

const addToPizzaIngredients = (index) => {
  pizzaIngredients.push(addIngredientsMenu[index]);
  sumIngredients(index);
  addedGoods.innerHTML += `<div class="styleProduct"><div class="addedProduct">${addIngredientsMenu[index].name}</div>
  <div class="deleteProduct"><div class="addedPrice">${addIngredientsMenu[index].price}₽</div>
    <img onclick="deleteIngredients(${index})" class="deleteIngredients" 
    src="assets/cancel.png" alt="Закрыть"></div></div>`;
};

const deleteIngredients = (index) => {
  pizzaIngredients = pizzaIngredients.filter((v, i) => i !== index);
  sumIngredients();
  addedGoods.innerHTML = "";
  pizzaIngredients.forEach((element, index) => {
    addedGoods.innerHTML += `<div class="styleProduct"><div class="addedProduct">${element.name}</div>
  <div class="deleteProduct"><div class="addedPrice">${element.price}₽</div>
    <img onclick="deleteIngredients(${index})" class="deleteIngredients" 
    src="assets/cancel.png" alt="Закрыть"></div></div>`;
  });
};

const printPizza = () => {
  pizza.innerHTML = pizzaMenu
    .filter(function (element) {
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
