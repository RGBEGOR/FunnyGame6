const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/Пепе.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/Yoda.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/Lady.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 8),
	new Result("Ваш уровень выше среднего", 12),
	new Result("Красавчики так держать все команды молодцы", 14)
];


const questions = 
[
	
	new Question("К какой персидской династии относился царь Дарий III, с которым воевал Александр Македонский? ", 
	[
		new Answer('Птолемеи', 0),
		new Answer("Сафириды", 0),
		new Answer("Селевкиды", 0),
		new Answer("Ахемениды", 1)
	]),
	new Question("В каком городе умер Александр Македонский?", 
	[
		new Answer('Вавилон', 1),
		new Answer("Лариса", 0),
		new Answer("Бактры", 0),
		new Answer("Александрии", 0)
	]),
	new Question("В каких землях в конце IV века до н. э. стала править династия Антигонидов? ", 
	[
		new Answer('Египетских', 0),
		new Answer("Греко-Бактрии", 0),
		new Answer("Селевкидов", 0),
		new Answer("Македонии", 1)
	]),
	new Question("Территория какого современного государства находится на месте древней Греко-Бактрии?", 
	[
		new Answer('Сирия', 0),
		new Answer("Афганистан", 1),
		new Answer("Ирак", 0),
		new Answer("Иран", 0)
	]),
	new Question("- эллинистическое государство, образовавшееся на территории Бактрии и Согдианы в результате распада империи Селевкидов. Просуществовало  с 250 до н.э. до 125 до н.э.", 
	[
		new Answer('Греко-Бактрия', 1),
		new Answer("Селевкиды ", 0),
		new Answer("Птолемеи ", 0),
		new Answer("не знаю ", 0)

	]),
	new Question("На сколько территорий распалось государство Александра Македонского?", 
	[
		new Answer('на 13', 0),
		new Answer("на три", 1),
		new Answer("на два ", 0),
		new Answer("на три че будеш спорить", 0)
	]),
	new Question(" В годы правления какого правителя Греко-Бактрийское царство достигло наибол размеров?", 
	[
		new Answer('Антиох', 0),
		new Answer("Диметрий  ", 0),
		new Answer("Евтидем", 1),
		new Answer("Нуматор", 0)
	]),
	new Question("Когда от государства Селевкидов отделяется Бактрия и правитель многих бактри городов Диодот объявил себя царём?", 
	[
		new Answer('220 год до.н.э', 0),
		new Answer("230 год до.н.э ", 0),
		new Answer("240 год до.н.э ", 0),
		new Answer("250 год до.н.э", 1)
	]),
	new Question("Когда умер А.Македонский? ", 
	[
		new Answer('323 год Вавилон', 1),
		new Answer("323 год Бактры", 0),
		new Answer("332 Сарды", 0),
		new Answer("321 Пелла", 0)
	]),
	new Question("Сколько уровней в игре Стандоф?", 
	[
		new Answer('43', 0),
		new Answer("22", 0),
		new Answer("50", 1),
		new Answer("12", 0)
	]),


	new Question("Сколько видов валюты в игре Стандоф", 
	[
		new Answer('4 ', 0),
		new Answer("1 ", 0),
		new Answer("2", 1),
		new Answer("5", 0)
	]),
	new Question("С каким оружием скорость бега выше?", 
	[
		new Answer('Нож', 1),
		new Answer("SMG", 0),
		new Answer("Пистолет", 0),
		new Answer("SM1014", 0)
	]),
	new Question("Какая ночь была в мультвфильме про Алладина ?", 
	[
		new Answer('Узбекская', 0),
		new Answer("Кавказская ", 0),
		new Answer("Персидская ", 0),
		new Answer("Арабская ", 1)
	]),
	new Question("Какого мальчика воспитывали животные в джунглях", 
	[
		new Answer('Алладина', 0),
		new Answer("Маугли", 1),
		new Answer("черного", 0),
		new Answer("Дикого ", 0)
	]),
	new Question("Сколько лет спала спящая красавица? ", 
	[
		new Answer('100 лет ', 1),
		new Answer("милион", 0),
		new Answer("2 года", 0),
		new Answer("50 лет", 0)

	]),

];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



