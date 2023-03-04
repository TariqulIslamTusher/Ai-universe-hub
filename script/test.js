// let products = [
//     {
//       "product_name": "The Witchers",
//       "type": "book",
//       "manufactured": new Date('2019-05-13'),
//       "price": 800
//     },
//     {
//       "product_name": "Black Heels",
//       "type": "Shoes",
//       "manufactured": new Date('2021-07-06'),
//       "price": 2500
//     },
//     {
//       "product_name": "Skybags",
//       "type": "Bags",
//       "manufactured": new Date('2020-09-22'),
//       "price": 2200
//     },
//     {
//       "product_name": "OnePlus 9",
//       "type": "Mobile Phone",
//       "manufactured": new Date('2021-03-23'),
//       "price": 49000
//     },
//   ]
//   console.log("Original Products are:")
//   console.log(products)
//   let sortedProducts = products.sort(
//       (p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
  
//   console.log("Products sorted based on descending order of their prices are:")
//   console.log(sortedProducts);
  
let tools = [{id: "01", price:700, name: "ChatGPT"},

    {id: "02", price:410, name: "YouChat 2.0", description: null},

    {id: "03", price:54, name: "Google Bard", description: "Bard is an alternative developed by Google."},

    {id: "04", price:542, name: "Microsoft Bing", description: null},

    {id: "05", price:452, name: "Chatsonic", description: null},

    {id: "06", price:4025, name: "Jasper Chat", description: "Jasper Chat is an open-source chatbot platform."},
  
    {id: "07", price:42, name: "Character AI"},

    {id: "08", price:0788, name: "DialoGPT"},

    {id: "09", price:778678300, name: "Rytr"},

    {id: "10", price:71420785400, name: "GitHub Copilot"},


    {id: "11", price:77254, name: "Replika"},

    {id: "12", price:74520, name: "Facebook AI"}
]
console.log("Original Products are:")
console.log(tools)
let sortedTools = tools.sort(
    (p1, p2) => (p1.price < p2.price) ? -1 : (p1.price > p2.price) ? 1 : 0);

console.log("Products sorted based on descending order of their prices are:")
console.log(tools);