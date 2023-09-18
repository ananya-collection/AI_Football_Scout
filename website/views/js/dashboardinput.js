var stepper = document.querySelector('.stepper');
var stepperInstace = new MStepper(stepper, {
    firstActive: 0,
    validationFunction: validationFunction
});

var selection = {};
var redHighlight = `<style>ul.stepper.horizontal .step.active .step-title::before{
                                                    background-color: #f07167;}</style>`
var blueHighlight = `<style>ul.stepper.horizontal .step.active .step-title::before{
                                                    background-color: #00afb9;}</style>`
positionClickAndSelect()
ageRangeClickAndSelect()
categoryClickAndSelect()
function validationFunction(stepperForm, activeStepContent) {

    let cards = Array.from(activeStepContent.querySelectorAll('.card'))
    var responce = false;
    cards.forEach(card => {
        if (card.classList.contains('visited')) {
            responce = true;
        }
    })
    return responce
}

function positionClickAndSelect() {
    let cards = Array.from(document.querySelectorAll('#position_card'))
    let button = document.querySelector('#continue_button_1')
    let label = document.querySelector('#titlestep1')
    let elements = [];
    let clickCounter = 0;
    let selected = false;

    cards.forEach(card => {
        elements = elements.concat(Array.from(card.children))
    });

    elements.forEach(element => {
        button.addEventListener('click', function () {
            if (!selected) {
                elements.forEach(element => {
                    element.parentElement.classList.add('clickmissed')
                });

            }
        });
    });

    if (!selected) label.classList.add('clickmissed')

    elements.forEach(element => {
        element.addEventListener('click', function () {
            while (clickCounter === 0) {
                element.parentElement.classList.add('visited')
                label.classList.add('visited')
                selection['position'] = element.parentElement.children[1].children[0].innerHTML

                selected = true;
                elements.forEach(element => {
                    element.parentElement.classList.remove('clickmissed')

                });
                label.classList.remove('clickmissed')
                break
            }
            clickCounter++

            if ((clickCounter > 1) && (element.parentElement.classList.value.includes('visited'))) {
                element.parentElement.classList.remove('visited')
                label.classList.remove('visited')
                label.classList.add('clickmissed')
                selected = false;
                clickCounter = 0
                delete selection.position
            }

          //  console.log(selection)
            document.getElementById("AiInputFormPosition").value = selection['position'];
        });
    });
};

function ageRangeClickAndSelect() {
    let cards = Array.from(document.querySelectorAll('#ageRange_card'))
    let button = document.querySelector('#continue_button_2')
    let label = document.querySelector('#titlestep2')
    let elements = []
    let clickCounter = 0;
    let selected = false;


    cards.forEach(card => {
        elements = elements.concat(Array.from(card.children))
    });

    elements.forEach(element => {
        button.addEventListener('click', function () {
            if (!selected) {
                elements.forEach(element => {
                    element.parentElement.classList.add('clickmissed')
                });
            }
        });
    });

    if (!selected) label.classList.add('clickmissed')

    elements.forEach(element => {
        element.addEventListener('click', function () {
            while (clickCounter === 0) {
                element.parentElement.classList.add('visited')
                label.classList.add('visited')
                var userSelection = element.parentElement.children[1].children[0].innerHTML
                if (userSelection === 'Age below 20 years old') selection['ageGroup'] = 'age below 20';
                else if (userSelection === 'Age between 20-23 years old') selection['ageGroup'] = '20-23 age';
                else if (userSelection === 'Age between 24-30 years old') selection['ageGroup'] = '24-30 age';
                else if (userSelection === 'Age above 30 years old') selection['ageGroup'] = 'age above 30';

                selected = true;
                elements.forEach(element => {
                    element.parentElement.classList.remove('clickmissed')
                });
                label.classList.remove('clickmissed')
                break
            }
            clickCounter++

            if ((clickCounter > 1) && (element.parentElement.classList.value.includes('visited'))) {
                element.parentElement.classList.remove('visited')
                label.classList.remove('visited')
                label.classList.add('clickmissed')
                clickCounter = 0;
                selected = false;
                delete selection.ageGroup
            }
          //  console.log(selection)
            document.getElementById("AiInputFormAgeGroup").value = selection['ageGroup'];
        });
    });
};


function categoryClickAndSelect() {
    let cards = Array.from(document.querySelectorAll('#category_card'))
    let button = document.querySelector('#submit_button')
    let label = document.querySelector('#titlestep3')
    let elements = []
    let clickCounter = 0;
    let selected = false;


    cards.forEach(card => {
        elements = elements.concat(Array.from(card.children))
    });

    elements.forEach(element => {
        button.addEventListener('click', function () {
            if (!selected) {
                elements.forEach(element => {
                    element.parentElement.classList.add('clickmissed')
                });
            }
        });
    });

    if (!selected) label.classList.add('clickmissed')

    elements.forEach(element => {
        element.addEventListener('click', function () {
            while (clickCounter === 0) {
                element.parentElement.classList.add('visited')
                label.classList.add('visited')
                var userSelection = element.parentElement.children[1].children[0].innerHTML
                if (userSelection === 'Lack of games') selection['playerCategory'] = 'lowAppereances';
                else if (userSelection === 'Below average') selection['playerCategory'] = 'belowAverage';
                else if (userSelection === 'Average') selection['playerCategory'] = 'average';
                else if (userSelection === 'Prospective') selection['playerCategory'] = 'prospective';
                else if (userSelection === 'Top') selection['playerCategory'] = 'top';

                selected = true;
                elements.forEach(element => {
                    element.parentElement.classList.remove('clickmissed')
                });
                label.classList.remove('clickmissed')
                break
            }
            clickCounter++

            if ((clickCounter > 1) && (element.parentElement.classList.value.includes('visited'))) {
                element.parentElement.classList.remove('visited')
                label.classList.remove('visited')
                label.classList.add('clickmissed')
                clickCounter = 0;
                selected = false;
                delete selection.playerCategory

            }
           // console.log(selection)
            document.getElementById("AiInputFormCategory").value = selection['playerCategory'];
          ///  console.log(document.forms["AiInputForm"])
        });
    });
};

function validateForm() {
    var responce = false;
    if (Object.keys(selection).length === 3) {
        responce = true;
    }
    return responce;
}