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
        const {id, description, name, published_in, image, features} = element;
        const cardDiv = document.createElement('div')
        const index = data.indexOf(element)
        cardDiv.innerHTML = `
            <div class="card w-full p-6 bg-base-100 shadow-2xl">
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
    console.log(id)
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