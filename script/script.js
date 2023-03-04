// Declare the first fatching function
let universal;
const loadData = async () => {
    try {
        const URL = "https://openapi.programming-hero.com/api/ai/tools"
        const res = await fetch(URL);
        const data = await res.json()
        universal = data.data.tools;
        displayData(universal.slice(0,6))
    } catch (error) {
        console.log(error, 'check on loadData function')
    }
}

// Declare first function to display the url into card
const displayData = (data) => {
    document.getElementById('seeMore').classList.remove('hidden')
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""
    // TODO: apply foreach for the array named data
    data.forEach(element => {

        // destructing the object 
        const { id, name, published_in, image, features } = element;
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
            <div class="card w-full h-full p-6 bg-base-100 shadow-2xl border-4 border-blue-200 hover:border-blue-800 delay-75 ">
                <figure>
                    <img class='md:h-52 md:w-full' src="${image ? image : "No Photos Found"}" alt="Shoes" />
                </figure>

                <div class="card-body px-0 border-b-4">
                    <h2 class="card-title text-4xl font-semibold my-3">Features</h2>
                    <ol class='list-decimal px-4' type="1">
                        ${features.map(feature => `<li>${feature}</li>`).join('')}
                    </ol>
                
                </div>

                <div class="card-footer py-3 flex justify-between items-center">
                    <div class="flex flex-col">
                        <h2 class="my-3 text-4xl font-semibold">${name}</h2>
                        <div class="flex"><p class="text-2xl"><i class="fa-regular fa-calendar-days mr-3"></i><span id="date">${published_in}</span></p></div>
                    </div>

                    <label onclick="receivedModalClick('${id}')" for="my-modal-5" class="btn bg-transparent text-black border-2 rounded-full text-2xl font-bold px-4 py-3 align-middle hover:text-white"><i class="fa-solid fa-arrow-right"></i></label>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv)
    });

    spinners()
}


// create the modal display functions
const receivedModalClick = id => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => openModal(data.data))
}

// function for open a modal
const openModal = id => {
    // destruction of object id 
    const { description, accuracy, image_link, pricing, input_output_examples, features, integrations } = id

    document.getElementById('description').innerText = description
    document.getElementById('figure').innerHTML = `
        <img class="md:h-full w-auto my-3" src=${image_link[0]}>
        <h2 class='absolute right-0 top-1 bg-red-500 text-xl text-white px-1'>${accuracy.score ? `${accuracy.score}% accuracy` : ""}</h2>
    `
    document.getElementById('pricing').innerHTML = `
        <div class="p-3 py-5 text-center content-center shadow-lg text-lg h-full bg-white rounded-md w-full leading-normal text-green-500">
            <p>${pricing ? pricing[0].price : "Free Of Cost"}</p>
            <p>${pricing ? pricing[0].plan : ''}</p>
        </div>

        <div class="p-3 py-5 text-center content-center shadow-lg text-lg h-full bg-white rounded-md w-full leading-normal text-blue-500">
            <p>${pricing ? pricing[1].price : "Free Of Cost"}</p>
            <p>${pricing ? pricing[1].plan : ''}</p>
        </div>

        <div class="p-2 text-center content-center shadow-lg text-lg h-full bg-white rounded-md w-full leading-normal text-red-500">
            <p>${pricing ? pricing[2].price : "Free Of Cost"}</p>
            <p>${pricing ? pricing[2].plan : ''}</p>
        </div>

    `
    document.getElementById('input').innerText = input_output_examples ? input_output_examples[0].input : "Can you give any example?";
    document.getElementById('output').innerText = input_output_examples ? input_output_examples[0].output : "No! Not Yet! Take a break!!!";

    //! make the features an array by entries
    const arrayOfFeatures = Object.entries(features)
    // loop on each property of array , then get the array pair and access no 1 index
    // arrayOfFeatures makes the new array of the feature_name, cause .map returns an array
    const eachArray = arrayOfFeatures.map(feature => feature[1].feature_name)

    // features informations
    document.getElementById('olFeatures').innerHTML = `${features? eachArray.map(name=> `<li>${name}</li>` ).join(''):'No data found'}`

    //! Intigrations informations
    document.getElementById('olIntigrations').innerHTML = `${integrations ? integrations.map(integration =>
        `<li>${integration}</li>`).join(""):"No Data Found" }`
}



// create a spinners function
const spinners = (isSpin) => {
    if (isSpin) {
        document.getElementById('spinner').classList.remove('hidden')
    } else {
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('seeMore').classList.remove('hidden')
    }
}


// TODO: on click show all show all the card
let isClicked = false;

const showAllCard = () => {
    spinners(true)
    displayData(universal)
    document.getElementById('seeMore').classList.add('hidden')
    isClicked = true;
}

// TODO: accending or decending by button
// accending order
document.getElementById('decendingtDate').addEventListener('click', function () {
    if(isClicked){
        const sortedData = [...universal]
        sortedData.sort((p1, p2) => (new Date(p1.published_in) > new Date(p2.published_in)) ? 1 : (new Date(p1.published_in) < new Date(p2.published_in)) ? -1 : 0);
        displayData(sortedData)
        document.getElementById('seeMore').classList.add('hidden')
    }else{
        const sortedData = [...universal.slice(0,6)]
        sortedData.sort((p1, p2) => (new Date(p1.published_in) > new Date(p2.published_in)) ? 1 : (new Date(p1.published_in) < new Date(p2.published_in)) ? -1 : 0);
        displayData(sortedData)
    }

})

// decending order
const dccnData = () =>{
    if(isClicked){
        const sortData = [...universal]
        sortData.sort((a,b) => (new Date(a.published_in) < new Date(b.published_in))? 1: (new Date(a.published_in) > new Date(b.published_in))?-1:0); 
        displayData(sortData)
        document.getElementById('seeMore').classList.add('hidden')

    } else{
        const sortData = [...universal.slice(0,6)]
        sortData.sort((a,b) => (new Date(a.published_in) < new Date(b.published_in))? 1: (new Date(a.published_in) > new Date(b.published_in))?-1:0);
        displayData(sortData)
    }
}

loadData()
