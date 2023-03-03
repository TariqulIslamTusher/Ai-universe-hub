// Declare the first fatching function

const loadData = async (isLimit) =>{
    try{
        const URL = "https://openapi.programming-hero.com/api/ai/tools"
        const res = await fetch(URL);
        const data = await res.json()
        displayData(data.data.tools, isLimit )
    } catch(error) {
        console.log(error, 'check on loadData function')
    }
}

// Declare first function to display the url into card

const displayData = (data , isLimit) =>{
    // including see more button condition
    if(isLimit && data.length > 6){
        data = data.slice(0,6)
        document.getElementById('seeMore').classList.remove('hidden')
    } else{
        document.getElementById('seeMore').classList.add('hidden')
    }

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""
    
    // apply foreach for the array named data
    data.forEach(element => {

        // destructing the object 
        const {id, name, published_in, image, features} = element;
        const cardDiv = document.createElement('div')

        cardDiv.innerHTML = `
            <div class="card w-full h-full p-6 bg-base-100 shadow-2xl">
                <figure>
                    <img class='md:h-52 md:w-full' src="${image? image:"No Photos Found"}" alt="Shoes" />
                </figure>

                <div class="card-body px-0 border-b-4">
                    <h2 class="card-title text-4xl font-semibold my-3">Features</h2>
                    <ol class='list-decimal px-4' type="1">${features.map(feature=>`
                        <li>${feature}</li>
                                            `).join('')}
                    </ol>
                
                </div>

                <div class="card-footer py-3 flex justify-between items-center">
                    <div class="flex flex-col">
                        <h2 class="my-3 text-4xl font-semibold">${name}</h2>
                        <div class="flex"><p class="text-xl"><i class="fa-regular fa-calendar-days mr-3"></i><span id="date">${published_in}</span></p></div>
                    </div>

                    <label onclick="receivedModalClick('${id}')" for="my-modal-5" class="btn bg-yellow-300 border-0 rounded-2xl px-4 py-3"><i class="fa-solid fa-arrow-right"></i></label>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv)        
    });
    
    spinners()
}
// create the modal display functions
const receivedModalClick = id =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => openModal(data.data))
}

// function for open a modal
const openModal = id => {
    const modalContainer = document.getElementById('modal-container')
    
    // destruction of object id 
    const {description, accuracy, image_link, pricing, input_output_examples, features} = id


    console.log(id)
    document.getElementById('description').innerText = description
    document.getElementById('figure').innerHTML =`
        <img class="md:h-full w-auto my-3" src=${image_link[0]}>
        <h2 class='absolute right-0 top-1 bg-red-500 text-xl text-white px-1'>${accuracy.score? `${accuracy.score}% accuracy` :""}</h2>
    `
    document.getElementById('pricing').innerHTML =`
        <div class="p-3 py-5 text-center content-center shadow-lg text-lg h-full bg-white rounded-md w-full leading-normal text-green-500"><p>${pricing? pricing[0].price : "Free Of Cost"}</p>
        <p>${pricing? pricing[0].plan : ''}</p></div>
        <div class="p-3 py-5 text-center content-center shadow-lg text-lg h-full bg-white rounded-md w-full leading-normal text-blue-500"><p>${pricing? pricing[1].price : "Free Of Cost"}</p>
        <p>${pricing? pricing[1].plan : ''}</p></div>
        <div class="p-2 text-center content-center shadow-lg text-lg h-full bg-white rounded-md w-full leading-normal text-red-500"><p>${pricing? pricing[2].price : "Free Of Cost"}</p>
        <p>${pricing? pricing[2].plan : ''}</p></div>

    `
    document.getElementById('input').innerText = input_output_examples? input_output_examples[0].input : "Can you give any example?";
    document.getElementById('output').innerText = input_output_examples? input_output_examples[0].output : "No! Not Yet! Take a break!!!";
    // features informations
    document.getElementById('olFeatures').innerHTML = `
        ${features['1']? `<li>${features['1'].feature_name}</li>` : ""}
        ${features['2']? `<li>${features['2'].feature_name}</li>` : ""}
        ${features['3']? `<li>${features['3'].feature_name}</li>` : ""}
        ${features['4']? `<li>${features['4'].feature_name}</li>` : ""}
    `

    
}



// create a spinners function
const spinners = (isSpin)=>{
    if(isSpin){
        document.getElementById('spinner').classList.remove('hidden')
    } else{
        document.getElementById('spinner').classList.add('hidden')
    }
}
// on click show all show all the card
const showAllCard = () =>{
    spinners(true)
    loadData(false)
}

const showLimitedCard = () => {
    spinners(true)
    loadData(true)
}