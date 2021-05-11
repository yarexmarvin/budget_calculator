let percentSave = document.querySelector('#percent');
let amountSave = document.querySelector('#amount');
let incomeSection = document.querySelector('.income');
let expenseSection = document.querySelector('.expense');

let inputSave = document.querySelector('.input_saving');
let inputName = document.querySelector('.input_name_inner');
let inputAmount = document.querySelector('.input_value_amount');
let inputPrice = document.querySelector('.input_value_price');
let inputIncome = document.querySelector('.input_group_income');
let inputExpense = document.querySelector('.input_group_expense');

let chartRemainings = document.querySelector('#chart_remainings');
let chartSavings = document.querySelector('#chart_savings');
let chartExpenses = document.querySelector('#chart_expenses');
let chartElement = document.querySelectorAll('.chart_elem_sum');

let legendElement = document.querySelectorAll('.sum_list_elem');

let remainText = document.querySelector('#remain_text');
let remainNum = document.querySelector('.remain_left');

let bars = document.querySelector('.bars');

let totalIncome = document.querySelector('.total_income');

let buttonUp = document.querySelector('.btn-2');
let buttonDown = document.querySelector('.btn-1');

let buttonRefresh = document.querySelector('#refresh');

let income = 0;
let saving = 0;
let expenses = 0;
let remainings = 0;

let savePer;
let remainPer;
let expenPer;

let expenseElem = 0;
let expensElemPer = 0;
let startX = 1;
let widthX = 10;
let totalX = 5;
let newX = 0;


let buttonAdd = document.querySelector('.add');
let buttonClearForm = document.querySelector('.clear_form');
let buttonDeleteAll = document.querySelector('.delete_all');


// FOR DELETE ALL BUTTON
buttonDeleteAll.addEventListener('click', function() {
    let cards = document.querySelectorAll('.newCard');
    for (let card of cards) {
        card.remove();
    }
    income = 0;
    expenses = 0;
    saving = 0;
    remainings = 0;
    totalIncome.innerHTML = 0;

    deleteBars();
    updateInfo();

    remainNum.innerHTML = 'Are you ready to make a new plan?';
    inputAmount.disabled = false;
    inputPrice.disabled = false;
    inputName.disabled = false;
    inputIncome.disabled = false;
    inputExpense.disabled = false;
});

// CLEAR FORM BUTTON
buttonClearForm.addEventListener('click', function() {
    inputName.value = '';
    inputAmount.value = '';
    inputPrice.value = '';
    inputSave.disabled = false;
    inputSave.value = '';
});

// FOR CHECKBOXES
if (!inputExpense.checked) {
    inputIncome.checked = true;
} else if (!inputIncome.checked) {
    inputExpense.checked = true;
}

inputIncome.addEventListener('click', function() {
    if (inputIncome.checked) {
        inputExpense.checked = false;
    } else if (!inputIncome.checked) {
        inputExpense.checked = true;
    }
});

inputExpense.addEventListener('click', function() {
    if (inputExpense.checked) {
        inputIncome.checked = false;
    } else if (!inputExpense.checked) {
        inputIncome.checked = true;
    }
})

if (!amountSave.checked) {
    percentSave.checked = true;
} else if (!percentSave.checked) {
    amountSave.checked = true;
}

// FOR 'SAVINGS'
percentSave.addEventListener('click', function() {
    if (percentSave.checked) {
        amountSave.checked = false;
    } else if (!percentSave.checked) {
        amountSave.checked = true;
    }
    updateInfo()
});

amountSave.addEventListener('click', function() {
    if (amountSave.checked) {
        percentSave.checked = false;
    }
    if (!amountSave.checked) {
        percentSave.checked = true;
    }
    updateInfo()
});

inputSave.addEventListener('blur', function() {
    updateInfo()
})



// FOR ADD BUTTON
buttonAdd.addEventListener('click', function() {
    let reg = /\D+/g;
    if (reg.test(inputAmount.value)) {
        inputAmount.value = inputAmount.value.replace(reg, '');
    }

    if (reg.test(inputPrice.value)) {
        inputPrice.value = inputPrice.value.replace(reg, '');
    }

    if (!inputAmount.value) {
        inputAmount.value = 1;
    };
    if (!inputPrice.value) {
        inputPrice.value = 1;
    };
    if (inputIncome.checked) {

        income = Number(income) + Number(inputAmount.value) * Number(inputPrice.value);
        totalIncome.innerHTML = Number(totalIncome.innerHTML) + Number(inputAmount.value) * Number(inputPrice.value);
        updateInfo();


        // CREATING A CARD FOR INCOME SOURCES

        let newIncomeCard = document.createElement('div');
        newIncomeCard.classList.add('newCard');
        newIncomeCard.classList.add('incomeCard');

        let card1Name = document.createElement('p');
        card1Name.innerHTML = inputName.value;

        card1Name.addEventListener('click', function changeName() {
            let input = document.createElement('input');
            input.value = card1Name.innerHTML;
            card1Name.innerHTML = '';
            input.addEventListener('blur', function(e) {

                card1Name.innerHTML = input.value;
                card1Name.addEventListener('click', changeName);
            });
            card1Name.appendChild(input);
            card1Name.removeEventListener('click', changeName);
        });
        newIncomeCard.appendChild(card1Name);

        let card1Price = document.createElement('p');
        card1Price.innerHTML = inputPrice.value;
        card1Price.addEventListener('click', function changePrice() {
            let input = document.createElement('input');
            input.value = card1Price.innerHTML;
            card1Price.innerHTML = '';
            input.addEventListener('blur', function() {
                card1Price.innerHTML = input.value;
                card1Sum.innerHTML = Number(card1Price.innerHTML) * Number(card1Amount.innerHTML);
                let sums = document.querySelectorAll('.sums');
                console.log(sums);
                income = 0;
                for (let sum of sums) {
                    income += Number(sum.innerHTML);
                }
                totalIncome.innerHTML = income;
                updateInfo();
                card1Price.addEventListener('click', changePrice);
            });
            card1Price.appendChild(input);
            card1Price.removeEventListener('click', changePrice);
        });
        newIncomeCard.appendChild(card1Price);

        let card1Amount = document.createElement('p');
        card1Amount.innerHTML = inputAmount.value;
        card1Amount.addEventListener('click', function changeAmount() {
            let input = document.createElement('input');
            input.value = card1Amount.innerHTML;
            card1Amount.innerHTML = '';
            input.addEventListener('blur', function() {
                card1Amount.innerHTML = input.value;
                card1Sum.innerHTML = Number(card1Price.innerHTML) * Number(card1Amount.innerHTML);
                let sums = document.querySelectorAll('.sums');
                income = 0;
                for (let sum of sums) {
                    income += Number(sum.innerHTML);
                }
                totalIncome.innerHTML = income;
                updateInfo();
                card1Amount.addEventListener('click', changeAmount);
            });
            card1Amount.appendChild(input);
            card1Amount.removeEventListener('click', changeAmount);
        });
        newIncomeCard.appendChild(card1Amount);

        let card1Sum = document.createElement('p');
        card1Sum.innerHTML = Number(card1Price.innerHTML) * Number(card1Amount.innerHTML);
        card1Sum.classList.add('sums');
        newIncomeCard.appendChild(card1Sum);

        let buttonDeleteMain = document.createElement('div');
        buttonDeleteMain.classList.add('button_Delete_Main');
        let buttonDelete = document.createElement('div');
        buttonDelete.classList.add('menu-icon');
        let buttonLineTop = document.createElement('div');
        buttonLineTop.classList.add('line');
        buttonLineTop.classList.add('top');
        buttonDelete.appendChild(buttonLineTop);

        let buttonLineRight = document.createElement('div');
        buttonLineRight.classList.add('line');
        buttonLineRight.classList.add('right');
        buttonDelete.appendChild(buttonLineRight);

        let buttonLineBottom = document.createElement('div');
        buttonLineBottom.classList.add('line');
        buttonLineBottom.classList.add('bottom');
        buttonDelete.appendChild(buttonLineBottom);

        let buttonLineLeft = document.createElement('div');
        buttonLineLeft.classList.add('line');
        buttonLineLeft.classList.add('left');
        buttonDelete.appendChild(buttonLineLeft);

        buttonDeleteMain.addEventListener('click', function() {
            income = income - Number(card1Sum.innerHTML);
            totalIncome.innerHTML = Number(totalIncome.innerHTML) - Number(card1Sum.innerHTML);
            updateInfo();
            remainNum.innerHTML = 'Make a budget plan!';
            incomeSection.removeChild(newIncomeCard);
        })
        buttonDeleteMain.appendChild(buttonDelete);
        newIncomeCard.appendChild(buttonDeleteMain);
        incomeSection.appendChild(newIncomeCard);


        inputName.value = '';
        inputPrice.value = '';
        inputAmount.value = '';
        inputName.focus();




    } else if (inputExpense.checked) {

        expenses = Number(expenses) + Number(inputAmount.value) * Number(inputPrice.value);
        expenseElem = Number(inputAmount.value) * Number(inputPrice.value);
        updateInfo();



        // CREATING A CARD FOR EXPENSE SOURCES


        let newExpenseCard = document.createElement('div');
        newExpenseCard.classList.add('newCard');
        newExpenseCard.classList.add('expenseCard');

        let buttonDeleteMain = document.createElement('div');
        buttonDeleteMain.classList.add('button_Delete_Main');
        let buttonDelete = document.createElement('div');
        buttonDelete.classList.add('menu-icon');
        let buttonLineTop = document.createElement('div');
        buttonLineTop.classList.add('line');
        buttonLineTop.classList.add('top');
        buttonDelete.appendChild(buttonLineTop);

        let buttonLineRight = document.createElement('div');
        buttonLineRight.classList.add('line');
        buttonLineRight.classList.add('right');
        buttonDelete.appendChild(buttonLineRight);

        let buttonLineBottom = document.createElement('div');
        buttonLineBottom.classList.add('line');
        buttonLineBottom.classList.add('bottom');
        buttonDelete.appendChild(buttonLineBottom);

        let buttonLineLeft = document.createElement('div');
        buttonLineLeft.classList.add('line');
        buttonLineLeft.classList.add('left');
        buttonDelete.appendChild(buttonLineLeft);

        buttonDeleteMain.addEventListener('click', function() {
            expenses = expenses - Number(card2Sum.innerHTML);
            updateInfo();
            expenseSection.removeChild(newExpenseCard);

            deleteBars();
            createBar();
            remainNum.innerHTML = 'Add something';
        });
        buttonDeleteMain.appendChild(buttonDelete);
        newExpenseCard.appendChild(buttonDeleteMain);

        let card2Name = document.createElement('p');
        card2Name.innerHTML = inputName.value;
        card2Name.addEventListener('click', function changeName() {
            let input = document.createElement('input');
            input.value = card2Name.innerHTML;
            card2Name.innerHTML = '';
            input.addEventListener('blur', function() {
                card2Name.innerHTML = input.value;
                card2Name.addEventListener('click', changeName);
            });
            card2Name.appendChild(input);
            card2Name.removeEventListener('click', changeName);
        });
        newExpenseCard.appendChild(card2Name);

        let card2Price = document.createElement('p');
        card2Price.innerHTML = inputPrice.value;
        card2Price.addEventListener('click', function changeAmount() {
            let input = document.createElement('input');
            input.value = card2Price.innerHTML;
            card2Price.innerHTML = '';
            input.addEventListener('blur', function() {
                card2Price.innerHTML = input.value;
                card2Sum.innerHTML = Number(card2Price.innerHTML) * Number(card2Amount.innerHTML);
                let sums_exp = document.querySelectorAll('.sum_exp');
                expenses = 0;
                for (let sum of sums_exp) {
                    expenses += Number(sum.innerHTML);
                }

                deleteBars();
                createBar();
                updateInfo();
                card2Price.addEventListener('click', changeAmount);
            });
            card2Price.appendChild(input);
            card2Price.removeEventListener('click', changeAmount);
        });
        newExpenseCard.appendChild(card2Price);

        let card2Amount = document.createElement('p');
        card2Amount.innerHTML = inputAmount.value;
        card2Amount.addEventListener('click', function changeAmount() {
            let input = document.createElement('input');
            input.value = card2Amount.innerHTML;
            card2Amount.innerHTML = '';
            input.addEventListener('blur', function() {
                card2Amount.innerHTML = input.value;
                card2Sum.innerHTML = Number(card2Price.innerHTML) * Number(card2Amount.innerHTML);
                let sums_exp = document.querySelectorAll('.sum_exp');
                expenses = 0;
                for (let sum of sums_exp) {
                    expenses += Number(sum.innerHTML);
                }

                deleteBars();
                createBar();
                updateInfo();
                card2Amount.addEventListener('click', changeAmount);
            });
            card2Amount.appendChild(input);
            card2Amount.removeEventListener('click', changeAmount);
        });
        newExpenseCard.appendChild(card2Amount);

        let card2Sum = document.createElement('p');
        card2Sum.innerHTML = Number(card2Price.innerHTML) * Number(card2Amount.innerHTML);
        card2Sum.classList.add('sum_exp');
        newExpenseCard.appendChild(card2Sum);


        expenseSection.appendChild(newExpenseCard);

        deleteBars();
        createBar();

        inputName.value = '';
        inputPrice.value = '';
        inputAmount.value = '';
        inputName.focus();



    } else {
        alert('Choose between INCOME or EXPENSE');
    }

})


// UPDATING CHARTS AND NUMBERS;

function updateInfo() {

    let reg = /\D+/g;
    if (reg.test(inputSave.value)) {
        inputSave.value = inputSave.value.replace(reg, '');
    }

    if (percentSave.checked) {
        saving = (Number(inputSave.value) / 100) * income;
    } else if (amountSave.checked) {
        saving = inputSave.value;
    }


    remainings = (income - (expenses + Number(saving)));
    remainNum.innerHTML = 'You have $' + Math.floor(remainings) + ' free!';

    if (remainings < 0) {
        remainNum.innerHTML = 'Budget exceeded on $' + Math.abs(Math.floor(remainings)) + ' !';
        inputAmount.disabled = true;
        inputPrice.disabled = true;
        inputName.disabled = true;
        inputIncome.disabled = true;
        inputExpense.disabled = true;
    } else {
        inputAmount.disabled = false;
        inputPrice.disabled = false;
        inputName.disabled = false;
        inputIncome.disabled = false;
        inputExpense.disabled = false;
    }

    remainPer = (remainings / income) * 100;
    savePer = (saving / income) * 100;
    expenPer = (expenses / income) * 100;
    expenOff = -savePer - remainPer;


    console.log('Income: ' , income);
    console.log('Remainings: ' , remainings);
    console.log('Saving: ' , saving);
    console.log('Expenses: ' , expenses);


    console.log('% remainings ', remainPer)
    console.log('% savings ', savePer)
    console.log('% expenses ', expenPer)
    console.log(expenOff)

    


    chartRemainings.setAttribute('stroke-dasharray', `${remainPer} 100`);
    chartSavings.setAttribute('stroke-dasharray', `${savePer} 100`);
    chartSavings.setAttribute('stroke-dashoffset', `-${remainPer}`);
    chartExpenses.setAttribute('stroke-dasharray', `${expenPer} 100`);
    chartExpenses.setAttribute('stroke-dashoffset', `${expenOff}`);

    if(!(remainings < 0)){
       document.querySelector('.bar-chart_remainings').style.width = remainPer + `%`;
    document.querySelector('.bar-chart_savings').style.width = savePer + `%`;
    document.querySelector('.bar-chart_expenses').style.width = expenPer + `%`;
    } else {
        alert(`You have exceded your budget on ${remainings} $ !!! `)
        document.querySelector('.bar-chart_remainings').style.width = 0 + `%`;
    document.querySelector('.bar-chart_savings').style.width = 0 + `%`;
    document.querySelector('.bar-chart_expenses').style.width = 100 + `%`;
    document.querySelector('.bar-chart_expenses').style.backgroundColor = 'red';
    }
    document.querySelector('.bar-chart-mobile-remain').innerHTML= `You have ${Math.floor(remainings)} left`; 
}


function createBar() {
    let sums_exp = document.querySelectorAll('.sum_exp');
    for (let sum1 of sums_exp) {
        expenseElem = Number(sum1.innerHTML);
        expensElemPer = (expenseElem / expenses) * 100;
        let newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        newRect.classList.add('expenseBar');
        newRect.setAttribute('x', `${totalX + 3}`)
        newRect.setAttribute('y', `${100-expensElemPer}`);
        newRect.setAttribute('width', `${widthX}`);
        newRect.setAttribute('height', `${expensElemPer}`);
        newRect.setAttribute('stroke', 'transparent');
        newRect.setAttribute('fill', 'lightcoral');
        newX = newRect.getAttribute('x');
        totalX = Number(newX) + widthX;
        bars.appendChild(newRect);


        let expenseCards = document.querySelectorAll('.expenseCard');
        let expenseBars = document.querySelectorAll('.expenseBar');

        expenseBars.forEach(function(item, index) {
            item.addEventListener('mouseover', function() {
                expenseCards[index].scrollIntoView(false);
                expenseCards[index].classList.add('hover_bar');
            });
            item.addEventListener('mouseout', function() {
                expenseCards[index].classList.remove('hover_bar');
            })


        });
    }
}

function deleteBars() {
    let rects = document.querySelectorAll('rect');
    for (let rect of rects) {
        rect.remove();
    }
    totalX = 0;
    newX = 0;
    expenseElem = 0;
    expensElemPer = 0;
}




legendElement.forEach(function(item, index) {
    item.addEventListener('mouseover', function() {
        chartElement[index].classList.add('hovered');
    });

    item.addEventListener('mouseout', function() {
        chartElement[index].classList.remove('hovered');
    })
});

buttonDown.addEventListener('click', function() {
    let expenseCards = document.querySelectorAll('.expenseCard');
    let incomeCards = document.querySelectorAll('.incomeCard');
    console.log(expenseCards.length);
    console.log(incomeCards.length);
    expenseCards[expenseCards.length - 1].scrollIntoView(false);
    incomeCards[incomeCards.length - 1].scrollIntoView(false);
})

buttonUp.addEventListener('click', function() {
    let expenseCards = document.querySelectorAll('.expenseCard');
    let incomeCards = document.querySelectorAll('.incomeCard');

    expenseCards[0].scrollIntoView(false);
    incomeCards[0].scrollIntoView(false);
})