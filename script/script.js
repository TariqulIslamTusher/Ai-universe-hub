// Declare the first fatching function

const loadData = async () =>{
    try{
        const URL = "https://openapi.programming-hero.com/api/ai/tools"
        const res = await fetch(URL);
        const data = await res.json()
        displayData(data.data.tools)
    } catch(error) {
        console.log(error, 'check on loadData function')
    }
}

// Declare first function to display the url into card

const displayData = data =>{
    console.log(data)
    const cardContainer = document.getElementById('card-container')
    
    // apply foreach for the array named data
    data.forEach(element => {
        console.log(element)
        // destructing the object 
        const {id, description, name, published_in, image, features} = element;
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
            <div class="card w-full p-6 bg-base-100 shadow-2xl">
                <figure>
                    <img class='md:h-52' src="${image? image:"No Photos Found"}" alt="Shoes" />
                </figure>

                <div class="card-body px-0 border-b-4">
                    <h2 class="card-title text-4xl font-semibold my-3">Features</h2>
                    <ul>
                        <li class="text-slate-400 my-1">1.</li>
                        <li class="text-slate-400 my-1">1.</li>
                        <li class="text-slate-400 my-1">1.</li>
                    </ul>
                
                </div>

                <div class="card-footer py-3 flex justify-between items-center">
                    <div class="flex flex-col">
                        <h2 class="my-3 text-4xl font-semibold">${name}</h2>
                        <div class="flex"><p class="text-xl"><i class="fa-regular fa-calendar-days mr-3"></i><span id="date">${published_in}</span></p></div>
                    </div>

                    <button onclick="modalOpen('${id}')" class="footer-arrow btn-warning bg-yellow-200 rounded-lg px-4 py-3"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        `
        cardContainer.appendChild(cardDiv)
    });

}
// create the modal display functions
const modalOpen = id =>{
    console.log('open modal on this click', id)
}

loadData()