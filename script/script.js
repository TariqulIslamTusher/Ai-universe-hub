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
                    <ol id='tempOl' type="1">
                        <li>${features[0]? features[0] : ''}</li>
                        <li>${features[1]? features[1] : ''}</li>
                        <li>${features[2]? features[2] : ''}</li>
                        <li>${features[3]? features[3] : ''}</li>
                        <li>${features[4]? features[4] : ''}</li>
                        <li>${features[5]? features[5] : ''}</li>
                        <li>${features[6]? features[6] : ''}</li>
                    </ol>
                
                </div>

                <div class="card-footer py-3 flex justify-between items-center">
                    <div class="flex flex-col">
                        <h2 class="my-3 text-4xl font-semibold">${name}</h2>
                        <div class="flex"><p class="text-xl"><i class="fa-regular fa-calendar-days mr-3"></i><span id="date">${published_in}</span></p></div>
                    </div>

                    <button onclick="receivedModalClick('${id}')" class="footer-arrow btn-warning bg-yellow-200 rounded-xl px-4 py-3"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv)        
    });
    
    
}
// create the modal display functions
const receivedModalClick = id =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => openModal(data))
}

// function for open a modal



// on click show all show all the card
const showAllCard = () =>{
    loadData(false)
}

const showLimitedCard = () => {
    loadData(true)
}